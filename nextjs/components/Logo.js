import React from 'react'
import Link from 'next/link'

export const Logo = (props) => {
    return (
        <>
            <Link href="">
                <a><img src="/image/Logo/Logo2.png" alt="AnimeSearcher" width={props.width} height={props.height} /></a>
            </Link>
        </>
    )
}
