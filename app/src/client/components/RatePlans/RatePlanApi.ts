import axios from 'axios';

export interface RatePlanData {
  ratePlanName: string;
  productId: string;
  description: string;
  pricingModel: string;
  billingFrequency: string;
}

export interface Product {
  productId: string;
  productName: string;
}

export class RatePlanApi {
  private static BASE_URL = 'http://13.230.194.245:8080/api';

  static async createRatePlan(data: RatePlanData) {
    try {
      const response = await axios.post(`${this.BASE_URL}/rateplans`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating rate plan:', error);
      throw new Error('Failed to create rate plan');
    }
  }

  static async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }
}
