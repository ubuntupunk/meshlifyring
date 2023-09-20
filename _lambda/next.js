import { redirect, getNext, getRandom } from './utils'

exports.handler = function(event, context, callback) {
    const { referer } = event.headers
    const site = getNext(referer) || getRandom()

    callback(null, redirect(site))
}
