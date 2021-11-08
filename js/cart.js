const cart = () => {
    const buttonCart = document.querySelector('.button-cart'),
        modalCart = document.querySelector('.modal-cart'),
        closeBtn = document.querySelector('.close'),
        modalBody = document.querySelector('.modal-body'),
        buttonSend = modalCart.querySelector('.button-primary'),
        modalPricetag = modalCart.querySelector('.modal-pricetag')


        const resetCart = () => {
            modalBody.innerHTML = ''
            localStorage.removeItem('cart')
            modalCart.classList.remove('is-open')

        }

        // const totalPrice = () => {
        //     const cartArr = JSON.parse(localStorage.getItem('cart'))
        //     console.log(cartArr);

        //     cartArr.reduce((prevItem, currItem)  => prevItem.price * currItem.count)

        // }

        // console.log(totalPrice());

    const incCount = (id) => {
        const cartArr = JSON.parse(localStorage.getItem('cart'))


        cartArr.map((item) => {
            if (item.id === id) {
                item.count++
            }
            return item
        })

        localStorage.setItem('cart', JSON.stringify(cartArr))
        renderItems(cartArr)
    }

    const decCount = (id) => {
        const cartArr = JSON.parse(localStorage.getItem('cart'))

        cartArr.map((item) => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0
            }
            return item
        })

        localStorage.setItem('cart', JSON.stringify(cartArr))
        renderItems(cartArr)
    }

    const renderItems = (data) => {
        modalBody.innerHTML = ``
        data.forEach(({ name, price, id, count }) => {

            const div = document.createElement('div')
            div.classList.add('food-row')

            div.innerHTML = `
                <span class="food-name">${name}</span>
                <strong class="food-price">${price} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button btn-dec" data-index="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button btn-inc" data-index="${id}">+</button>
                </div>
                `

             if(count == 0) {
                 modalPricetag.textContent = `0 ₽`
             }else {
                modalPricetag.textContent = `${price * count} ₽`
             }

            modalBody.append(div)
        })
    }

    // https://jsonplaceholder.typicode.com/posts

    modalBody.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target.classList.contains('btn-inc')) {
            incCount(e.target.dataset.index)
        } else if (e.target.classList.contains('btn-dec')) {
            decCount(e.target.dataset.index)
        }
    })

    buttonSend.addEventListener('click', () => {
        const cartArr = localStorage.getItem('cart')

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArr
        })
            .then(res => {
                if (res.ok) {
                    resetCart()
                }
            })
            .catch(e => {
                console.error(e);
            })
    })

    buttonCart.addEventListener('click', () => {

        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')))
        }

        modalCart.classList.add('is-open')
    })

    closeBtn.addEventListener('click', () => {
        modalCart.classList.remove('is-open')
    })

    modalCart.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-cart')) {
            modalCart.classList.remove('is-open')
        }
    })
}

cart()

