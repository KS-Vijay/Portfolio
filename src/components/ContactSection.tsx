import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Suspense } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Instagram } from 'lucide-react';
import Earth from './Earth';
import emailjs from 'emailjs-com';
import { toast } from '@/hooks/use-toast';

// List of common disposable email domains
const disposableDomains = [
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com',
  'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com',
  'fakeinbox.com', 'mintemail.com', 'maildrop.cc', 'mytemp.email',
  'throwawaymail.com', 'sharklasers.com', 'spamgourmet.com',
  'mailnesia.com', 'emailondeck.com', 'moakt.com', 'mailcatch.com',
  'inboxkitten.com', 'tmail.ws', 'tempail.com', 'luxusmail.org',
  'temp-mail.org', 'temp-mail.io', 'temp-mail.com', 'temp-mail.net',
  'temp-mail.xyz', 'temp-mail.info', 'temp-mail.biz', 'temp-mail.top',
  'tempmail.net', 'tempmail.org', 'tempmail.xyz', 'tempmail.email',
  'tempmail.lol', 'tempmail.plus', 'tempmail.site', 'tempmail.space',
  'tempmail.us', 'tempmail.work', 'tempmailbox.com', 'tempmails.net',
  'tempr.email', 'throwawayemail.com', 'trashmail.de', 'yopmail.net',
  'yopmail.fr', 'yopmail.org', 'yopmail.info', 'yopmail.biz', 'yopmail.co',
  'yopmail.net', 'yopmail.org', 'yopmail.info', 'yopmail.biz', 'yopmail.co',
  'yopmail.net', 'yopmail.org', 'yopmail.info', 'yopmail.biz', 'yopmail.co',
];

function isValidEmail(email: string): boolean {
  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  // Check for disposable domain
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && disposableDomains.some(d => domain.endsWith(d))) return false;
  return true;
}

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

    // Email validation
    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid, non-temporary email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
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
    { icon: Github, href: 'https://github.com/KS-Vijay', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/vj-ks/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/_._ksvj_._/', label: 'Instagram' },
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
    <section id="contact" data-section="contact" ref={ref} className="min-h-screen py-20 relative z-10 w-full overflow-hidden">
      <AnimatedSection className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <div style={{ color: '#34d399', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>— Say Hello</div>
          <h2 style={{ color: '#e2f5ef', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, lineHeight: 1.15 }}>
            Contact Me
          </h2>
          <div style={{ width: '48px', height: '3px', borderRadius: '2px', background: 'linear-gradient(90deg, #34d399, #22d3ee)', marginTop: '12px', marginBottom: '40px' }} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
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
                    className="w-full py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(52,211,153,0.9), rgba(34,211,238,0.9))',
                      color: '#050d1a',
                      border: 'none',
                      boxShadow: '0 4px 14px rgba(52,211,153,0.25)',
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.div>
              </form>
              
              {/* Social Media Links (Footer) */}
              <div className="mt-8 pt-6 border-t border-[rgba(52,211,153,0.15)]">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.6 }}
                  className="text-[rgba(226,245,239,0.55)] text-center mb-4"
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
                      className="p-3 rounded-full bg-[rgba(52,211,153,0.06)] border border-[rgba(52,211,153,0.15)] hover:bg-[rgba(52,211,153,0.12)] hover:border-[rgba(52,211,153,0.45)] transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-[#34d399] group-hover:text-[#e2f5ef] transition-colors duration-300" />
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
      </AnimatedSection>
    </section>
  );
};

export default ContactSection;
