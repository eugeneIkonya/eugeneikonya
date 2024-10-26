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


