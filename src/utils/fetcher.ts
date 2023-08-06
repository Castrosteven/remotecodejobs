
const fetcher = (url: string, queryParams = '') => fetch(`${url}${queryParams}`).then(res => res.json())

export default fetcher