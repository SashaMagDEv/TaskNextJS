import React, { useEffect, useState } from 'react';
import { usePathname, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getNewsById, getCategoryById } from '../app/api';
import { News, Category } from '../../src/types/types';

const Breadcrumbs: React.FC = () => {
    const pathname = usePathname();
    const params = useParams();
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [newsTitle, setNewsTitle] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null); // Додати стан для categoryId
    const router = useRouter();

    const category_id = Array.isArray(params.category_id) ? params.category_id[0] : params.category_id;
    const new_id = Array.isArray(params.new_id) ? params.new_id[0] : params.new_id;

    useEffect(() => {
        const fetchData = async () => {
            if (new_id) {
                try {
                    const news = await getNewsById(new_id);
                    setNewsTitle(news.title);
                    const category = await getCategoryById(news.category_id.toString());
                    setCategoryName(category.name);
                    setCategoryId(category.id.toString()); // Зберегти categoryId
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            } else if (category_id) {
                try {
                    const category = await getCategoryById(category_id as string);
                    setCategoryName(category.name);
                    setCategoryId(category.id.toString()); // Зберегти categoryId
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
