import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

// Componente reutilizável para páginas placeholder
function PlaceholderPage({ title }: { title: string }) {
  return (
     <div style={{ textAlign: 'center', padding: '50px 20px' }}>
        <Title level={2}>{title}</Title>
        <Paragraph type="secondary">Conteúdo da página (Hello World!)</Paragraph>
        {/* Ou usar: <Result status="info" title={title} subTitle="Conteúdo em construção." /> */}
     </div>
  );
}

export default PlaceholderPage; 