const db = require('../db')

class AthleteClub {
    async createAthleteClub(req, res) {
        const {athlete_id, club_id} = req.body
        const newLink = await db.query(
            'insert into athlete_club (athlete_id, club_id) values ($1, $2) returning *',
            [athlete_id, club_id]    
        )
        res.json(newLink.rows[0])
    }
    
    async updateAthleteClub(req, res) {
        const {id, athlete_id, club_id} = req.body
        const link = await db.query(
            'update athlete_club set athlete_id = $1, club_id = $2 where id = $3 returning *',
            [athlete_id, club_id, id]    
        )
        res.json(link.rows[0])
    }

    async deleteAthleteClub(req, res) {
        const id = req.params.id
        const link = await db.query('delete from athlete_club where id = $1', [id])
        res.json(link.rows)
    }

    async getAthleteClub(req, res) {
        const links = await db.query('select * from athlete_club')
        res.json(links.rows)
    }
}

module.exports = new AthleteClub()