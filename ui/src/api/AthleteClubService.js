import $api from "."

export default class AthleteClubService {
    static async getAll() {
        const res = await $api.get('/athlete-club')
        return res.data
    }

    static async createAthleteClub(athlete_id, club_id) {
        const body = {athlete_id, club_id}
        const res = await $api.post('/athlete-club', body)
        return res.data
    }

    static async deleteAthleteClub(id) {
        const res = await $api.delete('/athlete-club/' + id)
        return res.data
    }

    static async updateAthleteClub(id, athlete_id, club_id) {
        const body = {id, athlete_id, club_id}
        const res = await $api.put('/athlete-club', body)
        return res.data
    }
}