$(document).ready(() => {
    let btn_rock = $('#btn-rock')
    let btn_paper = $('#btn-paper')
    let btn_scissors = $('#btn-scissors')
    let rps_text = $('#rps-text')

    btn_rock.on('click', () => {
        $.ajax({
            type: "POST",
            url: "/rock-paper-scissors",
            data: JSON.stringify(
                {
                    selection: 'rock'
                }
            ),
            contentType: "application/json",
            success: function (response) {
                rps_text.text(response.text)
            }
        });
    })
    btn_paper.on('click', () => {
        $.ajax({
            type: "POST",
            url: "/rock-paper-scissors",
            data: JSON.stringify(
                {
                    selection: 'paper'
                }
            ),
            contentType: "application/json",
            success: function (response) {
                rps_text.text(response.text)
            }
        })
    })
    btn_scissors.on('click', () => {
        $.ajax({
            type: "POST",
            url: "/rock-paper-scissors",
            data: JSON.stringify(
                {
                    selection: 'scissors'
                }
            ),
            contentType: "application/json",
            success: function (response) {
                rps_text.text(response.text)
            }
        });
    })

})