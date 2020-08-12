//use template literals

/* var jsonData;
dwedwe */



function setup(){

    $.getJSON("test.json", function(json) {
        printTemplate(json)
    });
   
}

function printTemplate(json){

    document.body.style.backgroundColor = json.m.bgColor
    document.getElementById("workspace").innerHTML=`${json.m.items.map(makeDiv).join("")}`

}

function makeDiv(div) {
    return `
    <div id="${div.id}"style="position:relative;height:${div.height};width:${div.width};top:${div.top};left:${div.left};background-color:${div.backgroundColor}; border-color:${div.borderColor};border-width:${div.borderWidth};box-shadow: ${div.shadow}; text-alignment: ${div.textAlign}, padding: ${div.padding}">

    </div>

    `
}

