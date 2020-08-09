var template = {
    noImages:0,
    noTextboxes:0,
    backgroundColour:"white"
}



//Store user change history 
var historyStore = {
    stackStyle : [], // for pos, dimensions and colour
    stackId : [],
    counter : -1,
    currentlyEditing : "",
    addToHistory : function(style, id){
        
        ++this.counter;
        this.stackStyle[this.counter] = style;
        this.stackId[this.counter] = id;
        //this.changeState(style, id);

        // delete anything forward of the counter
        this.stackStyle.splice(this.counter+1);
    },
    undo : function(){
        --this.counter;
        this.changeState(this.stackStyle[this.counter],this.stackId[this.counter]);        
    },
    redo : function(){
        if (this.counter <= this.stackStyle.length){
        ++this.counter;
        this.changeState(this.stackStyle[this.counter],this.stackId[this.counter]);}
       
    },
    changeState : function(style, id){
        
        //if it is not possible to undo or redo, change button appearance to indicate this
        if(this.counter <= -1)
        {
            $('#undo').addClass('disabled');            
            $('#redo').removeClass('disabled'); 
            return;
        }
        else
        {
            $('#undo').removeClass('disabled');            
        }
        
        
        if(this.counter == this.stackStyle.length)
        {
            $('#redo').addClass('disabled');
            $('#undo').removeClass('disabled');           
            return;
        }        
        else
        {
            $('#redo').removeClass('disabled');            
        }
        
        
        console.log(style + ' - ' + id);
        //Apply style stored in history to element
        $('#' + id).attr('style', style);     
        
        console.log(this.counter + ' - ' + this.stackStyle.length);
        
        
    }
};

function setup() {

    

    // this.noImages=0;
    // this.noTextboxes=0;

    $('#save-button').click(function(){


        save()
        alert('starting save');

      
    });


     // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    //add handlers to appropriate elements

    //make class .editable draggable

   

    //set up control panel click events 
    $( "#add-image" ).click(function() {
        
        addDiv("image");
        

    });
    $( "#add-text" ).click(function() {
        
        addDiv("textbox");
        

    });
    
    $( "#undo" ).click(function() {
        
        historyStore.undo();
        

    });

    $( "#redo" ).click(function() {
        
        historyStore.redo();
    

    });
    //exhibit space background colour changer 
    const exhibitSpace = document.getElementById("exhibit-space")
    const bgColourBttn = document.getElementById("change-bg")

    const pickr = new Pickr({
    el: bgColourBttn,
    useAsButton:true,
    //default: '#D2BFED',
    theme: 'nano',
    lockOpacity: true,
    
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
    
    components: {
        preview: true,
        opacity: true,
        hue: true,
    
        interaction: {
        hex: true,
        rgba: true,
        hsva: true,
        input: true,
        clear: true,
        save: true
        }
    }
    })/* .on('init', pickr => {
    exhibitSpace.style.backgroundColor = pickr.getSelectedColor().toRGBA().toString(0);
    }).on('save', color => {
    exhibitSpace.style.backgroundColor = color.toRGBA().toString(0);
    pickr.hide();
    });  */
    

    $( "#change-bg" ).click(function() {
        pickr.on('save', function(color){

            exhibitSpace.style.backgroundColor = color.toRGBA().toString(0);
            document.body.style.backgroundColor = color.toRGBA().toString(0);
            template.backgroundColour = color.toRGBA.toString(0);
            pickr.hide();

        })
    });
    
    refresh()
    console.log("loaded")
    
    
}

function save(){


    var dict = {};
    dict["bg-color"] = template.backgroundColour;
    dict[noImages] = template.noImages;
    dict[noTextboxes] = template.noTextboxes;
    $('.editable').each(function(i, obj) {
        var id = obj.getAttribute('id');
        var tmp =  $("#"+id)
        var style = tmp.attr("style")
        window.alert(id+tmp.css("border-width")+tmp.css("padding-top")+tmp.css("textAlign"))
        dict[id] = {"border-width":tmp.css("border-width"),"padding-top":tmp.css("padding-top"),"text-align":tmp.css("textAlign") }
        
    });
    console.log(dict)

  


    $.ajax({
        url: "/scripts/saveTemplate.py",
        type: "post",
        datatype:"json",
        data: dict,
        success: function(response){
            alert(response.message);
            alert(response.keys);
        }
    });


}

