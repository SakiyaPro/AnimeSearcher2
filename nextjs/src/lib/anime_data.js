import fetch from "node-fetch";
import axios from 'axios';


// Django APIサーバーURL
const SERVERURL = "http://host.docker.internal:8000/";

// 全アニメデータを取得
export async function getAllAnimeData() {
    const QUERY = await "?format=json&limit=60&offset=60"
    const res = await fetch(new URL(`${SERVERURL}api/animedata/${QUERY}`));
    const animes = await res.json()
    return animes;
}

// 視聴者数でソート gte => 〇〇以上
export async function getWatchersCountData(watchersCount) {
    const QUERY = `?format=json&limit=68&watchersCount_gte=${watchersCount}`
    const res = await (await axios.get(`${SERVERURL}api/animedata/?format=json&limit=68&watchersCount_gte=${QUERY}`)).data.results;
    return res;
}

// 今シーズンのアニメをソート
export async function getSeasonAnimeData(year, season) {
    const QUERY = `?format=json&seasonName=${season}&seasonYear=${year}`
    const res = await fetch(new URL(`${SERVERURL}api/animedata/${QUERY}`));
    const animes = (await res.json()).results;
    return animes;
}

// 投稿詳細を取得
export async function getAnimeData(id) {
    const res = await fetch(new URL(`${SERVERURL}api/animedata/${id}/`));
    const anime = (await res.json()).results;
    return anime;
}
