import { useHasPermission } from '../../hooks/hasPermission';
import Cards from './Cards';
import DashboardChart from './DashboardChart';
import DashboardTable from './DashboardTable';

const Dashboard = () => {
    const hasCardsPermission = useHasPermission("read_order_statistics");
    const hasTablePermission = useHasPermission("read_fewer_products");
    const hasChartPermission = useHasPermission("read_orders_year");

    return (
        <div id="dashboard_section" className="dashboard_section main_section">
            <div className="row">
                {hasCardsPermission && <Cards />}
            </div>
            <div className="row">
                {hasTablePermission && <DashboardTable />}
                {hasChartPermission && <DashboardChart />}
            </div>
        </div>
    );
}

export default Dashboard;
