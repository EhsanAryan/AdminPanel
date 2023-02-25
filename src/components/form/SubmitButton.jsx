import { FastField } from 'formik';
import React from 'react';
import SpinnerLoader from '../SpinnerLoader';

const SubmitButton = ({ btnText, btnColor, isLarge }) => {
    return (
        <FastField>
            {({ form }) => {
                return (
                    <button type="submit" className={`btn ${btnColor || "btn-primary"}
                     ${isLarge ? "btn-lg" : ""}`}
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
    );
}

export default SubmitButton;
