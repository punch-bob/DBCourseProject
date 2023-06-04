import $api from "."

export default class ClubService {
    static async getAll() {
        const res = await $api.get('/clubs')
        return res.data.map(s => ({...s, id: s.club_id}))
    }

    static async createClub(club_name) {
        const body = {club_name}
        const res = await $api.post('/club', body)
        return res.data
    }

    static async deleteClub(id) {
        const res = await $api.delete('/club/' + id)
        return res.data
    }

    static async updateClub(club_id, club_name) {
        const body = {club_id, club_name}
        const res = await $api.put('/club', body)
        return res.data
    }
}