import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PrevButton from "../../../components/PrevButton";
import SpinnerLoader from "../../../components/SpinnerLoader";
import { apiPath } from "../../../services/httpService";
import { addGalleryImageSerive, deleteGalleryImageService, setMainGalleryImageService } from "../../../services/productServices";
import { Alert, Confirm } from "../../../utils/Alerts";

const ProductGallery = () => {
    const location = useLocation();
    const { productData } = location.state;

    const [gallery, setGallery] = useState(productData.gallery);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddNewImage = async (ev) => {
        setError("");
        setLoading(true);

        const image = ev.target.files[0];
        if(!image) {
            setLoading(false);
            return;
        }

        if (image.size > 500 * 1024) {
            setLoading(false);
            return setError("حجم فایل حداکثر باید 500 کیلوبایت باشد.")
        }
        if (image.type != "image/png" && image.type != "image/jpeg") {
            setLoading(false);
            return setError("لطفا یک فایل با فرمت png یا jpg یا jpeg انتخاب کنید.")
        }

        let formdata = new FormData();
        formdata.append("image", image);

        try {
            const response = await addGalleryImageSerive(productData.id, formdata);
            if (response.status === 201) {
                Alert("افزودن تصویر", response.data.message, "success");
                setGallery(prevGallery => [
                    ...prevGallery
                    , { id: response.data.data.id, is_main: 0, image: response.data.data.image }
                ]);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const handleDeleteImage = async (imageId) => {
        const res = await Confirm("حذف تصویر", "آیا از حذف این تصویر مطمئن هستید؟", "warning");
        if(res) {
            try {
                const response = await deleteGalleryImageService(imageId);
                if(response.status === 200) {
                    Alert("حذف تصویر", response.data.message, "success");
                    setGallery(prevGallery => prevGallery.filter(g => g.id != imageId));
                }
            } catch (error) {
                
            }
        } else {
            Alert("لغو عملیات", "شما عملیات حذف تصویر را لغو کردید!", "info");
        }
    }

    const handleSetMainImage = async (imageId) => {
        try {
            const response = await setMainGalleryImageService(imageId);
            if(response.status === 200) {
                Alert("تنظیم تصویر اصلی", response.data.message, "success");
                setGallery(prevGallery => {
                    return prevGallery.map(g => {
                        if(g.id == imageId) {
                            return {...g, is_main: 1};
                        } else if(g.is_main == 1) {
                            return  {...g, is_main: 0};
                        }
                        return g;
                    })
                });
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="container">
            <h3 className="text-center mt-3">
                گالری محصول:
                <span className="text-success mx-2">{productData.title}</span>
            </h3>
            <div className="d-flex justify-content-end align-items-center">
                <PrevButton />
            </div>
            <div className="mt-3 mb-2">
                {
                    error ? (
                        <span className="text-danger">{error}</span>
                    ) : null
                }
            </div>
            <div className="d-flex justify-content-center align-items-start flex-wrap">
                {
                    gallery.length > 0 ? (
                        <>
                            {gallery.map(g => {
                                return (
                                    <div key={`img-${g.id}`} className={`gallery-img-box 
                                     border border-1 border-dark position-relative mx-1
                                      my-2 p-0 ${g.is_main ? "main-img" : ""}`}>
                                        <img src={`${apiPath}/${g.image}`}
                                            className="img-fluid h-100" alt="gallery pic" />
                                        <div className="gallery-img-options-container">
                                            {
                                                !g.is_main ? (
                                                    <i className="fas fa-check fs-5 mx-1 text-success hoverable_text pointer"
                                                        title="انتخاب به عنوان تصویر اصلی"
                                                        onClick={() => handleSetMainImage(g.id)}>
                                                    </i>
                                                ) : null
                                            }
                                            <i className="fas fa-times fs-5 mx-1 text-danger hoverable_text pointer"
                                                title="حذف تصویر"
                                                onClick={() => handleDeleteImage(g.id)}>
                                            </i>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : null
                }

                <div className={`add-gallery-img-box bg-white border border-2 border-dark 
                mx-1 my-2 d-flex justify-content-center align-items-center 
                position-relative ${loading ? "disabled" : ""}`}>
                    {
                        loading ? (
                            <SpinnerLoader colorClass="text-success" />
                        ) : (
                            <span className="add-icon border border-2 border-dark rounded-circle 
                            d-flex justify-content-center align-items-center">
                                <i className="fas fa-plus fs-1 text-success"
                                    title="افزودن تصویر">
                                </i>
                            </span>
                        )
                    }
                    <input type="file" className="gallery-file-input opacity-0 pointer bg-success"
                        onChange={(ev) => handleAddNewImage(ev)} />
                </div>
            </div>
        </div>
    );
}

export default ProductGallery;