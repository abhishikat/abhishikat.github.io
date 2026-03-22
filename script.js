document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Apple-Style Scroll Reveal Animation (Liveliness) ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active"); // Add class to trigger animation
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the element enters view
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 2. Chart Settings for Black/Apple Aesthetic ---
    Chart.defaults.color = '#A1A1A6'; // Default gray 3 for text
    Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    // --- 3. Radar Chart (Domain Proficiency) ---
    const ctxRadar = document.getElementById('skillsRadarChart').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: ['AI / ML', 'Data Eng', 'Financial Strategy', 'Cloud Arch', 'Backend Dev', 'Analytics'],
            datasets: [{
                label: 'Expertise',
                data: [95, 88, 85, 90, 80, 92],
                backgroundColor: 'rgba(41, 151, 255, 0.15)', // Light translucent Apple Blue
                borderColor: '#2997FF', // Bright Apple Blue
                borderWidth: 2,
                pointBackgroundColor: '#FFFFFF',
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.05)' },
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    pointLabels: {
                        color: '#FFFFFF',
                        font: { size: 12, weight: '500' }
                    },
                    ticks: { display: false, max: 100, min: 0 }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // --- 4. Doughnut Chart (Technology Distribution) ---
    const ctxDoughnut = document.getElementById('techDoughnutChart').getContext('2d');
    new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ['Python Ecosystem', 'Cloud (AWS/GCP)', 'Data Eng (SQL)', 'Software (Java/C++)'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    '#2997FF', // Blue
                    '#BF5AF2', // Purple
                    '#FF3B30', // Red
                    '#30D158'  // Green
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%', // Inner hollow radius
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#A1A1A6', usePointStyle: true, padding: 20 }
                },
                tooltip: { enabled: true }
            }
        }
    });
});
