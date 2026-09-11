const themeToggle=document.getElementById("themeToggle");
const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
const saved=localStorage.getItem("portfolio-theme");
if(saved==="light"){document.body.classList.add("light");themeToggle.textContent="☀";}
themeToggle.addEventListener("click",()=>{document.body.classList.toggle("light");const light=document.body.classList.contains("light");themeToggle.textContent=light?"☀":"☾";localStorage.setItem("portfolio-theme",light?"light":"dark");});
menuToggle.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const canvas=document.getElementById("neuralCanvas"),ctx=canvas.getContext("2d");
let nodes=[];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);nodes=Array.from({length:Math.min(55,Math.floor(innerWidth/22))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}));}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);const accent=getComputedStyle(document.body).getPropertyValue("--accent").trim();for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>innerWidth)n.vx*=-1;if(n.y<0||n.y>innerHeight)n.vy*=-1;ctx.beginPath();ctx.arc(n.x,n.y,1.2,0,Math.PI*2);ctx.fillStyle=accent;ctx.globalAlpha=.22;ctx.fill();}
for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<125){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=accent;ctx.globalAlpha=(1-d/125)*.09;ctx.stroke();}}
ctx.globalAlpha=1;requestAnimationFrame(draw);}
addEventListener("resize",resize);resize();draw();
