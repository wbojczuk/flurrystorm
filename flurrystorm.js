var flurryStorm = {

    /* METHODS: flurryStorm.resume(); toggleState(); pause(); stop(); (WHICH KILLS EVENT LISTENERS TOO)*/

/* OPTIONS */

/* Whether or Not To Auto Start The Snow Script */
    autoStart: true,

/* Amount of Snowflakes at once */
    maxFlakeAmount: 64,

/* SNOWFLAKE COLOR */
  
    flakeColor : "white",

    // WHETHER OR NOT TO SCROLL SNOW WHEN THE USER SCROLLS... NOT AVAILABLE ON MASSIVELY LONG PAGES DUE TO CANVAS DIMENSION RESTRICTIONS

    scrollSnow: false,

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

    /* STICK AND MELT TO BOTTOM OF VIEWPORT  TRUE/FALSE DOESN'T SUPPORT SCROLLSNOW*/
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
    } },

    stop: function(){
        /* REMOVE EVENT LISTENERS */
        flurryStorm.state = "off";
        flurryStorm.listenerState = "off";
        flurryStorm.toggleListeners();
        document.getElementById("snowCanvas").remove();


    },

    // SNOWFLAKES ARRAY

    snowflakes : [],

     /* LISTENER FUNCTIONS */

    scrollWindowListener : function() {
        
            snowCanvas.width = document.body.clientWidth;
            height = Math.max(
                document.body.scrollHeight, 
            document.body.clientHeight, 
            document.body.offsetHeight, 
            document.documentElement.scrollHeight, 
            document.documentElement.offsetHeight, 
            document.documentElement.clientHeight);
            snowCanvas.height = height;
    },

    WindowListener : function() {
        snowCanvas.height = document.body.clientHeight;
        snowCanvas.width = document.body.clientWidth;
    },


    /* END LISTENER FUNCTIONS */

    listenerState: "on",

    toggleListeners: function() {
       

            /* ON/OFF */
        if (flurryStorm.listenerState == "on") {

            /* SCROLL ENABLED EVENTS */
            if (flurryStorm.scrollSnow == true) {
                /* WINDOW SIZE LISTENER */
                window.addEventListener('resize', this.scrollWindowListener);
            } else if(flurryStorm.scrollSnow == false){
                window.addEventListener('resize', this.WindowListener);
            }

        } else if (flurryStorm.listenerState == "off"){
            window.removeEventListener('resize', this.scrollWindowListener);
            window.removeEventListener('resize', this.WindowListener);
        }


    }




};
  
  
  
  
  
  
  if (flurryStorm.autoStart == true) {
    flurryStorm.state = "on";
    snowScript();
  }
  
  
  function snowScript() {

    
     


    /* SET LISTENERS */

    flurryStorm.listenerState = "off";
        flurryStorm.toggleListeners();

        flurryStorm.listenerState = "on";
        flurryStorm.toggleListeners();


      /* TEST FOR EXISTING CANVAS */
     var ifCanv = document.querySelectorAll("#snowCanvas");
     if (ifCanv.length >= 1) {
         ifCanv[0].remove();
     }
      var flakeImg = new Image();
      if (flurryStorm.imageSRC !== null) {
        flakeImg.src = flurryStorm.imageSRC;
      }

    if (flurryStorm.state == "pause"){flurryStorm.state = "on"; return drawSnowflakes() ;}
    var tempSCanv = document.createElement("canvas");
    tempSCanv.setAttribute("id", "snowCanvas");
    document.getElementsByTagName("body")[0].append(tempSCanv);
    
    
    var snowCanvas = document.getElementById("snowCanvas");
    
    

    
    flurryStorm.snowflakes = [];
       var snowCanvas2D = snowCanvas.getContext('2d');
       var snowflakesLength;
       var height;

       if (flurryStorm.scrollSnow == true) {
       setTimeout(function(){height = Math.max(
        document.body.scrollHeight, 
    document.body.clientHeight, 
    document.body.offsetHeight, 
    document.documentElement.scrollHeight, 
    document.documentElement.offsetHeight, 
    document.documentElement.clientHeight);
    snowCanvas.height = height;
    snowCanvas.width = document.body.clientWidth;
    snowCanvas.style.position = "absolute"; 
},100);
       } else {
        setTimeout(function(){
        snowCanvas.style.position = "fixed";

        snowCanvas.height = document.body.clientHeight;
       snowCanvas.width = document.body.clientWidth;
    },100);
       }
    
    
    
       
       
       snowCanvas.style.overflow = "hidden";
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
  randSizeMin;
  var tempY;
  if (flurryStorm.scrollSnow == true) {
    tempY = 0 + window.pageYOffset;
  } else {
    tempY = 0;
  }
    flurryStorm.snowflakes.push({
               x : Math.random() * window.innerWidth,
               y : tempY,
               size : randSize,
               windY : Math.random() * (flurryStorm.maxWindY - flurryStorm.minWindY) + flurryStorm.minWindY,
               windX : Math.random() * (flurryStorm.maxWindX - flurryStorm.minWindX) + flurryStorm.minWindX,
               stopped: false
  
           });
           snowflakesLength = flurryStorm.snowflakes.length;
           var currentSnowFlake = snowflakesLength - 1;
           /* SIDE WALL GENERATION */
           

            
            if (flurryStorm.scrollSnow == true){
                if (flurryStorm.maxWindX >= 3) {
               if (Math.random() * 4 >= 2.5) {
                flurryStorm.snowflakes[currentSnowFlake].x = window.innerWidth;
                flurryStorm.snowflakes[currentSnowFlake].y = Math.random() *
               (window.innerHeight + window.pageYOffset - window.pageYOffset) + window.pageYOffset;
               }
  
           } else if (flurryStorm.maxWindX >= 1 && flurryStorm.maxWindX < 3) {
  
               if (Math.random() * 3 >= 2.5) {
                flurryStorm.snowflakes[currentSnowFlake].x = window.innerWidth;
                flurryStorm.snowflakes[currentSnowFlake].y = Math.random() *
               (window.innerHeight + window.pageYOffset - window.pageYOffset) + window.pageYOffset;
               }
  
           } else if (flurryStorm.maxWindX < 0 && flurryStorm.maxWindX > -3) {
  
               if (Math.random() * 3 >= 2.5) {
                flurryStorm.snowflakes[currentSnowFlake].x = 0;
                   flurryStorm.snowflakes[currentSnowFlake].y = Math.random() *
               (window.innerHeight + window.pageYOffset - window.pageYOffset) + window.pageYOffset;
               }
  
           } else if (flurryStorm.maxWindX <= -3) {
  
               if (Math.random() * 4 >= 2.5) {
                flurryStorm.snowflakes[currentSnowFlake].x = 0;
                flurryStorm.snowflakes[currentSnowFlake].y = Math.random() *
               (window.innerHeight + window.pageYOffset - window.pageYOffset) + window.pageYOffset;
               }
  
           }
         

        } else {
            if (flurryStorm.maxWindX >= 3) {
  
                if (Math.random() * 4 >= 2.5) {
                    flurryStorm.snowflakes[currentSnowFlake].x = window.innerWidth;
                    flurryStorm.snowflakes[currentSnowFlake].y = Math.random() *
   (window.innerHeight - 0) + 0;
                }
   
            } else if (flurryStorm.maxWindX >= 1 && flurryStorm.maxWindX < 3) {
   
                if (Math.random() * 3 >= 2.5) {
                    flurryStorm.snowflakes[currentSnowFlake].x = window.innerWidth;
                    flurryStorm.snowflakes[currentSnowFlake].y = Math.random() *
   (window.innerHeight - 0) + 0;
                }
   
            } else if (flurryStorm.maxWindX < 0 && flurryStorm.maxWindX > -3) {
   
                if (Math.random() * 3 >= 2.5) {
                    flurryStorm.snowflakes[currentSnowFlake].x = 0;
                    flurryStorm.snowflakes[currentSnowFlake].y = Math.random() *
   (window.innerHeight - 0) + 0;
                }
   
            } else if (flurryStorm.maxWindX <= -3) {
   
                if (Math.random() * 4 >= 2.5) {
                    flurryStorm.snowflakes[currentSnowFlake].x = 0;
                    flurryStorm.snowflakes[currentSnowFlake].y = Math.random() *
   (window.innerHeight - 0) + 0;
                }
   
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
                snowCanvas2D.arc(flurryStorm.snowflakes[i].x, flurryStorm.snowflakes[i].y, flurryStorm.snowflakes[i].size,
                0, 2 * Math.PI, false);
                snowCanvas2D.fillStyle = flurryStorm.flakeColor;
                    snowCanvas2D.fill();
                } else {
                    snowCanvas2D.drawImage(flakeImg, flurryStorm.snowflakes[i].x, flurryStorm.snowflakes[i].y, flurryStorm.snowflakes[i].size, flurryStorm.snowflakes[i].size);
                }
  
  
               

               /* STICKY SNOWFLAKES */
                 
                if (flurryStorm.flakeStick == true && flurryStorm.scrollSnow == false) {
                    if (flurryStorm.snowflakes[i].y >= window.innerHeight - (flurryStorm.snowflakes[i].size + 1)) {
                        flurryStorm.snowflakes[i].stopped = true;
                    }
                }
                if (flurryStorm.snowflakes[i].stopped == true&& flurryStorm.snowflakes[i].size > flurryStorm.meltSpeed + 0.01) {
                    flurryStorm.snowflakes[i].size -= flurryStorm.meltSpeed;
                    flurryStorm.snowflakes[i].y = window.innerHeight - (flurryStorm.snowflakes[i].size + 1);
 
                } else if (flurryStorm.snowflakes[i].stopped == true&& flurryStorm.snowflakes[i].size <= flurryStorm.meltSpeed + 0.01){
                    flurryStorm.snowflakes[i].stopped = false;
                }
            

            /* MOVE THEM BOIS */
            if (flurryStorm.snowflakes[i].stopped == false) {
                flurryStorm.snowflakes[i].x -= flurryStorm.snowflakes[i].windX;
                flurryStorm.snowflakes[i].y += flurryStorm.snowflakes[i].windY;
            }
  
               /*RESET SNOWFLAKES*/
               if (flurryStorm.scrollSnow == true){
               if (flurryStorm.snowflakes[i].x <= 0 - flurryStorm.snowflakes[i].size || flurryStorm.snowflakes[i].y >=
  window.innerHeight + flurryStorm.snowflakes[i].size + window.pageYOffset) {
                   
                   var randSize = Math.random() * (flurryStorm.maxFlakeSize - flurryStorm.minFlakeSize) +
                   flurryStorm.minFlakeSize;
                   
                   flurryStorm.snowflakes[i].x = Math.random() *
  window.innerWidth
  flurryStorm.snowflakes[i].y = 0 + window.pageYOffset;
  flurryStorm.snowflakes[i].windY = Math.random() * (flurryStorm.maxWindY - flurryStorm.minWindY)
  + flurryStorm.minWindY,
  flurryStorm.snowflakes[i].windX = Math.random() * (flurryStorm.maxWindX - flurryStorm.minWindX)
  + flurryStorm.minWindX
  
  flurryStorm.snowflakes[i].size = randSize;
  
                   /* SIDE WALL GENERATION */
           if (flurryStorm.maxWindX >= 3) {
  
            if (Math.random() * 4 >= 2.5) {
                flurryStorm.snowflakes[i].x = window.innerWidth;
                flurryStorm.snowflakes[i].y = Math.random() *
            (window.innerHeight + window.pageYOffset - window.pageYOffset) + window.pageYOffset;
            }

        } else if (flurryStorm.maxWindX >= 1 && flurryStorm.maxWindX < 3) {

            if (Math.random() * 3 >= 2.5) {
                flurryStorm.snowflakes[i].x = window.innerWidth;
                flurryStorm.snowflakes[i].y = Math.random() *
            (window.innerHeight + window.pageYOffset - window.pageYOffset) + window.pageYOffset;
            }

        } else if (flurryStorm.maxWindX < 0 && flurryStorm.maxWindX > -3) {

            if (Math.random() * 3 >= 2.5) {
                flurryStorm.snowflakes[i].x = 0;
                flurryStorm.snowflakes[i].y = Math.random() *
            (window.innerHeight + window.pageYOffset - window.pageYOffset) + window.pageYOffset;
            }

        } else if (flurryStorm.maxWindX <= -3) {

            if (Math.random() * 4 >= 2.5) {
                flurryStorm.snowflakes[i].x = 0;
                flurryStorm.snowflakes[i].y = Math.random() *
(window.innerHeight + window.pageYOffset - window.pageYOffset) + window.pageYOffset;
            }

        }
    } } else {
        if (flurryStorm.snowflakes[i].x <= 0 - flurryStorm.snowflakes[i].size || flurryStorm.snowflakes[i].y >=
            window.innerHeight + flurryStorm.snowflakes[i].size) {
                             
                             var randSize = Math.random() * (flurryStorm.maxFlakeSize - flurryStorm.minFlakeSize) +
                             flurryStorm.minFlakeSize;
                             flurryStorm.snowflakes[i].x = Math.random() *
            window.innerWidth
            flurryStorm.snowflakes[i].y = 0;
            flurryStorm.snowflakes[i].windY = Math.random() * (flurryStorm.maxWindY - flurryStorm.minWindY)
            + flurryStorm.minWindY,
            flurryStorm.snowflakes[i].windX = Math.random() * (flurryStorm.maxWindX - flurryStorm.minWindX)
            + flurryStorm.minWindX
            
            flurryStorm.snowflakes[i].size = randSize;
            
                             /* SIDE WALL GENERATION */
                     if (flurryStorm.maxWindX >= 3) {
            
                      if (Math.random() * 4 >= 2.5) {
                        flurryStorm.snowflakes[i].x = window.innerWidth;
                        flurryStorm.snowflakes[i].y = Math.random() *
          (window.innerHeight - 0) + 0;
                      }
          
                  } else if (flurryStorm.maxWindX >= 1 && flurryStorm.maxWindX < 3) {
          
                      if (Math.random() * 3 >= 2.5) {
                        flurryStorm.snowflakes[i].x = window.innerWidth;
                        flurryStorm.snowflakes[i].y = Math.random() *
          (window.innerHeight - 0) + 0;
                      }
          
                  } else if (flurryStorm.maxWindX < 0 && flurryStorm.maxWindX > -3) {
          
                      if (Math.random() * 3 >= 2.5) {
                        flurryStorm.snowflakes[i].x = 0;
                        flurryStorm.snowflakes[i].y = Math.random() *
          (window.innerHeight - 0) + 0;
                      }
          
                  } else if (flurryStorm.maxWindX <= -3) {
          
                      if (Math.random() * 4 >= 2.5) {
                        flurryStorm.snowflakes[i].x = 0;
                      flurryStorm.snowflakes[i].y = Math.random() *
          (window.innerHeight - 0) + 0;
                      }
          
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
  