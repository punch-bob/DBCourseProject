CREATE TABLE "Sports_facility" (
	"facility_id" NUMBER NOT NULL,
	"attribute_id" NUMBER NOT NULL,
	"facility_name" VARCHAR2(100) NOT NULL,
	"facility_type_id" NUMBER NOT NULL,
	constraint SPORTS_FACILITY_PK PRIMARY KEY ("facility_id"));

CREATE sequence "SPORTS_FACILITY_FACILITY_ID_SEQ";

CREATE trigger "BI_SPORTS_FACILITY_FACILITY_ID"
  before insert on "Sports_facility"
  for each row
begin
  select "SPORTS_FACILITY_FACILITY_ID_SEQ".nextval into :NEW."facility_id" from dual;
end;
CREATE sequence "SPORTS_FACILITY_ATTRIBUTE_ID_SEQ";

CREATE trigger "BI_SPORTS_FACILITY_ATTRIBUTE_ID"
  before insert on "Sports_facility"
  for each row
begin
  select "SPORTS_FACILITY_ATTRIBUTE_ID_SEQ".nextval into :NEW."attribute_id" from dual;
end;

/
CREATE TABLE "Attribute" (
	"attribute_id" NUMBER NOT NULL,
	"capacity" NUMBER,
	"coating_type_id" NUMBER,
	"participants_capacity" NUMBER,
	"track_length" NUMBER,
	constraint ATTRIBUTE_PK PRIMARY KEY ("attribute_id"));

CREATE sequence "ATTRIBUTE_ATTRIBUTE_ID_SEQ";

CREATE trigger "BI_ATTRIBUTE_ATTRIBUTE_ID"
  before insert on "Attribute"
  for each row
begin
  select "ATTRIBUTE_ATTRIBUTE_ID_SEQ".nextval into :NEW."attribute_id" from dual;
end;

/
CREATE TABLE "Coating_type" (
	"coating_type_id" NUMBER NOT NULL,
	"coating_type_name" VARCHAR2(50) UNIQUE NOT NULL,
	constraint COATING_TYPE_PK PRIMARY KEY ("coating_type_id"));

CREATE sequence "COATING_TYPE_COATING_TYPE_ID_SEQ";

CREATE trigger "BI_COATING_TYPE_COATING_TYPE_ID"
  before insert on "Coating_type"
  for each row
begin
  select "COATING_TYPE_COATING_TYPE_ID_SEQ".nextval into :NEW."coating_type_id" from dual;
end;

/
CREATE TABLE "Athlete" (
	"athlete_id" NUMBER NOT NULL,
	"first_name" VARCHAR2(100) NOT NULL,
	"last_name" VARCHAR2(100) NOT NULL,
	constraint ATHLETE_PK PRIMARY KEY ("athlete_id"));

CREATE sequence "ATHLETE_ATHLETE_ID_SEQ";

CREATE trigger "BI_ATHLETE_ATHLETE_ID"
  before insert on "Athlete"
  for each row
begin
  select "ATHLETE_ATHLETE_ID_SEQ".nextval into :NEW."athlete_id" from dual;
end;

/
CREATE TABLE "Coach" (
	"coach_id" NUMBER NOT NULL,
	"first_name" VARCHAR2(100) NOT NULL,
	"last_name" VARCHAR2(100) NOT NULL,
	"sport_id" NUMBER NOT NULL,
	constraint COACH_PK PRIMARY KEY ("coach_id"));

CREATE sequence "COACH_COACH_ID_SEQ";

CREATE trigger "BI_COACH_COACH_ID"
  before insert on "Coach"
  for each row
begin
  select "COACH_COACH_ID_SEQ".nextval into :NEW."coach_id" from dual;
end;

/
CREATE TABLE "Kind_of_sport" (
	"sport_id" NUMBER NOT NULL,
	"sport_name" VARCHAR2(50) UNIQUE NOT NULL,
	constraint KIND_OF_SPORT_PK PRIMARY KEY ("sport_id"));

CREATE sequence "KIND_OF_SPORT_SPORT_ID_SEQ";

CREATE trigger "BI_KIND_OF_SPORT_SPORT_ID"
  before insert on "Kind_of_sport"
  for each row
begin
  select "KIND_OF_SPORT_SPORT_ID_SEQ".nextval into :NEW."sport_id" from dual;
end;

