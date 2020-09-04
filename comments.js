$(document).ready(function(){
 
    $('#toggle').on('click' ,function(){
        $('.card').toggleClass('flipped');
    });

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
        }
        event.stopPropagation();
        return false;
        }
        event.stopPropagation();
    });  
  
});

function  addComment(name, text, containerID){
    console.log(containerID)
    var container = document.getElementById(containerID)
    container.insertAdjacentHTML("beforeend",`<strong>${name}: </strong>${text}<br>`)
    container.scrollTop = container.scrollHeight;
}