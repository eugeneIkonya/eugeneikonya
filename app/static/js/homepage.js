import Typed from './typed.module.js'

const types = new Typed(
    '#title',{
        strings : [
            '<h1 class="display-1 bold fw-bolder">Welcome</h1>',
        ],
        typeSpeed: 50,
        showCursor: false,
        onComplete(self) {
            const typed = new Typed('#stuff', {
                strings: [
                    '<p class="lead"> See my Progress<a href="#certs" class="btn btn-link text-secondary">Here</a></p>',
                    '<p class="lead">Play Some Games <a href="#games" class="btn btn-link text-secondary">Here</a></p>',
                    '<p class="lead"> Tell me Something <a href="#advice" class="btn btn-link text-secondary ">Here</a></p>'
                ],
                typeSpeed: 50,
                backSpeed: 25,
                smartBackspace: true,
                backDelay: 1000,
                startDelay: 500,
                loop: true,
                showCursor: false,
            });
        }
    }

)

const feedback_btn = $('#feedback-btn')
const feedback_input = $('#feedback-input')
let step = 0
var message = ''
feedback_btn.on('click',()=>{
    if (step === 0){
        message = feedback_input.val()
        if (message  === '' || message === ' '){
            alert('Please Enter a Valid Message')
        }else{
            feedback_input.attr('placeholder', 'Enter Name (optional)')
            feedback_btn.innerText = 'Submit'
            step++
            feedback_input.val('')
        }
    }else if(step === 1){
        const name = feedback_input.val()
        feedback_btn.attr('class','d-none')
        $.ajax({
        type: "POST",
        url: "/send-feedback/",
        data : JSON.stringify(
            {
                feedback : message,
                name : name
            }
        ),
        contentType: "application/json",
        success: function (response) {
            $('#all-input').attr('class', 'd-none')
            $('#feedback-text').empty()
            $('#feedback-text').html(response.message)
        }
    })

    }
})



