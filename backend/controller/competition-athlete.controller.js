const db = require('../db')

class CompetitionAthlete {
    async createCompetitionAthlete(req, res) {
        const {competition_id, athlete_id, place} = req.body
        const newLink = await db.query(
            'insert into competition_athlete (competition_id, athlete_id, place) values ($1, $2, $3) returning *', 
            [competition_id, athlete_id, place]
        )
        res.json(newLink.rows[0])
    }

    async updateCompetitionAthlete(req, res) {
        const {id, competition_id, athlete_id, place} = req.body
        const link = await db.query(
            'update competition_athlete set competition_id = $1, athlete_id = $2, place = $3 where id = $4 returning *', 
            [competition_id, athlete_id, place, id]
        )
        res.json(link.rows[0])
    }

    async deleteCompetitionAthlete(req, res) {
        const id = req.params.id
        const link = await db.query('delete from competition_athlete where id = $1', [id])
        res.json(link.rows[0])
    }

    async getCompetitionAthlete(req, res) {
        const links = await db.query('select * from competition_athlete')
        res.json(links.rows)
    }
}

module.exports = new CompetitionAthlete()