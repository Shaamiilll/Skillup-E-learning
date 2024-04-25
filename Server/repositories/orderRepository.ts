import Orders from "../models/orderModel";
import IOrder from "../interfaces/order";

class OrderRepository {
  async createOrder(data: IOrder) {
    try {
      const order = await Orders.create(data);

      if (!order) {
        return {
          success: false,
          message: `server error`,
        };
      }
      return {
        success: true,
        message: "Order created successfully",
        order,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create order: ${error}`,
      };
    }
  }
}

export default OrderRepository;
