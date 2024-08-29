"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getNewsById, updateNews } from '@/services/news.service';
import { News } from '@/models/news.model';
import { RingLoader } from 'react-spinners';
import Layout from "@/app/layout";

import './edit.css';

const Index: React.FC = () => {
    const [news, setNews] = useState<News | null>(null);
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [date, setDate] = useState('');
    const [short_description, setShortDescription] = useState('');
    const [likes, setLikes] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const new_id = params?.new_id as string;

    useEffect(() => {
        let isMounted = true;

        if (new_id) {
            getNewsById(new_id)
                .then(response => {
                    if (isMounted) {
                        if (response) {
                            setNews(response);
                            setTitle(response.title || '');
                            setThumbnail(response.thumbnail || '');
                            setDate(response.date || '');
                            setLikes(response.likes?.toString() || '');
                            setShortDescription(response.short_description || '');
                        }
                        setLoading(false);
                    }
                })
                .catch(error => {
                    if (isMounted) {
                        console.error('Failed to fetch news:', error);
                        setLoading(false);
                    }
                });
        }

        return () => {
            isMounted = false;
        };
    }, [new_id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedNews = { title, thumbnail, date, short_description, likes: parseInt(likes, 10) };

        try {
            await updateNews(new_id, updatedNews);
            alert('Новина успішно оновлена!');
            router.push(`/news/${new_id}`);
        } catch (error) {
            console.error('Failed to update news:', error);
            alert('Помилка при оновленні новини');
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <div className="loader_container">
                <RingLoader color="#3498db" />
            </div>
        );
    }

    if (!news) {
        return <p>Новину не знайдено.</p>;
    }

    return (
        <Layout>
            <div className="edit_news_container">
                <h1 className="header">Edit News</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="formGroup">
                        <label className="label">
                            Title:
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="input"
                            />
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
                        </label>
                    </div>
                    <button type="submit" className="submit_button">
                        Save Changes
                    </button>
                    <button type="button" onClick={handleGoBack} className="back_button">
                        Назад
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Index;
