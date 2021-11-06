const renderItems = (data) => {
    data.forEach(data => {
        console.log(data);
    });
}

fetch('https://test-3f67d-default-rtdb.firebaseio.com/db/partners.json')
    .then((res) => res.json())
    .then((data) => renderItems(data))