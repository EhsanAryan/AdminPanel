import React, { useEffect } from 'react';
import { drawDashboardChart } from '../../utils/dashboardChart';
import DashboardCard from './DashboardCard';
import Table from './DashboardTable';

const Dashboard =() => {

    useEffect(() => {
        const labels = ['فروردین' , 'اردیبهشت', 'خرداد' , 'تیر' , 'مرداد' , 'شهریور' , 'مهر' , 'آبان' , 'آذر' , 'دی' , 'بهمن' , 'اسفند'];
        const datapoints = [10, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
        drawDashboardChart(labels , datapoints);
    } , []);

  return (
    // <!-- #region(collapsed) dashboard section start -->
    <div id="dashboard_section" className="dashboard_section main_section">

        <div className="row">
            <DashboardCard
            currentValue={7}
            title={"سبد خرید امروز"}
            desc={"سبد های خرید مانده امروز"} 
            lastWeekValue={13}
            lastMonthValue={18}
            icon={"fas fa-shopping-basket"}
            />

            <DashboardCard
            currentValue={5}
            title={"سفارشات مانده امروز"}
            desc={"سفارشات معلق و فاقد پرداختی"} 
            lastWeekValue={9}
            lastMonthValue={16}
            icon={"fas fa-dolly"}
            />

            <DashboardCard
            currentValue={45}
            title={"سفارشات امروز"}
            desc={"سفارشات کامل و دارای پرداختی"} 
            lastWeekValue={263}
            lastMonthValue={1038}
            icon={"fas fa-luggage-cart"}
            />

            <DashboardCard
            currentValue={"1,500,000"}
            title={"درآمد امروز"}
            desc={"جمع مبالغ پرداختی (تومان)"} 
            lastWeekValue={"6,380,000"}
            lastMonthValue={"22,480,000"}
            icon={"fas fa-money-check-alt"}
            />

        </div>


        <div className="row">

            <div className="col-12 col-lg-6">
                <p className="text-center mt-3 text-dark">محصولات رو به اتمام</p>
                <Table />
            </div>

            <div className="col-12 col-lg-6">
                <canvas id="myChart" height="195"></canvas>
            </div>

        </div>

    </div>
    // <!-- #endregion content -->
  )
}

export default Dashboard;
