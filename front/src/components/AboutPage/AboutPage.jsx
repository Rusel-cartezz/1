import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptop, FaTools, FaClock, FaMoneyBillWave, FaUserTie } from 'react-icons/fa';
import './AboutPage.css';

export const AboutPage = () => {
  const features = [
    {
      icon: <FaLaptop />,
      title: "Современное оборудование",
      description: "Используем профессиональные инструменты и диагностические системы"
    },
    {
      icon: <FaTools />,
      title: "Оригинальные запчасти",
      description: "Работаем только с проверенными поставщиками комплектующих"
    },
    {
      icon: <FaClock />,
      title: "Быстрый ремонт",
      description: "90% ремонтов выполняем в течение 1-2 дней"
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Гарантия 1 год",
      description: "Даем официальную гарантию на все виды работ"
    }
  ];

  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-section">
        <div className="hero-content">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Компьютерный сервис "Эксперт"
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Профессиональный ремонт техники с 2010 года
          </motion.p>
        </div>
      </div>

      <div className="about-content">
        <motion.section 
          className="intro-section"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>Наша история</h2>
          <p>
            Мы начали свою деятельность как небольшая мастерская по ремонту компьютеров. 
            За 10+ лет работы мы выросли в полноценный сервисный центр с командой 
            из 15 профессиональных инженеров.
          </p>
        </motion.section>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.section 
          className="team-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2>Наша команда</h2>
          <div className="team-members">
            <div className="member-card">
              <div className="member-photo"><FaUserTie /></div>
              <h3>Руслан Г.</h3>
              <p>Главный инженер, стаж 12 лет</p>
            </div>
            <div className="member-card">
              <div className="member-photo"><FaUserTie /></div>
              <h3>Анна М.</h3>
              <p>Специалист по ноутбукам, стаж 8 лет</p>
            </div>
            <div className="member-card">
              <div className="member-photo"><FaUserTie /></div>
              <h3>Дмитрий С.</h3>
              <p>Эксперт по восстановлению данных</p>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};