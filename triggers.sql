-- #1 (Проверка на разряд спортсмена)
CREATE OR REPLACE FUNCTION ATHLETE_RANK_TR() RETURNS TRIGGER AS $$
    begin
        IF NEW."athlete_rank" > 10 OR NEW."athlete_rank" < 1 THEN
            RAISE EXCEPTION 'Incorrect athlete rank';
    	END IF;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER ATHLETE_RANK_TR
BEFORE INSERT OR UPDATE on ATHLETE_SPORT
FOR EACH ROW EXECUTE PROCEDURE ATHLETE_RANK_TR();

-- #2 (Проверка на повторение комбинации спортсмен - вид спорта)
CREATE OR REPLACE FUNCTION UNIQUE_ATH_SPORT_RANK_TR() RETURNS TRIGGER AS $$
    begin
        if (SELECT COUNT(*) FROM ATHLETE_SPORT WHERE ATHLETE_SPORT."athlete_id" = NEW."athlete_id" AND ATHLETE_SPORT."sport_id" = NEW."sport_id") > 0 then
            RAISE EXCEPTION 'This combination of athlete and sport already exists';
        end if;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER UNIQUE_ATH_SPORT_RANK_TR
BEFORE INSERT OR UPDATE on ATHLETE_SPORT
FOR EACH ROW EXECUTE PROCEDURE UNIQUE_ATH_SPORT_RANK_TR();

-- #3 (Проверка на повторение комбинации спортсмен - соревнование)
CREATE OR REPLACE FUNCTION UNIQUE_ATH_COMP_PLACE_TR() RETURNS TRIGGER AS $$
    begin
        if (SELECT COUNT(*) FROM COMPETITION_ATHLETE WHERE COMPETITION_ATHLETE."athlete_id" = NEW."athlete_id" AND COMPETITION_ATHLETE."competition_id" = NEW."competition_id") > 0 then
            RAISE EXCEPTION 'This combination of athlete and competition already exists';
        end if;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER UNIQUE_ATH_COMP_PLACE_TR
BEFORE INSERT OR UPDATE on COMPETITION_ATHLETE
FOR EACH ROW EXECUTE PROCEDURE UNIQUE_ATH_COMP_PLACE_TR();

-- #4 (Проверка на повторение комбинации огранизатор - соревнование)
CREATE OR REPLACE FUNCTION UNIQUE_COMP_ORG_TR() RETURNS TRIGGER AS $$
    begin
        if (SELECT COUNT(*) FROM COMPETITION_ORGANIZER WHERE COMPETITION_ORGANIZER."competition_id" = NEW."competition_id" AND COMPETITION_ORGANIZER."organizer_id" = NEW."organizer_id") > 0 then
            RAISE EXCEPTION 'This combination of organizer and competition already exists';
        end if;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER UNIQUE_COMP_ORG_TR
BEFORE INSERT OR UPDATE on COMPETITION_ORGANIZER
FOR EACH ROW EXECUTE PROCEDURE UNIQUE_COMP_ORG_TR();

-- #5 (Проверка на повторение комбинации спортсмен - тренер)
CREATE OR REPLACE FUNCTION UNIQUE_ATHLETE_COACH_TR() RETURNS TRIGGER AS $$
    begin
        if (SELECT COUNT(*) FROM ATHLETE_COACH WHERE ATHLETE_COACH."athlete_id" = NEW."athlete_id" AND ATHLETE_COACH."coach_id" = NEW."coach_id") > 0 then
           RAISE EXCEPTION 'This combination of athlete and coach already exists';
        end if;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER UNIQUE_ATHLETE_COACH_TR
BEFORE INSERT OR UPDATE on ATHLETE_COACH
FOR EACH ROW EXECUTE PROCEDURE UNIQUE_ATHLETE_COACH_TR();

-- #6 (Проверка на повторение комбинации спортсмен - клуб)
CREATE OR REPLACE FUNCTION UNIQUE_ATHLETE_CLUB_TR() RETURNS TRIGGER AS $$
    begin
        if (SELECT COUNT(*) FROM ATHLETE_CLUB WHERE ATHLETE_CLUB."athlete_id" = NEW."athlete_id" AND ATHLETE_CLUB."club_id" = NEW."club_id") > 0 then
            RAISE EXCEPTION 'This combination of athlete and club already exists';
        end if;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER UNIQUE_ATHLETE_CLUB_TR
BEFORE INSERT OR UPDATE on ATHLETE_CLUB
FOR EACH ROW EXECUTE PROCEDURE UNIQUE_ATHLETE_CLUB_TR();

-- #7 (Проверка на повторение комбинации спортивное сооружение - вид спорта)
CREATE OR REPLACE FUNCTION UNIQUE_FACILITY_SPORT_TR() RETURNS TRIGGER AS $$
    begin
        if (SELECT COUNT(*) FROM FACILITY_SPORT WHERE FACILITY_SPORT."facility_id" = NEW."facility_id" AND FACILITY_SPORT."sport_id" = NEW."sport_id") > 0 then
            RAISE EXCEPTION 'This combination of facility and sport already exists';
        end if;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER UNIQUE_FACILITY_SPORT_TR
BEFORE INSERT OR UPDATE on FACILITY_SPORT
FOR EACH ROW EXECUTE PROCEDURE UNIQUE_FACILITY_SPORT_TR();

