import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerProfileDto {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    // Add other fields as needed based on API response
}

@Injectable({
    providedIn: 'root'
})
export class CustomerProfileService {
    private baseUrl = 'https://localhost:44311/api/services/app/CustomerProfile';

    constructor(private http: HttpClient) { }

    createProfile(profile: CustomerProfileDto): Observable<any> {
        return this.http.post(`${this.baseUrl}/Create`, profile);
    }

    updateProfile(profile: CustomerProfileDto): Observable<any> {
        return this.http.put(`${this.baseUrl}/Update`, profile);
    }

    deleteProfile(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/Delete`, { params: { id } });
    }

    // Assuming there might be a Get method, if not we rely on Create/Update returns
    getProfile(id: string): Observable<any> {
        // Guessing Get endpoint exists typical of this pattern
        return this.http.get(`${this.baseUrl}/Get`, { params: { id } });
    }
}
