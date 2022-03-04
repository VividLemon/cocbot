import { i18n } from '../bot'
import { ApiError } from '../error'

/**
 * @description Cuts down the locale to what i18n can recognize -- length of 2
 * @param {string} locale in either en form or en-US form
 * @returns {promise<string>} slices locale down to 2
 */
export default (locale: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (locale.length > 2) {
      resolve(locale.slice(0, 2))
    } else if (locale.length === 2) {
      resolve(locale)
    } else {
      reject(ApiError.internal(i18n.__('Localeissue'))) // Locale is not standard length of 2 or 5
    }
  })
}
