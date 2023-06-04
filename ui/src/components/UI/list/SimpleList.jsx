import React from 'react';
import SimpleListItem from './SimpleListItem';
import classes from './List.module.css';

const SimpleList = ({list}) => {
    return (
        <div className={classes.wrapper}>
            {list.map((item, i) => {
                return <SimpleListItem item={item} key={i}/>
            })}
        </div>
    );
};

export default SimpleList;