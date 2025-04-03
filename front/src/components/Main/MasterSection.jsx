import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaPhoneAlt } from 'react-icons/fa';
import './MasterSection.css';

export const MasterSection = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="image-frame">
              <FaUserTie className="master-icon" />
            </div>
          </motion.div>
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">О мастере</h2>
            <p>Приветствую! Я Руслан - профессиональный мастер по ремонту компьютеров и ноутбуков с 10-летним опытом работы.</p>
            <p>Специализируюсь на комплексном решении проблем любой сложности - от замены комплектующих до ремонта материнских плат на компонентном уровне.</p>
            <p>Использую только профессиональное оборудование и качественные запчасти. Гарантирую честную диагностику и прозрачные цены.</p>
            <button className="cta-button">
              <FaPhoneAlt /> Записаться на ремонт
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};