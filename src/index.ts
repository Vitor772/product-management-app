import express from "express";
import cors from "cors";
import routes from "./infrastructure/http/routes";

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors()); // HABILITA CORS AQUI
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
