import React, { useEffect } from 'react';
import { useState } from 'react';
import Input from '../components/UI/input/Input';
import List from '../components/UI/list/List';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Modal from '../components/UI/modal/Modal';
import Spinner from '../components/UI/spinner/Spinner';
import Select from '../components/UI/select/Select';
import SimpleList from '../components/UI/list/SimpleList';
import CoachService from '../api/CoachService';
import SportService from '../api/SportService';
import AthleteService from '../api/AthleteService';
import QueryService from '../api/QueryService';
import classes from '../styles/Club.module.css';

const Coach = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeId, setActiveId] = useState(undefined)
    const [coaches, setCoaches] = useState([])
    const [createCoach, setCreateCoach] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [edit, setEdit] = useState(false)

    const [activeCoach, setActiveCoach] = useState({})

    const [selectedAthlete, setSelectedAthlete] = useState(0)
    const [athletes, setAthletes] = useState([])
    const [selectedSport, setSelectedSport] = useState(0)
    const [sports, setSports] = useState([])

    const [q1, setQ1] = useState(false)
    const [byAthList, setByAthList] = useState([])

    const [q2, setQ2] = useState(false)
    const [bySportList, setBySportList] = useState([])

    async function fetchCoaches() {
        const coach = await CoachService.getAll()
        setCoaches(coach)
    }

    async function fetchAthletes() {
        const ath = await AthleteService.getAll()
        setAthletes(ath)
    }

    async function fetchSports() {
        const sport = await SportService.getAll()
        setSports(sport)
    }

    async function createNewCoach() {
        const res = await CoachService.createCoach(name, surname)
        setCreateCoach(false)
        window.location.reload(false)
    }

    async function deleteCoach(id) {
        const res = await CoachService.deleteCoach(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editCoach() {
        const res = await CoachService.updateCoach(activeCoach.id, activeCoach.first_name, activeCoach.last_name)
        setActiveId(undefined)
        window.location.reload(false)
    }

    // Query

    async function getCoachByAthlete() {
        const res = await QueryService.getCoachByAthlete(selectedAthlete)
        setByAthList(res)
        setQ1(true)
    }

    async function getCoachBySport() {
        const res = await QueryService.getCoachBySport(selectedSport)
        setBySportList(res)
        setQ2(true)
    }

    useEffect(() => {
        if (activeId !== undefined) {
            const coach = coaches.filter(s => s.id === activeId)
            setActiveCoach(coach[0])
            setEdit(false)
        }
    }, [activeId])

    useEffect(() => {
        fetchCoaches()
        fetchAthletes()
        fetchSports()
        setIsLoaded(true)
    }, [])

    return (
        <div className={classes.wrapper}>
            {!isLoaded
            ? <div className={classes.spinnerWrapper}><Spinner /></div>
            : 
            <>
                <div className={classes.filterWrapper}>
                    <Select 
                        value={selectedSport}
                        onChange={sport => setSelectedSport(sport)}
                        title='Вид спорта' 
                        options={sports} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton disabled={+selectedSport === 0} onClick={getCoachBySport}>Get coaches</TransparentButton>
                </div>

                <div className={classes.filterWrapper}>
                    <Select 
                        value={selectedAthlete}
                        onChange={sport => setSelectedAthlete(sport)}
                        title='Спортсмен' 
                        options={athletes} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton disabled={+selectedAthlete === 0} onClick={getCoachByAthlete}>Get coaches</TransparentButton>
                </div>

                <div className={classes.listWrapper}>
                    <h1>Coaches:</h1>
                    <List list={coaches} setActive={setActiveId} deleteFunc={deleteCoach} setEdit={setEdit}/>
                    <TransparentButton onClick={() => setCreateCoach(true)}>Create new coach</TransparentButton>
                </div>

                {/* Modals */}
                <Modal active={createCoach} setActive={setCreateCoach}>
                    <div className={classes.createAthleteWrapper}>
                        <Input 
                            value={name}
                            onChange={e => {setName(e.target.value)}}
                            placeholder='First name'/>
                        <Input 
                            value={surname}
                            onChange={e => {setSurname(e.target.value)}}
                            placeholder='Last name'/>
                        <TransparentButton onClick={createNewCoach}>Create new coach</TransparentButton>
                    </div>
                </Modal>

                <Modal active={edit} setActive={setEdit}>
                    <div className={classes.editWrapper}>
                        <Input 
                            defaultValue={activeCoach.first_name}
                            onChange={e => setActiveCoach({...activeCoach, first_name: e.target.value})}
                            type='text'
                            placeholder='First name'
                        />
                        <Input 
                            defaultValue={activeCoach.last_name}
                            onChange={e => setActiveCoach({...activeCoach, last_name: e.target.value})}
                            type='text'
                            placeholder='Last name'
                        />
                        <TransparentButton onClick={editCoach}>Update coach</TransparentButton>
                    </div>
                </Modal>

                <Modal active={q1} setActive={setQ1}>
                    <div>
                        <h1>Coaches:</h1>
                        <SimpleList list={byAthList}/>
                    </div>
                </Modal>

                <Modal active={q2} setActive={setQ2}>
                    <div>
                        <h1>Coaches:</h1>
                        <SimpleList list={bySportList}/>
                    </div>
                </Modal>
            </>
            }
        </div>
    );
};

export default Coach;