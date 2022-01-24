import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import MainView from "../components/view/MainView";
import { getAllAnimeData, getWatchersCountData } from "../lib/anime_data";
import styles from "../styles/Home.module.css";
import { } from "../lib/functions";
import { nowYear, nowMonth } from "../lib/variables";
import AnimeListing from "../components/view/AnimeListing";
import AnimeDetail from "../components/view/AnimeDetail";
import AnimeDetailOrListing from "../components/view/AnimeDetailOrListing"

export default function Home({ animesSortByWatchers }) {
    const [viewAnime, setViewAnime] = useState()
    useEffect(() => {
        setViewAnime(animesSortByWatchers[0])
    })
    console.log(animesSortByWatchers);

    return (
        <>
            <Head>
                <title> AnimeSearcher </title>
                <meta name="description" content="おすすめアニメを検索！" />
                <link rel="icon" href="/image/favicon/favicon.png" />
                <link
                    href="https://fonts.googleapis.com/earlyaccess/nicomoji.css"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=M+PLUS+1p"
                    rel="stylesheet"
                />
            </Head>
            <section className={`${styles.wrapper}`}>
                <div className={`${styles.viewAnime}`}>
                    <div className={`${styles.viewAnimeIntro}`}>
                        <p className={`${styles.viewAnimeTitle}`}>{viewAnime?.title}</p>
                        <img className={`${styles.viewAnimeImage}`} src={viewAnime?.image} width="800px" />
                    </div>
                    <div className={`${styles.viewAnimeDetail}`}>
                        <div className={`${styles.detailContent}`}>
                            <p className={`${styles.detailTitle}`}>放送話</p>
                            <div className={`${styles.detailInfo}`}>
                                <p>全{viewAnime?.episodesCount}話</p>
                            </div>
                        </div>
                        <div className={`${styles.detailContent}`}>
                            <p className={`${styles.detailTitle}`}>登場人物</p>
                            {
                                viewAnime?.casts.map(cast => {
                                    return (
                                        <p key={`.viewAnimeDetail-cast&${cast.annictId}`} className={`${styles.cast}`}>
                                            <span>{
                                                cast.character.map(character => {
                                                    return (
                                                        <span key={`.viewAnimeDetail&-cast-character&${cast.character.annictId}`}>{character.name}</span>
                                                    )
                                                })
                                            }</span>
                                            <span className={`${styles.castName}`} >CV:{cast.name}</span>
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <div className={`${styles.detailContent}`}>
                            <p className={`${styles.detailTitle}`}>放送時期</p>
                            <p>
                                {viewAnime?.seasonYear}年
                                {viewAnime?.seasonName === "SPRING" && "春"}
                                {viewAnime?.seasonName === "SUMMER" && "夏"}
                                {viewAnime?.seasonName === "AUTUMN" && "秋"}
                                {viewAnime?.seasonName === "WINTER" && "冬"}
                            </p>
                        </div>
                    </div>
                </div>
                <aside className={`${styles.asideContent}`}>
                    {
                        animesSortByWatchers.slice(1, 10).map(anime => {
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
                </aside>
            </section>
        </>
    );
};

export async function getStaticProps() {
    const animesSortByWatchers = await getWatchersCountData(6000);
    return {
        props: { animesSortByWatchers },
        revalidate: 3,
    };
}
