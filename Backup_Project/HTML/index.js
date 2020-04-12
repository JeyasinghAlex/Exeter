

function validation(){
    var username = document.getElementById("name");
    var number = document.getElementById("mobile"); 
    var mail = document.getElementById("mail");
    //Regular Expression
    //var regex = /^[6-9][0-9]{9}$/;
    if(username.value.trim() == ""){
        username.style.border = "solid 1px red";
        alert("All Details Required");
        return false;
    }
    else if(number.value.trim() == ""){
        number.style.border = "solid 1px red";
        alert("All Details Required");
        return false;
    }
    else if(mail.value.trim() == ""){
        mail.style.border = "solid 1px red";
        return false
    }
    else{
        var jsonObj = {}
        jsonObj.name = username.value;
        jsonObj.number = number.value;
        jsonObj.email = mail.value;
        var convert = JSON.stringify(jsonObj);
        console.log(convert);
        return true;
    }
}

