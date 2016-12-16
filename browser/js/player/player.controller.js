/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  $scope.getCurrentSong = () => {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = () => {
    return PlayerFactory.isPlaying();
  };

  $scope.toggle = (song, songList) => {
    if ($scope.isPlaying() && song === $scope.getCurrentSong()) {
      PlayerFactory.pause();
    } else if (!$scope.isPlaying() && song === $scope.getCurrentSong()) {
      PlayerFactory.resume();
    } else {
      PlayerFactory.start(song, songList);
    }
  };

  $scope.next = () => {
    PlayerFactory.next();
  };

  $scope.previous = () => {
    PlayerFactory.previous();
  };

  $scope.getProgress = () => {
    return PlayerFactory.getProgress() * 100;
  };

  $scope.handleProgressClick = evt => {
    PlayerFactory.seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
