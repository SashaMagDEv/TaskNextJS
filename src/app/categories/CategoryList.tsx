"use client";


import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CategoryList.module.css';
import { Category } from '../../types/types';



interface CategoryListProps {
    categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`categories/${id}`);
    };

    return (
        <div className={styles.categoryContainer}>
            {categories.map(category => (
                <div key={category.id}
                     className={styles.categoryCard}
                     onClick={() => handleClick(category.id)}
                >
                    {category.name}
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
