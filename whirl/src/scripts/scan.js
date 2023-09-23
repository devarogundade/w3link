import axios from 'axios'

export async function fetchTransactions(wallet, page) {
     try {
        const response = await axios.get(`https://node1.w3-link.site/api/events?extra=${wallet}&page=${page}`)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}