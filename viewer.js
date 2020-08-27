browser={
}

$(document).ready(function(){
    
  /*search bar */
  $('#search').keyup(function (){
      $('.card').removeClass('d-none');
      var filter = $(this).val(); // get the value of the input, which we filter on
      $('.outer').find('.card .card-body h5:not(:contains("'+filter+'"))').parent().parent().addClass('d-none');
  })
  browser.refresh = $("#refresh")
  browser.refresh.click(function(){
    refreshCards()
    return false;
  })
});


function refreshCards(){
  //ajax call to generate cards, display newly added 

}