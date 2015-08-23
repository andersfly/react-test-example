require('core-js/es5');
var context = require.context('./src/js', true, /-spec\.(js|jsx)$/);
context.keys().forEach(context);
