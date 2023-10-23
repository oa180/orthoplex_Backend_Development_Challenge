import createApp from './src/app.js';
import { config } from 'dotenv';
config({ path: '.env' });

const PORT_NUMBER = process.env.PORT_NUMBER || 8080;

const app = createApp();
app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER} ✅ ...`);
});
