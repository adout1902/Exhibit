var template= {}

function Template(noImages = 0, noTextboxes = 0, backgroundColour="white",saved=false, name="",lastSaved="") {
    /*environment variables*/
    this.noImages = noImages;
    this.noTextboxes = noTextboxes;
    this.backgroundColour = backgroundColour,
    this.saved = saved;
    this.name = name;
    this.lastSaved = lastSaved;

    /*element style histories*/
    this.historyStore = {
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
}
/*setup function - determine if new template or existing, if existing then initialise */

function setup(mode){
    if(mode=="edit"){

    }
    else{
        
        template = new Template();
        /*control panel DOM elements*/
        template.save = $('#save-modal')
        template.render = $("#render")
        template.browse = $("#browse")
        
        template.saveModal = $("#save-template")
        template.closeModal = $("#modal-close")
        template.modalContent = $("#modal-content")
        template.modalBackground = $("#modal-background")
        template.filename = $("#filename")

        template.populate = $("#populate")

        template.editMenu = document.getElementById("edit-menu")
        template.exhibitSpace = document.getElementById("exhibit-space")
        template.workspace = $(".workspace")
        template.controlPanel = document.getElementById("control-panel")


        /*edit menu DOM elements*/
        template.divHeight = $("#input-height")
        template.divWidth = $("#input-width")
        template.divHeightBttn = $("#set-height")
        template.divWidthBttn = $("#set-width")
        template.borderWidth = document.getElementById("border-width")
        template.borderWidthInput = $("#input-bwidth")
        template.borderWidthBttn = $("#set-bwidth-btn")
        template.paddingT = document.getElementById("text-padding-top")
        template.paddingL = document.getElementById("text-padding-left")
        template.paddingR = document.getElementById("text-padding-right")
        template.paddingInput = $("#input-padding")
        template.paddingInputBttn = $("#set-padding-btn")
        template.textAlign = $('input[name=text-alignment]')
        template.textBackgroundColour =  document.getElementById("textbox-color-change")
        template.borderColour = document.getElementById("border-color-change")
        template.shadow = document.getElementById("shadow-width")
        template.shadowInput = $("#input-swidth")
        template.shadowInputBttn = $("#set-swidth-btn")
        template.layerB = $("#sub-z")
        template.layerF = $("#add-z")

        /*whole template edit DOM elements 
        add: texture*/
        template.addImage = $("#add-image")
        template.addTextbox = $("#add-text")
        template.undo = $("#undo")
        template.redo = $("#redo")
        template.templateBGColour = document.getElementById("change-bg-colour")

        
        /*control panel listeners*/
        template.saveModal.click(function(){
            var filename = template.filename.val();
            save(filename)
            alert('starting save');
            
        })

        template.render.click(function(){
            render()
            return false;
        })

        template.browse.click(function(){
            
            return false;
        })
        template.save.click(function() {
            template.modalContent.toggleClass("active");
            template.modalBackground.toggleClass("active")
            return false;
        });
        template.closeModal.click(function() {
            template.modalContent.toggleClass("active");
            template.modalBackground.toggleClass("active")
            return false;
        });

        /*edit template listeners*/

        template.addImage.click(function(){
            addDiv("image","");
            return false;
        })
        template.addTextbox.click(function(){
            addDiv("textbox","");
            return false;
        })
        template.undo.click(function() {
            template.historyStore.undo();
            return false;
        });
        template.redo.click(function() {
            template.historyStore.redo();
            return false;
        });

        template.templateBGColour.onchange = (function(){
            changeBGColour()
        })

        /*edit option listeners */

        template.workspace.on("click", ".edit", function(event) {

            event.stopPropagation();
            event.stopImmediatePropagation();
    
            //indicate which div is being edited by changing colour of edit bttn
            $('.edit').removeClass('editing')
            $(this).addClass('editing');
    
            var toEdit = $(this).closest(".editable")
            
            var id = toEdit.attr('id');
            $(".text-only").removeClass("d-none")
            if(id.includes("image")){
                //only display edit panels applicable to images
                $(".text-only").addClass("d-none")

            }
            template.historyStore.currentlyEditing=id;
            openEditMenu();
            displayCurrentStyle(toEdit)
            console.log("edit menu open")
            var style = toEdit.attr("style")
            console.log(style)
           
            template.borderWidth.onchange = (function(){
                changeBorderWidth(id, template.borderWidth.value)
            })
           
            template.shadow.onchange = (function(){
                changeShadowWidth(id, template.shadow.value)
            })
    
            template.shadowInputBttn.click(function(){
                changeShadowWidth(id, template.shadowInput.val())
                return false;
            })
    
            template.paddingT.onchange = (function(){
                changeTextPadding(id, template.paddingT.value, "top")
            })
    
            template.paddingL.onchange = (function(){
                changeTextPadding(id, template.paddingL.value, "left")
            })
        
            template.paddingR.onchange = (function(){
                changeTextPadding(id, template.paddingR.value, "right")
            })
    
            template.textAlign.unbind('click').bind('click',function(){
                changeTextAlignment( template.historyStore.currentlyEditing, this.value);
            });
    
            template.borderWidthBttn.on('click',function(){
                changeBorderWidthInput(template.historyStore.currentlyEditing);
                return false;
            });
    
            template.paddingInputBttn.on('click',function(){
                changeTextPaddingInput(template.historyStore.currentlyEditing);
                return false;
            });
    
            template.divHeightBttn.unbind('click').bind('click',function(){
                changeHeight(template.historyStore.currentlyEditing);
                return false;
            });
    
            template.divWidthBttn.unbind('click').bind('click',function(){
                changeWidth(template.historyStore.currentlyEditing);
                return false;
            });
            //to do: display input colour as currently used border colour (need to convert to hex)
            // var current = $("#"+id).css("borderColor");
            // console.log("current:",current) 
            
            template.borderColour.onchange = function(){
                changeBorderColour(id, template.borderColour.value);
                
            }
            
            template.textBackgroundColour.onchange = function(event){
                event.stopPropagation();
                event.stopImmediatePropagation();
                changeTextboxColour(id, template.textBackgroundColour.value);
                return false;
                
            }
            template.layerF.unbind('click').bind('click',function(){
                changeLayer(id, 1)
                return false;
            });
            template.layerB.unbind('click').bind('click',function(){
                changeLayer(id,-1)
                return false;
            });
        });
    
        //delete
        template.workspace.on("click",".delete", function(event) {
    
            event.stopPropagation();
            event.stopImmediatePropagation();
    
            var toDelete = $(this).closest(".editable")
            var id = toDelete.attr('id');
            var style = toDelete.attr("style")
            console.log(style)
            console.log('before deleting'+id);
            template.historyStore.addToHistory(style, id);
            toDelete.css('display','none'); 
            style = toDelete.attr("style")
            template.historyStore.addToHistory(style, id);  
        });
        //copy
        template.workspace.on("click",".copy", function(event) {
    
            event.stopPropagation();
            event.stopImmediatePropagation();
    
            var toCopy = $(this).closest(".editable")
            var id = toCopy.attr('id');
            console.log("copying", id)
            if(id.includes("image")){
                addDiv("image", id)
            }
            else{
                addDiv("textbox", id)
            }
        });

        
        /*edit menu key bindings*/

        template.divHeight.keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                template.divHeightBttn.click()
            }
            event.stopPropagation();
        });

        template.divWidth.keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                template.divWidthBttn.click() 
            }
            event.stopPropagation();
        });

        template.borderWidthInput.keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                template.borderWidthBttn.click() 
            }
            event.stopPropagation();
        });

        template.paddingInput.keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                template.paddingInputBttn.click() 
            }
            event.stopPropagation();
        });

        template.divWidth.keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                template.divWidthBttn.click() 
            }
            event.stopPropagation();
        });

        template.shadowInput.keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                template.shadowInputBttn.click() 
            }
            event.stopPropagation();
        });
        console.log("loaded")
        refresh()
    }
}

