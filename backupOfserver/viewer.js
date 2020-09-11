browser={
names:["default"]
}

$(document).ready(function(){

    user = localStorage.getItem("username");

    $("#username").html(user)
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      $(function () {
        $('[data-hover="tooltip"]').tooltip()
      })   
  /*search bar */
  //console.log(localStorage.getItem("username"))
  $('#search').keyup(function (){
       $(".flip").removeClass("showSearch")
	var searchStr = $(this).val(); // get the value of the input, which we filter on
       search(searchStr)
  })
  /*creator name tag filter*/
  browser.tagManager = new Taggle('name-filter', {
    tags: ['default'],
    placeholder: '',
    preserveCase:true,
    onTagRemove: function(event, tag) {
        filterNames()
    },
    onTagAdd: function(event, tag) {
        filterNames()

    }
    });
    //})

  $('.nameLink').each(function(i, obj) {
	var name = $(this).val()
	browser.tagManager.add(name)
        browser.names.push(name)  
   });
   $('#add-all').on('click' ,function(){
	for (name in browser.names){
		browser.tagManager.add(browser.names[name])
	}
	filter(browser.names)	
    });
   $('#clear-all').on('click' ,function(){
	browser.tagManager.removeAll()
	
    });

  browser.refresh = $("#refresh")
  browser.refresh.click(function(){
    refreshCards()
    return false;
  })
  $("#workspaceTemplates").on("click",".editBttn", function(event){

	 event.stopPropagation();
         event.stopImmediatePropagation();
         $(this).tooltip('hide')

	
	 var id = parseInt( $(this).attr('data-templateID'));
         console.log(id)
	 edit(id)


   })
   $("#workspaceExhibits").on("click",".editBttn", function(event){

    event.stopPropagation();
        event.stopImmediatePropagation();
        $(this).tooltip('hide')

   
    var id = parseInt( $(this).attr('data-exhibitID'));
        console.log(id)
    editExhibit(id)


  })
    $('.nameLink').on('click' ,function(){
        event.stopPropagation();
         event.stopImmediatePropagation();
	  $('#clear-all').click()   	
          browser.tagManager.add($(this).val())
	   filterNames()
           return false;

   });

   $('.commentsBttn').on('click' ,function(){
	$(this).tooltip('hide')
        $(this).closest('.card').addClass('flipped');

      //  console.log("clicked comments")
    });


    $('.downloadBttn').on('click' ,function(){
	$(this).tooltip('hide')
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
	    logComment(name, text,containerID)
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
             $(this).closest(".comments").find(".comment-text").focus() 
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
    //filter by name of creator
     	
});

function filter(names){
       $('.flip').removeClass('show');
      //flip cards to front
      $('.card').removeClass('flipped');
        var toShow;
	for(name in names){
		var filter = names[name]
                console.log("name",names[name])	
      		$('.outer').find('.card .card-body h6:contains("'+filter+'")').closest(".flip").addClass("show")
		//$('.outer').find('.card .card-body h6:not(:containsCI("'+filter+'"))').closest(".flip").addClass('d-none');
	}
      //  console.log("to show:", toShow)
	hide()
	
}


function hide(){
	$('.flip').removeClass('d-none');


	$('.flip').each(function(i, obj) {
		if($(this).hasClass("show")&&($(this).hasClass("showSearch"))){
			
		}
		else{
		    $(this).addClass('d-none')
                    console.log($(this).attr("id"))

		}
   	});

}

function search(filter){
	$('.outer').find('.card .card-body h5:contains("'+filter+'")').closest(".flip").addClass("showSearch"); 
	hide()     

}
function filterNames(){
	var names = browser.tagManager.getTagValues()
	filter(names)

}


function refreshCards(){
	window.location.replace("../cgi-bin/browse.py?username="+localStorage.getItem("username"))
	//window.location.href = window.location.href		
}


function checkUser(){
        var user = localStorage.getItem("username");
      //  console.log(user)
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
	
	window.open("./edit.py?mode=edit&templateID="+templateID+"&username="+localStorage.getItem("username"))

}
/*function editExhibit(exhibitID){
	window.open("./populate.py?name="+exhibitID)
}*/

function addComment(name, text, containerID){
    //reflect comment locally 
    //console.log(containerID)
    var container = document.getElementById(containerID)
    container.insertAdjacentHTML("beforeend",`<strong>${name}: </strong>${text}<br>`)
    container.scrollTop = container.scrollHeight;
    
}

function logComment(name, text,containerID){
	var id = containerID.match(/\d+/g)[0];
	//console.log("attempting to log comment for id",id)
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

