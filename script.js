let state = {
  answers: {},
  questions: [],
  current: 0,
  blend: null,
  pkgKey: null
};

function $(id){return document.getElementById(id)}
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo(0,0);
}

function startQuiz(){
  state.answers = JSON.parse(localStorage.getItem('quiz_answers')||'{}');
  state.current = 0;
  state.questions = [];
  state.blend = null;
  localStorage.removeItem('quiz_answers');
  buildQuestionFlow();
  showScreen('s-quiz');
  renderQuestion();
}

function buildQuestionFlow(){
  // أول 6 أسئلة ثابتة، بعدها 3 تفريعية
  state.questions = [
    QUESTION_BANK.first_impression[0],
    QUESTION_BANK.memory[0],
    QUESTION_BANK.energy[0],
    QUESTION_BANK.hidden[0],
    QUESTION_BANK.style[0],
    QUESTION_BANK.occasion[0]
  ];
  // الأسئلة 7-9 تتحدد بعد إجابات 1,2,3
  // بس نحنا هون لازم نبنيها بعد ما نجاوب. خليها فاضية وبنبنيها بالتدريج.
  state.questions = state.questions.slice(0,6);
}

function ensureQuestionAt(idx){
  // إذا بدنا نعرض سؤال رقم idx وما موجود، نبنيه
  while(state.questions.length <= idx){
    const next = state.questions.length;
    if(next === 6){
      // بعد الأسئلة الستة، اختر سؤال 7 حسب fi_1
      const fi1 = state.answers['fi_1']||'';
      state.questions.push((fi1.includes('حضوري')||fi1.includes('ريحتي')) 
        ? QUESTION_BANK.first_impression[4] 
        : QUESTION_BANK.first_impression[2]);
    } else if(next === 7){
      const mem1 = state.answers['mem_1']||'';
      state.questions.push((mem1.includes('بخور')||mem1.includes('ورد'))
        ? QUESTION_BANK.memory[3]
        : QUESTION_BANK.memory[5]);
    } else if(next === 8){
      const en1 = state.answers['en_1']||'';
      state.questions.push((en1.includes('نار')||en1.includes('تراب'))
        ? QUESTION_BANK.energy[5]
        : QUESTION_BANK.energy[3]);
    } else {
      // احتياط
      state.questions.push(QUESTION_BANK.style[1]);
    }
  }
}

function renderQuestion(){
  ensureQuestionAt(state.current);
  const q = state.questions[state.current];
  const total = 9;
  $('q-num').textContent = state.current + 1;
  $('q-pct').textContent = Math.round(((state.current)/total)*100) + '%';
  $('q-fill').style.width = ((state.current)/total*100) + '%';
  $('q-text').textContent = q.text;
  const choices = $('q-choices');
  choices.innerHTML = '';
  q.choices.forEach(c=>{
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = c;
    if(state.answers[q.id] === c) btn.classList.add('selected');
    btn.onclick = () => {
      state.answers[q.id] = c;
      localStorage.setItem('quiz_answers', JSON.stringify(state.answers));
      document.querySelectorAll('.choice').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      setTimeout(()=>{
        state.current++;
        if(state.current < 9){
          ensureQuestionAt(state.current);
          renderQuestion();
        } else {
          finishQuiz();
        }
      }, 300);
    };
    choices.appendChild(btn);
  });
}

function finishQuiz(){
  const ordered = calculateBlend(state.answers);
  const primary = ordered[0];
  state.blend = BLENDS[primary];
  $('q-fill').style.width = '100%';
  $('q-pct').textContent = '100%';
  // Result
  $('r-name').textContent = state.blend.name;
  $('r-notes').innerHTML = state.blend.notes.map(n=>`<span class="chip">${n}</span>`).join('');
  $('r-message').textContent = state.blend.message;
  showScreen('s-result');
}

function goToPackages(){
  const list = $('pkg-list');
  list.innerHTML = '';
  const order = ['special','signature','basic'];
  order.forEach(k=>{
    const p = CONFIG.packages[k];
    const div = document.createElement('div');
    div.className = 'pkg' + (k==='signature'?' recommended':'');
    div.innerHTML = `
      <div class="pkg-name">${p.name}</div>
      <div class="pkg-size">${p.size} ml</div>
      <div class="pkg-price">${p.price}</div>
    `;
    div.onclick = () => {
      document.querySelectorAll('.pkg').forEach(x=>x.classList.remove('selected'));
      div.classList.add('selected');
      state.pkgKey = k;
      $('btn-next-pkg').disabled = false;
    };
    list.appendChild(div);
  });
  showScreen('s-packages');
}

function goToForm(){
  if(!state.pkgKey) return;
  showScreen('s-form');
}

function submitOrder(){
  const name = $('f-name').value.trim();
  const phone = $('f-phone').value.trim();
  const address = $('f-address').value.trim();
  const gender = $('f-gender').value;
  if(!name || !phone || !address){
    alert('الرجاء تعبئة كل الحقول');
    return;
  }
  const pkg = CONFIG.packages[state.pkgKey];
  const code = `${state.blend.key}-${pkg.size}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  const msg = buildWhatsAppMessage({
    name, phone, address, gender,
    blendName: state.blend.name,
    notes: state.blend.notes.join(' + '),
    packageName: pkg.name,
    size: pkg.size,
    price: pkg.price,
    code: code
  });
  const url = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(msg)}`;
  window.location.href = url;
  setTimeout(()=>{
    localStorage.removeItem('quiz_answers');
    showScreen('s-thanks');
  }, 1200);
}
