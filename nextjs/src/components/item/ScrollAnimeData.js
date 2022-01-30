import React from 'react';
import { useGlobal } from 'reactn';

export default function ScrollAnimeData() {
    const [animeData, setAnimeData] = useGlobal('animeData')
    

    return (
        <div>
            {
                Object.values(animeData)?.map(anime => {
                    return (
                        <div key={`.sideViewAnime-anime-${anime.annictId}`} className={`${styles.sideViewAnime}`}>
                            <img src={anime.image} width="300px" />
                            <div className={`${styles.sideViewAnimeDetail}`}>
                                <p>{anime.title}</p>
                                <p>［ジャンル］</p>
                                <p>［評価］</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}
