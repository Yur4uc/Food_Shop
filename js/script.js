// Прогружаємо сторінку
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    // Видалення товару з корзини
    let removeCart = document.getElementsByClassName('fas fa-times');
    console.log(removeCart);

    for (let i = 0; i < removeCart.length; i++) {
        let button = removeCart[i]
        button.addEventListener('click', removecartItem)
    }

    let qty = document.getElementsByClassName('qty')
    for (let i = 0; i < qty.length; i++) {
        let input = qty[i]
        input.addEventListener('change', qtyChanged)

    }

    //добавлення товару в корзину
    let addToCartButtons = document.getElementsByClassName('fas fa-shopping-cart')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}



    function removecartItem(event) { //видалення товару в кошику
        let buttonClick = event.target
        buttonClick.parentElement.remove() // видаляємо батьківський елемент
        updateCartTotal()
    }

    // обмеження на кількість
    function qtyChanged(event) {
        let input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }

    // функція добавлення товару в корзину
    function addToCartClicked(event) {
        let button = event.target
        let shopItem = button.parentElement
        let title = shopItem.getElementsByClassName('name')[0].innerText // добавляємо ім'я
        let price = shopItem.getElementsByClassName('price')[0].innerText // добавляємо ціну
        let image = shopItem.getElementsByClassName('shop-image')[0].src // добавляємо фото
        console.log(title, price, image)
        addItemToCart(title, price, image)
    }

    function addItemToCart(title, price, image) {
        let cartRow = document.createElement('div') // створю дів для нашого кошика
        cartRow.classList.add('box-container')
        cartRow.innerText = title
        let cartItems = document.getElementsByClassName('box-container')[0]
        let cartRowContents = `
           <form accept="" method="post" class="box">
              <a href="quick_view.html" class="fas fa-eye"></a>
              <button class="fas fa-shopping-cart" type="button" name="add_to_cart"></button>
              <img class="shop-image" src="${image}" alt="">
              <a href="category.html" class="cat">fast food</a>
              <div class="name">${title}</div>
              <div class="flex">
                 <div class="price">${price}</div>
              </div>
           </form>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow) // метод append додасть цей рядок до кошика до кінця наших елементів
    }



// обновляємо grand total
    function updateCartTotal() {
        let boxContainer = document.getElementsByClassName('box-container')[0]
        let boxPays = boxContainer.getElementsByClassName('box')
        let total = 0

        for (let i = 0; i < boxPays.length; i++) {
            let boxPay = boxPays[i]
            let priceElement = boxPay.getElementsByClassName('price')[0]
            let qtyElement = boxPay.getElementsByClassName('qty')[0]

            let price = parseFloat(priceElement.innerText.replace('$', ''))
            let qty = qtyElement.value
            total = total + (price * qty) // тотал + ціна помножена на кількість і це буде робитись щоразу коли буде повернення до циклу
            // додаватиме попередній підсумок до ціни помноженого на кількість рядка
        }
        document.getElementsByClassName('cart-total')[0].innerText = '$' + total
    }



