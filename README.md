# Запуск приложения (Backend + Frontend + База данных)

## 1. Настройка переменных окружения
Переименуйте файл `.env.example` в `.env`:

Отредактируйте `.env`, если нужно изменить данные (имя пользователя, пароль, порты):

```env
#db/back

DB_USER=postgres
DB_PASS=postgres
DB_NAME=app
DB_PORT=5435

# backend

DB_HOST=db
APP_PORT=3007

# frontend

NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

- `DB_USER`, `DB_PASS` — логин и пароль для Postgres
- `DB_NAME` — имя базы данных (по умолчанию `app`)
- `DB_PORT` — порт для подключения к базе с **локальной машины** (внутри контейнеров всегда используется `5432`)
- `DB_HOST` — имя сервиса базы в Docker Compose (всегда `db`)
- `APP_PORT` — порт для запуска backend

---

## 2. Запуск приложения
Выполните команду:

```bash
docker compose up -d --build
```

Это поднимет три сервиса:
- **db** — Postgres (порт `5435` на хосте → `5432` в контейнере)
- **backend** — NestJS (порт `8080`)
- **frontend** — NextJS `http://localhost:3000`)

---

## 3. Проверка работы
- Фронтенд: [http://localhost:3000](http://localhost:3000)
- Бэкенд: [http://localhost:8080](http://localhost:8080)

---

## 4. Управление контейнерами
Остановить:
```bash
docker-compose down
```

Посмотреть логи:
```bash
docker-compose logs -f
```

Пересобрать и перезапустить:
```bash
docker-compose up -d --build
```

---

## 5. Дополнительно
- Данные базы сохраняются в volume `db-data`, поэтому при перезапуске контейнеров они не теряются.
- Чтобы пересоздать базу с нуля, нужно удалить volume:
  ```bash
  docker compose down -v
  ```
  После этого при следующем запуске база инициализируется заново и выполнит скрипт `infra/db/init.sql`.