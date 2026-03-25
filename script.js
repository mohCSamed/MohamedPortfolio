/* ── Custom Cursor (desktop only) ── */
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;

if(window.matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function tick(){
    cur.style.left=mx+'px';cur.style.top=my+'px';
    rx+=(mx-rx)*.11;ry+=(my-ry)*.11;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a,button,.reel-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>cur.style.transform='translate(-50%,-50%) scale(3)');
    el.addEventListener('mouseleave',()=>cur.style.transform='translate(-50%,-50%) scale(1)');
  });
}

/* ── Fullscreen Menu ── */
const toggle  = document.getElementById('navToggle');
const overlay = document.getElementById('menuOverlay');
let menuOpen  = false;

function openMenu(){
  menuOpen=true;
  toggle.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeMenu(){
  menuOpen=false;
  toggle.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow='';
}
toggle.addEventListener('click',()=>{ menuOpen ? closeMenu() : openMenu(); });

/* close on link click */
overlay.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',closeMenu);
});

/* close on ESC */
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeMenu(); });

/* ── Scroll Reveal ── */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:.07});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* ── Nav scroll shadow ── */
const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>{
  nav.style.background = window.scrollY>60
    ? 'rgba(5,5,7,.98)'
    : 'linear-gradient(to bottom,rgba(5,5,7,.96) 50%,transparent)';
},{passive:true});
