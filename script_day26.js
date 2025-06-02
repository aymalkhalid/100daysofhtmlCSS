document.addEventListener('DOMContentLoaded', function() {
    // Steam particles effect
    createSteamParticles();
    
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Rotate key when toggling
            const key = this.querySelector('.key');
            key.style.transform = type === 'text' ? 'rotate(90deg)' : 'rotate(0deg)';
            
            // Play gear sound
            playSound('gear-sound');
        });
    }
    
    // Mechanical sound effects on form interactions
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            playSound('gear-sound');
        });
    });
    
    // Button hover effects with steam and sound
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.addEventListener('mouseenter', function() {
            createSteamBurst(this);
            
            // Subtle gear sound on hover
            playSound('gear-sound', 0.3);
        });
        
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Play mechanical sound on submit
            playSound('mechanical-sound', 0.5);
            
            // Simulate login
            simulateLogin();
        });
    }
    
    // Checkbox lever animation and sound
    const checkbox = document.getElementById('remember');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            playSound('gear-sound');
        });
    }
});

// Create steam particles that rise from the bottom
function createSteamParticles() {
    const container = document.querySelector('.steam-particles');
    if (!container) return;
    
    // Create initial steam particles
    for (let i = 0; i < 3; i++) {
        createSteam(container);
    }
    
    // Periodically create new steam particles
    setInterval(() => {
        if (Math.random() > 0.7) {
            createSteam(container);
        }
    }, 2000);
}

function createSteam(container) {
    const steam = document.createElement('div');
    steam.classList.add('steam');
    
    // Random position and size
    const size = Math.random() * 40 + 20;
    const left = Math.random() * 100;
    
    steam.style.width = `${size}px`;
    steam.style.height = `${size}px`;
    steam.style.left = `${left}%`;
    
    // Animation timing
    const duration = Math.random() * 3 + 4;
    steam.style.animation = `rise ${duration}s ease-out forwards`;
    
    container.appendChild(steam);
    
    // Remove after animation completes
    setTimeout(() => {
        steam.remove();
    }, duration * 1000);
}

// Create steam burst effect when button is clicked
function createSteamBurst(button) {
    const steamRelease = button.querySelector('.steam-release');
    if (!steamRelease) return;
    
    // Create multiple steam particles in a burst
    for (let i = 0; i < 8; i++) {
        const steam = document.createElement('div');
        steam.classList.add('steam');
        
        // Positioning and sizing
        const size = Math.random() * 20 + 10;
        const offsetX = (Math.random() - 0.5) * 60;
        
        steam.style.width = `${size}px`;
        steam.style.height = `${size}px`;
        steam.style.bottom = '0';
        steam.style.left = `calc(50% + ${offsetX}px)`;
        
        // Animation
        const duration = Math.random() * 1.5 + 1;
        steam.style.animation = `rise ${duration}s ease-out forwards`;
        
        steamRelease.appendChild(steam);
        
        // Clean up after animation
        setTimeout(() => {
            steam.remove();
        }, duration * 1000);
    }
}

// Play sound effects with optional volume control
function playSound(soundId, volume = 0.5) {
    const sound = document.getElementById(soundId);
    if (!sound) return;
    
    // Reset and play
    sound.pause();
    sound.currentTime = 0;
    sound.volume = volume;
    
    // Try to play the sound (may fail due to browser autoplay restrictions)
    const playPromise = sound.play();
    if (playPromise) {
        playPromise.catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}

// Simulate login with animations
function simulateLogin() {
    const loginButton = document.querySelector('.login-button');
    const buttonPlate = document.querySelector('.button-brass-plate');
    
    if (!loginButton || !buttonPlate) return;
    
    // Press effect
    buttonPlate.style.transform = 'translateY(3px)';
    
    // Create intense steam burst
    createSteamBurst(loginButton);
    
    // Gauge animation
    const gaugeNeedle = document.querySelector('.gauge-needle');
    if (gaugeNeedle) {
        gaugeNeedle.style.animation = 'none';
        gaugeNeedle.style.transform = 'translate(-100%, -50%) rotate(90deg)';
        
        // Reset animation after gauge peaks
        setTimeout(() => {
            gaugeNeedle.style.animation = 'gauge-animation 8s ease-in-out infinite';
        }, 1500);
    }
    
    // Reset button after delay
    setTimeout(() => {
        buttonPlate.style.transform = '';
    }, 1000);
    
    // Simulate successful login after delay
    setTimeout(() => {
        alert('Access granted! Welcome to the Aetheric Network.');
    }, 1500);
}

// Create gears in the background on page load
window.addEventListener('load', function() {
    // Adjust pressure gauge needle on load
    const gaugeNeedle = document.querySelector('.gauge-needle');
    if (gaugeNeedle) {
        gaugeNeedle.style.transform = 'translate(-100%, -50%) rotate(-30deg)';
        
        // Start animation after a delay
        setTimeout(() => {
            gaugeNeedle.style.animation = 'gauge-animation 8s ease-in-out infinite';
        }, 1000);
    }
});
