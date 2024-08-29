// "use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createNews } from '@/services/news.service';
import { RingLoader } from 'react-spinners';
import Layout from "@/app/layout";

import './add_news.css';

const AddNewsPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [date, setDate] = useState('');
    const [short_description, setShortDescription] = useState('');
    const [likes, setLikes] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const params = useParams();
    const router = useRouter();
    const category_id = params?.category_id as string;

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!title) newErrors.title = 'Title is required';
        if (!thumbnail) newErrors.thumbnail = 'Thumbnail is required';
        if (!date) newErrors.date = 'Date is required';
        if (!short_description) newErrors.short_description = 'Short description is required';
        if (!likes) newErrors.likes = 'Likes is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        const News = { title, thumbnail, date, short_description, likes: parseInt(likes, 10) };

        try {
            const response = await createNews(category_id, News);
            alert('Новина успішно додана!');
            router.push(`/categories/${category_id}/`);
        } catch (error) {
            alert('Помилка при додаванні новини');
        } finally {
            setLoading(false);
        }
    };
    const handleGoBack = () => {
        router.back();
    }

    if (loading) {
        return (
            <div className="loader_container">
                <RingLoader color="#3498db" />
            </div>
        );
    }

    return (
        <Layout>
            <div className="add_news_container">
                <h1 className="header">Додати новину</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form_group">
                        <label className="label">
                            Title:
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="input"
                            />
                            {errors.title && <p className="error">{errors.title}</p>}
                        </label>
                    </div>
                    <div className="form_group">
                        <label className="label">
                            Thumbnail URL:
                            <input
                                type="text"
                                value={thumbnail}
                                onChange={e => setThumbnail(e.target.value)}
                                className="input"
                            />
                            {errors.thumbnail && <p className="error">{errors.thumbnail}</p>}
                        </label>
                    </div>
                    <div className="form_group">
                        <label className="label">
                            Date:
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="input"
                            />
                            {errors.date && <p className="error">{errors.date}</p>}
                        </label>
                    </div>
                    <div className="form_group">
                        <label className="label">
                            Short Description:
                            <textarea
                                value={short_description}
                                onChange={e => setShortDescription(e.target.value)}
                                className="textarea"
                            />
                            {errors.short_description && <p className="error">{errors.short_description}</p>}
                        </label>
                    </div>
                    <div className="form_group">
                        <label className="label">
                            Likes:
                            <input
                                type="number"
                                value={likes}
                                onChange={e => setLikes(e.target.value)}
                                className="input"
                            />
                            {errors.likes && <p className="error">{errors.likes}</p>}
                        </label>
                    </div>
                    <button type="submit" className="submit_button">
                        Save News
                    </button>
                    <button type="button" onClick={handleGoBack} className="back_button">
                        Назад
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddNewsPage;
