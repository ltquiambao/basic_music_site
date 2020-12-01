const express = require('express');
const debug = require('debug')('app');
const path = require('path');

const mf = require('./MusicFactory.js');

const app = express();
const port = process.env.PORT || 3000;

// setting view
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// routing
app.get('/init', (req, res) => {
    const songList = mf.setupSongList();
    const genreList = mf.getGenreList();
    debug(`Initialized ${songList.length} songs`);
    debug(`with ${genreList.length} genres`);
    res.status(200).json({songList, genreList});
});

app.get('/filterMusic', (req, res) => {
    let filter = new mf.Filter(
        req.query.artist,
        req.query.song,
        req.query.album,
        req.query.genre);
    const filteredList = mf.filterSongList(filter);
    debug(`Returned ${filteredList.length} songs using filter: ${JSON.stringify(filter)}`);
    res.status(200).json(filteredList);
});

app.get('/favorite', (req, res) => {
    const favoriteSong = mf.addFavorite(req.query.musicId);
    debug(`Tagged song "${favoriteSong.song}" (id: ${favoriteSong.id}) as favorite`);
    res.status(200).json(favoriteSong);
});

app.get('/unfavorite', (req, res) => {
    const favoriteSong = mf.removeFavorite(req.query.musicId);
    debug(`Removed song "${favoriteSong.song}" (id: ${favoriteSong.id}) as favorite`);
    res.status(200).json(favoriteSong);
});

app.post('/download/:musicId', (req, res) => {
    const { musicId } = req.params;
    const downloadSong = mf.downloadSong(musicId);
    debug(`Downloaded song "${downloadSong.song}" (id: ${downloadSong.id})`);
    res.status(200).send(`Download song with id: ${musicId}`);
});

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.render('index');
    res.end();
});

app.listen(port, () => {
    debug(`Listening on port ${port}`);
});