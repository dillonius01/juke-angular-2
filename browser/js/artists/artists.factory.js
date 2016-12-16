/* global juke */
'use strict';

juke.factory('ArtistsFactory', ($http, $log) => {

	const fetchAll = () => {
		return $http.get('api/artists')
			.then(artists => artists.data)
			.catch($log.error);
	};

	return { fetchAll };
});
