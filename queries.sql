-- #1
select SPORTS_FACILITY."facility_name" from SPORTS_FACILITY
left outer join TYPE_OF_FACILITY on SPORTS_FACILITY."facility_type_id" = TYPE_OF_FACILITY."type_id"
left outer join ATTRIBUTE on SPORTS_FACILITY."attribute_id" = ATTRIBUTE."attribute_id"
where TYPE_OF_FACILITY."name" = 'Ринг'

-- #2
select  ATHLETE ."first_name", ATHLETE."last_name", ATHLETE_SPORT."athlete_rank" from ATHLETE
left outer join ATHLETE_SPORT on ATHLETE."athlete_id" = ATHLETE_SPORT."athlete_id"
left outer join KIND_OF_SPORT on ATHLETE_SPORT."sport_id" = KIND_OF_SPORT."sport_id"
where KIND_OF_SPORT."sport_name" = 'Спортивная стрельба'

-- #3
select ATHLETE ."first_name", ATHLETE."last_name", ATHLETE_SPORT."athlete_rank" from ATHLETE
inner join ATHLETE_COACH on ATHLETE."athlete_id" = ATHLETE_COACH."athlete_id"
inner join COACH on COACH."coach_id" = ATHLETE_COACH."coach_id"
left outer join ATHLETE_SPORT on ATHLETE."athlete_id" = ATHLETE_SPORT."athlete_id" AND COACH."sport_id" = ATHLETE_SPORT."sport_id"
where COACH."first_name" = 'Павел' AND COACH."last_name" = 'Дмитренко'

with SPORTS_COUNT as (
select ATHLETE ."athlete_id", count(*) numb_of_sport from ATHLETE
left outer join ATHLETE_SPORT on ATHLETE."athlete_id" = ATHLETE_SPORT."athlete_id"
left outer join KIND_OF_SPORT on ATHLETE_SPORT."sport_id" = KIND_OF_SPORT."sport_id"
group by ATHLETE ."athlete_id"
)

-- #4
select ATHLETE ."first_name", ATHLETE."last_name",  KIND_OF_SPORT."sport_name" from ATHLETE
left outer join ATHLETE_SPORT on ATHLETE."athlete_id" = ATHLETE_SPORT."athlete_id"
left outer join KIND_OF_SPORT on ATHLETE_SPORT."sport_id" = KIND_OF_SPORT."sport_id"
left outer join SPORTS_COUNT on ATHLETE."athlete_id" = SPORTS_COUNT."athlete_id"
where SPORTS_COUNT.numb_of_sport > 1
order by ATHLETE ."first_name", ATHLETE."last_name",  KIND_OF_SPORT."sport_name"

-- #5
select COACH."first_name", COACH."last_name" from ATHLETE
inner join ATHLETE_COACH on ATHLETE."athlete_id" = ATHLETE_COACH."athlete_id"
inner join COACH on COACH."coach_id" = ATHLETE_COACH."coach_id"
where ATHLETE."first_name" = 'Андрей' and ATHLETE."last_name" = 'Корнещук'

-- #6
select COMPETITION."competition_id" from COMPETITION
inner join COMPETITION_ORGANIZER on COMPETITION_ORGANIZER."competition_id" = COMPETITION."competition_id"
inner join ORGANIZER on COMPETITION_ORGANIZER."organizer_id" = ORGANIZER."organizer_id"
where COMPETITION."start_date" >= TIMESTAMP '2023-01-01 00:00:00 +7:00' and COMPETITION."end_date" <= TIMESTAMP '2023-12-31 00:00:00 +7:00'
group by COMPETITION."competition_id"


-- #7
select ATHLETE."first_name", ATHLETE."last_name", COMPETITION_ATHLETE."place" from COMPETITION
inner join COMPETITION_ATHLETE on COMPETITION."competition_id" = COMPETITION_ATHLETE."competition_id"
inner join ATHLETE on COMPETITION_ATHLETE."athlete_id" = ATHLETE."athlete_id"
where COMPETITION_ATHLETE."place" <= 3 and COMPETITION."competition_id" = 1
order by COMPETITION_ATHLETE."place"


