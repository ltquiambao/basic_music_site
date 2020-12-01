export function insertSongList(songList, filteredSongSection, favoriteSongSection) {
    songList.forEach(song => {

        let tr = document.createElement('tr');

        for (let field in song) {
            if(field !== 'id' && field !== 'cover') {
                let td = document.createElement('td')
                if(field === 'favorite') {
                    addFavoriteButton(td, song, favoriteSongSection);
                } else if(field === 'download') {
                    addDownloadButton(td, song);
                } else {
                    td.innerText = song[field];
                }
                tr.appendChild(td);
            }
        }
        filteredSongSection.appendChild(tr);
    })
}

function addFavoriteButton(td, song, favoriteSongSection) {
    let faveBtn = document.createElement('img');
    faveBtn.src = '/assets/icons/heart.svg';
    faveBtn.setAttribute("class", "favoriteBtn");
    faveBtn.addEventListener("click", () => insertSongToFavorites(song, favoriteSongSection));
    td.appendChild(faveBtn);
}

function addDownloadButton(td, song) {
    let downloadBtn = document.createElement('img');
    downloadBtn.src = '/assets/icons/cloud-arrow-down.svg';
    downloadBtn.setAttribute("class", "downloadBtn");
    downloadBtn.addEventListener("click", () => downloadSong(song));
    td.appendChild(downloadBtn);
}

export function resetSongList(filteredSongList) {
    while(filteredSongList.firstChild) {
        filteredSongList.removeChild(filteredSongList.firstChild);
    }
}

export function resetFields(fields) {
    return fields.forEach(f => {
        if(f.type === 'text') {
            f.value = "";
        } else if(f.type === 'select-one') {
            f.value = f.querySelector('option').value;
        }
    });
}

export function setupGenreField(searchGenre, genreList) {
    genreList.forEach(genre => {
        let option = document.createElement("option");
        option.innerText = genre;
        searchGenre.appendChild(option);
    });
}

function insertSongToFavorites(song, favoriteSongSection) {
    if(song.favorite !== true) {
        let img = document.createElement("img");
        img.setAttribute("src", song.cover);
        setFavorite(song);
        img.addEventListener("click", () => removeSongFromFavorites(img, song, favoriteSongSection));

        favoriteSongSection.appendChild(img);
        if(favoriteSongSection.children.length >= 5) {
            favoriteSongSection.className = '';
        }
        setTimeout(() => favoriteSongSection.lastChild.className += "show", 100);
    }
}

function removeSongFromFavorites(songCoverImg, song, favoriteSongSection) {
    songCoverImg.className = ""
    if(favoriteSongSection.children.length < 5) {
        favoriteSongSection.className = 'center';
    }
    setTimeout(() => songCoverImg.remove(), 500);
    setUnfavorite(song);
}

async function setFavorite(song) {
    const url = `http://localhost:4001/favorite?musicId=${song.id}`;
    const response = await fetch(url);
}

async function setUnfavorite(song) {
    const url = `http://localhost:4001/unfavorite?musicId=${song.id}`;
    const response = await fetch(url);
}

async function downloadSong(song) {
    const url = `http://localhost:4001/download/${song.id}`;
    const response = await fetch(url, { method: "POST"});
    const text = await response.text();
    alert(text);
}

export function filterQuery(artist, song, album, genre) {
    let filterQuery = ""
    if(artist !== "") {
        filterQuery += `artist=${artist}`;
    }
    if(song !== "") {
        filterQuery += `&song=${song}`;
    }
    if(album !== "") {
        filterQuery += `&album=${album}`;
    }
    if(genre !== "Pick a genre") {
        filterQuery += `&genre=${genre}`;
    }
    return filterQuery;
} 