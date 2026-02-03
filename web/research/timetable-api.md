# Исследование: API расписания СПбГУ

**Дата:** 2026-02-02
**Статус:** Исследовано
**Источники:**
- [timetable.spbu.ru](https://timetable.spbu.ru/)
- [GitHub: spbu-timetable/timetable](https://github.com/spbu-timetable/timetable)

## Base URL

```
https://timetable.spbu.ru/api/v1
```

## Endpoints

### Структура университета

| Endpoint | Метод | Описание |
|----------|-------|----------|
| `/study/divisions` | GET | Все факультеты |
| `/study/divisions/programs/levels` | GET | Факультеты с программами |
| `/programs/{progrid}/groups` | GET | Группы образовательной программы |

### Расписание

| Endpoint | Метод | Описание |
|----------|-------|----------|
| `/groups/{gid}/events/{from}/{to}` | GET | Расписание группы |
| `/educators/{staffid}/events` | GET | Расписание преподавателя |
| `/classrooms/{roomid}/events/{from}/{to}` | GET | Занятия в аудитории |

### Поиск

| Endpoint | Метод | Описание |
|----------|-------|----------|
| `/educators/search/{query}` | GET | Поиск преподавателя по ФИО |

### Адреса и аудитории

| Endpoint | Метод | Описание |
|----------|-------|----------|
| `/addresses` | GET | Все адреса (здания) |
| `/addresses/{oid}/classrooms` | GET | Аудитории по адресу |

## Формат дат

```
YYYYMMDDHHmm

Примеры:
- 202009280800 = 28 сентября 2020, 08:00
- 202010042000 = 4 октября 2020, 20:00
```

## Примеры запросов

### Получить факультеты
```bash
curl https://timetable.spbu.ru/api/v1/study/divisions
```

### Получить расписание группы
```bash
# gid = ID группы
# from/to = даты в формате YYYYMMDDHHmm
curl "https://timetable.spbu.ru/api/v1/groups/12345/events/202602020800/202602082000?timetable=Primary"
```

### Поиск преподавателя
```bash
curl https://timetable.spbu.ru/api/v1/educators/search/Иванов
```

### Получить аудитории здания
```bash
# oid = ID здания (адреса)
curl https://timetable.spbu.ru/api/v1/addresses/123/classrooms
```

## Интеграция с DepNav

### Идея
Связать аудитории из расписания с маркерами на карте:
1. Пользователь выбирает группу/преподавателя
2. Загружается расписание на день/неделю
3. При клике на занятие — показ аудитории на карте

### Сопоставление данных

```
API расписания          DepNav маркеры
─────────────────────────────────────
classroom.name    ←→    marker.title
(например "3343")       (например "3343")
```

### Необходимые шаги

1. **Получить ID матмеха** — запрос к `/study/divisions`
2. **Получить программы и группы** — `/programs/{id}/groups`
3. **Кэшировать маппинг** — `classroom_name → marker_id`
4. **UI для выбора группы** — dropdown или поиск
5. **Отображение расписания** — список занятий с кнопкой "Показать на карте"

### Ограничения

- API может требовать авторизацию (проверить)
- CORS — возможно нужен прокси
- Rate limiting — неизвестно

## TODO

- [ ] Проверить доступность API без авторизации
- [ ] Определить ID матмеха в системе
- [ ] Получить список аудиторий через API
- [ ] Сопоставить с маркерами в JSON
- [ ] Реализовать прокси (если нужен из-за CORS)
