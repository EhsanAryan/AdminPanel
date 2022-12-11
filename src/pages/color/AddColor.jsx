import React from 'react';
import ModalContainer from '../../components/ModalContainer';

const AddColor = () => {
    return (
        <ModalContainer
        id={"add_color_modal"}
        title={"افزون رنگ"}
        fullScreen={false}
        >
            <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <div class="input-group my-3 dir_ltr">
                                        <input type="text" class="form-control" placeholder="" />
                                        <span class="input-group-text w_8rem justify-content-center">نام رنگ</span>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="exampleColorInput" class="form-label">انتخاب رنگ</label>
                                    <input type="color" class="form-control form-control-color"
                                    id="exampleColorInput" value="#563d7c" title="Choose your color" />
                                </div>                        
                                <div class="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                    <button class="btn btn-primary ">ذخیره</button>
                                </div>
                            </div>
            </div>            
        </ModalContainer>
    );
}

export default AddColor;
