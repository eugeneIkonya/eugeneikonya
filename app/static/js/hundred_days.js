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