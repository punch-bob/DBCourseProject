import React, { useEffect, useState } from 'react';
import ListLinks from '../components/UI/list/ListLinks';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Select from '../components/UI/select/Select';
import Modal from '../components/UI/modal/Modal';
import AthleteService from '../api/AthleteService';
import SportService from '../api/SportService';
import AthleteSportService from '../api/AthleteSportService';
import classes from '../styles/Sport.module.css';

const AthleteSport = () => {
    const [activeId, setActiveId] = useState(undefined)
    const [list, setList] = useState([])
    const [list_, setList_] = useState([])
    const [createLink, setCreateLink] = useState(false)
    const [edit, setEdit] = useState(false)
    const [activeLink, setActiveLink] = useState({})

    const [selectedAthlete, setSelectedAthlete] = useState(0)
    const [selectedSport, setSelectedSport] = useState(0)
    const [athletes, setAthletes] = useState([])
    const [sports, setSports] = useState([])

    const [selectedRank, setSelectedRank] = useState(0)
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

    async function fetchLinks() {
        const l = await AthleteSportService.getAll()
        setList(l)
    }

    async function fetchAthletes() {
        const f = await AthleteService.getAll()
        setAthletes(f)
    }

    async function fetchSports() {
        const s = await SportService.getAll()
        setSports(s)
    }

    async function createNewLink() {
        const res = await AthleteSportService.createAthleteSport(selectedAthlete, selectedSport, selectedRank)
        setCreateLink(false)
        window.location.reload(false)
    }

    async function deleteLink(id) {
        const res = await AthleteSportService.deleteAthleteSport(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editLink() {
        const res = await AthleteSportService.updateAthleteSport(activeLink.id, activeLink.athlete_id, activeLink.sport_id, activeLink.athlete_rank)
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

            const sportName = sports.find(a => {
                return a.id === l.sport_id
            })?.sport_name

            const add = ranks.find(r => {
                return r.id === l.athlete_rank
            })?.name

            return {...l, name_1: athName, name_2: sportName, add: 'Разряд: ' + add}
        })
        setList_(lis)
    }, [list, athletes, sports])

    useEffect(() => {
        fetchAthletes()
        fetchSports()
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
                        value={selectedSport}
                        onChange={f => setSelectedSport(f)}
                        title='Вид спорта' 
                        options={sports} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={selectedRank}
                        onChange={f => setSelectedRank(f)}
                        title='Разряд' 
                        options={ranks} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton onClick={createNewLink}>Create new link</TransparentButton>
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
                        value={activeLink.sport_id}
                        onChange={f => setActiveLink({...activeLink, sport_id: f})}
                        title='Вид спорта' 
                        options={sports} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={activeLink.athlete_rank}
                        onChange={f => setActiveLink({...activeLink, athlete_rank: f})}
                        title='Разряд' 
                        options={ranks} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton onClick={editLink}>Update link</TransparentButton>
                </div>
            </Modal>
        </div>
    );
};

export default AthleteSport;