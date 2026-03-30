// portfolio content data
const portfolioData = {
    // hero section
    personal: {
        name: "Lucas Dunn",
        role: "Computing Student @ Queen’s University | Software Engineer",
        introMessage: "Scroll down to explore my projects, experience, and technical background."
    },

    // stuff i've built
    projects: [
        {
            name: "MBS Manual Posting Tool",
            description: [
                "Developed a Java desktop application to post and validate hundreds of order records per week through IBM MQ, streamlining manual processing workflows.",
                "Designed a multi-step Swing interface that reduced posting errors by ~40% through enforced validation and confirmation logic.",
                "Implemented a messaging abstraction layer with automatic retries and fault recovery, improving system reliability under failure conditions."
            ],
            techStack: "Java, IBM MQ, Swing, XML, Git",
            github: "" // Add your github link here (e.g. "https://github.com/yourusername/repo")
        },
        {
            name: "MQ Trigger Monitoring Service",
            description: [
                "Built a Java service to consume and process IBM MQ trigger events, automating workflows across multiple downstream systems and reducing manual intervention.",
                "Implemented an event listener pipeline achieving sub-second latency, enabling faster system responses across distributed services."
            ],
            techStack: "Java, IBM MQ, XML, Git",
            github: "" // Optional: link won't render if left empty
        },
        {
            name: "Hole In One Hub",
            description: [
                "Developed a full-featured iOS application with geolocation-based course discovery and Firebase-backed persistence.",
                "Implemented authentication, user profiles, and social interactions with real-time cloud data synchronization using Firebase."
            ],
            techStack: "Swift, iOS, Firebase, Git",
            github: "" 
        }
    ],

    // work history
    experience: [
        {
            title: "Software Engineer",
            company: "Dunn Tech Consulting Inc",
            image: "config/images/dunntech.jpg", // Add image path here (e.g. "config/images/logo.png")
            date: "Apr 2025 - Present",
            location: "Hamilton, Ontario, Canada · Remote",
            tasks: [
                "Migrated 2 legacy services from C# and C++ to Java, improving portability across Windows, Linux, and mobile platforms.",
                "Modernized IBM MQ messaging systems processing thousands of daily queue-driven transactions, improving throughput and system reliability.",
                "Built and maintained event-driven architectures across multiple interconnected services, improving system reliability and fault tolerance.",
                "Deployed and maintained production systems in Linux environments using Git-based CI/CD workflows."
            ]
        },
        {
            title: "Production Operations Intern - Coke Plant",
            company: "ArcelorMittal Dofasco",
            image: "config/images/arcelormittaldofasco.jpg", // Optional: image won't render if left empty
            date: "May 2025 - Aug 2025",
            location: "Hamilton, Ontario, Canada · On-site",
            tasks: [
                "Supported continuous 24/7 coke production operations in a high-safety, time-critical industrial environment.",
                "Maintained operational workflows under strict uptime and safety constraints, contributing to uninterrupted production in a 24/7 industrial system.",
                "Collaborated with plant operators and supervisors to execute tasks efficiently in a fast-paced setting."
            ]
        },
        {
            title: "Assistant Student Custodian",
            company: "Hamilton-Wentworth Catholic District School Board",
            image: "config/images/hwcdsb.jpg",
            date: "Jul 2024 - Aug 2024",
            location: "Hamilton, Ontario, Canada · On-site",
            tasks: [
                "Assisted with deep cleaning and floor maintenance, including wax stripping, sealing, waxing, and operating a Zamboni to prepare school facilities for the academic year."
            ]
        },
        {
            title: "iOS App Developer",
            company: "Career Education Council",
            image: "config/images/career_education_council_logo.jpg",
            date: "Feb 2023 - Jun 2023",
            location: "Remote",
            tasks: [
                "Developed Hole In One Hub, a fully functional golf social media iOS app built in Swift featuring a live feed, digital scorecards, and a course finder.",
                "Integrated Firebase authentication and real-time cloud data persistence to support core social and scoring functionality.",
                "Shipped to 10 beta users and presented at Apple Canada's App Development with Swift Co-op Experience 2023, receiving feedback from industry judges."
            ]
        }
    ],

    // school stuff
    education: [
        {
            school: "Queen’s University",
            image: "", // Add image path here (e.g. "config/images/queens.png")
            degree: "Bachelor of Computing (Honours), Software Design",
            gradDate: "Expected Graduation: Apr 2028",
            gpa: "3.9/4.3",
            coursework: [
                "Data Structures",
                "Systems Programming",
                "Computer Architecture",
                "Discrete Structures I & II",
                "Linear Algebra"
            ]
        },
        {
            school: "Queen’s University",
            image: "",
            degree: "Minor in Economics",
            gradDate: "Expected Completion: Apr 2028",
            gpa: "",
            coursework: [
                "Microeconomics",
                "Macroeconomics"
            ]
        }
    ]
};