import Chart from "chart.js/auto";

export const drawDashboardChart = (labels , datapoints) => {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'فروش ماه',
                    data: datapoints,
                    borderColor: "#1565c0",
                    borderWidth: 3,
                    backgroundColor: "#1565c033",
                    fill: true,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                }
            ]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins : {
                    title: {
                        display: true,
                        text: 'نمودار فروش یک سال گذشته'
                    }
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x : {
                        display: true,
                        title: {
                            display: true,
                            text: 'ماه'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: ' میلیون تومان'
                        },
                        // suggestedMin: -10,
                        // suggestedMax: 200
                    }
                }
            }
        };

        const chartExist = Chart.getChart("myChart");
        if (chartExist) {
               chartExist.destroy(); 
        }

        const ctx = document.getElementById('myChart')?.getContext('2d');
        new Chart(ctx , config);
}