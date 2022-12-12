import React from 'react';
import ModalContainer from '../../components/ModalContainer';

const AddBrand = () => {
    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_brand_modal">
                <i className="fas fa-plus text-light"></i>
            </button>
            
            <ModalContainer
                id={"add_brand_modal"}
                title={"افزودن برند"}
                fullScreen={false}
            >
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="input-group my-3 dir_ltr">
                                <input type="text" class="form-control"
                                    placeholder="کیبرد را در حالت لاتین قرار دهید" />
                                <span class="input-group-text w_8rem justify-content-center">عنوان لاتیتن برند</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group my-3 dir_ltr">
                                <input type="text" class="form-control"
                                    placeholder="کیبرد را در حالت فارسی قرار دهید" />
                                <span class="input-group-text w_8rem justify-content-center">عنوان فارسی برند</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group my-3 dir_ltr">
                                <input type="text" class="form-control"
                                    placeholder="متن کوتاه در مورد برند" />
                                <span class="input-group-text w_8rem justify-content-center">توضیحات برند</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group mb-3 dir_ltr">
                                <input type="file" class="form-control" placeholder="تصویر" />
                                <span class="input-group-text w_6rem justify-content-center">تصویر</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group mb-3 dir_ltr">
                                <input type="text" class="form-control"
                                    placeholder="یک کلمه در مورد تصویر" />
                                <span class="input-group-text w_6rem justify-content-center">توضیح تصویر</span>
                            </div>
                        </div>
                        <div class="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                            <button class="btn btn-primary ">ذخیره</button>
                        </div>
                    </div>
                </div>
            </ModalContainer>
        </>

    );
}

export default AddBrand;
