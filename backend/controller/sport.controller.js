const db = require('../db')

class Sport {
    async createSport(req, res) {
        const {sport_name} = req.body
        const newSport = await db.query('insert into kind_of_sport (sport_name) values ($1) returning *', [sport_name])
        res.json(newSport.rows[0])
    }

    async updateSport(req, res) {
        const {sport_id, sport_name} = req.body
        const sport = await db.query(
            'update kind_of_sport set sport_name = $1 where sport_id = $2 returning *', 
            [sport_name, sport_id]
        )
        res.json(sport.rows[0])
    }

    async deleteSport(req, res) {
        const id = req.params.id
        const sport = await db.query('delete from kind_of_sport where sport_id = $1', [id])
        res.json(sport.rows)
    }

    async getSports(req, res) {
        const sports = await db.query('select * from kind_of_sport')
        res.json(sports.rows)
    }
}

module.exports = new Sport()