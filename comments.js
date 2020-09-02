$(document).ready(function(){
    
    $('.flip').click(function(){
        $(this).findClosest('.outer').toggleClass('flipped');
    });

    $('#toggle').on('click' ,function(){
        $('.card').toggleClass('flipped');
    });

    $('#front').on('click' ,function(){
        $('.card').addClass('flipped');
    });

    $('#back').on('click' ,function(){
        $('.card').removeClass('flipped');
    });
    
  
});