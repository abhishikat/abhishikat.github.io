// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Charts Configuration
const chartDefaults = {
    color: '#a1a1a6',
    font: { family: 'SF Pro Display, system-ui, sans-serif' }
};

// Radar Chart
new Chart(document.getElementById('skillsRadar'), {
    type: 'radar',
    data: {
        labels: ['AI/GenAI', 'Cloud Eng', 'Financial Modeling', 'Data Science', 'Product Mgmt', 'Security'],
        datasets: [{
            data: [95, 88, 85, 92, 80, 90],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6',
            borderWidth: 2,
            pointRadius: 0
        }]
    },
    options: {
        scales: {
            r: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                angleLines: { color: 'rgba(255,255,255,0.05)' },
                pointLabels: { color: '#a1a1a6', font: { size: 11 } },
                ticks: { display: false }
            }
        },
        plugins: { legend: { display: false } }
    }
});

// Bar Chart
new Chart(document.getElementById('impactBar'), {
    type: 'bar',
    data: {
        labels: ['Accuracy Boost', 'QA Savings ($)', 'Client Retention', 'Latency Improvement'],
        datasets: [{
            data: [25, 50, 25, 40],
            backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
            borderRadius: 20,
            barThickness: 12
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: { display: false },
            y: { grid: { display: false }, ticks: { color: '#a1a1a6' } }
        },
        plugins: { legend: { display: false } }
    }
});
