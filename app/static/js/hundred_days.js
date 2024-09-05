$(document).ready(function() {
    let tc_step = 1, band_step =1;
    let bill = 0, tip = 0, people = 0;
    let tc_input_span = $('#tc-input-label');
    let tc_input = $('#tc-input');
    let tc_section = $('#bill-section');
    let city_name = '', pets_name = ''

    tc_input.attr('placeholder', 'Enter Bill Amount');
    tc_input_span.text('Bill Amount');

    let band_input = $('#band-input');
    let band_input_span = $('#band-input-label');
    let band_section = $('#band-section');
    
    band_input.attr('placeholder', 'What city did you grow up in?');
    band_input_span.html('<i class="fas fa-city"></i> ');

    



    $('#band-submit').on('click', () => {
        if(band_step == 1){
            city_name = band_input.val();
            if(city_name == ''){
                alert('Enter A real City Name');
            }else{
                band_input.val('')
                band_step++;
                band_input.attr('placeholder','What Was the name of your pet?')
            }
        }
        else if (band_step == 2){
            pets_name = band_input.val()
            if(pets_name == ''){
                alert('C\'mon Now!')
            }else{
                $('#band-content').empty()
                $('#band-content').append('<p class="lead"> Maybe Your band name could be ' + city_name +' ' + pets_name +'</p>')

            }
        }
    });


    $('#tc-submit').on('click', ()=> {
    if(tc_step == 1){
        bill = parseFloat(tc_input.val());
        if(isNaN(bill)){
            alert('Please enter a valid bill amount');
            return;
        }
        tc_input.val('');
        tc_input.attr('placeholder', 'Enter Tip Percentage');
        tc_input_span.text('Tip Percentage');
        tc_step++;
    }
    else if(tc_step == 2){
        tip = parseFloat(tc_input.val());
        if(isNaN(tip)){
            alert('Please enter a valid tip percentage');
            return;
        }
        tc_input.val('');
        tc_input.attr('placeholder', 'Enter Number of People');
        tc_input_span.text('Number of People');
        tc_step++;
    }
    else if(tc_step == 3){
        people = parseFloat(tc_input.val());
        if(isNaN(people)){
            alert('Please enter a valid number of people');
            return;
        }
        $.ajax({
            type: "POST",
            url: "/calculate-bill",
            data: JSON.stringify(
                {
                    tip : tip,
                    bill : bill,
                    people : people
                }
            ),
            contentType: "application/json",
            success: (response) => {
                $('#tc-content').empty();
                $('#tc-content').append('<p class="lead"> Each person should pay: '+ response.amount +' $</p>');       
            },
            error:(response) => {
                console.log(response);
            }
        });
    }
    });
});

