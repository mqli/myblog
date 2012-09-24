$(function () {
  var Hospital = {
    _hospitals: {},
    add: function (attr) {
      if (!(attr.name && attr.price)) {
        return;
      }
      if (!this._hospitals[attr.name]) {
        $('#students_hospital').append('<option>' + attr.name + '</option>');
        $('#hospitals').append('<tr><td>' + attr.name +'</td><td class="'+attr.name+'">'+attr.price+'</td></tr>')
        Bill.addHospital(attr.name, attr.price);
      }
      this._hospitals[attr.name] = parseInt(attr.price);
      $('#hospitals .' + attr.name).html(attr.price);
      Bill.updatePrice(attr.name, attr.price);
    },
    getPirce: function (name) {
      return this._hospitals[name];
    }
  },
  Students = {
    add: function (attr) {
      if (!(attr.className && attr.amount && attr.time && attr.hospital)) {
        return;
      }
      $('#students').append('<tr><td>' + attr.className +'</td><td class="'+attr.className+'">'+attr.amount+'</td><td>' + attr.time +'</td><td>' + attr.hospital +'</td></tr>');
      Bill.addStudent(attr);
    }
  },
  Bill = {
    addHospital: function (name, price) {
      $('#output tbody').append('<tr><td>' + name + '</td><td>--</td><td> -- </td><td>--</td><td> -- </td><td class="'+name+'_total">' + 0 + '</td></tr>' );
    },
    updatePrice: function (name, price) {
      $('#output .' + name).html(price);
    },
    addStudent: function (attr) {
      $('#output .' + attr.hospital + '_total').html(function () {
        return parseInt($(this).text()) + (Hospital.getPirce(attr.hospital) *attr.time  * attr.amount);
      }).parents('tr').before('<tr><td>' + attr.hospital + '</td><td>' + attr.className + '</td><td>' + attr.amount + '</td><td>' + attr.time + '</td><td>' + Hospital.getPirce(attr.hospital) * attr.time  * attr.amount + '</td><td>--</td><tr>');
    }
  };
  $('#addHospital').click(function () {
    Hospital.add({
      name: $('#hospital_name').val(),
      price : $('#hospital_price').val()
    });
  });
  $('#addStudent').click(function () {
    Students.add({
      time: $('#time').val(),
      className: $('#class_name').val(),
      amount: $('#students_count').val(),
      hospital: $('#students_hospital option:selected').text()
    });
  });
});