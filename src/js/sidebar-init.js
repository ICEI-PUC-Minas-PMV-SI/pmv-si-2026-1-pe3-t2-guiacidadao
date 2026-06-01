/**
 * Inicialização compartilhada do painel lateral em páginas HTML standalone.
 */
(function () {
  'use strict';

  function getLoggedUser() {
    if (window.NotificationsStore?.getLoggedUser) {
      return window.NotificationsStore.getLoggedUser();
    }
    for (const key of ['usuarioLogado', 'gc_user']) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const user = JSON.parse(raw);
        if (user?.nome) return user;
      } catch (_) {
        /* ignore */
      }
    }
    return null;
  }

  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const usernameEl = document.getElementById('sidebar-username');
    const openBtn = document.getElementById('btn-menu');
    const closeBtn = document.getElementById('btn-sidebar-close');
    const profileBtn = document.getElementById('btn-profile');
    const logoutBtn = document.getElementById('btn-sair');

    const user = getLoggedUser();
    if (usernameEl) {
      usernameEl.textContent = user?.nome || 'Cidadão';
    }

    function openSidebar() {
      sidebar?.classList.add('open');
      overlay?.classList.add('active');
    }

    function closeSidebar() {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('active');
    }

    openBtn?.addEventListener('click', openSidebar);
    profileBtn?.addEventListener('click', openSidebar);
    closeBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);

    logoutBtn?.addEventListener('click', () => {
      closeSidebar();
      localStorage.removeItem('usuarioLogado');
      localStorage.removeItem('gc_user');
      window.location.href = '/src/pages/login/login.html';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }

  window.initGuiaSidebar = initSidebar;
})();
