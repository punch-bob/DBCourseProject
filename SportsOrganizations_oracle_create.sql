CREATE TABLE public.Attribute (
 "attribute_id" serial NOT NULL,
 "capacity" integer,
 "coating_type_id" integer,
 "participants_capacity" integer,
 "track_length" integer,
 CONSTRAINT "Attribute_pk" PRIMARY KEY ("attribute_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Coating_type (
 "coating_type_id" serial NOT NULL,
 "coating_type_name" TEXT NOT NULL,
 CONSTRAINT "Coating_type_pk" PRIMARY KEY ("coating_type_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Sports_facility (
 "facility_id" serial NOT NULL,
 "attribute_id" integer NOT NULL,
 "facility_name" TEXT NOT NULL,
 "facility_type_id" integer NOT NULL,
 CONSTRAINT "Sports_facility_pk" PRIMARY KEY ("facility_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Type_of_facility (
 "type_id" serial NOT NULL,
 "type_name" TEXT NOT NULL,
 CONSTRAINT "Type_of_facility_pk" PRIMARY KEY ("type_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Competition_athlete (
 "id" serial NOT NULL,
 "competition_id" integer NOT NULL,
 "athlete_id" integer NOT NULL,
 "place" integer NOT NULL,
 CONSTRAINT "Competition_athlete_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Organizer (
 "organizer_id" serial NOT NULL,
 "organizer_name" TEXT NOT NULL,
 CONSTRAINT "Organizer_pk" PRIMARY KEY ("organizer_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Competition_organizer (
 "id" serial NOT NULL,
 "organizer_id" integer NOT NULL,
 "competition_id" integer NOT NULL,
 CONSTRAINT "Competition_organizer_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Competition (
 "competition_id" serial NOT NULL,
 "sport_id" integer NOT NULL,
 "facility_id" integer NOT NULL,
 "start_date" TIMESTAMP NOT NULL,
 "end_date" TIMESTAMP NOT NULL,
 "competition_name" TEXT NOT NULL,
 CONSTRAINT "Competition_pk" PRIMARY KEY ("competition_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Facility_sport (
 "id" serial NOT NULL,
 "facility_id" integer NOT NULL,
 "sport_id" integer NOT NULL,
 CONSTRAINT "Facility_sport_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Athlete (
 "athlete_id" serial NOT NULL,
 "first_name" TEXT NOT NULL,
 "last_name" TEXT NOT NULL,
 CONSTRAINT "Athlete_pk" PRIMARY KEY ("athlete_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Athlete_club (
 "id" serial NOT NULL,
 "athlete_id" integer NOT NULL,
 "club_id" integer NOT NULL,
 CONSTRAINT "Athlete_club_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Club (
 "club_id" serial NOT NULL,
 "club_name" TEXT NOT NULL,
 CONSTRAINT "Club_pk" PRIMARY KEY ("club_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Athlete_sport (
 "id" serial NOT NULL,
 "athlete_id" integer NOT NULL,
 "sport_id" integer NOT NULL,
 "athlete_rank" integer NOT NULL,
 CONSTRAINT "Athlete_sport_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Kind_of_sport (
 "sport_id" serial NOT NULL,
 "sport_name" TEXT NOT NULL,
 CONSTRAINT "Kind_of_sport_pk" PRIMARY KEY ("sport_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Coach (
 "coach_id" serial NOT NULL,
 "first_name" TEXT NOT NULL,
 "last_name" TEXT NOT NULL,
 "sport_id" integer NOT NULL,
 CONSTRAINT "Coach_pk" PRIMARY KEY ("coach_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.Athlete_coach (
 "id" serial NOT NULL,
 "athlete_id" integer NOT NULL,
 "coach_id" integer NOT NULL,
 CONSTRAINT "Athlete_coach_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE Attribute ADD CONSTRAINT "Attribute_fk0" FOREIGN KEY ("coating_type_id") REFERENCES Coating_type("coating_type_id");

ALTER TABLE Sports_facility ADD CONSTRAINT "Sports_facility_fk0" FOREIGN KEY ("attribute_id") REFERENCES Attribute("attribute_id");

ALTER TABLE Sports_facility ADD CONSTRAINT "Sports_facility_fk1" FOREIGN KEY ("facility_type_id") REFERENCES Type_of_facility("type_id");

ALTER TABLE Competition_athlete ADD CONSTRAINT "Competition_athlete_fk0" FOREIGN KEY ("competition_id") REFERENCES Competition("competition_id");

ALTER TABLE Competition_athlete ADD CONSTRAINT "Competition_athlete_fk1" FOREIGN KEY ("athlete_id") REFERENCES Athlete("athlete_id");

ALTER TABLE Competition_organizer ADD CONSTRAINT "Competition_organizer_fk0" FOREIGN KEY ("organizer_id") REFERENCES Organizer("organizer_id");

ALTER TABLE Competition_organizer ADD CONSTRAINT "Competition_organizer_fk1" FOREIGN KEY ("competition_id") REFERENCES Competition("competition_id");

ALTER TABLE Competition ADD CONSTRAINT "Competition_fk0" FOREIGN KEY ("facility_id") REFERENCES Sports_facility("facility_id");

ALTER TABLE Facility_sport ADD CONSTRAINT "Facility_sport_fk0" FOREIGN KEY ("facility_id") REFERENCES Sports_facility("facility_id");

ALTER TABLE Athlete_club ADD CONSTRAINT "Athlete_club_fk0" FOREIGN KEY ("athlete_id") REFERENCES Athlete("athlete_id");

ALTER TABLE Athlete_club ADD CONSTRAINT "Athlete_club_fk1" FOREIGN KEY ("club_id") REFERENCES Club("club_id");

ALTER TABLE Athlete_sport ADD CONSTRAINT "Athlete_sport_fk0" FOREIGN KEY ("athlete_id") REFERENCES Athlete("athlete_id");

ALTER TABLE Athlete_sport ADD CONSTRAINT "Athlete_sport_fk1" FOREIGN KEY ("sport_id") REFERENCES Kind_of_sport("sport_id");

ALTER TABLE Coach ADD CONSTRAINT "Coach_fk0" FOREIGN KEY ("sport_id") REFERENCES Kind_of_sport("sport_id");

ALTER TABLE Athlete_coach ADD CONSTRAINT "Athlete_coach_fk0" FOREIGN KEY ("athlete_id") REFERENCES Athlete("athlete_id");

ALTER TABLE Athlete_coach ADD CONSTRAINT "Athlete_coach_fk1" FOREIGN KEY ("coach_id") REFERENCES Coach("coach_id");
