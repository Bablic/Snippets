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
    // dont redirect for crawlers
		var isBot = navigator && navigator.userAgent && /bot|crawler|baiduspider|facebookexternalhit|Twitterbot|80legs|mediapartners-google|adsbot-google|seo/i.test(navigator.userAgent);
		if (isBot)
			return;

		document.addEventListener('bablicload',function() {
			var locale = detectBrowserLocale();
			if(!locale) return;
			var domain = bablic.data.customUrls[locale];
			if(!domain) return;
			domain = domain.split('/')[0];
			if (location.hostname!=domain){
         // redirect is needed, only if url not explictly says locale, or cookie says
				var currentSearch = location.search;
				if (currentSearch && currentSearch.indexOf('locale=') > -1)
					return;
				if (document.cookie && document.cookie.indexOf('bab_locale') > -1)
					return;

				location.href = location.protocol + '//'+ domain + location.pathname + currentSearch;				
			}
			else {
          // before user changes a language, make sure locale string is a part of the URL (to prevent back redirects)
			    bablic.on('beforeLocaleChange',function(targetLocale){
					var targetHref = location.pathname + location.search + location.hash;					
					if(targetHref.indexOf('?') > -1)
						targetHref += '&locale=' + targetLocale;
					else
						targetHref += '?locale=' + targetLocale;
					history.replaceState(null,null,targetHref);
				});
			}			
		});
	};
	bablicRedirect();
