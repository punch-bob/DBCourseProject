const db = require('../db')

class AttributeController {
    async createAttribute(req, res) {
        const {capacity, coating_type_id, participants_capacity, track_length} = req.body
        const newAttr = await db.query(
            'insert into attribute (capacity, coating_type_id, participants_capacity, track_length) values ($1, $2, $3, $4) returning *',
            [capacity, coating_type_id, participants_capacity, track_length]
        )
        res.json(newAttr.rows[0])
    }

    async updateAttribute(req, res) {
        const {attribute_id, capacity, coating_type_id, participants_capacity, track_length} = req.body
        const attr = await db.query(
            'update attribute set capacity = $1, coating_type_id = $2, participants_capacity = $3, track_length = $4 where attribute_id = $5 returning *',
            [capacity, coating_type_id, participants_capacity, track_length, attribute_id]
        )
        res.json(attr.rows[0])
    }

    async deleteAttribute(req, res) {
        const id = req.params.id
        const attr = await db.query('delete from attribute where attribute_id = $1', [id])
        res.json(attr.rows)
    }

    async getAttributes(req, res) {
        const attrs = await db.query('select * from attribute')
        res.json(attrs.rows)
    }
}

module.exports = new AttributeController()