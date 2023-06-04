const db = require('../db')

class AthleteController {
    async createAthlete(req, res) {
        const {first_name, last_name} = req.body
        const newAthlete = await db.query(
            'insert into athlete (first_name, last_name) values ($1, $2) returning *', 
            [first_name, last_name]
        )
        res.json(newAthlete.rows[0])
    }

    async updateAthlete(req, res) {
        const {athlete_id, first_name, last_name} = req.body
        const athlete = await db.query(
            'update athlete set first_name = $1, last_name = $2 where athlete_id = $3 returning *', 
            [first_name, last_name, athlete_id]
        )
        res.json(athlete.rows[0])
    }

    async deleteAthlete(req, res) {
        const id = req.params.id
        const athlete = await db.query('delete from athlete where athlete_id = $1', [id])
        res.json(athlete.rows)
    }

    async getAthletes(req, res) {
        const athletes = await db.query('select * from athlete')
        res.json(athletes.rows)
    }
}

module.exports = new AthleteController()