import { Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination ,Autoplay} from 'swiper/modules';


// Importa estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Promos({ destacados }) {
  const tieneDestacados = destacados && destacados.length > 0;

  if (!tieneDestacados) {
    return (
      <section className="py-20 bg-gradient-to-r from-[#335350] to-[#1f3d3a] text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Quieres que tu producto aparezca aquí?
          </h2>
          <p className="mb-6 max-w-xl mx-auto text-lg">
            Destaca tu publicación para llegar a más compradores y vender más rápido.
            Sé el primero en aparecer en la sección de productos destacados.
          </p>
          <Link
            href="not-found"
            className="bg-[#e47b5e] text-white px-6 py-3 rounded-full hover:bg-[#c45f48] transition"
          >
            Promociona tu producto ahora
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Productos Destacados</h2>

        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
            delay: 3000, 
            disableOnInteraction: false, 
        }}
        >
          {destacados.map((producto) => (
            <SwiperSlide key={producto.id_producto}>
              <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            
                <div className="md:w-1/3">
                  <img
                    src={producto.imagen_url || 'https://via.placeholder.com/400x300'}
                    alt={producto.nombre_producto}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info derecha */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {producto.nombre_producto}
                    </h3>
                    <p className="text-gray-600 mb-4">{producto.descripcion}</p>
                    <p className="text-lg font-bold mb-2">Precio: S/ {producto.precio}</p>
                    <p className="text-sm text-gray-500">
                      Publicado por: {producto.user?.name}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={`/producto/${producto.id_producto}`}
                      className="inline-block mt-4 bg-[#e47b5e] text-white px-4 py-2 rounded-full hover:bg-[#c45f48] transition"
                    >
                      Ver Producto
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
