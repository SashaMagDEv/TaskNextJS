"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCategoryById, getNewsByCategory } from '../../api';
import { RingLoader } from 'react-spinners';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { News, Category } from '../../../types/types';

import styles from './Page.module.css';


export const NewsPage: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [links, setLinks] = useState({
        first: '',
        last: '',
        previous: '',
        next: ''
    });
    const params = useParams();
    const router = useRouter();
    const category_id = params.category_id as string;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getNewsByCategory(category_id, page);
                setNews(response.data);
                setTotalPages(response.meta.total_pages);
                setLinks({
                    first: response.meta.link_to_first_page,
                    last: response.meta.link_to_last_page,
                    previous: response.meta.link_to_previous_page,
                    next: response.meta.link_to_next_page
                });
                const categoryResponse = await getCategoryById(category_id);
                setCategory(categoryResponse);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (category_id) {
            fetchData();
        }
    }, [category_id, page]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
            router.push(`/categories/${category_id}/`);
        }
    };


    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <RingLoader color="#3498db" />
            </div>
        );
    }

    return (
        <div>
            <Breadcrumbs />
            <h1 className={styles.container}>
                Новини категорії <span className={styles.highlight}>{category ? category.name : '...'}</span>
            </h1>
            <button onClick={() => router.push(`/categories/${category_id}/add-news`)}
                    className={styles.createNewsButton}>
                Додати новину
            </button>
            <div className={styles.gridContainer}>
                {news.length > 0 ? (
                    news.map((item: News) => (
                        <div key={item.id} className={styles.newsCard} onClick={() => router.push(`/news/${item.id}`)}>
                            <img src={item.thumbnail} alt={item.title} className={styles.newsImage}/>
                            <h2 className={styles.newsTitle}>{item.title}</h2>
                            <p><strong>Дата:</strong> {item.date}</p>
                            <p><strong>Вподобайки:</strong> {item.likes}</p>
                            <p>{item.short_description}</p>
                        </div>
                    ))
                ) : (

                    <p>Новин для цієї категорії немає.</p>
                )}
            </div>
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button onClick={() => handlePageChange(page - 1)} disabled={!links.previous}>Попередня</button>
                    <span>Сторінка {page} з {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={!links.next}>Наступна</button>
                </div>
            )}
        </div>
    );
};

export default NewsPage;
