import $api from "."

export default class CompetitionOrganizerService {
    static async getAll() {
        const res = await $api.get('/competition-organizer')
        return res.data
    }

    static async createCompetitionOrganizer(competition_id, organizer_id) {
        const body = {competition_id, organizer_id}
        const res = await $api.post('/competition-organizer', body)
        return res.data
    }

    static async deleteCompetitionOrganizer(id) {
        const res = await $api.delete('/competition-organizer/' + id)
        return res.data
    }

    static async updateCompetitionOrganizer(id, competition_id, organizer_id) {
        const body = {id, competition_id, organizer_id}
        const res = await $api.put('/competition-organizer', body)
        return res.data
    }
}