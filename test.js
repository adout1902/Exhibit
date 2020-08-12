

$(document).ready(function() { 
    $('.editable').resizable(
        {
                stop: stopHandlerResize,
                start: startHandlerResize
                
    })
    $('.editable').draggable(
        {
                stop: stopHandlerResize,
                start: startHandlerResize
                
    })
 });


 function startHandlerDrag(event, ui)
{
    console.log('start drag');
    var id = $(ui.helper).attr('id');
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
   
    
}

//For handling start of resize event -- store current dimensions in style history 
function startHandlerResize(event, ui)
{
  
    //Dettach all events
    var id = $(ui.helper).attr('id');
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
  
}