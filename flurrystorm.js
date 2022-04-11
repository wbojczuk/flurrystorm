var flurryStorm = {

/* OPTIONS */

/* Amount of Snowflakes at once */
    maxFlakeAmount: 128,

/* SNOWFLAKE COLOR */
  
    flakeColor : "white",

/*Snowflake size, Change sizeMin to same value as size for no variation
  */
    maxFlakeSize : 2,
    minFlakeSize : 0.5,

/* X-Axis and Y-Axis Wind and Variations, Change windXMin/windYMin to
  same value as windX/windY for no variation */
    maxWindX : 5,
    minWindX : 3,
  
    maxWindY : 3,
    minWindY : 2,
  
  
  /* SNOW BACKGROUND Z-INDEX */
    zIndex : 2




};
  
  
  /* UNSERVICEABLE STUFF */
  
  
  
  
  
  snowScript();
  
  function snowScript() {
    var tempSCanv = document.createElement("canvas");
    tempSCanv.setAttribute("id", "snowCanvas");
    document.getElementsByTagName("body")[0].append(tempSCanv);
    
    /* WINDOW SIZE LISTENER */
    var snowCanvas = document.getElementById("snowCanvas");
    
    window.addEventListener('resize', function(){
         snowCanvas.height = window.innerHeight - 1;
         snowCanvas.width = window.innerWidth - 1;
    });
    
    var snowflakes = [];
       var snowCanvas2D = snowCanvas.getContext('2d');
       var snowflakesLength;
       snowCanvas.height = window.innerHeight - 1;
       snowCanvas.width = window.innerWidth - 1;
       snowCanvas.style.overflow = "hidden";
       snowCanvas.style.position = "fixed";
       snowCanvas.style.top = "0";
       snowCanvas.style.zIndex = flurryStorm.zIndex;
  
  
       setTimeout(snowflakeGen, 50);
  
       /* INITIALIZE FLAKES */
  
       var snowCounter = 0;
  
       function snowflakeGen() {
           snowCounter++
           var randSizeMin = flurryStorm.minFlakeSize;
           var randSize = Math.random() * (flurryStorm.maxFlakeSize - randSizeMin) +
  randSizeMin
  
           snowflakes.push({
               x : Math.random() * window.innerWidth,
               y : 0,
               size : randSize,
               windY : Math.random() * (flurryStorm.maxWindY - flurryStorm.minWindY) + flurryStorm.minWindY,
               windX : Math.random() * (flurryStorm.maxWindX - flurryStorm.minWindX) + flurryStorm.minWindX,
  
           });
           snowflakesLength = snowflakes.length;
           var currentSnowFlake = snowflakesLength - 1;
           /* SIDE WALL GENERATION */
           if (flurryStorm.maxWindX >= 3) {
  
               if (Math.random() * 4 >= 2.5) {
                   snowflakes[currentSnowFlake].x = window.innerWidth;
               snowflakes[currentSnowFlake].y = Math.random() *
  (window.innerHeight - 0) + 0;
               }
  
           } else if (flurryStorm.maxWindX >= 1 && flurryStorm.maxWindX < 3) {
  
               if (Math.random() * 3 >= 2.5) {
                   snowflakes[currentSnowFlake].x = window.innerWidth;
               snowflakes[currentSnowFlake].y = Math.random() *
  (window.innerHeight - 0) + 0;
               }
  
           } else if (flurryStorm.maxWindX < 0 && flurryStorm.maxWindX > -3) {
  
               if (Math.random() * 3 >= 2.5) {
                   snowflakes[currentSnowFlake].x = 0;
               snowflakes[currentSnowFlake].y = Math.random() *
  (window.innerHeight - 0) + 0;
               }
  
           } else if (flurryStorm.maxWindX <= -3) {
  
               if (Math.random() * 4 >= 2.5) {
                   snowflakes[currentSnowFlake].x = 0;
               snowflakes[currentSnowFlake].y = Math.random() *
  (window.innerHeight - 0) + 0;
               }
  
           } 
           if (snowCounter < flurryStorm.maxFlakeAmount) {
            setTimeout(snowflakeGen, 50);
           }
  
       }
  
  
  
  
       drawSnowflakes();
  
       function drawSnowflakes() {
           snowCanvas2D.clearRect(0, 0, snowCanvas.width,
  snowCanvas.height);
  
           for ( let i = 0; i < snowflakesLength; i++) {
  snowCanvas2D.beginPath();
  snowCanvas2D.arc(snowflakes[i].x, snowflakes[i].y, snowflakes[i].size,
  0, 2 * Math.PI, false);
  snowCanvas2D.fillStyle = flurryStorm.flakeColor;
       snowCanvas2D.fill();
  
  
               snowflakes[i].x -= snowflakes[i].windX;
               snowflakes[i].y += snowflakes[i].windY;
  
  
               /*RESET SNOWFLAKES*/
               if (snowflakes[i].x <= 0 || snowflakes[i].y >=
  window.innerHeight) {
                   
                   var randSize = Math.random() * (flurryStorm.maxFlakeSize - flurryStorm.minFlakeSize) +
                   flurryStorm.minFlakeSize;
                   snowflakes[i].x = Math.random() *
  window.innerWidth
                   snowflakes[i].y = 0;
                   snowflakes[i].windY = Math.random() * (flurryStorm.maxWindY - flurryStorm.minWindY)
  + flurryStorm.minWindY,
                   snowflakes[i].windX = Math.random() * (flurryStorm.maxWindX - flurryStorm.minWindX)
  + flurryStorm.minWindX
  
                   snowflakes[i].size = randSize;
  
                   /* SIDE WALL GENERATION */
           if (flurryStorm.maxWindX >= 3) {
  
            if (Math.random() * 4 >= 2.5) {
                snowflakes[i].x = window.innerWidth;
            snowflakes[i].y = Math.random() *
(window.innerHeight - 0) + 0;
            }

        } else if (flurryStorm.maxWindX >= 1 && flurryStorm.maxWindX < 3) {

            if (Math.random() * 3 >= 2.5) {
                snowflakes[i].x = window.innerWidth;
            snowflakes[i].y = Math.random() *
(window.innerHeight - 0) + 0;
            }

        } else if (flurryStorm.maxWindX < 0 && flurryStorm.maxWindX > -3) {

            if (Math.random() * 3 >= 2.5) {
                snowflakes[i].x = 0;
            snowflakes[i].y = Math.random() *
(window.innerHeight - 0) + 0;
            }

        } else if (flurryStorm.maxWindX <= -3) {

            if (Math.random() * 4 >= 2.5) {
                snowflakes[i].x = 0;
            snowflakes[i].y = Math.random() *
(window.innerHeight - 0) + 0;
            }

        }
  
  
  
               }
  
           }
  
  
       requestAnimationFrame(drawSnowflakes);
  }
  
  
  
  }
  