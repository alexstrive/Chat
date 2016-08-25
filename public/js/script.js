$(document).ready(() => {

    let socket = io();

    socket.on("connect", () => {
        socket.emit("joined", login);

        socket.on("msg-chat", (time, from, msg) => {
            $(".msgs").append(`<div class="msg"><p><i>${time}</i></p><p><b>${from}:</b></p><p>${msg}</p></div>`);
        });

        socket.on("joined", (who) => {
            $(".msgs").append(`<div class="msg"><p><b>${who}</b> вошел в чат!</p></div>`);
        });
    });

    $("#msg-form").submit(() => {

        let commandTemplate = new RegExp(/\/\w+/g);

        let date = new Date();
        let dateHours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
        let dateMinutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
        let dateSeconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();

        let msgContent = $("#msg-content");
        let msgValue = msgContent.val();

        if (commandTemplate.test(msgValue)) {
            socket.emit("msg-cmd", login, msgValue, (users) => {
                console.log(users);
                $(".msgs").append(`<div class="msg"><p>${users}</p></div>`);
            });
        } else {
            socket.emit('msg-chat', `${dateHours}:${dateMinutes}:${dateSeconds}`, login, msgValue);
        }

        msgContent.val('');
        return false;

    });

});