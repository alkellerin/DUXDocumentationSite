async function loadIncludes() {
    const elements = document.querySelectorAll('[data-include]');
    
    const promises = Array.from(elements).map(async (el) => {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            el.innerHTML = await response.text();
        } catch (err) {
            console.error(err);
        }
    });
    
    await Promise.all(promises);
    document.dispatchEvent(new Event('includes-loaded'));
}

document.addEventListener('DOMContentLoaded', loadIncludes);