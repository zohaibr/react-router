import React from 'react';
import { Link } from 'react-router'




class Albums extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {albums: {}, selectAlbum: {}};
    // }



    componentDidMount() {

    }

    render() {

        const albums = this.props.albums;

        return (
            <div>
                <h3>Albums</h3>
                <div className="row">
                    {   albums && albums ?
                            albums.map(album => (
                            <div className="col-xs-4" key={ album.id }>
                                <Link to = {`/albums/${album.id}`} className ="thumbnail" >

                                    <img src={ album.imageUrl } />
                                    <div className="caption">
                                        <h5>
                                            <span>{ album.name }</span>
                                        </h5>
                                        <small>{ album.songs.length } songs</small>
                                    </div>
                                </Link>
                            </div>
                        )) : null
                    }
                </div>
            </div>
        );
    }
}



export default Albums;
