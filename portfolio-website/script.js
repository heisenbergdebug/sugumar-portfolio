/* Cursor */
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * .12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a,button,.skill-tag,.project-card,.stat-box').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
        ring.style.borderColor = 'rgba(201,168,76,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.borderColor = 'rgba(201,168,76,0.3)';
      });
    });

    /* Hamburger */
    const ham = document.getElementById('hamburger');
    const nav = document.getElementById('navLinks');
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      ham.classList.remove('open'); nav.classList.remove('open');
    }));

    /* Scroll reveal */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* Active nav link */
    const sections = document.querySelectorAll('section[id]');
    const navAs = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let cur = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) cur = s.id;
      });
      navAs.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
      });
    });

    /* Form submit */
    function handleFormSubmit(btn) {
      const name    = document.getElementById('formName').value.trim();
      const email   = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !message) {
        alert('Please fill in your name and message before sending.');
        return;
      }

      const text = `Hi Sugumar! 👋\n\nName: ${name}\nEmail: ${email || 'Not provided'}\n\nMessage:\n${message}`;
      const waURL = `https://wa.me/918903250379?text=${encodeURIComponent(text)}`;

      btn.textContent = '✓ Opening WhatsApp...';
      btn.style.background = '#25D366';
      btn.style.color = '#fff';
      btn.disabled = true;

      window.location.href = waURL;

      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3500);
    }

    /* Dark/Light Theme Toggle */
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
