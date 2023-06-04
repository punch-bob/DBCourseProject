const db = require('../db')

class CompetitionOrganizer {
    async createCompetitionOrganizer(req, res) {
        const {organizer_id, competition_id} = req.body
        const newLink = await db.query(
            'insert into competition_organizer (organizer_id, competition_id) values ($1, $2) returning *',
            [organizer_id, competition_id]    
        )
        res.json(newLink.rows[0])
    }

    async updateCompetitionOrganizer(req, res) {
        const {id, organizer_id, competition_id} = req.body
        const link = await db.query(
            'update competition_organizer set organizer_id = $1, competition_id = $2 where id = $3 returning *',
            [organizer_id, competition_id, id]    
        )
        res.json(link.rows[0])
    }

    async deleteCompetitionOrganizer(req, res) {
        const id = req.params.id
        const link = await db.query('delete from competition_organizer where id = $1', [id])
        res.json(link.rows)
    }

    async getCompetitionOrganizer(req, res) {
        const links = await db.query('select * from competition_organizer')
        res.json(links.rows)
    }
}

module.exports = new CompetitionOrganizer()