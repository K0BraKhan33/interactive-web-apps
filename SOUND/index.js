// Check browser compatibility
if (!('webkitSpeechRecognition' in window)) {
    console.log("Speech recognition is not supported in this browser.");
  } else {
    // Create a new instance of speech recognition
    const recognition = new webkitSpeechRecognition();
    
    // Set recognition properties
    recognition.continuous = true;
    recognition.interimResults = true;
    
    // Start recognition
    recognition.start();
    
    // Event handler when speech recognition starts
    recognition.onstart = function() {
      console.log("Speech recognition started...");
    };
    
    // Event handler when speech recognition results are available
    recognition.onresult = function(event) {
      // Get the recognized speech as text
      const transcript = event.results[event.results.length - 1][0].transcript;
      
      // Display the recognized speech
      console.log("Recognized speech: " + transcript);
    };
    
    // Event handler when speech recognition ends
    recognition.onend = function() {
      console.log("Speech recognition ended.");
    };
  }
  