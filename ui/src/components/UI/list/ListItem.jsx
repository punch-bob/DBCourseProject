import React from 'react';
import Icon from "react-icons-kit";
import {trash2} from 'react-icons-kit/feather/trash2';
import {edit2} from 'react-icons-kit/feather/edit2';
import classes from './List.module.css';

const ListItem = ({item, setActive, deleteId, deleteFunc, setEdit}) => {
    const itemName = () => {
        let name = ''
        if (item?.first_name !== undefined) {
            name = name + item.first_name + ' '
        }
        if (item?.last_name !== undefined) {
            name = name + item.last_name
            return name
        }
        if (item?.club_name !== undefined) {
            name += item.club_name
            return name
        }
        if (item?.facility_name !== undefined) {
            name += item.facility_name
            return name
        }
        if (item?.organizer_name !== undefined) {
            name += item.organizer_name
            return name
        }
        if (item?.competition_name !== undefined) {
            name += item.competition_name
            return name
        }
        if (item?.sport_name !== undefined) {
            name += item.sport_name
            return name
        }
        if (item?.type_name !== undefined) {
            name += item.type_name
            return name
        }
        if (item?.coating_type_name !== undefined) {
            name += item.coating_type_name
            return name
        }
    }

    const edit = () => {
        setEdit(true)
        setActive(item.id)
    }

    return (
        <div className={classes.itemWrapper}>
            <Icon onClick={edit} className={classes.editIcon} icon={edit2}/>
            <div onClick={() => setActive(item.id)} className={classes.itemText}>{itemName()}</div>
            <Icon className={classes.deleteIcon} onClick={() => deleteFunc(item.id)} icon={trash2}/>
        </div>
    );
};

export default ListItem;