const db = require('../db')

class AthleteSport {
    async createAthleteSport(req, res) {
        const {athlete_id, sport_id, athlete_rank} = req.body
        const newLink = await db.query(
            'insert into athlete_sport (athlete_id, sport_id, athlete_rank) values ($1, $2, $3) returning *',
            [athlete_id, sport_id, athlete_rank]
        )
        res.json(newLink.rows[0])
    }

    async updateAthleteSport(req, res) {
        const {id, athlete_id, sport_id, athlete_rank} = req.body
        const link = await db.query(
            'update athlete_sport set athlete_id = $1, sport_id = $2, athlete_rank = $3 where id = $4 returning *',
            [athlete_id, sport_id, athlete_rank, id]
        )
        res.json(link.rows[0])
    }

    async deleteAthleteSport(req, res) {
        const id = req.params.id
        const link = await db.query('delete from athlete_sport where id = $1', [id])
        res.json(link.rows)
    }

    async getAthleteSport(req, res) {
        const links = await db.query('select * from athlete_sport')
        res.json(links.rows)
    }
}

module.exports = new AthleteSport()