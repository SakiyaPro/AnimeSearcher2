import React from "react";
import Link from "next/link";
import { Logo } from "../item/Logo";
import styles from "../../styles/layout.module.css";

export default function Layout(props) {
    return (
        <div>
            <header>
                <h1 className={`${styles.siteLogo}`}>
                    <Logo width="140px" height="auto" />
                </h1>
                <ul className={`${styles.flexItems}`}>
                    <li>
                        <form method="get" action="#" className={`${styles.searchForm}`}>
                            <input className={`${styles.searchBar}`} type="text" size="25" placeholder=" アニメを検索" />
                            <button className={`${styles.searchButton}`} type="submit"><img src="/image/systemIcon/search(white).png" width="20px" /></button>
                        </form>
                    </li>
                    <ul className={`${styles.headerContents}`}>
                        <li>
                            <Link href="/">
                                <a className={`${styles.item}`}>
                                    <img src="/image/systemIcon/home.png" width="30px" />
                                    Home
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className={`${styles.item}`}>
                                    <img src="/image/systemIcon/news_icon.png" width="30px" />
                                    News
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className={`${styles.item}`}>
                                    <img src="/image/systemIcon/ranking_icon.png" width="30px" />
                                    Ranking
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className={`${styles.item}`}>
                                    <img src="/image/systemIcon/review_icon.png" width="30px" />
                                    Review
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/private">
                                <a className={`${styles.item}`}>
                                    <img src="/image/systemIcon/login_icon.png" width="30px" />
                                    Login
                                </a>
                            </Link>
                        </li>
                    </ul>
                </ul>
            </header>
            <main> {props.children} </main>
        </div>
    );
}
