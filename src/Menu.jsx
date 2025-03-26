import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import menuData from './menu.json';
import './Menu.css'; // Import the CSS file

const MenuSection = ({ title, items }) => (
    <section>
        <h2>{title}</h2>
        {items.map((item, index) => (
            <article key={index} className="menu-item">
                <h3>{item.name}</h3>
                <img src={item.image} alt={item.name} className="menu-item-image" />
                <p><strong>Beskrivelse:</strong> {item.description}</p>
                <p><strong>Pris:</strong> {item.price}</p>
                <p><strong>Allergener:</strong> {item.allergens}</p>
            </article>
        ))}
    </section>
);

const Menu = () => {
    const [menu, setMenu] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('forretter');
    const [allergenFilters, setAllergenFilters] = useState([]);

    useEffect(() => {
        setMenu(menuData);
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleAllergenFilterChange = (allergen) => {
        setAllergenFilters((prevFilters) =>
            prevFilters.includes(allergen)
                ? prevFilters.filter((filter) => filter !== allergen)
                : [...prevFilters, allergen]
        );
    };

    const filteredItems = menu[selectedCategory]?.filter((item) =>
        allergenFilters.every((filter) => !item.allergens.includes(filter))
    );

    const allergens = [
        'Bløtdyr',
        'Melk',
        'Hvete (gluten)',
        'Fisk',
        'Skalldyr',
        'Egg',
        'Sennep',
    ];

    return (
        <div>
            <header>
                <h1>Menu</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/meny">Meny</Link></li>
                        <li><Link to="/tables">Bordbestilling</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="menu-controls">
                <div className="category-selector">
                    <button onClick={() => handleCategoryChange('forretter')} className={selectedCategory === 'forretter' ? 'active' : ''}>Forretter</button>
                    <button onClick={() => handleCategoryChange('hovedretter')} className={selectedCategory === 'hovedretter' ? 'active' : ''}>Hovedretter</button>
                    <button onClick={() => handleCategoryChange('desserter')} className={selectedCategory === 'desserter' ? 'active' : ''}>Desserter</button>
                </div>
                <p>Allergener:</p>
                <div className="allergen-filters">
                    {allergens.map((allergen) => (
                        <label key={allergen}>
                            <input
                                type="checkbox"
                                value={allergen}
                                onChange={() => handleAllergenFilterChange(allergen)}
                            />
                            {allergen}
                        </label>
                    ))}
                </div>
            </div>
            {filteredItems && <MenuSection title={selectedCategory} items={filteredItems} />}
            <footer>
                <p>&copy; 2023 Havetsskatter. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Menu;