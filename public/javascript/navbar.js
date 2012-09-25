$(function  () {
	$('a[href="' + window.location.pathname+'"]').parent().addClass('active');
	$('#login').click(function () {
		$(this).hide();
		$('.login-form').show().find('input:text').focus();
	});
});