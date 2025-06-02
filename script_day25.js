document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const eyeIcon = togglePassword.querySelector('.eye-icon');
            if (type === 'password') {
                eyeIcon.innerHTML = '<path d="M12 4.5c-5 0-9.3 3-11 7.5 1.7 4.5 6 7.5 11 7.5s9.3-3 11-7.5c-1.7-4.5-6-7.5-11-7.5zm0 12.5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" fill="currentColor"/>';
            } else {
                eyeIcon.innerHTML = '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>';
            }
        });
    }

    // Create animated digital particles
    createDigitalParticles();

    // Login form submission (just prevent default for demo)
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add login animation
            const loginButton = document.querySelector('.login-button');
            loginButton.classList.add('submitting');
            
            // Simulate login success after 1.5 seconds
            setTimeout(() => {
                loginButton.classList.remove('submitting');
                loginButton.classList.add('success');
                
                // Reset after animation
                setTimeout(() => {
                    loginButton.classList.remove('success');
                }, 1500);
            }, 1500);
        });
    }
});

// Create digital particles
function createDigitalParticles() {
    const particles = document.querySelector('.digital-particles');
    if (!particles) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position, size and animation duration
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Randomly choose neon color
        const colors = [
            'rgba(188, 19, 254, 0.7)', // purple
            'rgba(10, 132, 255, 0.7)',  // blue
            'rgba(21, 244, 238, 0.7)',  // cyan
            'rgba(57, 255, 20, 0.7)',   // green
            'rgba(255, 16, 240, 0.7)'   // pink
        ];
        
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particles.appendChild(particle);
    }
}

// Add CSS styles for the particles
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            filter: blur(1px);
            pointer-events: none;
            opacity: 0;
            animation: float-particle linear infinite;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
