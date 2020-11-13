const hbs = require('hbs');
const prettyJson = require('handlebars-prettyjson');

prettyJson(hbs);

var positionCounter = 1;
hbs.registerHelper('position', function() {

    if (positionCounter > 10) {
        positionCounter = 1;
        return positionCounter++;
    } else {
        return positionCounter++;
    }
});