# snowscript

How to use?
This script is free for use. Just download the flurrystorm.js script and link it to your webpage. Clicking the download button will download both the flurryStorm.js file and its minified version flurrystorm-min.js
<script src="flurryscript.js" defer></script>

Performance
flurryscript.js was built with performance in mind. A canvas element is the only thing EVER appended to the DOM. Snowflakes are a path drawn onto the canvas and filled with color to save bandwidth. Uses GPU acceleration, plus using a canvas VS the DOM when animating multiple objects saves massive amounts of RAM.

Custom Image Support
Though the default settings do not use an image file. flurrystorm.js does support custom flake images in png/svg/jpg. The "imageSRC" option allows you to specify the location to your image file, this option is set to null by default.
/
How Options Work
The flurrystorm.js script creates an object "flurryStorm" and all settings can be changed with the following syntax "flurryStorm.option = value;" permanent changes to options can be made from within the flurrystorm.js file.

Options/Methods
/* METHODS */
flurryStorm.
toggleState(); // Toggles snow on/off
pause(); // Freezes snow mid-air
resume(); // Unfreezes snow
start(); // Starts the script
stop(); // Stops script/removes event listeners

/* OPTIONS */
flurryStorm.
autoStart = Accepts boolean true/false
maxFlakeAmount = Accepts integer values
flakeColor = Accepts hex/rgba/colorname values
min/maxFlakeSize = Accepts integer values
min/maxWindX = Accepts integer values
min/maxWindY = Accepts integer values
min/maxSize = Accepts integer values
flakeStick = Accepts boolean true/false
meltSpeed = Accepts integer values
zIndex = Accepts integer values
imageSRC = Accepts string img source
