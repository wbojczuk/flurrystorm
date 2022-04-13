var flurryStorm = {

    /* METHODS: flurryStorm.resume(); toggleState(); pause(); */

/* OPTIONS */

/* Whether or Not To Auto Start The Snow Script */
    autoStart: true,

/* Amount of Snowflakes at once */
    maxFlakeAmount: 64,

/* SNOWFLAKE COLOR */
  
    flakeColor : "white",

/*Snowflake size, Change minFlakeSize to same value as maxFlakeSize for no variation
  */
    maxFlakeSize : 2.5,
    minFlakeSize : 0.5,

/* X-Axis and Y-Axis Wind and Variations, Change minWindX/minWindY to
  same value as maxWindX/maxWindY for no variation */
    maxWindX : 4,
    minWindX : 3,
  
    maxWindY : 3,
    minWindY : 2,

    /* STICK AND MELT TO BOTTOM OF VIEWPORT  TRUE/FALSE*/
    flakeStick: true,

    /* SPEED FOR SNOWFLAKES TO MELT AT, SET HIGHER FOR BIGGER FLAKES, DEFAULT IS 0.02*/
    meltSpeed: 0.01,

  
  
  /* SNOW BACKGROUND Z-INDEX */
    zIndex : 2,

    /* CUSTOM FLAKE IMAGE? SET VALUE TO null IF YOU WANT DEFAULT FLAKES */
    /* CUSTOM COLORS ARE NOT AVAILABLE WITH CUSTOM IMAGES */

    imageSRC: null,



  /* UNSERVICEABLE STUFF */


    toggleState: function(){if(flurryStorm.state == "on"){
        flurryStorm.state = "off";
    } else if (flurryStorm.state == "off" || flurryStorm.state == null) {
        flurryStorm.state = "on";
        snowScript();
    } else if (flurryStorm.state == "pause") {
        flurryStorm.state = "unpause";
    }
},
    state: null,

    pause: function(){flurryStorm.state = "pause"},

    resume: function(){if (flurryStorm.state == "off" || flurryStorm.state == null) {
        flurryStorm.state = "on";
        snowScript();
    } else if (flurryStorm.state == "pause") {
        flurryStorm.state = "unpause";
    } }



};
  
  
  
  
  
  
  if (flurryStorm.autoStart == true) {
    flurryStorm.state = "on";
    snowScript();
  }
  
  
  function snowScript() {
      var flakeImg = new Image();
      if (flurryStorm.imageSRC !== null) {
        flakeImg.src = flurryStorm.imageSRC;
      }

    if (flurryStorm.state == "pause"){flurryStorm.state = "on"; return drawSnowflakes() ;}
    var tempSCanv = document.createElement("canvas");
    tempSCanv.setAttribute("id", "snowCanvas");
    document.getElementsByTagName("body")[0].append(tempSCanv);
    
    /* WINDOW SIZE LISTENER */
    var snowCanvas = document.getElementById("snowCanvas");
    
    window.addEventListener('resize', function(){
         snowCanvas.height = window.innerHeight - 1;
         snowCanvas.width = window.innerWidth - 1;
    });

    /* Pause */
    
    var snowflakes = [];
       var snowCanvas2D = snowCanvas.getContext('2d');
       var snowflakesLength;
       snowCanvas.height = window.innerHeight - 1;
       snowCanvas.width = window.innerWidth - 1;
       snowCanvas.style.overflow = "hidden";
       snowCanvas.style.position = "fixed";
       snowCanvas.style.pointerEvents = "none";
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
               stopped: false
  
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

            if (flurryStorm.imageSRC == null) {
                snowCanvas2D.beginPath();
                snowCanvas2D.arc(snowflakes[i].x, snowflakes[i].y, snowflakes[i].size,
                0, 2 * Math.PI, false);
                snowCanvas2D.fillStyle = flurryStorm.flakeColor;
                    snowCanvas2D.fill();
                } else {
                    snowCanvas2D.drawImage(flakeImg, snowflakes[i].x, snowflakes[i].y, snowflakes[i].size, snowflakes[i].size);
                }
  
  
               

               /* STICKY SNOWFLAKES */

               if (flurryStorm.flakeStick == true) {
                   if (snowflakes[i].y >= window.innerHeight - (snowflakes[i].size + 1.5)) {
                        snowflakes[i].stopped = true;
                   }
               }
               if (snowflakes[i].stopped == true&& snowflakes[i].size > flurryStorm.meltSpeed + 0.01) {
                   snowflakes[i].size -= flurryStorm.meltSpeed;
                   snowflakes[i].y = window.innerHeight - (snowflakes[i].size + 1.5);

               } else if (snowflakes[i].stopped == true&& snowflakes[i].size <= flurryStorm.meltSpeed + 0.01){
                snowflakes[i].stopped = false;
               }

            /* MOVE THEM BOIS */
            if (snowflakes[i].stopped == false) {
               snowflakes[i].x -= snowflakes[i].windX;
               snowflakes[i].y += snowflakes[i].windY;
            }
  
               /*RESET SNOWFLAKES*/
               if (snowflakes[i].x <= 0 - snowflakes[i].size || snowflakes[i].y >=
  window.innerHeight + snowflakes[i].size) {
                   
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
                
           
  
           if (flurryStorm.state == "on"){
       requestAnimationFrame(drawSnowflakes);
           } else if (flurryStorm.state == "off") {
            snowCanvas2D.clearRect(0, 0, snowCanvas.width,
                snowCanvas.height);
           } else if (flurryStorm.state == "pause") {
               setTimeout(unPause,10);
               function unPause(){
                if (flurryStorm.state == "unpause"){
                    flurryStorm.state = "on";
                 requestAnimationFrame(drawSnowflakes);
                } else {setTimeout(unPause,10);}
            };
           }
  }
  
  
  
  }
  