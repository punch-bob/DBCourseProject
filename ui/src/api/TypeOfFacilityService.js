import $api from "."

export default class TypeOfFacilityService {
    static async getAll() {
        const res = await $api.get('/types-of-facility')
        return res.data.map(t => ({...t, id: t.type_id}))
    }

    static async createType(type_name) {
        const body = {type_name}
        const res = await $api.post('/type-of-facility', body)
        return res.data
    }

    static async deleteType(id) {
        const res = await $api.delete('/type-of-facility/' + id)
        return res.data
    }

    static async updateType(type_id, type_name) {
        const body = {type_id, type_name}
        const res = await $api.put('/type-of-facility', body)
        return res.data
    }
}