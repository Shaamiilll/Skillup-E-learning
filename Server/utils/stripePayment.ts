import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import UserRepository from "../repositories/UserRepository";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_SECRET as string, {
  apiVersion: "2024-04-10",
});

class StripePayments {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async checkoutSession(req: Request, res: Response) {
   
    const { course, userId } = req.body;


    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: course.title,
              images: [course.thumbnail],
            },
            unit_amount: Math.round(
              course.price
            ),
          },
          quantity: 1,
        },
      ],mode: "payment",
      success_url: `http://localhost:5173/`,
      cancel_url: `http://localhost:5173/`,
    });
    res.send({ url: session.url });
  }
}

export default StripePayments;
