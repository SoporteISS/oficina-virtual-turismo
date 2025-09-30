import React, { useEffect, useState } from 'react';

interface Announcement {
  id: string;
  message: string;
  priority: 'polite' | 'assertive';
}

const ScreenReaderAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Escuchar eventos personalizados para anuncios
    const handleAnnouncement = (event: CustomEvent) => {
      const { message, priority = 'polite' } = event.detail;
      const announcement: Announcement = {
        id: Date.now().toString(),
        message,
        priority
      };

      setAnnouncements(prev => [...prev, announcement]);

      // Limpiar anuncio después de 3 segundos
      setTimeout(() => {
        setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
      }, 3000);
    };

    window.addEventListener('announce', handleAnnouncement as EventListener);

    return () => {
      window.removeEventListener('announce', handleAnnouncement as EventListener);
    };
  }, []);

  return (
    <div className="sr-only">
      {announcements.map(announcement => (
        <div
          key={announcement.id}
          aria-live={announcement.priority}
          aria-atomic="true"
        >
          {announcement.message}
        </div>
      ))}
    </div>
  );
};

// Función helper para hacer anuncios desde cualquier componente
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const event = new CustomEvent('announce', {
    detail: { message, priority }
  });
  window.dispatchEvent(event);
};

export default ScreenReaderAnnouncements;