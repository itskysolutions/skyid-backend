import { Response, Request, NextFunction } from "express";
import validation from "../utils/validation";
import User from "../models/userModel";
import BcryptService from "../utils/bcryptService";
import { sendMail } from "../utils/sendMail";
import { registration } from "../views/registration";

export default class UserController {
  static async checkEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      const { error } = validation.checkEmail(email);
      if (error) return res.status(400).send(error.details[0].message);

      // ready to go
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).send({ message: "email is already taken." });
      } else {
        return res.status(201).json({ message: "success", data: "available" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async checkPhoneNumber(req: Request, res: Response, next: NextFunction) {
    const { phoneNumber } = req.body;
    try {
      const { error } = validation.checkPhoneNumber(phoneNumber);
      if (error) return res.status(400).send(error.details[0].message);

      // ready to go
      let user = await User.findOne({ phoneNumber });
      if (user) {
        res.status(400).send({ message: "phone number exists." });
      } else {
        return res.status(201).json({ message: "success", data: "available" });
      }
    } catch (error) {
      console.log(error, "error");
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async signup(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password, phoneNumber, address, nin, currency } = req.body;
    try {
      const { error } = validation.signup({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        nin,
        currency,
      });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email });
      if (user) return res.status(400).send({ message: "User already registered." });

      user = new User({
        firstName,
        lastName,
        email,
        password: BcryptService.getInstance().encode(password), // encrypt password
        phoneNumber,
        address,
        nin,
        currency,
      });

      await user.save();

      sendMail({
        to: email,
        from: "Kirani",
        name: firstName,
        subject: "Welcome to Kirani",
        html: registration(firstName),
        text: "",
      });

      return res.status(201).json({ message: "success", data: "User created" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async signin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const { value, error } = validation.signIn({ email, password });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send({ message: "Invalid email or password." });

      // const validPassword = await bcrypt.compare(req.body.password, user.password);
      // if (!validPassword) return res.status(400).send({ message: "Invalid email or password." });

      // // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
      // const token = user.generateAuthToken();

      // res.send({ message: "success", data: token });

      return res.status(200).json({ message: "success", data: value });
    } catch (error) {
      return res.status(500).json({ message: error });
    }

    next();
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      const { value, error } = validation.forgotPassword({ email });
      if (error) return res.status(400).send(error.details[0].message);

      // ready to go
      return res.status(200).json({ message: "success/forgot", data: value });
    } catch (error) {
      return res.status(500).json({ message: error });
    }

    next();
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const { value, error } = validation.signIn({ email, password });
      if (error) return res.status(400).send(error.details[0].message);

      // ready to go
      return res.status(200).json({ message: "success/reset", data: value });
    } catch (error) {
      return res.status(500).json({ message: error });
    }

    next();
  }
}

//@desc Post signin
//@route POST /api/auth/signup
//@access public

//@desc Post signin
//@route POST /api/auth/signup
//@access public
// const signin = async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
//   try {
//     const { value, error } = validation.signIn({ email, password });
//     if (error) return res.status(400).send(error.details[0].message);

//     // ready to go
//     return res.status(200).json({ message: "success", data: value });
//   } catch (error) {
//     console.log(error, "here");
//     return res.status(500).json({ message: error });
//   }

//   next();
// };

// const forgotPassword = (req: Request, res: Response) => {
//   const { email } = req.body;
//   try {
//     const { value, error } = validation.forgotPassword({ email });
//     if (error) return res.status(400).send(error.details[0].message);
//     return res.status(200).json({ message: "success", data: value });
//   } catch (error) {
//     console.log("Server error 500");
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// const resetPassword = (req: Request, res: Response) => {
//   return res.status(200).json({ message: "reset" });
// };
