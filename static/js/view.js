ninjasAPIKey = 'eaGqjEgshRPZaTb97ZtqKA==LnbFLv4PyUJbaEiz'

cityInfo = function () {
    const url= 'https://spott.p.rapidapi.com/places?type=CITY&limit=1&q=' + String($$.city).toLowerCase()
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'e22f8e7bd5msh7f6f94e945b556fp15b524jsn85125e39040c',
            'X-RapidAPI-Host': 'spott.p.rapidapi.com'
        }
    }
    axios.get(url, config)
        .then(function (response) {
            let data = JSON.parse(JSON.stringify(response.data))
            data = JSON.parse(JSON.stringify(data["0"]))
            console.log(data)
            document.getElementById("information").innerText = document.getElementById("information").innerText + JSON.stringify(data)
            $$.mainInfo = {}
            $$.mainInfo.population = data["population"]
            $$.mainInfo.timezone = data["timezoneId"]
            $$.mainInfo.country = data["country"]
            $$.mainInfo.coordinates = data["coordinates"]
            TimeZone()
        })
    }

TimeZone = function () {
    const url= 'https://timezoneapi.io/api/timezone/?' + String($$.mainInfo.timezone).toLowerCase() + '&token=aMXHZvAEGzjOehGZsmqw'
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    axios.get(url, config)
        .then(function (response) {
            let data = JSON.parse(JSON.stringify(response.data))
            console.log(data)
            data = data["data"]
            document.getElementById("information").innerText = document.getElementById("information").innerText + JSON.stringify(data)
            $$.timezone = {}
            $$.timezone.id = data["timezone"]["id"]
            $$.timezone.datatime = data["datetime"]
            $$.mainInfo.currency_code = data["timezone"]['currency_alpha_code']
            $$.mainInfo.language = data["timezone"]['languages']
            $$.mainInfo.phone_code = data["timezone"]['phone_prefix']
            $$.mainInfo.capital = data["timezone"]['capital']
            Country()
        })
    }


Country = function () {
    const url= 'https://api.api-ninjas.com/v1/country?name=' + String($$.mainInfo.country['name']).toLowerCase()
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'X-Api-Key': 'eaGqjEgshRPZaTb97ZtqKA==LnbFLv4PyUJbaEiz'
        }
    }
    axios.get(url, config)
        .then(function (response) {
            const data = JSON.parse(JSON.stringify(response.data))[0]
            console.log(data)
            document.getElementById("information").innerText = document.getElementById("information").innerText + JSON.stringify(data)
            $$.country = {}
            $$.country = data
            AirQuality()
        })
}


AirQuality = function () {
    const url= 'https://api.api-ninjas.com/v1/airquality?city=' + String($$.city).toLowerCase()
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'X-Api-Key': 'eaGqjEgshRPZaTb97ZtqKA==LnbFLv4PyUJbaEiz'
        }
    }
    axios.get(url, config)
        .then(function (response) {
            const data = JSON.parse(JSON.stringify(response.data))
            console.log(data)
            document.getElementById("information").innerText = document.getElementById("information").innerText + JSON.stringify(data)
            $$.air = {}
            $$.air.overall_aqi = data['overall_aqi']
            $$.air.CO = data["CO"]
            $$.air.PM10 = data["PM10"]
            $$.air.SO2 = data["SO2"]
            $$.air.PM2_5 = data["PM2.5"]
            $$.air.O3 = data["O3"]
            $$.air.NO2 = data["NO2"]
            Weather()
        })
}


Weather = function () {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ String($$.city).toLowerCase() +'?unitGroup=metric&key=W2QZMK675QH6AC7NBVDNQ4D92&contentType=json'
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    axios.get(url, config)
        .then(function (response) {
            const data = JSON.parse(JSON.stringify(response.data))
            console.log(data)
            document.getElementById("information").innerText = document.getElementById("information").innerText + JSON.stringify(data)
            $$.weather = {}
            $$.weather.fullname = data["resolvedAddress"]
            News()
        })
}

News = function () {
    const url = 'https://api.newscatcherapi.com/v2/search?q='+ $$.weather.fullname
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'x-api-key': 'IhRIBjHgCIYK9SA6bwH_MLsXsrmjbcGR5vM5gWof6P0'
        }
    }
    axios.get(url, config)
        .then(function (response) {
            const data = JSON.parse(JSON.stringify(response.data))
            console.log(data)
            document.getElementById("information").innerText = document.getElementById("information").innerText + JSON.stringify(data)
            $$.news = {}


        })
}


function buildHtmlTable(selector, myList) {
  var columns = addAllColumnHeaders(myList, selector);

  for (var i = 0; i < myList.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = myList[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $(selector).append(row$);
  }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
  var columnSet = [];
  var headerTr$ = $('<tr/>');

  for (var i = 0; i < myList.length; i++) {
    var rowHash = myList[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }
  $(selector).append(headerTr$);

  return columnSet;
}
