import $api from "."

export default class AttributeService {
    static async getAll() {
        const res = await $api.get('/attributes')
        return res.data.map(a => ({...a, id: a.attribute_id}))
    }

    static async createAttribute(capacity, coating_type_id, participants_capacity, track_length) {
        const body = {capacity, coating_type_id, participants_capacity, track_length}
        const res = await $api.post('/attribute', body)
        return res.data
    }

    static async deleteAttribute(id) {
        const res = await $api.delete('/attribute/' + id)
        return res.data
    }

    static async updateAttribute(attribute_id, capacity, coating_type_id, participants_capacity, track_length) {
        const body = {attribute_id, capacity, coating_type_id, participants_capacity, track_length}
        const res = await $api.put('/attribute', body)
        return res.data
    }
}