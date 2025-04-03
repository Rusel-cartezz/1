import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import './ServiceSection.css';

const additionalServices = [
  "Восстановление данных",
  "Чистка от пыли и замена термопасты",
  "Ремонт материнских плат",
  "Настройка Wi-Fi и сетей",
  "Установка программного обеспечения",
  "Ремонт блоков питания"
];

export const ServiceSection = () => {
  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-title">Дополнительные услуги</h2>
        <div className="services-grid">
          {additionalServices.map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <FaCheck className="service-icon" />
              <span>{service}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};