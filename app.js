const GROUPS = [
    {
        title: "实用工具",
        single: true,
        items: [
            { href: "www.wwtalk.site", title: "旺商聊", desc: "加密聊天", img: "WW.jpeg" },
            { href: "https://www.haiouchat.com/?account=50289396&XinShareId=50289396", title: "海鸥", desc: "安全私密", img: "HO.jpeg" },
            { href: "https://viayoo.com/zh-cn/", title: "via", desc: "好用浏览器", img: "VIA.jpeg" },
            { href: "https://iawlewsta.sta.lego14.com/merchant/download", title: "CGpay", desc: "虚拟货币", img: "CGPAY.jpeg" },
        ]
    },
    {
        title: "大💦推荐",
        single: false,
        items: [
            { href: "https://lncqc.jgqvji.com/app/register.php?site_id=1051&topId=6131786730461291", title: "TOP1体育", desc: "700返388", img: "Top1.jpeg" },
            { href: "https://rsesra.hfjcl.com/app/register.php?site_id=1064&pt=57F7038A-C37D-5488-6F01-5582A49232D3", title: "领航国际", desc: "700返388", img: "LH.jpeg" },
            { href: "https://aliua.tprsmi.com/app/register.php?site_id=1057&topId=9011785776123419", title: "星耀国际", desc: "700返388", img: "XY.jpeg" },
            { href: "https://tfajn.hcjwj.com/app/register.php?site_id=2081&pt=0D9EA90C-995C-C33D-6147-AE83B8C4B908", title: "君临国际", desc: "700返388", img: "JL.jpeg" },
            { href: "http://xnqwzf.tckqxx.com/app/register.php?site_id=1067&topId=2391785257121913&selfPlanId=379526", title: "纵横国际", desc: "新台大💦", img: "ZH.jpeg" },
            { href: "https://psktkx.tckqxx.com/app/register.php?site_id=1065&topId=2451782259688600&selfPlanId=1080401", title: "龙腾国际", desc: "大💦推荐", img: "LT.jpeg" },
            { href: "https://dspeoql.tprsmi.com/app/register.php?site_id=1058&topId=7141781360874738&selfPlanId=4133106", title: "胜天国际", desc: "大💦推荐", img: "ST.jpeg" },
            { href: "https://ybkvbz.tckqxx.com/app/register.php?site_id=1066&topId=4391782217700716&selfPlanId=1622128", title: "聚鑫汇", desc: "大💦推荐", img: "JXH.jpeg" },
            { href: "https://lncqc.jgqvji.com/app/register.php?site_id=1050&topId=8661778572245166&selfPlanId=6575563", title: "非凡娱乐", desc: "大💦推荐", img: "FF.jpeg" },
            { href: "https://mgokgd.jgqvji.com/app/register.php?site_id=1032&pt=605CC4DC-2400-D53A-CCE8-AEDA4C0EFA0B", title: "超凡国际", desc: "大💦推荐", img: "CF.jpeg" },          
        ]
    },
    {
        title: "宝藏网站",
        single: true,
        items: [
            { href: "https://1000101j1u.xeyddxh.top:2096/?step=10&channelCode=1000101&t=1", title: "免费看片", desc: "成人网站", img: "MFKP.jpeg" },
            { href: "https://18dyw.net/", title: "抖阴", desc: "深夜福利", img: "18DY.jpeg" },
            { href: "https://kai28.cc/live", title: "加拿大助手", desc: "28预测", img: "JND.jpeg" },
            { href: "https://ngsw.mx/?page=1&category=1", title: "PG模拟器", desc: "开局十万币", img: "PG.jpeg" }
        ]
    },
];

const track = document.getElementById('titleTrack');
const panelInner = document.getElementById('panelInner');
let active = 1;

function renderPanel(idx) {
    const g = GROUPS[idx];
    const gridClass = g.single ? 'content-grid single' : 'content-grid';
    let html = `<div class="${gridClass}">`;
    g.items.forEach(it => {
        html += `<a href="${it.href}" class="content-card">
            <div class="card-icon"><img src="${it.img}" alt="${it.title}" onerror="this.style.display='none'"></div>
            <div class="card-info">
                <span class="card-title">${it.title}</span>
                <span class="card-desc">${it.desc}</span>
            </div>
        </a>`;
    });
    html += `</div>`;
    panelInner.innerHTML = html;
    requestAnimationFrame(() => {
        panelInner.querySelectorAll('.content-card').forEach(c => c.classList.add('in'));
    });
}

function update() {
    const tabs = track.querySelectorAll('.title-tab');
    tabs.forEach((t, i) => {
        t.classList.remove('active', 'left', 'right', 'hidden');
        if (i === active) t.classList.add('active');
        else if (i === active - 1) t.classList.add('left');
        else if (i === active + 1) t.classList.add('right');
        else t.classList.add('hidden');
    });
}

function go(i) {
    const newIdx = Math.max(0, Math.min(GROUPS.length - 1, i));
    if (newIdx === active) return;
    active = newIdx;
    update();
    panelInner.classList.add('switching');
    setTimeout(() => { renderPanel(active); panelInner.classList.remove('switching'); }, 200);
}

