import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const StatsSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  const stats = [
    {
      value: useAnimatedCounter(1000000, 2000, isVisible),
      target: 1000000,
      suffix: '+',
      label: 'Images Enhanced',
      gradient: 'from-blue-400 to-cyan-400',
    },
    {
      value: useAnimatedCounter(50000, 2200, isVisible),
      target: 50000,
      suffix: '+',
      label: 'Active Creators',
      gradient: 'from-purple-400 to-pink-400',
    },
    {
      value: useAnimatedCounter(99, 1800, isVisible),
      target: 99,
      suffix: '%',
      label: 'Satisfaction Rate',
      gradient: 'from-cyan-400 to-blue-400',
    },
    {
      value: useAnimatedCounter(24, 1500, isVisible),
      target: 24,
      suffix: '/7',
      label: 'AI Processing',
      gradient: 'from-pink-400 to-purple-400',
    },
  ];

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powered by{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Innovation
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join millions of creators who trust our AI technology to bring their visions to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={`text-xl md:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-4`}
              >
                {stat.value.toLocaleString()}{stat.suffix}
              </motion.div>
              <p className="text-gray-300 text-lg font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;