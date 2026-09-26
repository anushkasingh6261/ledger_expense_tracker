const CATS = ["Food","Transport","Housing","Utilities","Entertainment","Health","Other"];
const CAT_COLORS = ["#2F5D46","#7FA98F","#C9A227","#B4543B","#5C6A62","#8A6FB0","#4477A1"];
let expenses = [];

function loadData(){
  try{ const raw = localStorage.getItem('ledger:expenses'); expenses = raw ? JSON.parse(raw) : []; }
  catch(e){ expenses = []; }
}
function saveData(){
  try{ localStorage.setItem('ledger:expenses', JSON.stringify(expenses)); }catch(e){}
}

document.getElementById('themeBtn').addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
});

const filterCat = document.getElementById('filterCat');
CATS.forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c; filterCat.appendChild(o); });

document.getElementById('date').valueAsDate = new Date();

let chart;
function render(){
  const sortBy = document.getElementById('sortBy').value;
  const catF = filterCat.value;
  let list = expenses.filter(e => !catF || e.category === catF);
  list.sort((a,b)=>{
    if(sortBy==='date-desc') return b.date.localeCompare(a.date);
    if(sortBy==='date-asc') return a.date.localeCompare(b.date);
    if(sortBy==='amount-desc') return b.amount - a.amount;
    return a.amount - b.amount;
  });

  const rows = document.getElementById('rows');
  rows.innerHTML = '';
  document.getElementById('emptyMsg').style.display = list.length ? 'none' : 'block';
  list.forEach(e=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${e.date}</td><td>${escapeHtml(e.desc)}</td><td><span class="cat-tag">${e.category}</span></td>
      <td class="amt">₹${e.amount.toFixed(2)}</td><td><button class="del" data-id="${e.id}" title="Delete">✕</button></td>`;
    rows.appendChild(tr);
  });
  rows.querySelectorAll('.del').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      expenses = expenses.filter(e=>String(e.id)!==btn.dataset.id);
      saveData(); render();
    });
  });

  const total = list.reduce((s,e)=>s+e.amount,0);
  document.getElementById('totalNum').textContent = '₹' + total.toFixed(2);

  const byCat = {};
  list.forEach(e=>{ byCat[e.category] = (byCat[e.category]||0) + e.amount; });
  const labels = Object.keys(byCat);
  const data = labels.map(l=>byCat[l]);
  const colors = labels.map(l=>CAT_COLORS[CATS.indexOf(l)] || '#999');

  const legend = document.getElementById('legend');
  legend.innerHTML = labels.length ? labels.map((l,i)=>`<span><span class="dot" style="background:${colors[i]}"></span>${l} — ₹${data[i].toFixed(2)}</span>`).join('') : '<span>No data yet</span>';

  if(chart) chart.destroy();
  const ctx = document.getElementById('catChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0 }] },
    options: { plugins:{ legend:{ display:false } }, cutout:'62%', maintainAspectRatio:false }
  });
}

function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

document.getElementById('addForm').addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const desc = document.getElementById('desc').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  if(!desc || !amount || !date) return;
  expenses.push({ id: Date.now(), desc, amount, date, category });
  saveData();
  ev.target.reset();
  document.getElementById('date').valueAsDate = new Date();
  render();
});

filterCat.addEventListener('change', render);
document.getElementById('sortBy').addEventListener('change', render);

loadData();
render();
