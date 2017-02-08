import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, skip, convertSong, convertSongs } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)));

    this.selectAllArtist();

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad (albums) {
    // console.log(albums);
    this.setState({
      albums: albums

    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {

    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    convertSong(selectedSong);

    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectArtist(artistId) {
    //Get all artist albums
    axios.get(`/api/artists/${artistId}/albums`)
        .then(res => res.data)
        .then(albums => {
          this.setState({albums: convertAlbums(albums)})
        }).catch((err) => console.log(err))

    //get artist id
    axios.get(`/api/artists/${artistId}`)
    .then(res => res.data)
    .then(artist => {
      this.setState({
        selectedArtist: artist
      });
    }).catch((err) => console.log(err))

    //get all artist songs
    axios.get(`/api/artists/${artistId}/songs`)
        .then(res => res.data)
        .then(songs => {
          this.setState({
            songs: convertSong(songs)
          });
        }).catch((err) => console.log(err))
  }

  selectAllArtist() {
    axios.get('/api/artists')
    .then(res => res.data)
    .then(artist => {
      this.setState({
        artist: artist
      });
    });
  }


  selectAllArtistSongs() {
    axios.get('/api/artists/:artistId/songs')
    .then(res => res.data)
    .then(artistSongs => {
      this.setState({
        songs: artistSongs
      });
    });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => {
          this.setState({
          selectedAlbum: convertAlbum(album)
        });

      });
  }

  deselectAlbum () {
    this.setState({ selectedAlbum: {}});
  }

  render () {
    // console.log("in render state of app container -------------->");
    // console.log(this.toggleOne);

    //console.log(this.state.selectedAlbum);



    return (

      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">


        {
          this.props.children ?
           React.cloneElement(this.props.children, {

      // Album (singular) component's props
          album: this.state.selectedAlbum,
          currentSong: this.state.currentSong,
          isPlaying: this.state.isPlaying,
          toggle: this.toggleOne,
          songs: this.state.songs, //also used for artists

          // Albums (plural) component's props
          albums: this.state.albums,
          selectAlbum: this.selectAlbum, // note that this.selectAlbum is a method, and this.state.selectedAlbum is the chosen album

          //Artists props passed down
          artists: this.state.artist,
          selectedArtist: this.state.selectedArtist,
          selectArtist: this.selectArtist,
          selectAllArtist: this.selectAllArtist,
           })
           : null
        }

        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
