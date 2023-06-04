import $api from "."

export default class AthleteCoachService {
    static async getAll() {
        const res = await $api.get('/athlete-coach')
        return res.data
    }

    static async createAthleteCoach(athlete_id, coach_id) {
        const body = {athlete_id, coach_id}
        const res = await $api.post('/athlete-coach', body)
        return res.data
    }

    static async deleteAthleteCoach(id) {
        const res = await $api.delete('/athlete-coach/' + id)
        return res.data
    }

    static async updateAthleteCoach(id, athlete_id, coach_id) {
        const body = {id, athlete_id, coach_id}
        const res = await $api.put('/athlete-coach', body)
        return res.data
    }
}