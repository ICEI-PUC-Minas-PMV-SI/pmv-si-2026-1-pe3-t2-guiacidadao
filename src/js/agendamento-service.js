(function () {
  'use strict';

  const STORAGE_PREFIX = 'gc_agendamentos_';
  const DRAFT_KEY = 'gc_agendamento_draft';
  const LAST_CONFIRMED_KEY = 'gc_last_agendamento';
  const CHANGE_EVENT = 'gc-agendamentos-changed';

  function getLoggedUser() {
    if (window.NotificationsStore && typeof window.NotificationsStore.getLoggedUser === 'function') {
      return window.NotificationsStore.getLoggedUser();
    }

    for (const key of ['usuarioLogado', 'gc_user']) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.id || parsed.cpf || parsed.email || parsed.nome)) {
          return parsed;
        }
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

  function readAll() {
    const raw = localStorage.getItem(getUserStorageKey());
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function writeAll(items) {
    localStorage.setItem(getUserStorageKey(), JSON.stringify(items));
    window.dispatchEvent(
      new CustomEvent(CHANGE_EVENT, { detail: { total: items.length } })
    );
  }

  function generateProtocol() {
    return `GC-${Math.floor(Math.random() * 900000 + 100000)}`;
  }

  function toMillis(dateBr) {
    if (!dateBr) return 0;
    const [d, m, y] = dateBr.split('/');
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return date.getTime();
  }

  const AgendamentoService = {
    CHANGE_EVENT,
    DRAFT_KEY,
    LAST_CONFIRMED_KEY,

    getAll() {
      return readAll().sort((a, b) => {
        return toMillis(a.dataBr) - toMillis(b.dataBr) || a.horario.localeCompare(b.horario);
      });
    },

    getDraft() {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : null;
      } catch (_) {
        return null;
      }
    },

    saveDraft(draft) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    },

    clearDraft() {
      localStorage.removeItem(DRAFT_KEY);
    },

    getLastConfirmed() {
      const raw = localStorage.getItem(LAST_CONFIRMED_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch (_) {
        return null;
      }
    },

    isSlotAvailable({ unidade, dataBr, horario, ignoreProtocol }) {
      return !readAll().some((item) => {
        if (ignoreProtocol && item.protocolo === ignoreProtocol) return false;
        return item.status !== 'cancelado' && item.unidadeId === unidade && item.dataBr === dataBr && item.horario === horario;
      });
    },

    async create(agendamentoInput) {
      const next = {
        ...agendamentoInput,
        protocolo: agendamentoInput.protocolo || generateProtocol(),
        status: 'confirmado',
        criadoEm: new Date().toISOString(),
      };

      if (!AgendamentoService.isSlotAvailable({ unidade: next.unidadeId, dataBr: next.dataBr, horario: next.horario })) {
        const err = new Error('Horário indisponível para a unidade selecionada.');
        err.code = 'SLOT_UNAVAILABLE';
        throw err;
      }

      const items = readAll();
      items.unshift(next);
      writeAll(items);
      localStorage.setItem(LAST_CONFIRMED_KEY, JSON.stringify(next));
      return next;
    },

    async cancel(protocolo) {
      const items = readAll();
      const idx = items.findIndex((item) => item.protocolo === protocolo);
      if (idx === -1) return null;
      items[idx] = { ...items[idx], status: 'cancelado' };
      writeAll(items);
      return items[idx];
    },
  };

  window.AgendamentoService = AgendamentoService;
})();
