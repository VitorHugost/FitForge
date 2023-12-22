export class AppError {
    message: string;

    constructor(message: string) {
        this.message = message
    }
}

export function handleError(error: any) {
    const isAppError = error instanceof AppError
    const title = isAppError ? error.message : "Não foi possivel entrar. Tente novamente"
    return title
}