import React from 'react';
import CheckBox from './CheckBox';
import CKEditorField from './CKEditorField';
import Color from './Color';
import Date from './Date';
import File from './File';
import InputField from './InputField';
import MultiSelect from './MultiSelect';
import PasswordField from './PasswordField';
import SearchableSelect from './SearchableSelect';
import Select from './Select';
import SubmitButton from './SubmitButton';
import Switch from './Switch';
import Textarea from './Textarea';

const FormikControl = (props) => {
    switch (props.control) {
        case "input":
            return <InputField {...props} />
        case "visiblePassword":
            return <PasswordField {...props} />
        case "textarea":
            return <Textarea {...props} />
        case "ckeditor":
            return <CKEditorField {...props} />
        case "select":
            return <Select {...props} />
        case "multiSelect":
            return <MultiSelect {...props} />
        case "searchableSelect":
            return <SearchableSelect {...props} />
        case "file":
            return <File {...props} />
        case "switch":
            return <Switch {...props} />
        case "color":
            return <Color {...props} />
        case "date":
            return <Date {...props} />
        case "checkbox": 
            return <CheckBox {...props} />
        case "submit":
            return <SubmitButton {...props} />
        default:
            return <InputField {...props} />
    }
}

export default FormikControl;
