browser={
}

$(document).ready(function(){    
  /*search bar */
  console.log(localStorage.getItem("username"))
  $('#search').keyup(function (){
      $('.card').removeClass('d-none');
      var filter = $(this).val(); // get the value of the input, which we filter on
      $('.outer').find('.card .card-body h5:not(:contains("'+filter+'"))').parent().parent().addClass('d-none');
  })
  browser.refresh = $("#refresh")
  browser.refresh.click(function(){
    refreshCards()
    return false;
  })
  $("#workspaceTemplates").on("click",".editBttn", function(event){

	 event.stopPropagation();
         event.stopImmediatePropagation();

	 var id = parseInt( $(this).attr('data-templateID'));
         console.log(id)
	 edit(id)


   })
   $('.commentsBttn').on('click' ,function(){
        $(this).closest('.card').addClass('flipped');

        console.log("clicked comments")
    });

    $(".submit-comment").on("click",function(){
        var nameField = $(this).closest(".comments").find(".comment-name")
        var name = nameField.val()
        var textField = $(this).closest(".comments").find(".comment-text")
        var text = textField.val()
        //must be text for both name and text field (no blank comments)
        if(name!="" && text!=""){
            var containerID =  $(this).closest(".face").find(".comments-container").attr("id")
            addComment(name, text, containerID)
            nameField.val("")
            textField.val("")
	    addComment(name, text, containerID)
        }
        event.stopPropagation();
        return false;

    })

    $('.backBttn').on('click' ,function(){
        $(this).closest('.card').removeClass('flipped')
        console.log("clicked comments")
    });
    $(".comment-name").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $(".comment-text").focus() 
        }
        event.stopPropagation();
    });  
    $(".comment-text").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            var nameField = $(this).closest(".comments").find(".comment-name")
        var name = nameField.val()
        var textField = $(this).closest(".comments").find(".comment-text")
        var text = textField.val()
        if(name!="" && text!=""){
            var containerID =  $(this).closest(".face").find(".comments-container").attr("id")
            addComment(name, text, containerID)
            nameField.val("")
            textField.val("")
	    logComment(name, text,containerID)

        }
        event.stopPropagation();
        return false;
        }
        event.stopPropagation();
    });  
 	
});


function refreshCards(){
	window.location.replace("../cgi-bin/browse.py")
}


function checkUser(){
        var user = localStorage.getItem("username");
        console.log(user)
	ajax(user)
}

function ajax(user){
	$.ajax({
        url: "./auth.py",
        type: "post",
        datatype:"json",
        //processData: false,
        data: {"username":user,"password":"","action":"edit"},
        success: function(response){
            window.alert(response.permission);
            //logUser(response.username)
        },
       error : function () {
               alert("Error authenticating user");
       }

    });
}

function edit(templateID){
	
	window.alert("opening edit")
	window.open("./edit.py?mode=edit&templateID="+templateID)

}

function addComment(name, text, containerID){
    //reflect comment locally 
    console.log(containerID)
    var container = document.getElementById(containerID)
    container.insertAdjacentHTML("beforeend",`<strong>${name}: </strong>${text}<br>`)
    container.scrollTop = container.scrollHeight;
    
}

function logComment(name, text,containerID){
	var id = containerID.match(/\d+/g)[0];
	console.log("attempting to log comment for id",id)
    //add comment to DB
  $.ajax({
        url: "../cgi-bin/db.py",
        type: "post",
        datatype:"json",
        //processData: false,
        data: {"name":name,"text":text,"action":"comment","templateID":id},
        success: function(response){
            
        },
       error : function () {
               alert("Error saving comment");
       }
    });
  





}

