var basket = (function($, host) {
	return {
		costRow: function(){
			var row = $('.bskt-form-values .bskt-form-row');

			$.each(row, function(index, val) {
				var price = Number($(this).find('.bskt-prc').text());
				var qty = Number($(this).find('.bskt-input').val());
				var cst = price*qty;

				$(this).find('.bskt-cst').text(cst.toLocaleString());
			});
		},

		subTotal: function(){
			var item = $('.bskt-form-values .bskt-cst');
			var subTotal = 0;

			$.each(item, function(index, val) {
				var val = Number($(this).text());
				subTotal = subTotal + val;
			});

			$('#subTotal').text(subTotal.toLocaleString());
		},

		vatTotal: function() {
			var subTotal = Number($('#subTotal').text());
			var vatTotal = subTotal*0.2;
			var toFix = vatTotal.toFixed(2);

			$('#vatTotal').text(toFix.toLocaleString());
		},

		allTotal: function(){
			var vat = Number($('#vatTotal').text());
			var sub = Number($('#subTotal').text());
			var total = vat + sub;
			var totalFix = total.toFixed(2);

			$('#allTotal').text(totalFix.toLocaleString());
		},

		recountAll: function(){
			basket.costRow();
			basket.subTotal();
			basket.vatTotal();
			basket.allTotal();
		},

		plusItem: function(){
			var input = $(this).parent('.bskt-range').next('.bskt-input');
			var val = Number(input.val());
			if (val < 99) {
				val ++;
			}

			input.val(val);
			basket.recountAll();
		},

		minusItem: function(){
			var input = $(this).parent('.bskt-range').next('.bskt-input');
			var val = Number(input.val());
			if (val > 0) {
				val --;
			}

			input.val(val);
			basket.recountAll();
		},

		isNumber: function (evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57)) {
				return false;
			}
			return true;
		},

		inputChange: function(){
			if ($(this).val().length > 2) {
				$(this).val(99);
				basket.showNitify();
			}
			basket.recountAll();
		},

		showNitify: function(){
			$('.qty-notify').fadeIn();

			setTimeout(function() {
				$('.qty-notify').fadeOut()
			}, 5000);
		},

		removeRow: function() {
			var row = $(this).parents('.bskt-form-row');
			row.remove();

			basket.recountAll();

			if ($('.bskt-del').length == 0) {
				$('.bskt-form').addClass('empty');
			}
		},

		submit: function() {
			var bsktValue = {
				items: [],
				subTotal: Number($('#subTotal').text()),
				vatTotal: Number($('#vatTotal').text()),
				allTotal: Number($('#allTotal').text())
			};

			var row = $('.bskt-form-values .bskt-form-row');

			$.each(row, function(index, val) {
				var name = $(val).find('.bskt-col-name').text();
				var price = Number($(val).find('.bskt-prc').text());
				var qty = Number($(val).find('.bskt-input').val());
				var cst = price*qty;

				bsktValue.items.push({
					name: name,
					price: price,
					qty: qty,
					cst: cst
				});
			});

			var data = JSON.stringify(bsktValue);

			$.ajax({
				url: '/index.html',
				dataType: 'json',
				type: 'post',
				contentType: 'application/json',
				processData: false,
				data: data,
			})
			.done(function(data, textStatus, jQxhr) {
				console.log("success");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				alert('Submit' + data);
				console.log("complete");
			});
			
		}
	};
})(jQuery, document);