import React from 'react'
import { NavLink } from 'react-router-dom';
import { useHasPermission } from '../../../hooks/hasPermission';

const SidebarItem = ({ icon, text, targetRoute, permTitle }) => {
  const hasPermission = useHasPermission(permTitle);
  
  return hasPermission && (
    <NavLink to={targetRoute} className="py-1 text-start pe-4 sidebar_menu_item sidebar-item text-decoration-none">
      <i className={`ms-3 icon ${icon} text-light`}></i>
      <span className="hiddenable no_wrap font_08">{text}</span>
    </NavLink>
  );
}

export default SidebarItem;
