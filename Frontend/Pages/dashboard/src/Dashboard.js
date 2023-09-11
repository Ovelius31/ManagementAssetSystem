document.addEventListener('DOMContentLoaded', async function () {
    // Inisialisasi grafik pertama kali
    const chartLabels = ['New', 'Old', 'Repaired', 'Bad', 'Moved'];
    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Item',
                backgroundColor: ['#4299e1', '#ecc94b', '#f6ad55', '#f56565', '#98FB98'],
                data: [0, 0, 0, 0, 0], // Default data
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
            const response = await fetch(`/api/data?startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    function updateChartWithData(data) {
        const newData = chartLabels.map(label => {
            const matchingItem = data.find(item => item.condition === label);
            return matchingItem ? matchingItem.count : 0;
        });

        chart.data.datasets[0].data = newData;
        chart.update();
    }

    const shortDateInput = document.getElementById('sortDateInput');
    const endDateInput = document.getElementById('endDateInput');

    async function updateChart() {
        const selectedDate = shortDateInput.value;
        let startDate = selectedDate;
        let endDate = endDateInput.value || selectedDate;

        const data = await fetchData(startDate, endDate);
        updateChartWithData(data);
    }

    shortDateInput.addEventListener('change', updateChart);
    endDateInput.addEventListener('change', updateChart);

    // Render grafik dengan data yang diurutkan
    function renderChart(sortedData) {
        // ... (kode untuk merender grafik) ...
    }

    // Event listener saat input tanggal diubah
    const sortDateSelect = document.getElementById('sortDateSelect');
    sortDateSelect.addEventListener('change', () => {
        const selectedDate = new Date(shortDateInput.value);
        const filteredData = data.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.toDateString() === selectedDate.toDateString();
        });
        const order = sortDateSelect.value;
        const sortedData = sortByDate(filteredData, order);
        renderChart(sortedData);
    });

    
});
