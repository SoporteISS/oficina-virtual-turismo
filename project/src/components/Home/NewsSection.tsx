import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ArrowRight } from 'lucide-react';

const NewsSection: React.FC = () => {
  const { t } = useTranslation();

  const newsItems = [
    {
      id: 1,
      title: "Nueva señalización en la Ruta del Alba",
      excerpt: "Se ha completado la instalación de nueva señalización interpretativa a lo largo de todo el recorrido.",
      image: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      date: "2024-01-15",
      category: "Infraestructuras"
    },
    {
      id: 2,
      title: "Festival de Música Folk en Cangas de Onís",
      excerpt: "Del 20 al 22 de marzo se celebrará la décima edición del Festival de Música Tradicional Asturiana.",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      date: "2024-01-10",
      category: "Eventos"
    },
    {
      id: 3,
      title: "Apertura del nuevo Centro de Interpretación",
      excerpt: "El Centro de Interpretación de la Naturaleza abre sus puertas con exposiciones interactivas.",
      image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      date: "2024-01-08",
      category: "Patrimonio"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Noticias y Novedades
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Mantente informado sobre las últimas actualizaciones del destino
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </div>
              </div>
              
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.excerpt}
                </p>
                
                <button className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg p-1">
                  Leer más
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 inline-flex items-center">
            Ver todas las noticias
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;