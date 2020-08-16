$(document).ready(function() {
    //var testdiv = document.getElementById("testdiv");
    
    $('#screenshot').click(function () {
        html2canvas(document.body, {
        onrendered: function(canvas) {
           var tempcanvas = document.createElement('canvas');
           tempcanvas.width=465;
           tempcanvas.height=524;
           var context=tempcanvas.getContext('2d');
           context.drawImage(canvas,465,40,465,524,0,0,465,524);
           var link=document.createElement("a");
           link.href=canvas.toDataURL('image/jpg');
           link.download = 'screenshot.jpg';
           link.click();
           
            
           }
         });
       });


});