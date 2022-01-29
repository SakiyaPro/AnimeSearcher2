import React, {} from 'react';
import styles from '../../styles/anime_search.module.css'
import { useEffect, useGlobal } from 'reactn';
import axios from 'axios'

export default function Search() {
    const [animeData, setAnimeData] = useGlobal(
        useEffect(async () => {
            const res = await fetch(new URL(`http://192.168.0.13:8000/api/animedata/?format=json&limit=68&watchersCount_gte=6000`));
            const data = await (await res.json()).results;
            return data
        })
    );
    console.log(animeData);


    return (
        <>
            <section className={`${styles.wrapper}`}>
                {/* <aside className={`${styles.asideContent}`}>
                    <h2>恋愛</h2>
                    {
                        animeData && this.forEach(element => {
                            element.map(anime => {
                                return (
                                    <div key={`.sideViewAnime-anime-${anime.annictId}`} className={`${styles.sideViewAnime}`}>
                                        <img src={anime.image} width="200px" />
                                        <div className={`${styles.sideViewAnimeDetail}`}>
                                            <p>{anime.title}</p>
                                            <p>［ジャンル］</p>
                                            <p>［評価］</p>
                                        </div>
                                    </div>
                                )
                            })
                        })}
                </aside> */}
            </section>
        </>
    );
}
