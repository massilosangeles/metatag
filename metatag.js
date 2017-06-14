function clean_form(area) {
  $('#title').val('');
  $('#keywords').val('');
  $('#description').val('');
  $('#name').val('');
  $('#mail').val('');
  if (area == 2) {
    $('#resultat_area').val('');
  }
  if (area == 1) {
    grecaptcha.reset();
  }
  $('input[name=index]:checked').prop("checked", false);
  $('input[name=follow]:checked').prop("checked", false);
  $('input[name=newsletter]:checked').prop("checked", false);
  $('input[name=service]:checked').prop("checked", false);
}

// A $( document ).ready() block.
$(document).ready(function() {
  // I do a clean form
  clean_form(2);
  // When form is submit I do ...
  $('#form_meta').submit(function(event) {
    // Take all information from form
    title = $('#title').val();
    keywords = $('#keywords').val();
    description = $('#description').val();
    author = $('#name').val();
    index = $('input[name=index]:checked').val();
    follow = $('input[name=follow]:checked').val();
    mail = $('#mail').val();
    newsletter = $('input[name=newsletter]:checked').val();
    service = $('input[name=service]:checked').val();
    captcha_response = grecaptcha.getResponse();
    if (captcha_response != '' && title != '' && keywords != '' && description != '' && author != '' && index != '' && follow != '' && mail != '' && newsletter != '' && service != '') {
      $.post('metatag_process.php', {
        title: title,
        keywords: keywords,
        description: description,
        author,
        author,
        index: index,
        follow: follow,
        mail: mail,
        newsletter: newsletter,
        service: service,
        captcha_response: captcha_response
      }, function(data) {
        //Write the result
        $('#add').show();
        $('#resultat_area').val(data);
        $('#resultat').show();
        clean_form(1);
        $(window).scrollTop($('#resultat').offset().top);
      });
    }
    // I give a request to process 
    return false;
  });
  $('#close').click(function(event) {
    $('#add').hide();
  });
  $('#form_add').submit(function(event) {
    q1 = $('input[name=add1]:checked').val();
    q2 = $('input[name=add2]:checked').val();
    $.post('add_form.php', {
      q1: q1,
      q2: q2
    }, function(data) {
      jQuery.parseJSON(data);
      console.log(data);
      $('#add').hide(); // hide the add after send
    });
    return false;
  });
});