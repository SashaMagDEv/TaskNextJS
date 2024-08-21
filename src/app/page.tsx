import React from 'react';
import { fetchCategories } from './api';
import CategoryList from './categories/CategoryList';

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
