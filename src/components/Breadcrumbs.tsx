import React, { useEffect, useState } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { getCategoryById } from '@/services/categories.service';
import { getNewsById } from '@/services/news.service';

const Breadcrumbs: React.FC = () => {
    const pathname = usePathname();
    const params = useParams();
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [newsTitle, setNewsTitle] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const category_id = Array.isArray(params.category_id) ? params.category_id[0] : params.category_id;
    const new_id = Array.isArray(params.new_id) ? params.new_id[0] : params.new_id;

    useEffect(() => {
        const fetchData = async () => {
            if (new_id) {
                try {
                    const news = await getNewsById(new_id);
                    if (news) {
                        setNewsTitle(news.title);
                        const category = await getCategoryById(news.category_id.toString());
                        if (category) {
                            setCategoryName(category.name);
                            setCategoryId(category.id.toString());
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            } else if (category_id) {
                try {
                    const category = await getCategoryById(category_id as string);
                    if (category) {
                        setCategoryName(category.name);
                        setCategoryId(category.id.toString());
                    }
                } catch (error) {
                    console.error('Failed to fetch category:', error);
                }
            }
        };

        fetchData();
    }, [new_id, category_id]);

    return (
        <nav aria-label="breadcrumb">
            <ol style={{ display: 'flex' }}>
                <li>
                    <Link href="/">Категорії</Link> /
                </li>
                {categoryName && categoryId ? (
                    <li>
                        <Link href={`/categories/${categoryId}`}>
                            {categoryName}
                        </Link> /
                    </li>
                ) : (
                    <li>
                        <span>Завантаження...</span>
                    </li>
                )}
                {newsTitle && (
                    <li style={{ display: 'inline', marginRight: 5 }}>
                        <span>{newsTitle}</span>
                    </li>
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
