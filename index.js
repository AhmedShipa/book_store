import express from "express";
import { indexRouter } from "./index.router.js";


const app = express();
const port = process.env.PORT || 3000;

indexRouter(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));
