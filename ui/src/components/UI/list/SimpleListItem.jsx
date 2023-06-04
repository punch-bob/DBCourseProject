import React from 'react';
import classes from './ListLinks.module.css';

const SimpleListItem = ({item}) => {
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

    return (
        <div className={classes.itemWrapper}>
            <div className={classes.itemText}>{itemName()}</div>
            {item?.add !== undefined
            ?<div className={classes.itemPart} style={{textAlign: 'center'}}>{item.add}</div>
            :<></>
            }
        </div>
    );
};

export default SimpleListItem;