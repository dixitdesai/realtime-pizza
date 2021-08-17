import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then((res) => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1500,
            progressBar: false,
            text: 'Item added to cart'
        }).show()
    }).catch((error) => {
        new Noty({
            type: 'error',
            timeout: 1500,
            progressBar: false,
            text: 'Something went wrong!'
        }).show()
    })
}  

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        let pizza = JSON.parse(btn.dataset.pizza)
        console.log(pizza)
        updateCart(pizza)
    })       
})
