const db = require('../db')

class AthleteCoach {
    async createAthleteCoach(req, res) {
        const {athlete_id, coach_id} = req.body
        const newLink = await db.query(
            'insert into athlete_coach (athlete_id, coach_id) values ($1, $2) returning *',
            [athlete_id, coach_id]    
        )
        res.json(newLink.rows[0])
    }
    
    async updateAthleteCoach(req, res) {
        const {id, athlete_id, coach_id} = req.body
        const link = await db.query(
            'update athlete_coach set athlete_id = $1, coach_id = $2 where id = $3 returning *',
            [athlete_id, coach_id, id]    
        )
        res.json(link.rows[0])
    }

    async deleteAthleteCoach(req, res) {
        const id = req.params.id
        const link = await db.query('delete from athlete_coach where id = $1', [id])
        res.json(link.rows)
    }

    async getAthleteCoach(req, res) {
        const links = await db.query('select * from athlete_coach')
        res.json(links.rows)
    }
}

module.exports = new AthleteCoach()