import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';
import DashboardTable from './DashboardTable';

const Dashboard = () => {
    return (
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
                <DashboardTable />
                <DashboardChart />
            </div>
        </div>
    );
}

export default Dashboard;
