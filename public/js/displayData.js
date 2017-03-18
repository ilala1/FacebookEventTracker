let map;
$(() => {
     //materialize elements
  $('.modal').modal();
      //$('.modal').modal(); 
    /* line 7 => 30
    * Objective 1 find event on facebook
    */
    $("#submitSearch").click((e) => {
        e.preventDefault();
        let locationsearch = $('#search').val();

        $.ajax({
            url: `/event/${locationsearch}`,
            method: 'POST',
            data: {
                city: $('#search').val()
            }
        })
            .then((data) => {
                // convert data to JSON as data from backend(API) to frontEnd(HTML) is converted into string 
                let eventData = JSON.parse(data);
                for (let i in eventData.events) {
                    //console.log(eventData.events[i]);
                    $('#eventData').append(`<tr>
                    <td> 
                    <a name="event" 
                    data-name="${eventData.events[i].name}" 
                    data-email="${eventData.events[i].venue.emails}" 
                    data-venue="${eventData.events[i].venue.name}" 
                    data-image="${eventData.events[i].profilePicture}" 
                    data-desc="${eventData.events[i].description}" 
                    data-street="${eventData.events[i].venue.location.street}" 
                    data-town="${eventData.events[i].venue.location.city}" 
                    data-zip="${eventData.events[i].venue.location.zip}"
                    data-imr="${eventData.events[i].startTime}"
                    data-target="#modal1" href="#modal1">${eventData.events[i].name}</a></td>
                    <td>${eventData.events[i].venue.name}</td>
                    <td>${moment(eventData.events[i].startTime).format('DD-MMM-YY')}</td>
                    </tr>`)

                    let pos = new google.maps.LatLng(eventData.events[i].venue.location.latitude, eventData.events[i].venue.location.longitude);
                    createEventsMarker(pos, eventData.events[i]);
                }
            });

     //Click one of the events link
     //collect all data-attribute => used in database       
    $('body').on('click', (event) => {
    // console.log(event.target.name);
    if (event.target.name === "event"){
      let name = $(event.target).attr('data-name');
      let image = $(event.target).attr('data-image');
      let street = $(event.target).attr('data-street');
      let town = $(event.target).attr('data-town');
      let zip = $(event.target).attr('data-zip');
      let me = $(event.target).attr('data-imr');
      let desc = $(event.target).attr('data-desc');
      let venue = $(event.target).attr('data-venue');
      let eventDate = $(event.target).attr('data-date');
      let eventTime = $(event.target).attr('data-time');
      let email = $(event.target).attr('data-email');
    //   let startTime = $(event.target).attr('data-date');


      eventModalDetails(name, image, street, town, zip, me, desc, eventDate, eventTime, venue, email);
    }
  }); 
    });
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 51.5074, lng: 0.1278 },
        zoom: 5
    });
}


function createEventsMarker(pos,obj) {
   console.log(obj)
    var marker = new google.maps.Marker({
        position: pos,
        map: map,  // google.maps.Map 
    });
   

    //infowindow information
    let contentName = `<p style="color:black">☆★☆★${obj.name}☆★☆★</p>
    <p style="color:black">${obj.venue.location.city} </p>
     <p style="color:red">${obj.venue.location.zip}</p>`;
    let infowindow = new google.maps.InfoWindow({
        content: contentName
    });


    //open and close info window
    google.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
        setTimeout(() => { infowindow.close(); }, 3000);
    });
    return marker;
}


// modal view
function eventModalDetails(name, image, street, town, zip, me, desc, eventDate, eventTime, venue, email) {
  $('#modalHeader').html(`<h4>${name}</h4>`);
  $('#modalText').html(`
  <div class="row">
    <div class="col s12 m12 l6"><img class="modalImg" src="${image}"/></div>
     <div class="col s12 m12 l6">
      <p><img class="modalIcons" src="img/marker.png"/>${street} , ${town}, ${zip}</p>
      <p><img class="modalIcons" src="img/venue.png"/>${venue}</p>
      <p><img class="modalIcons" src="img/calendar.png"/>${moment(me).format('DD-MMM-YY')}</p>
     </div>
     </div>
    <h5>Description</h5>
     <p>${desc}</p>
     `);

}