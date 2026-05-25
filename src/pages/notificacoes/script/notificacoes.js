/**
 * GuiaCidadão – Notificações
 * Arquivo: notificacoes.js
 *
 * Responsabilidades:
 *   1. Filtros por categoria (pílulas)
 *   2. Marcar notificação individual como lida (clique no card)
 *   3. Marcar todas como lidas
 *   4. Atualizar contador de não lidas e badge da bottom nav
 *   5. Exibir estado vazio quando não há resultados no filtro
 *   6. Menu lateral (hambúrguer)
 *   7. Toast de feedback
 */

(function () {
  'use strict';

  /* ── Referências DOM ──────────────────────────────────── */
  const filterPills       = document.querySelectorAll('.filter-pill');
  const notificationList  = document.getElementById('notificationList');
  const allCards          = notificationList ? [...notificationList.querySelectorAll('.notification-card')] : [];
  const markAllBtn        = document.getElementById('markAllBtn');
  const unreadCountEl     = document.getElementById('unreadCount');
  const unreadNumberEl    = document.getElementById('unreadNumber');
  const emptyState        = document.getElementById('emptyState');
  const bottomBadge       = document.querySelector('.bottom-nav__badge');
  const menuBtn           = document.querySelector('.header__menu-btn');
  const menuOverlay       = document.querySelector('.menu-overlay');
  const menuClose         = document.querySelector('.side-menu__close');

  /* ── Estado ───────────────────────────────────────────── */
  let currentFilter = 'all';

  /* ── 1. FILTROS ───────────────────────────────────────── */
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Atualiza estado visual dos botões
      filterPills.forEach(p => {
        p.classList.remove('filter-pill--active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('filter-pill--active');
      pill.setAttribute('aria-pressed', 'true');

      currentFilter = pill.dataset.filter;
      applyFilter(currentFilter);
    });
  });

  function applyFilter(filter) {
    let anyVisible = false;

    allCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !match);
      if (match) anyVisible = true;
    });

    // Alterna estado vazio
    if (emptyState) {
      emptyState.classList.toggle('is-visible', !anyVisible);
    }
    if (notificationList) {
      notificationList.classList.toggle('is-hidden', !anyVisible);
    }
  }

  /* ── 2. MARCAR CARD INDIVIDUAL COMO LIDO ─────────────── */
  if (notificationList) {
    notificationList.addEventListener('click', (e) => {
      const btn = e.target.closest('.notification-card__inner');
      if (!btn) return;

      const card = btn.closest('.notification-card');
      if (card && card.classList.contains('notification-card--unread')) {
        markCardAsRead(card);
        updateUnreadUI();
      }
    });
  }

  function markCardAsRead(card) {
    card.classList.remove('notification-card--unread');
    const dot = card.querySelector('.notification-card__unread-dot');
    if (dot) dot.remove();
  }

  /* ── 3. MARCAR TODAS COMO LIDAS ──────────────────────── */
  if (markAllBtn) {
    markAllBtn.addEventListener('click', () => {
      const unreadCards = notificationList.querySelectorAll('.notification-card--unread');
      if (unreadCards.length === 0) return;

      unreadCards.forEach(card => markCardAsRead(card));
      updateUnreadUI();
      showToast('Todas as notificações foram marcadas como lidas.');
    });
  }

  /* ── 4. ATUALIZAR CONTADOR E BADGE ───────────────────── */
  function countUnread() {
    return notificationList
      ? notificationList.querySelectorAll('.notification-card--unread').length
      : 0;
  }

  function updateUnreadUI() {
    const count = countUnread();

    // Contador textual
    if (unreadNumberEl) unreadNumberEl.textContent = count;
    if (unreadCountEl) unreadCountEl.classList.toggle('is-zero', count === 0);

    // Badge da bottom nav
    if (bottomBadge) {
      if (count > 0) {
        bottomBadge.textContent = count;
        bottomBadge.style.display = '';
        bottomBadge.setAttribute('aria-label', `${count} notificações não lidas`);
      } else {
        bottomBadge.style.display = 'none';
        bottomBadge.removeAttribute('aria-label');
      }
    }

    // Desabilita botão "Marcar todas" se não houver não lidas
    if (markAllBtn) {
      markAllBtn.disabled = count === 0;
    }
  }

  // Inicializar contagem
  updateUnreadUI();

  /* ── 5. MENU LATERAL ──────────────────────────────────── */
  function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add('is-open');
    menuOverlay.removeAttribute('aria-hidden');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove('is-open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);

  if (menuOverlay) {
    menuOverlay.addEventListener('click', (e) => {
      // Fechar ao clicar fora do painel
      if (e.target === menuOverlay) closeMenu();
    });
  }

  // Fechar com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('is-open')) {
      closeMenu();
    }
  });

  /* ── 6. TOAST DE FEEDBACK ─────────────────────────────── */
  let toastEl = null;
  let toastTimer = null;

  function showToast(message, duration = 2800) {
    // Cria elemento somente uma vez
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }

    toastEl.textContent = message;
    toastEl.classList.add('is-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, duration);
  }

  /* ── 7. ESTADO VAZIO – função auxiliar pública ────────── */
  // Utilize window.GuiaCidadao.showEmpty(true/false) para alternar via console/teste
  window.GuiaCidadao = window.GuiaCidadao || {};
  window.GuiaCidadao.showEmpty = function (show) {
    if (emptyState) emptyState.classList.toggle('is-visible', show);
    if (notificationList) notificationList.classList.toggle('is-hidden', show);
  };

})();
