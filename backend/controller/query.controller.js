const db = require('../db')

const tableAndAttr = tableName => {
    return function(attrName, attr) {
        if (attr !== null) {
            return tableName + '.' + attrName + '=' + attr + ' and '
        }
        return ''
    }
}

const tableAndAttrMore = tableName => {
    return function(attrName, attr) {
        if (attr !== null) {
            return tableName + '.' + attrName + '>' + attr + ' and '
        }
        return ''
    }
}

const tableAndAttrMoreOrEq = tableName => {
    return function(attrName, attr) {
        if (attr !== null) {
            return tableName + '.' + attrName + '>=' + attr + ' and '
        }
        return ''
    }
}

const tableAndAttrTime = tableName => {
    return function(startName, start, endName, end) {
        if (start !== null && end !== null) {
            return tableName + '.' + startName + `>= TIMESTAMP '` + start + `' and ` + tableName + '.' + endName + `<= TIMESTAMP '` + end + `' and `
        }
        return ''
    }
}

class QueryController {
    async getFacilityByFilter(req, res) {
        const {capacity, coating_type_id, participants_capacity, track_length, facility_type_id} = req.body
        const attributeMaker = tableAndAttr('attribute')
        const attributeMaker_ = tableAndAttrMoreOrEq('attribute')
        const typeMaker = tableAndAttr('sports_facility')
        const whereStr = 'where ' + (attributeMaker_('capacity', capacity) + 
                         attributeMaker('coating_type_id', coating_type_id) + 
                         attributeMaker_('participants_capacity', participants_capacity) +
                         attributeMaker_('track_length', track_length) + 
                         typeMaker('facility_type_id', facility_type_id)).slice(0, -4)
        const query = `select SPORTS_FACILITY.facility_name from SPORTS_FACILITY
                       left outer join TYPE_OF_FACILITY on SPORTS_FACILITY.facility_type_id = TYPE_OF_FACILITY.type_id
                       left outer join ATTRIBUTE on SPORTS_FACILITY.attribute_id = ATTRIBUTE.attribute_id ` + 
                       whereStr
        const result = await db.query(query)
        res.json(result.rows)
    }

    async getFacilityByPeriod(req, res) {
        const {start_date, end_date} = req.body
        const query = `with TMP as (
                            select SPORTS_FACILITY."facility_id", COMPETITION."start_date", COMPETITION."end_date" from SPORTS_FACILITY
                            left outer join COMPETITION on SPORTS_FACILITY."facility_id" = COMPETITION."facility_id"
                            where (COMPETITION."start_date" >= TIMESTAMP '${start_date}' and COMPETITION."end_date" <= TIMESTAMP '${end_date}')
                        ),
                        TMP2 as (
                            select distinct(TMP."facility_id"), TMP."start_date", TMP."end_date" from TMP
                        )
                        
                        select SPORTS_FACILITY."facility_name", TMP3."start_date", TMP3."end_date" from SPORTS_FACILITY
                        inner join
                            (select SPORTS_FACILITY."facility_id", TMP2."start_date", TMP2."end_date" from SPORTS_FACILITY
                            left outer join COMPETITION on SPORTS_FACILITY."facility_id" = COMPETITION."facility_id"
                            left outer join TMP2 on SPORTS_FACILITY."facility_id" = TMP2."facility_id" 
                            where TMP2."facility_id" is null
                            union
                            select * from TMP) TMP3 on SPORTS_FACILITY."facility_id" = TMP3."facility_id"`
        const result = await db.query(query)
        res.json(result.rows)
    }

    async getAthleteBySportRank(req, res) {
        const {sport_id, athlete_rank} = req.body
        const sportMaker = tableAndAttr('athlete_sport')
        const rankMaker = tableAndAttrMore('athlete_sport')
        const  whereStr = 'where ' + (sportMaker('sport_id', sport_id) + rankMaker('athlete_rank', athlete_rank)).slice(0, -4)
        const query = `select  ATHLETE .first_name, ATHLETE.last_name, ATHLETE_SPORT.athlete_rank from ATHLETE
                       left outer join ATHLETE_SPORT on ATHLETE.athlete_id = ATHLETE_SPORT.athlete_id
                       left outer join KIND_OF_SPORT on ATHLETE_SPORT.sport_id = KIND_OF_SPORT.sport_id ` + 
                       whereStr
        const result = await db.query(query)
        res.json(result.rows)
    }

