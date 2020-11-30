import express from 'express';
import mongoose from 'mongoose';
import router from './routes/accountRouter';
import config from './config.json';

const port = config['tracking-service-port'];
const app = express();

//db connection
mongoose.connect('mongodb://localhost/celtra', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to the database'));

//keeping routes in separate file, easier to maintain
app.use('/api/account', router);

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));

module.exports = app