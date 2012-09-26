$(function  () {
  var hospital_template = jade.compile($('#hospital_template').html()),
      alert_template = jade.compile($('#alert_template').html()),
      hospital_option = jade.compile($('#hospital_option').html()),
      student_template = jade.compile($('#student_template').html());
  //add hospital
  $('#hospital_form').submit(function (event) {
    var $form = $(this);
    event.preventDefault();
    $form.find('div.alert').remove()
      .end().find('button').attr('disabled',true);
    $.post($form.attr('action'), $form.serialize(), function (result) {
      $form.find('button').attr('disabled',false);
      if (!result.success) {
        return $form.prepend(alert_template({
          message: result.message
        }));
      }
      $('select[name="hospital"]').append(hospital_option(result.hospital));
      $('#hospital_table').append(hospital_template(result.hospital));
    });
  });
  //remove hospital
  $(document).on('click','a[href^="/tools/hospitals/remove/"]', function (event) {
    var $a = $(this);
    $('#hospital_table').parent().parent().find('div.alert').remove();
    event.preventDefault();
    $.get($a.attr('href'), function (result) {
      if (!result.success) {
      	return $('#hospital_table').parent().parent().prepend(alert_template({
          message: result.message
        }));
      }
      $a.parents('tr').remove();
      $('select[name="hospital"] option[value="' + result.hospital.name + '"]').remove();
    });
  });

  $('#student_form').submit(function (event) {
    var $form = $(this);
    event.preventDefault();
    $form.find('div.alert').remove()
      .end().find('button').attr('disabled',true);
    $.post($form.attr('action'), $form.serialize(), function (result) {
      $form.find('button').attr('disabled',false);
      if (!result.success) {
      	return $form.prepend(alert_template(result.student));
      }
      $('#student_table').append(student_template(result.student));
    });
  });
  //remove student
  $(document).on('click', 'a[href^="/tools/students/remove/"]', function (event) {
    var $a = $(this);
    event.preventDefault();
    $.get($a.attr('href'), function (hospital) {
      $a.parents('tr').remove();
    });
  });
});