GROUPS.forEach((g, i) => {
    const tab = document.createElement('div');
    tab.className = 'title-tab';
    tab.textContent = g.title;
    tab.addEventListener('click', () => { go(i); });
    track.appendChild(tab);
});

renderPanel(active);
update();

let startX = null, startY = null, dx = 0, dy = 0;
track.addEventListener('touchstart', e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    dx = 0;
    dy = 0;
}, { passive: true });

track.addEventListener('touchmove', e => {
    if (startX == null) return;
    dx = e.touches[0].clientX - startX;
    dy = e.touches[0].clientY - startY;
}, { passive: true });

track.addEventListener('touchend', () => {
    if (startX == null) return;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0 && active < GROUPS.length - 1) go(active + 1);
        else if (dx > 0 && active > 0) go(active - 1);
    }
    startX = null;
    startY = null;
    dx = 0;
    dy = 0;
});

function showToast(msg) {
    var toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function() {
        toast.classList.remove('show');
    }, 2000);
}

function shareCopy() {
    copyText(document.getElementById('shareLinkInput').value);
}

function shareCopyName() {
    copyText(document.getElementById('shareNameInput').value);
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(function() {
        showToast('复制成功');
    }).catch(function() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showToast('复制成功');
        } catch(e) {
            showToast('复制失败');
        }
        document.body.removeChild(ta);
    });
}

window.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('img');
    var total = images.length, loaded = 0;
    var fill = document.getElementById('loaderFill'),
        text = document.getElementById('loaderText'),
        loader = document.getElementById('pageLoader');

    fill.style.width = '80%';
    text.textContent = '加载中 80%';

    function allLoaded() {
        fill.style.width = '100%';
        text.textContent = '加载中 100%';
        setTimeout(function() {
            loader.classList.add('hide');
            document.body.classList.add('play');
            setTimeout(function() { loader.style.display = 'none'; }, 700);
        }, 300);
        document.getElementById('welcomeMask').classList.add('show');
    }

    if (total === 0) { allLoaded(); return; }

    images.forEach(function(img) {
        var n = new Image();
        n.onload = n.onerror = function() {
            loaded++;
            var p = 80 + Math.round(loaded / total * 20);
            fill.style.width = p + '%';
            text.textContent = '加载中 ' + p + '%';
            if (loaded >= total) allLoaded();
        };
        n.src = img.src;
    });

    setTimeout(function() { if (loaded < total) allLoaded(); }, 8000);
});

document.getElementById('popupClose').addEventListener('click', function() {
    document.getElementById('welcomeMask').classList.remove('show');
});

document.getElementById('welcomeMask').addEventListener('click', function(e) {
    if (e.target === document.getElementById('welcomeMask')) {
        document.getElementById('welcomeMask').classList.remove('show');
    }
});

function doShare() {
    document.getElementById('shareLinkInput').value = 'https://江霖.cc/';
    document.getElementById('shareNameInput').value = '700833448';
    document.getElementById('shareMask').classList.add('show');
}

function closeShare() {
    document.getElementById('shareMask').classList.remove('show');
}

(function() {
    var text = document.querySelector('.marquee-content');
    function loop() {
        text.style.transition = 'none';
        text.style.transform = 'translateX(100vw)';
        text.offsetHeight;
        text.style.transition = 'transform 20s linear';
        text.style.transform = 'translateX(-100%)';
        setTimeout(loop, 22000);
    }
    setTimeout(loop, 500);
})();

(function() {
    var canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    var particles = [];
    var layers = [
        { count: 60,  minR: 2.4, maxR: 2.4, speed: 0.5, alpha: 0.7, color: [255, 225, 140] },
        { count: 100, minR: 1.6, maxR: 1.6, speed: 0.3, alpha: 0.5, color: [240, 199, 94] },
        { count: 140, minR: 0.9, maxR: 0.9, speed: 0.15, alpha: 0.3, color: [200, 160, 80] },
    ];

    layers.forEach(function(layer) {
        for (var i = 0; i < layer.count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: layer.minR,
                s: layer.speed * (0.5 + Math.random() * 1.5),
                a: Math.random() * Math.PI * 2,
                sa: (Math.random() - 0.5) * 0.008,
                layer: layer
            });
        }
    });

    function draw() {
        ctx.fillStyle = '#1a1612';
        ctx.fillRect(0, 0, W, H);

        var grad = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, H * 0.65);
        grad.addColorStop(0, 'rgba(240, 199, 94, 0.15)');
        grad.addColorStop(1, 'rgba(26, 22, 18, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.y -= p.s;
            p.a += p.sa;
            p.x += Math.sin(p.a) * 0.3;

            if (p.y < -p.r * 2) {
                p.y = H + p.r * 2;
                p.x = Math.random() * W;
            }
            if (p.x < -10) p.x = W + 10;
            if (p.x > W + 10) p.x = -10;

            var c = p.layer.color;
            var alpha = p.layer.alpha * (0.6 + 0.4 * Math.sin(p.a));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')';
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    draw();
})();
