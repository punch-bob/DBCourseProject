insert all
    into ATHLETE ("first_name", "last_name") values ('Константин', 'Рыбалко')
    into ATHLETE ("first_name", "last_name") values ('Игорь', 'Архипов')
    into ATHLETE ("first_name", "last_name") values ('Андрей', 'Корнещук')
    into ATHLETE ("first_name", "last_name") values ('Андрей', 'Тамплон')
    into ATHLETE ("first_name", "last_name") values ('Василий', 'Лопаткин')
    into ATHLETE ("first_name", "last_name") values ('Тимур', 'Гуляев')
    into ATHLETE ("first_name", "last_name") values ('Руслан', 'Мяхтиев')
    into ATHLETE ("first_name", "last_name") values ('Руслан', 'Манеев')
    into ATHLETE ("first_name", "last_name") values ('Вадим', 'Елуфимов')
    into ATHLETE ("first_name", "last_name") values ('Максим', 'Муратов')
select * from dual

insert all
   into CLUB ("club_name") values ('АРЧ')
   into CLUB ("club_name") values ('Форвард')
   into CLUB ("club_name") values ('Фараон')
   into CLUB ("club_name") values ('Исток')
   into CLUB ("club_name") values ('Локомотив')
   into CLUB ("club_name") values ('JAB')
select * from dual

insert all
    into ATHLETE_CLUB ("athlete_id", "club_id") values (1, 1)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (1, 23)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (21, 1)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (22, 24)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (23, 24)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (22, 23)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (24, 21)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (25, 21)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (26, 21)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (27, 25)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (28, 22)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (29, 25)   
    into ATHLETE_CLUB ("athlete_id", "club_id") values (21, 21)
select * from dual

insert all
    into KIND_OF_SPORT ("sport_name") values ('Спортивная стрельба')
    into KIND_OF_SPORT ("sport_name") values ('Кикбоксинг')
    into KIND_OF_SPORT ("sport_name") values ('Фитнес')
    into KIND_OF_SPORT ("sport_name") values ('Баскетбол')
    into KIND_OF_SPORT ("sport_name") values ('Волейбол')
select * from dual

insert all
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (1, 2, 6)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (1, 4, 3)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (21, 1, 7)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (22, 5, 5)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (23, 5, 4)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (22, 4, 3)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (21, 2, 2)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (24, 1, 7)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (25, 1, 1)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (26, 2, 6)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (27, 2, 4)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (28, 3, 8)
    into ATHLETE_SPORT ("athlete_id", "sport_id", "athlete_rank") values (29, 3, 10)
select * from dual

insert all
    into COACH ("first_name", "last_name", "sport_id") values ('Никита', 'Попов', 4)
    into COACH ("first_name", "last_name", "sport_id") values ('Николай', 'Макаров', 2)
    into COACH ("first_name", "last_name", "sport_id") values ('Павел', 'Дмитренко', 3)
    into COACH ("first_name", "last_name", "sport_id") values ('Петр', 'Поморцев', 1)
    into COACH ("first_name", "last_name", "sport_id") values ('Григорий', 'Опарин', 5)
select * from dual

insert all
    into ATHLETE_COACH ("athlete_id", "coach_id") values (1, 1)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (1, 2)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (21, 2)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (21, 4)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (22, 1)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (22, 5)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (23, 5)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (24, 4)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (25, 4)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (26, 2)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (27, 2)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (28, 3)
    into ATHLETE_COACH ("athlete_id", "coach_id") values (29, 3)
select * from dual

insert all
    into COATING_TYPE ("coating_type_name") values ('Резина')
    into COATING_TYPE ("coating_type_name") values ('Газон')
    into COATING_TYPE ("coating_type_name") values ('Паркет')
    into COATING_TYPE ("coating_type_name") values ('Татами')
    into COATING_TYPE ("coating_type_name") values ('Канвас')
    into COATING_TYPE ("coating_type_name") values ('Грунт')
select * from dual

insert all
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity") values (1000, 5, 230)
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity", "track_length") values (10000, 6, 100, 800)
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity") values (525, 5, 170)
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity") values (2000, 3, 130)
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity") values (1500, 2, 200)
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity", "track_length") values (1500, 1, 150, 400)
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity") values (5000, 4, 100)
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity") values (1000, 3, 300)
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity") values (500, 1, 50)
    into ATTRIBUTE ("capacity", "coating_type_id", "participants_capacity") values (1000, 6, 110)
    into ATTRIBUTE ("coating_type_id", "participants_capacity") values (1, 100)
select * from dual

insert all
    into TYPE_OF_FACILITY ("name") values ('Ипподром')
    into TYPE_OF_FACILITY ("name") values ('Стрельбище')
    into TYPE_OF_FACILITY ("name") values ('Футбольное поле')
    into TYPE_OF_FACILITY ("name") values ('Игровой зал')
    into TYPE_OF_FACILITY ("name") values ('Тренажерный зал')
    into TYPE_OF_FACILITY ("name") values ('Беговая дорожка')
    into TYPE_OF_FACILITY ("name") values ('Борцовский зал')
    into TYPE_OF_FACILITY ("name") values ('Ринг')
    into TYPE_OF_FACILITY ("name") values ('Зал восточных единоборств')
select * from dual

insert all
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (1, 'Атом', 8)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (2, 'Новосибирский ипподром', 1)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (3, 'Флагман', 8)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (4, 'Дворец спорта', 4)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (5, 'Zабей', 3)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (6, 'Zабей', 6)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (7, 'Тайфун', 9)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (8, 'Колумб', 4)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (9, '727°С', 2)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (10, 'Кантрипарк', 2)
    into SPORTS_FACILITY ("attribute_id", "facility_name", "facility_type_id") values (11, 'Европа', 5)
