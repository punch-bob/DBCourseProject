import React, { useEffect, useState } from 'react';
import ListLinks from '../components/UI/list/ListLinks';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Select from '../components/UI/select/Select';
import Modal from '../components/UI/modal/Modal';
import AthleteService from '../api/AthleteService';
import ClubService from '../api/ClubServices';
import AthleteClubService from '../api/AthleteClubService';
import classes from '../styles/Sport.module.css';

const AthleteClub = () => {
    const [activeId, setActiveId] = useState(undefined)
    const [list, setList] = useState([])
    const [list_, setList_] = useState([])
    const [createLink, setCreateLink] = useState(false)
    const [edit, setEdit] = useState(false)
    const [activeLink, setActiveLink] = useState({})

    const [selectedAthlete, setSelectedAthlete] = useState(0)
    const [selectedClub, setSelectedClub] = useState(0)
    const [athletes, setAthletes] = useState([])
    const [clubs, setClubs] = useState([])

    async function fetchLinks() {
        const l = await AthleteClubService.getAll()
        setList(l)
    }

    async function fetchAthletes() {
        const f = await AthleteService.getAll()
        setAthletes(f)
    }

    async function fetchClubs() {
        const s = await ClubService.getAll()
        setClubs(s)
    }

    async function createNewLink() {
        const res = await AthleteClubService.createAthleteClub(selectedAthlete, selectedClub)
        setCreateLink(false)
        window.location.reload(false)
    }

    async function deleteLink(id) {
        const res = await AthleteClubService.deleteAthleteClub(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editLink() {
        const res = await AthleteClubService.updateAthleteClub(activeLink.id, activeLink.athlete_id, activeLink.club_id)
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

            const clubName = clubs.find(a => {
                return a.id === l.club_id
            })?.club_name

            return {...l, name_1: athName, name_2: clubName}
        })
        setList_(lis)
    }, [list, athletes, clubs])

    useEffect(() => {
        fetchAthletes()
        fetchClubs()
        fetchLinks()
    }, [])

    return (
        <div className={classes.wrapper}>
            <h1>Athlete club links:</h1>
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
                        value={selectedClub}
                        onChange={f => setSelectedClub(f)}
                        title='Клуб' 
                        options={clubs} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton onClick={createNewLink} disable={+selectedAthlete === 0 || +selectedClub === 0}>Create new link</TransparentButton>
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
                        value={activeLink.club_id}
                        onChange={f => setActiveLink({...activeLink, club_id: f})}
                        title='Клуб' 
                        options={clubs} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton onClick={editLink} disable={+activeLink.athlete_id === 0 || +activeLink.club_id === 0}>Update link</TransparentButton>
                </div>
            </Modal>
        </div>
    );
};

export default AthleteClub;