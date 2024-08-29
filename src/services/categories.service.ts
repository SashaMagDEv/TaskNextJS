import axios from 'axios';
import {Category} from '@/models/category.model';
import {News} from '@/models/news.model';

const API_URL = 'http://localhost:8000/api';

export async function fetchCategories() {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
}

export async function getCategoryById(category_id: string): Promise<Category> {
    try {
        const response = await axios.get(`${API_URL}/categories/${category_id}`);

        if (response.status === 200) {
            return response.data as Category;
        } else {
            throw new Error(`Failed to fetch category. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Failed to fetch category:', error);
        throw error;
    }
}