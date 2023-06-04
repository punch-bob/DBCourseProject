import $api from "."

export default class CompetitionAthleteService {
    static async getAll() {
        const res = await $api.get('/competition-athlete')
        return res.data
    }

    static async createCompetitionAthlete(competition_id, athlete_id, place) {
        const body = {competition_id, athlete_id, place}
        const res = await $api.post('/competition-athlete', body)
        return res.data
    }

    static async deleteCompetitionAthlete(id) {
        const res = await $api.delete('/competition-athlete/' + id)
        return res.data
    }

    static async updateCompetitionAthlete(id, competition_id, athlete_id, place) {
        const body = {id, competition_id, athlete_id, place}
        const res = await $api.put('/competition-athlete', body)
        return res.data
    }
}