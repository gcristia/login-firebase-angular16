interface ErrorMessage {
    [key: string]: string
}

const errorMessage: ErrorMessage = {
    required: 'This field is required',
    pattern: 'Please enter a valid email address',
    minlength: 'Password must be at least 6 characters',
}

export const validatorErrorMessage = (validatorName: string): string => {
    return errorMessage[validatorName] ?? ''
}
