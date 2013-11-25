$(document).ready(function () {
    $('section.sidebar:eq(0)> div').hide();
    $('section.sidebar:eq(0)> h3').click(function () {
        $(this).next().slideToggle('fast');
    });
});