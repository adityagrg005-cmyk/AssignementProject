const presets = [
    { name: 'Blue', h: 220, s: 80, l: 50 }, { name: 'Purple', h: 270, s: 70, l: 55 }, { name: 'Pink', h: 340, s: 75, l: 55 },
    { name: 'Teal', h: 168, s: 75, l: 42 }, { name: 'Orange', h: 25, s: 90, l: 55 }, { name: 'Green', h: 142, s: 65, l: 42 },
    { name: 'Red', h: 0, s: 80, l: 50 }, { name: 'Gold', h: 45, s: 90, l: 50 },
];
const presetsEl = document.getElementById('colorPresets');
presets.forEach((p, i) => {
    const btn = document.createElement('button');
    btn.className = 'color-preset' + (i === 0 ? ' active' : '');
    btn.style.background = `hsl(${p.h},${p.s}%,${p.l}%)`;
    btn.title = p.name;
    btn.addEventListener('click', () => {
        document.querySelectorAll('.color-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('hueSlider').value = p.h;
        document.getElementById('satSlider').value = p.s;
        document.getElementById('litSlider').value = p.l;
        updateColor();
    });
    presetsEl.appendChild(btn);
});

function updateColor() {
    const h = document.getElementById('hueSlider').value;
    const s = document.getElementById('satSlider').value;
    const l = document.getElementById('litSlider').value;
    document.getElementById('hueVal').textContent = h + '°';
    document.getElementById('satVal').textContent = s + '%';
    document.getElementById('litVal').textContent = l + '%';
    const hsl = `hsl(${h},${s}%,${l}%)`;
    const lNum = parseInt(l);
    const textCol = lNum > 55 ? 'rgba(0,0,0,.85)' : '#fff';
    const btnBg = lNum > 55 ? 'rgba(0,0,0,.15)' : 'rgba(255,255,255,.2)';
    const box = document.getElementById('previewBox');
    box.style.background = `linear-gradient(135deg,hsl(${h},${s}%,${Math.max(lNum - 10, 20)}%),${hsl})`;
    box.querySelector('#previewTitle').style.color = textCol;
    box.querySelector('#previewText').style.color = lNum > 55 ? 'rgba(0,0,0,.65)' : 'rgba(255,255,255,.85)';
    const pbtn = box.querySelector('#previewBtn');
    pbtn.style.background = btnBg; pbtn.style.color = textCol; pbtn.style.backdropFilter = 'blur(8px)';
    document.getElementById('cssLabel').textContent = 'background: ' + hsl;
    document.getElementById('cssOutput').textContent = 'background: ' + hsl;
    updateCard();
}

function updateCard() {
    const r = document.getElementById('radSlider').value;
    const fs = document.getElementById('fsSlider').value;
    document.getElementById('radVal').textContent = r + 'px';
    document.getElementById('fsVal').textContent = fs + 'px';
    const box = document.getElementById('previewBox');
    box.style.borderRadius = r + 'px';
    box.querySelector('#previewText').style.fontSize = fs + 'px';
}

function toggleAnim(id, cls) {
    const el = document.getElementById(id);
    el.classList.toggle(cls);
}

function updateFlex(prop, val) {
    document.getElementById('flexDemo').style[prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase())] = val;
}

updateColor();
