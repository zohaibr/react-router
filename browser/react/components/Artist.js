import React from 'react';
import Albums from '../components/Albums';
import Album from '../components/Album';
import Songs from '../components/Songs';

class Artist extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    const selectArtist = this.props.selectArtist;
    const artistId = this.props.routeParams.artistId;
    selectArtist(artistId);

    const artists = this.props.selectedArtist;

  }

  render () {
      // console.log("in artist render ->>>>>>>");
      // console.log(this.props.toggle);
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
                    toggleOne={this.props.toggle}
                />

            </div>
        </div>
    );
  }
}


export default Artist;
