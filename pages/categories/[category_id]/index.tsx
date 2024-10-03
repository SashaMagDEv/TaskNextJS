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
import {useTranslation} from "next-i18next";

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
    const { t } = useTranslation('common');

    useEffect(() => {
        if (!category_id) {
            return;
        }

        const fetchData = async () => {
            setLoading(true);

            const response = await getNewsByCategory(category_id, page);

            setNews(response.data);
            setTotalPages(response.last_page);
            setLinks({
                first: response.first_page_url,
                last: response.last_page_url,
                previous: response.prev_page_url,
                next: response.next_page_url
            });

            const categoryResponse = await getCategoryById(category_id);
            setCategory(categoryResponse);

            setLoading(false);
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
                <Breadcrumbs />
                <h1 className="container">
                    {t('categoryNews')} <span className="highlight">{category?.name || '...'}</span>
                </h1>
                <button onClick={() => router.push(`/categories/${category_id}/add-news`)}
                        className="createNewsButton">
                    {t('addNews')}
                </button>
                <div className="grid_сontainer">
                    {news.length > 0 ? (
                        news.map((item: any) => (
                            <div key={item.id} className="newsCard" onClick={() => router.push(`/news/${item.id}`)}>
                                <img src={item.thumbnail} alt={item.title} className="newsImage" />
                                <h2 className="newsTitle">{item.title}</h2>
                                <p><strong>{t('date')}:</strong> {item.date}</p>
                                <p><strong>{t('likes')}:</strong> {item.likes}</p>
                                <p>{item.short_description}</p>
                            </div>
                        ))
                    ) : (
                        <p>{t('noNews')}</p>
                    )}
                </div>
                {totalPages > 1 && (
                    <div className="pagination">
                        <button onClick={() => handlePageChange(page - 1)} disabled={!links.previous}>
                            {t('previousPage')}
                        </button>
                        <span>{t('pageCount', { page, totalPages })}</span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={!links.next}>
                            {t('nextPage')}
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default NewsPage;
