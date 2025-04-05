import React from 'react';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import { ImageData } from '../components/ImageGrid/ImageGrid';
import { Typography } from 'antd';

const { Title } = Typography;

// Lista de categorias para nomes mais variados
const categories = ['Paisagem', 'Animal', 'Cidade', 'Objeto', 'Abstrato', 'Natureza', 'Tecnologia'];

// Função para pegar uma categoria aleatória
const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)];

// Lista de URLs de imagens do Naruto (substitua por URLs válidas e públicas)
const narutoImageUrls = [
  'https://upload.wikimedia.org/wikipedia/pt/thumb/1/17/Naruto_Uzumaki_Dattebayo%21.png/250px-Naruto_Uzumaki_Dattebayo%21.png', // Naruto Clássico
  'https://pbs.twimg.com/media/GMn_aH-XQAAdg3w?format=jpg&name=large', // Naruto Shippuden
  'https://www.pixelstalk.net/wp-content/uploads/images6/Naruto-Wallpaper-HD-for-Mobile.jpg', // Naruto modo sábio
  'https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Naruto_logo.svg/1200px-Naruto_logo.svg.png', // Logo Naruto
  'https://static.tvtropes.org/pmwiki/pub/images/naruto_uzumaki_part_1_anime_design.png' // Outra Naruto Clássico
];

// Dados mocados para as imagens
const mockImages: ImageData[] = Array.from({ length: 50 }, (_, index) => ({
  id: `img-${index + 1}`,
  // Manter títulos aleatórios ou mudar para algo relacionado a Naruto?
  // Por ora, manterei os títulos aleatórios para variedade
  title: `${getRandomCategory()} #${index + 1}`,
  // Usar imagens do Naruto ciclicamente
  url: narutoImageUrls[index % narutoImageUrls.length],
}));

const ImagensPage: React.FC = () => {
  // No futuro, aqui poderia ter lógica para buscar imagens de uma API

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Galeria de Imagens</Title>
      <ImageGrid images={mockImages} />
    </div>
  );
};

export default ImagensPage; 