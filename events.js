function addEvents() {

  document.getElementById('play-button').addEventListener('click', () => {
    // music.play();
    if(music.player.isPlaying) {
      music.pause();
    } else {
      music.play();
    }
  });

  // document.getElementById('pause-button').addEventListener('click', () => {
  //   music.pause();
  // });

  document.getElementById('next-button').addEventListener('click', () => {
    music.skipToNextItem();
  });

  document.getElementById('previous-button').addEventListener('click', () => {
    music.skipToPreviousItem();
  });

  document.getElementById('log-in').addEventListener('click', () => {
    music.authorize();
  });

  document.getElementById('log-out').addEventListener('click', () => {
    music.unauthorize();
  });

  document.getElementById('play-playlist').addEventListener('click', (t) => {
    id = t.srcElement.parentNode.children[2].getAttribute("playlist-id");
    music.setQueue({playlist: id}).then(function(queue) {
      music.play();
    });
  });

  music.addEventListener("mediaItemDidChange", item => {
    document.getElementById('current-playing').innerHTML = item.item.info;
    showLyrics();
    // console.log(music.player.queue);
    showQueueContent(music.player.queue);
    move();
  });

  music.addEventListener("playbackStateDidChange", item => {
    state = item.state;

    btn = document.getElementById("play-button");
    if(state == 2) {
      btn.innerHTML = '<img src="images/pause-button.png" height="30" width="30"/>'
    } else {
      btn.innerHTML = '<img src="images/play-button.png" height="30" width="30" />'
    }
  });
  // music.addEventListener("queuePositionDidChange", item => {
  //   console.log("1", item);
  // });

  music.addEventListener("queueItemsDidChange", item => {
    showQueueContent(music.player.queue);
  });

}

function showUserPlaylists() {
  music.api.library.playlists().then(function(res) {
    par = document.getElementById("user-playlists");

    for (item of res) {
      pl = item.attributes.name;
      var node = document.createElement("li");
      node.innerHTML += "<a href=javascript:void(0) onclick='showPlaylistContent(this)'>" + pl + "</a>";
      node.setAttribute("playlist-id", item.id);
      par.appendChild(node);
    }
  });
}

function showPlaylistContent(item) {
  id = item.parentNode.getAttribute("playlist-id");

  music.api.library.playlist(id).then(function(res) {
    par = document.getElementById("playlist-content");
    par.innerHTML = "";
    par.setAttribute("playlist-id", id);
    tracks = res.relationships.tracks.data;

    for (track of tracks) {
      name = track.attributes.name;
      artist = track.attributes.artistName;
      var node = document.createElement("li");
      node.innerHTML = name + "  --  " + artist;
      node.setAttribute("track-name", track.id)
      par.appendChild(node);
    }
  });
}

function changeToTrackIndex(index) {
  return function() {
    console.log("a");
    music.player.changeToMediaAtIndex(index);
  };
}

function showQueueContent(queue) {
  console.log("CHANGE");
  par = document.getElementById("queue-content");
  par.innerHTML = "";
  position = queue.position;
  queue = queue._items;
  for (var i = 0; i < queue.length; i++) {

    track = queue[i];
    name = track.attributes.name;
    artist = track.attributes.artistName;
    var node = document.createElement("li");
    if(i == position) {
      node.innerHTML = "<b>" + name + "  --  " + artist + "</b>";
    } else {
      node.innerHTML = name + "  --  " + artist;
    }

    node.onmouseover = onHover;
    node.onmouseout = onUnhover;
    node.onclick = changeToTrackIndex(i);
    node.setAttribute("track-name", track.id)
    par.appendChild(node);
  }
}
