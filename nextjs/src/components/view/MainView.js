import React, { useState } from 'react'
import Thumbnail from '../item/Thumbnail'
import styles from '../../styles/components-css/MainVIew.module.css'

export default function MainView({ oneAnimeData }) {
    const castsPerson = oneAnimeData.casts.map(
        cast => cast.person.name
    )
    const castsCharacter = oneAnimeData.casts.map(
        (cast) => {
            return (
                cast.character.name
            )
        }
    )

    return (
        <div className={`${styles.mainView}`}>
            <Thumbnail src={oneAnimeData.image} width="1280px" height="720px" />
            <h3>{oneAnimeData.title}</h3>
            <ul>
                <li>声優陣</li>
                <ul>{castsPerson.map((castPerson) => {
                    return (
                        <li>{castPerson}</li>
                    )
                })
                }
                </ul>
            </ul>
        </div>
    )
}
