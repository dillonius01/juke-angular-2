/* global juke */
'use strict';

juke.factory('SongFactory', () => {
	const appendUrl = song => {
		song.url = `api/songs/${song.id}/audio`;
		return song;
	};

	return { appendUrl };
});
