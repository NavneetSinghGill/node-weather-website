const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

form.addEventListener('submit',(e) => {
    e.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''

    if (search.value.length > 0) {
        fetch('/weather?address=' + search.value).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.forecast
                    message2.textContent = data.location
                }
            })
        })
    } else {
        message1.textContent = 'Please write some text in input.'
    }
})