import React, { useEffect } from 'react';
import { useState } from 'react';
import Input from '../components/UI/input/Input';
import List from '../components/UI/list/List';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Modal from '../components/UI/modal/Modal';
import Spinner from '../components/UI/spinner/Spinner';
import SimpleList from '../components/UI/list/SimpleList';
import OrganizerService from '../api/OrganizerService';
import QueryService from '../api/QueryService';
import classes from '../styles/Club.module.css';

const Organizer = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeId, setActiveId] = useState(undefined)
    const [organizers, setOrganizers] = useState([])
    const [createOrganizer, setCreateOrganizer] = useState(false)
    const [organizerName, setOrganizerName] = useState('')
    const [edit, setEdit] = useState(false)

    const [activeOrganizer, setActiveOrganizer] = useState({})

    const [begin, setBegin] = useState('')
    const [end, setEnd] = useState('')

    const [q1, setQ1] = useState(false)
    const [periodList, setPeriodList] = useState([])

    async function fetchOrganizers() {
        const orgs = await OrganizerService.getAll()
        setOrganizers(orgs)
    }

    async function createNewOrganizer() {
        const res = await OrganizerService.createOrganizer(organizerName)
        setCreateOrganizer(false)
        window.location.reload(false)
    }

    async function deleteOrganizer(id) {
        const res = await OrganizerService.deleteOrganizer(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editOrganizer() {
        const res = await OrganizerService.updateOrganizer(activeOrganizer.id, activeOrganizer.organizer_name)
        setActiveId(undefined)
        window.location.reload(false)
    }

    // Query

    async function getOrgByPeriod() {
        const res = await QueryService.getOrgByPeriod(begin, end)
        setPeriodList(res.map(r => ({...r, add: 'Соревнований: ' + r.number_of_competition})))
        setQ1(true)
    }

    useEffect(() => {
        if (activeId !== undefined) {
            const org = organizers.filter(s => s.id === activeId)
            setActiveOrganizer(org[0])
            setEdit(false)
        }
    }, [activeId])

    useEffect(() => {
        fetchOrganizers()
        setIsLoaded(true)
    }, [])

    return (
        <div className={classes.wrapper}>
            {!isLoaded
            ? <div className={classes.spinnerWrapper}><Spinner /></div>
            : 
            <>
                <h3>Провели соревнований за период:</h3>
                <div style={{display: 'flex', alignItems: 'center', width: '42vw', justifyContent: 'space-between'}}>
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
                    <TransparentButton disabled={begin === '' || end === ''} onClick={getOrgByPeriod}>Get organizers</TransparentButton>
                </div>

                <div className={classes.listWrapper}>
                    <h1>Organizers:</h1>
                    <List list={organizers} setActive={setActiveId} deleteFunc={deleteOrganizer} setEdit={setEdit}/>
                    <TransparentButton onClick={() => setCreateOrganizer(true)}>Create new organizer</TransparentButton>
                </div>

                {/* Modals */}
                <Modal active={createOrganizer} setActive={setCreateOrganizer}>
                    <div className={classes.createAthleteWrapper}>
                        <Input 
                            value={organizerName}
                            onChange={e => {setOrganizerName(e.target.value)}}
                            placeholder='Organizer name'/>
                        <TransparentButton onClick={createNewOrganizer}>Create new organizer</TransparentButton>
                    </div>
                </Modal>

                <Modal active={edit} setActive={setEdit}>
                    <div className={classes.editWrapper}>
                        <Input 
                            defaultValue={activeOrganizer.organizer_name}
                            onChange={e => setActiveOrganizer({...activeOrganizer, organizer_name: e.target.value})}
                            type='text'
                            placeholder='Organizer name'
                        />
                        <TransparentButton onClick={editOrganizer}>Update organizer</TransparentButton>
                    </div>
                </Modal>

                <Modal active={q1} setActive={setQ1}>
                    <div>
                        <h1>Organizers:</h1>
                        <SimpleList list={periodList}/>
                    </div>
                </Modal>
            </>
            }
        </div>
    );
};

export default Organizer;