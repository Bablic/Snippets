/** This code must run before Bablic Snippet
 *  It is meant for users who use custom domains, but still wants to redirect first time users to their browser language
 *
 */

var detectBrowserLocale = function () {
    var language = navigator.userLanguage || navigator.language;
    if (!language)
        return null;
    return language.split('-')[0];
};

var bablicRedirect = function() {
    var isBot = navigator && navigator.userAgent && /bot|crawler|baiduspider|facebookexternalhit|Twitterbot|80legs|mediapartners-google|adsbot-google|seo/i.test(navigator.userAgent);
    if (isBot)
        return;

    var savedCookie = document.cookie;
    var locale = detectBrowserLocale();
    if(!locale) return;
    var domain = bablic.data.customUrls[locale];
    if(!domain) return;
    domain = domain.split('/')[0];
    if(location.hostname!=domain && !(location.search && location.search.indexOf('locale=') > -1) && !(savedCookie &&  savedCookie.indexOf('bab_redirect') > -1)){
        location.href = location.protocol + '//'+ domain + location.pathname + location.search;
    }
    else {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 365);
        document.cookie = "bab_redirect=1; expires=" + exdate.toUTCString() + "; path=/";
        bablic.on('beforeLocaleChange',function(targetLocale){
            var search = location.search || '';
            search = search.replace(/&?locale=\w\w(_\w\w)?/g,'');
            if(search == '?')
                search = '';
            if(search.indexOf('?') > -1)
                search += '&locale=' + targetLocale;
            else
                search += '?locale=' + targetLocale;
            history.replaceState(null,null,search + (location.hash || ''));
        });
    }
};
bablicRedirect();