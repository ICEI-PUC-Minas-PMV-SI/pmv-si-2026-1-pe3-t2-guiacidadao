/**
 * GuiaCidadão – Camada de armazenamento e API de notificações (localStorage).
 * Usada pela tela de notificações e por fluxos que geram alertas (ex.: agendamento).
 */
(function () {
  'use strict';

  const STORAGE_PREFIX = 'gc_notifications_';
  const CHANGE_EVENT = 'gc-notifications-changed';

  const DEFAULT_DESTINATIONS = {
    agendamentos: '/src/pages/agendamento/meus_agendamentos.html',
    beneficios: '/src/pages/home/home.html',
    avisos: null,
  };

  function getLoggedUser() {
    for (const key of ['usuarioLogado', 'gc_user']) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const user = JSON.parse(raw);
        if (user && (user.id || user.cpf || user.email || user.nome)) return user;
      } catch (_) {
        /* ignore invalid JSON */
      }
    }
    return null;
  }

  function getUserStorageKey() {
    const user = getLoggedUser();
    if (!user) return `${STORAGE_PREFIX}guest`;
    const id = user.id || user.cpf || user.email || user.nome;
    return `${STORAGE_PREFIX}${String(id).replace(/\s+/g, '_')}`;
  }

  function seedNotifications() {
    const now = Date.now();
    return [
      {
        id: 'n1',
        category: 'agendamentos',
        title: 'Agendamento Confirmado',
        description:
          'Seu atendimento no CRAS Centro foi confirmado para 28/05 às 14h00. Lembre-se de levar seus documentos.',
        timeLabel: 'Hoje, 10:30',
        createdAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        destination: DEFAULT_DESTINATIONS.agendamentos,
      },
      {
        id: 'n2',
        category: 'beneficios',
        title: 'Benefício Aprovado',
        description:
          'Sua solicitação do Auxílio Cidadão foi aprovada. O valor de R$ 412,00 será depositado na próxima sexta-feira.',
        timeLabel: 'Hoje, 08:15',
        createdAt: new Date(now - 4 * 60 * 60 * 1000).toISOString(),
        read: false,
        destination: '/src/pages/benefits/bolsafamila.html',
      },
      {
        id: 'n3',
        category: 'avisos',
        title: 'Manutenção Programada',
        description:
          'O sistema ficará indisponível em 26/05 das 01h às 04h para manutenção. Planeje seus acessos com antecedência.',
        timeLabel: 'Ontem, 16:00',
        createdAt: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        destination: null,
      },
      {
        id: 'n4',
        category: 'agendamentos',
        title: 'Lembrete de Agendamento',
        description:
          'Você tem um atendimento amanhã às 09h30 no Posto de Saúde da Família – Unidade Leste.',
        timeLabel: 'Ontem, 09:00',
        createdAt: new Date(now - 30 * 60 * 60 * 1000).toISOString(),
        read: true,
        destination: DEFAULT_DESTINATIONS.agendamentos,
      },
      {
        id: 'n5',
        category: 'beneficios',
        title: 'Documentação Pendente',
        description:
          'Sua solicitação do Bolsa Família aguarda o envio do comprovante de renda. Acesse Meus Documentos para anexar.',
        timeLabel: '23 mai, 14:20',
        createdAt: new Date(now - 48 * 60 * 60 * 1000).toISOString(),
        read: true,
        destination: '/src/pages/home/home.html',
      },
    ];
  }

  function readAll() {
    const key = getUserStorageKey();
    const raw = localStorage.getItem(key);
    if (!raw) {
      const seeded = seedNotifications();
      localStorage.setItem(key, JSON.stringify(seeded));
      return seeded;
    }
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : seedNotifications();
    } catch (_) {
      return seedNotifications();
    }
  }

  function writeAll(items) {
    const key = getUserStorageKey();
    localStorage.setItem(key, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { count: items.length } }));
  }

  function formatTimeLabel(dateIso) {
    const date = new Date(dateIso);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Agora';
    if (diffHours < 24 && date.getDate() === now.getDate()) {
      return `Hoje, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth()) {
      return `Ontem, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  const NotificationsStore = {
    CHANGE_EVENT,

    getLoggedUser,

    getAll() {
      return readAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    getUnreadCount() {
      return readAll().filter((n) => !n.read).length;
    },

    add(notification) {
      const items = readAll();
      const entry = {
        id: notification.id || `n-${Date.now()}`,
        category: notification.category || 'avisos',
        title: notification.title || 'Nova notificação',
        description: notification.description || '',
        timeLabel: notification.timeLabel || formatTimeLabel(new Date().toISOString()),
        createdAt: notification.createdAt || new Date().toISOString(),
        read: false,
        destination:
          notification.destination !== undefined
            ? notification.destination
            : DEFAULT_DESTINATIONS[notification.category] ?? null,
      };
      items.unshift(entry);
      writeAll(items);
      return entry;
    },

    markAsRead(id) {
      const items = readAll();
      const target = items.find((n) => n.id === id);
      if (!target || target.read) return target;
      target.read = true;
      writeAll(items);
      return target;
    },

    markAllAsRead() {
      const items = readAll().map((n) => ({ ...n, read: true }));
      writeAll(items);
      return items;
    },

    subscribe(callback) {
      const handler = () => callback(NotificationsStore.getAll());
      window.addEventListener(CHANGE_EVENT, handler);
      window.addEventListener('storage', (event) => {
        if (event.key === getUserStorageKey()) handler();
      });
      return () => window.removeEventListener(CHANGE_EVENT, handler);
    },

    addFromAgendamento(agendamento) {
      return NotificationsStore.add({
        category: 'agendamentos',
        title: 'Agendamento Confirmado',
        description: `Seu atendimento de ${agendamento.servico} foi confirmado para ${agendamento.data} às ${agendamento.horario} em ${agendamento.unidade}. Protocolo: ${agendamento.protocolo}.`,
        destination: '/src/pages/agendamento/meus_agendamentos.html',
      });
    },
  };

  window.NotificationsStore = NotificationsStore;
})();
