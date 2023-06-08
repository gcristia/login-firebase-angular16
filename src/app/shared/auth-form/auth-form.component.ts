import { Component, inject, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ErrorMessageComponent } from '@shared/auth-form/components/error-message/error-message.component'
import { AuthService } from '@pages/users/services/auth.service'
import { Observable } from 'rxjs'

const actionType = {
    signIn: {
        title: 'Sign In',
        action: 'signIn',
    },
    signUp: {
        title: 'Sign Up',
        action: 'signUp',
    },
} as const

type ActionType = keyof typeof actionType

@Component({
    selector: 'app-auth-form',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, ErrorMessageComponent],
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
    @Input() action!: ActionType
    form!: FormGroup
    title!: string

    user$!: Observable<any>
    private readonly authSvc = inject(AuthService)
    private fb = inject(FormBuilder)
    private readonly emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

    ngOnInit(): void {
        this.title = this.action === actionType.signIn.action ? actionType.signIn.title : actionType.signUp.title
        this.initForm()
        this.user$ = this.authSvc.userState$
    }

    signInGoogle() {
        this.authSvc.signInGoogle()
    }

    hasError(field: string): boolean {
        const fieldName = this.form.get(field)
        return !!fieldName?.invalid && fieldName?.touched
    }

    onSubmit() {
        const { email, password } = this.form.value
        this.action === actionType.signIn.action ? this.authSvc.signIn(email, password) : this.authSvc.signUp(email, password)
    }

    private initForm() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        })
    }
}
