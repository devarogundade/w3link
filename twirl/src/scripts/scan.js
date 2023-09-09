import axios from 'axios'

export async function fetchTransactions(wallet, page) {
     try {
        const response = await axios.get(`https://node.w3-link.site/api/messages?from=${wallet}&page=${page}`)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}