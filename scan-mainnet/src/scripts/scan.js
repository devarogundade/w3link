import axios from 'axios'

export async function fetchTransactions(page = 1) {
     try {
        const response = await axios.get(`https://node1-mainnet.w3-link.site/api/events?page=${page}`)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function fetchTransaction(hash) {
    try {
       const response = await axios.get(`https://node1-mainnet.w3-link.site/api/events/${hash}`)
       return response.data
   } catch (error) {
       console.error(error)
       return []
   }
}

export function fineHash(hash) {
    return hash.substring(0, 20) + '...'
}

export function fineId(id) {
    return id.substring(0, 7) + '...' + id.substring(id.length - 2, id.length)
}