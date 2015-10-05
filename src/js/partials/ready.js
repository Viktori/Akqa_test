$(function() {
	function GetIEVersion() {
		var sAgent = window.navigator.userAgent;
		var Idx = sAgent.indexOf("MSIE");

		// If IE, return version number.
		if (Idx > 0) {
			return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
		}
		// If IE 11 then look for Updated user agent string
		else if (!!navigator.userAgent.match(/Trident\/7\./)) {
			return 11;
		} else {
			return 0; //It is not IE
		}
	}
	if (GetIEVersion() > 0) {
		$('body').addClass('IE' + GetIEVersion());
	}

	// App
	basket.recountAll();

	// remove Btn click
	$('body').on('click', '.bskt-del', basket.removeRow);

	// plus Btn click
	$('body').on('click', '.bskt-range-up', basket.plusItem);

	// minus Btn click
	$('body').on('click', '.bskt-range-down', basket.minusItem);

	// input KeyPress
	$('body').on('keypress', '.bskt-input', basket.isNumber);
	// input Change
	$('body').on('change', '.bskt-input', basket.inputChange);

	// Submit click
	$('#sbmtBskt').click(basket.submit);
});