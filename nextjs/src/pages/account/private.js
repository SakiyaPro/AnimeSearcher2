import React, { useState, useEffect } from "react";
import Link from "next/link";
import Moveable from 'react-moveable';
import { useRouter } from "next/router";
import axios from 'axios';
import Cookies from "js-cookie";
import Auth from "../../components/auth/Auth";
import styles from "../../styles/private.module.css";

export default function Private({ user_profile }) {
    const router = useRouter();
    const [profile, setProfile] = useState()
    useEffect(() => {
        axios.get(
            `http://192.168.0.13:8000/users/profile/`, {
            headers: {
                Authorization: `JWT ${Cookies.get("access_token")}`,
            }
        }).then(res => {
            setProfile(res.data.results[0])
        })
    }, [])

    const username = profile?.user.username
    const email = profile?.user.email
    const user_icon = profile?.user_icon
    const favorite_anime = profile?.favorite_anime
    console.log(favorite_anime);
    const targetImg = user_icon && document.getElementById('user_icon')
    console.log(targetImg);
    const width = targetImg?.width

    //ログアウト処理
    const logout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("username");
        Cookies.remove("user_icon");
        router.replace("/login");
    }

    return (
        <Auth>
            <div>
                {/* <h1>Private</h1>
                <button onClick={logout}>ログアウト</button> */}
                <div className={`${styles.outerWrapper}`}>
                    <div className={`${styles.innerWrapper}`}>
                        <div className={`${styles.intro}`}>
                            <img id="user_icon" className={`${styles.user_icon}`} src={user_icon} width="200px" height="200px" />
                            <div>
                                <p className={`${styles.username}`}>{username}</p>
                                <p className={`${styles.selfIntro}`}></p>
                            </div>
                        </div>
                        <div className={`${styles.contentWrapper}`}>
                            <ul className={`${styles.articleTitleWrapper}`}>
                                <li><button><img src="/image/systemIcon/favorite.png" width="30px" /></button></li>
                                <li><button><img src="/image/systemIcon/review_icon.png" width="30px" /></button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <Link href="/"><a>Homeへ</a></Link> */}
            </div>
        </Auth>
    );
}
