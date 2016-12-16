/* global juke */

'use strict';

juke.factory('PlayerFactory', $rootScope => {

  var audio = document.createElement('audio'),
			currentSong = null,
			playing = false,
			songList = [],
			progress = 0;

	let playerFactory = {};

	// event listeners
	audio.addEventListener('ended', () => {
		playerFactory.next();
		$rootScope.$evalAsync();
	});

	audio.addEventListener('timeupdate', () => {
		playerFactory.setProgress();
		$rootScope.$evalAsync();
	});

	// functionality
	playerFactory.pause = () => {
		audio.pause();
		playing = false;
  };

  playerFactory.resume = () => {
		audio.play();
		playing = true;
  };

	playerFactory.start = (song, list) => {
		playerFactory.pause();

		audio.src = song.url;
    audio.load();
		playerFactory.resume();
		currentSong = song;
		songList = list;
  };

  playerFactory.isPlaying = () => {
		return playing;
  };

  playerFactory.getCurrentSong = () => {
		return currentSong;
  };

	playerFactory.next = () => {
		const len = songList.length;
		const currIndex = songList.indexOf(currentSong);

		const nextSongIndex = (currIndex + 1 < len) ? currIndex + 1 : 0;

		playerFactory.start(songList[nextSongIndex], songList);
	};

	playerFactory.previous = () => {
		const len = songList.length;
		const currIndex = songList.indexOf(currentSong)

		const nextSongIndex = (currIndex - 1 >= 0) ? currIndex - 1 : len - 1;

		playerFactory.start(songList[nextSongIndex], songList)
	};

	playerFactory.setProgress = () => {
		if (!audio.duration) return;
		progress = audio.currentTime / audio.duration;
	};

	playerFactory.getProgress = () => {
		return progress;
	};

	playerFactory.seek = decimal => {
		audio.currentTime = audio.duration * decimal;
		playerFactory.setProgress();
	};

  return playerFactory;
});
