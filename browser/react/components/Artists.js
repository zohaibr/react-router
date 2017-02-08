/**
 * Created by CharlieShi on 2/8/17.
 */

import React from 'react';
import {Link} from 'react-router';

class Artists extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const artists = this.props.artists;
        console.log(artists);
        return (
            <div>
                <h3>Artists</h3>
                <div className="list-group">
                    { artists && artists ?
                        this.props.artists.map(artist => {
                            return (
                                <div className="list-group-item" key={artist.id}>
                                    <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
                                </div>
                            );
                        }) : null }
                </div>
            </div>
        );




    }






}


export default Artists;
