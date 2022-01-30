import React, { } from "react";
import Head from "next/head";
import Link from "next/link";
import { getAllAnimeData, getWatchersCountData } from "../lib/anime_data";
import styles from "../styles/Home.module.css";
import { Logo } from "../components/item/Logo";
import { useState, useEffect, useGlobal, useRef } from 'reactn';
import axios from 'axios'

export default function Home() {

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
            <div className={`${styles.indexBackground}`}>
                <div className={`${styles.siteLogoWrapper}`}>
                    <Logo width="500px" />
                </div>
                <div className={`${styles.greeting}`}>
                    <p>
                        アニメ探すなら <span style={{ color: "red" }} >A</span><span style={{ color: "yellow" }}>nime</span><span style={{ color: "red" }}>S</span><span style={{ color: "blue" }}>earcher</span> !!
                    </p>
                </div>
                <div className={`${styles.guidance}`}>
                    <ul className={`${styles.guidanceContents}`}>
                        <li className={`${styles.content}`}>
                            <Link href="/">
                                <a>
                                    <img src="/image/systemIcon/news_icon.png" width="100px" />
                                    <p>ニュース</p>
                                </a>
                            </Link>
                        </li>
                        <li className={`${styles.content}`}>
                            <Link href="/">
                                <a>
                                    <img src="/image/systemIcon/ranking_icon.png" width="100px" />
                                    <p>ランキング</p>
                                </a>
                            </Link>
                        </li>
                        <li className={`${styles.content}`} >
                            <Link href="/">
                                <a>
                                    <img src="/image/systemIcon/review_icon.png" width="100px" />
                                    <p>レビュー</p>
                                </a>
                            </Link>
                        </li>
                        <li className={`${styles.content}`}>
                            <Link href="/account/private">
                                <a>
                                    <img src="/image/systemIcon/login_icon.png" width="100px" />
                                    <p>ログイン</p>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div >
        </>
    );
};
