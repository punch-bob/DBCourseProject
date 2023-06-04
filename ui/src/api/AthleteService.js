import $api from "."

export default class AthleteService {
    static async getAll() {
        const res = await $api.get('/athletes')
        return res.data.map(a => ({...a, id: a.athlete_id}))
    }

    static async createAthlete(first_name, last_name) {
        const body = {first_name, last_name}
        const res = await $api.post('/athlete', body)
        return res.data
    }

    static async deleteAthlete(id) {
        const res = await $api.delete('/athlete/' + id)
        return res.data
    }

    static async updateAthlete(athlete_id, first_name, last_name) {
        const body = {athlete_id, first_name, last_name}
        const res = await $api.put('/athlete', body)
        return res.data
    }
}