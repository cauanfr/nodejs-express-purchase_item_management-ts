import { Request, Response } from "express";
import purchases from "./database";
import { IItem, TItemUpdatableKeys, IItemUpdatableInfos } from "./interfaces";

const update = (request: Request, response: Response): Response => {
  const updatableInfos: IItemUpdatableInfos = {
    name: "string",
    quantity: "string",
  };

  const updatableKeys = Object.keys(updatableInfos) as TItemUpdatableKeys[];
  const receivedKeys: string[] = Object.keys(request.body);

  for (const updatableKey of updatableKeys) {
    if (!receivedKeys.includes(updatableKey)) {
      const message: string = 'Updatable fields are: "name" and "quantity"';
      return response.status(400).json(message);
    }

    const bodyKeyType = typeof request.body[updatableKey];
    const updatableKeyType = updatableInfos[updatableKey];

    if (bodyKeyType !== updatableKeyType) {
      const keyType: string = updatableInfos[updatableKey];
      const message: string = `The ${updatableKey} need to be a ${keyType}`;
      return response.status(400).json(message);
    }
  }

  const { purchaseIndex } = request.purchaseInfo;
  const { itemIndex, itemFound } = request.itemInfo;

  const itemUpdated: IItem = (purchases[purchaseIndex].data[itemIndex] = {
    ...itemFound,
    ...request.body,
  });

  return response.status(200).json(itemUpdated);
};

const destroy = (request: Request, response: Response): Response => {
  const { purchaseIndex } = request.purchaseInfo;
  const { itemIndex } = request.itemInfo;

  purchases[purchaseIndex].data.splice(itemIndex, 1);

  return response.status(204).json();
};

export default { update, destroy };
