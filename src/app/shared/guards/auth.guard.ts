import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@pages/users/services/auth.service'
import { take, tap } from 'rxjs'

export const authGuard = () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    return authService.userState$.pipe(
        take(1),
        tap(console.log),
        tap(({ emailVerified }) => (emailVerified ? router.navigate(['/home']) : true)),
    )
}
