// Run code helper
function runCode(id, fn){
  const el=document.getElementById(id);
  el.textContent=fn();
  el.classList.add('show');
}

// Calculator
let cE='',cR='0';
function ci(v){
  if(v==='C'){cE='';cR='0';}
  else{
    const ops=['+','-','*','/'];
    if(ops.includes(v)&&ops.includes(cE.slice(-1)))cE=cE.slice(0,-1);
    cE+=v;
    try{cR=String(eval(cE));}catch(e){cR=cE;}
  }
  document.getElementById('cExpr').textContent=cE;
  document.getElementById('cVal').textContent=cR;
}
function cbk(){
  cE=cE.slice(0,-1);
  try{cR=cE?String(eval(cE)):'0';}catch(e){cR=cE||'0';}
  document.getElementById('cExpr').textContent=cE;
  document.getElementById('cVal').textContent=cR;
}
function ceq(){
  try{
    const r=eval(cE);
    document.getElementById('cExpr').textContent=cE+' =';
    cR=String(r);document.getElementById('cVal').textContent=cR;cE=cR;
  }catch(e){document.getElementById('cVal').textContent='Error';cE='';}
}

// Todo
let todos=[];
function addTodo(){
  const inp=document.getElementById('todoInp');
  const t=inp.value.trim();if(!t)return;
  todos.push({id:Date.now(),text:t,done:false});
  inp.value='';renderTodos();
}
function toggleTodo(id){todos=todos.map(t=>t.id===id?{...t,done:!t.done}:t);renderTodos();}
function delTodo(id){todos=todos.filter(t=>t.id!==id);renderTodos();}
function renderTodos(){
  document.getElementById('todoList').innerHTML=todos.map(t=>`
    <li class="t-item${t.done?' done':''}">
      <input type="checkbox"${t.done?' checked':''} onchange="toggleTodo(${t.id})">
      <span>${t.text}</span>
      <button class="t-del" onclick="delTodo(${t.id})">✕</button>
    </li>`).join('');
  document.getElementById('tCount').textContent=todos.length;
}

// Quiz
const questions=[
  {q:'What does "DOM" stand for?',opts:['Data Object Model','Document Object Model','Dynamic Object Method','Document Oriented Markup'],ans:1},
  {q:'Which keyword creates a constant in JS?',opts:['var','let','const','fix'],ans:2},
  {q:'What does typeof "hello" return?',opts:['"hello"','string','text','char'],ans:1},
  {q:'Which method adds an item to the end of an array?',opts:['push()','pop()','shift()','add()'],ans:0},
  {q:'What does === check in JavaScript?',opts:['Value only','Type only','Value and type','Length'],ans:2},
];
let qIdx=0,score=0,answered=false;
function renderQ(){
  const q=questions[qIdx];
  document.getElementById('quizQ').textContent=q.q;
  document.getElementById('quizOpts').innerHTML=q.opts.map((o,i)=>
    `<button class="quiz-opt" onclick="answerQ(${i})">${o}</button>`).join('');
  document.getElementById('quizProg').textContent=`Question ${qIdx+1} of ${questions.length}`;
  document.getElementById('quizMsg').textContent='';
  document.getElementById('nextBtn').style.display='none';
  answered=false;
}
function answerQ(i){
  if(answered)return;answered=true;
  const q=questions[qIdx];
  const opts=document.querySelectorAll('.quiz-opt');
  opts[i].classList.add(i===q.ans?'correct':'wrong');
  if(i===q.ans){score++;document.getElementById('quizMsg').textContent='✓ Correct!';}
  else{opts[q.ans].classList.add('correct');document.getElementById('quizMsg').textContent='✗ Incorrect.';}
  document.getElementById('quizScore').textContent=`Score: ${score}`;
  document.getElementById('nextBtn').style.display='inline-flex';
  document.getElementById('nextBtn').textContent=qIdx<questions.length-1?'Next →':'Results';
}
function nextQ(){
  qIdx++;
  if(qIdx>=questions.length){
    document.getElementById('quizQ').textContent=`Quiz complete! You scored ${score}/${questions.length}`;
    document.getElementById('quizOpts').innerHTML='';
    document.getElementById('quizMsg').textContent=score>=4?'🎉 Excellent!':score>=3?'👍 Good job!':'📖 Keep studying!';
    document.getElementById('nextBtn').textContent='Restart';
    document.getElementById('nextBtn').onclick=()=>{qIdx=0;score=0;renderQ();};
    return;
  }
  renderQ();
}
renderQ();
