$(document).ready(() => {

    localStorage.removeItem('token');

    $('#signin').click(() => {
        var credentials = {
            name: $('#email').val(),
            password: $('#password').val(),
        }
        $.post('/authenticate',
            credentials,
            (data, status) => {
                if (data.authenticated) {
                    console.log('authentication success');
                    localStorage.token = data.token;
                    window.location = 'home.html';
                } else {
                    console.log('authentication failed');
                    $('#authenticationError').css('visibility', 'visible');
                }
            });
        return false;
    });

    $('#signup').click(() => {
        $.get(`/api/users?token=${localStorage.token}`, (users, status) => {
            console.log(users);
        });
        return false;
    });

});