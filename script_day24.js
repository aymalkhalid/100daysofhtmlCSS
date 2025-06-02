// script_day24.js - Gun Store Theme

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const buttonText = loginButton.querySelector('.button-text');
    const buttonLoader = loginButton.querySelector('.button-loader');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    const eyeOpenIcon = togglePasswordButton.querySelector('.icon-eye-open');
    const eyeClosedIcon = togglePasswordButton.querySelector('.icon-eye-closed');
    const loadingBarProgress = document.querySelector('.loading-bar-progress');
    const loginPanel = document.getElementById('loginPanel');
    
    // Initialize gun elements with random subtle animations
    initGunAnimations();

    // Password visibility toggle
    togglePasswordButton.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        if (type === 'text') {
            eyeOpenIcon.style.display = 'none';
            eyeClosedIcon.style.display = 'inline-block';
        } else {
            eyeOpenIcon.style.display = 'inline-block';
            eyeClosedIcon.style.display = 'none';
        }
    });

    // Form submission simulation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loader, hide text
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'block';
        loginButton.classList.add('loading'); // For muzzle flash
        loginButton.disabled = true;

        // Simulate system check / loading
        let progress = 0;
        loadingBarProgress.style.width = '0%';
        const progressInterval = setInterval(() => {
            progress += 10;
            loadingBarProgress.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Simulate authentication result
                setTimeout(() => {
                    buttonText.style.display = 'block';
                    buttonLoader.style.display = 'none';
                    loginButton.classList.remove('loading');
                    loginButton.disabled = false;
                    loadingBarProgress.style.width = '0%'; // Reset bar

                    // Example: Check credentials (replace with actual logic)
                    const username = document.getElementById('username').value;
                    if (username === 'admin' && passwordInput.value === 'password123') {
                        alert('Access Granted. Welcome, Commander!');
                        // Redirect or update UI for successful login
                    } else {
                        alert('Access Denied. Incorrect credentials.');
                        // Shake panel on error
                        loginPanel.classList.add('error-shake');
                        setTimeout(() => {
                            loginPanel.classList.remove('error-shake');
                        }, 500);
                    }
                }, 1000); // Delay after loading bar full
            }
        }, 150); // Speed of loading bar
    });

    // Add error shake animation to CSS if not already there
    // (This is a JS-driven way to ensure the class is available if not in CSS)
    if (!document.styleSheets[0].rules || ![...document.styleSheets[0].rules].find(r => r.selectorText === '.error-shake')) {
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(`
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `, styleSheet.cssRules.length);
        styleSheet.insertRule(`
            .error-shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
        `, styleSheet.cssRules.length);
    }
    
    // Create bullet hole effect when clicking outside the login panel
    function createBulletHole(x, y) {
        const bulletHole = document.createElement('div');
        bulletHole.classList.add('bullet-hole', 'dynamic-bullet-hole');
        bulletHole.style.left = x + 'px';
        bulletHole.style.top = y + 'px';
        document.body.appendChild(bulletHole);
        
        // Remove after animation
        setTimeout(() => {
            bulletHole.remove();
        }, 10000); // Remove after 10 seconds
    }
    
    // Function to handle gun animations in the background
    function initGunAnimations() {
        const guns = document.querySelectorAll('.gun');
        
        guns.forEach(gun => {
            // Apply random subtle floating animation
            animateGun(gun);
            
            // Add hover effect to highlight gun when mouse is over it
            gun.addEventListener('mouseover', () => {
                gun.style.filter = 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.7))';
                gun.style.opacity = '0.6';
                gun.style.cursor = 'crosshair';
            });
            
            gun.addEventListener('mouseout', () => {
                gun.style.filter = 'drop-shadow(0 0 5px rgba(0, 255, 0, 0.4))';
                gun.style.opacity = '0.25';
                gun.style.cursor = 'default';
            });
            
            // Add click effect on guns
            gun.addEventListener('click', (event) => {
                event.stopPropagation();
                const gunSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-short-laser-gun-shot-1670.mp3');
                gunSound.volume = 0.3;
                gunSound.play().catch(e => console.log('Audio play prevented by browser'));
                
                // Flash effect
                gun.style.filter = 'brightness(3)';
                setTimeout(() => {
                    gun.style.filter = 'drop-shadow(0 0 5px rgba(0, 255, 0, 0.4))';
                }, 100);
                
                // Create muzzle flash effect
                createMuzzleFlash(event.clientX, event.clientY);
            });
        });
    }
    
    function animateGun(gunElement) {
        // Create random subtle floating movement
        const duration = 5 + Math.random() * 10; // Between 5-15 seconds
        const xMovement = 5 + Math.random() * 10; // Between 5-15px
        const yMovement = 5 + Math.random() * 10; // Between 5-15px
        const delay = Math.random() * 5; // Random delay up to 5 seconds
        
        // Get current transform and combine with animation
        const currentRotation = gunElement.style.transform || '';
        
        gunElement.style.transition = `transform ${duration}s ease-in-out`;
        gunElement.style.transitionDelay = `${delay}s`;
        
        // Apply floating animation
        setTimeout(() => {
            gunElement.style.transform = `${currentRotation} translate(${xMovement}px, ${yMovement}px)`;
            
            // Alternate back and forth
            setInterval(() => {
                if (gunElement.style.transform.includes('translate')) {
                    gunElement.style.transform = currentRotation;
                } else {
                    gunElement.style.transform = `${currentRotation} translate(${xMovement}px, ${yMovement}px)`;
                }
            }, duration * 1000);
        }, delay * 1000);
    }
    
    function createMuzzleFlash(x, y) {
        const flash = document.createElement('div');
        flash.classList.add('muzzle-flash');
        flash.style.left = x + 'px';
        flash.style.top = y + 'px';
        document.body.appendChild(flash);
        
        // Remove after animation
        setTimeout(() => {
            flash.remove();
        }, 300);
    }
    
    // Add dynamic bullet hole and muzzle flash styles
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        .dynamic-bullet-hole {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
            transform: translate(-50%, -50%);
            z-index: 100;
            pointer-events: none;
        }
    `, styleSheet.cssRules.length);
    
    styleSheet.insertRule(`
        .muzzle-flash {
            position: fixed;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,0,0.8) 0%, rgba(255,165,0,0.6) 40%, transparent 100%);
            transform: translate(-50%, -50%);
            z-index: 100;
            animation: flash 0.3s forwards;
            pointer-events: none;
        }
    `, styleSheet.cssRules.length);
    
    styleSheet.insertRule(`
        @keyframes flash {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
    `, styleSheet.cssRules.length);
});

