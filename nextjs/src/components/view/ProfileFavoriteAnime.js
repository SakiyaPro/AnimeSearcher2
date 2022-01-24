import React from 'react';

export default function ProfileFavoriteAnime(favorite_anime) {
    return (
        <>
            {
                favorite_anime.map((anime) => {
                    return (
                        <ul className={`${styles.animeDetail}`} height="162px">
                            <li key={anime.annictId} className={`${styles.thumbnail}`} >
                                <Thumbnail src={`${anime.image}`} width="288px" height="162px" alt={animesSortByWatchers.title} />
                            </li>
                            <ul className={`${styles.textDetail}`}>
                                <li className={`${styles.title}`}>{animesSortByWatchers.title}</li>
                                <li>評価分布</li>
                            </ul>
                        </ul>
                    );
                })
            }
        </>
    );
}
