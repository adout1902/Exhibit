var template = {
    noImages:0,
    noTextboxes:0,
    backgroundColour:"white",
    saved:false,
    name:""
}



//Store user change history 
var historyStore = {
    stackStyle : [], // for pos, dimensions and colour
    stackId : [],
    counter : -1,
    currentlyEditing : "",
    addToHistory : function(style, id){
        
        this.counter++;
        this.stackStyle[this.counter] = style;
        this.stackId[this.counter] = id;
        //this.changeState(style, id);

        // delete anything forward of the counter
        this.stackStyle.splice(this.counter+1);
    },
    undo : function(){
        this.counter--;
        this.changeState(this.stackStyle[this.counter],this.stackId[this.counter]);        
    },
    redo : function(){
        if (this.counter <= this.stackStyle.length){
        this.counter++;
        this.changeState(this.stackStyle[this.counter],this.stackId[this.counter]);}
       
    }
    ,
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
        
        console.log(this.counter + ' in counter of - ' + this.stackStyle.length);
        
        
    }
};


var editItems = {

     bwidth :  document.getElementById('border-width'),
     bgCol : document.getElementById("change-bg-colour")

}
function setup(mode) {

    

    // this.noImages=0;
    // this.noTextboxes=0;

    
    $('#save-template').click(function(){

        var filename = $('#filename').val();
        save(filename)
        alert('starting save');

      
    });

    $('#render').click(function(){

       render();

      
    });
    $('#browse').click(function(){

       window.open("testCards.html")
 
       
     });

    

        
        $("#save-modal, #modal-close").click(function() {
            $("#modal-content, #modal-background").toggleClass("active");
        });

  
    $('#populate').click(function(){
        window.open("./cgi-bin/populate.py?");
    });

     // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    //add handlers to appropriate elements

    //make class .editable draggable

   

    //set up control panel click events 
    $( "#add-image" ).click(function() {
        
        addDiv("image","");
        return false;

    });
    
    $( "#add-text" ).click(function() {
        
        addDiv("textbox","");
        return false;

    });
    
    $( "#undo" ).click(function() {
        
        historyStore.undo();
        return false;

    });

    $( "#redo" ).click(function() {
        
        historyStore.redo();
        return false;
    

    });
    
    //exhibit space background colour changer 
    // const exhibitSpace = document.getElementById("exhibit-space")
    // const bgColourBttn = document.getElementById("change-bg")

    // const pickr = new Pickr({
    // el: bgColourBttn,
    // useAsButton:true,
    // //default: '#D2BFED',
    // theme: 'nano',
    // lockOpacity: true,
    
    // swatches: [
    //     'rgba(244, 67, 54, 1)',
    //     'rgba(233, 30, 99, 0.95)',
    //     'rgba(156, 39, 176, 0.9)',
    //     'rgba(103, 58, 183, 0.85)',
    //     'rgba(63, 81, 181, 0.8)',
    //     'rgba(33, 150, 243, 0.75)',
    //     'rgba(3, 169, 244, 0.7)',
    //     'rgba(0, 188, 212, 0.7)',
    //     'rgba(0, 150, 136, 0.75)',
    //     'rgba(76, 175, 80, 0.8)',
    //     'rgba(139, 195, 74, 0.85)',
    //     'rgba(205, 220, 57, 0.9)',
    //     'rgba(255, 235, 59, 0.95)',
    //     'rgba(255, 193, 7, 1)'
    // ],
    
    // components: {
    //     preview: true,
    //     opacity: true,
    //     hue: true,
    
    //     interaction: {
    //     hex: true,
    //     rgba: true,
    //     hsva: true,
    //     input: true,
    //     clear: true,
    //     save: true
    //     }
    // }
    // })/* .on('init', pickr => {
    // exhibitSpace.style.backgroundColor = pickr.getSelectedColor().toRGBA().toString(0);
    // }).on('save', color => {
    // exhibitSpace.style.backgroundColor = color.toRGBA().toString(0);
    // pickr.hide();
    // });  */
    

    // $( "#change-bg" ).click(function() {
    //     pickr.on('save', function(color){

    //         exhibitSpace.style.backgroundColor = color.toRGBA().toString(0);
    //         document.body.style.backgroundColor = color.toRGBA().toString(0);
    //         template.backgroundColour = console.log((color.toRGBA).toString(0));
    //         pickr.hide();

    //     })
    // });
    // document.getElementById("textures").addEventListener('click', function (event) {
    //     if ( event.target && event.target.matches("input[type='radio']") ) {
    //        changeBGTexture(event.target.value)
    //     }
    // });

   

   
    

    editItems.bwidth =  document.getElementById('border-width')
    editItems.heightChanger = document.getElementById('set-height')
    editItems.widthChanger = document.getElementById('set-width')
    editItems.bgCol = document.getElementById("change-bg-colour")

    document.getElementById("input-height")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("set-height").click();
    }
    });
    
    document.getElementById("input-width")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("set-width").click();
    }
    });

    editItems.bgCol.onchange = function(){
        changeBGColour()

    }

    refresh()
    console.log("loaded")
    if (mode=="testEdit"){

        editTemplate()
        
    }
   
    
    
}

