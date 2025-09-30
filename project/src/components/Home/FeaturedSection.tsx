import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Calendar, Users } from 'lucide-react';

const FeaturedSection: React.FC = () => {
  const { t } = useTranslation();

  const featuredRoutes = [
    {
      id: 1,
      name: "Ruta del Alba",
      description: "Un recorrido espectacular por las foces del río Alba",
      image: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      difficulty: "Moderada",
      duration: "4h",
      distance: "12 km",
      rating: 4.8
    },
    {
      id: 2,
      name: "Lagos de Covadonga",
      description: "Paisajes únicos en el corazón de los Picos de Europa",
      image: "https://images.pexels.com/photos/1561020/pexels-photo-1561020.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      difficulty: "Fácil",
      duration: "2h",
      distance: "6 km",
      rating: 4.9
    },
    {
      id: 3,
      name: "Desfiladero de los Beyos",
      description: "Impresionante garganta entre las montañas cantábricas",
      image: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      difficulty: "Difícil",
      duration: "6h",
      distance: "18 km",
      rating: 4.7
    }
  ];

  const featuredAccommodations = [
    {
      id: 1,
      name: "Casa Rural El Mirador",
      description: "Alojamiento tradicional con vistas panorámicas",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      location: "Cangas de Onís",
      capacity: "8 personas",
      rating: 4.6,
      price: "€120/noche"
    },
    {
      id: 2,
      name: "Hotel Rural Los Picos",
      description: "Confort moderno en entorno natural",
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      location: "Arenas de Cabrales",
      capacity: "4 personas",
      rating: 4.8,
      price: "€95/noche"
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Routes */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Rutas Destacadas
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre los senderos más espectaculares de la Montaña Central
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredRoutes.map((route) => (
              <div key={route.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {route.difficulty}
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{route.rating}</span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {route.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {route.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{route.distance}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Accommodations */}
        <div>
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Alojamientos Recomendados
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Lugares únicos donde descansar y disfrutar de la hospitalidad asturiana
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {featuredAccommodations.map((accommodation) => (
              <div key={accommodation.id} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={accommodation.image}
                      alt={accommodation.name}
                      className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="md:w-1/2 p-4 sm:p-5 md:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {accommodation.name}
                      </h3>
                      <div className="bg-blue-50 px-2 py-1 rounded-full flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{accommodation.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{accommodation.location}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {accommodation.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{accommodation.capacity}</span>
                      </div>
                      <div className="text-lg font-semibold text-green-600">
                        {accommodation.price}
                      </div>
                    </div>
                    
                    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Ver disponibilidad
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;