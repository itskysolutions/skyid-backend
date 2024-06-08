export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  nin?: string;
  currency?: string;
  date?: Date;
}

export interface IMail {
  to: string;
  name: string;
  subject: string;
  html: string;
  text: string;
}
