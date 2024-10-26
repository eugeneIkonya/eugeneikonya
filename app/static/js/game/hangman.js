$(document).ready(() => {
    let main_section = $('#hangman-main')
    let lives_section = $('#hangman-feedback')
    let btn = $('#hangman-start')
    let stages = []
    let lives = 6
    let placeholder = ''
    let display = ''
    let word = ''
    let main_text = $('#hangman-text')

    $.ajax({
        type: "GET",
        url: "/load-hangman",
        contentType: "application/json",
        success: function (response) {
            main_section.append('<pre>' + response.logo + '</pre>')
            stages = response.stages
            word = response.chosen_word

            for (var x = 0; x < word.length; x++) {
                placeholder += ' _'
            }
        }
    })

    btn.on('click', () => {
        main_section.empty()
        btn.addClass('d-none')
        main_section.append('<pre class="text-center" id="hangman-stage">' + stages[lives] + '</pre>')
        main_section.append('<p class="text-center fw-bold fs-4" id="hangman-guess">Word to Guess: ' + placeholder + '</p>')
        main_section.append('<input class="form-control m-auto w-50" id="hangman-input" type="text">')
        lives_section.append('<p class="lead" id="hangman-lives">Lives: 6/6</p>')


    })
    let guess = ''
    let gameover = false
    let correct_letters = []
    let incorrect_letters = []



    $(document).on('input', '#hangman-input', function () {
        if (!gameover) {
            main_text.text('')
            guess = $(this).val().toLowerCase();
            $(this).val('');

            let updated_display = '';
            let correct_guess = false;

            for (let i = 0; i < word.length; i++) {
                let letter = word[i];
                if (letter === guess) {
                    updated_display += letter + ' ';
                    correct_guess = true;
                } else if (correct_letters.includes(letter)) {
                    updated_display += letter + ' ';
                } else {
                    updated_display += '_ ';
                }
            }


            $('#hangman-guess').text('Word to Guess: ' + updated_display.trim());


            if (!correct_guess) {
                lives -= 1;
                main_text.append(guess + " is not in the word. ");
                $('#hangman-lives').text(`Lives: ${lives}/6`);
                $('#hangman-feedback').append(`<span class="badge bg-danger m-1">${guess}</span>`);
                if (lives === 0) {
                    gameover = true;
                    main_text.append('You lost! The correct word was ' + word);
                }
            } else {
                correct_letters.push(guess);
                main_text.append(guess + ' Is in the word')
                if (!updated_display.includes('_')) {
                    gameover = true;
                    main_text.append('Congratulations! You won!');
                }
            }
            $('#hangman-stage').html('<pre>' + stages[lives] + '</pre>');
        }
    });

})