/
CREATE TABLE "Athlete_coach" (
	"id" NUMBER NOT NULL,
	"athlete_id" NUMBER NOT NULL,
	"coach_id" NUMBER NOT NULL,
	constraint ATHLETE_COACH_PK PRIMARY KEY ("id"));

CREATE sequence "ATHLETE_COACH_ID_SEQ";

CREATE trigger "BI_ATHLETE_COACH_ID"
  before insert on "Athlete_coach"
  for each row
begin
  select "ATHLETE_COACH_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "Club" (
	"club_id" NUMBER NOT NULL,
	"club_name" VARCHAR2(100) NOT NULL,
	constraint CLUB_PK PRIMARY KEY ("club_id"));

CREATE sequence "CLUB_CLUB_ID_SEQ";

CREATE trigger "BI_CLUB_CLUB_ID"
  before insert on "Club"
  for each row
begin
  select "CLUB_CLUB_ID_SEQ".nextval into :NEW."club_id" from dual;
end;

/
CREATE TABLE "Athlete_sport" (
	"id" NUMBER NOT NULL,
	"athlete_id" NUMBER NOT NULL,
	"sport_id" NUMBER NOT NULL,
	"athlete_rank" NUMBER NOT NULL,
	constraint ATHLETE_SPORT_PK PRIMARY KEY ("id"));

CREATE sequence "ATHLETE_SPORT_ID_SEQ";

CREATE trigger "BI_ATHLETE_SPORT_ID"
  before insert on "Athlete_sport"
  for each row
begin
  select "ATHLETE_SPORT_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "Competition" (
	"competition_id" NUMBER NOT NULL,
	"sport_id" NUMBER NOT NULL,
	"facility_id" NUMBER NOT NULL,
	"start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
	"end_date" TIMESTAMP WITH TIME ZONE NOT NULL,
	"competition_name" VARCHAR2(100) NOT NULL,
	constraint COMPETITION_PK PRIMARY KEY ("competition_id"));

CREATE sequence "COMPETITION_COMPETITION_ID_SEQ";

CREATE trigger "BI_COMPETITION_COMPETITION_ID"
  before insert on "Competition"
  for each row
begin
  select "COMPETITION_COMPETITION_ID_SEQ".nextval into :NEW."competition_id" from dual;
end;

/
CREATE TABLE "Facility_sport" (
	"id" NUMBER NOT NULL,
	"facility_id" NUMBER NOT NULL,
	"sport_id" NUMBER NOT NULL,
	constraint FACILITY_SPORT_PK PRIMARY KEY ("id"));

CREATE sequence "FACILITY_SPORT_ID_SEQ";

CREATE trigger "BI_FACILITY_SPORT_ID"
  before insert on "Facility_sport"
  for each row
begin
  select "FACILITY_SPORT_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "Type_of_facility" (
	"type_id" NUMBER NOT NULL,
	"name" VARCHAR2(50) UNIQUE NOT NULL,
	constraint TYPE_OF_FACILITY_PK PRIMARY KEY ("type_id"));

CREATE sequence "TYPE_OF_FACILITY_TYPE_ID_SEQ";

CREATE trigger "BI_TYPE_OF_FACILITY_TYPE_ID"
  before insert on "Type_of_facility"
  for each row
begin
  select "TYPE_OF_FACILITY_TYPE_ID_SEQ".nextval into :NEW."type_id" from dual;
end;

/
CREATE TABLE "Organizer" (
	"organizer_id" NUMBER NOT NULL,
	"organizer_name" VARCHAR2(100) UNIQUE NOT NULL,
	constraint ORGANIZER_PK PRIMARY KEY ("organizer_id"));

CREATE sequence "ORGANIZER_ORGANIZER_ID_SEQ";

CREATE trigger "BI_ORGANIZER_ORGANIZER_ID"
  before insert on "Organizer"
  for each row
begin
  select "ORGANIZER_ORGANIZER_ID_SEQ".nextval into :NEW."organizer_id" from dual;
end;

/
CREATE TABLE "Сompetiton_athlete" (
	"id" NUMBER NOT NULL,
	"competition_id" NUMBER NOT NULL,
	"athlete_id" NUMBER NOT NULL,
	"place" NUMBER NOT NULL,
	constraint СOMPETITON_ATHLETE_PK PRIMARY KEY ("id"));

CREATE sequence "СOMPETITON_ATHLETE_ID_SEQ";

CREATE trigger "BI_СOMPETITON_ATHLETE_ID"
  before insert on "Сompetiton_athlete"
  for each row
