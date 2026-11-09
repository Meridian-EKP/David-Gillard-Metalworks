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
// forge sparks: plain CSS-animated elements (sized in CSS px, so nothing can be stretched or sped up)
(()=>{const box=document.getElementById('sparks');if(!box||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const n=innerWidth<760?26:55,r=(a,b)=>a+Math.random()*(b-a);
for(let k=0;k<n;k++){const e=document.createElement('i');
  e.style.cssText=`--x:${r(0,100).toFixed(1)}%;--s:${r(2,5).toFixed(1)}px;--d:${r(5,11).toFixed(1)}s;--l:-${r(0,11).toFixed(1)}s;--dx:${r(-40,40).toFixed(0)}px`;
  box.appendChild(e)}
new IntersectionObserver(e=>box.classList.toggle('off',!e[0].isIntersecting)).observe(box)})();

// product gallery + quantity (UI only)
(()=>{const g=document.getElementById('gmain');if(!g)return;const alts=JSON.parse(g.dataset.alts),img=document.getElementById('gimg'),cnt=document.getElementById('gcount'),pts=[...document.querySelectorAll('.pt')];let i=0;
const go=n=>{i=(n+alts.length)%alts.length;img.src=pts[i].querySelector('img').src;img.alt=alts[i];cnt.textContent=(i+1)+' / '+alts.length;pts.forEach((p,k)=>p.classList.toggle('on',k===i));pts[i].scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'})};
pts.forEach((p,k)=>p.onclick=()=>go(k));g.querySelector('.g-p').onclick=()=>go(i-1);g.querySelector('.g-nx').onclick=()=>go(i+1);
let x=0;g.addEventListener('touchstart',e=>x=e.touches[0].clientX,{passive:true});g.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-x;if(Math.abs(d)>40)go(i+(d<0?1:-1))});
})();

// reviews carousel
(()=>{const p=document.getElementById('proof');if(!p)return;const t=p.querySelector('.ptrack'),n=t.children.length,d=document.getElementById('pdots');let i=0;
d.innerHTML='<i></i>'.repeat(n);
const go=k=>{i=(k+n)%n;t.style.transform='translateX(-'+i*100+'%)';[...d.children].forEach((x,m)=>x.classList.toggle('on',m===i))};
document.getElementById('pprev').onclick=()=>go(i-1);document.getElementById('pnext').onclick=()=>go(i+1);
let x=0;p.addEventListener('touchstart',e=>x=e.touches[0].clientX,{passive:true});p.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-x;if(Math.abs(dx)>40)go(i+(dx<0?1:-1))});go(0)})();

// Buy now: opens David's Stripe Payment Link (data-stripe on #buy). Nothing else on the site touches Stripe.
(()=>{const b=document.getElementById('buy');if(!b)return;const m=document.getElementById('buymsg');
b.onclick=()=>{const u=(b.dataset.stripe||'').trim();if(/^https:\/\/(buy\.stripe\.com|checkout\.stripe\.com)\//.test(u))location.href=u;else m.hidden=false}})();
