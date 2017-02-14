var colors = new tracking.ColorTracker(['magenta', 'cyan']); 
var keyboardEvent = document.createEvent("KeyboardEvent");
var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
var canChange = true;


  keyboardEvent[initMethod](                                                                                            // sets the event to push down enter button.
                   "keydown", // event type : keydown, keyup, keypress
                    true, // bubbles
                    true, // cancelable
                    window, // viewArg: should be window
                    false, // ctrlKeyArg
                    false, // altKeyArg
                    false, // shiftKeyArg
                    false, // metaKeyArg
                    13, // keyCodeArg : unsigned long the virtual key code, else 0
                    0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
);

    colors.on('track', function(event) {
        if (event.data.length === 0) {
            document.getElementById("demo").style.backgroundColor = "white";
        // No colors were detected in this frame.
        } else {
            if (canChange == true){
                event.data.forEach(function(rect) {
                    console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
                    document.dispatchEvent(keyboardEvent);                                                              // When color magenta, cyan or yellow is registrated keyboardevent starts.
                    var iframe = document.getElementById("winchr");
                        if (rect.color == 'magenta'){
                    iframe.contentDocument.getElementById("right").click();                                             // click event on the mainwindow.
                    iframe.contentDocument.body.dispatchEvent(keyboardEvent);
                    canChange = false;
                    setTimeout(function(){canChange=true}, 2000);
                        }
                    if (rect.color == 'cyan'){
                    iframe.contentDocument.getElementById("left").click();                                             // click event on the mainwindow.
                    iframe.contentDocument.body.dispatchEvent(keyboardEvent);
                    canChange = false;
                    setTimeout(function(){canChange=true}, 2000);
                        }
                });
            }
        }
    });
    document.addEventListener("keydown", myFunction);

      function myFunction() {
        document.getElementById("demo").style.backgroundColor = "#66ff33";                                          // Changes color when keyboardevent starts, or any key that is pushed down.
          
      }
  tracking.track('#myVideo', colors, {camera: true});
  require('./tracking.js')