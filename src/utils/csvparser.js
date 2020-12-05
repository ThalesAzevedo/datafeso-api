const fs = require('fs');

var toJson = function toJson(path) {
    var jsonData = []
    var csvData = fs.readFileSync(path,"utf-8",(err, data) => { })
    var csvLines = csvData.split('\n');
    var csvCells = csvLines.map(element=> {return element.split(';')});
    var id = 0

    for (var i = 1; i<csvCells.length; i++) {
        var productList = []
        
        for (var j = 1; j<csvCells[0].length; j++) {
            var title = csvCells[0][j]
            var value = csvCells[i][j]
            var valueNumber = parseFloat(value, 10)? parseFloat(value.replace(',','.'), 10):0
        
            productList.push({
                name: title,
                value: valueNumber
            })
        }
        
        id ++
        var date = csvCells[i][0].split('/')
        // var realDate = Date.UTC(parseInt(date[1]),parseInt(date[0])-1)? Date.UTC(parseInt(date[1]),parseInt(date[0])-1):0
        var realDate = date[1]+'-'+date[0]

        jsonData.push({
            dataCollection: id,
            date: realDate,
            products: productList
        })
    }
    // console.log(jsonData)
    return jsonData
}

module.exports = {toJson}