import React from 'react'
import { createPortal } from 'react-dom'


const ModalContainer = ({children , id , title , fullScreen, className, closeFunction}) => {
  return createPortal(
    <div className={`modal fade modal-back-shadow 
    animate__animated animate__fadeIn animate__fast ${className || ""}`} id={id} 
    tabIndex="-1" aria-hidden="true"
    onClick={closeFunction ? closeFunction : () => {}}>
            <div className={`modal-dialog animate__animated animate__fadeInDown animate__fast
             ${fullScreen ? "modal-fullscreen" : ""}`}
             onClick={closeFunction ? (ev) => ev.stopPropagation() : () => {}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title flex-fill" id="exampleModalLabel">{title}</h5>
                   {
                    closeFunction ? (
                       <button type="button" className="btn-close"
                       onClick={closeFunction}></button>
                    ) : (
                       <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    )
                   }
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
               {
                closeFunction ? (
                   <button type="button" className="btn btn-secondary"
                   onClick={closeFunction}>انصراف</button>
                ) : (
                   <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">انصراف</button>
                )
               }
                </div>
            </div>
            </div>
        </div>
    ,
    document.getElementById("modals-root")
  )
}

export default ModalContainer;