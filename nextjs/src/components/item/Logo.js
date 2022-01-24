import React from 'react'
import Link from 'next/link'

export const Logo = (props) => {
    return (
        <>
            <Link href="/">
                <a><img src="/image/Logo/AnimeSearcher_logo(colorful).png" alt="AnimeSearcher" width={props.width} height={props.height}/></a>
            </Link>
        </>
    )
}
