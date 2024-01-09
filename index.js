import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import BarangRoute from "./routes/BarangRoute.js";
import PenawaranRoute from "./routes/Penawaran.js";
import GambarRoute from "./routes/GambarRoute.js";
import LelangRoute from "./routes/LelangRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import MasyarakatRoute from "./routes/MasyarakatRoute.js";
import FileUpload from "express-fileupload";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: ["https://www.example.com/", "http://localhost:3000"],
  })
);
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);
app.use(MasyarakatRoute);
app.use(BarangRoute);
app.use(LelangRoute);
app.use(PenawaranRoute);
app.use(GambarRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running... at port", process.env.APP_PORT);
});
