import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function PricingSection() {
  const plans = [
    {
      id: "free_user",
      plan: 'Starter',
      price: 0,
      features: [
        "3 projects maximum",
        "20 exports per month",
        "Basic crop & resize",
        "Color adjustments",
        "Text Tool",
      ],
      buttonText: 'Get Started Free',
    },
    {
      id: "pro_user",
      plan: 'Professional',
      price: 49,
      features: [
        "Unlimited projects",
        "Unlimited exports",
        "All Editing Tools",
        "AI Background Remover",
        "AI Image Extender",
        "AI Retouch, Upscaler and more",
      ],
      featured: true,
      planId: "cplan_31VBnkr0T0HMdINpF7hgitu8G72",
      buttonText: 'Unleash Power',
    },
  ];

  

  return (
    <section id="pricing" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Creative Journey
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From individual creators to enterprise teams, find the perfect plan 
            to transform your creative workflow with AI precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-10">
          {(plans || []).map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan.plan}
              price={plan.price}
              features={plan.features}
              featured={plan.featured}
              buttonText={plan.buttonText}
              id={plan.id}
              planId={plan.planId}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const PricingCard = ({
  plan,
  price,
  features = [],
  featured = false,
  buttonText,
  id,
  planId,
}) => {

  const router = useRouter();
  const { isSignedIn, has } = useAuth();

  const isCurrentPlan = id ? has?.({plan: id}) : false;


  const handlePopup = async () => {
    if (isCurrentPlan) return;

    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    try {
      if (window.Clerk && window.Clerk.__internal_openCheckout) {
        await window.Clerk.__internal_openCheckout({
          planId: planId,
          planPeriod: 'month',
          subscriberType: 'user',
        });
      }
    } catch (error) {
      console.error('Checkout error', error);
      toast.error('Somthing went wrong' + error.message);
    }
  };

  return (
    <motion.div
      className={`relative backdrop-blur-lg border rounded-3xl p-8 transition-all duration-500 ${
        featured
          ? 'bg-white/10 border-blue-400/50 shadow-2xl shadow-blue-500/20 scale-105'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: featured ? 1.08 : 1.02,
        rotateY: 3,
      }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
    >
      {featured && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star className="w-4 h-4" />
          <span>Most Popular</span>
        </motion.div>
      )}

      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-4 ${featured ? 'text-blue-300' : 'text-white'}`}>
          {plan}
        </h3>
        <div className="mb-6">
          <span className={`text-5xl font-bold ${featured ? 'text-white' : 'text-gray-200'}`}>
            ${price}
          </span>
          <span className="text-gray-400 text-lg">/month</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {(features || []).map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-center space-x-3 text-gray-300"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              featured ? 'bg-blue-500/20' : 'bg-white/10'
            }`}>
              <Check className={`w-4 h-4 ${featured ? 'text-blue-400' : 'text-gray-300'}`} />
            </div>
            <span className="leading-relaxed">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        className={`w-full py-4 rounded-full text-lg font-semibold transition-all duration-300 cursor-pointer border-1 border-white ${
          featured
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/25'
            : 'backdrop-blur-lg bg-white/10 border border-white/20 text-white hover:bg-white/20'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePopup}
        disabled={isCurrentPlan || !planId}
      >
        {isCurrentPlan ? "Current Plan" : buttonText}
      </motion.button>
    </motion.div>
  );
};

