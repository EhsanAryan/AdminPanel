import { useSelector } from "react-redux"

export const useHasPermission = (permTitle) => {
    const { user } = useSelector(state => state);
    let permissions = [];
    for (let role of user.roles) {
        permissions = [...permissions, ...role.permissions];
    }

    // Main admin has only 1 role with "admin" title
    const isMainAdmin = user.roles.findIndex(r => r.title.includes("admin")) > -1;

    const hasPermission = isMainAdmin || (typeof permTitle === "object" ?
        hasOnePermission(permissions, permTitle) :
        permissions.findIndex(p => p.title.includes(permTitle)) > -1);

    return hasPermission;
}

const hasOnePermission = (permissions, permTitles) => {
    for (let pTitle of permTitles) {
        if (permissions.findIndex(p => p.title.includes(pTitle)) > -1) {
            return true;
        }
    }
    return false;
}