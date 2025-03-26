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

    useEffect(() => {
        setMenu(menuData);
    }, []);

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
            {menu.forretter && <MenuSection title="Forretter" items={menu.forretter} />}
            {menu.hovedretter && <MenuSection title="Hovedretter" items={menu.hovedretter} />}
            {menu.desserter && <MenuSection title="Desserter" items={menu.desserter} />}
            <footer>
                <p>&copy; 2023 Havetsskatter. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Menu;