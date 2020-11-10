class Song {
    constructor(artist, song, album, genre, time = "0:00", rating = "0", cover = "#") {
        this.artist = artist;
        this.song = song;
        this.time = time;
        this.album = album;
        this.rating = rating;
        this.genre = genre;

        this.favorite = false;
        this.download = false;

        this.cover = cover
    }
    setAsFavorite() {
        this.favorite = true;
    }

    removeFavorite() {
        this.favorite = false;
    }

    downloadSong() {
        this.download = true;
        alert('Download started')
    }

    show() {
        console.log(
            `Artist: ${this.artist}\nSong: ${this.song}\nAlbum: ${this.album}\nGenre: ${this.genre}`
        );
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

function insertSongList(songList, filteredSongSection) {
    songList.forEach(song => {
        let tr = document.createElement('tr');

        for (let field in song) {
            let td = document.createElement('td')
            if(field === 'favorite') {
                let faveBtn = document.createElement('img');
                faveBtn.src = './icons/heart.svg'
                faveBtn.setAttribute("class", "favoriteBtn")
                td.appendChild(faveBtn);
            } else if(field === 'download') {
                let downloadBtn = document.createElement('img');
                downloadBtn.src = './icons/cloud-arrow-down.svg'
                downloadBtn.setAttribute("class", "downloadBtn")
                td.appendChild(downloadBtn);
            } else if(field !== 'cover') {
                td.innerText = song[field]
            }
            tr.appendChild(td)
            tr.style.display = 'none';
        }
        filteredSongSection.appendChild(tr);
    })
}

function filterSongList(filter, completeSongList) {
    let visibleRows = completeSongList.filter(song => {
        for (let key in filter) {
            if(song[key] !== filter[key] && filter[key] !== '') {
                return false
            }
        }
        return true
    });
    return visibleRows;
}

function showSongList(visibleRows, completeSongList, filteredSongList) {
    let visibleIndex = visibleRows.map(song => {
        let i = completeSongList.indexOf(song)
        return i
    })
    visibleIndex.forEach(i => {
        filteredSongList.children[i].style.display = 'table-row';
    })
}

function resetVisibility(filteredSongList) {
    Array.from(filteredSongList.children).forEach(row => row.style.display = 'none');
}

function resetSongList(filteredSongList) {
    while(filteredSongList.firstChild) {
        filteredSongList.removeChild(filteredSongList.firstChild);
    }
}

function resetFields(fields) {
    return fields.forEach(f => {
        if(f.type === 'text') {
            f.value = "";
        } else if(f.type === 'select-one') {
            f.value = f.querySelector('option').value;
        }
    });
}

function setupGenreField(searchGenre, completeSongList) {
    let genreList = []
    completeSongList.forEach(song => {
        if(!genreList.includes(song.genre)) {
            genreList.push(song.genre)
            let option = document.createElement("option")
            option.innerText = song.genre
            searchGenre.appendChild(option)
        }
    });
}

function insertFavoriteSong(song, favoriteSongSection) {
    if(song.favorite !== true) {
        let img = document.createElement("img")
        img.setAttribute("src", song.cover)
        img.addEventListener("click", () => {
            img.className = ""
            if(favoriteSongSection.children.length < 5) {
                favoriteSongSection.className = 'center'
            }
            setTimeout(() => img.remove(), 500)
            song.removeFavorite();

        });
        favoriteSongSection.appendChild(img)
        if(favoriteSongSection.children.length >= 5) {
            favoriteSongSection.className = ''
        }
        setTimeout(() => favoriteSongSection.lastChild.className += "show", 100)
    }
}

export {Song, Filter, setupGenreField, insertSongList, insertFavoriteSong, filterSongList, showSongList, resetVisibility, resetFields}