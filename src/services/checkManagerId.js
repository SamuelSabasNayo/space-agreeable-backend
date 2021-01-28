/* eslint-disable import/prefer-default-export */
import models from '../database/models';

const { request } = models;

export const findRequestByManagerId = async (managerId) => {
  const existingRequest = await request.findOne({ where: { managerId } });
  if (existingRequest) return existingRequest;
};
