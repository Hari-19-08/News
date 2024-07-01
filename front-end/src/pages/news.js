import React, { useState, useEffect } from 'react';
import Nav from '../components/topNav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home() {
    const [book, setBook] = useState(null); // Initialize to null
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getAllBooks();
    }, [id]); // Add id as a dependency

    const getAllBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/singlebooks/${id}`);
            setBook(response.data); // Ensure response.data is assigned correctly
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    if (!book) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <Nav />
            <div className='outer'>
                <div className='book2'>
                    <div>
                        <img src={book.image} alt='Book' className='image2' />
                        <div className='name2'>{book.name}</div>
                        <div className='description2' >{book.description}</div>
                        <div className='review2'>
                            {book.reviews && book.reviews.map((review, index) => (
                                <div key={index}>
                                    <div className='reviewuser'>{review.user}</div>
                                    <div className='reviewcomment'>{review.review}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
