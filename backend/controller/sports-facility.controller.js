const db = require('../db')

class SportsFacility {
    async createSportsFacility(req, res) {
        const {attribute_id, facility_name, facility_type_id} = req.body
        const newFacility = await db.query(
            'insert into sports_facility (attribute_id, facility_name, facility_type_id) values ($1, $2, $3) returning *',
            [attribute_id, facility_name, facility_type_id]
        )
        res.json(newFacility.rows[0])
    }

    async updateSportsFacility(req, res) {
        const {facility_id, attribute_id, facility_name, facility_type_id} = req.body
        const facility = await db.query(
            'update sports_facility set attribute_id = $1, facility_name = $2, facility_type_id = $3 where facility_id = $4 returning *',
            [attribute_id, facility_name, facility_type_id, facility_id]
        )
        res.json(facility.rows[0])
    }

    async deleteSportsFacility(req, res) {
        const id = req.params.id
        const facility = await db.query('delete from sports_facility where facility_id = $1', [id])
        res.json(facility.rows)
    }

    async getSportsFacilities(req, res) {
        const facilities = await db.query('select * from sports_facility')
        res.json(facilities.rows)
    }
}

module.exports = new SportsFacility()