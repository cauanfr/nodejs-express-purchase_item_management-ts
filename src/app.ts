import express, { json, Application } from "express";
import itemLogic from "./item.logic";
import purchaseLogic from "./purchase.logic";
import middleware from "./middleware";

const app: Application = express();
app.use(json());

app.post("/purchaseList", purchaseLogic.create);
app.get("/purchaseList", purchaseLogic.read);

app.get(
  "/purchaseList/:purchaseId",
  middleware.verifyPurchaseExists,
  purchaseLogic.retrieve
);
app.delete(
  "/purchaseList/:purchaseId",
  middleware.verifyPurchaseExists,
  purchaseLogic.destroy
);

app.patch(
  "/purchaseList/:purchaseId/:itemName",
  middleware.verifyPurchaseExists,
  middleware.verifyItemExists,
  itemLogic.update
);
app.delete(
  "/purchaseList/:purchaseId/:itemName",
  middleware.verifyPurchaseExists,
  middleware.verifyItemExists,
  itemLogic.destroy
);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
