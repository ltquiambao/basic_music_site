// import {Song, insertSongList, insertFavoriteSong} from './util.js';

function setupSongList(filteredSongSection, favoriteSongSection) {
    let songList = [
        new Song('Artist-Jazz', 'Song-Jazz-1', 'Album-Jazz-1', 'Jazz', '1:23', '1', './images/image1.jpg'),
        new Song('Artist-Jazz', 'Song-Jazz-2', 'Album-Jazz-1', 'Jazz', '2:34', '2', './images/image2.jpg'),
        new Song('Artist-Jazz', 'Song-Jazz-3', 'Album-Jazz-2', 'Jazz', '2:34', '3', './images/image3.jpg'),
        new Song('Artist-Jazz', 'Song-Jazz-4', 'Album-Jazz-2', 'Jazz', '1:23', '4', './images/image4.jpg'),
        new Song('Artist-Jazz', 'Song-Jazz-5', 'Album-Jazz-3', 'Jazz', '1:23', '5', './images/image5.jpg'),
        new Song('Artist-Rock', 'Song-Rock-1', 'Album-Rock-1', 'Rock', '1:23', '1', './images/image6.png'),
        new Song('Artist-Rock', 'Song-Rock-1', 'Album-Rock-1', 'Rock', '1:23', '2', './images/image7.jpg'),
        new Song('Artist-Rock', 'Song-Rock-2', 'Album-Rock-1', 'Rock', '2:34', '3', './images/image8.jpg'),
        new Song('Artist-Rock', 'Song-Rock-3', 'Album-Rock-2', 'Rock', '2:34', '4', './images/image9.jpg'),
        new Song('Artist-Rock', 'Song-Rock-4', 'Album-Rock-2', 'Rock', '1:23', '5', './images/image10.jpg'),
        // new Song('Pop'),
        // new Song('Pop'),
        // new Song('Pop'),
        // new Song('Pop'),
        // new Song('Pop'),
        // new Song('Classical'),
        // new Song('Classical'),
        // new Song('Classical'),
        // new Song('Classical'),
        // new Song('Classical'), 
    ]

    // insert songList to HTML table body
    insertSongList(songList, filteredSongSection)

    // favorite button event listener
    document.querySelectorAll("#filteredSongList .favoriteBtn").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            insertFavoriteSong(songList[i], favoriteSongSection);
            songList[i].setAsFavorite();
            // console.log(songList);
        });
    });

    // download button event listener
    document.querySelectorAll("#filteredSongList .downloadBtn").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            songList[i].downloadSong();
            // console.log(songList);
        });
    });

    return songList;
}

