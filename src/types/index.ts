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

// Define a custom request type that includes a user property
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    // Add other properties if necessary
  };
}

export interface IBuyNumber {
  skyId: string;
  mappedNumbers: string[];
  withIVR: boolean;
  withIVM: boolean;
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