select * from dual

insert all
    into KIND_OF_SPORT ("sport_name") values ('Спортивная стрельба')
    into KIND_OF_SPORT ("sport_name") values ('Кикбоксинг')
    into KIND_OF_SPORT ("sport_name") values ('Фитнес')
    into KIND_OF_SPORT ("sport_name") values ('Баскетбол')
    into KIND_OF_SPORT ("sport_name") values ('Волейбол')
    into KIND_OF_SPORT ("sport_name") values ('Скачки')
    into KIND_OF_SPORT ("sport_name") values ('Футбол')
    into KIND_OF_SPORT ("sport_name") values ('Мини футбол')
    into KIND_OF_SPORT ("sport_name") values ('Бег')
select * from dual

insert all
    into FACILITY_SPORT ("facility_id", "sport_id") values (1, 2)
    into FACILITY_SPORT ("facility_id", "sport_id") values (2, 21)
    into FACILITY_SPORT ("facility_id", "sport_id") values (3, 2)
    into FACILITY_SPORT ("facility_id", "sport_id") values (4, 4)
    into FACILITY_SPORT ("facility_id", "sport_id") values (4, 5)
    into FACILITY_SPORT ("facility_id", "sport_id") values (4, 23)
    into FACILITY_SPORT ("facility_id", "sport_id") values (5, 22)
    into FACILITY_SPORT ("facility_id", "sport_id") values (6, 24)
    into FACILITY_SPORT ("facility_id", "sport_id") values (7, 2)
    into FACILITY_SPORT ("facility_id", "sport_id") values (8, 4)
    into FACILITY_SPORT ("facility_id", "sport_id") values (8, 5)
    into FACILITY_SPORT ("facility_id", "sport_id") values (8, 23)
    into FACILITY_SPORT ("facility_id", "sport_id") values (9, 1)
    into FACILITY_SPORT ("facility_id", "sport_id") values (10, 1)
    into FACILITY_SPORT ("facility_id", "sport_id") values (11, 3)
select * from dual

insert all
    into ORGANIZER ("organizer_name") values ('Федерация кикбоксинга России')
    into ORGANIZER ("organizer_name") values ('Волейбольный клуб Локомотив-Новосибирск')
    into ORGANIZER ("organizer_name") values ('РЖД')
    into ORGANIZER ("organizer_name") values ('Федерация баскетбола Новосибирской области')
    into ORGANIZER ("organizer_name") values ('Департамент ФК и спорта Новосибирской области')
select * from dual

insert all
    into COMPETITION ("sport_id", "facility_id", "start_date", "end_date", "competition_name") values (1, 9, TIMESTAMP '2022-08-08 9:00:00 +7:00', TIMESTAMP '2022-08-11 18:00:00 +7:00', 'Чемпионат России по спортивной стрельбе 2022 год')
    into COMPETITION ("sport_id", "facility_id", "start_date", "end_date", "competition_name") values (2, 1, TIMESTAMP '2023-03-24 8:00:00 +3:00', TIMESTAMP '2023-03-31 20:30:00 +3:00', 'Чемпионат и первенство СФО по кикбоксингу 2023 год')
    into COMPETITION ("sport_id", "facility_id", "start_date", "end_date", "competition_name") values (2, 1, TIMESTAMP '2022-03-20 9:00:00 +5:00', TIMESTAMP '2022-03-27 21:00:00 +5:00', 'Чемпионат и первенство СФО по кикбоксингу 2022 год')
    into COMPETITION ("sport_id", "facility_id", "start_date", "end_date", "competition_name") values (4, 4, TIMESTAMP '2012-11-08 8:30:00 +6:00', TIMESTAMP '2012-11-08 18:00:00 +6:00', 'Чемпионат школьной баскетбольной лиги КЭС-БАСКЕТ')
    into COMPETITION ("sport_id", "facility_id", "start_date", "end_date", "competition_name") values (5, 8, TIMESTAMP '2023-02-20 13:00:00 +7:00', TIMESTAMP '2023-02-20 19:30:00 +7:00', 'Чемпионат НСО по волейболу 2023 год')
select * from dual

insert all
    into COMPETITION_ORGANIZER ("organizer_id", "competition_id") values (15, 41)
    into COMPETITION_ORGANIZER ("organizer_id", "competition_id") values (11, 42)
    into COMPETITION_ORGANIZER ("organizer_id", "competition_id") values (15, 42)
    into COMPETITION_ORGANIZER ("organizer_id", "competition_id") values (11, 43)
    into COMPETITION_ORGANIZER ("organizer_id", "competition_id") values (14, 44)
    into COMPETITION_ORGANIZER ("organizer_id", "competition_id") values (13, 45)
    into COMPETITION_ORGANIZER ("organizer_id", "competition_id") values (15, 45)
    into COMPETITION_ORGANIZER ("organizer_id", "competition_id") values (12, 45)
select * from dual

insert all
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (41, 21, 1)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (41, 24, 2)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (41, 25, 3)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (42, 1, 1)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (42, 21, 4)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (42, 26, 2)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (42, 27, 3)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (43, 1, 2)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (43, 26, 1)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (43, 27, 3)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (44, 1, 1)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (44, 22, 1)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (45, 22, 1)
    into COMPETITION_ATHLETE ("competition_id", "athlete_id", "place") values (45, 23, 1)
select * from dual
