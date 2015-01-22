(function() {
  // Default to the local version.
  var path = '../libs/seajs/seajs.js';
  // Get any seajs=___ param from the query string.
  var seaversion = location.search.match(/[?&]seajs=(.*?)(?=&|$)/);
  // If a version was specified, use that version from cdn.bootcss.com.
  if (seaversion) {
    path = 'http://cdn.bootcss.com/seajs/' + seaversion[1] + '/sea.js';
  }
  // This is the only time I'll ever use document.write, I promise!
  document.write('<script src="' + path + '"></script>');
}());
