/* global juke */
'use strict';

juke.controller('ArtistCtrl', ($scope, $rootScope, $log, ArtistFactory, PlayerFactory) => {

	$rootScope.$on('viewSwap', (evt, data) => {
		$scope.visible = (data.view === 'singleArtist');
		if (data.view === 'singleArtist') {
			ArtistFactory.fetchById(data.id)
				.then(artist => $scope.artist = artist)
				.catch($log.error);
		}
	});

	$scope.toggle = (song, songList) => {

    if ($scope.isPlaying() && song === $scope.getCurrentSong()) {
      PlayerFactory.pause();
    } else if (!$scope.isPlaying() && song === $scope.getCurrentSong()) {
      PlayerFactory.resume();
    } else {
      PlayerFactory.start(song, songList);
    }
  };

  $scope.getCurrentSong = () => {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = () => {
    return PlayerFactory.isPlaying();
  };

  $scope.viewSingleAlbum = albumId => {
		$rootScope.$broadcast('viewSwap', { view: 'singleAlbum', id: albumId });
  };
});
