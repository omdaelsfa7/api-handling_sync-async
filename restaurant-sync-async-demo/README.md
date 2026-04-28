# Restaurant Sync vs Async Teaching Demo

This project contains:

- `backend`: FastAPI API with Swagger.
- `frontend`: Next.js page with two buttons.

## Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Swagger:

```text
http://localhost:8000/docs
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

## Teaching idea

### Sync

User 1 makes order → waits for delivery → User 2 starts after User 1 finishes.

Expected total time: about 10 seconds.

### Async

User 1 makes order → leaves → User 2 makes order → leaves → deliveries finish independently.

Expected total time: about 5 seconds.
