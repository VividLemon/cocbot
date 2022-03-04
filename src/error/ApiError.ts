import { i18n } from '../bot'

export default class ApiError {
    code: number
    message: string

    constructor (code: number, message: string) {
      this.code = code
      this.message = message
    }

    static badRequest (message: string) {
      return new ApiError(400, `${message} ${i18n.__('errorWasLogged')}`)
    }

    static internal (message: string) {
      return new ApiError(500, `${message} ${i18n.__('errorWasLogged')}`)
    }
}
