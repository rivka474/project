import * as express from 'express';
import * as path from 'path';

const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, '../../client')));

app.listen(PORT, () => {
  console.log(`Client running on http://localhost:${PORT}`);
});