-- #8 (Проверка на корректность дат начала и окончания соревнований, начало раньше конца)
CREATE OR REPLACE FUNCTION COMP_START_END_TR() RETURNS TRIGGER AS $$
    begin
        if (NEW."start_date" >  NEW."end_date" ) then
            RAISE EXCEPTION 'Start and end dates are incorrect';
        end if;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER COMP_START_END_TR
BEFORE INSERT OR UPDATE on COMPETITION
FOR EACH ROW EXECUTE PROCEDURE COMP_START_END_TR();

-- #9 (Форматирование имени и фамилии к виду: Имя Фамилия, для спортсмена)
CREATE OR REPLACE FUNCTION ATHLETE_NAME_TR() RETURNS TRIGGER AS $$
    begin
        NEW."first_name" := initcap(NEW."first_name");
        NEW."last_name" := initcap(NEW."last_name");

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER ATHLETE_NAME_TR
BEFORE INSERT OR UPDATE on ATHLETE
FOR EACH ROW EXECUTE PROCEDURE ATHLETE_NAME_TR();


-- #10 (Форматирование имени и фамилии к виду: Имя Фамилия, для тренера)
CREATE OR REPLACE FUNCTION COACH_NAME_TR() RETURNS TRIGGER AS $$
    begin
        NEW."first_name" := initcap(NEW."first_name");
        NEW."last_name" := initcap(NEW."last_name");

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER COACH_NAME_TR
BEFORE INSERT OR UPDATE on COACH
FOR EACH ROW EXECUTE PROCEDURE COACH_NAME_TR();

-- #11 (Перед удалением спортсмена из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE FUNCTION DELETE_ATHLETE_TR() RETURNS TRIGGER AS $$
    begin
		DELETE FROM ATHLETE_CLUB WHERE ATHLETE_CLUB."athlete_id" = OLD."athlete_id";
	    DELETE FROM ATHLETE_COACH WHERE ATHLETE_COACH."athlete_id" = OLD."athlete_id";
	    DELETE FROM COMPETITION_ATHLETE WHERE COMPETITION_ATHLETE."athlete_id" = OLD."athlete_id";
	    DELETE FROM ATHLETE_SPORT WHERE ATHLETE_SPORT."athlete_id" = OLD."athlete_id";
        return old;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER DELETE_ATHLETE_TR
before delete on ATHLETE
FOR EACH ROW EXECUTE PROCEDURE DELETE_ATHLETE_TR();

-- #12 (Перед удалением тренера из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE FUNCTION DELETE_COACH_TR() RETURNS TRIGGER AS $$
    begin
		DELETE FROM ATHLETE_COACH WHERE ATHLETE_COACH."coach_id" = OLD."coach_id";
        return old;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER DELETE_COACH_TR
before delete on COACH
FOR EACH ROW EXECUTE PROCEDURE DELETE_COACH_TR();

-- #13 (Перед удалением клуба из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE FUNCTION DELETE_CLUB_TR() RETURNS TRIGGER AS $$
    begin
		DELETE FROM ATHLETE_CLUB WHERE ATHLETE_CLUB."club_id" = OLD."club_id";
        return old;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER DELETE_CLUB_TR
before delete on CLUB
FOR EACH ROW EXECUTE PROCEDURE DELETE_CLUB_TR();

-- #14 (Перед удалением соревнования из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE FUNCTION DELETE_COMPETITION_TR() RETURNS TRIGGER AS $$
    begin
		DELETE FROM COMPETITION_ATHLETE WHERE COMPETITION_ATHLETE."competition_id" = OLD."competition_id";
        DELETE FROM COMPETITION_ORGANIZER WHERE COMPETITION_ORGANIZER."competition_id" = OLD."competition_id";
        return old;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER DELETE_COMPETITION_TR
before delete on COMPETITION
FOR EACH ROW EXECUTE PROCEDURE DELETE_COMPETITION_TR();

-- #15 (Перед удалением организатора из базы данных удаляем все дочерние компоненты связанные с его id)
CREATE OR REPLACE FUNCTION DELETE_ORGANIZER_TR() RETURNS TRIGGER AS $$
    begin
		DELETE FROM COMPETITION_ORGANIZER WHERE COMPETITION_ORGANIZER."organizer_id" = OLD."organizer_id";
        return old;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER DELETE_ORGANIZER_TR
before delete on ORGANIZER
FOR EACH ROW EXECUTE PROCEDURE DELETE_ORGANIZER_TR();

-- #16 (Перед удалением спортивного сооружения из базы данных удаляем все дочерние компоненты связанные с его id и его уникальные атрибуты)
CREATE OR REPLACE FUNCTION DELETE_FACILITY_TR() RETURNS TRIGGER AS $$
    begin
		DELETE FROM FACILITY_SPORT WHERE FACILITY_SPORT."facility_id" = OLD."facility_id";
        DELETE FROM COMPETITION WHERE COMPETITION."facility_id" = OLD."facility_id";
        DELETE FROM ATTRIBUTE WHERE ATTRIBUTE."attribute_id" = OLD."attribute_id";
        return old;
    END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER DELETE_FACILITY_TR
before delete on SPORTS_FACILITY
FOR EACH ROW EXECUTE PROCEDURE DELETE_FACILITY_TR();
