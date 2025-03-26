import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div>
            <header>
                <h1>Welcome to Havetsskatter</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/meny">Meny</Link></li>
                        <li><Link to="/tables">Bordbestilling</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <section>
                    <h2>Velkommen til Havets Skatter</h2>
                    <p>Havets Skatter er en eksklusiv sjømatrestaurant som tilbyr det beste havet har å
                        by på, tilberedt med lidenskap og presisjon. Vi kombinerer ferske råvarer med
                        klassiske og moderne smaker, og våre dyktige kokker sørger for en
                        matopplevelse du sent vil glemme. Enten du vil nyte et herlig måltid med venner,
                        feire en spesiell anledning, eller bare ønsker å oppleve fantastisk sjømat, er vi
                        her for å servere deg.
                        Vår meny byr på alt fra delikate forretter som røkt laks og blåskjell, til saftige
                        hovedretter som grillet laks og hummer Thermidor. Avslutt måltidet med våre
                        uimotståelige desserter, som vår berømte sitronterte med marengs eller en
                        fyldig sjokolademousse med havsalt.</p>
                    <h2>Lokasjon</h2>
                    <p>Vi holder til i hjertet av Oslo, på Fiskebryggen 12, 0150 Oslo. Med en fantastisk
                        utsikt over Oslofjorden er Havets Skatter det perfekte stedet for en
                        uforglemmelig matopplevelse.</p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2002.123456789!2d10.7460923!3d59.911491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416e8f12345678%3A0x123456789abcdef!2sFiskebryggen%2012%2C%200150%20Oslo!5e0!3m2!1sen!2sno!4v1234567890123!5m2!1sen!2sno"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps - Fiskebryggen 12, 0150 Oslo"
                    ></iframe>
                </section>
            </main>
            <footer>
                <p>&copy; 2023 Havetsskatter. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;