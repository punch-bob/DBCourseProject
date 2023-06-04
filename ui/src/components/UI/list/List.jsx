import React from 'react';
import ListItem from './ListItem';
import classes from './List.module.css';

const List = ({list, setActive, deleteId, deleteFunc, setEdit}) => {
    return (
        <div className={classes.wrapper}>
            {list.map(item => {
                return <ListItem item={item} setActive={setActive} key={item.id} deleteId={deleteId} deleteFunc={deleteFunc} setEdit={setEdit}/>
            })}
        </div>
    );
};

export default List;