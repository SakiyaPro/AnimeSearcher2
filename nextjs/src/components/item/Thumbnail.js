import React, { useState } from 'react'
import styles from '../../styles/components-css/Thumbnail.module.css'

export default function Thumbnail({ src, alt, width, height }) {
    return (
        <>
            <img className={`${styles.thumbnail}`} src={src} alt={alt} width={width} height={height} />
        </>
    )
}
