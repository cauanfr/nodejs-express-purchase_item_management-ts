type TItemUpdatableKeys = "name" | "quantity";
type IItemUpdatableInfos = {
  [key in TItemUpdatableKeys]: string;
};

interface IItem {
  name: string;
  quantity: string;
}

interface IPurchase {
  id: number;
  listName: string;
  data: IItem[];
}

interface IPurchaseInfo {
  purchaseFound: IPurchase;
  purchaseIndex: number;
}

interface IItemInfo {
  itemFound: IItem;
  itemIndex: number;
}

export {
  IItem,
  IPurchase,
  IPurchaseInfo,
  IItemInfo,
  TItemUpdatableKeys,
  IItemUpdatableInfos,
};
