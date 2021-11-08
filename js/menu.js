const menu = () => {
    const restoraunt = JSON.parse(localStorage.getItem('restaurant'))

    const cartArr = localStorage.getItem('cart') ? 
    JSON.parse(localStorage.getItem('cart')) : []

    const cardsMenu = document.querySelector('.cards-menu')

    const changeTitle = (restaurant) => {
        const restaurantTitle = document.querySelector('.restaurant-title'),
            rating = document.querySelector('.rating'),
            price = document.querySelector('.price'),
            category = document.querySelector('.category')

        console.log(restaurant);

        restaurantTitle.textContent = restaurant.name
        rating.textContent = restaurant.stars
        price.textContent = restaurant.price
        category.textContent = restaurant.kitchen
    }

    const addToCart = (obj) => {
        if(cartArr.some(item => item.id === obj.id)) {
            cartArr.map(item => {
                if(item.id === obj.id) {
                    item.count++
                }
                return item
            })
        }else {
            cartArr.push(obj)
        }
        

        localStorage.setItem('cart', JSON.stringify(cartArr))
    }

    const renderItems = (data) => {
        data.forEach(({ description, id, image, name, price }) => {
            const card = document.createElement('div')
            card.classList.add('card')

            card.innerHTML = `
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <!-- /.card-heading -->
            <div class="card-info">
                <div class="ingredients">
                    ${description}
                </div>
            </div>
            <!-- /.card-info -->
            <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price-bold">${price} ₽</strong>
            </div>
        </div>
        `

            card.querySelector('.button-card-text').addEventListener('click', () => {
                addToCart({name,price,id,count:1})
            })

            cardsMenu.append(card)
        });
    }

    if (localStorage.getItem('restaurant')) {
        changeTitle(restoraunt)
        fetch(`./db/${restoraunt.products}`)
            .then((res) => res.json())
            .then((data) => renderItems(data))
    } else {
        window.location.href = '/'
    }
}

menu()