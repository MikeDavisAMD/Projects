export const formatTimeAgo = (date) => {
    const postedAt = new Date(date)
    const todayDate = new Date()
    const diffs = todayDate - postedAt

    const seconds = Math.floor(diffs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 365)

    if (seconds < 60) return `${seconds}sec`
    if (minutes < 60) return `${minutes}min`
    if (hours < 24) return `${hours}hr`
    if (days < 30) return `${days}d`
    if (months < 12) return `${months}m`
    return `${years}y`
}