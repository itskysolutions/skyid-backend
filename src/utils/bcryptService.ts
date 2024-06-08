import bcrypt from "bcrypt";

export default class BcryptService {
  private static instance: BcryptService;

  private constructor() {}
  static getInstance(): BcryptService {
    if (!BcryptService.instance) {
      BcryptService.instance = new BcryptService();
    }
    return BcryptService.instance;
  }
  encode = (value: string) => bcrypt.hashSync(value, bcrypt.genSaltSync(10));
  decode = (value: string) => bcrypt.hashSync(bcrypt.genSaltSync(10), value);
  compare = (value: string, hash: string) => bcrypt.compareSync(value, hash);
}
