import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaPhoneAlt } from 'react-icons/fa';
import { ServiceSection } from './ServiceSection';
import { MasterSection } from './MasterSection';
import './MainContent.css';

export const MainContent = () => {
  const services = [
    "Диагностика неисправностей",
    "Настройка компьютеров",
    "Удаление вредоносного ПО",
    "Замена-сборка комплектующих",
    "Установка защиты от вирусов"
  ];

  return (
    <div className="page-container">
      <motion.div 
        className="main-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="hero-title">
              Мастер Руслан
              <span className="hero-subtitle">Ремонт компьютеров и ноутбуков</span>
            </h1>
            <motion.button 
              className="hero-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhoneAlt className="button-icon" />
              Бесплатная консультация
            </motion.button>
          </motion.div>
          <motion.div 
            className="services-list"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="service-item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaCheck className="check-icon" />
                <span>{service}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <ServiceSection/>
      <MasterSection/>
    </div>
  );
};