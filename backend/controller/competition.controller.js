const db = require('../db')

class CompetitionController {
    async createCompetition(req, res) {
        const {sport_id, facility_id, start_date, end_date, competition_name} = req.body
        const newComp = await db.query(
            'insert into competition (sport_id, facility_id, start_date, end_date, competition_name) values ($1, $2, $3, $4, $5) returning *',
            [sport_id, facility_id, start_date, end_date, competition_name]
        )
        res.json(newComp.rows[0])
    }

    async updateCompetition(req, res) {
        const {competition_id, sport_id, facility_id, start_date, end_date, competition_name} = req.body
        const comp = await db.query(
            'update competition set sport_id = $1, facility_id = $2, start_date = $3, end_date = $4, competition_name = $5 where competition_id = $6 returning *',
            [sport_id, facility_id, start_date, end_date, competition_name, competition_id]
        )
        res.json(comp.rows[0])
    }

    async deleteCompetition(req, res) {
        const id = req.params.id
        const comp = await db.query('delete from competition where competition_id = $1', [id])
        res.json(comp.rows)
    }

    async getCompetitions(req, res) {
        const comp = await db.query('select * from competition')
        res.json(comp.rows)
    }
}

module.exports = new CompetitionController()