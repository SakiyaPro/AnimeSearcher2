import React from 'react'
import Link from 'next/link'

export const LogoDark = (props) => {
    return (
        <>
            <Link href="/">
                <a><img src="/image/Logo/AnimeSearcher_logo(Dark).png" alt="AnimeSearcher" width={props.width} height={props.height}/></a>
            </Link>
        </>
    )
}
