const db = require('../db')

class FacilitySport {
    async createFacilitySport(req, res) {
        const {facility_id, sport_id} = req.body
        const newLink = await db.query(
            'insert into facility_sport (facility_id, sport_id) values ($1, $2) returning *',
            [facility_id, sport_id]    
        )
        res.json(newLink.rows[0])
    }
    
    async updateFacilitySport(req, res) {
        const {id, facility_id, sport_id} = req.body
        const link = await db.query(
            'update facility_sport set facility_id = $1, sport_id = $2 where id = $3 returning *',
            [facility_id, sport_id, id]    
        )
        res.json(link.rows[0])
    }

    async deleteFacilitySport(req, res) {
        const id = req.params.id
        const link = await db.query('delete from facility_sport where id = $1', [id])
        res.json(link.rows)
    }

    async getFacilitySport(req, res) {
        const links = await db.query('select * from facility_sport')
        res.json(links.rows)
    }
}

module.exports = new FacilitySport()