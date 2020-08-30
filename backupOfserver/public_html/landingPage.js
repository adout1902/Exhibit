
function setup(){

    $("#login").click(function () {
        authenticateUser();
        return false
    });

    console.log("loaded")


}

function authenticateUser(){

    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    console.log(username,password)
    $.ajax({
        url: "./cgi-bin/auth.py",
        type: "post",
        datatype:"json",
        //processData: false,
        data: {"username":username,"password":password},
        success: function(response){
            window.alert(response.message);
        }
    });

}