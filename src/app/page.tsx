import React from 'react';
import { fetchCategories } from '@/services/categories.service';
import CategoryList from '../../pages/categories/CategoryList';

const HomePage = async () => {
    const categories = await fetchCategories();

    return (
        <main>
            <h1 style={{textAlign: "center"}}>Категорії</h1>
            <CategoryList categories={categories} />
        </main>
    );
};

export default HomePage;
