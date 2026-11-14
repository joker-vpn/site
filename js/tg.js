/* Ссылки на Telegram: сначала открываем приложение (tg://), сайт t.me — запасной вариант.
   Без JavaScript ссылки остаются обычными https://t.me/… и работают как раньше. */
(function () {
  var mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  function hint(webUrl) {
    var old = document.getElementById('tg-hint'); if (old) old.remove();
    var box = document.createElement('div');
    box.id = 'tg-hint'; box.setAttribute('role', 'status');
    box.innerHTML = '<button type="button" aria-label="Закрыть">×</button>' +
      '<b>Открываем Telegram…</b>' +
      '<span>Ничего не произошло? <a target="_blank" rel="noopener">Откройте ссылку в браузере</a>.</span>' +
      '<span>Нет Telegram — скачайте его на <a href="https://telegram.org/apps" target="_blank" rel="noopener">telegram.org</a>.</span>';
    box.querySelector('span a').href = webUrl;
    box.querySelector('button').onclick = function () { box.remove(); };
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 12000);
  }

  var css = document.createElement('style');
  css.textContent = '#tg-hint{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:1000;' +
    'width:min(420px,calc(100% - 32px));padding:14px 40px 14px 16px;border-radius:14px;background:#181526;' +
    'border:1px solid #2a2540;box-shadow:0 14px 36px -12px rgba(0,0,0,.8);color:#ecebf3;font-size:14px;line-height:1.5}' +
    '#tg-hint b{display:block;margin-bottom:4px}#tg-hint span{display:block;color:#9a96ad}#tg-hint a{color:#a78bfa}' +
    '#tg-hint button{position:absolute;top:6px;right:8px;background:none;border:0;color:#9a96ad;font-size:22px;line-height:1;cursor:pointer;padding:4px}';
  document.head.appendChild(css);

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href^="https://t.me/"]');
    if (!a || a.closest('#tg-hint')) return;
    var u; try { u = new URL(a.href); } catch (err) { return; }
    var name = u.pathname.replace(/^\/+|\/+$/g, '');
    var tg;
    if (/^\+[A-Za-z0-9_-]{8,64}$/.test(name)) {          // приглашение в канал: t.me/+код
      tg = 'tg://join?invite=' + name.slice(1);
    } else if (/^[A-Za-z0-9_]{5,32}$/.test(name)) {        // бот: t.me/имя?start=…
      tg = 'tg://resolve?domain=' + name;
      var start = u.searchParams.get('start');
      if (start) tg += '&start=' + encodeURIComponent(start);
    } else return;

    e.preventDefault();
    var left = false;
    function gone() { left = true; }
    window.addEventListener('blur', gone, { once: true });
    window.addEventListener('pagehide', gone, { once: true });
    document.addEventListener('visibilitychange', gone, { once: true });

    hint(a.href);
    location.href = tg;

    // На телефоне: если приложение не открылось за 1,5 с — открываем t.me.
    if (mobile) setTimeout(function () {
      if (!left && !document.hidden) location.href = a.href;
    }, 1500);
  });
})();
