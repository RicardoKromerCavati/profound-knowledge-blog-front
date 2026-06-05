import { Injectable, signal } from "@angular/core";
import { UserSessionResponse } from "../session/user.session.response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUserSignal = signal<UserSessionResponse | undefined | null>(undefined);
}