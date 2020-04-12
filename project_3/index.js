const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser');
const xmldom = require('xmldom');
const xpath = require('xpath');

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended : true}));
var startPath = './xml/customers/';

var dir = [];
var proDir = [];
var jsxDir = [];
var result = [];
app.get('/', (req, res)=>{
    res.render('dropdown');
});

app.get('/getData', (req, res)=>{
    fromDir(startPath,'.html');
    function fromDir(startPath,filter){ 
        if (!fs.existsSync(startPath)){
            console.log("no dir ",startPath);
            return;
        }
        var cusDir=fs.readdirSync(startPath);
        for(var i=0;i<cusDir.length;i++){
            var dirName=path.join(startPath,cusDir[i]);
            var stat = fs.lstatSync(dirName);
            if (stat.isDirectory()){
                dir.push(cusDir[i]);
                //fromDir(dirName,filter); //recurse
            }
        };
    };   
    res.send(dir);
});

app.post('/getInnerData', (req, res)=>{
   var name = req.body.name;

   fromDir(startPath+name,'.html');
   function fromDir(startPath,filter){ 
       if (!fs.existsSync(startPath)){
           console.log("no dir ",startPath);
           return;
       }
       var subDir=fs.readdirSync(startPath);
       for(var i=0;i<subDir.length;i++){
           var dirName=path.join(startPath,subDir[i]);
           var stat = fs.lstatSync(dirName);
           if (stat.isDirectory()){
               proDir.push(subDir[i]);
               //fromDir(dirName,filter); //recurse
           }
       };
       res.send(proDir);
   };
})

app.post('/findFile', (req, res)=>{
   var folder = req.body.folder;
   var startPath = './jsx/customers/'+folder;
   fromDir(startPath,'.html');
    function fromDir(startPath,filter){ 
        if (!fs.existsSync(startPath)){
            console.log("no dir ",startPath);
            return;
        }
        var file=fs.readdirSync(startPath);
        for(var i=0;i<file.length;i++){
            var dirName=path.join(startPath,file[i]);
            var stat = fs.lstatSync(dirName);
            if (stat.isFile()){
                jsxDir.push(file[i]);
                //console.log(file[i]);
            }
        }
    };
    res.send(jsxDir);
});

app.post('/readFile', (req, res)=>{
    var file = req.body.file;
    var folder = req.body.folder;
    var subFolder = req.body.xml;
    var filePath = './jsx/customers/'+folder+'/'+file;
    fs.readFile( filePath, 'utf8', (err, data)=>{
        if(err) throw err;
        //var str = data.toString();
        console.log('----------JSX File Read Successfully');
        var removeConfig = data.replace('var config = ', '');
        //---------------------------------------------------
        //var myStr = JSON.stringify(removeConfig.trim());
        //var replaceStr = myStr.replace();
        //var str = JSON.stringify(removeConfig);
        reStr = removeConfig.replace(/'WHITE'/g, '"WHITE"');
        reStr = reStr.replace(/'top'/, '"top"');
        reStr = reStr.replace(/(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>|~)/g, '');
        //reStr = reStr.replace(/""""/g, "''");
        //var obj = JSON.parse(removeConfig);
        //reStr = obj.toString();
        var myJson = JSON.parse(reStr);
        //----------------------------------------------------
    fs.writeFile('output.txt', myJson, (err)=>{
        if(err) throw err;
        findXml(folder, subFolder, myJson);
        res.send(result);
    })
    })
});

function findXml(folder, subFolder,myJson){
    var filePath = './xml/customers/'+folder+'/'+subFolder+'/'+subFolder+'_proofConfig.xml';
    fs.readFile(filePath, 'utf8', (err, data)=>{
        if(err) throw err;
        console.log('----------XML File Read Successfully');
        var DOMParser = new xmldom.DOMParser();
        var xmlDoc = DOMParser.parseFromString(data, 'text/hml');
        var nodes = xpath.select("//article/div", xmlDoc);

        for(var i = 0; i < nodes.length; i++){
            var currentNode = nodes[i];
            var node = xpath.select("./div[@class = 'front']", currentNode);
            var prefix = node[0].getAttribute('prefix');
            if(prefix == ""){
                prefix = "undefined";
            }
            var value = myJson.articleTypeDetails[prefix];
            var type = typeof(value);

            if(type !== "undefined"){
                var numberOfObj = myJson.pageColumnDetails[value].columnDetails;
                var typeAttribute = nodes[i].getAttribute('type');
                result.push({
                    'type' : typeAttribute,
                    'col' : numberOfObj.length});
            }else{
                var typeAttribute = nodes[i].getAttribute('type');
                result.push({'type' : typeAttribute,
                            'col' : 'Object Not Found'});
            }
        }
    });
}

app.get('/getPageColumnDetails', (req, res)=>{
    res.send(result);
});

//-------------------------------------------------------------------------
var port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`app runing - ${port}`);
});