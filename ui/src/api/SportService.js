import $api from "."

export default class SportService {
    static async getAll() {
        const res = await $api.get('/sports')
        return res.data.map(s => ({...s, id: s.sport_id}))
    }

    static async createSport(sport_name) {
        const body = {sport_name}
        const res = await $api.post('/sport', body)
        return res.data
    }

    static async deleteSport(id) {
        const res = await $api.delete('/sport/' + id)
        return res.data
    }

    static async updateSport(sport_id, sport_name) {
        const body = {sport_id, sport_name}
        const res = await $api.put('/sport', body)
        return res.data
    }
}