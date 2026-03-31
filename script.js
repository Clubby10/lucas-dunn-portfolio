// wait for page to load
document.addEventListener("DOMContentLoaded", () => {
    
    // grab data from config
    const personalData = portfolioData.personal;
    if (personalData) {
        document.getElementById('name').textContent = personalData.name;
        document.getElementById('role').textContent = personalData.role;
        document.getElementById('intro').textContent = personalData.introMessage;
    }

    // build projects list
    const projectsContainer = document.getElementById('projects-container');
    if (portfolioData.projects) {
        let projectsHTML = '';
        portfolioData.projects.forEach(project => {
            let descriptionHTML = '';
            
            // handle arrays vs strings for descriptions
            if (Array.isArray(project.description)) {
                let listItems = project.description.map(desc => `<li>- ${desc}</li>`).join('');
                descriptionHTML = `<ul class="task-list" style="margin-top: 5px; margin-bottom: 5px;">${listItems}</ul>`;
            } else {
                descriptionHTML = `<p class="details">  - ${project.description}</p>`;
            }

            let githubLinkHTML = project.github ? `<p class="project-link">  - Repo: <a href="${project.github}" target="_blank" rel="noopener noreferrer">${project.github}</a></p>` : '';

            projectsHTML += `
                <div class="content-block">
                    <h3 class="folder-name">${project.name}</h3>
                    ${descriptionHTML}
                    <p class="tech-stack">  - Stack: ${project.techStack}</p>
                    ${githubLinkHTML}
                </div>
            `;
        });
        projectsContainer.innerHTML = projectsHTML;
    }

    // build work history
    const experienceContainer = document.getElementById('experience-container');
    if (portfolioData.experience) {
        let experienceHTML = '';
        portfolioData.experience.forEach(exp => {
            let tasksHTML = exp.tasks.map(task => `<li>> ${task}</li>`).join('');
            let imgHTML = exp.image ? `<img src="${exp.image}" alt="${exp.company} logo" class="entry-logo">` : '';
            
            experienceHTML += `
                <div class="content-block">
                    <div class="entry-header" style="align-items: flex-start;">
                        ${imgHTML}
                        <div class="entry-title-container">
                            <h3 class="job-title">${exp.title} <span class="company">@ ${exp.company}</span></h3>
                            <p class="date-location">${exp.date} | ${exp.location}</p>
                            <ul class="task-list" style="margin-top: 5px;">
                                ${tasksHTML}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        });
        experienceContainer.innerHTML = experienceHTML;
    }

    // build education section
    const educationContainer = document.getElementById('education-container');
    if (portfolioData.education) {
        let educationHTML = '';
        portfolioData.education.forEach(edu => {
            let courseworkHTML = edu.coursework.map(course => `<p>> ${course}</p>`).join('');
            let imgHTML = edu.image ? `<img src="${edu.image}" alt="${edu.school} logo" class="entry-logo">` : '';
            
            educationHTML += `
                <div class="content-block">
                    <div class="entry-header" style="align-items: flex-start;">
                        ${imgHTML}
                        <div class="entry-title-container">
                            <h3 class="school-name">${edu.school}</h3>
                            <p class="degree">${edu.degree}</p>
                            <p class="grad-date">${edu.gradDate}</p>
                            ${edu.gpa ? `<p class="gpa">GPA: ${edu.gpa}</p>` : ''}
                            <div style="margin-top: 10px;">
                                <p class="coursework"><strong>Relevant Coursework:</strong></p>
                                ${courseworkHTML}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        educationContainer.innerHTML = educationHTML;
    }

    // setup scroll reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // lower threshold to ensure it shows up even if tall
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    const hiddenSections = document.querySelectorAll('.scroll-section.hidden');
    hiddenSections.forEach(section => {
        scrollObserver.observe(section);
    });

    // random header glitch effect
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            glitchText.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                glitchText.style.transform = 'translate(0, 0)';
            }, 50);
        }, 3000);
    }

    // full-page smooth scrolling logic
    let isScrolling = false;
    let currentSectionIndex = 0;
    const sections = Array.from(document.querySelectorAll('.scroll-section'));

    // map navbar links to update index when clicked
    document.querySelectorAll('#navbar a').forEach((link, index) => {
        link.addEventListener('click', (e) => {
            currentSectionIndex = index;
        });
    });

    // Handle keyboard arrow scrolling
    window.addEventListener('keydown', (e) => {
        // Only take over if the window is tall enough
        if (window.innerHeight < 900) return;
        
        // Prevent stacking jumps
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        // Check if the current section is taller than the viewport
        const currentSection = sections[currentSectionIndex];
        const isTallerThanViewport = currentSection.scrollHeight > window.innerHeight;

        const isDownKey = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ';
        const isUpKey = e.key === 'ArrowUp' || e.key === 'PageUp';

        if (!isDownKey && !isUpKey) return;

        // If the section is taller than the viewport, let normal scrolling happen 
        // until we hit the top or bottom
        if (isTallerThanViewport) {
            const atTop = window.scrollY <= currentSection.offsetTop + 10;
            const atBottom = window.scrollY + window.innerHeight >= currentSection.offsetTop + currentSection.scrollHeight - 10;
            
            if (isDownKey && !atBottom) return; 
            if (isUpKey && !atTop) return;    
        }

        // We are at an edge (or section is small), take over scrolling
        e.preventDefault();
        
        if (isScrolling) return;

        if (isDownKey) {
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                scrollToSection(currentSectionIndex, 'down');
            }
        } else if (isUpKey) {
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                scrollToSection(currentSectionIndex, 'up');
            }
        }
    });

    // Update current index based on manual scrolling
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        let current = '';
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionIndex = index;
            }
        });
    });

    window.addEventListener('wheel', (e) => {
        // Only take over scrolling if the window is tall enough to fit the sections
        // Otherwise, allow normal scrolling so users can read overflowing content
        if (window.innerHeight < 900) return; // Increased threshold for safety
        
        // Prevent scroll stacking / glitching if we are already in an animation lock
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        // Check if the current section is taller than the viewport
        const currentSection = sections[currentSectionIndex];
        const isTallerThanViewport = currentSection.scrollHeight > window.innerHeight;

        // If the section is taller than the viewport, only take over scroll
        // if we are at the very top (and trying to scroll up) or 
        // at the very bottom (and trying to scroll down)
        if (isTallerThanViewport) {
            const atTop = window.scrollY <= currentSection.offsetTop + 10;
            const atBottom = window.scrollY + window.innerHeight >= currentSection.offsetTop + currentSection.scrollHeight - 10;
            
            if (e.deltaY > 0 && !atBottom) return; // Scrolling down but not at bottom
            if (e.deltaY < 0 && !atTop) return;    // Scrolling up but not at top
        }

        // disable default scrolling
        e.preventDefault();
        
        if (isScrolling) return;

        // determine scroll direction
        if (e.deltaY > 0) {
            // scrolling down
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                scrollToSection(currentSectionIndex, 'down');
            }
        } else {
            // scrolling up
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                scrollToSection(currentSectionIndex, 'up');
            }
        }
    }, { passive: false });

    function scrollToSection(index, scrollDirection = 'down') {
        isScrolling = true;
        
        // If scrolling up to a section that is taller than the viewport,
        // snap to the bottom of that section instead of the top
        const targetSection = sections[index];
        if (scrollDirection === 'up' && targetSection.scrollHeight > window.innerHeight) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // wait for scroll to finish before allowing another one
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // 1 second cooldown matches typical smooth scroll duration
    }

    // theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // check saved theme
    const savedTheme = localStorage.getItem('theme');
    
    // start in light mode if no preference
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Toggle light mode');
    } else {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }

    // swap theme on click
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