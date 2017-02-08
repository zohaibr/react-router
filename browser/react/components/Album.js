import React from 'react';
import Songs from '../components/Songs';



class Album extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
      const album = this.props.album;
      const currentSong = this.props.currentSong;
      const isPlaying = this.props.isPlaying;
      const toggleOne = this.props.toggleOne;
      const albumId = this.props.routeParams.albumId;
      const selectAlbum = this.props.selectAlbum;

      selectAlbum(albumId);
  }

  render () {
    return(
        <div className="album">
          <div>
            <h3>{ this.props.album.name }</h3>
            <img src={ this.props.album.imageUrl } className="img-thumbnail" />
          </div>
          <Songs
            songs={this.props.album.songs}
            currentSong={this.props.currentSong}
            isPlaying={this.props.isPlaying}
            toggleOne={this.props.toggleOne} />
        </div>
    )
  }
}


export default Album;
