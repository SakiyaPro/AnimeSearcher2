import React from 'react'
import styles from '../styles/components-css/Thumbnail.module.css'

export const Thumbnail = (props) => {
    return (
        <div class={styles.background}>
            <img class={styles.thumbnail} src={props.src} alt={props.alt} width="98%" height="70%" />
            <ul>
                <li class={styles.text}><button>{props.title}</button></li>
            </ul>
        </div>
    )
}
