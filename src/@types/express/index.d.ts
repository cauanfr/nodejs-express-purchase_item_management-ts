import { IItemInfo, IPurchaseInfo } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      purchaseInfo: IPurchaseInfo;
      itemInfo: IItemInfo;
    }
  }
}
