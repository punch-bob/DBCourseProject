const db = require('../db')

class OrganizerController {
    async createOrganizer(req, res) {
        const {organizer_name} = req.body
        const newOrg = await db.query('insert into organizer (organizer_name) values ($1) returning *', [organizer_name])
        res.json(newOrg.rows[0])
    }

    async updateOrganizer(req, res) {
        const {organizer_id, organizer_name} = req.body
        const org = await db.query(
            'update organizer set organizer_name = $1 where organizer_id = $2 returning *', 
            [organizer_name, organizer_id]
        )
        res.json(org.rows[0])
    }

    async deleteOrganizer(req, res) {
        const id = req.params.id
        const org = await db.query('delete from organizer where organizer_id = $1', [id])
        res.json(org.rows)
    }

    async getOrganizers(req, res) {
        const orgs = await db.query('select * from organizer')
        res.json(orgs.rows)
    }
}

module.exports = new OrganizerController()