const KEY='foroguapuru_v1';
function colorFor(name){let h=0;for(let c of name)h=(h*31+c.charCodeAt(0))%360;return `hsl(${h},55%,42%)`}
function iniciales(n){return n.trim().split(/\s+/).slice(0,2).map(w=>w[0]||'').join('').toUpperCase()||'?'}
function fecha(){return new Date().toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})+' '+new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'})}
function seed(){
return [
 {id:1,nombre:'Jap 2',ubic:'Sonsón, Antioquia',rol:'Guardián del Jardín',titulo:'¿Cada cuánto cosechan su guapurú? Mi tronco se llenó de bolitas negras',cat:'Cultivo y cosecha',fecha:'26 Ene 2026 10:15',msg:'Hola a todos. Tengo un árbol de guapurú (jaboticaba) de unos 8 años en Cerritos. Este mes el tronco se cubrió de frutos negros brillantes. ¿Es normal que dé dos cosechas al año? Yo lo abono con orgánico y lo riego en verano. Saludos.',likes:['Mamiblu','DanielCárdenas'],resps:[
   {nombre:'Mamiblu',ubic:'Rionegro',fecha:'26 Ene 2026 12:40',txt:'Sí, es normal. La floración dura 3-6 días y el fruto madura en un mes. La cosecha dura 2 semanas y a veces repite a los 2 meses. Cosecha cuando estén bien negras y dulces (18-22 Brix).',likes:['Jap 2']},
   {nombre:'DanielCárdenas',ubic:'Palmira',fecha:'26 Ene 2026 15:02',txt:'En NIRVANA cosechan 250 kilos por árbol al año en dos cosechas. Congela el jugo sobrante el mismo día o haz mermelada, en fresco solo dura 6-7 días.',likes:[]}
 ]},
 {id:2,nombre:'Mamiblu',ubic:'La Ceja',rol:'Flor en potencia',titulo:'Quiero hacer mermelada y jugo, ¿pasteurizo o uso alta presión?',cat:'Recetas: jugos y mermeladas',fecha:'27 Ene 2026 09:20',msg:'Hola, nunca he procesado guapurú, solo plantas ornamentales. Quiero sembrar y también hacer mermelada y néctar. Leí que la pulpa es pálida y poco atractiva. ¿Le agrego cáscara para color? ¿Qué método usan para conservar el jugo?',likes:['DanielCárdenas'],resps:[
   {nombre:'Jap 2',ubic:'Sonsón, Antioquia',fecha:'27 Ene 2026 11:11',txt:'Cita a Mamiblu: usa la cáscara, tiene antocianinas y da color natural. Para casa, pasteuriza 82°C 2 min y refrigera. El método HIP es mejor pero requiere equipos caros.',likes:['Mamiblu']}
 ]},
 {id:3,nombre:'Profe Diomara',ubic:'Sonsón',rol:'Ing. Agropecuaria',titulo:'Vino de guapurú rosado vs tinto ¿cuál sale mejor?',cat:'Vinos y licores',fecha:'28 Ene 2026 16:45',msg:'Según Lemus (2006) el vino tinto y el Coupage tienen mejor color por macerar con piel. El rosado queda sin cuerpo. ¿Alguien ha fermentado con levadura de vino tinto juvenil? Compartan receta de agua-azúcar-levadura-fruta.',likes:[],resps:[]}
];}
function load(){try{let d=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(d)&&d.length)return d}catch(e){}let s=seed();localStorage.setItem(KEY,JSON.stringify(s));return s}
function save(d){localStorage.setItem(KEY,JSON.stringify(d))}
document.getElementById('fechaHoy').textContent=new Date().toLocaleDateString('es-ES',{day:'numeric',month:'short',year:'numeric'});
document.querySelectorAll('.tab-btn,.main-nav a').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();let t=b.dataset.goto||b.dataset.tab;if(t)activar(t)}));
function activar(t){document.querySelectorAll('.tab-btn').forEach(x=>x.classList.toggle('active',x.dataset.tab===t));['info','foro','articulo'].forEach(k=>document.getElementById('tab-'+k).classList.toggle('hidden',k!==t));window.scrollTo({top:0,behavior:'smooth'})}
function mensajesPorUsuario(data,nombre){let c=0;data.forEach(t=>{if(t.nombre===nombre)c++;t.resps.forEach(r=>{if(r.nombre===nombre)c++})});return c||1}
function crearTema(){
 let n=document.getElementById('f-nombre').value.trim(),ti=document.getElementById('f-titulo').value.trim(),m=document.getElementById('f-mensaje').value.trim();
 if(!n||!ti||!m){alert('Completa nombre, título y mensaje');return}
 let d=load();d.unshift({id:Date.now(),nombre:n,ubic:document.getElementById('f-ubic').value.trim()||'Colombia',rol:'Miembro del foro',titulo:ti,cat:document.getElementById('f-cat').value,fecha:fecha(),msg:m,likes:[],resps:[]});
 save(d);document.getElementById('f-titulo').value='';document.getElementById('f-mensaje').value='';renderForo();
}
function borrarTema(id){if(!confirm('¿Borrar esta pregunta y sus comentarios?'))return;let d=load().filter(t=>t.id!==id);save(d);renderForo()}
function borrarResp(tid,idx){if(!confirm('¿Borrar este comentario?'))return;let d=load();let t=d.find(x=>x.id===tid);t.resps.splice(idx,1);save(d);renderForo()}
function likeTema(id){let d=load();let t=d.find(x=>x.id===id);let yo=prompt('Tu nombre para el Me gusta:',document.getElementById('f-nombre').value||'Anónimo');if(!yo)return;if(!t.likes.includes(yo))t.likes.push(yo);save(d);renderForo()}
function likeResp(tid,idx){let d=load();let r=d.find(x=>x.id===tid).resps[idx];let yo=prompt('Tu nombre para el Me gusta:',document.getElementById('f-nombre').value||'Anónimo');if(!yo)return;if(!r.likes.includes(yo))r.likes.push(yo);save(d);renderForo()}
function responder(id,cita){
 let yo=document.getElementById('f-nombre').value.trim()||prompt('Escribe tu nombre para responder:');if(!yo)return;document.getElementById('f-nombre').value=yo;
 let txt=prompt((cita?'Citar y responder:\n'+cita+'\n\n':'')+'Escribe tu comentario:');if(!txt)return;
 let d=load();let t=d.find(x=>x.id===id);t.resps.push({nombre:yo,ubic:document.getElementById('f-ubic').value.trim()||'Colombia',fecha:fecha(),txt:(cita?`"${cita}" — `:'')+txt,likes:[]});save(d);renderForo();
}
function restaurarDemo(){if(confirm('¿Restaurar preguntas de ejemplo?')){localStorage.setItem(KEY,JSON.stringify(seed()));renderForo()}}
function renderForo(){
 let data=load();let q=document.getElementById('buscar').value.toLowerCase();let cf=document.getElementById('filtroCat').value;
 let filt=data.filter(t=>(!cf||t.cat===cf)&&(!q||(t.titulo+t.msg+t.nombre+t.cat).toLowerCase().includes(q)));
 document.getElementById('contadorTemas').textContent='· '+data.length+' preguntas';
 let tot=data.reduce((a,t)=>a+1+t.resps.length,0);document.getElementById('totalMsg').textContent=tot+' mensajes en total';
 let box=document.getElementById('listaForo');box.innerHTML='';
 if(!filt.length){box.innerHTML='<div class=card>No hay resultados. ¡Sé el primero en preguntar! 👆</div>';return}
 filt.forEach((t,i)=>{
  let div=document.createElement('div');div.className='post';
  div.innerHTML=`<div class="post-side"><div class="avatar" style="background:${colorFor(t.nombre)}">${iniciales(t.nombre)}</div><div class="uname">${t.nombre}</div><div class="urol">${t.rol||'Miembro'} 💧</div><div class="uinfo">Mensajes:<b>${mensajesPorUsuario(data,t.nombre)}</b><br>Localización:<b>${t.ubic||''}</b><br><span class="tag">${t.cat}</span></div></div>
  <div class="post-main"><div class="post-head"><span>${t.fecha}</span><span>🔗 #${i+1}</span></div>
  <div class="post-body"><b style="color:#0e3b22">${t.titulo}</b><br>${t.msg.replace(/\n/g,'<br>')}</div>
  ${t.likes.length?`<div class="likes">👍 ${t.likes.join(', ')}</div>`:''}
  <div class="post-actions"><button class="small-btn" onclick="responder(${t.id})">💬 Responder</button><button class="small-btn" onclick="responder(${t.id},'${t.msg.slice(0,80).replace(/'/g,'')}')">↩️ Citar</button><button class="small-btn" onclick="likeTema(${t.id})">👍 Me gusta (${t.likes.length})</button><button class="small-btn danger" onclick="borrarTema(${t.id})">🗑️ Borrar pregunta</button></div>
  <div class="resp">${t.resps.map((r,j)=>`<div class="resp-item"><div class="resp-avatar" style="background:${colorFor(r.nombre)}">${iniciales(r.nombre)}</div><div class="resp-txt"><b style="color:#1e5a2e">${r.nombre}</b> <span class="resp-meta">${r.ubic||''} · ${r.fecha}</span><br>${r.txt.replace(/\n/g,'<br>')}<br><span class="resp-meta">👍 ${r.likes.join(', ')||'Sin likes'}</span> <a href="#" onclick="likeResp(${t.id},${j});return false">Me gusta</a> · <a href="#" onclick="responder(${t.id},'${r.txt.slice(0,60).replace(/'/g,'')}');return false">Citar</a> · <a href="#" onclick="borrarResp(${t.id},${j});return false" style="color:#a00">Borrar</a></div></div>`).join('')||'<div style="padding:6px;font-size:12px;color:#888">Sin comentarios aún. ¡Responde primero! 👇</div>'}</div>
  </div>`;
  box.appendChild(div);
 });
}
renderForo();
