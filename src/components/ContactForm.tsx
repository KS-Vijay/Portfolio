import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

const inputStyle = {
  width: '100%',
  background: 'rgba(10,22,40,0.8)',
  border: '1px solid rgba(52,211,153,0.18)',
  borderRadius: '8px',
  padding: '12px 16px',
  color: '#e2f5ef',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export function ContactForm() {
  const [form, setForm]     = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('sent');
      setForm({ name:'', email:'', message:'' });
    } catch { setStatus('error'); }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px', width:'100%', maxWidth:'520px', margin:'0 auto' }}>
      <input
        type="text" placeholder="Your name" required
        value={form.name} onChange={e => setForm({...form, name:e.target.value})}
        style={inputStyle}
        onFocus={e  => (e.target.style.borderColor = 'rgba(52,211,153,0.55)')}
        onBlur={e   => (e.target.style.borderColor = 'rgba(52,211,153,0.18)')}
      />
      <input
        type="email" placeholder="Your email" required
        value={form.email} onChange={e => setForm({...form, email:e.target.value})}
        style={inputStyle}
        onFocus={e  => (e.target.style.borderColor = 'rgba(52,211,153,0.55)')}
        onBlur={e   => (e.target.style.borderColor = 'rgba(52,211,153,0.18)')}
      />
      <textarea
        placeholder="Your message" required rows={5}
        value={form.message} onChange={e => setForm({...form, message:e.target.value})}
        style={{...inputStyle, resize:'none'}}
        onFocus={e  => (e.target.style.borderColor = 'rgba(52,211,153,0.55)')}
        onBlur={e   => (e.target.style.borderColor = 'rgba(52,211,153,0.18)')}
      />
      <button type="submit" disabled={status==='sending'} style={{
        background: status==='sent' ? 'rgba(52,211,153,0.15)' : 'linear-gradient(135deg,#34d399,#22d3ee)',
        color: status==='sent' ? '#34d399' : '#050d1a',
        fontWeight: 600, padding:'13px', borderRadius:'8px',
        border: status==='sent' ? '1px solid rgba(52,211,153,0.35)' : 'none',
        cursor: status==='sending' ? 'not-allowed' : 'pointer',
        fontSize:'15px', transition:'all 0.2s', opacity: status==='sending' ? 0.6 : 1,
      }}>
        {status==='sending' ? 'Sending…' : status==='sent' ? 'Message sent ✓' : 'Send message'}
      </button>
      {status==='error' && (
        <p style={{color:'#f87171', fontSize:'13px', textAlign:'center'}}>Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
