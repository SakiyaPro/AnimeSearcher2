import { useRouter } from "next/router";
import { useEffect } from 'react'
import Cookies from "js-cookie";

export default function Auth({ children }) {
    //router
    const router = useRouter();

    //Cookieのチェック（JWT認証）
    const access_token = Cookies.get("access_token");
    //access_tokenがtrueじゃなければ/loginへ
    useEffect(() => {
        if (!access_token) {
            router.replace("/login");
        }
    }, [])

    //何もなければ次へ（そのまま処理）
    return children;
}
