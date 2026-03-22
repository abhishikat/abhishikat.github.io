document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated in
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Chart.js Configuration for Cyber Aesthetic
    Chart.defaults.color = '#94a3b8'; // Slate 400
    Chart.defaults.font.family = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

    const ctxRadar = document.getElementById('skillsRadar').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['Gen AI / ML', 'Cloud Arch', 'Data Eng', 'Finance Models', 'Product Mgmt', 'Algorithms'],
            datasets: [{
                label: 'Proficiency Matrix',
                data: [95, 88, 92, 85, 80, 90],
                backgroundColor: 'rgba(6, 182, 212, 0.15)', // Cyan tinted background
                borderColor: '#22d3ee', // Bright cyan border
                borderWidth: 2,
                pointBackgroundColor: '#050505',
                pointBorderColor: '#22d3ee',
                pointHoverBackgroundColor: '#22d3ee',
                pointRadius: 4,
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
                    pointLabels: {
                        color: '#cbd5e1', // Slate 300
                        font: { size: 12 }
                    },
                    ticks: { display: false, max: 100, min: 0 }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
});
