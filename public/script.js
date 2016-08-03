$(document).ready(() => {

    $('#signin').click(() => {

        var credentials = {
            name: $('#email').val(),
            password: $('#password').val(),
        }

        $.post('/authenticate',
            credentials,
            (data, status) => {
                console.log(data);
            });

        return false;
    });

});