
const fs = require('fs');
fs.appendFile('data.txt' , 'sparrow', (err)=>{
    if(err) throw err;
    consolelog('Data Saved');
});