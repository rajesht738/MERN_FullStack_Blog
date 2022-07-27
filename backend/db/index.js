const mongoose  = require("mongoose");
mongoose.connect('mongodb://localhost:27017/mernStackDB')
.then(() => console.log("db connected successfully"))
.catch((error) => {
console.log('db connection failed:', error.message || error);
})