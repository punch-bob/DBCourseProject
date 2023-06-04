import React, { useEffect, useState } from 'react';
import ListLinks from '../components/UI/list/ListLinks';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Select from '../components/UI/select/Select';
import Modal from '../components/UI/modal/Modal';
import OrganizerService from '../api/OrganizerService';
import CompetitionService from '../api/CompetitionService';
import CompetitionOrganizerService from '../api/CompetitionOrganizerService';
import classes from '../styles/Sport.module.css';

const CompetitionOrganizer = () => {
    const [activeId, setActiveId] = useState(undefined)
    const [list, setList] = useState([])
    const [list_, setList_] = useState([])
    const [createLink, setCreateLink] = useState(false)
    const [edit, setEdit] = useState(false)
    const [activeLink, setActiveLink] = useState({})

    const [selectedOrganizer, setSelectedOrganizer] = useState(0)
    const [selectedCompetition, setSelectedCompetition] = useState(0)
    const [organizers, setOrganizers] = useState([])
    const [competitions, setCompetitions] = useState([])

    async function fetchLinks() {
        const l = await CompetitionOrganizerService.getAll()
        setList(l)
    }

    async function fetchOrganizers() {
        const o = await OrganizerService.getAll()
        setOrganizers(o)
    }

    async function fetchCompetitions() {
        const l = await CompetitionService.getAll()
        setCompetitions(l)
    }

    async function createNewLink() {
        const res = await CompetitionOrganizerService.createCompetitionOrganizer(selectedCompetition, selectedOrganizer)
        setCreateLink(false)
        window.location.reload(false)
    }

    async function deleteLink(id) {
        const res = await CompetitionOrganizerService.deleteCompetitionOrganizer(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editLink() {
        const res = await CompetitionOrganizerService.updateCompetitionOrganizer(activeLink.id, activeLink.competition_id, activeLink.organizer_id)
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

            const orgName = organizers.find(a => {
                return a.id === l.organizer_id
            })?.organizer_name

            return {...l, name_1: compName, name_2: orgName}
        })
        setList_(lis)
    }, [list, competitions, organizers])

    useEffect(() => {
        fetchOrganizers()
        fetchCompetitions()
        fetchLinks()
    }, [])

    return (
        <div className={classes.wrapper}>
            <h1>Competition organizer links:</h1>
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
                        value={selectedOrganizer}
                        onChange={f => setSelectedOrganizer(f)}
                        title='Организатор' 
                        options={organizers} 
                        defaultValue={'Не выбрано'}/>
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
                        value={activeLink.organizer_id}
                        onChange={f => setActiveLink({...activeLink, organizer_id: f})}
                        title='Организатор' 
                        options={organizers} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton onClick={editLink}>Update link</TransparentButton>
                </div>
            </Modal>
        </div>
    );
};

export default CompetitionOrganizer;