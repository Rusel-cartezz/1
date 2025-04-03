import React, { useState } from 'react';
import { FaQuoteLeft, FaStar, FaRegStar, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Reviews.css';

export const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Анна К.',
      rating: 5,
      text: 'Отличный сервис! Починили ноутбук за 1 день, когда другие мастерские обещали неделю. Цены адекватные, мастера вежливые. Рекомендую!',
      date: '15.05.2023',
      avatar: null
    },
    {
      id: 2,
      name: 'Анна К.',
      rating: 5,
      text: 'Отличный сервис! Починили ноутбук за 1 день, когда другие мастерские обещали неделю. Цены адекватные, мастера вежливые. Рекомендую!',
      date: '15.05.2023',
      avatar: null
    },
    {
      id: 3,
      name: 'Анна К.',
      rating: 5,
      text: 'Отличный сервис! Починили ноутбук за 1 день, когда другие мастерские обещали неделю. Цены адекватные, мастера вежливые. Рекомендую!',
      date: '15.05.2023',
      avatar: null
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: '',
    avatar: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewToAdd = {
      ...newReview,
      id: reviews.length + 1,
      date: new Date().toLocaleDateString('ru-RU')
    };
    setReviews([...reviews, reviewToAdd]);
    setNewReview({ name: '', rating: 5, text: '', avatar: null });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  return (
    <motion.div 
      className="reviews-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="reviews-header">
        <h1 className="reviews-title">Отзывы наших клиентов</h1>
        <div className="rating-summary">
          <div className="average-rating">
          
          </div>
        </div>
      </div>

      <div className="reviews-grid">
        <AnimatePresence>
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              layout
            >
              <div className="review-header">
                {review.avatar ? (
                  <img src={review.avatar} alt="Аватар" className="review-avatar" />
                ) : (
                  <FaUserCircle className="review-avatar default" />
                )}
                <div className="reviewer-info">
                  <span className="author-name">{review.name}</span>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  i < review.rating ? 
                    <FaStar key={i} className="star filled" /> : 
                    <FaRegStar key={i} className="star" />
                ))}
              </div>
              <FaQuoteLeft className="quote-icon" />
              <p className="review-text">{review.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        className="add-review"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2>Оставить отзыв</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Имя:</label>
            <input 
              type="text" 
              value={newReview.name} 
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              placeholder="Введите ваше имя"
              required
            />
          </div>
          <div className="form-group">
            <label>Оценка:</label>
            <div className="rating-input">
              {[...Array(5)].map((_, i) => (
                i < newReview.rating ? 
                  <FaStar key={i} className="star filled" onClick={() => handleRatingChange(i + 1)} /> : 
                  <FaRegStar key={i} className="star" onClick={() => handleRatingChange(i + 1)} />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Отзыв:</label>
            <textarea 
              value={newReview.text} 
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              placeholder="Введите ваш отзыв"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Отправить отзыв</button>
        </form>
      </motion.div>
    </motion.div>
  );
};
