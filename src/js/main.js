// ===== GuiaCidadão - Main Application JS =====

// ---- Mock Data ----
const MOCK_USER = { nome: 'João Silva', cpf: '123.456.789-00' };

const BENEFICIOS = [
  { id: 'bpc',      nome: 'BPC',          emoji: '👴', descricao: 'Auxílio mensal para idosos (+65) e pessoas com deficiência de baixa renda.',  cor: 'card-blue'   },
  { id: 'auxgás',   nome: 'Auxílio Gás',  emoji: '🫙', descricao: 'Valor bimestral para compra de gás de cozinha (13kg).',                        cor: 'card-orange' },
  { id: 'cadunico', nome: 'CadÚnico',     emoji: '📋', descricao: 'Porta de entrada para programas sociais, federais e estaduais.',                cor: 'card-green'  },
  { id: 'bolsa',    nome: 'Bolsa Família', emoji: '👨‍👩‍👧', descricao: 'Programa de transferência de renda para famílias em vulnerabilidade social.', cor: 'card-pink'   },
  { id: 'seguro',   nome: 'Seguro Desemp.',emoji: '💼', descricao: 'Assistência financeira temporária para trabalhadores desempregados.',            cor: 'card-yellow' },
  { id: 'energia',  nome: 'Tarifa Social', emoji: '⚡', descricao: 'Desconto na conta de energia para famílias de baixa renda.',                   cor: 'card-purple' },
];

const UNIDADES = [
  { id: 'rj-centro',     nome: 'CRAS Rio de Janeiro - Centro',    endereco: 'Rua da Alfândega, 6 - Centro',         telefone: '(21) 3350-0000', dist: '1.2 km' },
  { id: 'rj-tijuca',     nome: 'CRAS Tijuca',                     endereco: 'Rua Conde de Bonfim, 470 - Tijuca',    telefone: '(21) 3350-0001', dist: '3.5 km' },
  { id: 'rj-botafogo',   nome: 'CRAS Botafogo',                   endereco: 'Rua Voluntários da Pátria, 190',       telefone: '(21) 3350-0002', dist: '4.1 km' },
  { id: 'rj-meier',      nome: 'CRAS Méier',                      endereco: 'Rua Dias da Cruz, 200 - Méier',        telefone: '(21) 3350-0003', dist: '6.8 km' },
  { id: 'rj-bangu',      nome: 'CRAS Bangu',                      endereco: 'Estrada do Mendanha, 555 - Bangu',     telefone: '(21) 3350-0004', dist: '18.2 km'},
];

// ---- App State ----
const state = {
  currentScreen: 'login',
  user: null,
  agendamento: {
    nome: '', cpf: '', servico: '', unidade: '', data: '', horario: ''
  },
  sidebarOpen: false
};

// ---- Navigation ----
function navigate(screenId, direction = 'right') {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(screenId);
  if (!next || current === next) return;

  if (current) {
    current.classList.remove('active');
    current.classList.add(direction === 'right' ? 'slide-out' : '');
    setTimeout(() => current.classList.remove('slide-out'), 300);
  }

  next.classList.add('active');
  next.classList.add(direction === 'right' ? 'slide-in' : 'slide-in-left');
  setTimeout(() => {
    next.classList.remove('slide-in', 'slide-in-left');
  }, 300);

  state.currentScreen = screenId;
  closeSidebar();
}

// ---- Toast ----
function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ---- Sidebar ----
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('active');
  state.sidebarOpen = true;
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
  state.sidebarOpen = false;
}

// ---- Auth ----
function handleLogin() {
  const id = document.getElementById('login-id').value.trim();
  const pw = document.getElementById('login-pw').value.trim();
  if (!id || !pw) { showToast('Preencha todos os campos'); return; }
  state.user = { ...MOCK_USER };
  const savedUser = localStorage.getItem('gc_user');
  if (savedUser) {
    try { const u = JSON.parse(savedUser); state.user = u; } catch(e) {}
  }
  document.getElementById('sidebar-username').textContent = state.user.nome;
  navigate('home');
  showToast('Bem-vindo(a), ' + state.user.nome.split(' ')[0] + '! 👋');
}

