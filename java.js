  const daysContainer = document.getElementById('days');
  const selectedDate = document.getElementById('selected-date');
  const eventList = document.getElementById('event-list');
  const addBtn = document.getElementById('add-btn');

  const events = {
    1: [
      { titulo: 'Hino Nacional', cor: 'azul', convidados: ['rosangela@escola.pr.gov.br'], detalhes: 'Cerimônia na escola às 8h.' },
      { titulo: 'Reunião de Professores', cor: 'verde', convidados: ['silvia@escola.pr.gov.br'], detalhes: 'Sala dos professores, 14h.' }
    ],
    13: [
      { titulo: 'Reunião', cor: 'verde', convidados: [], detalhes: 'Discussão de projetos.' },
      { titulo: 'Ensaio', cor: 'azul', convidados: [], detalhes: 'Preparação para evento.' },
      { titulo: 'Treino', cor: 'roxo', convidados: [], detalhes: 'Ginásio da escola.' }
    ]
  };

  for (let i = 1; i <= 31; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.innerHTML = `<div>${i}</div><div class="event-dots" id="dots-${i}"></div>`;
    day.addEventListener('click', () => selectDay(i));
    daysContainer.appendChild(day);
  }

  let selectedDay = null;

  function selectDay(day) {
    document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
    const dayElem = [...document.querySelectorAll('.day')].find(d => d.textContent.includes(day));
    dayElem.classList.add('selected');
    selectedDay = day;
    selectedDate.textContent = `Dia ${day}/10/2025`;
    renderEvents();
  }

  function renderEvents() {
    eventList.innerHTML = '';
    if (!selectedDay) return;

    const dayEvents = events[selectedDay] || [];
    if (dayEvents.length === 0) {
      eventList.innerHTML = '<p>Nenhum evento neste dia.</p>';
    } else {
      dayEvents.forEach(ev => {
        const div = document.createElement('div');
        div.classList.add('event', ev.cor);
        div.innerHTML = `<strong>${ev.titulo}</strong><br>
        <small>Convidados: ${ev.convidados.join(', ') || 'Nenhum'}</small><br>
        <em>${ev.detalhes}</em>`;
        eventList.appendChild(div);
      });
    }

    updateDots();
  }

  function updateDots() {
    document.querySelectorAll('.event-dots').forEach(dotArea => dotArea.innerHTML = '');
    Object.keys(events).forEach(day => {
      const dotArea = document.getElementById(`dots-${day}`);
      if (!dotArea) return;
      events[day].forEach(ev => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.backgroundColor = getColor(ev.cor);
        dotArea.appendChild(dot);
      });
    });
  }

  function getColor(nome) {
    const cores = {
      verde: '#4caf50',
      azul: '#2196f3',
      roxo: '#9c27b0',
      vermelho: '#f44336',
      laranja: '#ff9800'
    };
    return cores[nome] || '#999';
  }

  addBtn.addEventListener('click', () => {
    if (!selectedDay) {
      alert('Selecione um dia antes de adicionar um evento.');
      return;
    }

    const titulo = document.getElementById('titulo').value.trim();
    const cor = document.getElementById('cor').value;
    const convidados = document.getElementById('convidados').value.trim().split(',').map(c => c.trim()).filter(Boolean);
    const detalhes = document.getElementById('detalhes').value.trim();

    if (!titulo) return alert('Digite um título.');

    if (!events[selectedDay]) events[selectedDay] = [];
    events[selectedDay].push({ titulo, cor, convidados, detalhes });

    document.getElementById('titulo').value = '';
    document.getElementById('convidados').value = '';
    document.getElementById('detalhes').value = '';

    renderEvents();
  });

  updateDots();