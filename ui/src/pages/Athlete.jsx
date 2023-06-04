import React, { useState } from 'react';
import Input from '../components/UI/input/Input';
import Modal from '../components/UI/modal/Modal';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import List from '../components/UI/list/List';
import SimpleList from '../components/UI/list/SimpleList';
import Select from '../components/UI/select/Select';
import Spinner from '../components/UI/spinner/Spinner';
import AthleteService from '../api/AthleteService';
import SportService from '../api/SportService';
import CoachService from '../api/CoachService';
import QueryService from '../api/QueryService';
import classes from '../styles/Athlete.module.css';
import { useEffect } from 'react';

const Athlete = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    const [activeId, setActiveId] = useState(undefined)

    const [createAthlete, setCreateAthlete] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const [selectedRank, setSelectedRank] = useState(0)
    const [selectedRank_, setSelectedRank_] = useState(0)
    const [selectedSport, setSelectedSport] = useState(0)
    const [selectedCoach, setSelectedCoach] = useState(0)

    const [numbOfSports, setNumbOfSports] = useState('')

    const [begin, setBegin] = useState('')
    const [end, setEnd] = useState('')

    const [edit, setEdit] = useState(false)
    const [activeAthl, setActiveAthl] = useState({})

    const [athletes, setAthletes] = useState([]) 
    const [coaches, setCoaches] = useState([]) 

    const ranks = [
        {
            id: 1,
            name: 'Tретий юношеский'
        },
        {
            id: 2,
            name: 'Второй юношеский'
        },
        {
            id: 3,
            name: 'Первый юношеский'
        },
        {
            id: 4,
            name: 'Tретий взрослый'
        },
        {
            id: 5,
            name: 'Второй взрослый'
        },
        {
            id: 6,
            name: 'Первый взрослый'
        },
        {
            id: 7,
            name: 'Кандидат в мастера спорта'
        },
        {
            id: 8,
            name: 'Мастер спорта России'
        },
        {
            id: 9,
            name: 'Мастер спорта России международного класса'
        },
        {
            id: 10,
            name: 'Гроссмейстер России'
        },
    ]

    const [sports, setSports] = useState([])

    const [q1, setQ1] = useState(false)
    const [sportRankList, setSportRankList] = useState([])

    const [q2, setQ2] = useState(false)
    const [coachRankList, setCoachRankList] = useState([])

    const [q3, setQ3] = useState(false)
    const [moreSportList, setMoreSportList] = useState([])

    const [q4, setQ4] = useState(false)
    const [periodList, setPeriodList] = useState([])

    async function fetchAthletes() {
        const athl = await AthleteService.getAll()
        setAthletes(athl)
    }

    async function fetchCoaches() {
        const coach = await CoachService.getAll()
        setCoaches(coach)
    }

    async function fetchSports() {
        const sport = await SportService.getAll()
        setSports(sport)
    }

    async function createNewAthlete() {
        const res = await AthleteService.createAthlete(name, surname)
        setCreateAthlete(false)
        window.location.reload(false)
    }

    async function deleteAthlete(id) {
        const res = await AthleteService.deleteAthlete(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editAthlete() {
        const res = await AthleteService.updateAthlete(activeAthl.id, activeAthl.first_name, activeAthl.last_name)
        setActiveId(undefined)
        window.location.reload(false)
    }

    // Query

    async function getAthleteBySportRank() {
        const res = await QueryService.getAthleteBySportRank(selectedSport, selectedRank)
        setSportRankList(res)
        setQ1(true)
    }

    async function getAthleteByCoachRank() {
        const res = await QueryService.getAthleteByCoachRank(selectedCoach, selectedRank_)
        setCoachRankList(res)
        setQ2(true)
    }

    async function getAthleteByNumbOfSport() {
        const res = await QueryService.getAthleteByNumbOfSport(numbOfSports)
        setMoreSportList(res.map(r => ({...r, add: r.sport_name})))
        setQ3(true)
    }

    async function getAthleteByPeriod() {
        const res = await QueryService.getAthleteByPeriod(begin, end)
        setPeriodList(res)
        setQ4(true)
    }

    useEffect(() => {
        if (activeId !== undefined) {
            const ath = athletes.filter(a => a.id === activeId)
            setActiveAthl(ath[0])
            setEdit(false)
        }
    }, [activeId])

    useEffect(() => {
        fetchAthletes()
        fetchSports()
        fetchCoaches()
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
                        value={selectedRank}
                        onChange={rank => setSelectedRank(rank)}
                        title='Разряд' 
                        options={ranks} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={selectedSport}
                        onChange={sportId => setSelectedSport(sportId)}
                        title='Вид спорта' 
                        options={sports} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton disabled={+selectedRank === 0 && +selectedSport === 0} onClick={getAthleteBySportRank}>Filter athletes</TransparentButton>
                </div>

                <div className={classes.filterWrapper}>
                    <Select 
                        value={selectedRank_}
                        onChange={rank => setSelectedRank_(rank)}
                        title='Разряд' 
                        options={ranks} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={selectedCoach}
                        onChange={coachId => setSelectedCoach(coachId)}
                        title='Тренер' 
                        options={coaches} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton disabled={+selectedRank === 0 && +selectedCoach === 0} onClick={getAthleteByCoachRank}>Filter athletes</TransparentButton>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', width: '40vw', justifyContent: 'space-between'}}>
                    <div className={classes.inputWrapper}>
                        <Input 
                            value={numbOfSports}
                            onChange={e => setNumbOfSports(e.target.value)}
                            placeholder='Введите минимальное число видов спорта'
                        />
                    </div>
                    <TransparentButton disabled={numbOfSports === ''} onClick={getAthleteByNumbOfSport}>Get athletes</TransparentButton>
                </div>

                <h3>Не участвовали за период:</h3>
                <div style={{display: 'flex', alignItems: 'center', width: '40vw', justifyContent: 'space-between'}}>
                    <div className={classes.inputWrapper}>
                        <Input 
                            value={begin}
                            onChange={e => setBegin(e.target.value)}
                            placeholder='Введите дату начала'
                        />
                        <Input 
                            value={end}
                            onChange={e => setEnd(e.target.value)}
                            placeholder='Введите дату окончания'
                        />
                    </div>
                    <TransparentButton disabled={begin === '' || end === ''} onClick={getAthleteByPeriod}>Get athletes</TransparentButton>
                </div>

                <div className={classes.listWrapper}>
                    <h1>Athletes:</h1>
                    <List list={athletes} setActive={setActiveId} deleteFunc={deleteAthlete} setEdit={setEdit}/>
                </div>
                <div className={classes.buttonWrapper}>
                    <TransparentButton onClick={() => setCreateAthlete(true)}>Create new athlete</TransparentButton>
                </div>
                
                
                {/* Modals */}
                <Modal active={createAthlete} setActive={setCreateAthlete}>
                    <div className={classes.createAthleteWrapper}>
                        <Input 
                            value={name}
                            onChange={e => {setName(e.target.value)}}
                            placeholder='First name'/>
                        <Input 
                            value={surname}
                            onChange={e => {setSurname(e.target.value)}}
                            placeholder='Last name'/>
                        <TransparentButton onClick={createNewAthlete}>Create new athlete</TransparentButton>
                    </div>
                </Modal>

                <Modal active={edit} setActive={setEdit}>
                    <div className={classes.createAthleteWrapper}>
                        <Input 
                            defaultValue={activeAthl.first_name}
                            onChange={e => setActiveAthl({...activeAthl, first_name: e.target.value})}
                            type='text'
                            placeholder='First name'
                        />
                        <Input 
                            defaultValue={activeAthl.last_name}
                            onChange={e => setActiveAthl({...activeAthl, last_name: e.target.value})}
                            type='text'
                            placeholder='Last name'
                        />
                        <TransparentButton onClick={editAthlete}>Update athlete</TransparentButton>
                    </div>
                </Modal>

                <Modal active={q1} setActive={setQ1}>
                    <div>
                        <h1>Athletes:</h1>
                        <SimpleList list={sportRankList}/>
                    </div>
                </Modal>

                <Modal active={q2} setActive={setQ2}>
                    <div>
                        <h1>Athletes:</h1>
                        <SimpleList list={coachRankList}/>
                    </div>
                </Modal>

                <Modal active={q3} setActive={setQ3}>
                    <div>
                        <h1>Athletes:</h1>
                        <SimpleList list={moreSportList}/>
                    </div>
                </Modal>

                <Modal active={q4} setActive={setQ4}>
                    <div>
                        <h1>Athletes:</h1>
                        <SimpleList list={periodList}/>
                    </div>
                </Modal>
            </>
            }
            
        </div>
    );
};

export default Athlete;