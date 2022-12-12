import React from 'react';
import ModalContainer from '../../components/ModalContainer';

const AddRole = () => {
    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_role_modal">
                <i className="fas fa-plus text-light"></i>
            </button>

            <ModalContainer
                id={"add_role_modal"}
                title={"افزودن نقش"}
                fullScreen={false}
            >
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="input-group my-3 dir_ltr">
                                <input type="text" class="form-control" placeholder="" />
                                <span class="input-group-text w_8rem justify-content-center">عنوان نقش</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group my-3 dir_ltr">
                                <input type="text" class="form-control" placeholder="" />
                                <span class="input-group-text w_8rem justify-content-center">توضیحات نقش</span>
                            </div>
                        </div>
                        <div class="col-12 my-1 mb-3">
                            <div class="input-group my-2 dir_ltr">
                                <input type="text" class="form-control"
                                    placeholder="قسمتی از مجوز مورد نظر را وارد کنید"
                                    list="permissionsList" />
                                <span class="input-group-text w_8rem justify-content-center">دسترسی ها</span>
                                <datalist id="permissionsList">
                                    <option value="مجوز شماره 1" />
                                    <option value="مجوز شماره 2" />
                                    <option value="مجوز شماره 3" />
                                </datalist>
                            </div>
                            <div class="col-12 col-md-6 col-lg-8">
                                <span class="chips_elem">
                                    <i class="fas fa-times text-danger"></i>
                                    مجوز 1
                                </span>
                                <span class="chips_elem">
                                    <i class="fas fa-times text-danger"></i>
                                    مجوز 2
                                </span>
                            </div>
                        </div>

                        <div class="col-12 my-2">
                            <div class="form-check form-switch col-5 col-md-4">
                                <input class="form-check-input pointer"
                                    type="checkbox" id="flexSwitchCheckDefault" />
                                <label class="form-check-label pointer" for="flexSwitchCheckDefault">وضعیت : فعال</label>
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

export default AddRole;
