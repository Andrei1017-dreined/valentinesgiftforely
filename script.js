// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const startButton = document.getElementById('start-button');
    const music = document.getElementById('background-music');
    
    // Loading Screen - show button after loading
    setTimeout(() => {
        if (startButton) {
            startButton.style.display = 'block';
            startButton.style.animation = 'fadeIn 0.5s ease-out';
        }
    }, 2500);
    
    // Start button click handler
    if (startButton) {
        startButton.addEventListener('click', () => {
            loadingScreen?.classList.add('hidden');
            
            // Auto-play music after user interaction
            if (music) {
                music.play().then(() => {
                    console.log('Music started playing');
                    // Update UI to show music is playing
                    const musicStatus = document.querySelector('.music-status');
                    const musicIcon = document.querySelector('.music-icon');
                    if (musicStatus) musicStatus.textContent = 'Pause Music';
                    if (musicIcon) musicIcon.textContent = '🎶';
                }).catch(err => {
                    console.log('Music play failed:', err);
                });
            }
        });
    }

    // Music Player
    initMusicPlayer();

    // Initialize Quote Carousel
    initQuoteCarousel();
    
    // Initialize Star Facts Carousel
    initStarFactsCarousel();
    
    // Initialize Letter
    initLetter();
    
    // Initialize Scroll Animations
    initScrollAnimations();
    
    // Initialize Easter Eggs
    initEasterEggs();
    
    // Image Error Handling
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = '💕<br><span>Add your photo here</span>';
            this.parentNode.insertBefore(placeholder, this);
        });
    });
});

// ===== Music Player =====
function initMusicPlayer() {
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicStatus = document.querySelector('.music-status');
    const musicIcon = document.querySelector('.music-icon');
    
    if (!music || !musicToggle) return;
    
    // Check if music is already playing from autoplay
    let isPlaying = !music.paused;
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicStatus.textContent = 'Play Music';
            musicIcon.textContent = '🎵';
            isPlaying = false;
        } else {
            music.play().catch(err => {
                console.log('Autoplay prevented:', err);
            });
            musicStatus.textContent = 'Pause Music';
            musicIcon.textContent = '🎶';
            isPlaying = true;
        }
    });
}

// ===== Quote Carousel =====
function initQuoteCarousel() {
    const quotes = document.querySelectorAll('.quote-card');
    const dotsContainer = document.getElementById('quote-dots');
    if (quotes.length === 0) return;
    
    let currentQuote = 0;
    
    // Create dots
    quotes.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToQuote(i));
        dotsContainer?.appendChild(dot);
    });
    
    function goToQuote(index) {
        quotes[currentQuote]?.classList.remove('active');
        quotes[currentQuote]?.classList.add('exit');
        document.querySelectorAll('.quote-dot')[currentQuote]?.classList.remove('active');
        
        setTimeout(() => {
            quotes[currentQuote]?.classList.remove('exit');
        }, 800);
        
        currentQuote = index;
        quotes[currentQuote]?.classList.add('active');
        document.querySelectorAll('.quote-dot')[currentQuote]?.classList.add('active');
    }
    
    setInterval(() => {
        goToQuote((currentQuote + 1) % quotes.length);
    }, 8000);
}

// ===== Star Facts Carousel =====
function initStarFactsCarousel() {
    const facts = document.querySelectorAll('.star-fact');
    const prevBtn = document.getElementById('star-prev');
    const nextBtn = document.getElementById('star-next');
    if (facts.length === 0) return;
    
    let currentFact = 0;
    
    function goToFact(index, direction) {
        facts[currentFact]?.classList.remove('active');
        facts[currentFact]?.classList.add('exit');
        
        setTimeout(() => {
            facts[currentFact]?.classList.remove('exit');
        }, 500);
        
        currentFact = index;
        if (currentFact < 0) currentFact = facts.length - 1;
        if (currentFact >= facts.length) currentFact = 0;
        
        facts[currentFact]?.classList.add('active');
    }
    
    prevBtn?.addEventListener('click', () => {
        goToFact(currentFact - 1, 'prev');
    });
    
    nextBtn?.addEventListener('click', () => {
        goToFact(currentFact + 1, 'next');
    });
}

