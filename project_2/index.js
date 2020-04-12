
	const fs = require('fs');
	const xml2js = require('xml2js');
	const xmldom = require('xmldom');
	const xpath = require('xpath');
	//const ejs = require('ejs');
	const express = require('express');
	var app = express();
	app.use(express.static('public'));
	app.set('view engine', 'ejs');
	var myJson, remove, result = [];

	fs.readFile('./sample.jsx', 'utf8', (err, data)=>{
		if(err) throw err;
			console.log('File Read Successfully\n');
		  
			  remove = data.replace('var config = ', '');
			  myJson = JSON.parse(remove);
			
	});

	fs.readFile('./archdischild_proofConfig.xml', 'utf8', (err, data)=>{
		if(err) throw err;
	
	var DOMParser = new xmldom.DOMParser();
	var xmlDoc = DOMParser.parseFromString(data, 'text/hml'); 
	var nodes = xpath.select("//article/div", xmlDoc);

	for(var i = 0; i < nodes.length; i++){
		var currentNode = nodes[i];
    	var node = xpath.select("./div[@class = 'front']", currentNode);
		var prefix =  node[0].getAttribute('prefix');
		if(prefix == ""){
			prefix = "undefined";
		}
		var value = myJson.articleTypeDetails[prefix];
		var type = typeof(value);

		if(type !== 'undefined'){
			var numberOfObj = myJson.pageColumnDetails[value].columnDetails;
			//console.log('prefix - '+prefix+':' + '   Number Of Coloum - '+numberOfObj.length);		
			var typeAttribute = nodes[i].getAttribute('type');
			//console.log(typeAttribute + ' - ' + numberOfObj.length);
			result.push({'type' : typeAttribute,
						'col' : numberOfObj.length});
			
		}else{
			var typeAttribute = nodes[i].getAttribute('type');
			//console.log(typeAttribute + ' - ' + 'Object Not Found');
			result.push({'type' : typeAttribute,
			'col' : 'Object Not Found'});
			//console.log(prefix +' - Object Not Found');
		}		
	}
	});
	//var nodes = xpath.select("//div[@type = 'Original article_Drug therapy']/div[@class = 'front']/@prefix", xmlDoc);


	fs.writeFile('./output.json',JSON.stringify(result), (err)=>{
		if(err) throw err;
	});
	app.get('/', (req, res)=>{
		res.render('table');
	});


	app.get('/getpageColumnDetails', (req, res)=>{	
		res.send(result);
	});

	app.listen(5000, ()=>{
		console.log('App running is - 5000');
	});