import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../../context/AdminLayoutContext';
import SidebarAvatar from './SidebarAvatar';
import SidebarItem from './SidebarItem';
import SidebarTitle from './SidebarTitle';

const Index = () => {
    const {showSidebar} = useContext(AdminContext);

  return (
    <section id="sidebar_section">
        <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSidebar ? "expanded" : null}`}>
            <ul className="p-0 m-0">
                <SidebarAvatar
                name={"احسان آریان"}
                imgPath={"./assets/images/avatar/user1.jpg"}
                />
                
                <SidebarItem
                icon={"fas fa-tachometer-alt "}
                text={"داشبورد"}
                />
                {/* <!-- =================================== --> */}
                <SidebarTitle
                title={"فروشگاه"} 
                />
           
                <SidebarItem
                icon={"fas fa-stream"}
                text={"مدیریت گروه محصول"}
                />

                <SidebarItem
                icon={"fas fa-cube"}
                text={"مدیریت محصول"}
                />

                <SidebarItem
                icon={"fas fa-copyright"}
                text={"مدیریت برند ها"}
                />

                <SidebarItem
                icon={"fab fa-pagelines"}
                text={"مدیریت گارانتی ها"}
                />

                <SidebarItem
                icon={"fas fa-palette"}
                text={"مدیریت رنگ ها"}
                />

                <SidebarItem
                icon={"fas fa-percentage"}
                text={"مدیریت تخفیف ها"}
                />

                {/* <!-- =================================== --> */}
                <SidebarTitle
                title={"سفارشات و سبد"} 
                />

                <SidebarItem
                icon={"fas fa-shopping-basket"}
                text={"مدیریت سبد ها"}
                />

                <SidebarItem
                icon={"fas fa-luggage-cart"}
                text={"مدیریت سفارشات"}
                />
                

                <SidebarItem
                icon={"fas fa-truck-loading"}
                text={"مدیریت نحوه ارسال"}
                />

                {/* <!-- =================================== --> */}
                <SidebarTitle
                title={"کاربران و همکاران"} 
                />

                <SidebarItem
                icon={"fas fa-users"}
                text={"مشاهده کاربران"}
                />

                <SidebarItem
                icon={"fas fa-user-tag"}
                text={"نقش ها"}
                />

                <SidebarItem
                icon={"fas fa-shield-alt"}
                text={"مجوز ها"}
                />
                {/* <!-- =================================== --> */}
                <SidebarTitle
                title={"ارتباطات"} 
                />

                <SidebarItem
                icon={"fas fa-question-circle"}
                text={"سوال ها"}
                />

                <SidebarItem
                icon={"fas fa-comment"}
                text={"نظرات"}
                />
            </ul>
        </div>
    </section>
  )
}

export default Index;
