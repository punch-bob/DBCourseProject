import React from 'react';
import Icon from "react-icons-kit";
import {trash2} from 'react-icons-kit/feather/trash2';
import {edit2} from 'react-icons-kit/feather/edit2';
import classes from './ListLinks.module.css';

const ListLinksItem = ({item, setActive, deleteId, deleteFunc, setEdit}) => {
    const edit = () => {
        setEdit(true)
        setActive(item.id)
    }

    return (
        <div className={classes.itemWrapper}>
            <Icon onClick={edit} className={classes.editIcon} icon={edit2}/>
            <div onClick={() => setActive(item.id)} className={classes.itemText}>
                <div className={classes.itemPart}>
                    {item.name_1}
                </div>
                <div className={classes.itemPart}>
                    {item.name_2}
                </div>
                {item?.add !== undefined
                ?<div className={classes.itemPart}>{item.add}</div>
                :<></>
                }
                
            </div>
            <Icon className={classes.deleteIcon} onClick={() => deleteFunc(item.id)} icon={trash2}/>
        </div>
    );
};

export default ListLinksItem;