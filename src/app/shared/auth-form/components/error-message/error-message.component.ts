import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AbstractControl } from '@angular/forms'
import { validatorErrorMessage } from '@shared/auth-form/components/error-message/utils/validator-message'

@Component({
    selector: 'app-error-message',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
    @Input() control!: AbstractControl

    get errorMessage(): string {
        const error = this.control?.errors
        const validatorName = Object.keys(error ?? {})[0]
        return this.control.touched && validatorName ? validatorErrorMessage(validatorName) : ''
    }
}
