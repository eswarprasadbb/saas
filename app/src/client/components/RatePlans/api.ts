import axios from 'axios';

interface Product {
  productId: string;
  productName: string;
  productType: string;
  description: string;
  category: string;
  status: string;
  version: string;
  visibility: boolean;
}

export interface RatePlan {
  ratePlanName: string;
  productName: string;
  description: string;
  ratePlanType: string;
  billingFrequency: string;
}

export const BASE_URL = 'http://13.230.194.245:8080/api';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchRatePlans = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/rateplans`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rate plans:', error);
    throw error;
  }
};

export const createRatePlan = async (ratePlan: RatePlan): Promise<RatePlan> => {
  try {
    const response = await axios.post(`${BASE_URL}/rateplans`, ratePlan);
    return response.data;
  } catch (error) {
    console.error('Error creating rate plan:', error);
    throw error;
  }
};

export const updateRatePlan = async (id: string, data: any): Promise<any> => {
  try {
    const response = await axios.put(`${BASE_URL}/rateplans/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating rate plan:', error);
    throw error;
  }
};

export const deleteRatePlan = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/rateplans/${id}`);
  } catch (error) {
    console.error('Error deleting rate plan:', error);
    throw error;
  }
};
