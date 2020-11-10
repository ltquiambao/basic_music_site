import * as util from './util.js';
import setupSongList from './setupSongList.js';
const Filter = util.Filter;

// Selectors
const searchForm = document.querySelector("form"),
    searchArtist = document.querySelector("#searchArtist"),
    searchSong = document.querySelector("#searchSong"),
    searchAlbum = document.querySelector("#searchAlbum"),
    searchGenre = document.querySelector("#searchGenre"),
    searchBtn = document.querySelector("[value=Search]"),
    resetBtn = document.querySelector("[value=Reset]");

const favoriteSongSection = document.querySelector("#favoriteSongList"),
    filteredSongSection = document.querySelector("#filteredSongList tbody");

// setup static song list
const completeSongList = setupSongList(filteredSongSection, favoriteSongSection);

// setup genre dropdown field
util.setupGenreField(searchGenre, completeSongList);

// favorite song list
let favoriteSongList = []

function searchCriteria(x) {
    x.preventDefault();
    let filter = new Filter(searchArtist.value,
                        searchSong.value,
                        searchAlbum.value,
                        searchGenre.value)
    if(searchArtist.value.concat(searchSong.value, searchAlbum.value, searchGenre.value) === "Pick a genre") {
        alert("Please complete at least one field");
    }else{
        util.resetVisibility(filteredSongSection)
        let searchSongList = util.filterSongList(filter, completeSongList)
        util.showSongList(searchSongList, completeSongList, filteredSongSection)
    }
}

// search button event listener
searchForm.addEventListener("submit", searchCriteria);
[searchArtist, searchSong, searchAlbum, searchGenre]
    .forEach(x => x.addEventListener("enter", searchCriteria))

// reset button event listener
resetBtn.addEventListener("click", () => util.resetFields([searchArtist, searchSong, searchAlbum, searchGenre]));