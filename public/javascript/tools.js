$(function () {
  var Hospital = {
    _hospitals: {},
    add: function (name, price) {
      if (!this._hospitals[name]) {
        $('#students_hospital').append('<option>' + name + '</option>');
        $('#hospitals').append('<tr><td>' + name +'</td><td class="'+name+'">'+price+'</td></tr>')
        Bill.addHospital(name, price);
      }
      this._hospitals[name] = parseInt(price);
      $('#hospitals .' + name).html(price);
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
      $('#output tbody').append('<tr><td>' + name + '</td><td class="'+name+'">' + price + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td class="'+name+'_total">' + 0 + '</td></tr>' );
    },
    updatePrice: function (name, price) {
      $('#output .' + name).html(price);
    },
    addStudent: function (className, amount, hospital) {
      $('#output .' + hospital + '_total').html(function () {
        return parseInt($(this).text()) + (Hospital.getPirce(hospital) * amount);
      });
    }
  };
  
  $('#addHospital').click(function () {
    var name = $('#hospital_name').val(),
        price = $('#hospital_price').val();
    if (name && price) {
      Hospital.add(name, price);
    }
  });
  $('#addStudent').click(function () {
    var amount = $('#students_count').val(),
        hospital = $('#students_hospital option:selected').text();
    if (amount) {
       Students.add(null,amount, hospital);
    }  
  });
});