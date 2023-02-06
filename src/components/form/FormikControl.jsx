import React from 'react';
import Color from './Color';
import File from './File';
import InputField from './InputField';
import Select from './Select';
import SubmitButton from './SubmitButton';
import Switch from './Switch';
import Textarea from './Textarea';

const FormikControl = (props) => {
    switch (props.control) {
        case "select":
            return <Select {...props} />
        case "input":
            return <InputField {...props} />
        case "textarea":
            return <Textarea {...props} />
        case "file":
            return <File {...props} />
        case "switch":
            return <Switch {...props} />
        case "color": 
            return <Color {...props} />
        case "submit": 
            return <SubmitButton {...props} />
        default:
            return <InputField {...props} />
    }
}

export default FormikControl;
