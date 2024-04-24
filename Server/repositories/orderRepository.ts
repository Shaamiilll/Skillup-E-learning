import Orders from "../models/orderModel";
import IOrder from "../interfaces/order"

class OrderRepository {
    async createOrder(data: Omit<IOrder, 'date'>) {
        try {
            const orderData = { ...data, date: new Date() }; 
            const order = await Orders.create(orderData);
            if (!order) {
                return {
                  success: false,
                  message: `server error`,
                };
              }        
            return {
                success: true,
                message: "Order created successfully",
                order
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
