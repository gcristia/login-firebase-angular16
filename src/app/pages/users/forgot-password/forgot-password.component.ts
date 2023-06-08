import { Component, inject, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { emailPattern } from '@shared/utils/constants'
import { AuthService } from '@pages/users/services/auth.service'

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    private authSvc = inject(AuthService)
    private readonly emailPatternRegex = emailPattern
    email!: FormControl

    ngOnInit(): void {
        this.initEmailField()
    }

    async onSubmit(event: Event) {
        event.preventDefault()
        try {
            await this.authSvc.sendPasswordResetEmail(this.email.value)
        } catch (error) {
            console.log('Send Password Reset Email', error)
        }
    }

    hasError(field: string): boolean {
        const fieldName = this.email.get(field)
        return !!fieldName?.invalid && fieldName?.touched
    }

    private initEmailField() {
        this.email = new FormControl('', [Validators.required, Validators.pattern(this.emailPatternRegex)])
    }
}
