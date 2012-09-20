$(document).ready(function(){
  $('form').submit(function(e){
    e.preventDefault();
    var emailVal = $('input.email').attr('value');
    if(emailVal.match(/^[A-Z0-9\.\-]+@[A-Z0-9]+\.[A-Z0-9]+/i)){
      var formData = $(this).serialize();
      $.post('/signup', formData, function(data, textStatus, jqXHR){
        console.log(data);
        if(data.success == true){
          $('.error').hide();
          $('.signup').html('<h3>Thank you for giving us your email! We\'ll let you know when we\'ve launched.</h3></br>');
        } else {
          $('.error').text('Something went wrong. Please try again.');
        };
      }, 'json');
     }else{
       $('.error').text('Please enter a valid email address');
     };
  }) ;



  var $bg = $('.header-logo'),
      elbounds = {
          w: parseInt($bg.width()),
          h: parseInt($bg.height())
      },
      bounds = {w: 1003 - elbounds.w, h: 593 - elbounds.h},
      origin = {x: 0, y: 0},
      start = {x: 0, y: 0},
      movecontinue = false;
  
  var move = function(e){
      var inbounds = {x: false, y: false},
          offset = {
              x: start.x - (origin.x - e.clientX),
              y: start.y - (origin.y - e.clientY)
          };
      
      // data.value = 'X: ' + offset.x + ', Y: ' + offset.y;
      
      inbounds.x = offset.x < 0 && (offset.x * -1) < bounds.w;
      inbounds.y = offset.y < 0 && (offset.y * -1) < bounds.h;
      
      if (movecontinue && inbounds.x && inbounds.y) {
          start.x = offset.x;
          start.y = offset.y;
          
          $(this).css('background-position', start.x + 'px ' + start.y + 'px');
      }
      
      origin.x = e.clientX;
      origin.y = e.clientY;
      
      e.stopPropagation();
      return false;
  }
  
  var handle = function(e){
      movecontinue = false;
      $bg.unbind('mousemove', move);
      
      if (e.type == 'mousedown') {
          origin.x = e.clientX;
          origin.y = e.clientY;
          movecontinue = true;
          $bg.bind('mousemove', move);
      } else {
          $(document.body).focus();
      }
      
      e.stopPropagation();
      return false;
  }
  
  var reset = function(){
      start = {x: 0, y: 0};
      $(this).css('backgroundPosition', '0 0');
  }
  
  $bg.bind('mousedown mouseup mouseleave', handle);
  $bg.bind('dblclick', reset);



});
