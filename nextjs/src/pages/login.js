import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from 'axios'
import styles from "../styles/login.module.css"

export default function Login(props) {

    const router = useRouter();

    // ログイン処理関数
    const login = async formEvent => {
        formEvent.preventDefault()
        const res_token = await axios.post(
            'http://192.168.0.13:8000/dj-rest-auth/login/',
            {
                email: formEvent.target.email.value,
                password: formEvent.target.password.value
            }
        )
        console.log(res_token);
        const access_token = res_token.data.access_token
        Cookies.set("access_token", access_token);
        console.log(access_token);
        router.replace("/account/private");
    }

    return (
        <>
            <h1>Login</h1>
            <div className={`${styles.login}`}>
                <h2 className={`${styles.active}`}>login</h2>
                <h2 className={`${styles.nonactive}`}>sign up</h2>

                <form className={`${styles.loginform}`} onSubmit={login}>
                    <input id="email" type="email" className={`${styles.text}`} />
                    <span>e-mail</span>
                    <br />
                    <br />

                    <input id="password" type="password" className={`${styles.text}`} ></input>
                    <span>password</span>
                    <br />

                    <input type="checkbox" id="checkbox-1-1" className={`${styles.customCheckbox}`} />
                    <label htmlFor="checkbox-1-1">Keep me Signed in</label>

                    <button className={`${styles.signin}`}>
                        Sign In
                    </button>

                    <hr />

                    <a href="#">Forgot Password?</a>

                </form>
            </div>
            <div>
                <Link href="/"><a>Homeへ</a></Link>
            </div>
        </>
    );
}
