let music;
document.addEventListener('musickitloaded', function() {
  // MusicKit global is now defined
//   fetch('token').then(response => response.json()).then(res => {

    music = MusicKit.configure({
      developerToken: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdBUzhXQTVCRFcifQ.eyJpYXQiOjE1NTczNDY4MDksImV4cCI6MTU3Mjg5ODgwOSwiaXNzIjoiSloyVE1BR0syMyJ9.rPrIVufoc38Qh31HX8BaYoSh4ICXvHtUlyflv-22u2XdJnLo5YUzBUP1StlXTkBzJxbN19HrszyEopFlKyCwEg",
      app: {
        name: 'AppleMusicKitExample',
        build: '1978.4.1'
      }

    });
    // music = MusicKit.getInstance();
    //music.setQueue({ playlist: 'p.Av1c8PNm8g' }).then(function(queue) { music.play() });
    addEvents();
    showUserPlaylists();
//   });
});

var id;

progressBar = document.getElementById('myProgress');

progressBar.addEventListener('click', function(e) {
     var percentage = Math.floor((e.offsetX / this.offsetWidth) * 100);
     dur = music.player.currentPlaybackDuration;

     music.player.seekToTime(percentage*dur/100);
     var elem = document.getElementById("myBar");
     elem.style.width = percentage + '%';
});

function move() {
  var elem = document.getElementById("myBar");
  var timing = document.getElementById("current-timing");
  var width = 0;
  clearInterval(id);
  id = setInterval(frame, 1000);
  function frame() {
      width = music.player.currentPlaybackProgress*100;
      dur_sec = music.player.currentPlaybackDuration % 60;
      dur_min = parseInt(music.player.currentPlaybackDuration / 60);
      now_sec = music.player.currentPlaybackTime % 60;
      now_min = parseInt(music.player.currentPlaybackTime / 60);

      now = now_min + ":" + (now_sec < 10 ? "0" + now_sec : now_sec);
      duration = dur_min + ":" + (dur_sec < 10 ? "0" + dur_sec : dur_sec);
      timing.innerHTML = now + " / " + duration;

      elem.style.width = width + '%';
    }
}
