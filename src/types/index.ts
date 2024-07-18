export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  date?: Date;
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

// Define a custom request type that includes a user property
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    // Add other properties if necessary
  };
}