function refresh(){

    

    //apply drag and resize handlers to relevant elements 

    //make class .editable draggable -- change to make wrapper div draggable - bug with rotatable  
   /*  $('.wrapper').draggable(
    {
            stop: stopHandlerDrag,
            start: startHandlerDrag
            
    }); */
    $('.editable').draggable(
        {
                // stop: stopHandlerDrag,
                // start: startHandlerDrag
                
        });
        
    //make class .editable resizable    
    $('.editable').resizable(
    {
            // stop: stopHandlerResize,
            // start: startHandlerResize
            
    });

    //$('.editable').rotatable();

   /*  $('.editable').rotatable(
    {
        stop: stopHandlerRotate,
        start: startHandlerRotate

    }); */


    //hide elements on "delete" for easy undo/redo
    $(document).on("click", ".delete", function(ui) {

            
        var id = $(this).closest(".editable").attr('id');
        var style = $("#"+id).attr("style")
        console.log(style)
        console.log('before deleting'+id);
        historyStore.addToHistory(style, id);
        $(this).closest(".editable").css('display','none');    
        //Dettach all events
        // $('#'+id).draggable("option", "revert", false);
        // $('#'+id).resizable("option","revert",false);
        // //Reassign stop events
        // $('#'+id).draggable(
        // {
        //     stop: stopHandlerDrag,
        //     start: ''    
        // });
        // $('#'+id).resizable(
        // {
        //     stop: stopHandlerResize,
        //     start: '' 
        // });
                    
    });


    $(document).on("click", ".edit", function(ui) {

        
        //to change specific div that called the edit menu
        $('.edit').removeClass('editing')
        $(this).addClass('editing');
        
        var id = $(this).closest(".editable").attr('id');
        historyStore.currentlyEditing=id;
        openEditMenu();
        console.log("my id is:",id)
        var style = $("#"+id).attr("style")
        console.log(style)
        console.log('before editing'+id);
        historyStore.addToHistory(style, id);
        var bwidth = document.getElementById('border-width'); 
        bwidth.onchange = function(){
            changeBorderWidth(id, bwidth.value)
        } 
        var paddingTop = document.getElementById('text-padding-top'); 
        paddingTop.onchange = function(){
            changeTextPadding(id, paddingTop.value, "top")
        }
        var paddingLeft = document.getElementById('text-padding-left'); 
        paddingLeft.onchange = function(){
            changeTextPadding(id, paddingLeft.value, "left")
        }
        var paddingRight = document.getElementById('text-padding-right'); 
        paddingRight.onchange = function(){
            changeTextPadding(id, paddingRight.value, "right")
        }
        $('input[type=radio]').unbind('click').bind('click',function(){
            changeTextAlignment( historyStore.currentlyEditing, this.value);
        });
        $("#set-bwidth-btn").on('click',function(){
            changeBorderWidthInput(historyStore.currentlyEditing);
            return false;
        });
        $("#set-padding-btn").on('click',function(){
            changeTextPaddingInput(historyStore.currentlyEditing);
            return false;
        });
        var borderColChange = document.getElementById('border-color-change')
        borderColChange.onchange = function(){
            changeBorderColour(id, borderColChange.value)

        }
       
        
                        
    });
   

}

function changeTextAlignment(id,value){

   // document.getElementById(id).scrollIntoView()
    var div = $("#"+id);
    console.log("changing text alignment of" +id+ "to",value);
    div.css("textAlign",value)
}

function changeBorderWidth(id, value){
    //changes border thickness of div in question
    var div = $("#"+id);
    console.log("changing border width to",value);
    div.css("borderWidth",value+"px "+value+"px " +value+"px "+value+"px")
/*     var applyToAll = document.getElementById("BW-apply-all")
    applyToAll.onchange = function() {
        if(this.checked) {
            var type="";
            if(id.includes("image")){
                type = "image-div"
            }
            else{
                type = "text-div"
            }
            $("."+type).each(function(i, obj) {
                var current = parseInt($( this ).css("borderWidth"),10);
                var diff = parseInt($("#"+(historyStore.currentlyEditing)).css("borderWidth"),10)- current
                $( this ).css("borderWidth", current+diff+"px")
                
            });
        }
   }; */
}

function changeBorderWidthInput(id){

    var div = $("#"+id);
    //window.alert("my id is" + id)
    var newWidth = $('#input-bwidth').val();
    console.log(newWidth)
    div.css('borderWidth', newWidth+"px "+newWidth+"px " +newWidth+"px "+newWidth+"px");

}

function changeTextPadding(id, value, pos){
    //changes border thickness of div in question

    var div = $("#"+id).find('.text-place');
    console.log("changing text padding to",value);
    var positionString = "margin-"+pos;
    console.log(positionString)
    div.css(positionString,value+"px")

}

function changeTextPaddingInput(id){

    var div = $("#"+id).find('.text-place');
    var value = $('#input-padding').val();
    console.log("changing text padding to",value);
    div.css("margin", value+"px "+value+"px " +value+"px "+value+"px")

}
function changeBorderColour(id,value){

    var div = $("#"+id);
    console.log("changing colou to",value);
    div.css("borderColor",value )

}
/* 
function startHandlerRotate(event, ui)
{
    var id = $(this).closest(".editable").attr('id');
    var style = $(this).closest(".editable").attr('style');
    console.log("my id is:"+id)
    console.log("my style is:"+style)
    historyStore.addToHistory(style,id)
}

function stopHandlerRotate(event, ui)
{
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    historyStore.addToHistory(style, id);
    
}
 */

