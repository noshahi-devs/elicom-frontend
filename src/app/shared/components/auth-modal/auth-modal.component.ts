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

    countries = [
        { name: 'Pakistan', code: 'PK', dial_code: '+92', flag: 'https://flagcdn.com/pk.svg' },
        { name: 'United States', code: 'US', dial_code: '+1', flag: 'https://flagcdn.com/us.svg' },
        { name: 'United Kingdom', code: 'GB', dial_code: '+44', flag: 'https://flagcdn.com/gb.svg' },
        { name: 'India', code: 'IN', dial_code: '+91', flag: 'https://flagcdn.com/in.svg' },
        { name: 'Canada', code: 'CA', dial_code: '+1', flag: 'https://flagcdn.com/ca.svg' },
        { name: 'Australia', code: 'AU', dial_code: '+61', flag: 'https://flagcdn.com/au.svg' },
        { name: 'Germany', code: 'DE', dial_code: '+49', flag: 'https://flagcdn.com/de.svg' },
        { name: 'France', code: 'FR', dial_code: '+33', flag: 'https://flagcdn.com/fr.svg' },
        { name: 'UAE', code: 'AE', dial_code: '+971', flag: 'https://flagcdn.com/ae.svg' },
        { name: 'Saudi Arabia', code: 'SA', dial_code: '+966', flag: 'https://flagcdn.com/sa.svg' },
        { name: 'China', code: 'CN', dial_code: '+86', flag: 'https://flagcdn.com/cn.svg' },
        { name: 'Japan', code: 'JP', dial_code: '+81', flag: 'https://flagcdn.com/jp.svg' },
        { name: 'Brazil', code: 'BR', dial_code: '+55', flag: 'https://flagcdn.com/br.svg' },
        { name: 'Mexico', code: 'MX', dial_code: '+52', flag: 'https://flagcdn.com/mx.svg' },
        { name: 'Turkey', code: 'TR', dial_code: '+90', flag: 'https://flagcdn.com/tr.svg' }
    ];

    selectedCountry = this.countries[0]; // Default PK

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
            countryCode: [this.selectedCountry.dial_code],
            phone: ['', Validators.required], // Will be updated with dial code
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });

        // Initialize phone with default country code
        this.updatePhoneCode();
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    onCountryChange(event: any) {
        const dialCode = event.target.value;
        const country = this.countries.find(c => c.dial_code === dialCode);
        if (country) {
            this.selectedCountry = country;
            this.updatePhoneCode();
        }
    }

    updatePhoneCode() {
        // Option 1: Prepend code to existing value if not present?
        // Or just let user type. Requirement: "jab flag select kry tab us k sath country code bi input field ma a jay"
        // I will set the value to the dial code if empty, or replace existing code if it matches another known code

        let currentPhone = this.signUpForm.get('phone')?.value || '';
        if (!currentPhone) {
            this.signUpForm.get('phone')?.setValue(this.selectedCountry.dial_code);
            return;
        }

        // Improved logic: If current phone starts with another dial code, replace it
        // For simplicity, just ensure it starts with the selected code
        if (!currentPhone.startsWith(this.selectedCountry.dial_code)) {
            this.signUpForm.get('phone')?.setValue(this.selectedCountry.dial_code);
        }
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
