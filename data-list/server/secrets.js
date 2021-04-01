/*
 * Keeps the app's secrets (anything that can be stolen and used inappropriately).
 *
 * Note, if we were using public GIT repository, this file would NOT be committed and pushed!
 *
 * @author Joseph Nagy
 */

// Note, these objects can hold whatever you need to access your API (e.g., username/password, etc.)
exports.HOTEL_API = {
    URL: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/nearby',
    TOKEN: '4c4ad45605msha5568e011cc9bcfp196140jsn774959241e26',
};