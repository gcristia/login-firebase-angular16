import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { AuthService } from '@pages/users/services/auth.service'
import { Observable } from 'rxjs'
import { User } from '@angular/fire/auth'

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    private readonly authSvc = inject(AuthService)

    user$!: Observable<User | null>

    constructor() {
        this.user$ = this.authSvc.userState$
    }

    async onSingOut() {
        console.log('onSingOut')
        await this.authSvc.signOut()
    }
}
