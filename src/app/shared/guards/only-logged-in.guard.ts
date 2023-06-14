import { Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '@pages/users/services/auth.service'
import { take, tap } from 'rxjs'

export const onlyLoggedInGuard = () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    return authService.userState$.pipe(
        take(1),
        tap((isLoggedIn) => (!!isLoggedIn ? true : router.navigate(['/user/sign-in']))),
    )
}
