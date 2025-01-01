import app from './app';
import config from './app/config';
import connectDB from './app/config/db';

async function main() {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
