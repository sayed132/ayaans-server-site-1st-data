const app = require("./index");
const { connectDB } = require("./config/db");

const PORT = 8000;

app.listen(PORT, async()=>{
    await connectDB();
console.log("this server running successfully in this:",PORT, 'port ' );
})