/* global juke */
'use strict';

juke.controller('AlbumsCtrl', ($scope, $log, $rootScope, AlbumsFactory) => {
	AlbumsFactory.fetchAll()
		.then(albums => $scope.albums = albums)
		.catch($log.error);

	$scope.$on('viewSwap', (evt, data) => {
		$scope.visible = (data.view === 'allAlbums');
	});

	$scope.viewSingleAlbum = albumId => {
		$rootScope.$broadcast('viewSwap', { view: 'singleAlbum', id: albumId });
	};
});
