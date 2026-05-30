// Discover all activity modules (don't load them yet)
const activityModules = {
    ...import.meta.glob('/lab1/activity*.js'),
    ...import.meta.glob('/lab1/activity*/index.js')
};

// Extract activity numbers and sort
const activities = Object.keys(activityModules)
    .map(path => ({
        num: path.match(/activity(\d+)/)[1],
        path: path
    }))
    .sort((a, b) => parseInt(a.num) - parseInt(b.num));

// Load saved path or default to first
const savedPath = localStorage.getItem('activityPath') || activities[0].path;

// Populate dropdown
const dropdown = document.querySelector('#activityDropdown');
activities.forEach(({ num, path }) => {
    const option = document.createElement('option');
    option.value = path;  // Store full path
    option.textContent = `Activity ${num}`;
    dropdown.appendChild(option);
});

dropdown.value = savedPath;

// Load module using the stored path
const loadActivity = async (path) => {
    try {
        const module = await activityModules[path]();
        console.log('Loaded:', path,  module);
        return module;
    } catch (e){
        console.log(e); //TODO Show on screen
        localStorage.removeItem('activityPath');
    }
};

// Load on dropdown change
dropdown.addEventListener('change', async (event) => {
    localStorage.setItem('activityPath', event.target.value);
    window.location.reload();
});

document.querySelector('#activityChooserControls').style.display = 'block';

export default await loadActivity(savedPath);