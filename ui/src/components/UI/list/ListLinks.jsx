import React from 'react';
import ListLinksItem from './ListLinksItem';
import classes from './ListLinks.module.css';

const ListLinks = ({list, setActive, deleteId, deleteFunc, setEdit}) => {
    return (
        <div className={classes.wrapper}>
            {list.map(item => {
                return <ListLinksItem item={item} setActive={setActive} key={item.id} deleteId={deleteId} deleteFunc={deleteFunc} setEdit={setEdit}/>
            })}
        </div>
    );
};

export default ListLinks;