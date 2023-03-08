import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../../context/AdminLayoutContext';
import SidebarItem from "./SidebarItem";
import SidebarAvatar from './SidebarAvatar';
import SidebarTitle from './SidebarTitle';
import { useSelector } from 'react-redux';


const Index = () => {
  const { showSidebar } = useContext(AdminContext);

  const { user } = useSelector(state => state);

  return (
    <section id="sidebar_section">
      <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSidebar ? "expanded" : null}`}>
        <div className="p-0 m-0">
          <SidebarAvatar
            name={user.full_name || user.user_name || "کاربر"}
            imgPath={user.image || "/assets/images/user-default_3.png"}
          />

          <SidebarItem
            targetRoute={"/dashboard"}
            icon={"fas fa-tachometer-alt "}
            text={"داشبورد"}
            permTitle=""
          />
          {/* <!-- =================================== --> */}
          <div className="sidebar-scrollable-container">
            <SidebarTitle
              title={"فروشگاه"}
              permTitles={[
                "read_categories",
                "read_products",
                "read_brands",
                "read_guarantees",
                "read_colors",
                "read_discounts",
              ]}
            />

            <SidebarItem
              targetRoute={"/categories"}
              icon={"fas fa-stream"}
              text={"مدیریت گروه محصول"}
              permTitle="read_categories"
            />

            <SidebarItem
              targetRoute={"/products"}
              icon={"fas fa-cube"}
              text={"مدیریت محصول"}
              permTitle= "read_products"
            />

            <SidebarItem
              targetRoute={"/brands"}
              icon={"fas fa-copyright"}
              text={"مدیریت برند ها"}
              permTitle= "read_brands"
            />

            <SidebarItem
              targetRoute={"/guaranties"}
              icon={"fab fa-pagelines"}
              text={"مدیریت گارانتی ها"}
              permTitle="read_guarantees"
            />

            <SidebarItem
              targetRoute={"/colors"}
              icon={"fas fa-palette"}
              text={"مدیریت رنگ ها"}
              permTitle= "read_colors"
            />

            <SidebarItem
              targetRoute={"/discounts"}
              icon={"fas fa-percentage"}
              text={"مدیریت تخفیف ها"}
              permTitle="read_discounts"
            />

            {/* <!-- =================================== --> */}
            <SidebarTitle
              title={"سفارشات و سبد"}
              permTitles={[
                "read_carts",
                "read_orders",
                "read_deliveries"
              ]}
            />

            <SidebarItem
              targetRoute={"/carts"}
              icon={"fas fa-shopping-basket"}
              text={"مدیریت سبد ها"}
              permTitle="read_carts"
            />

            <SidebarItem
              targetRoute={"/orders"}
              icon={"fas fa-luggage-cart"}
              text={"مدیریت سفارشات"}
              permTitle="read_orders"
            />


            <SidebarItem
              targetRoute={"/deliveries"}
              icon={"fas fa-truck-loading"}
              text={"مدیریت نحوه ارسال"}
              permTitle="read_deliveries"
            />

            {/* <!-- =================================== --> */}
            <SidebarTitle
              title={"کاربران و همکاران"}
              permTitles={[
                "read_users",
                "read_roles",
                "read_permissions"
              ]}
            />

            <SidebarItem
              targetRoute={"/users"}
              icon={"fas fa-users"}
              text={"مشاهده کاربران"}
              permTitle="read_users"
            />

            <SidebarItem
              targetRoute={"/roles"}
              icon={"fas fa-user-tag"}
              permTitle="read_roles"
              text={"نقش ها"}
            />

            <SidebarItem
              targetRoute={"/permissions"}
              icon={"fas fa-shield-alt"}
              text={"مجوز ها"}
              permTitle="read_permissions"
            />
            {/* <!-- =================================== --> */}
            <SidebarTitle
              title={"ارتباطات"}
              permTitles={[
                "read_questions",
                "read_comments"
              ]}
            />

            <SidebarItem
              targetRoute={"/questions"}
              icon={"fas fa-question-circle"}
              text={"سوال ها"}
              permTitle="read_questions"
            />

            <SidebarItem
              targetRoute={"/comments"}
              icon={"fas fa-comment"}
              text={"نظرات"}
              permTitle="read_comments"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Index;
