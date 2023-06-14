import { Component, inject } from '@angular/core'
import { AuthService } from '@pages/users/services/auth.service'
import { filter, tap } from 'rxjs'
import { User } from '@angular/fire/auth'

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
    styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent {
    private readonly authSvc = inject(AuthService)
    user: User | null = null

    constructor() {
        this.authSvc.userState$
            .pipe(
                filter((authState) => authState !== null),
                tap((user) => (this.user = user)),
            )
            .subscribe()
    }

    async onResendEmailVerification() {
        if (this.user) {
            await this.authSvc.sendEmailVerification(this.user)
        }
    }
}
