import React from 'react';
import classes from './Select.module.css';

const Select = ({title, options, defaultValue, value, onChange}) => {
    const getName = option => {
        let name = ''
        if (option?.last_name !== undefined) {
            name = name + option.last_name + ' '
        }
        if (option?.first_name !== undefined) {
            name = name + option.first_name
            return name
        }
        if (option?.club_name !== undefined) {
            return option.club_name
        }
        if (option?.facility_name !== undefined) {
            return option.facility_name
        }
        if (option?.organizer_name !== undefined) {
            return option.organizer_name
        }
        if (option?.competition_name !== undefined) {
            return option.competition_name
        }
        if (option?.sport_name !== undefined) {
            return option.sport_name
        }
        if (option?.type_name !== undefined) {
            return option.type_name
        }
        if (option?.name !== undefined) {
            return option.name
        }
        if (option?.coating_type_name !== undefined) {
            return option.coating_type_name
        }
    }

    return (
        <div className={classes.wrapper}>
            {title + ':'}
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                <option value={0}>{defaultValue}</option>
                {options.map(option => {
                    return <option value={option.id} key={option.id}>
                                {getName(option)}
                            </option>
                })}
            </select>
        </div>
        
    );
};

export default Select;