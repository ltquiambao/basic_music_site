
function musicFactory() {
    let DATA;

    class Song {
        constructor(id, artist, song, album, genre, time = "0:00", rating = "0", cover = "#") {
            this.id = id;
            this.artist = artist;
            this.song = song;
            this.time = time;
            this.album = album;
            this.rating = rating;
            this.genre = genre;

            this.favorite = false;
            this.download = false;

            this.cover = '/assets/images/' + cover;
        }
        setAsFavorite() {
            this.favorite = true;
        }

        removeFavorite() {
            this.favorite = false;
        }

        downloadSong() {
            this.download = true;
        }
    }

    class Filter {
        constructor(artist, song, album, genre) {
            this.artist = artist;
            this.song = song;
            this.album = album;
            if(genre === 'Pick a genre') {
                this.genre = '';
            } else {
                this.genre = genre;
            }
        }
    }

    function setupSongList() {
        const songList = [
            new Song(1, 'Artist-Jazz', 'Song-Jazz-1', 'Album-Jazz-1', 'Jazz', '1:23', '1', 'image1.jpg'),
            new Song(2, 'Artist-Jazz', 'Song-Jazz-2', 'Album-Jazz-1', 'Jazz', '2:34', '2', 'image2.jpg'),
            new Song(3, 'Artist-Jazz', 'Song-Jazz-3', 'Album-Jazz-2', 'Jazz', '2:34', '3', 'image3.jpg'),
            new Song(4, 'Artist-Jazz', 'Song-Jazz-4', 'Album-Jazz-2', 'Jazz', '1:23', '4', 'image4.jpg'),
            new Song(5, 'Artist-Jazz', 'Song-Jazz-5', 'Album-Jazz-3', 'Jazz', '1:23', '5', 'image5.jpg'),
            new Song(6, 'Artist-Rock', 'Song-Rock-1', 'Album-Rock-1', 'Rock', '1:23', '1', 'image6.png'),
            new Song(7, 'Artist-Rock', 'Song-Rock-1', 'Album-Rock-1', 'Rock', '1:23', '2', 'image7.jpg'),
            new Song(8, 'Artist-Rock', 'Song-Rock-2', 'Album-Rock-1', 'Rock', '2:34', '3', 'image8.jpg'),
            new Song(9, 'Artist-Rock', 'Song-Rock-3', 'Album-Rock-2', 'Rock', '2:34', '4', 'image9.jpg'),
            new Song(10, 'Artist-Rock', 'Song-Rock-4', 'Album-Rock-2', 'Rock', '1:23', '5', 'image10.jpg'),
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

        DATA = songList;
        return DATA;
    }

    function getGenreList(completeSongList = DATA) {
        let genreList = []
        completeSongList.forEach(song => {
            if(!genreList.includes(song.genre)) {
                genreList.push(song.genre)
            }
        });
        return genreList;
    }

    function filterSongList(filter, completeSongList = DATA) {
        let visibleRows = completeSongList.filter(song => {
            for (let key in filter) {
                if(song[key] !== filter[key] && filter[key] !== undefined) {
                    return false;
                }
            }
            return true;
        });
        return visibleRows;
    }

    function addFavorite(songId, completeSongList = DATA) {
        let [ song ] = completeSongList.filter(song => song.id === parseInt(songId));
        song.setAsFavorite();
        return song;
    };

    function removeFavorite(songId, completeSongList = DATA) {
        let [ song ] = completeSongList.filter(song => song.id === parseInt(songId));
        song.removeFavorite();
        return song;
    };

    function downloadSong(songId, completeSongList = DATA) {
        let [ song ] = completeSongList.filter(song => song.id === parseInt(songId));
        song.downloadSong();
        return song;
    }

    return {
        Filter,
        setupSongList, 
        getGenreList, 
        filterSongList, 
        addFavorite, 
        removeFavorite, 
        downloadSong
    }
}

module.exports = musicFactory();