function displayCurrentStyle(toEdit){
    /*use current style values in menu options as reference */
    var id = toEdit.attr("id")
    template.divHeight.val(toEdit.css("height"))
    template.divWidth.val(toEdit.css("width"))

    var border =  parseInt(toEdit.css("borderWidth"))
    template.borderWidth.value = border
    template.borderWidthInput.val(border)

    if(id.includes("text")){
        var div = toEdit.find('.text-place');
        var paddingStr = div.css("margin")
        var numbers = paddingStr.match(/\d+/g).map(Number);
        //order:top, right, bottom, left
        if (numbers.length!=1){
        console.log(numbers)
        template.paddingT.value = numbers[0]
        template.paddingR.value = numbers[1]
        template.paddingL.value = numbers[3]
        }
        else{
            template.paddingT.value = 0
            template.paddingR.value = 0
            template.paddingL.value = 0
        }
        template.paddingInput.val(paddingStr)

        //move BG colour here
    }

    if (toEdit.css("boxShadow")!="none"){
        var shadowStr = toEdit.css("boxShadow")
        var numbers = shadowStr.match(/\d+/g).map(Number);
        template.shadow.value = numbers[3]
        template.shadowInput.val(numbers[3])
    }
    else{
        template.shadow.value = 0
        template.shadowInput.val(0)

    }

    // template.textAlign.value = 
    var textAlignStr = toEdit.css("textAlign")
    $("#"+textAlignStr).prop("checked", true);

    var borderColStr = toEdit.css("borderColor")
    console.log(borderColStr)
    console.log(rgbToHex(borderColStr))
    template.borderColour.value = rgbToHex(borderColStr)

    var bgColStr = toEdit.css("backgroundColor")
    template.textBackgroundColour.value = rgbToHex(bgColStr)


}

