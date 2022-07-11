document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault()

        let error = formValidate(form)
        let formData = new FormData(form)

        if (error === 0) {
            form.classList.add('_sending')
            let response = await fetch('http://send-mail', {
                method: 'POST',
                body: formData,
            })

            if (response.status === 200) {
                console.log(response.status)
                form.reset()
                form.classList.remove('_sending')
                form.classList.add('_success')
            } else {
                form.classList.remove('_sending')
            }
        } else {
            alert("Заполните обязательные поля")
        }
    }

    function formValidate(form) {
        let error = 0
        let formReq = document.querySelectorAll('._req')

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i]
            formRemoveError(input)

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error')
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error')
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }
})


// scroll


const iconMenu=document.querySelector('.menu-icon')
const menuBody=document.querySelector('.menu-body')
if(iconMenu){
    iconMenu.addEventListener('click', function (e){
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    })
}

const menuLinks = document.querySelectorAll('.get-link[data-goto]')

if (menuLinks.length > 0) {
    menuLinks.forEach(el => {
        el.addEventListener('click', onMenuLinkClick)
    })

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        const header = document.querySelector('.header')
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto)
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset

            if(iconMenu.classList.contains('_active')){
                document.body.classList.remove('_lock')
                iconMenu.classList.remove('_active')
                menuBody.classList.remove('_active')
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            })
            e.preventDefault()
        }
    }
}

