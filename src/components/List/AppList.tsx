import React from 'react';
import { List, Empty } from 'antd';
import type { ListProps } from 'antd';

// Remover interface AppListProps não utilizada

// Declaramos o componente usando Generics e ListProps<T> diretamente
const AppList = <T extends object>({ 
  dataSource,
  renderItem,
  loading = false,
  itemLayout = "horizontal",
  locale, // Capturar locale para customização
  ...restProps 
}: ListProps<T>) => { // Usa ListProps<T> diretamente

  // Customiza a mensagem de vazio usando o Empty do AntD
  const emptyText = locale?.emptyText ?? "Sem dados";
  const customLocale = {
      emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyText} />
  };

  return (
    <List<T>
      itemLayout={itemLayout}
      dataSource={dataSource}
      renderItem={renderItem}
      loading={loading}
      locale={customLocale} // Aplica locale customizado
      {...restProps} 
    />
  );
};

export default AppList; 