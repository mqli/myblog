$(function () {
  var Hospital = {
    _hospitals: {},
    add: function (name, price) {
      if (!this._hospitals[name]) {
        $('select.hospital').append('<option>' + name + '</option>');
        Bill.addHospital(name, price);
      }
      this._hospitals[name] = parseInt(price);
      Bill.updatePrice(name, price);
    },
    getPirce: function (name) {
      return this._hospitals[name];
    }
  },
  Students = {
    add: function (className, amount, hospital) {
      Bill.addStudent(className, parseInt(amount), hospital);
    }
  },
  Bill = {
    addHospital: function (name, price) {
      $('#output tbody').append('<tr id="'+name+'"><td>' + name + '</td><td>' + price + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td></tr>' );
    },
    updatePrice: function (name, price) {
      $('#' + name + ' td:eq(1)').html(price);
    },
    addStudent: function (className, amount, hospital) {
      $('#' + hospital + ' td:eq(5)').html(function () {
        return parseInt($(this).text()) + (Hospital.getPirce(hospital) * amount);
      });
    }
  };
  
  $('#addHospital').click(function () {
    var $li = $(this).prev(),
        name = $li.find('.name').val(),
        price = $li.find('.price').val();
    if (name && price) {
      Hospital.add(name, price);
    }
  });
  $('#addStudent').click(function () {
    var amount = $(this).prev().find('input:eq(1)').val(),
        hospital = $(this).prev().find('option:selected').text();
    if (amount) {
       Students.add(null,amount, hospital);
    }  
  });
});