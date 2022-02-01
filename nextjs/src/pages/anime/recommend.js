import styles from '../../styles/anime_recommend.module.css'
import React, { useState } from 'reactn';
import axios from 'axios'
import { Link as Scroll } from 'react-scroll';

export default function Recommend(watchersData) {
    // animeData 取得
    const [watchersStateData, setWatchersStateData] = useState(Object.values(watchersData)[0])
    const [watchersCount_gte, setwatchersCount_gte] = useState(6000)
    const [watchersCount_lte, setwatchersCount_lte] = useState(7000)

    const getWatchersData = async () => {
        const data = await (await axios.get(
            `http://host.docker.internal:8000/api/animedata/?format=json&limit=21&watchersCount_lte=${watchersCount_lte}&watchersCount_gte=${watchersCount_gte}`)
        ).data.results
        setWatchersStateData(Object.values(data))
    }

    return (
        <div className={`${styles.recommendContents}`}>
            <aside className={`${styles.recommendSort}`}>
                <p>おすすめ絞り込み</p>
                <nav>
                    <ul className={`${styles.scrollItems}`}>
                        <li><Scroll className={`${styles.watchers}`} to="watchers" smooth={true}>視聴者数　</Scroll></li>
                        <li><Scroll className={`${styles.genre}`} to="genre" smooth={true}>ジャンル　</Scroll></li>
                        <li><Scroll className={`${styles.value}`} to="value" smooth={true}>みんなの評価　</Scroll></li>
                        <li><Scroll className={`${styles.japanese_order}`} to="japanese_order" smooth={true}>あいうえお　</Scroll></li>
                    </ul>
                </nav>
            </aside>
            <div id="watchers" className={`${styles.recommendContent}`}>
                <div className={`${styles.recommendContentTitleWrapper}`}>
                    <h2 className={`${styles.recommendContentTitle}`}>視聴者数</h2>
                    <div className={`${styles.selectFlex}`}>
                        <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                            <select name="watchersCount_gte" onChange={(e) => setwatchersCount_gte(e.target.value)}>
                                <option value="" hidden>6000</option>
                                <option value="0">0</option>
                                <option value="1000">1000</option>
                                <option value="2000">2000</option>
                                <option value="3000">3000</option>
                                <option value="4000">4000</option>
                                <option value="5000">5000</option>
                                <option value="6000">6000</option>
                                <option value="7000">7000</option>
                                <option value="8000">8000</option>
                                <option value="9000">9000</option>
                            </select>
                        </div>
                        <span>人以上</span>
                    </div>
                    <div className={`${styles.selectFlex}`}>
                        <div className={`${styles.cp_ipselect} ${styles.cp_sl03}`}>
                            <select name="watchersCount_lte" onChange={(e) => setwatchersCount_lte(e.target.value)}>
                                <option value="" hidden>7000</option>
                                <option value="1000">1000</option>
                                <option value="2000">2000</option>
                                <option value="3000">3000</option>
                                <option value="4000">4000</option>
                                <option value="5000">5000</option>
                                <option value="6000">6000</option>
                                <option value="7000">7000</option>
                                <option value="8000">8000</option>
                                <option value="9000">9000</option>
                                <option value="10000">10000</option>
                            </select>
                        </div>
                        <span>人以下</span>
                    </div>
                    <div className={`${styles.reload_icon}`} >
                        <button onClick={getWatchersData}><img src="/image/systemIcon/reload.png" width="18px" /></button>
                    </div>
                </div>
                <div className={`${styles.viewAnimeWrapper}`} >
                    {
                        watchersStateData.map((anime, i) => {
                            return (
                                <div key={i} className={`${styles.viewAnime}`} >
                                    <img src={anime.image} width={195} />
                                    <div className={`${styles.viewAnimeGround}`}>
                                        <h3>{anime.title}</h3>
                                        <p>評価</p>
                                        <p>ジャンル</p>
                                        <p>視聴者数 {anime.watchersCount} 人</p>
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
    const watchersData = await (await axios.get(`${SERVERURL}api/animedata/?format=json&limit=21&watchersCount_lte=7000&watchersCount_gte=6000`)).data.results;

    return {
        props: { watchersData },
    }
}