$(document).ready(()=>{
    let story_left = $('#story-left')
    let story_right = $('#story-right')
    let story_text = $('#story-text')
    let story_step = 0
    let story_prev = ''

    let editStory = (left_button_text,right_button_text,story)=>{
        story_left.text(left_button_text)
        story_right.text(right_button_text)
        story_text.text(story)
    }

    story_right.addClass('d-none')
    story_text.text('Welcome to the Mystical Island of Secrets!')
    story_left.text('Start')


    story_left.on('click',()=>{
        if (story_step == 0){
            story_step ++
            story_right.removeClass('d-none')
            editStory(
                'left',
                'right',
                'After your shipwreck, you stand at a crossroads. Do you venture left into the eerie forest or head right towards the rocky cliffs? (left/right):'
            )
        }
        else if(story_step == 1){
            editStory(
                'music',
                'moonlight',
                'You cautiously step into the dense forest, where the trees whisper ancient secrets. The air is thick with mystery, and shadows dance around you.Deeper into the forest, you encounter a fork in the path. Do you follow the haunting sound of distant music, or the faint glow of moonlight through the trees? (music/moonlight): '
            )
            story_step++
            story_prev = 'l'
        }
        else if(story_step == 2 & story_prev == 'l'){
            editStory(
                '',
                '',
                'You follow the enchanting melody, only to discover it\'s a trap! Sirens lure you into a pit of darkness. GAME OVER!'
            )
            story_left.addClass('d-none')
            story_right.addClass('d-none')
        }
        else if(story_step == 2 & story_prev == 'r'){
            editStory(
                '',
                '',
                'The bridge creaks and sways, but you make it across, only to be caught in a deadly storm. The winds tear you from the cliffside. GAME OVER!'
            )
            story_left.addClass('d-none')
            story_right.addClass('d-none')
        }
    })


    story_right.on('click',() => {
        if(story_step == 1){
            editStory(
                'Bridge',
                'Cave',
                "You scramble over the jagged cliffs, the ocean crashing far below. The wind howls in your ears as the path becomes more treacherous. Ahead, you see a rickety bridge swaying over the abyss. Do you risk crossing it or take a detour through the caves below? (bridge/cave): "
            )
            story_prev = 'r'
            story_step ++
        }else if(story_step == 2 & story_prev == 'r'){
            editStory(
                '',
                '',
                'You venture into the caves and discover hidden gems along the walls. Deep within, you find the legendary treasure! YOU WIN!'
            )
            story_left.addClass('d-none')
            story_right.addClass('d-none')
        }
        else if(story_step ==2 & story_prev == 'l'){
            editStory(
                '',
                '',
                'The moonlight guides you safely to a clearing, where a treasure chest gleams under the stars. You\'ve found the treasure! YOU WIN!'
            )
            story_left.addClass('d-none')
            story_right.addClass('d-none')
        }
    })
})

// rock paper scissors
$(document).ready(()=>{
    let btn_rock = $('#btn-rock')
    let btn_paper = $('#btn-paper')
    let btn_scissors = $('#btn-scissors')
    let rps_text = $('#rps-text')

    btn_rock.on('click',()=>{
        $.ajax({
            type: "POST",
            url: "/rock-paper-scissors",
            data: JSON.stringify(
                {
                    selection : 'rock'
                }
            ),
            contentType: "application/json",
            success: function (response) {
                rps_text.text(response.text)
            }
        });
    })
    btn_paper.on('click',()=>{
        $.ajax({
            type: "POST",
            url: "/rock-paper-scissors",
            data: JSON.stringify(
                {
                    selection : 'paper'
                }
            ),
            contentType: "application/json",
            success: function (response) {
                rps_text.text(response.text)
            }
        })
    })
    btn_scissors.on('click',()=>{
        $.ajax({
            type: "POST",
            url: "/rock-paper-scissors",
            data: JSON.stringify(
                {
                    selection : 'scissors'
                }
            ),
            contentType: "application/json",
            success: function (response) {
                rps_text.text(response.text)
            }
        });
    })

})
$(document).ready(() => {
    let password_input = $('#pass-req')
    let btn_pass = $('#pass-submit')
    let pass_step = 0
    let letters = 0, nummbers = 0, symbols =0

    btn_pass.on('click',() => {
        
        if(pass_step == 0){
            letters = password_input.val()
            if(letters == ''){
                alert('Please enter a valid Number of letters');
                return;
            }
            password_input.val('')
            password_input.attr('placeholder','How many Numbers Required?')
            pass_step ++
        }
        else if(pass_step == 1){
            numbers = password_input.val()
            if(numbers == ''){
                alert('Please enter a valid Number of numbers');
                return;
            }
            password_input.val('')
            password_input.attr('placeholder','How many Symbols Required?')
            pass_step ++
        }
        else if(pass_step == 2){
            symbols = password_input.val()
            if(symbols == ''){
                alert('Please enter a valid Number of symbols');
                return;
            }

            $.ajax({
                type: "POST",
                url: "/generate-password",
                data: JSON.stringify(
                    {
                        'numbers': nummbers,
                        'letters' : letters,
                        'symbols' : symbols
                    }
                ),
                contentType: "application/json",
                success: function (response) {
                    $('#pass-text').text('Your Password is: ' + response.password)
                    password_input.addClass('d-none')
                    btn_pass.addClass('d-none')
                }
            })

        }
    })
    
})