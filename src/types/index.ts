import type { Types } from "mongoose";

export interface IUser {
  firstName?: string;
  lastName?: string;
  country?: string;
  businessName?: string;
  businessType?: string;
  agentCode?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  verified?: string;
  user_id?: any;
  date?: Date;
  accountType?: string;

  // nin?: string;
  // address?: string;
  // contactNumber?: string;
}
export interface IKYC {
  user_id?: string;
  phone?: string;
  address?: string;
  state?: string;
  nin?: string;
  date?: Date;
}

export interface IPhoneNumber {
  number: string;
  accountId: string;
  amount: number;
  available: string;
  billingPass: string;
  agentOwner: string | null;
  usedBy: string;
  date: Date;
  platform?: "SKYID";
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface IMail {
  to: string;
  from: string;
  name: string;
  subject: string;
  html: string;
  text: string;
}

export interface IOtp {
  email: string;
  otp: string;
  password: string;
  createdAt?: Date;
  expiresAt?: Date;
}
export interface ICheckEmail {
  email: string;
  otp: string;
}

export interface IBuyNumber {
  skyId: string;
  mappedNumbers: string[];
  withIVR: boolean;
  withIVM: boolean;
}

export interface BuyNumberMeta {
  skyId: string;
  userId: string;
  [x: string]: unknown;
}

export interface PaystackTxnInit {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackTxnVerify<T> {
  status: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
    metadata: T;
  };
}

export interface ISkyId {
  skyId: string;
  mappedNumbers: string[];
  withIVR: boolean;
  withIVM: boolean;
  userId: Types.ObjectId;
  status: "pending" | "active" | "inactive";
  amount: number;
  txnRef: string;
}
