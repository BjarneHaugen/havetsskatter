import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Tables.css';

const Tables = () => {
    const [selectedTable, setSelectedTable] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState(''); 
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost:5000/reservations');
                const data = await response.json();
                setReservations(data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const isTableBusy = (table) => {
        return reservations.some(reservation => 
            reservation.table === table && 
            reservation.date === date && 
            reservation.time <= time && 
            reservation.endTime > time
        );
    };

    const handleTableClick = (table) => {
        if (!isTableBusy(table)) {
            setSelectedTable(table);
        } else {
            alert(`Table ${table} is already reserved at this time.`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservation = {
            table: selectedTable,
            date,
            time,
            endTime: calculateEndTime(time),
            name, 
        };

        console.log('Sending reservation:', reservation);

        try {
            const response = await fetch('http://localhost:5000/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservation),
            });

            console.log('Response:', response);

            if (response.ok) {
                alert(`Table ${selectedTable} reserved for ${date} from ${time} to ${calculateEndTime(time)}`);
                setReservations([...reservations, reservation]);
            } else {
                alert('Failed to save reservation');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save reservation');
        }
    };

    const calculateEndTime = (startTime) => {
        const [hours, minutes] = startTime.split(':');
        const endTime = new Date();
        endTime.setHours(parseInt(hours) + 2);
        endTime.setMinutes(parseInt(minutes));
        return endTime.toTimeString().slice(0, 5);
    };

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 11; hour <= 22; hour++) {
            const hourString = hour.toString().padStart(2, '0');
            times.push(`${hourString}:00`);
            times.push(`${hourString}:30`);
        }
        return times;
    };

    return (
        <div>
            <header>
                <h1>Bordbestilling</h1>
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
                    <h2>Plassering av bord</h2>
                    <div className="table-layout">
                        <div className="row">
                            <div className={`table ${selectedTable === 'B1' ? 'selected' : ''} ${isTableBusy('B1') ? 'busy' : ''}`} onClick={() => handleTableClick('B1')}>B1</div>
                            <div className={`table ${selectedTable === 'B2' ? 'selected' : ''} ${isTableBusy('B2') ? 'busy' : ''}`} onClick={() => handleTableClick('B2')}>B2</div>
                            <div className={`table ${selectedTable === 'B3' ? 'selected' : ''} ${isTableBusy('B3') ? 'busy' : ''}`} onClick={() => handleTableClick('B3')}>B3</div>
                        </div>
                        <div className="row">
                            <div className={`table ${selectedTable === 'B4' ? 'selected' : ''} ${isTableBusy('B4') ? 'busy' : ''}`} onClick={() => handleTableClick('B4')}>B4</div>
                            <div className={`table ${selectedTable === 'B5' ? 'selected' : ''} ${isTableBusy('B5') ? 'busy' : ''}`} onClick={() => handleTableClick('B5')}>B5</div>
                            <div className={`table ${selectedTable === 'B6' ? 'selected' : ''} ${isTableBusy('B6') ? 'busy' : ''}`} onClick={() => handleTableClick('B6')}>B6</div>
                        </div>
                        <div className="row">
                            <div className={`table ${selectedTable === 'T1' ? 'selected' : ''} ${isTableBusy('T1') ? 'busy' : ''}`} onClick={() => handleTableClick('T1')}>T1</div>
                            <div className={`table ${selectedTable === 'T2' ? 'selected' : ''} ${isTableBusy('T2') ? 'busy' : ''}`} onClick={() => handleTableClick('T2')}>T2</div>
                            <div className={`table ${selectedTable === 'T3' ? 'selected' : ''} ${isTableBusy('T3') ? 'busy' : ''}`} onClick={() => handleTableClick('T3')}>T3</div>
                            <div className={`table ${selectedTable === 'T4' ? 'selected' : ''} ${isTableBusy('T4') ? 'busy' : ''}`} onClick={() => handleTableClick('T4')}>T4</div>
                            <div className={`table ${selectedTable === 'T5' ? 'selected' : ''} ${isTableBusy('T5') ? 'busy' : ''}`} onClick={() => handleTableClick('T5')}>T5</div>
                        </div>
                        <div className="row">
                            <div className={`table large ${selectedTable === 'B7' ? 'selected' : ''} ${isTableBusy('B7') ? 'busy' : ''}`} onClick={() => handleTableClick('B7')}>B7</div>
                        </div>
                    </div>
                    <ul className="table-description">
                        <li><strong>B1, B2, B3:</strong> Fireseter langs vinduet.</li>
                        <li><strong>B4, B5, B6:</strong> Fireseter i midten av rommet.</li>
                        <li><strong>T1, T2, T3, T4, T5:</strong> Toseterbord.</li>
                        <li><strong>B7:</strong> Større bord for grupper (6-8 personer).</li>
                    </ul>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Navn:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="date">Dato:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="time">Tid:</label>
                            <select
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            >
                                <option value="">Velg tid</option>
                                {generateTimeOptions().map((timeOption) => (
                                    <option key={timeOption} value={timeOption}>
                                        {timeOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" disabled={!selectedTable}>Reserver</button>
                    </form>
                </section>
            </main>
            <footer>
                <p>&copy; 2023 Havetsskatter. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Tables;