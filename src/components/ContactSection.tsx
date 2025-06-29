import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Instagram } from 'lucide-react';
import Earth from './Earth';
import emailjs from 'emailjs-com';
import { toast } from '@/hooks/use-toast';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_USER_ID'
      );

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.4,
      rotateY: 180,
      rotateX: -90,
      z: -300
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      z: 0,
      transition: {
        duration: 2.2,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.2,
      rotateY: -180,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          exit="exit"
          className="text-4xl lg:text-6xl font-bold text-center mb-16 text-gradient perspective-1000"
        >
          Contact Me
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -20 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-effect rounded-2xl p-8">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl font-bold text-space-violet mb-6"
              >
                Let's Connect
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-gray-300 mb-8"
              >
                Ready to embark on a cosmic journey together? Drop me a message and let's explore the infinite possibilities!
              </motion.p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-space-deep/50 border-space-purple/30 text-white placeholder-gray-400 focus:border-space-violet transition-all duration-300 hover:border-space-violet/50"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-space-deep/50 border-space-purple/30 text-white placeholder-gray-400 focus:border-space-violet transition-all duration-300 hover:border-space-violet/50"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-space-deep/50 border-space-purple/30 text-white placeholder-gray-400 focus:border-space-violet resize-none transition-all duration-300 hover:border-space-violet/50"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-space-purple to-space-violet hover:from-space-violet hover:to-space-pink text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.div>
              </form>
              
              {/* Social Media Links */}
              <div className="mt-8 pt-6 border-t border-space-purple/20">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.6 }}
                  className="text-gray-300 text-center mb-4"
                >
                  Connect with me
                </motion.p>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="p-3 rounded-full bg-space-purple/20 border border-space-purple/30 hover:bg-space-violet hover:border-space-violet transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-space-violet group-hover:text-white transition-colors duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3D Earth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-96 lg:h-[500px]"
          >
            <Suspense fallback={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full flex items-center justify-center text-space-violet"
              >
                Loading...
              </motion.div>
            }>
              <Earth />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
