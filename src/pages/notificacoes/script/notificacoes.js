/**
 * GuiaCidadão – Tela de Notificações
 */
(function () {
  'use strict';

  const store = window.NotificationsStore;
  if (!store) return;

  const ICONS = {
    agendamentos: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>`,
    beneficios: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75c0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3H10v2.16C8.06 5.58 6.5 6.84 6.5 8.77c0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-3-2.1H6.3c.14 2.19 1.78 3.42 3.7 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>`,
    avisos: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
  };

  const CATEGORY_LABELS = {
    agendamentos: 'Agendamento',
    beneficios: 'Benefício',
    avisos: 'Aviso',
  };

  let notifications = [];
  let currentFilter = 'all';
  let pollTimer = null;
  let loadFailed = false;

  const els = {
    list: document.getElementById('notifList'),
    loading: document.getElementById('notifLoading'),
    error: document.getElementById('notifError'),
    empty: document.getElementById('emptyState'),
    unreadLabel: document.getElementById('unreadLabel'),
    unreadNum: document.getElementById('unreadNum'),
    markAllBtn: document.getElementById('markAllBtn'),
    retryBtn: document.getElementById('retryBtn'),
    filterPills: document.querySelectorAll('.filter-pill'),
    toast: document.getElementById('toast'),
    modal: document.getElementById('notifModal'),
    modalBackdrop: document.getElementById('notifModalBackdrop'),
    modalClose: document.getElementById('notifModalClose'),
    modalCategory: document.getElementById('notifModalCategory'),
    modalTitle: document.getElementById('notifModalTitle'),
    modalDesc: document.getElementById('notifModalDesc'),
    modalTime: document.getElementById('notifModalTime'),
    modalAction: document.getElementById('notifModalAction'),
  };

  function showToast(message, duration = 2500) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add('show');
    setTimeout(() => els.toast.classList.remove('show'), duration);
  }

  function setLoading(isLoading) {
    els.loading?.classList.toggle('is-visible', isLoading);
    if (isLoading) {
      els.list.hidden = true;
      els.error.hidden = true;
      els.empty.classList.remove('visible');
    }
  }

  function setError(hasError) {
    loadFailed = hasError;
    els.error.hidden = !hasError;
    if (hasError) {
      els.list.hidden = true;
      els.empty.classList.remove('visible');
    }
  }

  function loadNotifications() {
    setLoading(true);
    setError(false);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        try {
          notifications = store.getAll();
          setLoading(false);
          resolve(notifications);
        } catch (_) {
          setLoading(false);
          setError(true);
          resolve([]);
        }
      }, 350);
    });
  }

  function getFilteredNotifications() {
    if (currentFilter === 'all') return notifications;
    return notifications.filter((item) => item.category === currentFilter);
  }

  function updateUnreadUI() {
    const unread = notifications.filter((n) => !n.read).length;
    if (els.unreadNum) els.unreadNum.textContent = String(unread);
    if (els.unreadLabel) els.unreadLabel.style.display = unread > 0 ? 'block' : 'none';
    if (els.markAllBtn) els.markAllBtn.disabled = unread === 0;
  }

  function updateEmptyState(visibleCount) {
    const showEmpty = !loadFailed && visibleCount === 0;
    els.empty.classList.toggle('visible', showEmpty);
    els.list.hidden = showEmpty || loadFailed;
  }

  function renderList() {
    const filtered = getFilteredNotifications();
    els.list.innerHTML = '';

    filtered.forEach((item) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `notif-card${item.read ? '' : ' unread'}`;
      card.dataset.id = item.id;
      card.dataset.category = item.category;
      card.setAttribute('aria-label', `${item.read ? '' : 'Não lida: '}${item.title}`);

      card.innerHTML = `
        <div class="notif-inner">
          <div class="notif-icon ${item.category === 'beneficios' ? 'benefit' : item.category === 'avisos' ? 'alert' : 'schedule'}">
            ${ICONS[item.category] || ICONS.avisos}
          </div>
          <div class="notif-body">
            <div class="notif-row">
              <span class="notif-title">${escapeHtml(item.title)}</span>
              ${item.read ? '' : '<span class="notif-dot" aria-hidden="true"></span>'}
            </div>
            <p class="notif-desc">${escapeHtml(item.description)}</p>
            <span class="notif-time">${escapeHtml(item.timeLabel)}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => handleNotificationClick(item.id));
      els.list.appendChild(card);
    });

    updateUnreadUI();
    updateEmptyState(filtered.length);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function handleNotificationClick(id) {
    const item = notifications.find((n) => n.id === id);
    if (!item) return;

    if (!item.read) {
      store.markAsRead(id);
      item.read = true;
      renderList();
    }

    if (item.destination) {
      window.location.href = item.destination;
      return;
    }

    openModal(item);
  }

  function openModal(item) {
    els.modalCategory.textContent = CATEGORY_LABELS[item.category] || 'Notificação';
    els.modalTitle.textContent = item.title;
    els.modalDesc.textContent = item.description;
    els.modalTime.textContent = item.timeLabel;

    if (item.destination) {
      els.modalAction.hidden = false;
      els.modalAction.onclick = () => {
        window.location.href = item.destination;
      };
    } else {
      els.modalAction.hidden = true;
      els.modalAction.onclick = null;
    }

    els.modal.hidden = false;
    els.modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    els.modal.hidden = true;
    els.modal.setAttribute('aria-hidden', 'true');
  }

  function applyFilter(filter) {
    currentFilter = filter;
    els.filterPills.forEach((pill) => {
      const isActive = pill.dataset.filter === filter;
      pill.classList.toggle('active', isActive);
      pill.setAttribute('aria-pressed', String(isActive));
    });
    renderList();
  }

  function markAllAsRead() {
    const unread = notifications.filter((n) => !n.read).length;
    if (unread === 0) return;
    store.markAllAsRead();
    notifications = store.getAll();
    renderList();
    showToast('Todas as notificações foram marcadas como lidas.');
  }

  function refreshFromStore() {
    notifications = store.getAll();
    renderList();
  }

  function startPolling() {
    store.subscribe(refreshFromStore);
    pollTimer = window.setInterval(refreshFromStore, 15000);
  }

  function bindEvents() {
    els.filterPills.forEach((pill) => {
      pill.addEventListener('click', () => applyFilter(pill.dataset.filter || 'all'));
    });

    els.markAllBtn?.addEventListener('click', markAllAsRead);
    els.retryBtn?.addEventListener('click', () => {
      loadNotifications().then(renderList);
    });

    els.modalClose?.addEventListener('click', closeModal);
    els.modalBackdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !els.modal.hidden) closeModal();
    });
  }

  async function init() {
    bindEvents();
    await loadNotifications();
    renderList();
    startPolling();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
