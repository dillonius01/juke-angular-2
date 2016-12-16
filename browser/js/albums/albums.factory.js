/* global juke */
'use strict';

juke.factory('AlbumsFactory', ($http, $log) => {
	
  const fetchAll = () => {
    return $http.get('/api/albums')
      .then(albums => albums.data)
      .then(albums => {
				albums.forEach(album => {
          album.imageUrl = `/api/albums/${album.id}/image`;
        });
				return albums;
      })
      .catch($log.error);
  };

	return { fetchAll };
});
