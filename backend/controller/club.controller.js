const db = require('../db')

class ClubController {
    async createClub(req, res) {
        const {club_name} = req.body
        const newClub = await db.query('insert into club (club_name) values ($1) returning *', [club_name])
        res.json(newClub.rows[0])
    }

    async updateClub(req, res) {
        const {club_id, club_name} = req.body
        const club = await db.query('update club set club_name = $1 where club_id = $2 returning *', [club_name, club_id])
        res.json(club.rows[0])
    }

    async deleteClub(req, res) {
        const id = req.params.id
        const club = await db.query('delete from club where club_id = $1', [id])
        res.json(club.rows)
    }

    async getClubs(req, res) {
        const clubs = await db.query('select * from club')
        res.json(clubs.rows)
    }
}

module.exports = new ClubController()