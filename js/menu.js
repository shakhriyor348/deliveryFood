const restoraunt = 'food-band'

const renderItems = (data) => {
    console.log(data);
}

fetch(`./db/${restoraunt}.json`)
    .then((res) => res.json())
    .then((data) => renderItems(data))