import React from 'react';
import { useEffect } from 'react';
import { drawDashboardChart } from '../../utils/dashboardChart';

const DashboardChart = () => {
    useEffect(() => {
        const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        const datapoints = [10, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
        drawDashboardChart(labels, datapoints);
    }, []);

    return (
        <div className="col-12 col-lg-6">
            <canvas id="myChart" height="195"></canvas>
        </div>
    );
}

export default DashboardChart;
