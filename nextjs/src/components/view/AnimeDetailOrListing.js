import React, { useState } from 'react'
import AnimeDetail from './AnimeDetail';
import AnimeListing from './AnimeListing';

export default function AnimeDetailOrListing({ animeData }) {
    const [Listing, setListing] = useState(false);

    return (
        <>
            {Listing ?
                <button onClick={() => setListing(false)}>
                    <img src="/image/systemIcon/list.png" width="40px" />
                </button> :
                <button onClick={() => setListing(true)}>
                    <img src="/image/systemIcon/list.png" width="40px" />
                </button>
            }
            {Listing ?
                <AnimeListing animeData={animeData} /> :
                <AnimeDetail animeData={animeData} />
            }
        </>
    )
}
