$(document).ready(function() {
    let tc_step = 1;
    let bill = 0, tip = 0, people = 0;
    let tc_input_span = $('#tc-input-label');
    let tc_input = $('#tc-input');
    let tc_section = $('#bill-section');

    tc_input.attr('placeholder', 'Enter Bill Amount');
    tc_input_span.text('Bill Amount');

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

$(window).scroll(function() {
    toggleNavbar();
});

function toggleNavbar() {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('shadow shadow-sm bg-primary');
        $('.navbar-brand').addClass('text-white');
        $('.nav-link').addClass('text-white');
        $('.navbar-toggler').addClass('text-white');
    } else {
        $('.navbar').removeClass('shadow shadow-sm bg-primary');
        $('.navbar-brand').removeClass('text-white');
        $('.nav-link').removeClass('text-white');
    }
}
function handleTips(){

}