this.images=[],
this.textboxes=[],
this.toSave = [],

this.noImages= images.length,
this.noTextboxes= textboxes.length,

interact('.resize-drag')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: true,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {

    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    var w = event.rect.width;
    var h = event.rect.height;
    target.style.width  = w+ 'px';
    target.style.height = h+ 'px';
    
    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;
    var id = target.id;
    update(id,w,h);
    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

  });

function update(id, w, h){
    for (i=0; i<images.length;i++){
      var img = images[i];
      if (img.id == id ){
        img.height=h;
        img.width=w;
        
        break;
      }
  
  
  }
}


function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    var id = target.id;
    for (i=0; i<images.length;i++){
      var img = images[i];
      if (img.id == id ){
        img.x=x;
        img.y=y;
        
        break;
      }


  }
}

function addDiv(type) {

    var t = String(type)
    var div = document.createElement('div');
    div.style.position = "absolute";
    if (t == "image"){
    div.id = "image"+noImages; // change to autogen
    div.innerHTML = 'image';
    div.className = 'resize-drag image-div';
    div.style.left = 0+'px';
    div.style.top = 0+'px';
    noImages++;
    images.push({id:div.id, x:0, y:0, innerHTML:'image', className:'resize-drag image-div',hidden:false, width:0, height:0}) //remove x and y -- not used til save
  }

    else if (t= "textbox"){
      div.id = "text"+noTextboxes; // change to autogen
      div.innerHTML = 'text';
      div.className = 'resize-drag text-div';
      div.style.left = 100+'px';
      div.style.top = 100+'px';
      div.className="resize-drag text-div";
      noTextboxes++;
      textboxes.push({id:div.id, x:100, y:100})
    
    }
    div.appendChild(createDeleteButton(div.id));
    var parent = document.getElementById("divContent");
    parent.appendChild(div);

}

function createDeleteButton(id){
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  deleteButton.style.left = 0+'px';
  deleteButton.style.top = 0+'px';
  deleteButton.style.position="relative";
  deleteButton.className = "deleteBtn";
  deleteButton.addEventListener("click", function(event) {
  var elementClicked = event.target;
  var parent = document.getElementById("divContent");
  var toRemove = document.getElementById(id);
  toSave.push(id);
  toRemove.style.display = 'none';
  for (i=0; i<images.length;i++){
    if (images[i].id == id ){
      images[i].hidden=true;
      break;
    }


  }
  //parent.removeChild(toRemove);

  });

  return deleteButton;
}




/* function saveTextAsFile()
{
    var textToSave = document.getElementById("inputTextToSave").value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}
 
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
} */



/* 
function downloadDiv(filename, elementId, mimeType) {
    var elementHtml = document.getElementById(elementId).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/html';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elementHtml));
    link.click(); 
} */

function undo(){

  if (toSave.length>0){
    var id = toSave.pop();
    var toRestore = document.getElementById(id);
    toRestore.style.display = "block";
  }
  for (i=0; i<images.length;i++){
    if (images[i].id == id ){
      images[i].hidden=false;
      break;
    }


  }



}


function saveToXML(){

  var xmlString = "<exhibitElts></exhibitElts>";
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlString, "text/xml"); 

  for (i= 0;i<images.length;i=i+1){
    var img = images[i];
    if (img.hidden==false){
    var node = xmlDoc.createElement("image");
    node.setAttribute("id",img.id);
    var pos = xmlDoc.createElement("co-ordinates");
    pos.setAttribute("x", img.x);
    pos.setAttribute("y", img.y);
    var attr = xmlDoc.createElement("style");
    attr.setAttribute("height", img.height);
    attr.setAttribute("width", img.width);
    node.appendChild(pos);
    node.appendChild(attr);
    var elements = xmlDoc.getElementsByTagName("exhibitElts");
    elements[0].appendChild(node);
    }


  }
  console.log(xmlDoc);


}






/* function restore(){

  for (i= 0;i<images.length;i=i+1){

    var img = images[i]
    var div = document.createElement('div');
    div.style.position = "absolute";
    div.id = img.id // change to autogen
    div.innerHTML = 'image';
    div.className = 'resize-drag image-div';
    div.style.left = img.x+'px';
    div.style.top = img.y+'px';
  }



} */