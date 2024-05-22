import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
const PORT = config.port || 5000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(PORT, () => {
      console.log(`The server is running on ${PORT} port.`);
    });
  } catch (error) {
    console.log('Error found in mongoose connection time');
  }
}

main();
