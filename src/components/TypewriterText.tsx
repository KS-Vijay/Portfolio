import { useEffect, useState } from 'react';

const ROLES = [
  'Aspiring ML Engineer',
  'AI / ML Enthusiast',
  'Full Stack Developer',
];

export function TypewriterText() {
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length)
          setTimeout(() => setIsDeleting(true), 1800);
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex(i => (i + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 42 : 88);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <span style={{ color: '#e2f5ef' }}>
      {displayed}
      <span style={{
        color: '#34d399',
        animation: 'blink 1.1s step-end infinite',
      }}>|</span>
    </span>
  );
}
