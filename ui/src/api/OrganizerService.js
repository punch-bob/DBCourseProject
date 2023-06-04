import $api from "."

export default class OrganizerService {
    static async getAll() {
        const res = await $api.get('/organizers')
        return res.data.map(a => ({...a, id: a.organizer_id}))
    }

    static async createOrganizer(organizer_name) {
        const body = {organizer_name}
        const res = await $api.post('/organizer', body)
        return res.data
    }

    static async deleteOrganizer(id) {
        const res = await $api.delete('/organizer/' + id)
        return res.data
    }

    static async updateOrganizer(organizer_id, organizer_name) {
        const body = {organizer_id, organizer_name}
        const res = await $api.put('/organizer', body)
        return res.data
    }
}