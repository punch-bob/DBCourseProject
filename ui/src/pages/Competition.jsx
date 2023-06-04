import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';
import Input from '../components/UI/input/Input';
import List from '../components/UI/list/List';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Modal from '../components/UI/modal/Modal';
import Spinner from '../components/UI/spinner/Spinner';
import Select from '../components/UI/select/Select';
import SimpleList from '../components/UI/list/SimpleList';
import CompetitionService from '../api/CompetitionService';
import FacilityService from '../api/FacilityService';
import SportService from '../api/SportService';
import OrganizerService from '../api/OrganizerService';
import QueryService from '../api/QueryService';
import classes from '../styles/Club.module.css';

const Competition = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeId, setActiveId] = useState(undefined)
    const [competitions, setCompetitions] = useState([])
    const [createCompetiton, setCreateCompetition] = useState(false)

    const [selectedFacility, setSelectedFacility] = useState(0)
    const [facilities, setFacilities] = useState([])
    const [selectedSport, setSelectedSport] = useState(0)
    const [sports, setSports] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [competitionName, setCompetitionName] = useState('')
    const [edit, setEdit] = useState(false)
    const [activeCompetition, setActiveCompetition] = useState({})

    const [selectedSport_, setSelectedSport_] = useState(0)
    const [selectedFacility_, setSelectedFacility_] = useState(0)
    const [selectedOrganizer, setSelectedOrganizer] = useState(0)
    const [organizers, setOrganizers] = useState([])

    const [begin, setBegin] = useState('')
    const [end, setEnd] = useState('')

    const [q1, setQ1] = useState(false)
    const [periodList, setPeriodList] = useState([])

    const [q2, setQ2] = useState(false)
    const [facilitySportList, setFacilitySportList] = useState([])

    const [q3, setQ3] = useState(false)
    const [winnersList, setWinnersList] = useState([])

    async function fetchCompetitions() {
        const comp = await CompetitionService.getAll()
        setCompetitions(comp)
    }

    async function fetchSports() {
        const sport = await SportService.getAll()
        setSports(sport)
    }

    async function fetchFacilities() {
        const facil = await FacilityService.getAll()
        setFacilities(facil)
    }

    async function fetchOrganizers() {
        const orgs = await OrganizerService.getAll()
        setOrganizers(orgs)
    }

    async function createNewCompetition() {
        const res = await CompetitionService.createCompetition(selectedSport, selectedFacility, startDate, endDate, competitionName)
        setCreateCompetition(false)
        window.location.reload(false)
    }

    async function deleteCompetition(id) {
        const res = await CompetitionService.deleteCompetition(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editCompetition() {
        const res = await CompetitionService.updateCompetition(
                                                                activeCompetition.id, 
                                                                activeCompetition.sport_id, 
                                                                activeCompetition.facility_id, 
                                                                activeCompetition.start_date, 
                                                                activeCompetition.end_date, 
                                                                activeCompetition.competition_name)
        setActiveId(undefined)
        window.location.reload(false)
    }

    // Query

    async function getCompByPeriodOrg() {
        const res = await QueryService.getCompByPeriodOrg(begin, end, selectedOrganizer)
        setPeriodList(res)
        setQ1(true)
    }

    async function getCompByFacilitySport() {
        const res = await QueryService.getCompByFacilitySport(selectedFacility_, selectedSport_)
        setFacilitySportList(res)
        setQ2(true)
    }

    async function getCompTop() {
        const res = await QueryService.getCompTop(activeId)
        setWinnersList(res.map(r => ({...r, add: "Место: " + r.place})))
        setQ3(true)
    }

    useEffect(() => {
        if (activeId !== undefined) {
            const comp = competitions.filter(s => s.id === activeId)
            setActiveCompetition(comp[0])
            setEdit(false)
        }
    }, [activeId])

    useEffect(() => {
        fetchCompetitions()
        fetchFacilities()
        fetchSports()
        fetchOrganizers()
        setIsLoaded(true)
    }, [])

    const formateDate = date => {
        let d = new Date(date)
        console.log(d.toLocaleDateString())
        return d.toLocaleDateString()
    }

    return (
        <div className={classes.wrapper}>
            {!isLoaded
            ? <div className={classes.spinnerWrapper}><Spinner /></div>
            : 
            <>
                <h3>Соревнования за период:</h3>
                <div style={{display: 'flex', alignItems: 'center', width: '63vw', gap: '20px'}}>
                    <div className={classes.inputWrapper} style={{width: '50vw'}}>
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
                        <Select 
                        value={selectedOrganizer}
                        onChange={org => setSelectedOrganizer(org)}
                        title='Организатор' 
                        options={organizers} 
                        defaultValue={'Не выбрано'}/>
                    </div>
                    <TransparentButton disabled={(begin === '' || end === '') && +selectedOrganizer === 0} onClick={getCompByPeriodOrg}>Get competitions</TransparentButton>
                </div>

                <div className={classes.filterWrapper}>
                    <Select 
                        value={selectedSport_}
                        onChange={sport => setSelectedSport_(sport)}
                        title='Вид спорта' 
                        options={sports} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={selectedFacility_}
                        onChange={f => setSelectedFacility_(f)}
                        title='Сооружение' 
                        options={facilities} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton disabled={+selectedFacility_ === 0 && +selectedSport_ === 0} onClick={getCompByFacilitySport}>Get competitions</TransparentButton>
                </div>

                <div className={classes.listWrapper}>
                    <h1>Competitions:</h1>
                    <List list={competitions} setActive={setActiveId} deleteFunc={deleteCompetition} setEdit={setEdit}/>
                    <TransparentButton onClick={() => setCreateCompetition(true)}>Create new competition</TransparentButton>
                    <TransparentButton disabled={activeId === undefined} onClick={getCompTop}>Get winners</TransparentButton>
                </div>

                {/* Modals */}
                <Modal active={createCompetiton} setActive={setCreateCompetition}>
                    <div className={classes.createAthleteWrapper}>
                        <Select 
                            value={selectedSport}
                            onChange={sport => setSelectedSport(sport)}
                            title='Вид спорта' 
                            options={sports} 
                            defaultValue={'Не выбрано'}/>
                        <Select 
                            value={selectedFacility}
                            onChange={f => setSelectedFacility(f)}
                            title='Сооружение' 
                            options={facilities} 
                            defaultValue={'Не выбрано'}/>
                        <Input 
                            value={startDate}
                            onChange={e => {setStartDate(e.target.value)}}
                            placeholder='Начало соревнований'/>
                        <Input 
                            value={endDate}
                            onChange={e => {setEndDate(e.target.value)}}
                            placeholder='Конец соревнований'/>
                        <Input 
                            value={competitionName}
                            onChange={e => {setCompetitionName(e.target.value)}}
                            placeholder='Competition name'/>
                        <TransparentButton onClick={createNewCompetition}>Create new competition</TransparentButton>
                    </div>
                </Modal>

                <Modal active={edit} setActive={setEdit}>
                    <div className={classes.editWrapper}>
                        <Select 
                            value={activeCompetition.sport_id}
                            onChange={e => setActiveCompetition({...activeCompetition, sport_id: e})}
                            title='Вид спорта' 
                            options={sports} 
                            defaultValue={'Не выбрано'}/>
                        <Select 
                            value={activeCompetition.facility_id}
                            onChange={e => setActiveCompetition({...activeCompetition, facility_id: e})}
                            title='Сооружение' 
                            options={facilities} 
                            defaultValue={'Не выбрано'}/>
                        <Input 
                            defaultValue={activeCompetition.start_date}
                            onChange={e => setActiveCompetition({...activeCompetition, start_date: e.target.value})}
                            placeholder='Начало соревнований'/>
                        <Input 
                            defaultValue={activeCompetition.end_date}
                            onChange={e => setActiveCompetition({...activeCompetition, end_date: e.target.value})}
                            placeholder='Конец соревнований'/>
                        <Input 
                            defaultValue={activeCompetition.competition_name}
                            onChange={e => setActiveCompetition({...activeCompetition, competition_name: e.target.value})}
                            type='text'
                            placeholder='Competition name'
                        />
                        <TransparentButton onClick={editCompetition}>Update competition</TransparentButton>
                    </div>
                </Modal>

                <Modal active={q1} setActive={setQ1}>
                    <div>
                        <h1>Competitions:</h1>
                        <SimpleList list={periodList}/>
                    </div>
                </Modal>

                <Modal active={q2} setActive={setQ2}>
                    <div>
                        <h1>Competitions:</h1>
                        <SimpleList list={facilitySportList}/>
                    </div>
                </Modal>

                <Modal active={q3} setActive={setQ3}>
                    <div>
                        <h1>Winners:</h1>
                        <SimpleList list={winnersList}/>
                    </div>
                </Modal>
            </>
            }
        </div>
    );
};

export default Competition;