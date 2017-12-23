function initMap() {
	var minZoomLevel = 16;
	var laf = {
		lat : 40.6981811,
		lng : -75.2089322
	};
    var map = new google.maps.Map(document.getElementById('map'), {
        gestureHandling: "greedy"
    });

    //keeps map with in bounds
	var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(
			40.6951129, -75.2136497), new google.maps.LatLng(40.7025829,
			-75.2001077));
    map.fitBounds(bounds);
	google.maps.event
			.addListener(map, 'dragend',
					function() {
						if (bounds.contains(map.getCenter()))
							return;
						//console.log("Outside of Bounds");
						var curLat = map.getCenter().lat(), curLong = map
								.getCenter().lng(), westBound = bounds
								.getNorthEast().lng(), northBound = bounds
								.getNorthEast().lat(), eastBound = bounds
								.getSouthWest().lng(), southBound = bounds
								.getSouthWest().lat();
						//console.log("CurLat: "+curLat);
						//console.log("CurLong: "+curLong);
						//console.log("North Bound: "+northBound);
						//console.log("East Bound: "+eastBound);
						//console.log("South Bound: "+southBound);
						//console.log("West: "+westBound);
						if (curLat < southBound)
							curLat = southBound;
						if (curLat > northBound)
							curLat = northBound;
						if (curLong < westBound)
							curLong = westBound;
						if (curLong > eastBound)
							curLong = eastBound;

						map.setCenter(new google.maps.LatLng(curLat, curLong));
        });

    //keeps map zoomed in to stay with in bounds
	google.maps.event.addListener(map, 'zoom_changed', function() {
		if (map.getZoom() < minZoomLevel)
			map.setZoom(minZoomLevel);
    });

    google.maps.event.addListener(map, 'click', function(e) {
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        $('#input-background').css('visibility', 'visible');
        $('#input-background').addClass('transition');
        $('#input').css('visibility', 'visible');
        $('#input').addClass('transition');
        $('#lat').val(e.latLng.lat());
        $('#lng').val(e.latLng.lng());
    });
};

$(document).ready(function () {
    $('#submit-sighting').click(function (e) {
        e.preventDefault(); //allows json post to happen
        console.log("sending");
        $.post('/map', $('#sighitng').serialize(), function (res) {
            console.log(res);
            for (value in res) {
                console.log(value.valid);
            }
        }, 'json');
    });
});


