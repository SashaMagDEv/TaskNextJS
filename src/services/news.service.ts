import axios from 'axios';
import {News} from '@/models/news.model';

const API_URL = 'http://localhost:8000/api/';


export const getNewsByCategory = async (category_id: string, page: number) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/categories/${category_id}/news`, {
            params: { page, per_page: 10 }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch news by category:', error);
        throw error;
    }
};

// export const getNewsById = async (id: string): Promise<News> => {
//     try {
//         const response = await axios.get(`${API_URL}/news/${id}`);
//         return  response.data
//     } catch (error) {
//         console.error('Failed to fetch news:', error);
//         throw new Error('Failed to fetch news');
//     }
// };
export const getNewsById = async (id: string): Promise<News | null> => {
    try {
        const response = await axios.get(`${API_URL}news/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Помилка при отриманні новини:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Помилка при отриманні новини:', error);
        return null;
    }
};
// export async function getNewsByCategory(id: string, page: number = 1): Promise<any> {
//     try {
//         const response = await axios.get(`${API_URL}/categories/${id}/news`, {
//             params: {
//                 page:page,
//                 per_page: 10
//             }
//         });
//
//         if (response.status === 200) {
//             return {
//                 data: response.data.data,
//                 meta: response.data.meta
//             }
//
//         } else {
//             throw new Error(`Failed to fetch news. Status code: ${response.status}`);
//         }
//     } catch (error) {
//         console.error('Failed to fetch news by category:', error);
//         throw error;
//     }
// }



export const updateNews = async (id: string, data: Partial<News>): Promise<void> => {
    try {
        await axios.put(`${API_URL}news/${id}`, data);
    } catch (error) {
        console.error('Failed to update news:', error);
        throw new Error('Failed to update news');
    }
};


export const createNews = async (category_id: string, news: {
    title: string;
    thumbnail: string;
    date: string;
    short_description: string;
    likes: number;
}) => {
    try {
        const response = await axios.post(
            `${API_URL}categories/${category_id}/news`, { ...news, category_id }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating news:', error.response?.data || error.message, error);
        throw new Error('Failed to create news');
    }
}

export const deleteNewsById = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}news/${id}`);
    } catch (error) {
        console.error('Не вдалося видалити новину:', error);
        throw new Error('Не вдалося видалити новину');
    }
};

