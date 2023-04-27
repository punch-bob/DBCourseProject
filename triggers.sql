-- #1 (Проверка на разряд спортсмена)
CREATE OR REPLACE TRIGGER ATHLETE_RANK_TR
BEFORE INSERT OR UPDATE ON ATHLETE_SPORT
FOR EACH ROW

BEGIN
    IF :new."athlete_rank" > 10 OR :new."athlete_rank" < 1 THEN
        RAISE_APPLICATION_ERROR( -20001, 'Incorrect athlete rank' );
    END IF;
END;

-- #2 (Проверка на повторение комбинации спортсмен - вид спорта)
CREATE OR REPLACE TRIGGER UNIQUE_ATH_SPORT_RANK_TR
BEFORE INSERT OR UPDATE ON ATHLETE_SPORT
FOR EACH ROW

DECLARE
    n NUMBER(10);

BEGIN
    SELECT COUNT(*)
    INTO n
    FROM ATHLETE_SPORT
    WHERE ATHLETE_SPORT."athlete_id" = :NEW."athlete_id" AND ATHLETE_SPORT."sport_id" = :NEW."sport_id";

    IF n > 0 THEN
        RAISE_APPLICATION_ERROR( -20001, 'This combination of athlete and sport already exists' );
    END IF;
END;

-- #3 (Проверка на повторение комбинации спортсмен - соревнование)
CREATE OR REPLACE TRIGGER UNIQUE_ATH_COMP_PLACE_TR
BEFORE INSERT OR UPDATE ON COMPETITION_ATHLETE
FOR EACH ROW

DECLARE
    n NUMBER(10);

BEGIN
    SELECT COUNT(*)
    INTO n
    FROM COMPETITION_ATHLETE
    WHERE COMPETITION_ATHLETE."athlete_id" = :NEW."athlete_id" AND COMPETITION_ATHLETE."competition_id" = :NEW."competition_id";

    IF n > 0 THEN
        RAISE_APPLICATION_ERROR( -20001, 'This combination of athlete and competition already exists' );
    END IF;
END;

-- #4 (Проверка на повторение комбинации огранизатор - соревнование)
CREATE OR REPLACE TRIGGER UNIQUE_COMP_ORG_TR
BEFORE INSERT OR UPDATE ON COMPETITION_ORGANIZER
FOR EACH ROW

DECLARE
    n NUMBER(10);

BEGIN
    SELECT COUNT(*)
    INTO n
    FROM COMPETITION_ORGANIZER
    WHERE COMPETITION_ORGANIZER."competition_id" = :NEW."competition_id" AND COMPETITION_ORGANIZER."organizer_id" = :NEW."organizer_id";

    IF n > 0 THEN
        RAISE_APPLICATION_ERROR( -20001, 'This combination of organizer and competition already exists' );
    END IF;
END;

-- #5 (Проверка на повторение комбинации спортсмен - тренер)
CREATE OR REPLACE TRIGGER UNIQUE_ATHLETE_COACH_TR
BEFORE INSERT OR UPDATE ON ATHLETE_COACH
FOR EACH ROW

DECLARE
    n NUMBER(10);

BEGIN
    SELECT COUNT(*)
    INTO n
    FROM ATHLETE_COACH
    WHERE ATHLETE_COACH."athlete_id" = :NEW."athlete_id" AND ATHLETE_COACH."coach_id" = :NEW."coach_id";

    IF n > 0 THEN
        RAISE_APPLICATION_ERROR( -20001, 'This combination of athlete and coach already exists' );
    END IF;
END;

-- #6 (Проверка на повторение комбинации спортсмен - клуб)
​​CREATE OR REPLACE TRIGGER UNIQUE_ATHLETE_CLUB_TR
BEFORE INSERT OR UPDATE ON ATHLETE_CLUB
FOR EACH ROW

DECLARE
    n NUMBER(10);

BEGIN
    SELECT COUNT(*)
    INTO n
    FROM ATHLETE_CLUB
    WHERE ATHLETE_CLUB."athlete_id" = :NEW."athlete_id" AND ATHLETE_CLUB."club_id" = :NEW."club_id";

    IF n > 0 THEN
        RAISE_APPLICATION_ERROR( -20001, 'This combination of athlete and club already exists' );
    END IF;
END;

-- #7 (Проверка на повторение комбинации спортивное сооружение - вид спорта)
CREATE OR REPLACE TRIGGER UNIQUE_FACILITY_SPORT_TR
BEFORE INSERT OR UPDATE ON FACILITY_SPORT
FOR EACH ROW

