"use client"

import { motion } from "framer-motion"
import { memo } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Brain, Layers, Zap, Sparkles, Wand2, Cpu } from "lucide-react"


export function FeaturesSection() {
	const features = [
    {
      icon: Brain,
      title: 'Neural Background Removal',
      description: 'Advanced AI algorithms instantly detect and remove backgrounds with quantum precision, preserving every detail of your subject.',
    },
    {
      icon: Layers,
      title: 'Quantum Upscaling',
      description: 'Enhance resolution up to 16K using proprietary neural networks that reconstruct missing pixels with photorealistic accuracy.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Process complex edits in milliseconds with our distributed GPU clusters optimized for real-time creative workflows.',
    },
    {
      icon: Sparkles,
      title: 'Style Transfer Magic',
      description: 'Transform any image with artistic styles using generative adversarial networks trained on millions of masterpieces.',
    },
    {
      icon: Wand2,
      title: 'One-Click Enhancement',
      description: 'Automatically optimize lighting, color balance, and composition using computer vision and machine learning.',
    },
    {
      icon: Cpu,
      title: 'Smart Object Detection',
      description: 'Identify and isolate any object or person with pixel-perfect precision using advanced semantic segmentation.',
    },
  ];

	return (
		<section id="features" className="relative py-24 text-white">
			<div className="max-w-6xl mx-auto px-6">
				<h2 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
					Why creators choose Pixxel
				</h2>
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{(features || []).map((f, index) => (
						<FeatureCard key={f.title} {...f} delay={index} />
					))}
				</div>
			</div>
		</section>
	)
}

function FeatureCardBase({
  icon: IconComponent,
  title,
  description,
  delay = 0,
  onHover = () => {},
}) {
	const { setNode, isIntersecting } = useIntersectionObserver({ threshold: 0.15 })

	 return (
    <motion.div
      ref={setNode}
      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
      }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
      >
        {IconComponent ? <IconComponent className="w-8 h-8 text-white" /> : null}
      </motion.div>
      
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
        {description}
      </p>
    </motion.div>
  );

}

const FeatureCard = memo(FeatureCardBase)



