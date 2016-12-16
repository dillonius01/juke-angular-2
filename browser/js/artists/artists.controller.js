/* global juke */
'use strict';

juke.controller('ArtistsCtrl', ($scope, $rootScope, $log, ArtistsFactory) => {

	ArtistsFactory.fetchAll()
		.then(artists => $scope.artists = artists)
		.catch($log.error);

	$rootScope.$on('viewSwap', (evt, data) => {
		$scope.visible = (data.view === 'allArtists');
	});

	$scope.viewSingleArtist = artistId => {
		$rootScope.$broadcast('viewSwap', { view: 'singleArtist', id: artistId });
	};
});