function rgbToHex(borderColStr){
    borderColStr = borderColStr.split("(")[1].split(")")[0];
    borderColStr = borderColStr.split(",")

    var hex = borderColStr.map(function(x){             //For each array element
        x = parseInt(x).toString(16);      //Convert to a base16 string
        return (x.length==1) ? "0"+x : x;  //Add zero if we get only one character
    })

    hex = "#"+hex.join("");
    return hex


}

function refresh(){
    /*apply relevant classes to newly added elements 
    to do: rotatable*/

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
    

}

/*control panel functions*/

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
        //NB: save innerText margin as padding 
        var div = tmp.find('.text-place');
        var padding = div.css("margin")
        var bgCol =tmp.css("background-color");

        if (bgCol=="none"){ bgCol="white"}
        var top =tmp.css("top")
        console.log(top)
                    
        contents["items"].push({"id":id,"top":top,"left":tmp.css("left"),"width":tmp.css("width"),"height":tmp.css("height"),
        "borderWidth":tmp.css("border-width"),"padding":padding,"textAlign":tmp.css("textAlign"),"shadow":tmp.css("box-shadow"),
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
    window.open("./cgi-bin/renderTemplate.py?name="+template.name);
}


/*template editing functions*/
function changeBGColour(){
    var bgCol = template.templateBGColour
    var body = $("#body")
    //save current style
    var bodyStyle = body.attr('style')
    template.historyStore.addToHistory(bodyStyle,"body");
    console.log("saved current")

    //change colour
    document.body.style.backgroundColor = bgCol.value;
    template.backgroundColour = bgCol.value;

    //save new style
    bodyStyle = body.attr('style')
    template.historyStore.addToHistory(bodyStyle,"body");
    console.log("saved new")
}

function addDiv(type,id){

    var exhibitSpace = document.getElementById("exhibit-space")
    var elem = document.createElement('div');
    if (type == "image"){
        template.noImages++;
        elem.className = 'editable image-div ui-widget-content';
       // elem.innerHTML="<i class=\"fas fa-camera fa-2x\" style:\"top: calc(50% - 10px); position:relative;\"></i>"
        elem.id="image"+template.noImages;
        var z = Math.max(template.noImages,template.noTextboxes);
        elem.style = "z-index: "+z+";transition: border-width .5s, padding .5s; text-align: center; position: absolute; left: 100px; top:100px; background-color: white; border-style: solid; border-color: black; border-width:10px";      
    }
    else if (type=="textbox"){
        template.noTextboxes++;
        elem.className = 'editable text-div';
        var textPlaceholder = document.createElement('div');
        textPlaceholder.className = 'text-place'
        textPlaceholder.innerHTML="Placeholder<br>text";
        var z = Math.max(template.noImages,template.noTextboxes);
        textPlaceholder.style = "transition: margin .5s;border-style: dotted; border-color: black; border-width:2px; background-color:white";
        elem.id="textbox"+template.noTextboxes;
        elem.style = "z-index: "+z+";transition: border-width .5s, padding .5s;  box-sizing:content-box; position: absolute; left: 100px; top:400px; background-color: white; border-style: solid; border-color: black; border-width:10px";
        elem.appendChild(textPlaceholder)
    }
    elem.appendChild(createDeleteButton(elem.id));
    elem.appendChild(createEditButton(elem.id));
    elem.appendChild(createCopyButton(elem.id));

    if (id!="")
    {
        var toCopy = document.getElementById(id).style
        elem.style.borderStyle = toCopy.borderStyle
        elem.style.borderColor = toCopy.borderColor
        elem.style.borderWidth = toCopy.borderWidth
        elem.style.backgroundColor = toCopy.backgroundColor
        elem.style.boxShadow = toCopy.boxShadow
        elem.style.zIndex = toCopy.zIndex
        elem.style.height = toCopy.height
        elem.style.width = toCopy.width
        elem.style.top = toCopy.top
        elem.style.left = (parseInt(toCopy.left)+20)+"px"

        // console.log(toCopy.boxShadow)
        // var toCopy = document.getElementById(id)
        // var styles = ["height","width","top","left","borderStyle","borderColor","borderWidth","backgroundColor","boxShadow","zIndex"]
        // var len = styles.length
        // for (index = 0; index < len.length; ++index) {
        //     var str = styles[index]
        //     elem.style[str] = toCopy.style[str]
        // }
        // console.log(elem.style)

    }

    template.historyStore.addToHistory(elem.style, elem.id);
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

function startHandlerDrag(event, ui)
{
    //console.log('start drag');
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    template.historyStore.addToHistory(style, id);
    
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
    template.historyStore.addToHistory(style, id);
    
}

//For handling start of resize event -- store current dimensions in style history 
function startHandlerResize(event, ui)
{
   // console.log('start resize');
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    template.historyStore.addToHistory(style, id);
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
    var div = $(ui.helper)
    var style = div.attr('style');
    var id = div.attr('id');
    var newHeight = div.css("height")
    var newWidth = div.css("width")
    template.divHeight.val(newHeight)
    template.divWidth.val(newWidth)
    template.historyStore.addToHistory(style, id);
}

/*edit menu functions */
function openEditMenu() {
    template.editMenu.style.width = "280px";
    template.editMenu.style.zIndex = "2";
    template.exhibitSpace.style.marginLeft="280px"
    template.controlPanel.style.marginLeft="280px";
   
}
  
/* Close when someone clicks on the "x" symbol inside the overlay */
function closeEditMenu() {
    template.editMenu.style.width = "0";
    template.exhibitSpace.style.marginLeft="0"
    template.controlPanel.style.marginLeft="0";
   
    $("#"+(template.historyStore.currentlyEditing)).find('.edit').removeClass('editing');

}

function changeLayer(id, value){
    var noImages = template.noImages;
    var noTextboxes = template.noTextboxes;
    var max = Math.max(noImages, noTextboxes)
   
    var div = $("#"+id);
    //console.log("changing z value of" +id+ "to",value);
    var style = div.attr('style')
    console.log('changed layer - saving style of '+id);
    template.historyStore.addToHistory(style, id);
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
    template.historyStore.addToHistory(style, id);
}

function changeTextAlignment(id,value){

   // document.getElementById(id).scrollIntoView()
    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed text align - saving style of '+id);
    template.historyStore.addToHistory(style, id);
    div.css("textAlign",value)
    style = div.attr('style')
    template.historyStore.addToHistory(style, id);
}

function changeBorderWidth(id, value){
    //changes border thickness of div in question
    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed border width - saving style of '+id);
    template.historyStore.addToHistory(style, id);
    console.log("changing border width to",value);
    document.getElementById(id).style.borderWidth = value+"px "+value+"px " +value+"px "+value+"px"
   // div.css("borderWidth",value+"px "+value+"px " +value+"px "+value+"px")
    template.borderWidthInput.val(value)
    style = div.attr('style')
    template.historyStore.addToHistory(style, id);

}

function changeShadowWidth(id, value){
    //changes border thickness of div in question
    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed shadow width - saving style of '+id);
    template.historyStore.addToHistory(style, id);
    console.log("changing shadow width to",value);
    div.css("boxShadow",value+"px "+value+"px " +value+"px grey" )
    template.shadowInput.val(value)
    style = div.attr('style')
    template.historyStore.addToHistory(style, id);

}
function changeBorderWidthInput(id){

    var div = $("#"+id);
    //window.alert("my id is" + id)
    var style = div.attr('style')
    template.historyStore.addToHistory(style, id);
    var newWidth = $('#input-bwidth').val();
    console.log(newWidth)
    div.css('borderWidth', newWidth+"px "+newWidth+"px " +newWidth+"px "+newWidth+"px");
    style = div.attr('style')
    template.historyStore.addToHistory(style, id);
}

function changeWidth(id){

    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed div width - saving style of '+id);
    template.historyStore.addToHistory(style, id);
    //window.alert("my id is" + id)
    var newWidth = $('#input-width').val();
    console.log(newWidth)
    div.css('width',newWidth );
    style = div.attr('style')
    template.historyStore.addToHistory(style, id);

}
function changeHeight(id){

    var div = $("#"+id);
    var style = div.attr('style')
    template.historyStore.addToHistory(style, id);
    //window.alert("my id is" + id)
    var newHeight = template.divHeight.val();
    console.log(newHeight)
    div.css('height', newHeight);
    style = div.attr('style')
    template.historyStore.addToHistory(style, id);

}

function changeTextPadding(id, value, pos){
    //changes border thickness of div in question

    var div = $("#"+id).find('.text-place');
    var style = div.attr('style')
    console.log('changed text padding - saving style of '+id);
    template.historyStore.addToHistory(style, id);
    var positionString = "margin-"+pos;
    console.log(positionString)
    div.css(positionString,value+"px")
    template.paddingInput.val(value)
    style = div.attr('style')
    template.historyStore.addToHistory(style, id);

}

function changeTextPaddingInput(id){

    var div = $("#"+id).find('.text-place');
    var style = div.attr('style')
    template.historyStore.addToHistory(style, id);
    var value = $('#input-padding').val();
    console.log("changing text padding to",value);
    div.css("margin", value+"px "+value+"px " +value+"px "+value+"px")
    style = div.attr('style')
    template.historyStore.addToHistory(style, id);

}
function changeBorderColour(id,value){

    var div = $("#"+id);
    var style = div.attr('style')
    console.log('changed border colour - saving style of '+id);
    template.historyStore.addToHistory(style, id);
    console.log("changing colour to",value);
    div.css("borderColor",value )
    style = div.attr('style')
    template.historyStore.addToHistory(style, id);
}
function changeTextboxColour(id,value){

    var div = $("#"+id);
    var style = div.attr('style')
    template.historyStore.addToHistory(style, id);
    console.log('changed colour - saving style of '+id);
    console.log("changing colour to",value);
    // div.attr('style',"background-color:"+value);
    div.css("backgroundColor",value )
    var style = div.attr('style')
    template.historyStore.addToHistory(style, id);

}