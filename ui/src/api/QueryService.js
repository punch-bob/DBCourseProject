import $api from "."

export default class QueryService {
    static async getFacilityByFilter(capacity, coating_type_id, participants_capacity, track_length, facility_type_id) {
        const body = {
            capacity: capacity === '' ? null : capacity,
            coating_type_id: +coating_type_id === 0 ? null : coating_type_id,
            participants_capacity: participants_capacity === '' ? null : participants_capacity,
            track_length: track_length === '' ? null : track_length,
            facility_type_id: +facility_type_id === 0 ? null : facility_type_id
        }
        const res = await $api.post('/facility-by-filter', body)
        return res.data
    }

    static async getFacilityByPeriod(start_date, end_date) {
        const body = {start_date, end_date}
        const res = await $api.post('/facility-by-period', body)
        return res.data
    }

    static async getAthleteBySportRank(sport_id, athlete_rank) {
        const body = {
            sport_id: +sport_id === 0 ? null : sport_id,
            athlete_rank: +athlete_rank === 0 ? null : athlete_rank
        }
        const res = await $api.post('/athlete-by-sport-rank', body)
        return res.data
    }

    static async getAthleteByCoachRank(coach_id, athlete_rank) {
        const body = {
            coach_id: +coach_id === 0 ? null : coach_id,
            athlete_rank: +athlete_rank === 0 ? null : athlete_rank
        }
        const res = await $api.post('/athlete-by-coach-rank', body)
        return res.data
    }

    static async getAthleteByNumbOfSport(numb_of_sports) {
        const body = {
            numb_of_sports: numb_of_sports === '' ? null : numb_of_sports,
        }
        const res = await $api.post('/athlete-by-numb-of-sports', body)
        return res.data
    }

    static async getAthleteByPeriod(start_date, end_date) {
        const body = {start_date, end_date}
        const res = await $api.post('/athlete-by-period', body)
        return res.data
    }

    static async getClubByPeriod(start_date, end_date) {
        const body = {start_date, end_date}
        const res = await $api.post('/club-by-period', body)
        return res.data
    }

    static async getCompByPeriodOrg(start_date, end_date, organizer_id) {
        const body = {
            start_date: start_date === '' ? null : start_date, 
            end_date: end_date === '' ? null : end_date, 
            organizer_id: +organizer_id === 0 ? null : organizer_id
        }
        const res = await $api.post('/comp-by-period-org', body)
        return res.data
    }

    static async getCompByFacilitySport(facility_id, sport_id) {
        const body = {
            facility_id: +facility_id === 0 ? null : facility_id, 
            sport_id: +sport_id === 0 ? null : sport_id
        }
        const res = await $api.post('/comp-by-facility-sport', body)
        return res.data
    }

    static async getOrgByPeriod(start_date, end_date) {
        const body = {start_date, end_date}
        const res = await $api.post('/org-by-period', body)
        return res.data
    }

    static async getCompTop(id) {
        const res = await $api.get('/comp-top/' + id)
        return res.data
    }

    static async getCoachByAthlete(id) {
        const res = await $api.get('/coach-by-athlete/' + id)
        return res.data
    }

    static async getCoachBySport(id) {
        const res = await $api.get('/coach-by-sport/' + id)
        return res.data
    }
}