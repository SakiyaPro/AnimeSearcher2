import styles from '../../styles/anime_recommend.module.css'
import React, { useEffect, useGlobal } from 'reactn';
import axios from 'axios'
import { Link as Scroll } from 'react-scroll';

export default function Recommend(watchersData) {
    // animeData 取得
    const [animeData, setAnimeData] = useGlobal('animeData');

    useEffect(() => {
        setAnimeData(watchersData)
    }, [])



    return (
        <div className={`${styles.recommendContents}`}>
            <aside className={`${styles.recommendSort}`}>
                <p>Recommend Sort</p>
                <nav>
                    <ul className={`${styles.scrollItems}`}>
                        <li><Scroll to="watchers" smooth={true}>視聴者数</Scroll></li>
                        <li><Scroll to="genre" smooth={true}>ジャンル</Scroll></li>
                        <li><Scroll to="value" smooth={true}>みんなの評価</Scroll></li>
                        <li><Scroll to="japanese-order" smooth={true}>あいうえお</Scroll></li>
                    </ul>
                </nav>
            </aside>
            <div id="watchers" className={`${styles.recommendContent}`}>
                <h2 className={`${styles.recommendContentTitle}`}>視聴者数6000人以上!!</h2>
                <div className={`${styles.viewAnimeWrapper}`} >
                    {
                        animeData.watchersData?.map((anime, i) => {
                            return (
                                <div key={i} className={`${styles.viewAnime}`} >
                                    <img src={anime.image} width={195} />
                                    <div className={`${styles.viewAnimeGround}`}>
                                        <h3>{anime.title}</h3>
                                        <p>評価</p>
                                        <p>ジャンル</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const SERVERURL = "http://host.docker.internal:8000/";
    const watchersData = await (await axios.get(`${SERVERURL}api/animedata/?format=json&limit=42&watchersCount_gte=6000`)).data.results;

    return {
        props: { watchersData },
    }
}
