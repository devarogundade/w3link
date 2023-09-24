import axios from 'axios'

export async function fetchTransactions(wallet, page) {
     try {
        const extra = `${wallet}5faf71002bda061c523adb0d`.toLowerCase()
        const response = await axios.get(`http://localhost:8081/api/events?extra=${extra}&page=${page}`)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}