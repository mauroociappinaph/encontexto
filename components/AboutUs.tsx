import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">¿Quiénes Son?</h1>
      <div className="prose prose-lg text-gray-700">
        <p>
          Somos un equipo apasionado por la información y la tecnología, dedicado a brindarte las noticias más relevantes y actualizadas de manera clara y accesible.
        </p>
        <p>
          Nuestra misión es mantenerte informado sobre los acontecimientos más importantes, ofreciéndote un análisis profundo y diversas perspectivas para que puedas formar tu propia opinión.
        </p>
        <p>
          Creemos en el poder de la información para transformar y empoderar a las personas. Por eso, trabajamos incansablemente para seleccionar, verificar y presentar el contenido de la manera más objetiva y completa posible.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Nuestro Compromiso</h2>
        <ul>
          <li>**Veracidad:** Nos esforzamos por la exactitud en cada noticia que publicamos.</li>
          <li>**Objetividad:** Presentamos los hechos de manera imparcial, permitiendo que nuestros lectores saquen sus propias conclusiones.</li>
          <li>**Relevancia:** Seleccionamos las noticias que realmente importan, evitando el ruido y la información superflua.</li>
          <li>**Accesibilidad:** Diseñamos nuestra plataforma para que la información sea fácil de encontrar y consumir, en cualquier dispositivo.</li>
        </ul>
        <p>
          Gracias por ser parte de nuestra comunidad. ¡Esperamos que disfrutes de tu experiencia con nosotros!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
