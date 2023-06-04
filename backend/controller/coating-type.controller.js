const db = require('../db')

class CoatingTypeController {
    async createCoatingType(req, res) {
        const {coating_type_name} = req.body
        const newType = await db.query(
            'insert into coating_type (coating_type_name) values ($1) returning *', 
            [coating_type_name]
        )
        res.json(newType.rows[0])
    }

    async updateCoatingType(req, res) {
        const {coating_type_id, coating_type_name} = req.body
        const type = await db.query(
            'update coating_type set coating_type_name = $1 where coating_type_id = $2 returning *', 
            [coating_type_name, coating_type_id]
        )
        res.json(type.rows[0])
    }

    async deleteCoatingType(req, res) {
        const id = req.params.id
        const type = await db.query('delete from coating_type where coating_type_id = $1', [id])
        res.json(type.rows)
    }

    async getCoatingTypes(req, res) {
        const types = await db.query('select * from coating_type')
        res.json(types.rows)
    }
}

module.exports = new CoatingTypeController()