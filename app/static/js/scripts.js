$(document).ready(function() {
    let bill = 0, tip = 0, people = 0;  
    let step = 1;  

    $('#tc-submit').click(function() {
        let inputValue = parseFloat($('#tc-input').val());

        // Step 1: Collect bill amount
        if (step === 1) {
            if (!inputValue || inputValue <= 0) {
                alert("Please enter a valid bill amount.");
                return;
            }
            bill = inputValue;
            step++; 

            $('#tc-input').val('');
            $('#tc-input').attr('placeholder', 'Enter Tip Percentage (10, 12, 15)');
            return;
        }

        // Step 2: Collect tip percentage
        if (step === 2) {
            if (!inputValue) {
                alert("Please enter a valid tip percentage (10, 12, or 15).");
                return;
            }
            tip = inputValue;
            step++;  

            $('#tc-input').val('');
            $('#tc-input').attr('placeholder', 'Enter Number of People');
            return;
        }

        if (step === 3) {
            if (!inputValue || inputValue <= 0) {
                alert("Please enter a valid number of people.");
                return;
            }
            people = inputValue;
            $.ajax({
                url: '/calculate-bill',  
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    bill: bill,
                    tip: tip,
                    people: people
                }),
                success: function(response) {
                    $('#tc-content').html('<p class="lead">Each person should pay: $' + response.total + '</p>');
                        
                },
                error: function(error) {
                    console.error("Error:", error);
                }
            });
        }
    });
});
$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('shadow shadow-sm bg-primary');
        $('.navbar-brand').addClass('text-white');
        $('.nav-link').addClass('text-white');
    } else {
        $('.navbar').removeClass('shadow shadow-sm bg-primary');
        $('.navbar-brand').removeClass('text-white');
        $('.nav-link').removeClass('text-white');
    }
});
