const fs = require('fs');

const text = fs.readFileSync('stock.txt');
//console.log(text.toString());

const jsondata = JSON.parse(text);
//console.log(data[0]);
let stock_ids = new Set();
for (obj of jsondata) {
    stock_ids.add(obj.symbol);
}
//console.log(stock_ids);
let wanted = jsondata.filter(function (jsondata) { return (jsondata.symbol == 'EL'); });
// //console.log(wanted);
// let a = [];

// for (obj of wanted) {
//     a.push(obj['close'])
// }
// let create = {
//     id: String,
//     info: {
//         date: Date,
//         o: Number,
//         h: Number,
//         l: Number,
//         c: Number
//     }
// }
// let stock = new Map();
// for(obj of data) {
//     if(stock_ids.has(obj.symbol)) {
//         stock.set('')
//     }
// }


let inp_id = "EL";
let dates = []
let close = []
for (obj of wanted) {
    dates.push(obj.date);
    close.push(obj.close);
}
document.getElementById('myChart').innerHTML = dates;
module.exports = {dates, close};