begin
  select "СOMPETITON_ATHLETE_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "Athlete_club" (
	"id" NUMBER NOT NULL,
	"athlete_id" NUMBER NOT NULL,
	"club_id" NUMBER NOT NULL,
	constraint ATHLETE_CLUB_PK PRIMARY KEY ("id"));

CREATE sequence "ATHLETE_CLUB_ID_SEQ";

CREATE trigger "BI_ATHLETE_CLUB_ID"
  before insert on "Athlete_club"
  for each row
begin
  select "ATHLETE_CLUB_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
CREATE TABLE "Competition_organizer" (
	"id" NUMBER NOT NULL,
	"organizer_id" NUMBER NOT NULL,
	"competition_id" NUMBER NOT NULL,
	constraint COMPETITION_ORGANIZER_PK PRIMARY KEY ("id"));

CREATE sequence "COMPETITION_ORGANIZER_ID_SEQ";

CREATE trigger "BI_COMPETITION_ORGANIZER_ID"
  before insert on "Competition_organizer"
  for each row
begin
  select "COMPETITION_ORGANIZER_ID_SEQ".nextval into :NEW."id" from dual;
end;

/
ALTER TABLE "Sports_facility" ADD CONSTRAINT "Sports_facility_fk0" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("attribute_id");
ALTER TABLE "Sports_facility" ADD CONSTRAINT "Sports_facility_fk1" FOREIGN KEY ("facility_type_id") REFERENCES "Type_of_facility"("type_id");

ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_fk0" FOREIGN KEY ("coating_type_id") REFERENCES "Coating_type"("coating_type_id");



ALTER TABLE "Coach" ADD CONSTRAINT "Coach_fk0" FOREIGN KEY ("sport_id") REFERENCES "Kind_of_sport"("sport_id");


ALTER TABLE "Athlete_coach" ADD CONSTRAINT "Athlete_coach_fk0" FOREIGN KEY ("athlete_id") REFERENCES "Athlete"("athlete_id");
ALTER TABLE "Athlete_coach" ADD CONSTRAINT "Athlete_coach_fk1" FOREIGN KEY ("coach_id") REFERENCES "Coach"("coach_id");


ALTER TABLE "Athlete_sport" ADD CONSTRAINT "Athlete_sport_fk0" FOREIGN KEY ("athlete_id") REFERENCES "Athlete"("athlete_id");
ALTER TABLE "Athlete_sport" ADD CONSTRAINT "Athlete_sport_fk1" FOREIGN KEY ("sport_id") REFERENCES "Kind_of_sport"("sport_id");

ALTER TABLE "Competition" ADD CONSTRAINT "Competition_fk0" FOREIGN KEY ("sport_id") REFERENCES "Kind_of_sport"("sport_id");
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_fk1" FOREIGN KEY ("facility_id") REFERENCES "Sports_facility"("facility_id");

ALTER TABLE "Facility_sport" ADD CONSTRAINT "Facility_sport_fk0" FOREIGN KEY ("facility_id") REFERENCES "Sports_facility"("facility_id");
ALTER TABLE "Facility_sport" ADD CONSTRAINT "Facility_sport_fk1" FOREIGN KEY ("sport_id") REFERENCES "Kind_of_sport"("sport_id");



ALTER TABLE "Сompetiton_athlete" ADD CONSTRAINT "Сompetiton_athlete_fk0" FOREIGN KEY ("competition_id") REFERENCES "Competition"("competition_id");
ALTER TABLE "Сompetiton_athlete" ADD CONSTRAINT "Сompetiton_athlete_fk1" FOREIGN KEY ("athlete_id") REFERENCES "Athlete"("athlete_id");

ALTER TABLE "Athlete_club" ADD CONSTRAINT "Athlete_club_fk0" FOREIGN KEY ("athlete_id") REFERENCES "Athlete"("athlete_id");
ALTER TABLE "Athlete_club" ADD CONSTRAINT "Athlete_club_fk1" FOREIGN KEY ("club_id") REFERENCES "Club"("club_id");

ALTER TABLE "Competition_organizer" ADD CONSTRAINT "Competition_organizer_fk0" FOREIGN KEY ("organizer_id") REFERENCES "Organizer"("organizer_id");
ALTER TABLE "Competition_organizer" ADD CONSTRAINT "Competition_organizer_fk1" FOREIGN KEY ("competition_id") REFERENCES "Competition"("competition_id");

