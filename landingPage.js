
function setup(){

    document.getElementById("login").addEventListener('click', function (event) {
        authenticateUser();
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
        data: {'username':username,'password':password},
        success: function(response){
            alert(response.message);
        }
    });

}