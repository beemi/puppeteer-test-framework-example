const path = require('path');
let csvToJson = require('convert-csv-to-json');
let fileInputName = path.resolve('Tests', 'test.csv')

describe('csv', function () {

    it('should be csv to json', function () {
        console.log(fileInputName)
        let json = csvToJson.getJsonFromCsv(fileInputName);
        console.log(json)
    });

})
