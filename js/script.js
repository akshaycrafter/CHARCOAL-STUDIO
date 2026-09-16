
function initHero(){
  document.querySelectorAll('.hero .reveal-line').forEach((el,i)=>{
    setTimeout(()=>el.classList.add('in'),i*130);
  });
  document.querySelectorAll('.hero .fade-up').forEach((el,i)=>{
    setTimeout(()=>el.classList.add('in'),i*110+180);
  });
}
initHero();

/* MAGNETIC */
document.querySelectorAll('.mag-btn').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const dx=(e.clientX-(r.left+r.width/2))*.38;
    const dy=(e.clientY-(r.top+r.height/2))*.38;
     btn.style.transform=`translate(${dx}px,${dy}px)`;
   });
   btn.addEventListener('mouseleave',()=>{
     btn.style.transform='';
   });
});

/* NAV */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('stuck',scrollY>60),{passive:true});

/* HAMBURGER */
const ham=document.getElementById('ham');
const mob=document.getElementById('mobMenu');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mob.classList.toggle('open');});
mob.querySelectorAll('[data-close]').forEach(a=>a.addEventListener('click',()=>{ham.classList.remove('open');mob.classList.remove('open');}));

/* OBSERVER */
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    if(e.target.classList.contains('reveal-line')||e.target.classList.contains('fade-up'))e.target.classList.add('in');
    io.unobserve(e.target);
  });
},{threshold:.14,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal-line:not(.hero .reveal-line),.fade-up:not(.hero .fade-up)').forEach(el=>io.observe(el));

/* COUNTER */
function countUp(el,target,suffix,dur=1600){
  const start=performance.now();
  (function tick(now){
    const t=Math.min((now-start)/dur,1);
    const ease=1-Math.pow(1-t,3);
    el.textContent=Math.round(ease*target)+suffix;
    if(t<1)requestAnimationFrame(tick);
  })(performance.now());
}
const cio=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    countUp(e.target,+e.target.dataset.count,e.target.dataset.suffix||'');
    cio.unobserve(e.target);
  });
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

/* CHARCOAL STUDIO */
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const btn=document.getElementById('formBtn');
  const sp=btn.querySelector('span');
  const orig=sp.textContent;
  sp.textContent='Message Sent ✓';
  btn.style.opacity='.6';
  btn.disabled=true;
  setTimeout(()=>{sp.textContent=orig;btn.style.opacity='';btn.disabled=false;e.target.reset();},3200);
});

/* PARALLAX */
let tick2=false;
window.addEventListener('scroll',()=>{
  if(!tick2){requestAnimationFrame(()=>{
    if(window.innerWidth>768){
      const y=scrollY;
      const hl=document.querySelector('.hero-left');
      const hr=document.querySelector('.hero-right');
      if(hl){hl.style.transform=`translateY(${y*.065}px)`;hr.style.transform=`translateY(${y*.032}px)`;}
    }
    tick2=false;
  });tick2=true;}
},{passive:true});
