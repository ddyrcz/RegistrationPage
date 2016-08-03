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
                localStorage.token = data.token;                
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