function handleCadastro() {
  const nome = document.getElementById('cad-nome').value.trim();
  const cpf  = document.getElementById('cad-cpf').value.trim();
  const dob  = document.getElementById('cad-dob').value.trim();
  const email= document.getElementById('cad-email').value.trim();
  const pw   = document.getElementById('cad-pw').value;
  const pw2  = document.getElementById('cad-pw2').value;
  const terms= document.getElementById('cad-terms').checked;

  if (!nome || !cpf || !dob || !email || !pw || !pw2) { showToast('Preencha todos os campos'); return; }
  if (pw !== pw2) { showToast('As senhas não coincidem'); return; }
  if (!terms)     { showToast('Aceite os termos de uso'); return; }

  const newUser = { nome, cpf, email };
  localStorage.setItem('gc_user', JSON.stringify(newUser));
  state.user = newUser;
  document.getElementById('sidebar-username').textContent = nome;
  navigate('home');
  showToast('Conta criada com sucesso! 🎉');
}

function handleRecuperar() {
  const id = document.getElementById('rec-id').value.trim();
  if (!id) { showToast('Informe seu CPF ou e-mail'); return; }
  showToast('Código enviado com sucesso! ✉️');
  setTimeout(() => navigate('login', 'left'), 1500);
}

// ---- Agendamento ----
function loadAgendamentoScreen() {
  // Pre-fill user data
  if (state.user) {
    const nomeEl = document.getElementById('ag-nome');
    const cpfEl  = document.getElementById('ag-cpf');
    if (nomeEl) nomeEl.value = state.user.nome;
    if (cpfEl)  cpfEl.value  = state.user.cpf || '';
  }
  renderCalendar();
}

let selectedDate = null;
let selectedTime = null;
let calYear  = new Date().getFullYear();
let calMonth = new Date().getMonth();

const MONTH_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const DAY_NAMES   = ['Do','Se','Te','Qu','Qu','Se','Sá','Do'];

function renderCalendar() {
  const grid = document.getElementById('cal-grid');
  const header = document.getElementById('cal-month-label');
  if (!grid || !header) return;

  header.textContent = `${MONTH_NAMES[calMonth]} - ${calYear}`;
  grid.innerHTML = '';

  // Day names
  const dayNames = ['Do','Se','Te','Qu','Qu','Se','Sá'];
  // Corrected: week starts Sunday
  const headerDays = ['Do','Se','Te','Qu','Qu','Se','Sá'];
  
  headerDays.forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-day-name';
    el.textContent = d;
    grid.appendChild(el);
  });

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date(); today.setHours(0,0,0,0);

  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day cal-empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    const date = new Date(calYear, calMonth, d);
    const isPast = date < today;
    const isToday = date.getTime() === today.getTime();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const dateStr = `${d.toString().padStart(2,'0')}/${(calMonth+1).toString().padStart(2,'0')}/${calYear}`;

    el.className = 'cal-day';
    if (isToday) el.classList.add('cal-today');
    else if (isPast) el.classList.add('cal-past', 'cal-disabled');
    else if (isWeekend) el.classList.add('cal-weekend');

    if (selectedDate === dateStr) el.classList.add('cal-selected');
    el.textContent = d;

    if (!isPast) {
      el.addEventListener('click', () => {
        selectedDate = dateStr;
        renderCalendar();
      });
    }

    grid.appendChild(el);
  }
}

function prevMonth() {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

function nextMonth() {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
}

function selectTime(el) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  selectedTime = el.dataset.time;
}

function handleAgendarSubmit() {
  const nome    = document.getElementById('ag-nome').value.trim();
  const cpf     = document.getElementById('ag-cpf').value.trim();
  const servico = document.getElementById('ag-servico').value;
  const unidade = document.getElementById('ag-unidade').value;

  if (!nome || !cpf)     { showToast('Preencha nome e CPF'); return; }
  if (!servico)          { showToast('Selecione o serviço/benefício'); return; }
  if (!unidade)          { showToast('Selecione a unidade de atendimento'); return; }
  if (!selectedDate)     { showToast('Selecione uma data'); return; }
  if (!selectedTime)     { showToast('Selecione um horário'); return; }

  const unidadeNome = UNIDADES.find(u => u.id === unidade)?.nome || unidade;
  const servicoNome = BENEFICIOS.find(b => b.id === servico)?.nome || servico;

  state.agendamento = {
    nome, cpf,
    servico: servicoNome,
    unidade: unidadeNome,
    data: formatDateBR(selectedDate),
    horario: selectedTime
  };

  // Fill confirm screen
  document.getElementById('conf-nome').textContent    = nome;
  document.getElementById('conf-cpf').textContent     = cpf;
  document.getElementById('conf-servico').textContent = servicoNome;
  document.getElementById('conf-unidade').textContent = unidadeNome;
  document.getElementById('conf-data').textContent    = formatDateBR(selectedDate);
  document.getElementById('conf-horario').textContent = selectedTime;

  navigate('confirmar-agendamento');
}

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const [d, m, y] = dateStr.split('/');
  const date = new Date(+y, +m - 1, +d);
  const days  = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
  const months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  return `${days[date.getDay()]}, ${d} de ${months[date.getMonth()]} de ${y}`;
}

