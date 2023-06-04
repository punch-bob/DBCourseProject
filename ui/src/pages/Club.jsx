import React, { useEffect } from 'react';
import { useState } from 'react';
import Input from '../components/UI/input/Input';
import List from '../components/UI/list/List';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Modal from '../components/UI/modal/Modal';
import Spinner from '../components/UI/spinner/Spinner';
import SimpleList from '../components/UI/list/SimpleList';
import ClubService from '../api/ClubServices';
import QueryService from '../api/QueryService';
import classes from '../styles/Club.module.css';

const Club = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeId, setActiveId] = useState(undefined)
    const [clubs, setClubs] = useState([])
    const [createClub, setCreateClub] = useState(false)
    const [clubName, setClubName] = useState('')
    const [edit, setEdit] = useState(false)
    const [activeClub, setActiveClub] = useState({})

    const [begin, setBegin] = useState('')
    const [end, setEnd] = useState('')

    const [q1, setQ1] = useState(false)
    const [periodList, setPeriodList] = useState([])

    async function fetchClubs() {
        const club = await ClubService.getAll()
        setClubs(club)
    }

    async function createNewClub() {
        const res = await ClubService.createClub(clubName)
        setCreateClub(false)
        window.location.reload(false)
    }

    async function deleteClub(id) {
        const res = await ClubService.deleteClub(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editClub() {
        const res = await ClubService.updateClub(activeClub.id, activeClub.club_name)
        setActiveId(undefined)
        window.location.reload(false)
    }

    // Query
    async function getClubByPeriod() {
        const res = await QueryService.getClubByPeriod(begin, end)
        setPeriodList(res.map(r => ({...r, add: 'Спортсменов: ' + r.numb_of_athlete})))
        setQ1(true)
    }

    useEffect(() => {
        if (activeId !== undefined) {
            const club = clubs.filter(s => s.id === activeId)
            setActiveClub(club[0])
            setEdit(false)
        }
    }, [activeId])

    useEffect(() => {
        fetchClubs()
        setIsLoaded(true)
    }, [])

    return (
        <div className={classes.wrapper}>
            {!isLoaded
            ? <div className={classes.spinnerWrapper}><Spinner /></div>
            : 
            <>
                <h3>Участвовали за период:</h3>
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
                    <TransparentButton disabled={begin === '' || end === ''} onClick={getClubByPeriod}>Get clubs</TransparentButton>
                </div>

                <div className={classes.listWrapper}>
                    <h1>Clubs:</h1>
                    <List list={clubs} setActive={setActiveId} deleteFunc={deleteClub} setEdit={setEdit}/>
                    <TransparentButton onClick={() => setCreateClub(true)}>Create new club</TransparentButton>
                </div>

                {/* Modals */}
                <Modal active={createClub} setActive={setCreateClub}>
                    <div className={classes.createAthleteWrapper}>
                        <Input 
                            value={clubName}
                            onChange={e => {setClubName(e.target.value)}}
                            placeholder='Club name'/>
                        <TransparentButton onClick={createNewClub}>Create new club</TransparentButton>
                    </div>
                </Modal>

                <Modal active={edit} setActive={setEdit}>
                    <div className={classes.editWrapper}>
                        <Input 
                            defaultValue={activeClub.club_name}
                            onChange={e => setActiveClub({...activeClub, club_name: e.target.value})}
                            type='text'
                            placeholder='Club name'
                        />
                        <TransparentButton onClick={editClub}>Update club</TransparentButton>
                    </div>
                </Modal>

                <Modal active={q1} setActive={setQ1}>
                    <div>
                        <h1>Clubs:</h1>
                        <SimpleList list={periodList}/>
                    </div>
                </Modal>
            </>
            }
        </div>
    );
};

export default Club;