"use client";

import Layout from '@/app/layout';
import React, { useEffect, useState } from 'react';
import { getNewsByCategory } from '@/services/news.service';
import { getCategoryById } from '@/services/categories.service';
import { RingLoader } from 'react-spinners';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Category } from '@/models/category.model';
import { News } from '@/models/news.model';
import { useRouter } from 'next/router';

import './page.css';

const NewsPage: React.FC = () => {
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
    const router = useRouter();
    const { category_id } = router.query as { category_id?: string };

    useEffect(() => {
        if (!category_id) {
            return;
        }

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

        fetchData();
    }, [category_id, page]);


    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
            router.push(`/categories/${category_id}`);
        }
    };

    if (loading) {
        return (
            <div className="loaderContainer">
                <RingLoader color="#3498db" />
            </div>
        );
    }

    return (
        <Layout>
            <div>
                <Breadcrumbs/>
                <h1 className="container">
                    Новини категорії <span className="highlight">{category ? category.name : '...'}</span>
                </h1>
                <button onClick={() => router.push(`/categories/${category_id}/add-news`)}
                        className="createNewsButton">
                    Додати новину
                </button>
                <div className="grid_сontainer">
                    {news.length > 0 ? (
                        news.map((item: News) => (
                            <div key={item.id} className="newsCard" onClick={() => router.push(`/news/${item.id}`)}>
                                <img src={item.thumbnail} alt={item.title} className="newsImage"/>
                                <h2 className="newsTitle">{item.title}</h2>
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
                    <div className="pagination">
                        <button onClick={() => handlePageChange(page - 1)} disabled={!links.previous}>Попередня</button>
                        <span>Сторінка {page} з {totalPages}</span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={!links.next}>Наступна</button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default NewsPage;
