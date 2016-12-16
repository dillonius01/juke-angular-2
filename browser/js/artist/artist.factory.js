/* global juke */
'use strict';

juke.factory('ArtistFactory', ($http, $log, $q, SongFactory) => {

	const fetchingArtist = artistId => {
		return $http.get(`api/artists/${artistId}`).then(artist => artist.data);
	};

	const fetchingAlbums = artistId => {
		return $http.get(`api/artists/${artistId}/albums`).then(albums => albums.data);
	};

	const fetchingSongs = artistId => {
		return $http.get(`api/artists/${artistId}/songs`).then(songs => songs.data);
	};

	const fetchById = artistId => {
		return $q.all([fetchingArtist(artistId), fetchingAlbums(artistId), fetchingSongs(artistId)])
			.then(results => {

				let artist = results[0];
				let albums = results[1];
				let songs = results[2];

				albums.forEach(album => {
          album.imageUrl = `api/albums/${album.id}/image`;
        });

        songs = songs.map(SongFactory.appendUrl);

				artist.albums = albums;
				artist.songs = songs;
				return artist;
			})
			.catch($log.error);
	};

	return { fetchById };
});
