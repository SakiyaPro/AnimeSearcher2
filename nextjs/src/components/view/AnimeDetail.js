import React, { useState } from "react";
import Thumbnail from "../item/Thumbnail";
import styles from "../../styles/components-css/AnimeDetail.module.css";

export default function AnimeDetail({ animeData }) {
    const animeList = animeData;
    console.log(animeList);

    const baseIndex = 4;
    const animeListIndex = animeList.length;
    const [index, setIndex] = useState(baseIndex);
    const nextClick = () => {
        const nextIndex = index + baseIndex;
        if (nextIndex >= animeListIndex + baseIndex) {
            setIndex(baseIndex);
        } else {
            setIndex(nextIndex);
        }
    };
    const beforeClick = () => {
        const beforeIndex = index - baseIndex;
        if (beforeIndex <= 0) {
            const changeIndex = Math.ceil(animeListIndex / 10) * 10;
            setIndex(changeIndex);
        } else {
            setIndex(beforeIndex);
        }
    };

    return (
        <>
            <ul className={`${styles.baseFont} ${styles.listWrapper}`}>
                <li>
                    <button className={`${styles.btnCircle} btn`} onClick={() => beforeClick()}>
                        <i className={`${styles.fas}`}><img src="image/systemIcon/矢印アイコン(左).png" width="40px" height="auto" /></i>
                    </button>
                </li>

                <ul className={`${styles.thumbnailWrapper}`}>
                    {animeList.slice(index - baseIndex, index).map((animesSortByWatchers) => {
                        return (
                            <ul className={`${styles.animeDetail}`} height="162px">
                                <li key={animesSortByWatchers.annictId} className={`${styles.thumbnail}`} >
                                    <Thumbnail src={`${animesSortByWatchers.image}`} width="288px" height="162px" alt={animesSortByWatchers.title} />
                                </li>
                                <ul className={`${styles.textDetail}`}>
                                    <li className={`${styles.title}`}>{animesSortByWatchers.title}</li>
                                    <li>評価分布</li>
                                </ul>
                            </ul>
                        );
                    })}
                </ul>
                <li>
                    <button className={`${styles.btnCircle} btn`} onClick={() => nextClick()}>
                        <i className={`${styles.fas}`}><img src="/image/systemIcon/矢印アイコン(右).png" width="40px" height="auto" /></i>
                    </button>
                </li>
            </ul>
        </>
    )
}
