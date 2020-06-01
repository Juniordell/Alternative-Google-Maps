var map
var markers = []
var infoWindow
function initMap() {
  var losAngeles = {
    lat: 34.063380,
    lng: -118.358080
  }
  map = new google.maps.Map(document.getElementById('map'), {
  center: losAngeles,
  zoom: 8,
  styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]
  });
  infoWindow = new google.maps.InfoWindow();
  searchStores()
}

function searchStores() {
  var foundStores = []
  var zipCode = document.getElementById('zip-code').value
  if (zipCode) {
      stores.forEach(function(store){
          var postal = store.address.postalCode.substr(0, 5)
          if (postal == zipCode) {
            foundStores.push(store)
          }
      })
  }
  else {
      foundStores = stores
  }
  clearLocations()
  displayStore(foundStores)
  showStoresMarkers(foundStores)
  setOnClickListener()
}

function clearLocations() {
  infoWindow.close()
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

function setOnClickListener() {
  
  var storeElements = document.querySelectorAll('.store-container')
  storeElements.forEach(function(elem, index){
    elem.addEventListener('click', function(){
          google.maps.event.trigger(markers[index], 'click')
    })
  })
}

function displayStore(stores) {
    var storesHTML = ""
    stores.forEach(function(store, index) {
        var address = store.addressLines
        var phone = store.phoneNumber
        storesHTML += `
        <div class="store-container">
          <div class='store-line'>
            <div class="store-info-container">
                <div class="store-address">
                    <span>${address[0]}</span>
                    <span>${address[1]}</span>
                </div>
                <div class="store-phone-number"><i class="fas fa-phone-alt"></i> ${phone}</div>
            </div>
            <div class="store-number-container">
                <div class="store-number">${index+1}</div>
            </div>
          </div>
      </div>`
    });
    document.querySelector('.store-list').innerHTML = storesHTML
}

function showStoresMarkers() {
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store, index) {
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude)
        var openStatus = store.openStatusText
        var name = store.name
        var phone = store.phoneNumber
        var address = store.addressLines[0]
        bounds.extend(latlng)
        createMarker(latlng, name, phone, openStatus, address)
        
    })
    map.fitBounds(bounds)
}

function createMarker(latlng, name, phone, openStatus, address) {
    var html = `
    <div class='info'>
      <div class='info-main'>
        <div class='info-title'>
            <div class='info-name'>
                <b>${name}</b>
            </div>
            <div class='info-hour'>
                ${openStatus}
            </div>
            </div>
        <div class='info-img'>
            <img src="https://img.icons8.com/color/48/000000/starbucks.png"/>
        </div> 
      </div>
      <div class='info-sub'>
        <div class='info-address'>
            <i class='fas fa-map-marked-alt'></i> 
            <a href='https://www.google.com/maps/place/${address}' target='_blank'>${address}</a>
        </div>
        <div class='info-phone'>
            <i class='fas fa-phone-alt'></i> 
            <a id='copy'>${phone}</a>
        </div>
      </div>
    </div>`;
    var marker = new google.maps.Marker({
      map: map,
      icon: 'js/pin6.png',
      position: latlng,
      animation: google.maps.Animation.DROP,
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  }
