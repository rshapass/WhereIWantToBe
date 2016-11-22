var capture;
var c;
var img;
var bubbles = [];
var cat = [];
var bg = [];
var cycle = 0;
var gifbutton;
var song= [];
var songbutton;
var songcycle= 0; 

//load the media
function preload() {
  for (var j = 0; j < 4; j++) {
    bg[j] = loadImage('stickers/background' + j + '.jpg');
  }
  for (var i = 0; i < 4; i++) {
    cat[i] = loadGif('stickers/stickers' + i + '.gif');
  }
  for (var p = 0; p < 2; p++) {
    song[p] = loadSound('music/song' + p + '.mp3');
  }
}


function setup() {
  c = createCanvas(840, 680);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  img = createImage(320, 240);
  img.loadPixels();

  //create the gifbutton and move it
  gifbutton = createButton('SELFIE ME');
  gifbutton.mousePressed(takeaGif);
  gifbutton.position(600, 830);

  //play the song
  songbutton = createButton('SERENADE ME');
  songbutton.mousePressed(singtoMe);
  songbutton.position(700, 830);

  //stop the song 
  songbutton = createButton('STOP SINGING');
  songbutton.mousePressed(dontSing);
  songbutton.position(700, 870);

// slider for tint
  slider = createSlider(0, 100, 5, 5);
  slider.position(0, 850);
  slider.style('width', '80px')
  
//slider for song volume   
  songSlide = createSlider(0, 1, .25, .25);
  songSlide.position(700, 900);
  songSlide.style('width', '80px')
}



//key type changed  bg
function keyTyped() {
  if (key === 'a') {
    cycle = cycle + 1;
    cycle = cycle % 4;
    console.log(cycle);
  }
}

// saves frames to create gif
function takeaGif() {
  saveFrames("selfie-", "png", 3, 2);
}


//starts song--ASK DAVID HOW TO CHANGE SONGS IN HERE 
function singtoMe() {
  // var songVolume= songSlide.value();
  // song.setVolume(songVolume);
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
  } else {
    song.stop();
    songcycle = songcycle + 1;
    songcycle = songcycle % 1;
    console.log(cycle);

  }
}

function loaded() {
  console.log("loaded");
}


//stops song
function dontSing() {
  song.stop();
}


// mousePressed adds stickers
function mousePressed() {
  push();
  var r = floor(random(0, cat.length));
  var b = new Bubble(mouseX, mouseY, cat[r]);
  bubbles.push(b);
  pop();
}

//make the stickers
function Bubble(x, y, cat) {
  push();
  this.x = x;
  this.y = y;
  this.cat = cat;
  pop();

  //make the stickers appear
  this.display = function() {
    push();
    imageMode(CENTER);
    image(this.cat, this.x, this.y);
    pop();
  }
}


function draw() {
  // new cursor 
  cursor(CROSS);

  //display the bg 
  image(bg[cycle], 0, 0, width, height);
  // console.log("readme");

  // display image with tint and slider
  image(capture, 240, 220, 320, 240);
  push();
  var val = slider.value()
  tint(252, 0, 255, val)
  image(capture, 240, 220, 320, 240);
  pop();

  //allow the stickers to be drawn
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
  }
  
  // allows you to draw your own BG on white --ASK DAVID ABOUT THIS 
function mouseDragged() {
  strokeWeight(5);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

}