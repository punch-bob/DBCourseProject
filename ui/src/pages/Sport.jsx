import React, { useEffect, useState } from 'react';
import Input from '../components/UI/input/Input';
import List from '../components/UI/list/List';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Modal from '../components/UI/modal/Modal';
import SportService from '../api/SportService';
import classes from '../styles/Sport.module.css';

const Sport = () => {
    const [activeId, setActiveId] = useState(undefined)
    const [sports, setSports] = useState([])
    const [createSport, setCreateSport] = useState(false)
    const [sportName, setSportName] = useState('')
    const [edit, setEdit] = useState(false)
    const [activeSport, setActiveSport] = useState({})

    async function fetchSports() {
        const sport = await SportService.getAll()
        setSports(sport)
    }

    async function createNewSport() {
        const res = await SportService.createSport(sportName)
        setCreateSport(false)
        window.location.reload(false)
    }

    async function deleteSport(id) {
        const res = await SportService.deleteSport(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editSport() {
        const res = await SportService.updateSport(activeSport.id, activeSport.sport_name)
        setActiveId(undefined)
        window.location.reload(false)
    }

    useEffect(() => {
        if (activeId !== undefined) {
            const sport = sports.filter(s => s.id === activeId)
            setActiveSport(sport[0])
            setEdit(false)
        }
    }, [activeId])

    useEffect(() => {
        fetchSports()
    }, [])

    return (
        <div className={classes.wrapper}>
            <h1>Sports:</h1>
            <div className={classes.listWrapper}>
                <List list={sports} setActive={setActiveId} deleteFunc={deleteSport} setEdit={setEdit}/>
            </div>
            <div className={classes.buttonWrapper}>
                <TransparentButton onClick={() => setCreateSport(true)}>Create new sport</TransparentButton>
            </div>

            {/* Modals */}
            <Modal active={createSport} setActive={setCreateSport}>
                <div className={classes.createAthleteWrapper}>
                    <Input 
                        value={sportName}
                        onChange={e => {setSportName(e.target.value)}}
                        placeholder='Sport name'/>
                    <TransparentButton onClick={createNewSport}>Create new sport</TransparentButton>
                </div>
            </Modal>

            <Modal active={edit} setActive={setEdit}>
                <div className={classes.editWrapper}>
                    <Input 
                        defaultValue={activeSport.sport_name}
                        onChange={e => setActiveSport({...activeSport, sport_name: e.target.value})}
                        type='text'
                        placeholder='Sport name'
                    />
                    <TransparentButton onClick={editSport}>Update sport</TransparentButton>
                </div>
            </Modal>
        </div>
    );
};

export default Sport;