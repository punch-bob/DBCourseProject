import $api from "."

export default class CoatingTypeService {
    static async getAll() {
        const res = await $api.get('/coating-types')
        return res.data.map(t => ({...t, id: t.coating_type_id}))
    }

    static async createType(coating_type_name) {
        const body = {coating_type_name}
        const res = await $api.post('/coating-type', body)
        return res.data
    }

    static async deleteType(id) {
        const res = await $api.delete('/coating-type/' + id)
        return res.data
    }

    static async updateType(coating_type_id, coating_type_name) {
        const body = {coating_type_id, coating_type_name}
        const res = await $api.put('/coating-type', body)
        return res.data
    }
}