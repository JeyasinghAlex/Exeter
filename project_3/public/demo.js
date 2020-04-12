
function onClick(){
$(document).ready(function(){
        $.get('/getData', function(data, status){
            if(status == 'success'){
                for(var i = 0; i < data.length; i++){
                    $('#selectData').append('<option value=' + data[i] +'>' + data[i] + '</option>');
                    //document.write('<option value=' + data[i] +'>' + data[i] + '</option>')
                }
            }else{
                console.log('Cannot find API');
            }             
        });
    });
        var dom = document.getElementById('selectData');
        var value = dom.options[dom.selectedIndex].value;
        if(value !== "Choose"){
            getValue(value);
        }else{
            console.log('Select the value');
        }
}

function getValue(value){
            $.post("/getInnerData", {name: value}, function(data, status){
            //console.log("Data: " + data + "\nStatus: " + status);
            if(status == "success"){
                for(var i = 0; i < data.length; i++){
                    $('#subData').append('<option value=' + data[i] +'>' + data[i] + '</option>');
                }
            }else{
                console.log('Cannot find API');
            }
        });
        var dom = document.getElementById('subData');
            value1 = dom.options[dom.selectedIndex].value;
        if(value1 !== "Choose"){
           findFile(value, value1);
        }else{
            console.log('Select the value');
        }
}

function findFile(value, value1){
    var file = value+'_'+value1;
    var upperFile = file.toUpperCase(); 
    var fileName = upperFile.concat('_indesignAutoPageConfig.jsx');  
    var result = true;
            $.post('/findFile', {folder : value}, function(data, status){
                if(status == 'success'){
                   for(var i = 0; i < data.length; i++){
                       if(fileName == data[i]){
                            console.log(data[i]);
                            result = false;
                            $.post('/readFile', {file : data[i], folder : value, xml : value1}, function(data, status){
                               
                               if(status == 'success'){
                                   $.get('/getPageColumnDetails', function(data, status){
                                       console.log('--------'+status+'----------');
                                       for (var i = 0; i < data.length; i++) {
                                        $("#momo").append("<tr>"+'<td>' + data[i].type + "</td>"+'<td>'+data[i].col+'</td>'+"</tr>");
                                    }
                                   })
                               }
                            })
                            break;
                       }
                   }
                   if(result) console.log('Cannot find file');
                }
                else{
                    console.log('cannot find API');
                }
             });
}