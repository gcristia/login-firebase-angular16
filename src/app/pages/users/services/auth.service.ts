import { inject, Injectable } from '@angular/core'
import { Auth, authState, GoogleAuthProvider } from '@angular/fire/auth'
import { signInWithRedirect } from '@firebase/auth'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly auth = inject(Auth)
    private readonly googleProvider = new GoogleAuthProvider()
    constructor() {}

    get userState$() {
        return authState(this.auth)
    }

    async signInGoogle() {
        try {
            await signInWithRedirect(this.auth, this.googleProvider)
        } catch (error) {
            console.error('Google login', error)
        }
    }
}
