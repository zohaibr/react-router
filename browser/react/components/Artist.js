import React from 'react';

class Artist extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    console.log("IN MOUNT");

      const artists = this.props.artists;
      const artistId = this.props.routeParams.artistId;
      const selectArtist = this.props.selectAlbum;

      selectArtist(artistId);
  }

  render () {

    return (
        <div>
            <h3>ARTIST NAME</h3>
            <h4>ALBUMS</h4>
            <h4>SONGS</h4>
        </div>
    );
  }
}


export default Artist;
