import React, { useState, useEffect } from 'react';
import Nav from '../components/user';
import axios from 'axios';
import '../styles/home.css';
import { useParams, useNavigate } from 'react-router-dom';

function Home() {
    const [books, setBooks] = useState([]);
    const [val, setvalue] = useState({});
    const navigate = useNavigate();

    const { id } = useParams();

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

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

    const SendReview = async (e) => {
        try {
            console.log(val)
            const create = await axios.post(`http://localhost:5000/reviews/${id}/${e}`, val);
            if (create.data) {
                // navigate(`/manager/${val.id}`);
                window.location.reload();
            } else if (create.data === "done") {
                alert("not")
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    return (
        <div>
            <Nav />
            <div className='outer'>
                {books.map((book, index) => (
                    <div className='book'>
                        <div key={index}>
                            <div><img src={book.image} alt='Book' className='image' /></div>
                            <div className='name'>{book.name}</div>
                            <div className='description'>{book.description}</div>
                            <div className='review'>
                            {book.reviews.map((review, index) => (
                            <div>
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
