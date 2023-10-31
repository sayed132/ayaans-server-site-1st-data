const app = require("./index.js");
const { connectDB } = require("./config/db.js");

const PORT = 8000;

app.listen(PORT, async()=>{
    await connectDB();
console.log("this server running successfully in this:",PORT, 'port ' );
})