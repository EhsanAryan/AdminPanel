import swal from "sweetalert"

export const Alert = (title , text , iconName) => {
    return swal({
        title : title , 
        text : text ,
        icon : iconName ,
        button : "متوجه شدم"
    })
}