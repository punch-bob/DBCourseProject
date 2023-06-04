const db = require('../db')

class CoachController {
    async createCoach(req, res) {
        const {first_name, last_name, sport_id} = req.body
        const newCoach = await db.query(
            'insert into coach (first_name, last_name, sport_id) values ($1, $2, $3) returning *', 
            [first_name, last_name, sport_id]
        )
        res.json(newCoach.rows[0])
    }

    async updateCoach(req, res) {
        const {coach_id, first_name, last_name, sport_id} = req.body
        const coach = await db.query(
            'update coach set first_name = $1, last_name = $2, sport_id = $3 where coach_id = $4 returning *', 
            [first_name, last_name, sport_id, coach_id]
        )
        res.json(coach.rows[0])
    }

    async deleteCoach(req, res) {
        const id = req.params.id
        const coach = await db.query('delete from coach where coach_id = $1', [id])
        res.json(coach.rows)
    }

    async getCoaches(req, res) {
        const coaches = await db.query('select * from coach')
        res.json(coaches.rows)
    }
}

module.exports = new CoachController()