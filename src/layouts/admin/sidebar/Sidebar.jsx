import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../../context/AdminLayoutContext';
import SidebarItem from "./SidebarItem";
import SidebarAvatar from './SidebarAvatar';
import SidebarTitle from './SidebarTitle';

const Index = () => {
    const {showSidebar} = useContext(AdminContext);

  return (
    <section id="sidebar_section">
        <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSidebar ? "expanded" : null}`}>
            <div className="p-0 m-0">
                <SidebarAvatar
                name={"احسان آریان"}
                imgPath={"./assets/images/avatar/user1.jpg"}
                />
                
                <SidebarItem
                targetRoute={"/dashboard"}
                icon={"fas fa-tachometer-alt "}
                text={"داشبورد"}
                />
                {/* <!-- =================================== --> */}
                <SidebarTitle
                title={"فروشگاه"} 
                />
           
                <SidebarItem
                targetRoute={"/categories"}
                icon={"fas fa-stream"}
                text={"مدیریت گروه محصول"}
                />

                <SidebarItem
                targetRoute={"/products"}
                icon={"fas fa-cube"}
                text={"مدیریت محصول"}
                />

                <SidebarItem
                targetRoute={"/brands"}
                icon={"fas fa-copyright"}
                text={"مدیریت برند ها"}
                />

                <SidebarItem
                targetRoute={"/guarantee"}
                icon={"fab fa-pagelines"}
                text={"مدیریت گارانتی ها"}
                />

                <SidebarItem
                targetRoute={"/colors"}
                icon={"fas fa-palette"}
                text={"مدیریت رنگ ها"}
                />

                <SidebarItem
                targetRoute={"/discount"}
                icon={"fas fa-percentage"}
                text={"مدیریت تخفیف ها"}
                />

                {/* <!-- =================================== --> */}
                <SidebarTitle
                title={"سفارشات و سبد"} 
                />

                <SidebarItem
                targetRoute={"/cart"}
                icon={"fas fa-shopping-basket"}
                text={"مدیریت سبد ها"}
                />

                <SidebarItem
                targetRoute={"/order"}
                icon={"fas fa-luggage-cart"}
                text={"مدیریت سفارشات"}
                />
                

                <SidebarItem
                targetRoute={"/delivery"}
                icon={"fas fa-truck-loading"}
                text={"مدیریت نحوه ارسال"}
                />

                {/* <!-- =================================== --> */}
                <SidebarTitle
                title={"کاربران و همکاران"} 
                />

                <SidebarItem
                targetRoute={"/user"}
                icon={"fas fa-users"}
                text={"مشاهده کاربران"}
                />

                <SidebarItem
                targetRoute={"/roles"}
                icon={"fas fa-user-tag"}
                text={"نقش ها"}
                />

                <SidebarItem
                targetRoute={"/permission"}
                icon={"fas fa-shield-alt"}
                text={"مجوز ها"}
                />
                {/* <!-- =================================== --> */}
                <SidebarTitle
                title={"ارتباطات"} 
                />

                <SidebarItem
                targetRoute={"/comments"}
                icon={"fas fa-question-circle"}
                text={"سوال ها"}
                />

                <SidebarItem
                targetRoute={"/questions"}
                icon={"fas fa-comment"}
                text={"نظرات"}
                />
            </div>
        </div>
    </section>
  )
}

export default Index;
