import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService, LoginDto, RegisterDto } from '../../../services/auth.service';

@Component({
    selector: 'app-auth-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './auth-modal.component.html',
    styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
    @Output() close = new EventEmitter<void>();
    @Output() authenticated = new EventEmitter<void>();

    view: 'signin' | 'signup' = 'signin';
    signInForm: FormGroup;
    signUpForm: FormGroup;

    showPassword = false;
    showConfirmPassword = false;
    isLoading = false;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.signInForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });

        this.signUpForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    switchView(view: 'signin' | 'signup') {
        this.view = view;
        this.errorMessage = '';
    }

    onSignIn() {
        if (this.signInForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';
        const credentials: LoginDto = {
            userNameOrEmailAddress: this.signInForm.value.email,
            password: this.signInForm.value.password,
            rememberClient: true
        };

        this.authService.login(credentials).subscribe({
            next: () => {
                this.isLoading = false;
                this.authenticated.emit();
                this.close.emit();
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Login failed', err);
                this.errorMessage = 'Invalid email or password.';
            }
        });
    }

    onSignUp() {
        if (this.signUpForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';

        // Mapping form to RegisterDto
        // Note: API requires 'userName', we'll use email as username for now
        const data: RegisterDto = {
            name: this.signUpForm.value.firstName,
            surname: this.signUpForm.value.lastName,
            userName: this.signUpForm.value.email,
            emailAddress: this.signUpForm.value.email,
            password: this.signUpForm.value.password
        };

        this.authService.register(data).subscribe({
            next: () => {
                this.isLoading = false;
                // Optionally auto-login or show "Check email" message
                // Per requirements: "verify email message then return to login"
                this.view = 'signin';
                alert('Registration successful! Please sign in.');
                // Or if we want to follow strict flow: show message inside modal
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Register failed', err);
                this.errorMessage = 'Registration failed. Please try again.';
            }
        });
    }

    onClose() {
        this.close.emit();
    }
}
