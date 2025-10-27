const colors = [
    {
    name: "Success",
    hex: "#166C2F",
    label: "Light / Green / 500",
    variable: "text-success",
    wcag: "AA",
    score: "83"
    },
    {
    name: "Danger",
    hex: "#FF5630",
    label: "Light / Red / 500",
    variable: "text-danger",
    wcag: "AA",
    score: "82"
    },
    {
    name: "Warning",
    hex: "#FFA800",
    label: "Light / Yellow / 500",
    variable: "text-warning",
    wcag: "AA",
    score: "81"
    },
    {
    name: "Info",
    hex: "#008BD9",
    label: "Light / Blue / 500",
    variable: "text-info",
    wcag: "AA",
    score: "84"
    },
    {
    name: "Brand Blue",
    hex: "#0052CC",
    label: "Brand / Blue",
    variable: "brand-blue",
    wcag: "AA",
    score: "85"
    }
    // Add more colors as needed
];

const container = document.getElementById('palette');

colors.forEach(color => {
    const card = document.createElement('div');
    card.className = 'colorCard';
    card.onclick = () => copyColor(card, color.hex);

    card.innerHTML = `
    <div class="colorSample" style="background-color: ${color.hex};">
        <div class="wcagGradeLight">
        <p>${color.wcag}</p>
        <p>${color.score}</p>
        </div>
    </div>
    <div class="swatchInfo">
        <p>${color.hex}</p>
        <h3>${color.name}</h3>
        <p>${color.label}</p>
        <div class="variableSnippet"><h5>${color.variable}</h5></div>
    </div>
    
    `;

    container.appendChild(card);
});

function copyColor(card, hex) {
  navigator.clipboard.writeText(hex).then(() => {
    const msg = card.querySelector('.copied-message');
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 1500);
  });
}
