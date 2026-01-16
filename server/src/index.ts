import { serverConfig } from './config/server.config';
import app from "./server";

const PORT = serverConfig.port;

app.listen(PORT, () => {
  console.log(`Express is running on http://127.0.0.1:${PORT}`);
})
