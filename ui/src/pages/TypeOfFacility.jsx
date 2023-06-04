import React, { useEffect, useState } from 'react';
import Input from '../components/UI/input/Input';
import List from '../components/UI/list/List';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import Modal from '../components/UI/modal/Modal';
import TypeOfFacilityService from '../api/TypeOfFacilityService';
import classes from '../styles/Sport.module.css';

const TypeOfFacility = () => {
    const [activeId, setActiveId] = useState(undefined)
    const [types, setTypes] = useState([])
    const [createType, setCreateType] = useState(false)
    const [typeName, setTypeName] = useState('')
    const [edit, setEdit] = useState(false)
    const [activeType, setActiveType] = useState({})

    async function fetchTypes() {
        const type = await TypeOfFacilityService.getAll()
        setTypes(type)
    }

    async function createNewType() {
        const res = await TypeOfFacilityService.createType(typeName)
        setCreateType(false)
        window.location.reload(false)
    }

    async function deleteType(id) {
        const res = await TypeOfFacilityService.deleteType(id)
        setActiveId(undefined)
        window.location.reload(false)
    }

    async function editType() {
        const res = await TypeOfFacilityService.updateType(activeType.id, activeType.type_name)
        setActiveId(undefined)
        window.location.reload(false)
    }

    useEffect(() => {
        if (activeId !== undefined) {
            const type = types.filter(t => t.id === activeId)
            setActiveType(type[0])
            setEdit(false)
        }
    }, [activeId])

    useEffect(() => {
        fetchTypes()
    }, [])

    return (
        <div className={classes.wrapper}>
            <h1>Type of facility:</h1>
            <div className={classes.listWrapper}>
                <List list={types} setActive={setActiveId} deleteFunc={deleteType} setEdit={setEdit}/>
            </div>
            <div className={classes.buttonWrapper}>
                <TransparentButton onClick={() => setCreateType(true)}>Create new type</TransparentButton>
            </div>

            {/* Modals */}
            <Modal active={createType} setActive={setCreateType}>
                <div className={classes.createAthleteWrapper}>
                    <Input 
                        value={typeName}
                        onChange={e => {setTypeName(e.target.value)}}
                        placeholder='Type name'/>
                    <TransparentButton onClick={createNewType}>Create new type</TransparentButton>
                </div>
            </Modal>

            <Modal active={edit} setActive={setEdit}>
                <div className={classes.editWrapper}>
                    <Input 
                        defaultValue={activeType.type_name}
                        onChange={e => setActiveType({...activeType, type_name: e.target.value})}
                        type='text'
                        placeholder='Type name'
                    />
                    <TransparentButton onClick={editType}>Update type</TransparentButton>
                </div>
            </Modal>
        </div>
    );
};

export default TypeOfFacility;