    async getAthleteByCoachRank(req, res) {
        const {coach_id, athlete_rank} = req.body
        const coachMaker = tableAndAttr('athlete_coach')
        const rankMaker = tableAndAttrMore('athlete_sport')
        const  whereStr = 'where ' + (coachMaker('coach_id', coach_id) + rankMaker('athlete_rank', athlete_rank)).slice(0, -4)
        const query = `select ATHLETE .first_name, ATHLETE.last_name, ATHLETE_SPORT.athlete_rank from ATHLETE
                       inner join ATHLETE_COACH on ATHLETE.athlete_id = ATHLETE_COACH.athlete_id
                       inner join COACH on COACH.coach_id = ATHLETE_COACH.coach_id
                       left outer join ATHLETE_SPORT on ATHLETE.athlete_id = ATHLETE_SPORT.athlete_id AND COACH.sport_id = ATHLETE_SPORT.sport_id ` + 
                       whereStr
        const result = await db.query(query)
        res.json(result.rows)
    }

    async getAthleteByNumbOfSport(req, res) {
        const {numb_of_sports} = req.body
        const result = await db.query(`with sports_count as (
                                            select ATHLETE.athlete_id, count(*) numb_of_sport from ATHLETE
                                            left outer join ATHLETE_SPORT on ATHLETE.athlete_id = ATHLETE_SPORT.athlete_id
                                            left outer join KIND_OF_SPORT on ATHLETE_SPORT.sport_id = KIND_OF_SPORT.sport_id
                                            group by ATHLETE.athlete_id
                                       )
                                       select ATHLETE.first_name, ATHLETE.last_name,  KIND_OF_SPORT.sport_name from ATHLETE
                                       left outer join ATHLETE_SPORT on ATHLETE.athlete_id = ATHLETE_SPORT.athlete_id
                                       left outer join KIND_OF_SPORT on ATHLETE_SPORT.sport_id = KIND_OF_SPORT.sport_id
                                       left outer join sports_count on ATHLETE.athlete_id = sports_count.athlete_id 
                                       where sports_count.numb_of_sport > $1
                                       order by ATHLETE.first_name, ATHLETE.last_name,  KIND_OF_SPORT.sport_name`, [numb_of_sports])
        res.json(result.rows)
    }

    async getAthleteByPeriod(req, res) {
        const {start_date, end_date} = req.body
        const query = `with PARTICIPATING_ATHLETE as (
                            select DISTINCT(ATHLETE."athlete_id") from ATHLETE
                            left outer join COMPETITION_ATHLETE on COMPETITION_ATHLETE."athlete_id" = ATHLETE."athlete_id"
                            left outer join COMPETITION on COMPETITION_ATHLETE."competition_id" = COMPETITION."competition_id"
                            where COMPETITION."start_date" >= TIMESTAMP '${start_date}' and COMPETITION."end_date" <= TIMESTAMP '${end_date}'
                       )
                       select ATHLETE."athlete_id", ATHLETE."first_name", ATHLETE."last_name" from ATHLETE
                       left outer join PARTICIPATING_ATHLETE on PARTICIPATING_ATHLETE."athlete_id" = ATHLETE."athlete_id"
                       where PARTICIPATING_ATHLETE."athlete_id" is null`
        const result = await db.query(query)
        res.json(result.rows)
    }

    async getClubByPeriod(req, res) {
        const {start_date, end_date} = req.body
        const query = `select TMP."club_id", TMP."club_name", count(*) numb_of_athlete from (
                            select ATHLETE."athlete_id", CLUB."club_id", CLUB."club_name" from COMPETITION
                            inner join COMPETITION_ATHLETE on COMPETITION."competition_id" = COMPETITION_ATHLETE."competition_id"
                            inner join ATHLETE on ATHLETE."athlete_id" = COMPETITION_ATHLETE."athlete_id"
                            inner join ATHLETE_CLUB on ATHLETE."athlete_id" = ATHLETE_CLUB."athlete_id"
                            inner join CLUB on CLUB."club_id" = ATHLETE_CLUB."club_id"
                            where COMPETITION."start_date" >= TIMESTAMP '${start_date}' and COMPETITION."end_date" <= TIMESTAMP '${end_date}'
                            group by  ATHLETE."athlete_id", CLUB."club_id", CLUB."club_name") TMP
                       group by  TMP."club_id", TMP."club_name"`
        const result = await db.query(query)
        res.json(result.rows)
    }

