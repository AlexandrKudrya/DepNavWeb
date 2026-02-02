# Middleware

Express/Fastify middleware.

## Планируемые middleware

| Файл | Назначение |
|------|------------|
| `cors.ts` | CORS настройки |
| `logger.ts` | Логирование запросов |
| `errorHandler.ts` | Обработка ошибок |
| `validate.ts` | Валидация через Zod |
| `cache.ts` | Кэширование ответов |

## Примеры

```typescript
// errorHandler.ts
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
}

// validate.ts
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues });
    }
    req.validated = result.data;
    next();
  };
}
```
