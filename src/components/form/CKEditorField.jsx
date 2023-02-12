import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ErrorMessage, FastField } from 'formik';
import FormShowError from './FormShowError';

const CKEditorField = ({ name, label, className, placeHolder }) => {
    return (
        <div className={`col-12 ${className} mb-4`}>
            <FastField>
                {({ form }) => {
                    return (
                        <CKEditor
                            editor={ClassicEditor}
                            data={form.values[name] || `<p>${label} : ${placeHolder}</p>`}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                form.setFieldValue(name, data);
                            }}
                            onBlur={(event, editor) => {
                                form.setFieldTouched(name, true);
                                editor.getData() === "" && editor.setData(`<p>${label} : ${placeHolder}</p>`);
                            }}
                            onFocus={(event, editor) => {
                                editor.getData() === `<p>${label} : ${placeHolder}</p>` && editor.setData("");
                            }}
                        />
                    )
                }}
            </FastField>
            <div className="mt-2">
                <ErrorMessage name={name} component={FormShowError} />
            </div>
        </div>
    );
}

export default CKEditorField;
