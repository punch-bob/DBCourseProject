import React, { useEffect, useState } from 'react';
import ListLinks from '../components/UI/list/ListLinks';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Select from '../components/UI/select/Select';
import Modal from '../components/UI/modal/Modal';
import FacilityService from '../api/FacilityService';
import SportService from '../api/SportService';
import FacilitySportService from '../api/FacilitySportService';
import classes from '../styles/Sport.module.css';

const FacilitySport = () => {
    const [activeId, setActiveId] = useState(undefined)
    const [list, setList] = useState([])
    const [list_, setList_] = useState([])
    const [createLink, setCreateLink] = useState(false)
    const [edit, setEdit] = useState(false)
    const [activeLink, setActiveLink] = useState({})

    const [selectedSport, setSelectedSport] = useState(0)
    const [selectedFacility, setSelectedFacility] = useState(0)
    const [facilities, setFacilities] = useState([])
    const [sports, setSports] = useState([])

    async function fetchLinks() {
        const l = await FacilitySportService.getAll()
        setList(l)
    }

    async function fetchFacilities() {
        const f = await FacilityService.getAll()
        setFacilities(f)
    }

    async function fetchSports() {
        const s = await SportService.getAll()
        setSports(s)
    }

    async function createNewLink() {
        const res = await FacilitySportService.createFacilitySport(selectedFacility, selectedSport)
        setCreateLink(false)
        window.location.reload(false)
    }

    async function deleteLink(id) {
        const res = await FacilitySportService.deleteFacilitySport(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editLink() {
        const res = await FacilitySportService.updateFacilitySport(activeLink.id, activeLink.facility_id, activeLink.sport_id)
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
            const facName = facilities.find(c => {
                return c.id === l.facility_id
            })?.facility_name

            const sportName = sports.find(a => {
                return a.id === l.sport_id
            })?.sport_name

            return {...l, name_1: facName, name_2: sportName}
        })
        setList_(lis)
    }, [list, sports, facilities])

    useEffect(() => {
        fetchSports()
        fetchFacilities()
        fetchLinks()
    }, [])

    return (
        <div className={classes.wrapper}>
            <h1>Facility sport links:</h1>
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
                        value={selectedFacility}
                        onChange={f => setSelectedFacility(f)}
                        title='Сооружение' 
                        options={facilities} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={selectedSport}
                        onChange={f => setSelectedSport(f)}
                        title='Вид спорта' 
                        options={sports} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton onClick={createNewLink}>Create new link</TransparentButton>
                </div>
            </Modal>

            <Modal active={edit} setActive={setEdit}>
                <div className={classes.editWrapper}>
                    <Select 
                        value={activeLink.facility_id}
                        onChange={f => setActiveLink({...activeLink, facility_id: f})}
                        title='Сооружение' 
                        options={facilities} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={activeLink.sport_id}
                        onChange={f => setActiveLink({...activeLink, sport_id: f})}
                        title='Вид спорта' 
                        options={sports} 
                        defaultValue={'Не выбрано'}/>
                    <TransparentButton onClick={editLink}>Update link</TransparentButton>
                </div>
            </Modal>
        </div>
    );
};

export default FacilitySport;