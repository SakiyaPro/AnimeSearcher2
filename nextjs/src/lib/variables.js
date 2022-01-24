import { getSeason } from './functions'

const nowYear = new Date().getFullYear()  // 今年の西暦
const month = new Date().getMonth() + 1
const nowSeason = getSeason(month)  // 今シーズン