function changeBGColour(){
    var bgCol = editItems.bgCol
    //save current style
    var bodyStyle = $("body").attr('style')
    historyStore.addToHistory(bodyStyle,"body");
    // var exhibitStyle = $("#exhibit-space").attr('style')
    // historyStore.addToHistory(exhibitStyle, "exhibit-space")
    console.log("saved current")

    //change colour
    document.body.style.backgroundColor = bgCol.value;
    //document.getElementById("exhibit-space").style.backgroundColor = bgCol.value;
    template.backgroundColour= bgCol.value;

    //save new style
    bodyStyle = $("body").attr('style')
    historyStore.addToHistory(bodyStyle,"body");
    // exhibitStyle = $("#exhibit-space")
    // historyStore.addToHistory(exhibitStyle, "exhibit-space")
    console.log("saved new")


}



function save(filename){

    var dict = {};
    var contents ={}
   
    contents["bgColor"] = template.backgroundColour;
    contents["noImages"] = template.noImages;
    contents["noTextboxes"] = template.noTextboxes;
    contents["items"]=[];
    $('.editable').each(function(i, obj) {
        var id = obj.getAttribute('id');
        var tmp =  $("#"+id)
        var style = tmp.attr("style")
        //window.alert(id+tmp.css("border-width")+tmp.css("padding-top")+tmp.css("textAlign"))

        var bgCol =tmp.css("background-color");

        if (bgCol=="none"){ bgCol="white"}
        var top =tmp.css("top")
        console.log(top)
                    
        contents["items"].push({"id":id,"top":top,"left":tmp.css("left"),"width":tmp.css("width"),"height":tmp.css("height"),
        "borderWidth":tmp.css("border-width"),"padding":tmp.css("padding"),"textAlign":tmp.css("textAlign"),"shadow":tmp.css("box-shadow"),
        "z":tmp.css("zIndex"),"borderStyle":"solid", "borderColor":tmp.css("border-color"),"backgroundColor":tmp.css("background-color") })
        
    });
    dict["filename"]=filename;
    
	

	//take screenshot to save as template preview
        // html2canvas(document.getElementById('exhibit-space'), {
        // onrendered: function(canvas) {
        //    var tempcanvas = document.createElement('canvas');
        //    tempcanvas.width=465;
        //    tempcanvas.height=524;
        //    var context=tempcanvas.getContext('2d');
        //    context.drawImage(canvas,465,40,465,524,0,0,465,524);
        //    template.templateImg=canvas.toDataURL();
	    //    ajax(filename,JSON.stringify(contents),template.templateImg)	
        //    console.log(template.templateImg)
 	    //    dict["templateImg"]=template.templateImg;
        //   // console.log(dict["templateImg"])
        //    window.alert("screenshot taken")         
            
        //    }
        //  });
            document.getElementById("exhibit-space").style.backgroundColor = template.backgroundColour;
            html2canvas(document.getElementById('exhibit-space'),{
            onrendered: function( canvas ) {
               
                var tempcanvas = document.createElement('canvas');
                tempcanvas.width=465;
                tempcanvas.height=524;
                var context=tempcanvas.getContext('2d');
                context.drawImage(canvas,465,40,465,524,0,0,465,524);
                var a = document.createElement('a');
                // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
                a.href = canvas.toDataURL()
                a.download = 'somefilename.jpg';
                a.click();
                document.getElementById("exhibit-space").style.backgroundColor = "";
         }
    
    })
  
    dict["contents"]=JSON.stringify(contents)
	console.log(template.templateImg)

		
   
}
function ajax(filename,contents,img){


	 $.ajax({
        url: "./cgi-bin/saveTemplate.py",
        type: "post",
        data: {"filename":filename,"contents":contents,"templateImg":img},
	datatype: "json",
        success: function(response){
           window.alert("saved")
           template.saved=true;
	   template.name=filename
           //console.log(dict)
        },
        error : function () {
                alert("Error Ajax");
        }
    });


}

