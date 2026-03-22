// 1. Apple-Style Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Chart.js Global Settings for Dark Mode
Chart.defaults.color = '#86868b';
Chart.defaults.font.family = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// 2. Radar Chart: Core Competencies
const ctxRadar = document.getElementById('skillsRadar').getContext('2d');
new Chart(ctxRadar, {
    type: 'radar',
    data: {
        labels: ['AI / Machine Learning', 'Cloud & Data Eng', 'Financial Modeling', 'Backend Dev', 'Product Management', 'Data Analytics'],
        datasets: [{
            data: [95, 88, 85, 90, 80, 92],
            backgroundColor: 'rgba(41, 151, 255, 0.15)', // Apple Blue tinted
            borderColor: '#2997ff',
            borderWidth: 2,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#2997ff',
            pointRadius: 3,
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                pointLabels: { color: '#ffffff', font: { size: 11, weight: '500' } },
                ticks: { display: false, max: 100, min: 0 }
            }
        },
        plugins: { legend: { display: false }, tooltip: { enabled: true } }
    }
});

// 3. Doughnut Chart: Technology Distribution
const ctxDoughnut = document.getElementById('techDoughnut').getContext('2d');
new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
        labels: ['Python/ML Ecosystem', 'Cloud (AWS/GCP/Azure)', 'Data Engineering (SQL/BigQuery)', 'Software Dev (Java/C++)'],
        datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: [
                '#2997ff', // Blue
                '#a252fa', // Purple
                '#ff3b30', // Red
                '#34c759'  // Green
            ],
            borderWidth: 0,
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
            legend: { 
                position: 'right',
                labels: { color: '#86868b', usePointStyle: true, padding: 20 }
            }
        }
    }
});
