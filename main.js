this.images=[],
this.textboxes=[],
this.toSave = [],

this.noImages= images.length,
this.noTextboxes= textboxes.length,
this.savedHTML ="";




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
    updateDimensions(id,w,h);
    //toSave.push( document.getElementById("exhibitContent").innerHTML);
    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

  });

function updatePos(id, x, y){

    if (id.includes("text")){var list = textboxes} else{var list = images}
    for (i=0; i<list.length;i++){
      var div = list[i];
      if (div.id == id ){
        div.x=x;
        div.y=y;        
        break;
      }
  
  
  }
}



function updateDimensions(id, w, h){

  if (id.includes("text")){var list = textboxes} else{var list = images}
  for (i=0; i<list.length;i++){
    var div = list[i];
    if (div.id == id ){
      div.w=w;
      div.h=h;        
      break;
    }


}
}


function dragMoveListener (event) {
  //toSave.push( document.getElementById("exhibitContent").innerHTML);
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
    //update image objects
    getPos(id)
}

function getPos(id){

  var bodyRect = document.getElementById("exhibitContent").getBoundingClientRect();
  var element = document.getElementById(id);
  var elemRect = element.getBoundingClientRect();
  var yOffset   = elemRect.top - bodyRect.top;
  var xOffset = elemRect.left-bodyRect.left;
  updatePos(id,xOffset,yOffset)

}


function addDiv(type) {
    //add placeholder divs for images and text
    var t = String(type)
    var div = document.createElement('div');
    if (t == "image"){
    div.id = "image"+noImages; // change to autogen?
    div.innerHTML = 'image';
    div.className = 'resize-drag image-div';
    div.style.left = 150+'px';
    div.style.top = 160+'px';
    noImages++;
    images.push({id:div.id, x:0, y:0, innerHTML:'images', className:'resize-drag image-div',hidden:false, w:0, h:0}) //remove x and y -- not used til save
 
  }

    else if (t== "textbox"){
      div.id = "text"+noTextboxes; // change to autogen?
      div.innerHTML = 'text';
      div.className = 'resize-drag text-div';
      div.style.left = 150+'px';
      div.style.top = 100+'px';
      noTextboxes++;
      textboxes.push({id:div.id, x:0, y:0, innerHTML:'textboxes', className:'resize-drag text-div',hidden:false, w:0, h:0})
    
    }
    div.appendChild(createDeleteButton(div.id));
    var colourBttn = createColourButton(div.id)
    div.appendChild(colourBttn);
    //div.addEventListener("click",function(event){window.alert("clicked")});
    const pickr = new Pickr({
      el: colourBttn,
      useAsButton:true,
      default: '#42445A',
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
    }).on('init', pickr => {
      div.style.backgroundColor = pickr.getSelectedColor().toRGBA().toString(0);
    }).on('save', color => {
      div.style.backgroundColor = color.toRGBA().toString(0);
      pickr.hide();
    });
    var parent = document.getElementById("exhibitContent");
    parent.appendChild(div);
    

}




function createDeleteButton(id){
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  deleteButton.style.left = 10+'px';
  deleteButton.style.top = 0+'px';
  deleteButton.style.position="absolute";
  deleteButton.className = "deleteBtn";
  deleteButton.addEventListener("click", function(event) {
  var toRemove = document.getElementById(id);
  //add to arr to allow undos
  //toSave.push(id);
  toSave.push( document.getElementById("exhibitContent").innerHTML);
  toRemove.style.display = 'none';
  var type = toRemove.innerHTML;
  if (type.includes("text")){var list = textboxes} else {var list = images};
  for (i=0; i<list.length;i++){
    if (list[i].id == id ){
      list[i].hidden=true;
      break;
    } // change to quicker method; dictionary?


  }
  //parent.removeChild(toRemove);

  });
  return deleteButton;
}

function createColourButton(){

  var colourButton = document.createElement("button");
  colourButton.textContent = "Change colour";
  colourButton.style.left = 100+'px';
  colourButton.style.top = 0+'px';
  colourButton.style.position="absolute";
  colourButton.className = "deleteBtn";

  return colourButton;



}




function changeBGColour(){

  const bgColourBttn = document.getElementById("bgColour")
  const exhibitSpace = document.getElementById("exhibitContent")

  const pickr = new Pickr({
    el: bgColourBttn,
    useAsButton:true,
    default: '#D2BFED',
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
  }).on('init', pickr => {
    exhibitSpace.style.backgroundColor = pickr.getSelectedColor().toRGBA().toString(0);
  }).on('save', color => {
    exhibitSpace.style.backgroundColor = color.toRGBA().toString(0);
    pickr.hide();
  });  




}




function undo1step(){
  var exhibitContent = document.getElementById("exhibitContent");
  exhibitContent.innerHTML = toSave.pop();
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
  //to display hidden ("deleted") divs

  if (toSave.length>0){
    var id = toSave.pop();
    var toRestore = document.getElementById(id);
    var type = toRestore.innerHTML;
    toRestore.style.display = "block";
    if (type.includes("text")){var list = textboxes} else{var list = images;}
    for (i=0; i<list.length;i++){
      if (list[i].id == id ){
        list[i].hidden=false;
        break;
      }
  
  
    }
  }




}

function saveHTML(){
  var text = document.getElementById("exhibitContent").innerHTML
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + 
  encodeURIComponent(text));
  element.setAttribute('download', "text.html");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);


}


function saveToXML(){

  var xmlString = "<exhibitElts></exhibitElts>";
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmlString, "text/xml"); 

  for (i= 0;i<images.length;i++){
    var img = images[i];
    if (img.hidden==false){
    var node = xmlDoc.createElement("image");
    node.setAttribute("id",img.id);
    var pos = xmlDoc.createElement("co-ordinates");
    pos.setAttribute("x", img.x);
    pos.setAttribute("y", img.y);
    var attr = xmlDoc.createElement("style");
    attr.setAttribute("height", img.h);
    attr.setAttribute("width", img.w);
    node.appendChild(pos);
    node.appendChild(attr);
    var elements = xmlDoc.getElementsByTagName("exhibitElts");
    elements[0].appendChild(node);
    }
  }

    for (j= 0;j<textboxes.length;j++){
      var text = textboxes[i];
      if (text.hidden==false){
      var node = xmlDoc.createElement("textbox");
      node.setAttribute("id",text.id);
      var pos = xmlDoc.createElement("co-ordinates");
      pos.setAttribute("x", text.x);
      pos.setAttribute("y", text.y);
      var attr = xmlDoc.createElement("style");
      attr.setAttribute("height", text.h);
      attr.setAttribute("width", text.w);
      node.appendChild(pos);
      node.appendChild(attr);
      var elements = xmlDoc.getElementsByTagName("exhibitElts");
      elements[0].appendChild(node);
      }
    }
  

  console.log(xmlDoc);


}
