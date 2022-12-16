import React from 'react';
import Input from './Input';
import Switch from './Switch';

const GetField = (props) => {
    switch (props.control) {
        case "input":
            return <Input {...props} />
            break;
    
        case "switch":
            return <Switch {...props} />
            break;

        default:
            return <Input {...props} />
            break;
    }
}

export default GetField;
