import swal from "sweetalert"

export const Alert = (title , text , iconName, buttonText="متوجه شدم") => {
    return swal({
        title , 
        text ,
        icon : iconName ,
        button : buttonText
    });
}

export const Confirm = (title, text, iconName, cancelText="لفو", confirmText="تایید") => {
    return swal({
        title,
        text,
        icon: iconName,
        buttons: [cancelText, confirmText],
        dangerMode: true
    });
}