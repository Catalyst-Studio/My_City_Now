citychecker = function () {
    const city = document.getElementById("searchbar").value
    const country = document.getElementById("country").value
    const url='/search?city=' + city + '&country=' + country
    const buttons = document.getElementById("cities")
    const config = {
        headers:{
            'Content-Type': 'application/json',
        }
    }
    axios.get(url, config)
        .then(function (response) {
            console.log(response.data)
            const data = JSON.parse(response.data)
            for (let item in data) {
                item = data[item]
                buttons.innerHTML = buttons.innerHTML +
                    '<button class="ms-card-btn d-inline-blick" onclick="cityredirect('+"'"+item['name']+"'"+','+"'"+item['country']+"'"+')">'+item['name']+','+item['cabr']+'</button>'
            }
        })
}


cityredirect = function (city, country) {
    location.href = "/view?city=" + city + "&country=" + country
}