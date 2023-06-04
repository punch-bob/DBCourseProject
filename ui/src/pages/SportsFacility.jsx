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
import FacilityService from '../api/FacilityService';
import AttributeService from '../api/AttributeService';
import TypeOfFacilityService from '../api/TypeOfFacilityService';
import CoatingTypeService from '../api/CoatingTypeService';
import QueryService from '../api/QueryService';
import classes from '../styles/Club.module.css';

const SportsFacility = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeId, setActiveId] = useState(undefined)
    const [facilities, setFacilities] = useState([])
    const [createFacility, setCreateFacility] = useState(false)

    const [selectedType, setSelectedType] = useState(0)
    const [types, setTypes] = useState([])
    const [selectedCoatingType, setSelectedCoatingType] = useState(0)
    const [coatingTypes, setCoatingTypes] = useState([])
    const [facilityName, setFacilityName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [participantsCapacity, setParticipantsCapacity] = useState('')
    const [length, setLength] = useState('')

    const [edit, setEdit] = useState(false)
    const [activeFacility, setActiveFacility] = useState({})
    const [activeAttr, setActiveAttr] = useState({})
    const [attrs, setAttrs] = useState([])

    const [selectedType_, setSelectedType_] = useState(0)
    const [selectedCoatingType_, setSelectedCoatingType_] = useState(0)
    const [capacity_, setCapacity_] = useState('')
    const [participantsCapacity_, setParticipantsCapacity_] = useState('')
    const [length_, setLength_] = useState('')
    
    const [begin, setBegin] = useState('')
    const [end, setEnd] = useState('')

    const [q1, setQ1] = useState(false)
    const [filterList, setFilterList] = useState([])

    const [q2, setQ2] = useState(false)
    const [periodList, setPeriodList] = useState([])

    async function fetchTypes() {
        const t = await TypeOfFacilityService.getAll()
        setTypes(t)
    }

    async function fetchAttrs() {
        const a = await AttributeService.getAll()
        setAttrs(a)
    }

    async function fetchCoatingTypes() {
        const t = await CoatingTypeService.getAll()
        setCoatingTypes(t)
    }

    async function fetchFacilities() {
        const facil = await FacilityService.getAll()
        setFacilities(facil)
    }

    async function createNewFacility() {
        const res = await AttributeService.createAttribute(capacity === '' ? null : +capacity, 
                                                           +selectedCoatingType === 0 ? null : +selectedCoatingType, 
                                                           participantsCapacity === '' ? null : +participantsCapacity, 
                                                           length === '' ? null : +length)
        const r = await FacilityService.createFacility(res.attribute_id, facilityName, selectedType)
        setCreateFacility(false)
        window.location.reload(false)
    }

    async function deleteFacility(id) {
        const res = await FacilityService.deleteFacility(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editFacility() {
        const res = await AttributeService.updateAttribute(activeAttr.id,
                                                           activeAttr.capacity,
                                                           activeAttr.coating_type_id,
                                                           activeAttr.participants_capacity,
                                                           activeAttr.track_length)
        const r = await FacilityService.updateFacility(activeFacility.id, 
                                                          activeFacility.attribute_id,  
                                                          activeFacility.facility_name,
                                                          activeFacility.facility_type_id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    // Query

    async function getFacilityByFilter() {
        const res = await QueryService.getFacilityByFilter(capacity_, 
                                                           selectedCoatingType_, 
                                                           participantsCapacity_, 
                                                           length_, 
                                                           selectedType_)
        setFilterList(res)
        setQ1(true)
    }

    const formateDate = date => {
        return moment(date).format()
    }
    async function getFacilityByPeriod() {
        const res = await QueryService.getFacilityByPeriod(begin, end)
        setPeriodList(res.map(r => {
            const start = formateDate(r.start_date).split('T')[0] === 'Invalid date' ? '' : formateDate(r.start_date).split('T')[0]
            const end = formateDate(r.end_date).split('T')[0] === 'Invalid date' ? '' : formateDate(r.end_date).split('T')[0]
            let add = 'Начало: ' + start + '\nКонец: ' + end
            if (start === '') add = 'Не было соревнований'
            return ({...r, add: add})
        }))
        setQ2(true)
    }

    useEffect(() => {
        if (activeId !== undefined) {
            const f = facilities.filter(s => s.id === activeId)
            const a = attrs.filter(a => a.id === f[0].attribute_id)
            setActiveFacility(f[0])
            setActiveAttr(a[0])
            setEdit(false)
        }
    }, [activeId])

    useEffect(() => {
        fetchFacilities()
        fetchCoatingTypes()
        fetchTypes()
        fetchAttrs()
        setIsLoaded(true)
    }, [])

    return (
        <div className={classes.wrapper}>
            {!isLoaded
            ? <div className={classes.spinnerWrapper}><Spinner /></div>
            : 
            <>
                <h3>Проходили соревнования за период:</h3>
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
                    <TransparentButton disabled={begin === '' || end === ''} onClick={getFacilityByPeriod}>Get facilities</TransparentButton>
                </div>
                <br />
                <div className={classes.filterWrapper}>
                    <Select 
                        value={selectedType_}
                        onChange={t => setSelectedType_(t)}
                        title='Тип сооружения' 
                        options={types} 
                        defaultValue={'Не выбрано'}/>
                    <Select 
                        value={selectedCoatingType_}
                        onChange={t => selectedCoatingType_(t)}
                        title='Тип покрытия' 
                        options={coatingTypes} 
                        defaultValue={'Не выбрано'}/>
                    <div className={classes.inputWrapper} style={{width: '40%'}}>
                        <Input 
                            value={capacity_}
                            onChange={e => setCapacity_(e.target.value)}
                            placeholder='Вместимость'
                        />
                        <Input 
                            value={participantsCapacity_}
                            onChange={e => setParticipantsCapacity_(e.target.value)}
                            placeholder='Вместимость спортсменов'
                        />
                        <Input 
                            value={length_}
                            onChange={e => setLength_(e.target.value)}
                            placeholder='Длина трека'
                        />
                    </div>
                    <TransparentButton onClick={getFacilityByFilter}>Get facilities</TransparentButton>
                </div>

                <div className={classes.listWrapper}>
                    <h1>Sports facilities:</h1>
                    <List list={facilities} setActive={setActiveId} deleteFunc={deleteFacility} setEdit={setEdit}/>
                    <TransparentButton onClick={() => setCreateFacility(true)}>Create new facility</TransparentButton>
                </div>

                {/* Modals */}
                <Modal active={createFacility} setActive={setCreateFacility}>
                    <div className={classes.createAthleteWrapper}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', marginBottom: '20px'}}>
                            <Select 
                                value={selectedType}
                                onChange={t => setSelectedType(t)}
                                title='Тип сооружения' 
                                options={types} 
                                defaultValue={'Не выбрано'}/>
                            <Select 
                                value={selectedCoatingType}
                                onChange={t => setSelectedCoatingType(t)}
                                title='Тип покрытия' 
                                options={coatingTypes} 
                                defaultValue={'Не выбрано'}/>
                            <Input 
                                value={capacity}
                                onChange={e => setCapacity(e.target.value)}
                                placeholder='Вместимость'
                            />
                            <Input 
                                value={participantsCapacity}
                                onChange={e => setParticipantsCapacity(e.target.value)}
                                placeholder='Вместимость спортсменов'
                            />
                            <Input 
                                value={length}
                                onChange={e => setLength(e.target.value)}
                                placeholder='Длина трека'
                            />
                            <Input 
                                value={facilityName}
                                onChange={e => {setFacilityName(e.target.value)}}
                                placeholder='Facility name'/>
                        </div>
                        <TransparentButton onClick={createNewFacility}>Create new facility</TransparentButton>
                    </div>
                </Modal>

                <Modal active={edit} setActive={setEdit}>
                    <div className={classes.editWrapper}>
                        <Select 
                            value={activeFacility.facility_type_id}
                            onChange={t => setActiveFacility({...activeFacility, facility_type_id: t})}
                            title='Тип сооружения' 
                            options={types} 
                            defaultValue={'Не выбрано'}/>
                        <Select 
                            value={activeAttr.coating_type_id}
                            onChange={t => setActiveAttr({...activeAttr, coating_type_id: t})}
                            title='Тип покрытия' 
                            options={coatingTypes} 
                            defaultValue={'Не выбрано'}/>
                        <Input 
                            defaultValue={activeAttr.capacity}
                            onChange={e => setActiveAttr({...activeAttr, capacity: +e.target.value})}
                            placeholder='Вместимость'
                        />
                        <Input 
                            defaultValue={activeAttr.participants_capacity}
                            onChange={e => setActiveAttr({...activeAttr, participants_capacity: +e.target.value})}
                            placeholder='Вместимость спортсменов'
                        />
                        <Input 
                            defaultValue={activeAttr.length}
                            onChange={e => setActiveAttr({...activeAttr, length: +e.target.value})}
                            placeholder='Длина трека'
                        />
                        <Input 
                            defaultValue={activeFacility.facility_name}
                            onChange={e => setActiveFacility({...activeFacility, facility_name: e.target.value})}
                            placeholder='Facility name'/>
                        <TransparentButton onClick={editFacility}>Update facility</TransparentButton>
                    </div>
                </Modal>

                <Modal active={q1} setActive={setQ1}>
                    <div>
                        <h1>Facilities:</h1>
                        <SimpleList list={filterList}/>
                    </div>
                </Modal>

                <Modal active={q2} setActive={setQ2}>
                    <div>
                        <h1>Facilities:</h1>
                        <SimpleList list={periodList}/>
                    </div>
                </Modal>
            </>
            }
        </div>
    );
};

export default SportsFacility;