    async getCompByPeriodOrg(req, res) {
        const {start_date, end_date, organizer_id} = req.body
        const timeBorderMaker =  tableAndAttrTime('competition')
        const orgMaker = tableAndAttr('organizer')
        const whereStr = 'where ' + (timeBorderMaker('start_date', start_date, 'end_date', end_date) + orgMaker('organizer_id', organizer_id)).slice(0, -4)
        const query = `select COMPETITION."competition_id", COMPETITION."competition_name" from COMPETITION
                       inner join COMPETITION_ORGANIZER on COMPETITION_ORGANIZER."competition_id" = COMPETITION."competition_id"
                       inner join ORGANIZER on COMPETITION_ORGANIZER."organizer_id" = ORGANIZER."organizer_id"` + 
                       whereStr + 
                       ` group by COMPETITION."competition_id"`
        const result = await db.query(query)
        res.json(result.rows)
    }

    async getCompByFacilitySport(req, res) {
        const {facility_id, sport_id} = req.body
        const facilityMaker = tableAndAttr('sports_facility')
        const sportMaker = tableAndAttr('kind_of_sport')
        const  whereStr = 'where ' + (facilityMaker('facility_id', facility_id) + sportMaker('sport_id', sport_id)).slice(0, -4)
        const query = `select COMPETITION."competition_id", COMPETITION."competition_name" from COMPETITION
                       inner join SPORTS_FACILITY on COMPETITION."facility_id" = SPORTS_FACILITY."facility_id"
                       inner join KIND_OF_SPORT on COMPETITION."sport_id" = KIND_OF_SPORT."sport_id" ` + 
                       whereStr
        const result = await db.query(query)
        res.json(result.rows)
    }

    async getOrgByPeriod(req, res) {
        const {start_date, end_date} = req.body
        const query = `with TMP as (
                            select ORGANIZER."organizer_id", count(*) "number_of_competition" from ORGANIZER
                            left outer join COMPETITION_ORGANIZER on ORGANIZER."organizer_id" = COMPETITION_ORGANIZER."organizer_id"
                            left outer join COMPETITION on COMPETITION_ORGANIZER."competition_id" = COMPETITION."competition_id"
                            where COMPETITION."start_date" >= TIMESTAMP '${start_date}' and COMPETITION."end_date" <= TIMESTAMP '${end_date}'
                            group by ORGANIZER."organizer_id"
                       )
        
                       select ORGANIZER."organizer_name", COALESCE(TMP."number_of_competition", 0) "number_of_competition" from ORGANIZER
                       left outer join TMP on ORGANIZER."organizer_id" = TMP."organizer_id"`
        const result = await db.query(query)
        res.json(result.rows)
    }

    async getCompTop(req, res) {
        const id = req.params.id
        const result = await db.query(`select ATHLETE."first_name", ATHLETE."last_name", COMPETITION_ATHLETE."place" from COMPETITION
                                       inner join COMPETITION_ATHLETE on COMPETITION."competition_id" = COMPETITION_ATHLETE."competition_id"
                                       inner join ATHLETE on COMPETITION_ATHLETE."athlete_id" = ATHLETE."athlete_id"
                                       where COMPETITION_ATHLETE."place" <= 3 and COMPETITION."competition_id" = $1
                                       order by COMPETITION_ATHLETE."place"`, [id])
        res.json(result.rows)
    }

    async getCoachByAthlete(req, res) {
        const id = req.params.id
        const result = await db.query(`select COACH."first_name", COACH."last_name" from ATHLETE
                                       inner join ATHLETE_COACH on ATHLETE."athlete_id" = ATHLETE_COACH."athlete_id"
                                       inner join COACH on COACH."coach_id" = ATHLETE_COACH."coach_id"
                                       where ATHLETE."athlete_id" = $1`, [id])
        res.json(result.rows)
    }

    async getCoachBySport(req, res) {
        const id = req.params.id
        const result = await db.query(`select COACH."first_name", COACH."last_name" from COACH
                                       inner join KIND_OF_SPORT on COACH."sport_id" = KIND_OF_SPORT."sport_id"
                                       where KIND_OF_SPORT."sport_id" = $1`, [id])
        res.json(result.rows)
    }
}

module.exports = new QueryController()