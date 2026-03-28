// Ensure DOM is fully loaded before manipulating
document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------
    // 1. DYNAMICALLY LOAD CONTENT FROM CONFIG (data.js)
    // -----------------------------------------------------

    // Home Section
    const personalData = portfolioData.personal;
    if (personalData) {
        document.getElementById('name').textContent = personalData.name;
        document.getElementById('role').textContent = personalData.role;
        document.getElementById('intro').textContent = personalData.introMessage;
    }

    // Projects Section
    const projectsContainer = document.getElementById('projects-container');
    if (portfolioData.projects) {
        let projectsHTML = '';
        portfolioData.projects.forEach(project => {
            let descriptionHTML = '';
            
            if (Array.isArray(project.description)) {
                let listItems = project.description.map(desc => `<li>- ${desc}</li>`).join('');
                descriptionHTML = `<ul class="task-list" style="margin-top: 5px; margin-bottom: 5px;">${listItems}</ul>`;
            } else {
                descriptionHTML = `<p class="details">  - ${project.description}</p>`;
            }

            projectsHTML += `
                <div class="content-block">
                    <h3 class="folder-name">drwxr-xr-x  ${project.name}</h3>
                    ${descriptionHTML}
                    <p class="tech-stack">  - Stack: ${project.techStack}</p>
                </div>
            `;
        });
        projectsContainer.innerHTML = projectsHTML;
    }

    // Experience Section
    const experienceContainer = document.getElementById('experience-container');
    if (portfolioData.experience) {
        let experienceHTML = '';
        portfolioData.experience.forEach(exp => {
            let tasksHTML = exp.tasks.map(task => `<li>> ${task}</li>`).join('');
            
            experienceHTML += `
                <div class="content-block">
                    <h3 class="job-title">${exp.title} <span class="company">@ ${exp.company}</span></h3>
                    <p class="date-location">${exp.date} | ${exp.location}</p>
                    <ul class="task-list">
                        ${tasksHTML}
                    </ul>
                </div>
            `;
        });
        experienceContainer.innerHTML = experienceHTML;
    }

    // Education Section
    const educationContainer = document.getElementById('education-container');
    if (portfolioData.education) {
        let educationHTML = '';
        portfolioData.education.forEach(edu => {
            let courseworkHTML = edu.coursework.map(course => `<p>> ${course}</p>`).join('');
            
            educationHTML += `
                <div class="content-block">
                    <h3 class="school-name">${edu.school}</h3>
                    <p class="degree">${edu.degree}</p>
                    <p class="grad-date">${edu.gradDate}</p>
                    <p class="gpa">GPA: ${edu.gpa}</p>
                    <br>
                    <p class="coursework"><strong>Relevant Coursework:</strong></p>
                    ${courseworkHTML}
                </div>
            `;
        });
        educationContainer.innerHTML = educationHTML;
    }

    // -----------------------------------------------------
    // 2. INITIALIZE SCROLL REVEAL ANIMATIONS
    // -----------------------------------------------------

    // Set up the observer options
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    // Callback function to handle the intersection events
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is visible in the viewport
            if (entry.isIntersecting) {
                // Add the 'show' class to trigger CSS animation
                entry.target.classList.add('show');
            }
        });
    };

    // Create the observer instance
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Get all sections with the 'hidden' class and observe them
    const hiddenSections = document.querySelectorAll('.scroll-section.hidden');
    hiddenSections.forEach(section => {
        scrollObserver.observe(section);
    });

    // -----------------------------------------------------
    // 3. OPTIONAL EFFECTS
    // -----------------------------------------------------
    
    // Add a subtle glitch effect to the main header periodically
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                glitchText.style.transform = 'translate(0, 0)';
            }, 50);
        }, 3000);
    }

    // -----------------------------------------------------
    // 4. LIGHT/DARK MODE TOGGLE
    // -----------------------------------------------------
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage for saved theme preference on load
    const savedTheme = localStorage.getItem('theme');
    
    // Default to light mode if no saved preference
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Toggle light mode');
    } else {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Toggle light mode');
        }
    });

});