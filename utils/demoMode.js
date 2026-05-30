// Initialize demoMode from localStorage or default to true (demo mode)
let demoMode = localStorage.getItem('mode') === null ? true : JSON.parse(localStorage.getItem('mode'));

// Set the radio button as checked on page load
const radioId = demoMode ? 'demo' : 'student';
document.getElementById(radioId).checked = true;

// Add change listeners to all radio buttons
const radioButtons = document.querySelectorAll('input[name="mode"]');

radioButtons.forEach(radio => {
    radio.addEventListener('change', (event) => {
        demoMode = event.target.value === 'demo';
        localStorage.setItem('mode', JSON.stringify(demoMode));
        console.log('Mode changed to:', demoMode);
    });
});

document.querySelector('#demoModeControls').style.display = 'block';

export { demoMode };