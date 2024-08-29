"use client";

import Layout from '@/app/layout';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {deleteNewsById, getNewsById} from '@/services/news.service';
import { News } from '@/models/news.model';
import { RingLoader } from 'react-spinners';
import Breadcrumbs from "@/components/Breadcrumbs";

import './page.css';

const NewsDetailPage: React.FC = () => {
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const new_id = params?.new_id as string;

    useEffect(() => {
        if (new_id) {
            getNewsById(new_id).then(response => {
                setNews(response);
                setLoading(false);
            }).catch(error => {
                console.error('Failed to fetch news:', error);
                setLoading(false);
            });
        }
    }, [new_id]);

    const handleEditClick = () => {
        if (news) {
            router.push(`/news/${news.id}/edit`);
        }
    };
    const handleDelete = async (id: string, category_id: string, router) => {
        if (!id || !category_id) {
            console.error('Невірний ID або ID категорії');
            return;
        }

        const isConfirmed = window.confirm('Ви впевнені, що хочете видалити цю новину?');

        if (!isConfirmed) {
            return;
        }

        try {
            await deleteNewsById(id);
            alert('Новину успішно видалено.');
            router.push(`/categories/${category_id}`);
        } catch (error) {
            console.error('Помилка при видаленні новини:', error);
            alert('Сталася помилка під час видалення новини. Спробуйте ще раз.');
        }
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
            <div>
                <Breadcrumbs/>
                <div className="news_detail_container">
                    <h1 className="news_title">{news.title}</h1>
                    <img
                        src={news.thumbnail}
                        alt={news.title}
                        className="news_image"
                    />
                    <p><strong>Дата:</strong> {news.date}</p>
                    <p><strong>Вподобайки:</strong> {news.likes}</p>
                    <p>{news.short_description}</p>
                    <div className="button_panel">
                        <button onClick={handleEditClick} className="edit_button">
                            Редагувати Новину
                        </button>
                        <button onClick={() => {
                            if (news && news.id && news.category_id) {
                                handleDelete(news.id.toString(), news.category_id.toString(), router);
                            }
                        }}
                                className="delete_button"
                        >
                            Видалити Новину
                        </button>
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default NewsDetailPage;
