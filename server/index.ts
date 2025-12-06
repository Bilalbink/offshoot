import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/users', (req: Request, res: Response) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
