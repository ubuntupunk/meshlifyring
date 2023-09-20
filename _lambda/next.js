import { redirect, getNext, getRandom } from './utils';

exports.handler = function(event, context, callback) {
    const { referer } = event.headers
    const site = getNext(referer) || getRandom();
    

if (!site) {
    // Handle the case where no valid site URL is available
    callback(null, {
        statusCode: 500, // Internal Server Error
        body: JSON.stringify({ error: 'Unable to determine redirect URL' }),
    });
    return;
}

// Ensure the site URL uses HTTPS (if possible)
const secureSite = site.startsWith('https://') ? site : `https://${site}`;

callback(null, redirect(secureSite));
};