//For handling start of drag event -- store current to position in style history 
function startHandlerDrag(event, ui)
{
    //console.log('start drag');
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
   // historyStore.addToHistory(style, id);
    
    //Dettach all events
    $('#'+id).draggable("option", "revert", false);
    $('#'+id).resizable("destroy");
    //reassign stop events
    $('#'+id).draggable(
    {
        stop: stopHandlerDrag,
        start: ''    
    });
    $('#'+id).resizable(
    {
        stop: stopHandlerResize,
        start: '' 
    });
}

//For handling end of drag event -- store new position in style history 
function stopHandlerDrag(event, ui)
{
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    //historyStore.addToHistory(style, id);
    
}

//For handling start of resize event -- store current dimensions in style history 
function startHandlerResize(event, ui)
{
   // console.log('start resize');
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    //historyStore.addToHistory(style, id);
    //Dettach all events
    $('#'+id).draggable("option", "revert", false);
    $('#'+id).resizable("option","revert",false);
    //reassign stop events
    $('#'+id).draggable(
    {
        stop: stopHandlerDrag,
        start: ''    
    });
    $('#'+id).resizable(
    {
        stop: stopHandlerResize,
        start: '' 
    });
}


//For handling end of resize event -- store new dimensions in style history
function stopHandlerResize(event, ui)
{
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    historyStore.addToHistory(style, id);
}
       
//to add new image or text div 
function addDiv(type){

    var exhibitSpace = document.getElementById("exhibit-space")
    if (type == "image"){
        template.noImages++;
        
        //var wrapper = document.createElement('div');
        //wrapper.className='wrapper';
        var elem = document.createElement('div');
        elem.className = 'editable image-div ui-widget-content';
       // elem.innerHTML="<i class=\"fas fa-camera fa-2x\" style:\"top: calc(50% - 10px); position:relative;\"></i>"
        elem.id="image"+template.noImages;
        elem.style = "transition: border-width .5s, padding .5s; text-align: center; position: absolute; left: 100px; top:100px; background-color: #f1c40f; border-style: solid; border-color: black; border-width:10px";
        elem.appendChild(createDeleteButton(elem.id));
        elem.appendChild(createEditButton(elem.id));
        //wrapper.appendChild(elem);
      
        console.log('start add image');
        historyStore.addToHistory("transition: border-width .5s; text-align: center; position: absolute; left: 100px; top:100px; background-color: #f1c40f; border-style: solid; border-color: black; border-width:10px", elem.id);
    }
    else if (type=="textbox"){
        template.noTextboxes++;
        
        //var wrapper = document.createElement('div');
        //wrapper.className='wrapper';
        var elem = document.createElement('div');
        elem.className = 'editable text-div';
        var textPlaceholder = document.createElement('div');
        textPlaceholder.className = 'text-place'
        textPlaceholder.innerHTML="Placeholder<br>text"
        textPlaceholder.style = "transition: margin .5s; border-style: dotted; border-color: black; border-width:2px;";
        elem.id="textbox"+template.noTextboxes;
        elem.style = "transition: border-width .5s, padding .5s;  box-sizing: border-box; position: absolute; left: 100px; top:400px; background-color: rgb(97, 187, 104); border-style: solid; border-color: black; border-width:10px";
        elem.appendChild(createDeleteButton(elem.id));
        elem.appendChild(createEditButton(elem.id));
        elem.appendChild(textPlaceholder)
        //wrapper.appendChild(elem);
        exhibitSpace.appendChild(elem);
        console.log('start add textbox');
        historyStore.addToHistory("transition: border-width .5s; position: absolute; left: 100px; top:400px; background-color: rgb(97, 187, 104); border-style: solid; border-color: black; border-width:10px", elem.id);
       
    }
    exhibitSpace.appendChild(elem);
    refresh();


}

function createDeleteButton(id){
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.right = 0+'px';
    deleteButton.style.top = 0+'px';
    deleteButton.className="delete";
    deleteButton.style.position="absolute";
    return deleteButton;
}
function createEditButton(id){
    var editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.style.right = 30+'px';
    editButton.style.top = 0+'px';
    editButton.className="edit";
    editButton.style.position="absolute";
    return editButton;
}

function openEditMenu() {
    document.getElementById(historyStore.currentlyEditing).scrollIntoView()//currently only top of this
    document.getElementById("edit-menu").style.width = "250px";
    document.getElementById("edit-menu").style.zIndex = "2";
    document.getElementById("exhibit-space").style.marginLeft="250px"
    document.getElementById("control-panel").style.marginLeft="250px"
}
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeEditMenu() {
    document.getElementById("edit-menu").style.width = "0";
    document.getElementById("exhibit-space").style.marginLeft="0"
    document.getElementById("control-panel").style.marginLeft="0";
    $("#"+(historyStore.currentlyEditing)).find('.edit').removeClass('editing')
}