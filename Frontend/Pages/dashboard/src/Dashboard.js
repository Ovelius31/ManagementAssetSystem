document.addEventListener('DOMContentLoaded', async function () {
    const chartLabels = ['New', 'Old', 'Repaired', 'Bad', 'Moved'];
    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Condition   ',
                backgroundColor: ['#4299e1', '#ecc94b', '#f6ad55', '#f56565', '#98FB98'],
                data: [0, 0, 0, 0, 0],
            },
        ],
    };

    const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                },
            },
        },
    };

    var chart = new Chart(document.getElementById('barChart'), chartConfig);

    async function fetchData(startDate, endDate) {
        try {
            const startDateDatabaseFormat = convertDateFormatToDatabase(startDate);
            const endDateDatabaseFormat = convertDateFormatToDatabase(endDate);

            const response = await fetch(`/IT%20Management%20Asset/Backend/src/asset/grafik.php?startDate=${startDateDatabaseFormat}&endDate=${endDateDatabaseFormat}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    function updateChartWithData(data) {
        const conditionCounts = {
            'New': 0,
            'Old': 0,
            'Repaired': 0,
            'Bad': 0,
            'Moved': 0
        };
    
        data.forEach(item => {
            if (conditionCounts.hasOwnProperty(item.Condition)) {
                conditionCounts[item.Condition]++;
            }
        });
    
        // Memperbarui grafik
        const newData = chartLabels.map(label => conditionCounts[label]);
        chart.data.datasets[0].data = newData;
        chart.update();
    
        // Memperbarui bagian "Detail data"
        chartLabels.forEach(condition => {
            const element = document.querySelector(`#detailDataContainer [data-condition="${condition}"]`);
            if (element) {
                element.querySelector('.text-3xl').textContent = conditionCounts[condition];
            }
        });
    }
    

    

    const startDateInput = document.getElementById('startDateInput');
    const endDateInput = document.getElementById('endDateInput');

    async function updateChart() {
        const selectedStartDate = startDateInput.value;
        const selectedEndDate = endDateInput.value || selectedStartDate;

        const data = await fetchData(selectedStartDate, selectedEndDate);
        updateChartWithData(data);
    }

    startDateInput.addEventListener('change', updateChart);
    endDateInput.addEventListener('change', updateChart);

    // Memperbarui grafik saat halaman dimuat
    const initialData = await fetchData();
    updateChartWithData(initialData);

    
});

function convertDateFormatToDatabase(inputDate) {
    const parts = inputDate.split("/");
    if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
    }
    return inputDate;
}
