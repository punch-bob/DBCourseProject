import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Athlete from "./pages/Athlete";
import Club from "./pages/Club";
import Coach from "./pages/Coach";
import Organizer from "./pages/Organizer";
import Competition from "./pages/Competition";
import SportsFacility from "./pages/SportsFacility";
import HeaderLayout from "./components/HeaderLayout";
import AthleteClub from "./pages/AthleteClub";
import AthleteSport from "./pages/AthleteSport";
import AthleteCoach from "./pages/AthleteCoach";
import CompetitionAthlete from "./pages/CompetitionAthlete";
import CompetitionOrganizer from "./pages/CompetitionOrganizer";
import FacilitySport from "./pages/FacilitySport";
import Sport from "./pages/Sport";
import CoatingType from "./pages/CoatingType";
import TypeOfFacility from "./pages/TypeOfFacility";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout/>}>
          <Route exact path="/" element={<Navigate replace to="/athlete"/>} />
          <Route exact path="/athlete" element={<Athlete/>}/>
          <Route exact path="/club" element={<Club/>}/>
          <Route exact path="/coach" element={<Coach/>}/>
          <Route exact path="/organizer" element={<Organizer/>}/>
          <Route exact path="/competition" element={<Competition/>}/>
          <Route exact path="/sports-facility" element={<SportsFacility/>}/>
          <Route exact path="/club-athlete" element={<AthleteClub/>}/>
          <Route exact path="/sport-athlete" element={<AthleteSport/>}/>
          <Route exact path="/coach-athlete" element={<AthleteCoach/>}/>
          <Route exact path="/comp-athlete" element={<CompetitionAthlete/>}/>
          <Route exact path="/comp-organizer" element={<CompetitionOrganizer/>}/>
          <Route exact path="/facility-sport" element={<FacilitySport/>}/>
          <Route exact path="/sports" element={<Sport/>}/>
          <Route exact path="/coating-type" element={<CoatingType/>}/>
          <Route exact path="/type-of-facility" element={<TypeOfFacility/>}/>
        </Route>
      </Routes>      
    </BrowserRouter>
  );
}

export default App;
