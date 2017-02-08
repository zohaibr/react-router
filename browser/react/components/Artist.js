import React from 'react';
import Albums from '../components/Albums';
import Album from '../components/Album';
import Songs from '../components/Songs';

class Artist extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    console.log("IN MOUNT");
    console.log(this.props.routeParams.artistId);
    const selectArtist = this.props.selectArtist;
    const artistId = this.props.routeParams.artistId;
    selectArtist(artistId);

    const artists = this.props.selectedArtist;
    console.log(artists);

  }

  render () {
      console.log("this props albums");
      console.log(this.props.albums);
    return (

        <div>
            <h3>{ this.props.selectedArtist.name }</h3>

            <div>
                <Albums albums={this.props.albums}/>
            </div>

            <div>
                <h4>SONGS</h4>
                <Songs
                    songs={this.props.songs}
                    currentSong={this.props.currentSong}
                    isPlaying={this.props.isPlaying}
                    toggleOne={this.props.toggleOne}
                />

            </div>
        </div>
    );
  }
}


export default Artist;
