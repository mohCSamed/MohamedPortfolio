/* ════════════════════════════
   DATA — default reels
════════════════════════════ */
const DEFAULT_REELS = [
  { id:1, title:'REEL 01', type:'Reels', link:'https://drive.google.com/file/d/1jhWVgoFFsghR0hvRfgT-dYshLEoMOa24/view' },
  { id:2, title:'REEL 02', type:'Reels', link:'https://drive.google.com/file/d/1FqpgwP5qvTnCSyPLE3pSfhGYeRjYniRl/view' },
  { id:3, title:'REEL 03', type:'Reels', link:'https://drive.google.com/file/d/1qJL_4Fm56S227Z56F_-prhOzhgAPZe_5/view' },
  { id:4, title:'REEL 04', type:'Reels', link:'https://drive.google.com/file/d/1IFZlgMUSZYbA0N4NbXwz-3L2Vit1rCKp/view' },
  { id:5, title:'REEL 05', type:'Reels', link:'https://drive.google.com/file/d/1zhSJHtreEfq8PtroN7lOfYtSsuL4BHdZ/view' },
];

function loadReels() {
  const saved = localStorage.getItem('ma_reels');
  return saved ? JSON.parse(saved) : DEFAULT_REELS;
}
function saveReels(reels) {
  localStorage.setItem('ma_reels', JSON.stringify(reels));
}

/* ════════════════════════════
   RENDER REEL GRID
════════════════════════════ */
function buildReelCard(reel, idx) {
  const num = String(idx + 1).padStart(2,'0');
  const card = document.createElement('div');
  card.className = `reel-card reveal d${Math.min(idx+1,4)}`;
  card.onclick = () => window.open(reel.link, '_blank');
  card.innerHTML = `
    <div class="reel-ratio">
      <div class="reel-thumb">
        <div class="reel-bg-num">${num}</div>
        <div class="play-wrap">
          <div class="play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
          <span class="play-label">Watch Reel</span>
        </div>
      </div>
      <div class="reel-footer">
        <div><p class="reel-tag">${reel.type}</p><p class="reel-name">${reel.title}</p></div>
        <div class="reel-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </div>
      </div>
    </div>`;
  return card;
}

function renderReels() {
  const grid = document.getElementById('reelGrid');
  const reels = loadReels();
  grid.innerHTML = '';
  reels.forEach((r, i) => {
    const card = buildReelCard(r, i);
    grid.appendChild(card);
  });
  // Update stat counter
  const stat = document.getElementById('reelStatNum');
  if (stat) stat.textContent = reels.length + '+';
  // Re-observe new cards
  reels.forEach((_, i) => {
    const card = grid.children[i];
    if (card) revealObs.observe(card);
  });
}

/* ════════════════════════════
   CUSTOM CURSOR
════════════════════════════ */
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;

if (window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function tick(){
    cur.style.left=mx+'px'; cur.style.top=my+'px';
    rx+=(mx-rx)*.11; ry+=(my-ry)*.11;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(tick);
  })();
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a,button,.reel-card,.form-btn,.modal-close'))
      cur.style.transform='translate(-50%,-50%) scale(3)';
    else cur.style.transform='translate(-50%,-50%) scale(1)';
  });
}

/* ════════════════════════════
   MOBILE NAV
════════════════════════════ */
const navToggle   = document.getElementById('navToggle');
const menuOverlay = document.getElementById('menuOverlay');
let menuOpen = false;

function openMenu()  { menuOpen=true;  navToggle.classList.add('open');    menuOverlay.classList.add('open');    document.body.style.overflow='hidden'; }
function closeMenu() { menuOpen=false; navToggle.classList.remove('open'); menuOverlay.classList.remove('open'); document.body.style.overflow=''; }

navToggle.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
menuOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key==='Escape') { closeMenu(); closeLogin(); closeAdmin(); } });

/* ════════════════════════════
   NAV SCROLL
════════════════════════════ */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive:true });

/* ════════════════════════════
   SCROLL REVEAL
════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold:.07 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ════════════════════════════
   LOGIN MODAL
════════════════════════════ */
const loginBackdrop = document.getElementById('loginBackdrop');
const loginClose    = document.getElementById('loginClose');
const loginBtn      = document.getElementById('loginBtn');
const loginUser     = document.getElementById('loginUser');
const loginPass     = document.getElementById('loginPass');
const loginError    = document.getElementById('loginError');
const adminTrigger  = document.getElementById('adminTrigger');

