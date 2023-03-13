import moment from 'moment-jalaali';
import React, { useState } from 'react';
import { useEffect } from 'react';
import SpinnerLoader from '../../components/SpinnerLoader';
import { getThisYearOrdersService } from '../../services/ordersServices';
import { drawDashboardChart } from '../../utils/dashboardChart';

const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

const DashboardChart = () => {
    const [loading, setLoading] = useState([]);

    const handleGetThisYearOrdersInfo = async () => {
        setLoading(true);
        try {
            const response = await getThisYearOrdersService();
            if (response.status === 200) {
                const now = moment();
                let thisMonth = now.jMonth();
                let thisYearOrdersInfo = [];
                for (let i = 0; i < 12; i++) {
                    thisMonth === -1 && (thisMonth = 11);
                    thisYearOrdersInfo.push({ month: thisMonth, amount: 0 });
                    thisMonth--;
                };

                const orders = response.data.data;
                for (let order of orders) {
                    const orderMoment = moment(order.pay_at);
                    const orderMonth = orderMoment.jMonth();
                    const index = thisYearOrdersInfo.findIndex(o => o.month === orderMonth);
                    thisYearOrdersInfo[index].amount = thisYearOrdersInfo[index].amount + parseInt(order.pay_amount);
                }
                thisYearOrdersInfo.reverse();

                const labels = thisYearOrdersInfo.map(o => months[o.month]);
                const datapoints = thisYearOrdersInfo.map(o => (parseInt(o.amount) / 1000000));
                drawDashboardChart(labels, datapoints);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetThisYearOrdersInfo();
    }, []);

    return (
        <div className="col-12 col-lg-6">
            {loading ? (
                <div className='my-5'>
                    <SpinnerLoader colorClass="text-primary" />
                </div>
            ) : (
            <canvas id="myChart" height="195"></canvas>
            )}
        </div>
    );
}

export default DashboardChart;