DECLARE
    n NUMBER(10);

BEGIN
    SELECT COUNT(*)
    INTO n
    FROM FACILITY_SPORT
    WHERE FACILITY_SPORT."facility_id" = :NEW."facility_id" AND FACILITY_SPORT."sport_id" = :NEW."sport_id";

    IF n > 0 THEN
        RAISE_APPLICATION_ERROR( -20001, 'This combination of facility and sport already exists' );
    END IF;
END;

-- #8 (Проверка на корректность дат начала и окончания соревнований, начало раньше конца)
CREATE OR REPLACE TRIGGER COMP_START_END_TR
BEFORE INSERT OR UPDATE ON COMPETITION
FOR EACH ROW

BEGIN
    IF :new."start_date" >  :new."end_date" THEN
        RAISE_APPLICATION_ERROR( -20001, 'Start and end dates are incorrect' );
    END IF;
END;

-- #9 (Форматирование имени и фамилии к виду: Имя Фамилия, для спортсмена)
CREATE OR REPLACE TRIGGER ATHLETE_NAME_TR
BEFORE INSERT OR UPDATE ON ATHLETE
FOR EACH ROW

BEGIN
    :new."first_name" := initcap(:new."first_name");
    :new."last_name" := initcap(:new."last_name");
END;

-- #10 (Форматирование имени и фамилии к виду: Имя Фамилия, для тренера)
CREATE OR REPLACE TRIGGER COACH_NAME_TR
BEFORE INSERT OR UPDATE ON COACH
FOR EACH ROW

BEGIN
    :new."first_name" := initcap(:new."first_name");
    :new."last_name" := initcap(:new."last_name");
END;

-- #11 (Перед удалением спортсмена из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE TRIGGER DELETE_ATHLETE_TR
AFTER DELETE ON ATHLETE
FOR EACH ROW

BEGIN
    DELETE FROM ATHLETE_CLUB WHERE ATHLETE_CLUB."athlete_id" = :OLD."athlete_id";
    DELETE FROM ATHLETE_COACH WHERE ATHLETE_COACH."athlete_id" = :OLD."athlete_id";
    DELETE FROM COMPETITION_ATHLETE WHERE COMPETITION_ATHLETE."athlete_id" = :OLD."athlete_id";
    DELETE FROM ATHLETE_SPORT WHERE ATHLETE_SPORT."athlete_id" = :OLD."athlete_id";
END;

-- #12 (Перед удалением тренера из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE TRIGGER DELETE_COACH_TR
AFTER DELETE ON COACH
FOR EACH ROW

BEGIN
    DELETE FROM ATHLETE_COACH WHERE ATHLETE_COACH."coach_id" = :OLD."coach_id";
END;

-- #13 (Перед удалением клуба из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE TRIGGER DELETE_CLUB_TR
AFTER DELETE ON CLUB
FOR EACH ROW

BEGIN
    DELETE FROM ATHLETE_CLUB WHERE ATHLETE_CLUB."club_id" = :OLD."club_id";
END;

-- #14 (Перед удалением соревнования из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE TRIGGER DELETE_COMPETITION_TR
AFTER DELETE ON COMPETITION
FOR EACH ROW

BEGIN
    DELETE FROM COMPETITION_ATHLETE WHERE COMPETITION_ATHLETE."competition_id" = :OLD."competition_id";
    DELETE FROM COMPETITION_ORGANIZER WHERE COMPETITION_ORGANIZER."competition_id" = :OLD."competition_id";
END;

-- #15 (Перед удалением организатора из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE TRIGGER DELETE_ORGANIZER_TR
AFTER DELETE ON ORGANIZER
FOR EACH ROW

BEGIN
    DELETE FROM COMPETITION_ORGANIZER WHERE COMPETITION_ORGANIZER."organizer_id" = :OLD."organizer_id";
END;

-- #16 (Перед удалением спортивного сооружения из базы данных удаляем все дочерние компоненты связанные с его id и его уникальные атрибуты)
CREATE OR REPLACE TRIGGER DELETE_FACILITY_TR
AFTER DELETE ON SPORTS_FACILITY
FOR EACH ROW

BEGIN
    DELETE FROM FACILITY_SPORT WHERE FACILITY_SPORT."facility_id" = :OLD."facility_id";
    DELETE FROM COMPETITION WHERE COMPETITION."facility_id" = :OLD."facility_id";
    DELETE FROM ATTRIBUTE WHERE ATTRIBUTE."attribute_id" = :OLD."attribute_id";
END;
