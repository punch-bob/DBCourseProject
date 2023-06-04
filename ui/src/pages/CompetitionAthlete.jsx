import React, { useEffect, useState } from 'react';
import Input from '../components/UI/input/Input';
import ListLinks from '../components/UI/list/ListLinks';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Select from '../components/UI/select/Select';
import Modal from '../components/UI/modal/Modal';
import AthleteService from '../api/AthleteService';
import CompetitionService from '../api/CompetitionService';
import CompetitionAthleteService from '../api/CompetitionAthleteService';
import classes from '../styles/Sport.module.css';

const CompetitionAthlete = () => {
    const [activeId, setActiveId] = useState(undefined)
    const [list, setList] = useState([])
    const [list_, setList_] = useState([])
    const [createLink, setCreateLink] = useState(false)
    const [place, setPlace] = useState('')
    const [edit, setEdit] = useState(false)
    const [activeLink, setActiveLink] = useState({})

    const [selectedAthlete, setSelectedAthlete] = useState(0)
    const [selectedCompetition, setSelectedCompetition] = useState(0)
    const [athletes, setAthletes] = useState([])
    const [competitions, setCompetitions] = useState([])

    async function fetchLinks() {
        const l = await CompetitionAthleteService.getAll()
        setList(l)
    }

    async function fetchAthletes() {
        const l = await AthleteService.getAll()
        setAthletes(l)
    }

    async function fetchCompetitions() {
        const l = await CompetitionService.getAll()
        setCompetitions(l)
    }

    async function createNewLink() {
        const res = await CompetitionAthleteService.createCompetitionAthlete(selectedCompetition, selectedAthlete, place)
        setCreateLink(false)
        window.location.reload(false)
    }

    async function deleteLink(id) {
        const res = await CompetitionAthleteService.deleteCompetitionAthlete(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editLink() {
        const res = await CompetitionAthleteService.updateCompetitionAthlete(activeLink.id, activeLink.competition_id, activeLink.athlete_id, activeLink.place)
        setActiveId(undefined)
        window.location.reload(false)
    }

    useEffect(() => {
        if (activeId !== undefined) {
            const l = list.filter(s => s.id === activeId)
            setActiveLink(l[0])
            setEdit(false)
        }
    }, [activeId])

    useEffect(() => {
        let lis = list.map(l => {
            const compName = competitions.find(c => {
                return c.id === l.competition_id
            })?.competition_name

            const ath = athletes.find(a => {
                return a.id === l.athlete_id
            })

            const athName = ath?.first_name + ' ' + ath?.last_name
            return {...l, name_1: compName, name_2: athName, add: "Место: " + l.place}
        })
        setList_(lis)
    }, [list, athletes, competitions])

    useEffect(() => {
        fetchAthletes()
        fetchCompetitions()
        fetchLinks()
    }, [])

    return (
        <div className={classes.wrapper}>
            <h1>Competition athlete links:</h1>
            <div className={classes.listWrapper}>
                <ListLinks list={list_} setActive={setActiveId} deleteFunc={deleteLink} setEdit={setEdit}/>
            </div>
            <div className={classes.buttonWrapper}>
                <TransparentButton onClick={() => setCreateLink(true)}>Create new link</TransparentButton>
            </div>

            {/* Modals */}
            <Modal active={createLink} setActive={setCreateLink}>
                <div className={classes.createAthleteWrapper} style={{alignItems: 'flex-start'}}>
                    <Select 
                        value={selectedCompetition}
                        onChange={f => setSelectedCompetition(f)}
                        title='Соревнование' 
                        options={competitions} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={selectedAthlete}
                        onChange={f => setSelectedAthlete(f)}
                        title='Спортсмен' 
                        options={athletes} 
                        defaultValue={'Не выбрано'}/>
                    <Input 
                        value={place}
                        onChange={e => {setPlace(e.target.value)}}
                        placeholder='Athlete place'/>
                    <TransparentButton onClick={createNewLink}>Create new link</TransparentButton>
                </div>
            </Modal>

            <Modal active={edit} setActive={setEdit}>
                <div className={classes.editWrapper}>
                    <Select 
                        value={activeLink.competition_id}
                        onChange={f => setActiveLink({...activeLink, competition_id: f})}
                        title='Соревнование' 
                        options={competitions} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={activeLink.athlete_id}
                        onChange={f => setActiveLink({...activeLink, athlete_id: f})}
                        title='Спортсмен' 
                        options={athletes} 
                        defaultValue={'Не выбрано'}/>
                    <Input 
                        defaultValue={activeLink.place}
                        onChange={e => setActiveLink({...activeLink, place: +e.target.value})}
                        type='text'
                        placeholder='Athlete place'
                    />
                    <TransparentButton onClick={editLink}>Update link</TransparentButton>
                </div>
            </Modal>
        </div>
    );
};

export default CompetitionAthlete;