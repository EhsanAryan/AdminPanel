import React from 'react'

const SidebarAvatar = ({name , imgPath}) => {
  return (
    <li className="pt-1 pb-2 d-flex flex-column avatar_li position-relative mb-2">
        <span className="avatar_box">
            <img className="w-100 rounded-circle" src={`${imgPath}`} alt="Avatar" />
        </span>
        <div className="sidebar_avatar_name text-center hiddenable">{name}</div>
    </li>
  )
}

export default SidebarAvatar;
