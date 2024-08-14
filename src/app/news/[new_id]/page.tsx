"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getNewsById } from '../../api';
import { News } from '../../../types/types';
import { RingLoader } from 'react-spinners';
import styles from './Page.module.css'; // Оновлений шлях до CSS модуля

const NewsDetailPage: React.FC = () => {
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const new_id = params.new_id as string;

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

    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <RingLoader color="#3498db" />
            </div>
        );
    }

    if (!news) {
        return <p>Новину не знайдено.</p>;
    }

    return (
        <div className={styles.newsDetailContainer}>
            <h1 className={styles.newsTitle}>{news.title}</h1>
            <img
                src={news.thumbnail}
                alt={news.title}
                className={styles.newsImage}
            />
            <p><strong>Date:</strong> {news.date}</p>
            <p><strong>Likes:</strong> {news.likes}</p>
            <p>{news.short_description}</p>
            <button onClick={handleEditClick} className={styles.editButton}>
                Edit News
            </button>
        </div>
    );
};

export default NewsDetailPage;
