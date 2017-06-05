var $ = window.jQuery;
$(function() {
  // define the selector on which the typed is on
  var selector = '#typedElement';
  // make Bablic exclude the translation of this element;
  bablic.selector(selector).exclude();
  $(selector).each(function() { 
    var target = this;
    // get the original words
    var words = $(target).data('typed').strings;
    // wait after translation of page
    bablic.on('translated',function() {     
      // translate those words
      var translations = words.map(bablic.__);
      // update translated words in typed
      var data = $(target).data('typed');
      data.strings = translations;
      $(target).data('typed',data);
    });
  });
});