function handleConfirmarAgendamento() {
  const ag = state.agendamento;
  const confirmData = {
    ...ag,
    protocolo: 'GC-' + Math.floor(Math.random() * 900000 + 100000),
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('gc_last_agendamento', JSON.stringify(confirmData));
  if (window.NotificationsStore) {
    window.NotificationsStore.addFromAgendamento(confirmData);
  }
  navigate('sucesso-agendamento');
}

// ---- Unidades ----
function renderUnidades() {
  const list = document.getElementById('unidades-list');
  if (!list) return;
  list.innerHTML = '';
  UNIDADES.forEach(u => {
    const card = document.createElement('div');
    card.className = 'unit-card';
    card.innerHTML = `
      <div class="unit-card-name">${u.nome}</div>
      <div class="unit-card-info">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        ${u.endereco}
      </div>
      <div class="unit-card-info">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${u.telefone}
      </div>
      <span class="unit-card-distance">
        <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${u.dist} de você
      </span>
    `;
    card.addEventListener('click', () => {
      showToast(`${u.nome} selecionada`);
      setTimeout(() => navigate('agendamento'), 800);
    });
    list.appendChild(card);
  });
}

// ---- Home benefits grid ----
function renderBenefits() {
  const grid = document.getElementById('benefits-grid');
  if (!grid) return;
  grid.innerHTML = '';
  BENEFICIOS.forEach(b => {
    const card = document.createElement('div');
    card.className = `benefit-card ${b.cor}`;
    card.innerHTML = `
      <span class="benefit-card-emoji">${b.emoji}</span>
      <h3>${b.nome}</h3>
      <p>${b.descricao}</p>
      <span class="saiba-mais">Saiba mais &gt;</span>
    `;
    card.addEventListener('click', () => {
      showToast(`${b.nome} — Em breve!`);
    });
    grid.appendChild(card);
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderBenefits();
  renderUnidades();

  // Overlay click closes sidebar
  document.getElementById('overlay').addEventListener('click', closeSidebar);

  // Login form
  document.getElementById('btn-login')?.addEventListener('click', handleLogin);
  document.getElementById('login-id')?.addEventListener('keydown', e => e.key === 'Enter' && document.getElementById('login-pw')?.focus());
  document.getElementById('login-pw')?.addEventListener('keydown', e => e.key === 'Enter' && handleLogin());

  // Cadastro
  document.getElementById('btn-cadastrar')?.addEventListener('click', handleCadastro);

  // Recuperar senha
  document.getElementById('btn-enviar-codigo')?.addEventListener('click', handleRecuperar);

  // Agendamento
  document.getElementById('btn-agendar-submit')?.addEventListener('click', handleAgendarSubmit);
  document.getElementById('btn-cal-prev')?.addEventListener('click', prevMonth);
  document.getElementById('btn-cal-next')?.addEventListener('click', nextMonth);

  // Confirmar agendamento
  document.getElementById('btn-confirmar-ag')?.addEventListener('click', handleConfirmarAgendamento);
  document.getElementById('btn-cancelar-ag')?.addEventListener('click', () => navigate('home', 'left'));
  document.getElementById('btn-editar-ag')?.addEventListener('click',   () => navigate('agendamento', 'left'));

  // Time slots
  document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function() { selectTime(this); });
  });

  // Sidebar nav
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.nav;
      if (target === 'agendamento') loadAgendamentoScreen();
      navigate(target);
    });
  });

  document.querySelectorAll('[data-back]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.back, 'left'));
  });

  // Hamburger / menu
  document.getElementById('btn-menu')?.addEventListener('click', openSidebar);
  document.getElementById('btn-sidebar-close')?.addEventListener('click', closeSidebar);

  // Sidebar logout
  document.getElementById('btn-sair')?.addEventListener('click', () => {
    closeSidebar();
    state.user = null;
    navigate('login', 'left');
    showToast('Sessão encerrada');
  });

  // Home agendamento shortcut
  document.getElementById('btn-home-agendar')?.addEventListener('click', () => {
    loadAgendamentoScreen();
    navigate('agendamento');
  });

  // Sucesso voltar
  document.getElementById('btn-sucesso-home')?.addEventListener('click', () => navigate('home', 'left'));

  // Profile icon in home
  document.getElementById('btn-profile')?.addEventListener('click', openSidebar);
});
