$(function () {
  var prices = {}
  $('#addHospital').click(function () {
    var $li = $(this).prev(),
        name = $li.find('.name').val(),
        price = $li.find('.price').val();
    if (name && price) {
      if (!prices[name]){
        $('#output tbody').append('<tr id="'+name+'"><td>' + name + '</td><td>' + price + '</td><td>' + 0 + '</td></tr>' );
        $('select.hospital').append('<option>' + name + '</option>');
      } else {
        $('#' + name + ' td:eq(1)').html(price);
      }
      prices[name] = parseInt(price);
    }
  });
  $('#addStudent').click(function () {
    var count = $(this).prev().find('input').val(),
        name = $(this).prev().find('option:selected').text();
    if (!count) {
      return;
    }
    $('#' + name + ' td:eq(2)').html(function () {
      return parseInt($(this).text()) + (prices[name] * parseInt(count));
    });
  });
});