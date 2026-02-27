
    // Initialize Particles.js
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#38bdf8" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#38bdf8",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });

    // Theme Toggle Functionality - Fixed Version
    const themeBtn = document.getElementById("themeBtn");
    const body = document.body;
    const themeIcon = themeBtn.querySelector("i");

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      body.setAttribute("data-theme", savedTheme);
      updateThemeIcon(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      body.setAttribute("data-theme", defaultTheme);
      updateThemeIcon(defaultTheme);
    }

    function updateThemeIcon(theme) {
      if (theme === "dark") {
        themeIcon.className = "fa-solid fa-moon";
      } else {
        themeIcon.className = "fa-solid fa-sun";
      }
    }

    themeBtn.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenu");
    const mobileNav = document.getElementById("mobileNav");

    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      if (mobileNav.classList.contains("active")) {
        icon.className = "fas fa-times";
      } else {
        icon.className = "fas fa-bars";
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
        mobileMenuBtn.querySelector("i").className = "fas fa-bars";
      });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".desktop-nav ul li a");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav ul li a");

    function setActiveLink() {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      // Update desktop nav
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });

      // Update mobile nav
      mobileNavLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Skill Progress Bars Animation
      (function() {
    // Configuration
    const ANIMATION_DELAY = 100; // ms between category animations
    const OFFSET = 150; // pixels from viewport to trigger animation

    // Get all elements to animate
    const sectionTitle = document.querySelector('.section-title');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Store original data for skill items
    skillCategories.forEach((category, catIndex) => {
      const items = category.querySelectorAll('.skill-item');
      items.forEach((item, itemIndex) => {
        // Set CSS variable for staggered animation
        item.style.setProperty('--item-index', itemIndex + 1);
      });
    });

    // Function to check if element is in viewport
    function isElementInViewport(el) {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - OFFSET && rect.bottom > 0;
    }

    // Animate skill bars with target percentages
    function animateSkillBars() {
      const progressBars = document.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        if (bar.dataset.animated === 'true') return;
        
        const parentSection = bar.closest('.skill-category');
        if (!parentSection) return;
        
        // Only animate if parent category is visible or animated
        if (parentSection.classList.contains('animated') || isElementInViewport(parentSection)) {
          const targetWidth = bar.getAttribute('data-width') || '0';
          bar.style.width = targetWidth + '%';
          bar.dataset.animated = 'true';
        }
      });
    }

    // Main animation trigger
    function animateOnScroll() {
      // Animate section title
      if (sectionTitle && !sectionTitle.classList.contains('animated')) {
        if (isElementInViewport(sectionTitle)) {
          sectionTitle.classList.add('animated');
        }
      }

      // Animate skill categories one by one
      skillCategories.forEach((category, index) => {
        if (!category.classList.contains('animated')) {
          if (isElementInViewport(category)) {
            // Add delay for cascade effect
            setTimeout(() => {
              category.classList.add('animated');
              // Force reflow to ensure animation starts
              void category.offsetWidth;
              
              // Animate skill bars within this category
              const bars = category.querySelectorAll('.skill-progress');
              bars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width') || '0';
                bar.style.width = targetWidth + '%';
                bar.dataset.animated = 'true';
              });
            }, index * ANIMATION_DELAY);
          }
        }
      });

      // Also animate any visible bars that might have been missed
      animateSkillBars();
    }

    // Initial animation on load with slight delay
    window.addEventListener('load', () => {
      setTimeout(animateOnScroll, 300);
      
      // Also set a backup timer for bars that might not have animated
      setTimeout(animateSkillBars, 800);
    });

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          animateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Also trigger on resize
    window.addEventListener('resize', animateOnScroll);

    // Manual trigger for any elements that are already visible
    setTimeout(animateOnScroll, 500);
  })();


 

    // Create modal container if it doesn't exist
    if (!document.getElementById("projectModal")) {
      const modalHTML = `
      <div class="modal" id="projectModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3 id="modalTitle">Project Title</h3>
            <button class="modal-close" id="modalClose">&times;</button>
          </div>
          <div class="modal-body" id="modalBody">
            <!-- Content will be inserted here -->
          </div>
        </div>
      </div>
    `;
      document.body.insertAdjacentHTML("beforeend", modalHTML);
    }

    const modal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");

    // Project details data
    const projectDetails = {
      1: {
        title: "E-commerce Website",
        description:
          "A fully functional e-commerce platform built with MERN stack. Features include product management, user authentication, shopping cart, order processing, and payment integration.",
        tech: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "Node.js",
          "Express.js",
          "MongoDB",
        ],
        features: [
          "User authentication and authorization",
          "Product catalog with search and filters",
          "Shopping cart functionality",
          "Order management system",
          "Payment gateway integration",
          "Admin dashboard for product management",
        ],
      },
      2: {
        title: "Task Management App",
        description:
          "A comprehensive task management application with real-time updates. Users can create, organize, and track their tasks with priority levels and deadlines.",
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "CSS3"],
        features: [
          "Drag-and-drop task organization",
          "Priority levels and deadlines",
          "Real-time updates",
          "User authentication",
          "Task categories and tags",
          "Progress tracking",
        ],
      },
      3: {
        title: "Weather Dashboard",
        description:
          "A weather application that provides real-time weather information for cities worldwide. Includes current conditions, hourly forecasts, and 5-day predictions.",
        tech: ["HTML5", "CSS3", "JavaScript", "API Integration", "Bootstrap"],
        features: [
          "Real-time weather data",
          "5-day weather forecast",
          "Search by city name",
          "Weather maps",
          "Responsive design",
          "Favorite cities list",
        ],
      },
    };

    document.querySelectorAll(".view-project").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const projectCard = e.target.closest(".project-card");
        const projectId = projectCard.getAttribute("data-project");
        const details = projectDetails[projectId];

        if (details) {
          modalTitle.textContent = details.title;

          let featuresHTML = "";
          if (details.features) {
            featuresHTML = `
            <div class="modal-features">
              <h4>Key Features</h4>
              <ul>
                ${details.features.map((f) => `<li>${f}</li>`).join("")}
              </ul>
            </div>
          `;
          }

          modalBody.innerHTML = `
          <p>${details.description}</p>
          <div class="modal-tech">
            ${details.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
          ${featuresHTML}
        `;

          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    // Close modal
    if (modalClose) {
      modalClose.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Chatbot Functionality
    const chatbotToggle = document.createElement("div");
    chatbotToggle.className = "chatbot-toggle";
    chatbotToggle.innerHTML = '<i class="fas fa-robot"></i>';
    document.body.appendChild(chatbotToggle);

    const chatbotHTML = `
    <div class="chatbot-modal" id="chatbotModal">
      <div class="chatbot-header">
        <h3><i class="fas fa-robot"></i> AI Assistant</h3>
        <button class="chatbot-close" id="chatbotClose">&times;</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages">
        <div class="message bot">
          Hi! I'm Raheel's AI assistant. How can I help you today?
        </div>
      </div>
      <div class="chatbot-quick-replies">
        <button class="quick-reply" data-question="experience">Experience</button>
        <button class="quick-reply" data-question="skills">Skills</button>
        <button class="quick-reply" data-question="projects">Projects</button>
        <button class="quick-reply" data-question="contact">Contact</button>
      </div>
      <div class="chatbot-input">
        <input type="text" id="chatbotInput" placeholder="Type your message...">
        <button id="chatbotSend"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  `;
    document.body.insertAdjacentHTML("beforeend", chatbotHTML);

    const chatbotModal = document.getElementById("chatbotModal");
    const chatbotClose = document.getElementById("chatbotClose");
    const chatbotMessages = document.getElementById("chatbotMessages");
    const chatbotInput = document.getElementById("chatbotInput");
    const chatbotSend = document.getElementById("chatbotSend");
    const quickReplies = document.querySelectorAll(".quick-reply");

    // Toggle chatbot
    chatbotToggle.addEventListener("click", () => {
      chatbotModal.classList.toggle("active");
    });

    // Close chatbot
    chatbotClose.addEventListener("click", () => {
      chatbotModal.classList.remove("active");
    });

    // Send message function
    function sendMessage() {
      const message = chatbotInput.value.trim();
      if (message) {
        // Add user message
        const userMessage = document.createElement("div");
        userMessage.className = "message user";
        userMessage.textContent = message;
        chatbotMessages.appendChild(userMessage);

        // Clear input
        chatbotInput.value = "";

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Show typing indicator
        const typingIndicator = document.createElement("div");
        typingIndicator.className = "typing-indicator";
        typingIndicator.innerHTML = "<span></span><span></span><span></span>";
        chatbotMessages.appendChild(typingIndicator);

        // Simulate bot response
        setTimeout(() => {
          // Remove typing indicator
          typingIndicator.remove();

          // Add bot response
          const botMessage = document.createElement("div");
          botMessage.className = "message bot";

          // Simple response logic
          const lowerMessage = message.toLowerCase();
          if (lowerMessage.includes("experience")) {
            botMessage.textContent =
              "I have over 1 year of experience as a Full-Stack Developer, working on various projects including e-commerce platforms, task management apps, and weather dashboards.";
          } else if (
            lowerMessage.includes("skill") ||
            lowerMessage.includes("technolog")
          ) {
            botMessage.textContent =
              "I'm proficient in HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, MongoDB, and various other technologies. What specific skill would you like to know about?";
          } else if (lowerMessage.includes("project")) {
            botMessage.textContent =
              "I've worked on several projects including an E-commerce website, Task Management app, and Weather Dashboard. You can check them out in the Projects section!";
          } else if (lowerMessage.includes("contact")) {
            botMessage.textContent =
              "You can reach me at raheelshakeel953@gmail.com or through the contact form on this page. I typically respond within 24 hours.";
          } else {
            botMessage.textContent =
              "Thanks for your message! For specific inquiries, feel free to use the contact form or email me directly at raheelshakeel953@gmail.com";
          }

          chatbotMessages.appendChild(botMessage);
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1500);
      }
    }

    chatbotSend.addEventListener("click", sendMessage);
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });

    // Quick replies
    quickReplies.forEach((reply) => {
      reply.addEventListener("click", () => {
        chatbotInput.value = `Tell me about your ${reply.dataset.question}`;
        sendMessage();
      });
    });

    // Download CV functionality
    function downloadCV() {
      // Create a sample CV content
      const cvContent = `
      MUHAMMAD RAHEEL SHAKEEL
      =======================
      Full-Stack Developer | MERN Stack Specialist
      
      CONTACT
      -------
      Email: raheelshakeel953@gmail.com
      Phone: +92 3147473680
      Location: Lahore, Pakistan
      
      SUMMARY
      -------
      Full-Stack Developer with 1+ years of experience building scalable web applications. 
      Proficient in MERN stack with a strong focus on creating exceptional user experiences.
      
      EDUCATION
      ---------
      Bachelor of Science in Information Technology
      University of Education • 2023-2027
      CGPA: 3.64/4.0
      
      TECHNICAL SKILLS
      ----------------
      • Frontend: HTML5, CSS3, JavaScript, React.js, Bootstrap, Tailwind
      • Backend: Node.js, Express.js, RESTful APIs
      • Database: MongoDB
      • Tools: Git, VS Code, Postman
      
      EXPERIENCE
      ----------
      Freelance Developer | Full Stack Developer
      2023 - Present
      • Developed responsive web applications using MERN stack
      • Built RESTful APIs for various client projects
      • Implemented database solutions using MongoDB
      
      PROJECTS
      --------
      • E-commerce Website: Full-stack e-commerce platform
      • Task Management App: Productivity application with real-time updates
      • Weather Dashboard: Real-time weather information app
    `;

      const blob = new Blob([cvContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Muhammad_Raheel_Shakeel_CV.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }

    // Add download CV functionality to both buttons
    document.getElementById("downloadCV").addEventListener("click", (e) => {
      e.preventDefault();
      downloadCV();
    });

    document
      .getElementById("downloadCVFooter")
      .addEventListener("click", (e) => {
        e.preventDefault();
        downloadCV();
      });

    // Contact form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          subject: document.getElementById("subject").value,
          message: document.getElementById("message").value,
        };

        // Show success message (in production, you'd send this to a server)
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
      });
    }

    // Initialize skill bars with default width (set by CSS)
    // This ensures they show correctly on page load
    setTimeout(() => {
      animateSkillBars();
    }, 500);

    (function () {
      // Configure your contact numbers
      const whatsappNumber = "03147473680"; // without '+' or '00'
      const callNumber = "03147473680"; // same number for call

      // Get the buttons by their content or other selectors.
      // Since you have two links with the same class, we'll identify them by the icon.
      const buttons = document.querySelectorAll(".buttons .btn.outline");

      buttons.forEach((btn) => {
        btn.addEventListener("click", function (event) {
          event.preventDefault(); // stop any default link behavior

          // Check which icon is inside this button
          const icon = this.querySelector("i");
          if (!icon) return;

          if (icon.classList.contains("fa-phone")) {
            // Schedule a Call - open phone dialer
            window.location.href = `tel:${callNumber}`;
          } else if (icon.classList.contains("fa-whatsapp")) {
            // WhatsApp Chat - open WhatsApp
            // Use wa.me for universal web chat (opens in WhatsApp)
            const message = encodeURIComponent(
              "Hello! I'd like to chat about your products.",
            );
            window.open(
              `https://wa.me/${whatsappNumber}?text=${message}`,
              "_blank",
            );
          }
        });
      });
    })();

 (function() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop default redirect
        
        const formData = new FormData(form);
        
        // Show sending state
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        // Send via fetch (no page reload)
        fetch(form.action, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('✅ Thank you! Your message has been sent successfully.');
            form.reset(); // Clear the form
          } else {
            alert('❌ Something went wrong. Please try again.');
          }
        })
        .catch(error => {
          alert('❌ Network error. Please check your connection.');
          console.error(error);
        })
        .finally(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        });
      });
    }
  })();
