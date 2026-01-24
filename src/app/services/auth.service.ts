import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
    id?: number;
    userName?: string;
    name?: string;
    surname?: string;
    emailAddress?: string;
    isActive?: boolean;
    fullName?: string;
    lastLoginTime?: string;
    creationTime?: string;
    roleNames?: string[];
}

export interface RegisterDto {
    name: string;
    surname: string;
    userName: string;
    emailAddress: string;
    password: string;
    captchaResponse?: string;
}

export interface LoginDto {
    userNameOrEmailAddress: string;
    password: string;
    rememberClient?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Using a simplified base URL, adjust if needed (e.g. from environment)
    private baseUrl = 'https://localhost:44311';

    // State
    private _currentUser = new BehaviorSubject<User | null>(this.getUserFromStorage());
    currentUser$ = this._currentUser.asObservable();

    private _isAuthenticated = new BehaviorSubject<boolean>(!!this.getUserFromStorage());
    isAuthenticated$ = this._isAuthenticated.asObservable();

    private _showAuthModal = new BehaviorSubject<boolean>(false);
    showAuthModal$ = this._showAuthModal.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    openAuthModal() {
        this._showAuthModal.next(true);
    }

    // --- Auth Actions ---

    login(credentials: LoginDto): Observable<any> {
        // Placeholder login - typically this would be /api/TokenAuth/Authenticate
        // Since user didn't provide it, we'll try to guess or use a mock flow if fails.
        // For now assuming a standard ASP.NET Boilerplate TokenAuth endpoint.
        const url = `${this.baseUrl}/api/TokenAuth/Authenticate`;
        return this.http.post(url, credentials).pipe(
            tap((response: any) => {
                if (response && response.result && response.result.accessToken) {
                    this.setSession(response.result.accessToken, response.result.userId);
                    // Ideally fetch full profile here, but we'll set a basic user for now
                    this.updateCurrentUser({
                        userName: credentials.userNameOrEmailAddress,
                        emailAddress: credentials.userNameOrEmailAddress
                    });
                }
            })
        );
    }

    register(data: RegisterDto): Observable<any> {
        const url = `${this.baseUrl}/api/services/app/Account/Register`;
        return this.http.post(url, data);
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        this._currentUser.next(null);
        this._isAuthenticated.next(false);
        this.router.navigate(['/']);
    }

    // --- State Management ---

    private setSession(token: string, userId: number) {
        localStorage.setItem('authToken', token);
    }

    private updateCurrentUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUser.next(user);
        this._isAuthenticated.next(true);
    }

    private getUserFromStorage(): User | null {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated.value;
    }
}
