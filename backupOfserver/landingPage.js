function setup(){

    localStorage.setItem("username", "");

    $("#login").click(function () {
        authenticateUser("login");
        return false
    });
    $("#signup").click(function () {
        authenticateUser("signup");
        return false
    });
    $('.browse-bttn').on('click' ,function(){
	browse()
	 return false


    });
    $('.edit-bttn').on('click' ,function(){
	edit()
	 return false

    });


    console.log("loaded")


}

function authenticateUser(action){

    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    //console.log(username,password)
    $.ajax({
        url: "./cgi-bin/userAuth.py",
        type: "post",
        datatype:"json",
        //processData: false,
        data: {"username":username,"password":password,"action":action},
        success: function(response){
            window.alert(response.message);
            if (response.code == 1){
            	logUser(username)
     
	    }
        }
    });

}

function logUser(username){
    localStorage.setItem("username", username);
    //console.log("username in local storage", username)
    $.ajax({
        url: "./cgi-bin/logUser.py",
        type: "post",
        datatype:"json",
        //processData: false,
        data: {"username":username},
        success: function(){
           $("#user").html(username)
        }
    });

    
}

function browse(){
	window.open("./cgi-bin/browse.py?username="+localStorage.getItem("username"));
        return false;

}

function edit(){
	window.open("./cgi-bin/edit.py?mode=new&username="+localStorage.getItem("username"));
	return false;

}

