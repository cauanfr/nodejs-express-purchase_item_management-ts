import { NextFunction, Request, Response } from "express";
import purchases from "./database";
import { IItem, IPurchase } from "./interfaces";

const verifyPurchaseExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { purchaseId } = request.params;

  const foundPurchase: IPurchase | undefined = purchases.find(
    (purchase) => purchase.id === Number(purchaseId)
  );

  if (!foundPurchase) {
    const message: string = `Purchase with id ${purchaseId} does not exist`;
    return response.status(404).json({ message });
  }

  const purchaseIndex: number = purchases.findIndex(
    (purchase: IPurchase) => purchase === foundPurchase
  );

  request.purchaseInfo = { purchaseFound: foundPurchase, purchaseIndex };

  return next();
};

const verifyItemExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { purchaseFound, purchaseIndex } = request.purchaseInfo;
  const { itemName } = request.params;

  const foundItem: IItem | undefined = purchaseFound.data.find(
    (item: IItem) => item.name === itemName
  );

  if (!foundItem) {
    const message: string = `Item with name ${itemName} does not exist`;
    return response.status(404).json({ message });
  }

  const itemIndex: number = purchases[purchaseIndex].data.findIndex(
    (item: IItem) => item === foundItem
  );

  request.itemInfo = { itemFound: foundItem, itemIndex };

  return next();
};

export default { verifyPurchaseExists, verifyItemExists };
