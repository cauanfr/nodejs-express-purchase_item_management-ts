import { Request, Response } from "express";
import purchases from "./database";
import idGenerator from "./idGenerator.logic";
import { IPurchase } from "./interfaces";

const create = (request: Request, response: Response): Response => {
  const newPurchaseId: number = idGenerator(purchases);
  const newPurchase: IPurchase = { id: newPurchaseId, ...request.body };

  purchases.push(newPurchase);

  return response.status(201).json(newPurchase);
};

const read = (request: Request, response: Response): Response => {
  return response.status(200).json(purchases);
};

const retrieve = (request: Request, response: Response): Response => {
  const { purchaseFound } = request.purchaseInfo;

  return response.status(200).json(purchaseFound);
};

const destroy = (request: Request, response: Response): Response => {
  const { purchaseIndex } = request.purchaseInfo;
  purchases.splice(purchaseIndex, 1);

  return response.status(204).json();
};

export default { create, read, retrieve, destroy };
