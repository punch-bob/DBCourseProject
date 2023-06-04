const db = require('../db')

class TypeOfFacility {
    async createTypeOfFacility(req, res) {
        const {type_name} = req.body
        const newType = await db.query('insert into type_of_facility (type_name) values ($1) returning *', [type_name])
        res.json(newType.rows[0])
    }

    async updateTypeOfFacility(req, res) {
        const {type_id, type_name} = req.body
        const type = await db.query('update type_of_facility set type_name = $1 where type_id = $2 returning *', [type_name, type_id])
        res.json(type.rows[0])
    }

    async deleteTypeOfFacility(req, res) {
        const id = req.params.id
        const type = await db.query('delete from type_of_facility where type_id = $1', [id])
        res.json(type.rows)
    }

    async getTypesOfFacility(req, res) {
        const types = await db.query('select * from type_of_facility')
        res.json(types.rows)
    }
}

module.exports = new TypeOfFacility()