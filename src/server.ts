import express from 'express';
import bodyParser from 'body-parser';
import setupRoutes from './routes';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

setupRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
