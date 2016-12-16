/* global juke */
'use strict';

juke.controller('SidebarCtrl', ($scope, $log, $rootScope) => {
	$scope.viewAlbums = () => {
		$rootScope.$broadcast('viewSwap', { view: 'allAlbums' });
	};

	$scope.viewAllArtists = () => {
		$rootScope.$broadcast('viewSwap', { view: 'allArtists' });
	};
});
