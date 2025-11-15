function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  // If at the bottom of the page, ensure contact is active
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10) {
    current = 'contact';
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
}

// Fade-in animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(section => {
  observer.observe(section);
});

// Darkmode
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

function toggleDarkMode() {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
  darkModeToggle.checked = isDark;
}

const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode !== 'false') {
  body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', toggleDarkMode);

// Scrollbar
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const contactSection = document.getElementById('contact');
  const maxScroll = contactSection.offsetTop + contactSection.offsetHeight - window.innerHeight;
  const scrollPercent = Math.min((scrollTop / maxScroll) * 100, 100);
  document.getElementById('scroll-progress').style.width = scrollPercent + '%';
}


window.addEventListener('scroll', () => {
  highlightNavOnScroll();
  updateScrollProgress();
});


window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});


const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Form is submitted');
  contactForm.reset();
});


document.addEventListener('DOMContentLoaded', () => {
  const roleElement = document.getElementById('role');
  typeWriter(roleElement, 'Full Stack Developer', 150);

  const quoteElement = document.getElementById('quote');
  setTimeout(() => {
    typeWriter(quoteElement, 'Code is poetry in motion.', 100);
  }, 1000);
});
