import $api from "."

export default class CompetitionService {
    static async getAll() {
        const res = await $api.get('/competitions')
        return res.data.map(a => ({...a, id: a.competition_id}))
    }

    static async createCompetition(sport_id, facility_id, start_date, end_date, competition_name) {
        const body = {sport_id, facility_id, start_date, end_date, competition_name}
        const res = await $api.post('/competition', body)
        return res.data
    }

    static async deleteCompetition(id) {
        const res = await $api.delete('/competition/' + id)
        return res.data
    }

    static async updateCompetition(competition_id, sport_id, facility_id, start_date, end_date, competition_name) {
        const body = {competition_id, sport_id, facility_id, start_date, end_date, competition_name}
        const res = await $api.put('/competition', body)
        return res.data
    }
}