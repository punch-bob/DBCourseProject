import $api from "."

export default class FacilityService {
    static async getAll() {
        const res = await $api.get('/sports-facilities')
        return res.data.map(a => ({...a, id: a.facility_id}))
    }

    static async createFacility(attribute_id, facility_name, facility_type_id) {
        const body = {attribute_id, facility_name, facility_type_id}
        const res = await $api.post('/sports-facility', body)
        return res.data
    }

    static async deleteFacility(id) {
        const res = await $api.delete('/sports-facility/' + id)
        return res.data
    }

    static async updateFacility(facility_id, attribute_id, facility_name, facility_type_id) {
        const body = {facility_id, attribute_id, facility_name, facility_type_id}
        const res = await $api.put('/sports-facility', body)
        return res.data
    }
}