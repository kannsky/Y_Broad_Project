var ch_file = document.querySelector('#btn');
var load_video = document.querySelector('#load_video');
var playVideo = document.querySelector('#play_video');
var sv_file = document.querySelector('#save_file');
var output = document.querySelector('output');
var importData = document.querySelector('#importData'); // 뭐 열었는지 보여주는거
var import_data = document.querySelector('#import_data'); // 버튼 
var blobList = [];
var entry;

function errorHandler(e) {
  console.error(e);
}

//load video to arraybuffer. Get ready to play Videos
load_video.addEventListener('click', function() {
  var vid2 = "http://www.ioncannon.net/examples/vp8-webm/big_buck_bunny_480p.webm"
  var vid = "http://techslides.com/demos/sample-videos/small.webm"
  var request = new XMLHttpRequest();
  request.responseType = "arraybuffer"
  request.onload = function(e) {
    var blob = new Blob([request.response], {type: "video/webm"});
    console.log(blob)
    blobList.push(blob)      
  }
  request.open("GET", vid, true)
  request.send()
  
  var request2 = new XMLHttpRequest()
  request2.responseType = "arraybuffer"
  request2.onload = function(e) {
    var blob = new Blob([request2.response], {type: "video/webm"});
    console.log(blob)
    blobList.push(blob)
  }
  request2.open("GET", vid2, true)
  request2.send()
})

//play videos which are load at load_video function at Chrome App 
playVideo.addEventListener('click', function() {
  // console.log(blobList)
  blobList.forEach(function(videoBlob) {
    var video = document.createElement('video')
    video.setAttribute("controls","controls")   
    video.autoplay = true;
    video.src = window.URL.createObjectURL(videoBlob);
    document.body.appendChild(video)
  })
})


//https://developer.mozilla.org/en-US/docs/Web/API/File <- 이걸로 보면됨

ch_file.addEventListener('click', function(e) {
  var accepts = [{
    mimeTypes: ['text/*'],
    extensions: ['js', 'css', 'txt', 'html', 'xml', 'tsv', 'csv', 'rtf', "jpg", "gif", "crx","pdf"]
  }];
  chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function(theEntry) {
    if(!theEntry) {
      output.textContent = 'No file selected.';
      return;
    }
    chrome.storage.local.set({'chosenFile': chrome.fileSystem.retainEntry(theEntry)});
    entry = theEntry;
    loadFileEntry(theEntry);
  });
});

// var defaultDatabase = firebase.database();
// firebase.database.enableLogging(true);

// Firebase.INTERNAL.forceWebSockets();
// var database = firebase.database();

//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAXO8kgV-tgvtRwyUmF2YUoH2qQUMLhJMc",
//     authDomain: "project-dandelion.firebaseapp.com",
//     databaseURL: "https://project-dandelion.firebaseio.com",
//     storageBucket: "project-dandelion.appspot.com",
//     messagingSenderId: "551863919971"
//   };
//   firebase.initializeApp(config);


// var rootRef = firebase.database().ref();

