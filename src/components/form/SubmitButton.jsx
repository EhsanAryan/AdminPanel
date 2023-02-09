import { FastField } from 'formik';
import React from 'react';
import SpinnerLoader from '../SpinnerLoader';

const SubmitButton = ({ btnText, className, isLarge }) => {
    return (
        <div className={`col-12 ${className}`}>
            <FastField>
                {({form}) => {
                    return (
                        <button type="submit" className={`btn btn-primary ${isLarge ? "btn-lg" : ""}`} 
                        disabled={form.isSubmitting}>
                            {btnText}
                            {form.isSubmitting ? (
                                <SpinnerLoader
                                    colorClass={"text-white"}
                                    isSmall={true}
                                    isInline={true}
                                />
                            ) : null}
                        </button>
                    );
                }}
            </FastField>
        </div>
    );
}

export default SubmitButton;
