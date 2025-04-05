import React from 'react';
import { Card, Typography } from 'antd';
import type { CardProps } from 'antd';

const { Title } = Typography;

// Usar CardProps diretamente por enquanto
// Se precisarmos de props customizadas, podemos criar uma interface que estende CardProps
// interface AppCardProps extends CardProps { ... }

const AppCard: React.FC<CardProps> = ({ 
  title,
  children,
  bordered = false, // Valor padrão para não ter borda
  ...restProps // Captura todas as outras props do Card (style, bodyStyle, loading, etc)
}) => {

  // Opcional: Padronizar título se for string
  let cardTitle: React.ReactNode = title;
  if (typeof title === 'string') {
     // Usar Title do AntD para consistência ou span estilizado
     // Preferi Title aqui para usar o sistema de tipografia do AntD
     cardTitle = <Title level={5} style={{ marginBottom: 0, color: '#007bff' /* Cor azul padrão */ }}>{title}</Title>;
  } 
  // Não precisamos do else if, se title for um ReactNode ou undefined, ele será usado como está
  
  return (
    <Card
      title={cardTitle} // Usa o título processado
      bordered={bordered} 
      {...restProps}   // Passa todas as outras props para o Card do AntD
    >
      {children} 
    </Card>
  );
};

export default AppCard; 