const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/collegeadmission');
// mongoose.connect('mongodb://127.0.0.1:27017/collegeadmission');

// mongoose.connect('mongodb://localhost:27017/collegeadmission');

// const connection = mongoose.connection;
// connection.on('connected', () => {
//   console.log('MongoDB database connection established successfully');
// });

mongoose.connect('mongodb://localhost:27017/collegeadmission')

.then(() => console.log('Connected Successfully'))

.catch((err) => { console.error(err); });




