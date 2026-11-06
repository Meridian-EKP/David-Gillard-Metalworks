// logo: header is fixed, so scroll explicitly instead of relying on the #top anchor
document.querySelector('.logo').addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,behavior:'instant'});history.replaceState(null,'',location.pathname)});
const hd=document.querySelector('header'),bg=document.querySelector('.burger'),dr=document.getElementById('drawer');
addEventListener('scroll',()=>hd.classList.toggle('solid',scrollY>30),{passive:true});
const tog=o=>{bg.classList.toggle('open',o);dr.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
bg.onclick=()=>tog(!dr.classList.contains('open'));
dr.querySelectorAll('a').forEach(a=>a.onclick=()=>tog(false));
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
document.getElementById('f').onsubmit=e=>{e.preventDefault();e.target.querySelector('button').style.display='none';document.getElementById('sent').style.display='block'};

// gallery
(()=>{const sh=[...document.querySelectorAll('.shot')],lb=document.getElementById('lb'),li=document.getElementById('lbi'),lc=document.getElementById('lbc');let cur=0;
const vis=()=>sh.filter(x=>!x.hidden);
const show=i=>{const v=vis();cur=(i+v.length)%v.length;const b=v[cur];li.src=b.querySelector('img').src;li.alt=lc.textContent=b.dataset.cap};
const close=()=>{lb.classList.remove('open');document.body.style.overflow=''};
sh.forEach(b=>b.onclick=()=>{show(vis().indexOf(b));lb.classList.add('open');document.body.style.overflow='hidden'});
lb.querySelector('.lb-x').onclick=close;lb.querySelector('.lb-p').onclick=()=>show(cur-1);lb.querySelector('.lb-nx').onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target===lb)close()};
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
let sx=0;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(cur+(d<0?1:-1))});
const more=document.getElementById('more');let f='all',open=false;
const apply=()=>{let n=0,t=0;sh.forEach(b=>{const m=f==='all'||b.dataset.cat===f;if(m)t++;b.hidden=!m||(!open&&++n>4)});more.hidden=t<=4;more.textContent=open?'Show fewer photos':'See more photos ('+(t-4)+' more)'};
more.onclick=()=>{open=!open;apply();if(!open)document.getElementById('work').scrollIntoView({behavior:'smooth'})};
document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===c));f=c.dataset.f;apply()});apply()})();
// forge sparks
(()=>{const c=document.getElementById('sparks'),x=c.getContext('2d');let W,H,P=[];
const rs=()=>{W=c.width=c.offsetWidth;H=c.height=c.offsetHeight};rs();addEventListener('resize',rs);
const mk=()=>({x:Math.random()*W,y:H+10,vx:(Math.random()-.5)*.6,vy:-(.6+Math.random()*1.6),r:.6+Math.random()*1.8,l:0,m:200+Math.random()*250});
for(let i=0;i<(innerWidth<760?30:70);i++){const p=mk();p.y=Math.random()*H;P.push(p)}
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
(function f(){x.clearRect(0,0,W,H);for(const p of P){p.l++;p.x+=p.vx+Math.sin(p.l/25)*.3;p.y+=p.vy;const a=1-p.l/p.m;
if(a<=0||p.y<-10){Object.assign(p,mk());continue}
x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fillStyle=`rgba(255,${130+a*90|0},40,${a})`;x.shadowBlur=10;x.shadowColor='#ff7a1a';x.fill()}
requestAnimationFrame(f)})()})();
