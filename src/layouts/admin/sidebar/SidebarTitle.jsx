import React from 'react'
import { useHasPermission } from '../../../hooks/hasPermission';

const SidebarTitle = ({ title, permTitles}) => {
  const hasPermission = useHasPermission(permTitles);
  
  return hasPermission && (
    <div className="py-1 text-start d-flex justify-content-center no_pointer no_hover sidebar-item">
      <span className="hiddenable no_wrap group_sidebar_title">{title}</span>
    </div>
  );
}

export default SidebarTitle;
