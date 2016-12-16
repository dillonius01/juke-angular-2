/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log, AlbumFactory, PlayerFactory) {

  // show if viewSwap called properly
  $scope.$on('viewSwap', (evt, data) => {
    $scope.visible = (data.view === 'singleAlbum');
    if (data.view === 'singleAlbum') {
      AlbumFactory.fetchById(data.id)
        .then(album => $scope.album = album)
        .catch($log.error);
    }
  });

  // main toggle
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


});
