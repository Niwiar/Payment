import express, { Request, Response, NextFunction } from 'express';
import { uid } from 'uid';
import axios from 'axios';

type TokenResponse = {
  status: { code: number; description: string };
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    expiresAt: Date;
  };
};

export const getAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = await axios<TokenResponse>({
    method: 'post',
    url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',
    headers: {
      'Content-Type': 'application/json',
      'accept-language': 'en',
      requestUId: uid(16),
      resourceOwnerId: process.env.SCB_API_KEY!,
    },
    data: {
      applicationKey: process.env.SCB_API_KEY,
      applicationSecret: process.env.SCB_API_SECRET,
    },
  });
  const { accessToken, tokenType } = response.data.data;
  res.set('authorization', `${tokenType} ${accessToken}`);
  next();
};
