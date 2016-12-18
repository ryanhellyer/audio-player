function Slider(id, onDrag) {

	var range = document.getElementById(id),
		dragger = range.children[0],
		draggerWidth = 10, // width of your dragger
		down = false,
		rangeWidth, rangeLeft;

	dragger.style.width = draggerWidth + 'px';
	dragger.style.left = -draggerWidth + 'px';
	dragger.style.marginLeft = (draggerWidth / 2) + 'px';

	range.addEventListener("mousedown", function(e) {
		rangeWidth = this.offsetWidth;
		rangeLeft = this.offsetLeft;
		down = true;
		updateDragger(e);
		return false;
	});

	document.addEventListener("mousemove", function(e) {
		updateDragger(e);
	});

	document.addEventListener("mouseup", function() {
		down = false;
	});

	function updateDragger(e) {
		if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
			dragger.style.left = e.pageX - rangeLeft - draggerWidth + 'px';
			if (typeof onDrag == "function") onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth) * 100));
		}
	}

}


/**
 * Set initial audio player values on page load.
 */
window.addEventListener(
	'load',
	function (){

		// Set audio player volume
		var volume = localStorage.getItem( 'volume' );
		changeVolume( volume );

	}
);

Slider('volume-control', changeVolume );
Slider('location-control', changePlayerTimeStamp );
