import * as util from './util.js';

$(function() {
    // setup selectors
    const searchForm = document.querySelector("form"),
    searchArtist = document.querySelector("#searchArtist"),
    searchSong = document.querySelector("#searchSong"),
    searchAlbum = document.querySelector("#searchAlbum"),
    searchGenre = document.querySelector("#searchGenre"),
    searchBtn = document.querySelector("[value=Search]"),
    resetBtn = document.querySelector("[value=Reset]");

    const favoriteSongSection = document.querySelector("#favoriteSongList"),
    filteredSongSection = document.querySelector("#filteredSongList tbody");

    // initialize Song list with Genre input field 
    (async () => {
        const url = `http://localhost:4001/init`
        const response = await fetch(url);
        const json = await response.json();

        util.setupGenreField(searchGenre, json.genreList)
    })();

    // search button event listener
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchFormValues = [searchArtist.value, searchSong.value, searchAlbum.value, searchGenre.value];
        
        (async () => {
            const filterQuery = util.filterQuery(...searchFormValues);
            const url = `http://localhost:4001/filterMusic?${filterQuery}`;
            const response = await fetch(url);
            const json = await response.json();

            util.resetSongList(filteredSongSection);
            util.insertSongList(json, filteredSongSection, favoriteSongSection);
        })();
    })

    // reset button event listener
    resetBtn.addEventListener("click", () => util.resetFields([searchArtist, searchSong, searchAlbum, searchGenre]));
});
