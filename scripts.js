/*!
* Start Bootstrap - Small Business v5.0.6 (https://startbootstrap.com/template/small-business)
* Copyright 2013-2026 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
*/
/*!
* Personal Profile & Dashboard Scripts
* Universitas Ibnu Sina - Teknik Informatika & English Educator
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Live WIB Clock in Navbar
    const clockElement = document.getElementById('liveClock');
    if (clockElement) {
        const updateClock = () => {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            clockElement.textContent = `${now.toLocaleTimeString('id-ID', options)} WIB`;
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    // 2. Dark / Light Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = localStorage.getItem('uis_profile_theme') || 'dark';

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            if (theme === 'light') {
                themeIcon.className = 'fa-solid fa-moon';
                themeToggleBtn.setAttribute('title', 'Ganti ke Mode Gelap');
            } else {
                themeIcon.className = 'fa-solid fa-sun';
                themeToggleBtn.setAttribute('title', 'Ganti ke Mode Terang');
            }
        }
        localStorage.setItem('uis_profile_theme', theme);
    };

    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(activeTheme);
        });
    }

    // 3. Animated Number Counters
    const counters = document.querySelectorAll('[data-counter]');
    if ('IntersectionObserver' in window && counters.length > 0) {
        const observerOptions = { threshold: 0.2 };
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-counter'), 10);
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 1500;
                    const startTime = performance.now();

                    const updateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeProgress * target);
                        counter.textContent = current + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target + suffix;
                        }
                    };

                    requestAnimationFrame(updateCount);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // 4. Chart.js Competency Radar & Teaching Focus Charts
    const initCharts = () => {
        const radarCtx = document.getElementById('skillsRadarChart');
        if (radarCtx && typeof Chart !== 'undefined') {
            new Chart(radarCtx, {
                type: 'radar',
                data: {
                    labels: [
                        'Web & Frontend Dev',
                        'Algorithm & Data Structure',
                        'Database (MySQL)',
                        'English Grammar & Structure',
                        'Speaking & Pronunciation',
                        'Classroom Pedagogy',
                        'Public Speaking & Mentoring'
                    ],
                    datasets: [
                        {
                            label: 'Tingkat Kemahiran (%)',
                            data: [88, 82, 80, 92, 95, 96, 90],
                            backgroundColor: 'rgba(99, 102, 241, 0.25)',
                            borderColor: '#6366f1',
                            pointBackgroundColor: '#06b6d4',
                            pointBorderColor: '#ffffff',
                            pointHoverBackgroundColor: '#ffffff',
                            pointHoverBorderColor: '#06b6d4',
                            borderWidth: 2
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.08)'
                            },
                            pointLabels: {
                                color: '#9ca3af',
                                font: {
                                    size: 11,
                                    family: "'Plus Jakarta Sans', sans-serif"
                                }
                            },
                            ticks: {
                                display: false,
                                min: 0,
                                max: 100
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(17, 24, 39, 0.9)',
                            titleFont: { family: "'Plus Jakarta Sans', sans-serif" },
                            bodyFont: { family: "'Plus Jakarta Sans', sans-serif" },
                            callbacks: {
                                label: function(context) {
                                    return ` Kemampuan: ${context.parsed.r}%`;
                                }
                            }
                        }
                    }
                }
            });
        }

        const teachingCtx = document.getElementById('teachingDonutChart');
        if (teachingCtx && typeof Chart !== 'undefined') {
            new Chart(teachingCtx, {
                type: 'doughnut',
                data: {
                    labels: [
                        'Daily Conversation & Speaking',
                        'Basic Grammar & Sentence Pattern',
                        'Phonics, Vocabulary & Listening',
                        'Mentoring & Self-Confidence'
                    ],
                    datasets: [{
                        data: [40, 25, 20, 15],
                        backgroundColor: [
                            '#6366f1',
                            '#06b6d4',
                            '#10b981',
                            '#f59e0b'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#9ca3af',
                                boxWidth: 12,
                                padding: 12,
                                font: {
                                    size: 11,
                                    family: "'Plus Jakarta Sans', sans-serif"
                                }
                            }
                        }
                    },
                    cutout: '70%'
                }
            });
        }
    };

    initCharts();

    // 5. Resume / Print Profile Action
    const printCvBtn = document.getElementById('printCvBtn');
    if (printCvBtn) {
        printCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    }

    const heroPrintCvBtn = document.getElementById('heroPrintCvBtn');
    if (heroPrintCvBtn) {
        heroPrintCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    }
});