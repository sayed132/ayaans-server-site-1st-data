const app = require("./Index");
const { connectDB } = require("./config/db");

const PORT = 8000;

app.listen(PORT, async()=>{
    await connectDB();
console.log("this server running in this:",PORT, 'port ' );
})