function render(){

   /* $.ajax({
              url: "./cgi-bin/renderTemplate.py",
             context: document.body
            }).done(function() {
            
            });*/


	 window.open("./cgi-bin/renderTemplate.py?name="+template.name);
}

function editTemplate(){

    //dummy data: Stonewall
    editTemplate = {"bgColor": "#e6bcbc", "noImages": 1, "noTextboxes": 4, "items": [{"id": "title", "top": "11px", "left": "31px", "width": "605px", "height": "100px", "borderWidth": "5px", "padding": "0px", "textAlign": "center", "shadow": "none", "z": "auto", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgba(0, 0, 0, 0)"}, {"id": "textbox1", "top": "162px", "left": "626px", "width": "500px", "height": "97px", "borderWidth": "10px", "padding": "0px", "textAlign": "left", "shadow": "none", "z": "1", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(217, 13, 13)"}, {"id": "image1", "top": "305px", "left": "854px", "width": "200px", "height": "200px", "borderWidth": "10px", "padding": "0px", "textAlign": "center", "shadow": "rgb(128, 128, 128) 11px 11px 11px 0px", "z": "1", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(255, 255, 255)"}, {"id": "textbox2", "top": "400px", "left": "100px", "width": "500px", "height": "119px", "borderWidth": "10px", "padding": "0px", "textAlign": "left", "shadow": "none", "z": "2", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(217, 105, 13)"}, {"id": "textbox3", "top": "556.4px", "left": "754px", "width": "500px", "height": "151px", "borderWidth": "10px", "padding": "0px", "textAlign": "left", "shadow": "none", "z": "3", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(251, 255, 0)"}, {"id": "textbox4", "top": "650px", "left": "184px", "width": "500px", "height": "200px", "borderWidth": "10px", "padding": "0px", "textAlign": "left", "shadow": "none", "z": "4", "borderStyle": "solid", "borderColor": "rgb(0, 0, 0)", "backgroundColor": "rgb(19, 187, 7)"}], "templateImg": "Stonewalltemplate.jpg"}
    
    //get background colour
    template.backgroundColour = editTemplate["bgColour"];
    document.body.style.backgroundColor = editTemplate["bgColour"];
    //document.getElementById("exhibit-space").style.backgroundColor = editTemplate["bgColour"];

    //fill in the existing items
    items = editTemplate["items"]
    document.getElementById("exhibit-space").innerHTML+=`${items.map(makeDiv).join("")}`
    
    refresh()

}

function makeDiv(div) {
    var type = ""
    var placeholder = ""
    if (div["id"].includes("text")){
        type = "text-div";
        placeholder = "<div class='text-place' style='transition: margin .5s;border-style: dotted; border-color: black; border-width:2px; background-color:white'>Placeholder<br>text</div>"

    }
    else if (div["id"].includes("image")){
        type = "image-div"
    }

    return `
    <div class="editable ${type}" id="${div.id}" style="position:absolute;border-style:solid; border-width:${div.borderWidth};padding:${div.padding};text-align:${div.textAlign};box-shadow:${div.shadow};z-index:${div.z};border-color:${div.borderColor};position:absolute;height:${div.height};width:${div.width};top:${div.top};left:${div.left};background-color:${div.backgroundColor}">
        <button class="edit" style="position:absolute; top:0px;right:30px">edit</button>
        <button class="delete" style="position:absolute;top:0px;right:0px">X</button>
        ${placeholder}
    </div>
 
     `
    
}



function changeBGTexture(texture){

    //remove previous textures
  
    
    $('.workspace').addClass(texture);
    
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
                stop: stopHandlerDrag,
                start: startHandlerDrag
                
        });
        
    //make class .editable resizable    
    $('.editable').resizable(
    {
            stop: stopHandlerResize,
            start: startHandlerResize
            
    });

    //$('.editable').rotatable();

   /*  $('.editable').rotatable(
    {
        stop: stopHandlerRotate,
        start: startHandlerRotate

    }); */


    //hide elements on "delete" for easy undo/redo
    $(document).on("click", ".delete", function(event) {

        event.stopPropagation();
        event.stopImmediatePropagation();

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

    $(".copy").on("click", function(event) {



        event.stopPropagation();
        event.stopImmediatePropagation();
        
        var id = $(this).closest(".editable").attr('id');
        var type="";
        if (id.includes("image")){
            type = "image"
        }
        else{
            type = "textbox"
        }
        addDiv(type,id)
    })


    $(".edit").on("click", function(event) {

        event.stopPropagation();
        event.stopImmediatePropagation();

        //todo: move definitions to setup funct
        //to change specific div that called the edit menu
        $('.edit').removeClass('editing')
        $(this).addClass('editing');
        
        var id = $(this).closest(".editable").attr('id');
        historyStore.currentlyEditing=id;
        openEditMenu();
        console.log("edit menu open")
        var style = $("#"+id).attr("style")
        console.log(style)
        // console.log('opened edit menu - saving style of '+id);
        // historyStore.addToHistory(style, id);
        
        editItems.bwidth.onchange = function(){
            changeBorderWidth(id, editItems.bwidth.value)
        } 
        var swidth = document.getElementById('shadow-width'); 
        swidth.onchange = function(){
            changeShadowWidth(id, swidth.value)
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

        $("#set-height").unbind('click').bind('click',function(){
            changeHeight(historyStore.currentlyEditing);
            return false;
        });

        $("#set-width").unbind('click').bind('click',function(){
            changeWidth(historyStore.currentlyEditing);
            return false;
        });
        //to do: display input colour as currently used border colour (need to convert to hex)
        // var current = $("#"+id).css("borderColor");
        // console.log("current:",current) 
        var borderColChange = document.getElementById('border-color-change')
        //borderColChange.value=current;
        borderColChange.onchange = function(){
            changeBorderColour(id, borderColChange.value);
            
        }
        var textboxColChange = document.getElementById('textbox-color-change')
        //borderColChange.value=current;
        textboxColChange.onchange = function(event){
            event.stopPropagation();
            event.stopImmediatePropagation();
    
            changeTextboxColour(id, textboxColChange.value);
            return false;
            
        }
        $("#add-z").unbind('click').bind('click',function(){
            changeLayer(id, 1)
            return false;
        });
        $("#sub-z").unbind('click').bind('click',function(){
            changeLayer(id,-1)
            return false;
        });

       
        
                        
    });
  
}


function changeLayer(id, value){
    //add max and min
    var noImages = template.noImages;
    var noTextboxes = template.noTextboxes;
    var max = Math.max(noImages, noTextboxes)
   
    var div = $("#"+id);
    //console.log("changing z value of" +id+ "to",value);
    var style = div.attr('style')
    console.log('changed layer - saving style of '+id);
    historyStore.addToHistory(style, id);
    var current = div.css('zIndex');
    var newLayer= parseInt(current)+parseInt(value);
    if (newLayer<0){
        newLayer = 0
    }
    else if (newLayer>max+1){
        newLayer = max+1
    }

    console.log("changing z value of" +id+ "from",parseInt(current),"to",newLayer);
    div.css("zIndex",newLayer)
    style = div.attr('style')
    historyStore.addToHistory(style, id);

}

function changeTextAlignment(id,value){

   // document.getElementById(id).scrollIntoView()
    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed text align - saving style of '+id);
    historyStore.addToHistory(style, id);
    div.css("textAlign",value)
    style = div.attr('style')
    historyStore.addToHistory(style, id);
}

// function changeBorderWidth(id, value){
//     //changes border thickness of div in question
//     var div = $("#"+id);
//     console.log("changing border width to",value);
//     div.css("borderWidth",value+"px "+value+"px " +value+"px "+value+"px")
// /*     var applyToAll = document.getElementById("BW-apply-all")
//     applyToAll.onchange = function() {
//         if(this.checked) {
//             var type="";
//             if(id.includes("image")){
//                 type = "image-div"
//             }
//             else{
//                 type = "text-div"
//             }
//             $("."+type).each(function(i, obj) {
//                 var current = parseInt($( this ).css("borderWidth"),10);
//                 var diff = parseInt($("#"+(historyStore.currentlyEditing)).css("borderWidth"),10)- current
//                 $( this ).css("borderWidth", current+diff+"px")
                
//             });
//         }
//    }; */
// }

function changeBorderWidth(id, value){
    //changes border thickness of div in question
    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed border width - saving style of '+id);
    historyStore.addToHistory(style, id);
    console.log("changing border width to",value);
    document.getElementById(id).style.borderWidth = value+"px "+value+"px " +value+"px "+value+"px"
   // div.css("borderWidth",value+"px "+value+"px " +value+"px "+value+"px")
    style = div.attr('style')
    historyStore.addToHistory(style, id);

}

function changeShadowWidth(id, value){
    //changes border thickness of div in question
    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed shadow width - saving style of '+id);
    historyStore.addToHistory(style, id);
    console.log("changing shadow width to",value);
    div.css("boxShadow",value+"px "+value+"px " +value+"px grey" )
    style = div.attr('style')
    historyStore.addToHistory(style, id);

}




function changeBorderWidthInput(id){

    var div = $("#"+id);
    //window.alert("my id is" + id)
    var style = div.attr('style')
    historyStore.addToHistory(style, id);
    var newWidth = $('#input-bwidth').val();
    console.log(newWidth)
    div.css('borderWidth', newWidth+"px "+newWidth+"px " +newWidth+"px "+newWidth+"px");
    style = div.attr('style')
    historyStore.addToHistory(style, id);

}

function changeWidth(id){

    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed div width - saving style of '+id);
    historyStore.addToHistory(style, id);
    //window.alert("my id is" + id)
    var newWidth = $('#input-width').val();
    console.log(newWidth)
    div.css('width',newWidth );
    style = div.attr('style')
    historyStore.addToHistory(style, id);

}
function changeHeight(id){

    var div = $("#"+id);
    var style = div.attr('style')
    historyStore.addToHistory(style, id);
    //window.alert("my id is" + id)
    var newHeight = $('#input-height').val();
    console.log(newHeight)
    div.css('height', newHeight);
    style = div.attr('style')
    historyStore.addToHistory(style, id);

}

function changeTextPadding(id, value, pos){
    //changes border thickness of div in question

    var div = $("#"+id).find('.text-place');
    var style = div.attr('style')
    console.log('changed text padding - saving style of '+id);
    historyStore.addToHistory(style, id);
    var positionString = "margin-"+pos;
    console.log(positionString)
    div.css(positionString,value+"px")
    style = div.attr('style')
    historyStore.addToHistory(style, id);

}

function changeTextPaddingInput(id){

    var div = $("#"+id).find('.text-place');
    var style = div.attr('style')
    historyStore.addToHistory(style, id);
    var value = $('#input-padding').val();
    console.log("changing text padding to",value);
    div.css("margin", value+"px "+value+"px " +value+"px "+value+"px")
    style = div.attr('style')
    historyStore.addToHistory(style, id);

}
function changeBorderColour(id,value){

    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed border colour - saving style of '+id);
    historyStore.addToHistory(style, id);
    console.log("changing colour to",value);
    div.css("borderColor",value )
    style = div.attr('style')
    historyStore.addToHistory(style, id);
}
function changeTextboxColour(id,value){

    var div = $("#"+id);
    var style = div.attr('style')
    historyStore.addToHistory(style, id);
    console.log('changed colour - saving style of '+id);
    console.log("changing colour to",value);
    // div.attr('style',"background-color:"+value);
    div.css("backgroundColor",value )
    var style = div.attr('style')
    historyStore.addToHistory(style, id);
   
    

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
    historyStore.addToHistory(style, id);
    
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
    historyStore.addToHistory(style, id);
    
}

//For handling start of resize event -- store current dimensions in style history 
function startHandlerResize(event, ui)
{
   // console.log('start resize');
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    historyStore.addToHistory(style, id);
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
function addDiv(type,id){

    
    var exhibitSpace = document.getElementById("exhibit-space")
    if (type == "image"){
        template.noImages++;
        
        //var wrapper = document.createElement('div');
        //wrapper.className='wrapper';
        var elem = document.createElement('div');
        elem.className = 'editable image-div ui-widget-content';
       // elem.innerHTML="<i class=\"fas fa-camera fa-2x\" style:\"top: calc(50% - 10px); position:relative;\"></i>"
        elem.id="image"+template.noImages;
        var z = Math.max(template.noImages,template.noTextboxes);
        
        elem.style = "z-index: "+z+";transition: border-width .5s, padding .5s; text-align: center; position: absolute; left: 100px; top:100px; background-color: white; border-style: solid; border-color: black; border-width:10px";
       
        //wrapper.appendChild(elem);
      
    
    }
    else if (type=="textbox"){
        template.noTextboxes++;
        
        //var wrapper = document.createElement('div');
        //wrapper.className='wrapper';
        var elem = document.createElement('div');
        elem.className = 'editable text-div';
        var textPlaceholder = document.createElement('div');
        textPlaceholder.className = 'text-place'
        textPlaceholder.innerHTML="Placeholder<br>text";
        var z = Math.max(template.noImages,template.noTextboxes);
        textPlaceholder.style = "transition: margin .5s;border-style: dotted; border-color: black; border-width:2px; background-color:white";
        elem.id="textbox"+template.noTextboxes;
        elem.style = "z-index: "+z+";transition: border-width .5s, padding .5s;  box-sizing:content-box; position: absolute; left: 100px; top:400px; background-color: white; border-style: solid; border-color: black; border-width:10px";
        elem.appendChild(textPlaceholder)
        //wrapper.appendChild(elem);
    
       
    }
    elem.appendChild(createDeleteButton(elem.id));
    elem.appendChild(createEditButton(elem.id));
    elem.appendChild(createCopyButton(elem.id));

    if (id!="")
    {
        var toCopy =document.getElementById(id)
        elem.style.borderStyle = toCopy.style.borderStyle
        elem.style.borderColor = toCopy.style.borderColor
        elem.style.borderWidth = toCopy.style.borderWidth
        elem.style.backgroundColor = toCopy.style.backgroundColor
    }

    historyStore.addToHistory(elem.style, elem.id);

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

function createCopyButton(id){
    var copyButton = document.createElement("button");
    copyButton.textContent = "copy";
    copyButton.style.right = 30+'px';
    copyButton.style.top = 50+'px';
    copyButton.className="copy";
    copyButton.style.position="absolute";
    return copyButton;
}


function openEditMenu() {
    //document.getElementById(historyStore.currentlyEditing).scrollIntoView()//currently only top of this
    document.getElementById("edit-menu").style.width = "280px";
    document.getElementById("edit-menu").style.zIndex = "2";
    document.getElementById("exhibit-space").style.marginLeft="280px"
    document.getElementById("control-panel").style.marginLeft="280px";
   
}
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeEditMenu() {
    document.getElementById("edit-menu").style.width = "0";
    document.getElementById("exhibit-space").style.marginLeft="0"
    document.getElementById("control-panel").style.marginLeft="0";
   
    $("#"+(historyStore.currentlyEditing)).find('.edit').removeClass('editing');
   
}