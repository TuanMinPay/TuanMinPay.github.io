async function initMetamon() {
    let priceMetamon = localStorage.getItem('priceMetamon');
    if (!priceMetamon) {
        priceMetamon = 500000;
        localStorage.setItem('priceMetamon', priceMetamon);
    } else {
        priceMetamon = parseInt(priceMetamon);
    }
    $('#metamonPrice').val(priceMetamon);
    $('#metamon-body').html("");
    let data = await $.get("https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=4&sortBy=fixed_price&name=&order=asc&saleType&category=13&tokenType");
    if (data.list.length > 0) {
        data.list.forEach(function (item) {
            if (Notification.permission === 'granted' && item.fixed_price <= priceMetamon) {
                var notify = new Notification('METAMON', {
                    body: `New low price available: ${item.fixed_price}`,
                    icon: item.image_url,
                });
                notify.onclick = function () {
                    window.open(`https://market.radiocaca.com/#/market-place/${item.id}`, '_blank').focus();
                }
            }
            $('#metamon-body').append(`
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td><img src="${item.image_url}" height="50"/></td>
                            <td>${item.fixed_price}</td>
                            <td><a href="https://market.radiocaca.com/#/market-place/${item.id}" target="_blank">Buy Item</a></td>
                        </tr>
                    `);
        });
    }
}

async function initEgg() {
    let priceEgg = localStorage.getItem('priceEgg');
    if (!priceEgg) {
        priceEgg = 90000;
        localStorage.setItem('priceEgg', priceEgg);
    } else {
        priceEgg = parseInt(priceEgg);
    }
    $('#eggPrice').val(priceEgg);
    $('#egg-body').html("");
    let data = await $.get("https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=4&sortBy=fixed_price&name=&order=asc&saleType&category=17&tokenType");
    if (data.list.length > 0) {
        data.list.forEach(function (item) {
            if (Notification.permission === 'granted' && item.fixed_price <= priceEgg) {
                var notify = new Notification('EGG', {
                    body: `New low price available: ${item.fixed_price}`,
                    icon: item.image_url,
                });
                notify.onclick = function () {
                    window.open(`https://market.radiocaca.com/#/market-place/${item.id}`, '_blank').focus();
                }
            }
            $('#egg-body').append(`
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td><img src="${item.image_url}" height="50"/></td>
                            <td>${item.fixed_price}</td>
                            <td><a href="https://market.radiocaca.com/#/market-place/${item.id}" target="_blank">Buy Item</a></td>
                        </tr>
                    `);
        });
    }
}

async function initPotion() {
    let pricePotion = localStorage.getItem('pricePotion');
    if (!pricePotion) {
        pricePotion = 8000;
        localStorage.setItem('pricePotion', pricePotion);
    } else {
        pricePotion = parseInt(pricePotion);
    }
    $('#potionPrice').val(pricePotion);
    $('#potion-body').html("");
    let data = await $.get("https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=4&sortBy=fixed_price&name=&order=asc&saleType&category=15&tokenType");
    if (data.list.length > 0) {
        data.list.forEach(function (item) {
            if (Notification.permission === 'granted' && item.fixed_price <= pricePotion) {
                var notify = new Notification('POTION', {
                    body: `New low price available: ${item.fixed_price}`,
                    icon: item.image_url,
                });
                notify.onclick = function () {
                    window.open(`https://market.radiocaca.com/#/market-place/${item.id}`, '_blank').focus();
                }
            }
            $('#potion-body').append(`
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td><img src="${item.image_url}" height="50"/></td>
                            <td>${item.fixed_price}</td>
                            <td><a href="https://market.radiocaca.com/#/market-place/${item.id}" target="_blank">Buy Item</a></td>
                        </tr>
                    `);
        });
    }
}

async function initNewest() {
    $('#newest-body').html("");
    let data = await $.get("https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=5&sortBy=created_at&name=&order=desc&saleType&category&tokenType");
    if (data.list.length > 0) {
        data.list.forEach(function (item) {
            $('#newest-body').append(`
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td><img src="${item.image_url}" height="47.4"/></td>
                            <td>${item.fixed_price}</td>
                            <td><a href="https://market.radiocaca.com/#/market-place/${item.id}" target="_blank">Buy Item</a></td>
                        </tr>
                    `);
        });
    }
}

$(document).ready(function () {
    try {
        if (!window.Notification) {
            console.log('Browser does not support notifications.');
        } else {
            // display message here
            // check if permission is already granted
            if (Notification.permission === 'granted') {
                // show notification here
            } else {
                // request permission from user
                Notification.requestPermission().then(function (p) {
                    if (p === 'granted') {
                        // show notification here
                    } else {
                        console.log('User blocked notifications.');
                    }
                }).catch(function (err) {
                    console.error(err);
                });
            }
        }

        // init app
        initMetamon();
        initEgg();
        initPotion();
        initNewest();

        // metamon
        setInterval(function () {
            initMetamon();
        }, 10000);
        // egg
        setInterval(function () {
            initEgg();
        }, 10000);
        // potion
        setInterval(function () {
            initPotion();
        }, 10000);
        // newest
        setInterval(function () {
            initNewest();
        }, 10000);

        $('#metamonInit').click(function () {
            localStorage.setItem('priceMetamon', $('#metamonPrice').val());
        });

        $('#eggInit').click(function () {
            localStorage.setItem('priceEgg', $('#eggPrice').val());
        });

        $('#potionInit').click(function () {
            localStorage.setItem('pricePotion', $('#potionPrice').val());
        });
    } catch (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    }
});