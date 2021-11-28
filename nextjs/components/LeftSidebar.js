import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/components-css/LeftSidebar.module.css'
import { Logo } from './Logo'

export const LeftSidebar = () => {
    let sideWidth = "25px"
    let sideHeight = "25px"
    return (
        <div class={styles.sidebar}>
            <div class={styles.flexColumn}>
                <ul class={styles.flexColumn, styles.wrapper}>
                    <li><h2>
                        <Link href="">
                            <a><Image src="/image/systemIcon/home.png" alt="ホーム" width={sideWidth} height={sideHeight} /><span>ホーム</span></a>
                        </Link>
                    </h2></li>
                    <li><h2>
                        <Link href="">
                            <a><Image src="/image/systemIcon/search.png" alt="アニメ検索" width={sideWidth} height={sideHeight} /><span>アニメ検索</span></a>
                        </Link>
                    </h2></li>
                    <li><h2>
                        <Link href="">
                            <a><Image src="/image/systemIcon/alert-off.png" alt="今日の話題" width={sideWidth} height={sideHeight} /><span>今日の話題</span></a>
                        </Link>
                    </h2></li>
                    <li><h2>
                        <Link href="">
                            <a><Image src="/image/systemIcon/review.png" alt="レビュー投稿" width={sideWidth} height={sideHeight} /><span>レビュー投稿</span></a>
                        </Link>
                    </h2></li>
                    <li><h2>
                        <Link href="">
                            <a><Image src="/image/systemIcon/profile.png" alt="プロフィール" width={sideWidth} height={sideHeight} /><span>プロフィール</span></a>
                        </Link>
                    </h2></li>
                </ul>
            </div>
        </div>
    )
}
