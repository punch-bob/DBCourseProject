import $api from "."

export default class CoachService {
    static async getAll() {
        const res = await $api.get('/coaches')
        return res.data.map(a => ({...a, id: a.coach_id}))
    }

    static async createCoach(first_name, last_name) {
        const body = {first_name, last_name}
        const res = await $api.post('/coach', body)
        return res.data
    }

    static async deleteCoach(id) {
        const res = await $api.delete('/coach/' + id)
        return res.data
    }

    static async updateCoach(coach_id, first_name, last_name) {
        const body = {coach_id, first_name, last_name}
        const res = await $api.put('/coach', body)
        return res.data
    }
}