function openLogin() {
  loginUser.value=''; loginPass.value=''; loginError.textContent='';
  loginBackdrop.classList.add('open');
  document.body.style.overflow='hidden';
  setTimeout(() => loginUser.focus(), 400);
}
function closeLogin() {
  loginBackdrop.classList.remove('open');
  document.body.style.overflow='';
}

adminTrigger.addEventListener('click', openLogin);
loginClose.addEventListener('click', closeLogin);
loginBackdrop.addEventListener('click', e => { if(e.target===loginBackdrop) closeLogin(); });

function doLogin() {
  const u = loginUser.value.trim();
  const p = loginPass.value.trim();
  if (u === 'Mohamed' && p === '123456789') {
    closeLogin();
    openAdmin();
  } else {
    loginError.textContent = 'Incorrect username or password.';
    loginPass.value='';
    loginPass.focus();
  }
}

loginBtn.addEventListener('click', doLogin);
[loginUser, loginPass].forEach(el => el.addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); }));

/* ════════════════════════════
   ADMIN PANEL
════════════════════════════ */
const adminBackdrop  = document.getElementById('adminBackdrop');
const adminClose     = document.getElementById('adminClose');
const logoutBtn      = document.getElementById('logoutBtn');
const addReelBtn     = document.getElementById('addReelBtn');
const reelTitleInp   = document.getElementById('reelTitle');
const reelTypeInp    = document.getElementById('reelType');
const reelLinkInp    = document.getElementById('reelLink');
const adminError     = document.getElementById('adminError');
const adminReelList  = document.getElementById('adminReelList');
const reelCountEl    = document.getElementById('reelCount');

function openAdmin() {
  refreshAdminList();
  adminBackdrop.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeAdmin() {
  adminBackdrop.classList.remove('open');
  document.body.style.overflow='';
  reelTitleInp.value=''; reelLinkInp.value=''; reelTypeInp.value='Reels';
  adminError.textContent='';
}

adminClose.addEventListener('click', closeAdmin);
logoutBtn.addEventListener('click', closeAdmin);
adminBackdrop.addEventListener('click', e => { if(e.target===adminBackdrop) closeAdmin(); });

function refreshAdminList() {
  const reels = loadReels();
  reelCountEl.textContent = reels.length;
  adminReelList.innerHTML = '';
  reels.forEach((r, i) => {
    const item = document.createElement('div');
    item.className = 'admin-reel-item';
    item.innerHTML = `
      <span class="ari-num">${String(i+1).padStart(2,'0')}</span>
      <div class="ari-info">
        <div class="ari-title">${r.title}</div>
        <div class="ari-type">${r.type}</div>
      </div>
      <button class="ari-del" data-id="${r.id}" title="Delete">✕</button>`;
    adminReelList.appendChild(item);
  });
  adminReelList.querySelectorAll('.ari-del').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const reels = loadReels().filter(r => r.id !== id);
      saveReels(reels);
      renderReels();
      refreshAdminList();
    });
  });
}

function extractDriveId(url) {
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

addReelBtn.addEventListener('click', () => {
  const title = reelTitleInp.value.trim();
  const type  = reelTypeInp.value.trim() || 'Reels';
  const link  = reelLinkInp.value.trim();

  adminError.textContent = '';

  if (!title) { adminError.textContent='Please enter a title.'; return; }
  if (!link)  { adminError.textContent='Please enter a Google Drive link.'; return; }
  if (!extractDriveId(link)) { adminError.textContent='Invalid Google Drive link format.'; return; }

  const reels = loadReels();
  const newId = reels.length ? Math.max(...reels.map(r=>r.id)) + 1 : 1;
  const cleanLink = link.includes('/view') ? link : link + '/view';
  reels.push({ id:newId, title, type, link:cleanLink });
  saveReels(reels);
  renderReels();
  refreshAdminList();

  reelTitleInp.value=''; reelLinkInp.value=''; reelTypeInp.value='Reels';
  adminError.style.color='#4caf50';
  adminError.textContent='✓ Reel added successfully!';
  setTimeout(() => { adminError.textContent=''; adminError.style.color=''; }, 3000);
});

/* ════════════════════════════
   INIT
════════════════════════════ */
renderReels();
