/**
 * This code must run before Bablic snippet
 * This is used to prevent Bablic snippet to be activated on specific URLs. The best approach will be to set it in the Server Side, but in some servers it might not be possible
 */
 
 
 if(location.pathname.indexOf('/blog') == 0){
     var bablic = window.bablic || {};
     bablic.ignoreAll = true;
 }
    
