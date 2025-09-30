import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Users, Wifi, Car, Coffee, Filter } from 'lucide-react';

const Accommodation: React.FC = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    priceRange: '',
    amenities: [] as string[]
  });

  const accommodations = [
    {
      id: 1,
      name: "Hotel Rural Los Picos",
      type: "Hotel Rural",
      description: "Encantador hotel rural con vistas panorámicas a los Picos de Europa",
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      location: "Arenas de Cabrales",
      rating: 4.8,
      reviews: 127,
      price: 95,
      capacity: 4,
      amenities: ['wifi', 'parking', 'restaurant'],
      accessibility: true
    },
    {
      id: 2,
      name: "Casa Rural El Mirador",
      type: "Casa Rural",
      description: "Auténtica casa rural asturiana con jardín y barbacoa",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      location: "Cangas de Onís",
      rating: 4.6,
      reviews: 89,
      price: 120,
      capacity: 8,
      amenities: ['wifi', 'parking', 'garden'],
      accessibility: false
    },
    {
      id: 3,
      name: "Apartamentos Montaña",
      type: "Apartamento",
      description: "Modernos apartamentos totalmente equipados en el corazón del valle",
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      location: "Covadonga",
      rating: 4.4,
      reviews: 203,
      price: 75,
      capacity: 6,
      amenities: ['wifi', 'kitchen', 'balcony'],
      accessibility: true
    }
  ];

  const accommodationTypes = [
    { value: '', label: 'Todos los tipos' },
    { value: 'hotel', label: 'Hoteles' },
    { value: 'casa-rural', label: 'Casas Rurales' },
    { value: 'apartamento', label: 'Apartamentos' },
    { value: 'camping', label: 'Campings' }
  ];

  const locations = [
    { value: '', label: 'Todas las ubicaciones' },
    { value: 'cangas', label: 'Cangas de Onís' },
    { value: 'covadonga', label: 'Covadonga' },
    { value: 'cabrales', label: 'Arenas de Cabrales' },
    { value: 'onís', label: 'Onís' }
  ];

  const priceRanges = [
    { value: '', label: 'Cualquier precio' },
    { value: '0-50', label: 'Hasta €50' },
    { value: '50-100', label: '€50 - €100' },
    { value: '100-150', label: '€100 - €150' },
    { value: '150+', label: 'Más de €150' }
  ];

  const amenityIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    parking: <Car className="h-4 w-4" />,
    restaurant: <Coffee className="h-4 w-4" />
  };

  return (
    <div className="min-h-screen bg-gray-50" role="main">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4" id="page-title">
            Alojamientos
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl" aria-describedby="page-title">
            Encuentra el lugar perfecto para tu estancia en la Montaña Central de Asturias
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1" role="complementary" aria-label="Filtros de búsqueda">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-5 md:p-6 lg:sticky lg:top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold" id="filters-title">Filtros</h2>
              </div>

              <form role="search" aria-labelledby="filters-title">
              {/* Type Filter */}
              <div className="mb-6">
                <label htmlFor="accommodation-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de alojamiento
                </label>
                <select
                  id="accommodation-type"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-describedby="type-help"
                >
                  {accommodationTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <div id="type-help" className="sr-only">
                  Selecciona el tipo de alojamiento que prefieres
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <select
                  id="location-filter"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-describedby="location-help"
                >
                  {locations.map(location => (
                    <option key={location.value} value={location.value}>{location.label}</option>
                  ))}
                </select>
                <div id="location-help" className="sr-only">
                  Filtra por ubicación geográfica
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio por noche
                </label>
                <select
                  id="price-range"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-describedby="price-help"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
                <div id="price-help" className="sr-only">
                  Selecciona tu rango de precio preferido
                </div>
              </div>

              {/* Accessibility Filter */}
              <div className="mb-6">
                <label className="flex items-center" htmlFor="accessibility-filter">
                  <input
                    id="accessibility-filter"
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    aria-describedby="accessibility-help"
                  />
                  <span className="ml-2 text-sm text-gray-700">Accesible</span>
                </label>
                <div id="accessibility-help" className="sr-only">
                  Mostrar solo alojamientos accesibles para personas con movilidad reducida
                </div>
              </div>
              </form>
            </div>
          </aside>

          {/* Accommodation Grid */}
          <section className="lg:col-span-3" role="region" aria-label="Resultados de alojamientos">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600" role="status" aria-live="polite">
                Mostrando {accommodations.length} alojamientos
              </p>
              <label htmlFor="sort-select" className="sr-only">Ordenar resultados</label>
              <select 
                id="sort-select"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Ordenar resultados por"
              >
                <option>Ordenar por relevancia</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Mejor valorados</option>
              </select>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6" role="list" aria-label="Lista de alojamientos">
              {accommodations.map((accommodation) => (
                <article 
                  key={accommodation.id} 
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  role="listitem"
                  aria-labelledby={`accommodation-${accommodation.id}-name`}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={accommodation.image}
                        alt={`Vista exterior de ${accommodation.name}`}
                        className="w-full h-48 sm:h-56 md:h-full object-cover"
                      />
                    </div>

                    <div className="md:w-2/3 p-4 sm:p-5 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-start mb-2 gap-2 sm:gap-0">
                        <div>
                          <div className="text-sm text-green-600 font-medium mb-1">
                            {accommodation.type}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {accommodation.name}
                          </h3>
                          <div className="flex items-center text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{accommodation.location}</span>
                          </div>
                        </div>
                        
                        <div className="sm:text-right">
                          <div className="flex items-center mb-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            <span className="font-medium">{accommodation.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({accommodation.reviews})</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            €{accommodation.price}
                            <span className="text-sm font-normal text-gray-500">/noche</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {accommodation.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-sm">{accommodation.capacity} personas</span>
                        </div>
                        
                        <div className="flex space-x-2" role="list" aria-label="Servicios disponibles">
                          {accommodation.amenities.map((amenity) => (
                            <div 
                              key={amenity} 
                              className="bg-gray-100 p-1 rounded" 
                              title={amenity}
                              aria-label={`Servicio: ${amenity}`}
                              role="listitem"
                            >
                              {amenityIcons[amenity as keyof typeof amenityIcons]}
                            </div>
                          ))}
                        </div>
                        
                        {accommodation.accessibility && (
                          <div 
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            aria-label="Este alojamiento es accesible para personas con movilidad reducida"
                          >
                            Accesible
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                        <button className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                          Ver detalles
                        </button>
                        <button 
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          aria-describedby={`accommodation-${accommodation.id}-name`}
                        >
                          Reservar
                        </button>
                      </div>
                      </div>
                    </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12" role="navigation" aria-label="Paginación">
              <nav className="flex space-x-2" aria-label="Páginas de resultados">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Ir a la página anterior"
                >
                  Anterior
                </button>
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  aria-label="Página 1, página actual"
                  aria-current="page"
                >
                  1
                </button>
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Ir a la página 2"
                >
                  2
                </button>
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Ir a la página 3"
                >
                  3
                </button>
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Ir a la página siguiente"
                >
                  Siguiente
                </button>
              </nav>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;