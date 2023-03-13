import Cards from './Cards';
import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';
import DashboardTable from './DashboardTable';

const Dashboard = () => {
    return (
        <div id="dashboard_section" className="dashboard_section main_section">

            <div className="row">
                <Cards />
            </div>


            <div className="row">
                <DashboardTable />
                <DashboardChart />
            </div>
        </div>
    );
}

export default Dashboard;
