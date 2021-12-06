const express = require('express');
const connectionDB = require('./database');

const app = express();

const cors = require('cors')
app.use(cors());

require('./database');

app.use(express.json({extended:false}));
app.use('/api/user',require('./routes/user'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/gateway',require('./routes/gateway'));
app.use('/api/sensor',require('./routes/sensor'));
app.use('/api/sensoralert',require('./routes/sensorAlert'));

app.listen(5000,()=>{
    console.log('server running');
});