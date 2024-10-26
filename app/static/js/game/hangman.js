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
        let keyboard = $('<div class="text-center my-3" id="hangman-keyboard"></div>');
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';

        // Create a badge for each letter
        for (let letter of alphabet) {
            let letterBadge = $(`<span class="badge bg-primary m-1 p-3" style="cursor: pointer;">${letter}</span>`);
            letterBadge.on('click', function () {
                handleGuess(letter); // Call guess handling function
                $(this).off('click').addClass('disabled'); // Disable the badge after selection
            });
            keyboard.append(letterBadge);
        }

    main_section.append(keyboard);
        lives_section.append('<p class="lead" id="hangman-lives">Lives: 6/6</p>')


    })
    let guess = ''
    let gameover = false
    let correct_letters = []
    let incorrect_letters = []



function handleGuess(guess) {
    if (!gameover) {
        main_text.text('');
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
            incorrect_letters.push(guess);

            // Update the guessed letter badge to `text-bg-secondary`
            $(`#hangman-keyboard span:contains(${guess})`).removeClass('bg-primary').addClass('text-bg-danger');

            if (lives === 0) {
                gameover = true;
                main_text.append('You lost! The correct word was ' + word);
            }
        } else {
            correct_letters.push(guess);
            main_text.append(guess + ' is in the word');

            // Update the guessed letter badge to `text-bg-secondary`
            $(`#hangman-keyboard span:contains(${guess})`).removeClass('bg-primary').addClass('text-bg-success');

            if (!updated_display.includes('_')) {
                gameover = true;
                main_text.append('Congratulations! You won!');
            }
        }

        $('#hangman-stage').html('<pre>' + stages[lives] + '</pre>');
    }
}


})