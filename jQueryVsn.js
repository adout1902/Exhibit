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
    addToHistory : function(style, id){
        
        ++this.counter;
        this.stackStyle[this.counter] = style;
        this.stackId[this.counter] = id;
        this.changeState(style, id);

        // delete anything forward of the counter
        this.stackStyle.splice(this.counter+1);
    },
    undo : function(){
        --this.counter;
        this.changeState(this.stackStyle[this.counter],this.stackId[this.counter]);        
    },
    redo : function(){
        ++this.counter;
        this.changeState(this.stackStyle[this.counter],this.stackId[this.counter]);
       
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

    this.noImages=0;

    //add handlers to appropriate elements

    //make class .editable draggable
   

    //set up control panel click events 
    $( "#add-div" ).click(function() {
        
        addDiv();
        

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
            pickr.hide();

        })
    });
    
    refresh()
    console.log("loaded")
    
    
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
    $(document).on("click", ".delete", function(ui) {

            
        var id = $(this).closest(".image-div").attr('id');
        var style = $("#"+id).attr("style")
        console.log(style)
        console.log('before deleting'+id);
        historyStore.addToHistory(style, id);
        $(this).closest(".image-div").css('display','none');    
        //Dettach all events
        $('#'+id).draggable("option", "revert", false);
        $('#'+id).resizable("option","revert",false);
        //Reassign stop events
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
                    
    });
}
/* 
function startHandlerRotate(event, ui)
{
    var id = $(this).closest(".image-div").attr('id');
    var style = $(this).closest(".image-div").attr('style');
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
    console.log('start drag');
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
    console.log('start resize');
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
function addDiv(){
    template.noImages++;
    var exhibitSpace = document.getElementById("exhibit-space")
    //var wrapper = document.createElement('div');
    //wrapper.className='wrapper';
    var elem = document.createElement('div');
    //elem.innerText="right click to edit"
    elem.className = 'editable image-div';
    elem.id=template.noImages;
    elem.style = "left: 10px; top:10px; background-color: #f1c40f";
    elem.appendChild(createDeleteButton(elem.id));
    //wrapper.appendChild(elem);
    exhibitSpace.appendChild(elem);
    console.log('start add');
    refresh();
    historyStore.addToHistory("left: 100px; top:100px; background-color: #f1c40f", elem.id);

}

function createDeleteButton(id){
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.left = 0+'px';
    deleteButton.style.top = 0+'px';
    deleteButton.className="delete";
    deleteButton.style.position="relative";
    return deleteButton;
  }