// ===== Letter Animation =====
function initLetter() {
    const envelope = document.getElementById('letter-envelope');
    const paper = document.getElementById('letter-paper');
    const texts = document.querySelectorAll('.letter-text');
    
    envelope?.addEventListener('click', () => {
        envelope.classList.add('opened');
        paper?.classList.add('visible');
        
        // Reveal texts with typewriter effect
        texts.forEach((text, i) => {
            setTimeout(() => {
                text.classList.add('visible');
            }, i * 800);
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    // Observe elements
    document.querySelectorAll('.gallery-item, .timeline-item, .reason-card, .promise-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== Easter Eggs =====
function initEasterEggs() {
    const heart = document.querySelector('.big-heart');
    const secretMessage = document.getElementById('secret-message');
    const clickCounter = document.getElementById('heart-clicks');
    let clicks = 0;
    
    heart?.addEventListener('click', () => {
        clicks++;
        if (clickCounter) clickCounter.textContent = clicks;
        
        // Create floating heart on each click
        createFloatingHeart(heart);
        
        if (clicks >= 10) {
            secretMessage?.classList.add('visible');
            createConfetti();
        }
    });
}

function createFloatingHeart(element) {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '🌷'];
    const heart = document.createElement('span');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = 'position: fixed; font-size: 2rem; pointer-events: none; z-index: 9999; animation: floatAway 1s ease-out forwards;';
    
    const rect = element.getBoundingClientRect();
    heart.style.left = (rect.left + rect.width / 2) + 'px';
    heart.style.top = rect.top + 'px';
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// Add float away animation
const floatStyle = document.createElement('style');
floatStyle.textContent = '@keyframes floatAway { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-100px) scale(0.5); opacity: 0; } }';
document.head.appendChild(floatStyle);

// ===== Heart Burst =====
function createHeartBurst() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '🌷', '✨'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = 'position: fixed; font-size: ' + (1.5 + Math.random() * 1.5) + 'rem; pointer-events: none; z-index: 9999;';
            heart.style.left = (window.innerWidth / 2 + (Math.random() - 0.5) * 200) + 'px';
            heart.style.top = (window.innerHeight / 2) + 'px';
            heart.style.animation = 'burstHeart 1.5s ease-out forwards';
            heart.style.setProperty('--tx', ((Math.random() - 0.5) * 300) + 'px');
            heart.style.setProperty('--ty', (-(100 + Math.random() * 200)) + 'px');
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }, i * 50);
    }
}

const burstStyle = document.createElement('style');
burstStyle.textContent = '@keyframes burstHeart { 0% { transform: translate(0, 0) scale(0); opacity: 1; } 50% { opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; } }';
document.head.appendChild(burstStyle);

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const photoFrames = document.querySelectorAll('.photo-frame');

// ===== Lightbox =====
photoFrames.forEach(frame => {
    frame.addEventListener('click', () => {
        const img = frame.querySelector('.gallery-img');
        const caption = frame.querySelector('.photo-caption');
        if (img && lightbox) {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption?.textContent || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Slideshow =====
const slideshowToggle = document.getElementById('slideshow-toggle');
const slideshowFullscreen = document.getElementById('slideshow-fullscreen');
const slideshowImg = document.getElementById('slideshow-img');
const slideshowCaption = document.getElementById('slideshow-caption');
const slideshowMessage = document.getElementById('slideshow-message');
const slideshowProgressBar = document.getElementById('slideshow-progress-bar');
let slideshowIndex = 0;
let slideshowTimer;
let isSlideshow = false;

const photos = [];
document.querySelectorAll('.gallery-item').forEach(item => {
    const img = item.querySelector('.gallery-img');
    const caption = item.querySelector('.photo-caption');
    const message = item.querySelector('.photo-message');
    if (img) {
        photos.push({
            src: img.src,
            caption: caption?.textContent || '',
            message: message?.textContent || ''
        });
    }
});

slideshowToggle?.addEventListener('click', startSlideshow);
document.getElementById('slideshow-close')?.addEventListener('click', stopSlideshow);
document.getElementById('slideshow-prev')?.addEventListener('click', () => { slideshowIndex = (slideshowIndex - 1 + photos.length) % photos.length; showSlide(); });
document.getElementById('slideshow-next')?.addEventListener('click', () => { slideshowIndex = (slideshowIndex + 1) % photos.length; showSlide(); });

function startSlideshow() {
    if (photos.length === 0) return;
    isSlideshow = true;
    slideshowIndex = 0;
    slideshowFullscreen?.classList.add('active');
    document.body.style.overflow = 'hidden';
    showSlide();
    slideshowTimer = setInterval(() => {
        slideshowIndex = (slideshowIndex + 1) % photos.length;
        showSlide();
    }, 5000);
}

function showSlide() {
    if (!photos[slideshowIndex]) return;
    slideshowImg.src = photos[slideshowIndex].src;
    slideshowCaption.textContent = photos[slideshowIndex].caption;
    slideshowMessage.textContent = photos[slideshowIndex].message;
    if (slideshowProgressBar) {
        slideshowProgressBar.style.transition = 'none';
        slideshowProgressBar.style.width = '0%';
        setTimeout(() => {
            slideshowProgressBar.style.transition = 'width 5s linear';
            slideshowProgressBar.style.width = '100%';
        }, 50);
    }
}

function stopSlideshow() {
    isSlideshow = false;
    clearInterval(slideshowTimer);
    slideshowFullscreen?.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Starry Night Canvas =====
const starsCanvas = document.getElementById('stars-canvas');
if (starsCanvas) {
    const ctx = starsCanvas.getContext('2d');
    let stars = [];
    let shootingStars = [];

    function resizeCanvas() {
        starsCanvas.width = starsCanvas.parentElement.offsetWidth;
        starsCanvas.height = starsCanvas.parentElement.offsetHeight;
        createStars();
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * starsCanvas.width,
                y: Math.random() * starsCanvas.height,
                size: Math.random() * 2 + 0.5,
                twinkle: Math.random() * Math.PI * 2
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        
        stars.forEach(star => {
            star.twinkle += 0.05;
            const opacity = 0.5 + Math.sin(star.twinkle) * 0.5;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
            ctx.fill();
        });

        shootingStars.forEach((ss, index) => {
            ss.x += ss.speedX;
            ss.y += ss.speedY;
            ss.life--;
            
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(ss.x - ss.speedX * 10, ss.y - ss.speedY * 10);
            ctx.strokeStyle = 'rgba(255, 215, 0, ' + (ss.life / 100) + ')';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            if (ss.life <= 0) shootingStars.splice(index, 1);
        });

        requestAnimationFrame(drawStars);
    }

    function createShootingStar(x, y) {
        shootingStars.push({
            x: x || Math.random() * starsCanvas.width,
            y: y || 0,
            speedX: 3 + Math.random() * 3,
            speedY: 2 + Math.random() * 2,
            life: 100
        });
    }

    resizeCanvas();
    drawStars();
    window.addEventListener('resize', resizeCanvas);
    
    // Click to create shooting star
    document.querySelector('.starry-night')?.addEventListener('click', (e) => {
        const rect = starsCanvas.getBoundingClientRect();
        createShootingStar(e.clientX - rect.left, e.clientY - rect.top);
    });

    // Random shooting stars
    setInterval(() => { if (Math.random() > 0.7) createShootingStar(); }, 3000);
}

// ===== Anniversary Counter =====
function updateAnniversaryCounter() {
    const anniversaryDate = new Date('2023-06-29T00:00:00');
    const now = new Date();
    const diffTime = Math.abs(now - anniversaryDate);
    
    const totalSeconds = Math.floor(diffTime / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    
    const years = Math.floor(totalDays / 365.25);
    const remainingDays = totalDays - Math.floor(years * 365.25);
    const months = Math.floor(remainingDays / 30.44);
    const days = Math.floor(remainingDays - (months * 30.44));
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
    let text = '';
    if (years > 0) text += years + ' year' + (years > 1 ? 's' : '') + ', ';
    if (months > 0) text += months + ' month' + (months > 1 ? 's' : '') + ', ';
    text += days + ' day' + (days !== 1 ? 's' : '') + ', ';
    text += hours + ' hr' + (hours !== 1 ? 's' : '') + ', ';
    text += minutes + ' min' + (minutes !== 1 ? 's' : '') + ', ';
    text += seconds + ' sec' + (seconds !== 1 ? 's' : '');
    
    const counter = document.getElementById('anniversary-counter');
    if (counter) counter.textContent = text + ' together';
}

updateAnniversaryCounter();
setInterval(updateAnniversaryCounter, 1000);

// ===== Surprise Button =====
document.getElementById('surprise-btn')?.addEventListener('click', () => {
    createConfetti();
    createHeartBurst();
});

// ===== Confetti =====
function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const colors = ['#e91e63', '#ff6b9d', '#ffd700', '#ff69b4', '#ff1493'];
    
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 4 - 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        
        confetti.forEach(c => {
            if (c.y < canvas.height) {
                active = true;
                c.y += c.speedY;
                c.x += c.speedX;
                c.rotation += c.rotationSpeed;
                
                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation * Math.PI / 180);
                ctx.fillStyle = c.color;
                ctx.fillRect(-c.size/2, -c.size/2, c.size, c.size/2);
                ctx.restore();
            }
        });
        
        if (active) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
}

// ===== Tulip Garden =====
let plantedTulips = 60;
const tulipCounter = document.getElementById('tulip-counter');
if (tulipCounter) tulipCounter.textContent = plantedTulips;

// Butterflies
const butterfliesContainer = document.getElementById('butterflies');
if (butterfliesContainer) {
    for (let i = 0; i < 5; i++) {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        butterfly.innerHTML = '🦋';
        butterfly.style.left = (Math.random() * 80 + 10) + '%';
        butterfly.style.top = (Math.random() * 60 + 20) + '%';
        butterfly.style.animationDelay = (Math.random() * 5) + 's';
        butterfly.style.animationDuration = (10 + Math.random() * 10) + 's';
        butterfliesContainer.appendChild(butterfly);
    }
}

// Falling Petals
const petalsContainer = document.getElementById('falling-petals');
if (petalsContainer) {
    setInterval(() => {
        if (document.hidden) return;
        const petal = document.createElement('div');
        petal.className = 'petal';
        const hue = 340 + Math.random() * 30;
        const size = 0.5 + Math.random() * 0.8;
        petal.style.left = (Math.random() * 100) + '%';
        petal.style.width = (15 * size) + 'px';
        petal.style.height = (20 * size) + 'px';
        petal.style.background = 'linear-gradient(135deg, hsl('+hue+', 80%, 65%) 0%, hsl('+hue+', 85%, 55%) 50%, hsl('+hue+', 90%, 75%) 100%)';
        petal.style.animationDuration = (8 + Math.random() * 7) + 's';
        petalsContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 15000);
    }, 800);
}

// Plant Tulip on Click
const tulipGarden = document.getElementById('tulip-garden');
tulipGarden?.addEventListener('click', (e) => {
    if (e.target.closest('.message-card') || e.target.closest('.garden-content')) return;
    
    const field = document.getElementById('tulip-field');
    if (!field) return;
    
    const rect = field.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 100;
    const relY = ((e.clientY - rect.top) / rect.height) * 100;
    if (relY < 30) return;
    
    const tulip = document.createElement('div');
    tulip.className = 'tulip-3d planted';
    const hue = 315 + Math.random() * 45;
    tulip.style.setProperty('--hue', hue);
    tulip.style.position = 'absolute';
    tulip.style.left = relX + '%';
    tulip.style.bottom = (100 - relY) + '%';
    tulip.style.zIndex = Math.floor(relY);
    tulip.style.transform = 'scale(' + (0.5 + (relY / 100) * 0.6) + ')';
    tulip.innerHTML = '<div class="tulip-stem"></div><div class="tulip-leaves"></div><div class="tulip-bloom"></div>';
    field.appendChild(tulip);
    
    plantedTulips++;
    if (tulipCounter) {
        tulipCounter.textContent = plantedTulips;
        tulipCounter.style.transform = 'scale(1.3)';
        setTimeout(() => tulipCounter.style.transform = 'scale(1)', 200);
    }
    
    setTimeout(() => tulip.classList.remove('planted'), 1000);
});

// Tulip row animation on scroll
const gardenObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const rows = entry.target.querySelectorAll('.tulip-row');
            rows.forEach((row, i) => {
                setTimeout(() => {
                    row.style.opacity = '1';
                }, i * 200);
            });
        }
    });
}, { threshold: 0.2 });

const tulipField = document.getElementById('tulip-field');
if (tulipField) gardenObserver.observe(tulipField);

// ===== Ocean Bubbles =====
function initOceanBubbles() {
    const bubblesContainer = document.getElementById('ocean-bubbles');
    if (!bubblesContainer) return;
    
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 25 + 8;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        const duration = Math.random() * 6 + 6;
        bubble.style.animationDuration = duration + 's';
        bubble.style.animationDelay = (Math.random() * 2) + 's';
        bubblesContainer.appendChild(bubble);
        
        setTimeout(() => bubble.remove(), (duration + 3) * 1000);
    }
    
    // Create bubbles more frequently
    setInterval(createBubble, 300);
    
    // Initial burst of bubbles
    for (let i = 0; i < 20; i++) {
        setTimeout(createBubble, i * 100);
    }
}

// Initialize ocean bubbles
initOceanBubbles();

// ===== Console Love Message =====
console.log('%c💕 Made with love for Ella 💕', 'font-size: 24px; color: #e91e63; font-weight: bold;');
console.log('%cThis website was created to show how much you mean to me!', 'font-size: 14px; color: #ff6b9d;');
console.log('%c🌷 Together since June 29, 2023 🌷', 'font-size: 14px; color: #e91e63;');

// ===== Scroll Indicator Click =====
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.querySelector('.quotes-section')?.scrollIntoView({ behavior: 'smooth' });
});

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});