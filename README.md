# Сайт Joker VPN — joker-kvn.club

Статический сайт: `index.html`, `offer.html`, `privacy.html`, картинки в `apps/`, `flags/`, логотипы и значки.

## Выкладка

Основной сервер — UltraVDS, Москва, `13.143.207.76`, папка `/var/www/joker-kvn.club`
(nginx; пользователь `deploy`, ключ `~/.ssh/claude_vpn_bot`).

1. Закоммитить изменения (автор «Joker VPN» <noreply@joker-kvn.club>).
2. Прогнать проверку: `bash "D:/Joker VPN/scripts/site-check.sh"`.
3. Выложить одной командой из папки сайта:

```bash
bash deploy.sh
```

Скрипт берёт последнюю закоммиченную версию и заменяет всё содержимое папки на сервере.
Незакоммиченные правки не попадают.

Запасные копии: GitHub Pages и Netlify, они обновляются через `git push origin main`.
