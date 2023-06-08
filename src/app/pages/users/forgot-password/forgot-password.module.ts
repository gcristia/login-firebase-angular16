import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module'
import { ForgotPasswordComponent } from './forgot-password.component'
import { ErrorMessageComponent } from '@shared/auth-form/components/error-message/error-message.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [CommonModule, ForgotPasswordRoutingModule, ErrorMessageComponent, ReactiveFormsModule, FormsModule],
})
export class ForgotPasswordModule {}
