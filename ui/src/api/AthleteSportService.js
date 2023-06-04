import $api from "."

export default class AthleteSportService {
    static async getAll() {
        const res = await $api.get('/athlete-sport')
        return res.data
    }

    static async createAthleteSport(athlete_id, sport_id, athlete_rank) {
        const body = {athlete_id, sport_id, athlete_rank}
        const res = await $api.post('/athlete-sport', body)
        return res.data
    }

    static async deleteAthleteSport(id) {
        const res = await $api.delete('/athlete-sport/' + id)
        return res.data
    }

    static async updateAthleteSport(id, athlete_id, sport_id, athlete_rank) {
        const body = {id, athlete_id, sport_id, athlete_rank}
        const res = await $api.put('/athlete-sport', body)
        return res.data
    }
}