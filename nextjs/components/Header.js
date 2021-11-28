import React from 'react'
import Link from 'next/dist/client/link'
import Image from 'next/dist/client/image'
import styles from '../styles/components-css/Header.module.css'
import { Logo } from './Logo'


export const Header = () => {
    let sideWidth = "25px"
    let sideHeight = "25px"
    return (
        <div>
            <ul class={styles.wrapper}>
                <li><Logo width="auto" height="80px" /></li>
                <li><Link href=""><a><Image src="/image/systemIcon/home.png" alt="ホーム" width={sideWidth} height={sideHeight} /><span>ホーム</span></a></Link></li>
                <li><Link href=""><a><Image src="/image/systemIcon/search.png" alt="アニメ検索" width={sideWidth} height={sideHeight} /><span>さがす</span></a></Link></li>
                <li><Link href=""><a><Image src="/image/systemIcon/review.png" alt="レビュー投稿" width={sideWidth} height={sideHeight} /><span>レビュー</span></a></Link></li>
                <li><Link href=""><a><Image src="/image/systemIcon/profile.png" alt="プロフィール" width={sideWidth} height={sideHeight} /><span>プロフィール</span></a></Link></li>
            </ul>
        </div>
    )
}
