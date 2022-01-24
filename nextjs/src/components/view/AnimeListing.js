import React, { useState } from "react";
import styles from "../../styles/components-css/AnimeListing.module.css";

export default function AnimeListing({ animeData }) {
    const animeList = animeData;

    const baseIndex = 10;
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
            <div className={`${styles.wrapper}`}>
                <button type="button" onClick={() => beforeClick()}>
                    前へ
                </button>
                <ul className={`${styles.baseFont} ${styles.listWrapper}`}>
                    {animeList.slice(index - 10, index).map((animesSortByWatchers) => {
                        return (
                            <li
                                key={animesSortByWatchers.annictId}
                                className={`${styles.listWrapperItems}`}
                            >
                                {animesSortByWatchers.title}
                                {animesSortByWatchers.watchersCount}
                            </li>
                        );
                    })}
                </ul>
                <button type="button" onClick={() => nextClick()}>
                    次へ
                </button>
            </div>
        </>
    );
}
