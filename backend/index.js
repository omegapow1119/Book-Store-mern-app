require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000
//JQjls6Hp1ckdpd5H
//mongodb+srv://omegapow1119:JQjls6Hp1ckdpd5H@cluster0.e5uv2pj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// middleware
app.use(express.json({
    limit: '10mb'
}));
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use("/", (req, res) => {
        res.send("Server Started")
    })
}

main().then(() => console.log("mongodb connect successfully")
).catch(err => console.log(err)
);

app.listen(port, () => {
    console.log(`Server Started at Port ${port}`)
})