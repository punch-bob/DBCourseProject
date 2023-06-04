import $api from "."

export default class FacilitySportService {
    static async getAll() {
        const res = await $api.get('/facility-sport')
        return res.data
    }

    static async createFacilitySport(facility_id, sport_id) {
        const body = {facility_id, sport_id}
        const res = await $api.post('/facility-sport', body)
        return res.data
    }

    static async deleteFacilitySport(id) {
        const res = await $api.delete('/facility-sport/' + id)
        return res.data
    }

    static async updateFacilitySport(id, facility_id, sport_id) {
        const body = {id, facility_id, sport_id}
        const res = await $api.put('/facility-sport', body)
        return res.data
    }
}