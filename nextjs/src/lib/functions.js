// 時期(月)からシーズンを取得する
export const getSeason = (month) => {
    let result = ""
    if (1 <= month <= 3) {
        result = "WINTER"
    } else if (4 <= month <= 6) {
        result = "SPRING"
    } else if (7 <= month <= 9) {
        result = "SUMMER"
    } else {
        result = "AUTUMN"
    }
    return result
}
