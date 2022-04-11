/* OPTIONS */

 /* Amount of Snowflakes at once */
var amount = 128;

/*Snowflake size, Change sizeMin to same value as size for no variation */
var size = 3.5;
var sizeMin = 1;

/* X-Axis and Y-Axis Wind and Variations, Change windXMin/windYMin to same value as windX/windY for no variation */
var windX = -5;
var windXMin = -3;

var windY = 3;
var windYMin = 2;

/* SNOWFLAKE IMG SOURCE */
var snowflakeSrc = "snowflake.svg";


/* SNOW BACKGROUND Z-INDEX */
var zIndex = 2;



/* UNSERVICEABLE STUFF */

/* WINDOW SIZE LISTENER */
var snowCanvas = document.getElementById("snowCanvas");

window.addEventListener('resize', function(){
    snowCanvas.height = window.innerHeight - 1;
    snowCanvas.width = window.innerWidth - 1;
});

var snowflakes = [];

var snowflake = new Image();
snowflake.src = snowflakeSrc;
snowflake.height = 1;
snowflake.width = 1;



snowScript();
function snowScript() {
    var snowCanvas2D = snowCanvas.getContext('2d');
    var snowflakesLength;
    snowCanvas.height = window.innerHeight - 1;
    snowCanvas.width = window.innerWidth - 1;
    snowCanvas.style.overflow = "hidden";
    snowCanvas.style.position = "absolute";
    snowCanvas.style.top = "0";
    snowCanvas.style.zIndex = zIndex;

    setTimeout(snowflakeGen, 50);

    /* INITIALIZE FLAKES */
    
    var snowCounter = 0;

    function snowflakeGen() {
        snowCounter++
        var randSizeMin = sizeMin;
        var randSize = Math.random() * (size - randSizeMin) + randSizeMin

        snowflakes.push({
            x : Math.pow(Math.random() * (window.innerWidth - 0) - 20, 1.1),
            y : 0,
            size : randSize,
            windY : Math.random() * (windY - windYMin) + windYMin,
            windX : Math.random() * (windX - windXMin) + windXMin

        });
        snowflakesLength = snowflakes.length;
        var currentSnowFlake = snowflakesLength - 1;
        /* SIDE WALL GENERATION */
        if (windX >= 3) {

            if (Math.random() * 3 >= 2) {
                snowflakes[currentSnowFlake].x = window.innerWidth;
            snowflakes[currentSnowFlake].y = Math.random() * (window.innerHeight - 0) + 0;
            }

        } else if (windX >= 1 && windX < 3) {

            if (Math.random() * 3 >= 2.5) {
                snowflakes[currentSnowFlake].x = window.innerWidth;
            snowflakes[currentSnowFlake].y = Math.random() * (window.innerHeight - 0) + 0;
            }

        } else if (windX < 1 && windX !== 0 && windX > -3) {

            if (Math.random() * 3 >= 2.5) {
                snowflakes[currentSnowFlake].x = 0;
            snowflakes[currentSnowFlake].y = Math.random() * (window.innerHeight - 0) + 0;
            }

        } else if (windX <= -3) {

            if (Math.random() * 3 >= 2) {
                snowflakes[currentSnowFlake].x = 0;
            snowflakes[currentSnowFlake].y = Math.random() * (window.innerHeight - 0) + 0;
            }

        }
        if (snowCounter == amount) {
            
        } else {
            setTimeout(snowflakeGen, 20);
        }
        
    }
    
    
    

    drawSnowflakes();

    function drawSnowflakes() {
        snowCanvas2D.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
        
        for ( let i = 0; i < snowflakesLength; i++) { 
            snowCanvas2D.drawImage(snowflake, snowflakes[i].x, snowflakes[i].y, snowflakes[i].size, snowflakes[i].size);
            snowflakes[i].x -= snowflakes[i].windX;
            snowflakes[i].y += snowflakes[i].windY;


            /*RESET SNOWFLAKES*/ 
            if (snowflakes[i].x <= 0 || snowflakes[i].y >= window.innerHeight) {
                var randSizeMin = sizeMin;
                var randSize = Math.random() * (size - randSizeMin) + randSizeMin;
                snowflakes[i].x =Math.pow(Math.random() * (window.innerWidth - 0) - 20, 1.1)
                snowflakes[i].y = 0;
                snowflakes[i].windY = Math.random() * (windY - windYMin) + windYMin,
                snowflakes[i].windX = Math.random() * (windX - windXMin) + windXMin
                
                snowflakes[i].size = randSize;

                /* SIDE WALL GENERATION */
                if (windX >= 3) {

                    if (Math.random() * 3 >= 2) {
                        snowflakes[i].x = window.innerWidth;
                    snowflakes[i].y = Math.random() * (window.innerHeight - 0) + 0;
                    }

                } else if (windX >= 1 && windX < 3) {

                    if (Math.random() * 3 >= 2.5) {
                        snowflakes[i].x = window.innerWidth;
                    snowflakes[i].y = Math.random() * (window.innerHeight - 0) + 0;
                    }

                } else if (windX < 1 && windX !== 0 && windX > -3) {

                    if (Math.random() * 3 >= 2.5) {
                        snowflakes[i].x = 0;
                    snowflakes[i].y = Math.random() * (window.innerHeight - 0) + 0;
                    }

                } else if (windX <= -3) {

                    if (Math.random() * 3 >= 2) {
                        snowflakes[i].x = 0;
                    snowflakes[i].y = Math.random() * (window.innerHeight - 0) + 0;
                    }

                }



            }

        }
    
        
    requestAnimationFrame(drawSnowflakes);
}



}