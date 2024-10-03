"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/models/category.model';

import './category_list.css';

interface CategoryListProps {
    categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`categories/${id}`);
    };

    return (
        <div className="category_container">
            {categories.map(category => (
                <div key={category.id}
                     className="category_card"
                     onClick={() => handleClick(category.id)}
                >
                    {category.name}
                </div>
            ))}
        </div>
    );
};

export default CategoryList;