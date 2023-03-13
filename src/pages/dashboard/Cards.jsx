import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SpinnerLoader from '../../components/SpinnerLoader';
import { getOrdersStatisticsService } from '../../services/ordersServices';
import DashboardCard from './DashboardCard';

const cardObjects = [
    {
        key: "card_1",
        name: "carts",
        currentValue: 0,
        title: "سبد خرید امروز",
        desc: "سبد های خرید مانده امروز",
        lastWeekValue: 0,
        lastMonthValue: 0,
        icon: "fas fa-shopping-basket",
        className: "col-md-6 col-lg-3"
    },
    {
        key: "card_2",
        name: "pendingOrders",
        currentValue: 0,
        title: "سفارشات مانده امروز",
        desc: "سفارشات معلق و فاقد پرداختی",
        lastWeekValue: 0,
        lastMonthValue: 0,
        icon: "fas fa-dolly",
        className: "col-md-6 col-lg-3"
    },
    {
        key: "card_3",
        name: "successOrders",
        currentValue: 0,
        title: "سفارشات امروز",
        desc: "سفارشات کامل و دارای پرداختی",
        lastWeekValue: 0,
        lastMonthValue: 0,
        icon: "fas fa-luggage-cart",
        className: "col-md-6 col-lg-3"
    },
    {
        key: "card_4",
        name: "successOrdersAmount",
        currentValue: 0,
        title: "درآمد امروز",
        desc: "جمع مبالغ پرداختی (تومان)",
        lastWeekValue: 0,
        lastMonthValue: 0,
        icon: "fas fa-money-check-alt",
        className: "col-md-6 col-lg-3"
    }
]

const Cards = () => {
    const [cardsInfo, setCardsInfo] = useState(cardObjects);
    const [loading, setLoading] = useState(false);

    const handleGetOrdersStatistics = async () => {
        setLoading(true);
        try {
            const response = await getOrdersStatisticsService();
            if (response.status === 200) {
                const data = response.data.data;
                let newCardObjects = [...cardObjects];
                for (let key in data) {
                    const index = newCardObjects.findIndex(co => co.name === key);
                    newCardObjects[index].currentValue = data[key].today;
                    newCardObjects[index].lastWeekValue = data[key].thisWeek;
                    newCardObjects[index].lastMonthValue = data[key].thisMonth;
                }
                setCardsInfo(newCardObjects);
                console.log(newCardObjects);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetOrdersStatistics();
    }, []);

    return (
        <>
            {
                loading ? (
                    <div className='my-5'><SpinnerLoader colorClass="text-primary" /></div>
                ) : (
                    <>
                        {cardsInfo.map(cInfo => {
                            return (
                                <DashboardCard {...cInfo} />
                            );
                        })}
                    </>
                )
            }
        </>
    );
}

export default Cards;
