// Initialize dynamic charts using Chart.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Radar Chart (Technical Proficiency)
    const skillsCtx = document.getElementById('skillsChart').getContext('2d');
    new Chart(skillsCtx, {
        type: 'radar',
        data: {
            labels: ['AI / Gen AI/ML', 'Cloud Architecture', 'Data Engineering', 'Financial Modeling', 'Backend Development'],
            datasets: [{
                label: 'Proficiency Level',
                data: [90, 85, 95, 75, 80],
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.2)', // Light blue fill
                borderColor: 'rgb(59, 130, 246)', // Blue line
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(59, 130, 246)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#a1a1aa' },
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: { display: false } // Hide the default legend for a cleaner look
            }
        }
    });
});
