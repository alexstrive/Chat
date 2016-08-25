$(document).ready(() => {

    var socket = io();

    socket.on("msg-chat", (time, from, msg) => {
        $(".msgs").append(`<div class="msg"><p><i>${time}</i></p><p><b>${from}:</b></p><p>${msg}</p></div>`);
    });

    $("#msg-form").submit(() => {
        let date = new Date();
        let dateHours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
        let dateMinutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
        let dateSeconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();

        let msgContent = $("#msg-content");

        socket.emit('msg-chat', `${dateHours}:${dateMinutes}:${dateSeconds}`, login, msgContent.val());
        msgContent.val('');

        return false;
    });
});