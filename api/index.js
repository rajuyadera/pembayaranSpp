import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize"
import siswaRouter from "./router/SiswaRouter.js";
import kelasRouter from "./router/KelasRouter.js";
import sppRouter from "./router/SppRouter.js";
import adminRouter from "./router/AdminRouter.js"
import paymentRouter from "./router/PaymentRouter.js"
import authRouter from "./router/AuthRouter.js"
import session from "express-session";
dotenv.config();

// cek koneksi database
try {
  db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log("Nyalain Xampp");
}

const app = express();

const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
  db: db
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: "auto"
  }
}))

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(kelasRouter);
app.use(siswaRouter);
app.use(sppRouter);
app.use(adminRouter);
app.use(paymentRouter);
app.use(authRouter);


  // (async ()=>{
  //   await db.sync({alter: true})
  // })()

// store.sync()

app.listen(process.env.PORT, () => {
  console.log("server runing at port " + process.env.PORT);
});
