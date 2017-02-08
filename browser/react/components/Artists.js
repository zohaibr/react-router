/**
 * Created by CharlieShi on 2/8/17.
 */

import React from 'react';

class Artists extends React.Component {
    constructor() {
        props();
    }


    render() {
        return (
            <div>
                <h3>Artists</h3>
                <div className="list-group">
                    {
                        this.props.artists.map(artist => {
                            return (
                                <div className="list-group-item" key={artist.id}>
                                    <Link to={/**tbd!**/}>{ artist.name }</Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )




    }






}


export default Artists;