-- #8
select COMPETITION."competition_id" from COMPETITION
inner join SPORTS_FACILITY on COMPETITION."facility_id" = SPORTS_FACILITY."facility_id"
inner join KIND_OF_SPORT on COMPETITION."sport_id" = KIND_OF_SPORT."sport_id"
where SPORTS_FACILITY."facility_name" = 'Атом'


-- #9
select TMP."club_id", TMP."club_name", count(*) numb_of_athlete from (
    select ATHLETE."athlete_id", CLUB."club_id", CLUB."club_name" from COMPETITION
    inner join COMPETITION_ATHLETE on COMPETITION."competition_id" = COMPETITION_ATHLETE."competition_id"
    inner join ATHLETE on ATHLETE."athlete_id" = COMPETITION_ATHLETE."athlete_id"
    inner join ATHLETE_CLUB on ATHLETE."athlete_id" = ATHLETE_CLUB."athlete_id"
    inner join CLUB on CLUB."club_id" = ATHLETE_CLUB."club_id"
    where COMPETITION."start_date" >= TIMESTAMP '2023-01-01 00:00:00 +7:00' and COMPETITION."end_date" <= TIMESTAMP '2023-12-31 00:00:00 +7:00'
    group by  ATHLETE."athlete_id", CLUB."club_id", CLUB."club_name") TMP
group by  TMP."club_id", TMP."club_name"


-- #10
select COACH."first_name", COACH."last_name" from COACH
inner join KIND_OF_SPORT on COACH."sport_id" = KIND_OF_SPORT."sport_id"
where KIND_OF_SPORT."sport_name" = 'Спортивная стрельба'


-- #11
with PARTICIPATING_ATHLETE as (
    select DISTINCT(ATHLETE."athlete_id") from ATHLETE
    left outer join COMPETITION_ATHLETE on COMPETITION_ATHLETE."athlete_id" = ATHLETE."athlete_id"
    left outer join COMPETITION on COMPETITION_ATHLETE."competition_id" = COMPETITION."competition_id"
    where COMPETITION."start_date" >= TIMESTAMP '2023-01-01 00:00:00 +7:00' and COMPETITION."end_date" <= TIMESTAMP '2023-12-31 00:00:00 +7:00'
)
select ATHLETE."athlete_id", ATHLETE."first_name", ATHLETE."last_name" from ATHLETE
left outer join PARTICIPATING_ATHLETE on PARTICIPATING_ATHLETE."athlete_id" = ATHLETE."athlete_id"
where PARTICIPATING_ATHLETE."athlete_id" is null


-- #12
with TMP as (
    select ORGANIZER."organizer_id", count(*) "number_of_competition" from ORGANIZER
    left outer join COMPETITION_ORGANIZER on ORGANIZER."organizer_id" = COMPETITION_ORGANIZER."organizer_id"
    left outer join COMPETITION on COMPETITION_ORGANIZER."competition_id" = COMPETITION."competition_id"
    where COMPETITION."start_date" >= TIMESTAMP '2023-01-01 00:00:00 +7:00' and COMPETITION."end_date" <= TIMESTAMP '2023-12-31 00:00:00 +7:00'
    group by ORGANIZER."organizer_id"
)

select ORGANIZER."organizer_name", COALESCE(TMP."number_of_competition", 0) "number_of_competition" from ORGANIZER
left outer join TMP on ORGANIZER."organizer_id" = TMP."organizer_id"


-- #13
with TMP as (
    select SPORTS_FACILITY."facility_id", COMPETITION."start_date", COMPETITION."end_date" from SPORTS_FACILITY
    left outer join COMPETITION on SPORTS_FACILITY."facility_id" = COMPETITION."facility_id"
    where (COMPETITION."start_date" >= TIMESTAMP '2023-01-01 00:00:00 +7:00' and COMPETITION."end_date" <= TIMESTAMP '2023-12-31 00:00:00 +7:00')
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
    select * from TMP) TMP3 on SPORTS_FACILITY."facility_id" = TMP3."facility_id"
