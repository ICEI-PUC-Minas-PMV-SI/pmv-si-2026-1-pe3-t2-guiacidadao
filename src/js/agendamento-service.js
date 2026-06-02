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

  function getAppointmentDateTime(item) {
    const [d, m, y] = String(item?.dataBr || '').split('/');
    const [hh, mm] = String(item?.horario || '00:00').split(':');
    const date = new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), 0, 0);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function findByIdentifier(items, identifier) {
    return items.findIndex((item) => {
      return item.protocolo === identifier || item.id === identifier;
    });
  }

  function getByIdentifier(items, identifier) {
    return items.find((item) => item.protocolo === identifier || item.id === identifier) || null;
  }

  function syncUserContextFromAgendamento(agendamento) {
    if (!agendamento?.cpf) return;
    localStorage.setItem(
      'gc_user',
      JSON.stringify({
        nome: agendamento.nome || '',
        cpf: agendamento.cpf,
      })
    );
    migrateGuestAppointmentsIfNeeded();
  }

  function migrateGuestAppointmentsIfNeeded() {
    const userKey = getUserStorageKey();
    const guestKey = `${STORAGE_PREFIX}guest`;
    if (userKey === guestKey) return;

    const guestRaw = localStorage.getItem(guestKey);
    if (!guestRaw) return;

    try {
      const guestItems = JSON.parse(guestRaw);
      if (!Array.isArray(guestItems) || guestItems.length === 0) return;

      const userRaw = localStorage.getItem(userKey);
      let userItems = [];
      if (userRaw) {
        const parsed = JSON.parse(userRaw);
        userItems = Array.isArray(parsed) ? parsed : [];
      }

      const byProtocol = new Map();
      [...guestItems, ...userItems].forEach((item) => {
        if (item?.protocolo) byProtocol.set(item.protocolo, item);
      });

      localStorage.setItem(userKey, JSON.stringify(Array.from(byProtocol.values())));
      localStorage.removeItem(guestKey);
    } catch (_) {
      /* ignore invalid JSON */
    }
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
      syncUserContextFromAgendamento(draft);
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
        if (ignoreProtocol && (item.protocolo === ignoreProtocol || item.id === ignoreProtocol)) {
          return false;
        }
        return item.status !== 'cancelado' && item.unidadeId === unidade && item.dataBr === dataBr && item.horario === horario;
      });
    },

    async create(agendamentoInput) {
      if (!agendamentoInput?.unidadeId || !agendamentoInput?.dataBr || !agendamentoInput?.horario) {
        const err = new Error('Dados do agendamento incompletos.');
        err.code = 'INVALID_PAYLOAD';
        throw err;
      }

      syncUserContextFromAgendamento(agendamentoInput);

      const next = {
        ...agendamentoInput,
        id: agendamentoInput.id || agendamentoInput.protocolo || generateProtocol(),
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

    getById(identifier) {
      const items = readAll();
      return getByIdentifier(items, identifier);
    },

    getCancelValidation(agendamento) {
      if (!agendamento) {
        return { allowed: false, code: 'NOT_FOUND', message: 'Agendamento não encontrado.' };
      }

      if (agendamento.status !== 'confirmado') {
        return {
          allowed: false,
          code: 'INVALID_STATUS',
          message: 'Somente agendamentos confirmados podem ser cancelados.',
        };
      }

      const minMinutes = Number(agendamento.prazoMinimoCancelamentoMinutos || 0);
      if (minMinutes > 0) {
        const scheduleDate = getAppointmentDateTime(agendamento);
        if (scheduleDate) {
          const now = Date.now();
          const diffMinutes = Math.floor((scheduleDate.getTime() - now) / (1000 * 60));
          if (diffMinutes < minMinutes) {
            return {
              allowed: false,
              code: 'CANCELLATION_DEADLINE',
              message: `Cancelamento permitido somente com ${minMinutes} minutos de antecedência.`,
            };
          }
        }
      }

      return { allowed: true, code: null, message: '' };
    },

    getRescheduleValidation(agendamento) {
      if (!agendamento) {
        return { allowed: false, code: 'NOT_FOUND', message: 'Agendamento não encontrado.' };
      }

      if (agendamento.status !== 'confirmado') {
        return {
          allowed: false,
          code: 'INVALID_STATUS',
          message: 'Somente agendamentos confirmados podem ser reagendados.',
        };
      }

      const scheduleDate = getAppointmentDateTime(agendamento);
      if (scheduleDate && scheduleDate.getTime() <= Date.now()) {
        return {
          allowed: false,
          code: 'PAST_APPOINTMENT',
          message: 'Não é possível reagendar um atendimento já iniciado ou concluído.',
        };
      }

      const minMinutes = Number(agendamento.prazoMinimoReagendamentoMinutos || 0);
      if (minMinutes > 0 && scheduleDate) {
        const diffMinutes = Math.floor((scheduleDate.getTime() - Date.now()) / (1000 * 60));
        if (diffMinutes < minMinutes) {
          return {
            allowed: false,
            code: 'RESCHEDULE_DEADLINE',
            message: `Reagendamento permitido somente com ${minMinutes} minutos de antecedência.`,
          };
        }
      }

      return { allowed: true, code: null, message: '' };
    },

    async reschedule(identifier, updates) {
      const items = readAll();
      const idx = findByIdentifier(items, identifier);
      if (idx === -1) {
        const err = new Error('Agendamento não encontrado.');
        err.code = 'NOT_FOUND';
        throw err;
      }

      const current = items[idx];
      const validation = AgendamentoService.getRescheduleValidation(current);
      if (!validation.allowed) {
        const err = new Error(validation.message);
        err.code = validation.code;
        throw err;
      }

      const next = {
        ...current,
        ...updates,
        dataBr: updates.dataBr || current.dataBr,
        data: updates.data || current.data,
        horario: updates.horario || current.horario,
        unidadeId: updates.unidadeId || current.unidadeId,
        unidade: updates.unidade || current.unidade,
        profissional: updates.profissional || current.profissional || '',
        atualizadoEm: new Date().toISOString(),
      };

      if (!AgendamentoService.isSlotAvailable({
        unidade: next.unidadeId,
        dataBr: next.dataBr,
        horario: next.horario,
        ignoreProtocol: current.protocolo,
      })) {
        const err = new Error('Horário indisponível para a unidade selecionada.');
        err.code = 'SLOT_UNAVAILABLE';
        throw err;
      }

      items[idx] = next;
      writeAll(items);
      localStorage.setItem(LAST_CONFIRMED_KEY, JSON.stringify(next));
      return next;
    },

    async cancel(identifier) {
      const items = readAll();
      const idx = findByIdentifier(items, identifier);
      if (idx === -1) {
        const err = new Error('Agendamento não encontrado.');
        err.code = 'NOT_FOUND';
        throw err;
      }

      const validation = AgendamentoService.getCancelValidation(items[idx]);
      if (!validation.allowed) {
        const err = new Error(validation.message);
        err.code = validation.code;
        throw err;
      }

      items[idx] = { ...items[idx], status: 'cancelado' };
      writeAll(items);
      return items[idx];
    },
  };

  window.AgendamentoService = AgendamentoService;
})();
