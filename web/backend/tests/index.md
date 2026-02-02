# Tests

Тесты API.

## Структура

| Папка/Файл | Назначение |
|------------|------------|
| `unit/` | Unit тесты сервисов |
| `integration/` | Интеграционные тесты API |
| `fixtures/` | Тестовые данные |
| `setup.ts` | Настройка тестового окружения |

## Инструменты

- **Test runner**: Vitest / Jest
- **HTTP тесты**: Supertest
- **Моки**: vitest mocks / jest mocks

## Пример

```typescript
// integration/maps.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /api/maps', () => {
  it('returns list of maps', async () => {
    const res = await request(app).get('/api/maps');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/maps/:id', () => {
  it('returns 404 for non-existent map', async () => {
    const res = await request(app).get('/api/maps/non-existent');
    expect(res.status).toBe(404);
  });
});
```
