import React, { } from 'react';
import styles from '../../styles/anime_search.module.css'
import { useState, useEffect, useGlobal, useRef } from 'reactn';
import axios from 'axios'

export default function Search() {
    // animeData 取得
    const [animeData, setAnimeData] = useGlobal('animeData');
    const [scrollTop, setScrollTop] = useState();
    const [scrolling, setScrolling] = useState();

    useEffect(async () => {
        const res = await axios.get('http://192.168.0.11:8000/api/animedata/?format=json&limit=68&watchersCount_gte=6500')
        const data = await res.data.results
        setAnimeData(data)
    }, [])
    console.log(animeData);
    console.log(Object.values(animeData));

    // scroll 監視
    const overflowElement = useRef(null)
    const els = useRef([])
    const data = [...Array(100).keys()]
    data.forEach((_, i) => {
        els.current[i] = React.createRef()
    });
    for (let i = 0; i < els.current.length; i++) {
        if (els.current[i].current === null) {
            const elsSlice = els.current.slice(0, i)
            console.log(elsSlice);
            break
        }
    }

    const imgWidth = 400
    const animeContentHeight = imgWidth/16*9 + 13  // imgの高さ + margin-top
    useEffect(() => {
        const onScroll = (e) => {
            setScrollTop(e.target.scrollTop);
            setScrolling(e.target.scrollTop > scrollTop);
        };
        // スクロールされる度、onScroll関数を起動
        overflowElement.current.addEventListener("scroll", onScroll);
        let scrollingAmount = Math.floor(scrollTop / animeContentHeight);  // スクロール量
        if (Number.isNaN(scrollingAmount)) {
            scrollingAmount = 0
        }
        console.log(scrollingAmount);
        if (scrollingAmount > 0) {
            elsSlice.current[scrollingAmount - 1].current.classList.remove("trueScrollView")
        }
        elsSlice.current[scrollingAmount].current.classList.add("trueScrollView")
        console.log(scrollTop);
        console.log(scrolling);
        return () => overflowElement.current.removeEventListener("scroll", onScroll);
    }, [scrollTop]);
    useEffect(() => {
        console.log(scrolling);
    }, [scrolling]);

    return (
        <div ref={overflowElement} className={`${styles.asideContent}`}>
            {
                Object.values(animeData)?.map((anime, i) => {
                    return (
                        <div ref={els.current[i]} key={i} className={`${styles.sideViewAnime}`} >
                            <img src={anime.image} width={imgWidth} />
                        </div>
                    )
                })
            }
        </div>
    );
}
