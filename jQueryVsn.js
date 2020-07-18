this.noImages=0;

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
        
        //if it is not possiblel to undo or redo, change button appearance to indicate this
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
        //Apply history style
        $('#' + id).attr('style', style);     
        
        console.log(this.counter + ' - ' + this.stackStyle.length);
        
        
        
        
        
        
        
    }
};


$(document).ready(function (e) {

    //make class .editable draggable
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

    $( "#add-div" ).click(function() {
        
        addDiv();

      });
    
    
    
});

function refresh(){

    //make class .editable draggable
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

        $(document).on("click", ".delete", function(ui) {

            // Move up DOM tree until first incidence of .item-div and remove
            

            
            var style = $(ui.helper).attr('style');
            var id = $(this).closest(".image-div").attr('id');
            console.log('before deleting'+id);
            historyStore.addToHistory(style, id);
            $(this).closest(".image-div").css('display','none');
            
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
                    
            });
           
    




}




//Stop Handler Drag
function stopHandlerDrag(event, ui)
{
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    historyStore.addToHistory(style, id);
    
}


//Star Handler Drag
function startHandlerDrag(event, ui)
{
    console.log('start drag');
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

//Stop Handler Resize
function stopHandlerResize(event, ui)
{
    var style = $(ui.helper).attr('style');
    var id = $(ui.helper).attr('id');
    historyStore.addToHistory(style, id);
}

//Star Handler Resize
function startHandlerResize(event, ui)
{
    console.log('start resize');
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

//Click Events For Redo and Undo
$(document).on('click', '#redo', function () {
    historyStore.redo();
});

$(document).on('click', '#undo', function () {
    historyStore.undo();
});
                  

function addDiv(){
    noImages++;
    var exhibitSpace = document.getElementById("exhibit-space")
    var elem = exhibitSpace.appendChild(document.createElement('div'));
    elem.className = 'editable image-div';
    elem.id=noImages;
    elem.style = "left: 10px; top:10px; background-color: #f1c40f";
    elem.appendChild(createDeleteButton(elem.id));
    refresh();

}

function createDeleteButton(id){
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.style.left = 10+'px';
    deleteButton.style.top = 0+'px';
    deleteButton.className="delete";
    deleteButton.style.position="absolute";
    return deleteButton;
  }

function removeImage(id){

    //var exhibitSpace = document.getElementById("exhibit-space");
    var toRemove = document.getElementById(id);
    toRemove.style.display="none"
    //exhibitSpace.removeChild(toRemove);


}