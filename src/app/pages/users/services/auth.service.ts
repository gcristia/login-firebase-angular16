import { inject, Injectable } from '@angular/core'
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, User } from '@angular/fire/auth'
import { signInWithRedirect } from '@firebase/auth'
import { Router } from '@angular/router'

interface ErrorResponse {
    code: string
    message: string
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly auth = inject(Auth)
    private readonly router = inject(Router)
    private readonly googleProvider = new GoogleAuthProvider()
    constructor() {}

    get userState$() {
        return authState(this.auth)
    }

    async signInGoogle() {
        try {
            await signInWithRedirect(this.auth, this.googleProvider)
        } catch (error) {
            console.error('Sign in with Google', error)
        }
    }

    async signUp(email: string, password: string) {
        try {
            // Create Account
            const { user } = await createUserWithEmailAndPassword(this.auth, email, password)
            // Send Email Verification
            await this.sendEmailVerification(user)
            // Redirect to Welcome Message
            await this.router.navigate(['/user/email-verification'])
        } catch (error) {
            const { code, message } = error as ErrorResponse
            console.error('Sign in', { code, message })
        }
    }

    async signIn(email: string, password: string) {
        try {
            // Sign In
            const { user } = await signInWithEmailAndPassword(this.auth, email, password)
            // Check if user is already Verification Email
            await this.checkUserIsVerified(user)
        } catch (error) {
            const { code, message } = error as ErrorResponse
            console.error('Sign in', { code, message })
        }
    }

    async signOut() {
        try {
            await this.auth.signOut()
        } catch (error) {
            console.error('Sign out', error)
        }
    }

    async sendEmailVerification(user: User) {
        try {
            await sendEmailVerification(user)
        } catch (error) {
            console.error('Send Email Verification', error)
        }
    }
    async sendPasswordResetEmail(email: string) {
        try {
            await sendPasswordResetEmail(this.auth, email)
        } catch (error) {
            console.error('Send Password Reset Email', error)
        }
    }

    private async checkUserIsVerified(user: User) {
        const { emailVerified } = user
        const router = emailVerified ? '/user/profile' : '/user/email-verification'
        await this.router.navigate([router])
    }
}
