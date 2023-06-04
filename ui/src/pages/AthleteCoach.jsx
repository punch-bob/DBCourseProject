import React, { useEffect, useState } from 'react';
import ListLinks from '../components/UI/list/ListLinks';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Select from '../components/UI/select/Select';
import Modal from '../components/UI/modal/Modal';
import AthleteService from '../api/AthleteService';
import CoachService from '../api/CoachService';
import AthleteCoachService from '../api/AthleteCoachService';
import classes from '../styles/Sport.module.css';

const AthleteCoach = () => {
    const [activeId, setActiveId] = useState(undefined)
    const [list, setList] = useState([])
    const [list_, setList_] = useState([])
    const [createLink, setCreateLink] = useState(false)
    const [edit, setEdit] = useState(false)
    const [activeLink, setActiveLink] = useState({})

    const [selectedAthlete, setSelectedAthlete] = useState(0)
    const [selectedCoach, setSelectedCoach] = useState(0)
    const [athletes, setAthletes] = useState([])
    const [coaches, setCoaches] = useState([])

    async function fetchLinks() {
        const l = await AthleteCoachService.getAll()
        setList(l)
    }

    async function fetchAthletes() {
        const f = await AthleteService.getAll()
        setAthletes(f)
    }

    async function fetchCoaches() {
        const s = await CoachService.getAll()
        setCoaches(s)
    }

    async function createNewLink() {
        const res = await AthleteCoachService.createAthleteCoach(selectedAthlete, selectedCoach)
        setCreateLink(false)
        window.location.reload(false)
    }

    async function deleteLink(id) {
        const res = await AthleteCoachService.deleteAthleteCoach(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editLink() {
        const res = await AthleteCoachService.updateAthleteCoach(activeLink.id, activeLink.athlete_id, activeLink.coach_id)
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
            const ath = athletes.find(c => {
                return c.id === l.athlete_id
            })
            
            const athName = ath?.first_name + ' ' + ath?.last_name

            const coach = coaches.find(c => {
                return c.id === l.coach_id
            })
            
            const coachName = coach?.first_name + ' ' + coach?.last_name

            return {...l, name_1: athName, name_2: coachName}
        })
        setList_(lis)
    }, [list, athletes, coaches])

    useEffect(() => {
        fetchAthletes()
        fetchCoaches()
        fetchLinks()
    }, [])

    return (
        <div className={classes.wrapper}>
            <h1>Athlete coaches links:</h1>
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
                        value={selectedAthlete}
                        onChange={f => setSelectedAthlete(f)}
                        title='Спортсмен' 
                        options={athletes} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={selectedCoach}
                        onChange={f => setSelectedCoach(f)}
                        title='Тренер' 
                        options={coaches} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton onClick={createNewLink} disable={+selectedAthlete === 0 || +selectedCoach === 0}>Create new link</TransparentButton>
                </div>
            </Modal>

            <Modal active={edit} setActive={setEdit}>
                <div className={classes.editWrapper}>
                    <Select 
                        value={activeLink.athlete_id}
                        onChange={f => setActiveLink({...activeLink, athlete_id: f})}
                        title='Спортсмен' 
                        options={athletes} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={activeLink.coach_id}
                        onChange={f => setActiveLink({...activeLink, coach_id: f})}
                        title='Тренер' 
                        options={coaches} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton onClick={editLink} disable={+activeLink.athlete_id === 0 || +activeLink.coach_id === 0}>Update link</TransparentButton>
                </div>
            </Modal>
        </div>
    );
};

export default AthleteCoach;