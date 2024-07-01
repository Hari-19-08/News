import React, { useState, useEffect } from 'react';
import Nav from '../components/adminNav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Nav />
            <div className='search-bar'>
                <input
                    type='text'
                    placeholder='Search news'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className='outer'>
                {filteredBooks.map((book, index) => (
                    <div className='book' key={index}>
                        <div>
                            <img src={book.image} alt='Book' className='image' />
                            <div className='name'>{book.name}</div>
                            <div className='description'>{book.description}</div>
                            <div className='review'>
                                {book.reviews.map((review, index) => (
                                    <div key={index}>
                                        <div className='reviewuser'>{review.user}</div>
                                        <div className='reviewcomment'>{review.review}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
