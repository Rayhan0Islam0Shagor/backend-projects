import app from './app';
import config from './app/config';
import connectDB from './app/config/db';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await connectDB();

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (error) => {
  console.log(`⚠️unhandledRejection detected🚧, closing server...⚙️`);
  if (server) {
    server.close(() => {
      console.log(error);
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.log(`⚠️uncaughtException detected🚧, closing server...⚙️`);
  process.exit(1);
});
