import React from 'react';
import type { MenuProps } from 'antd';

// 1. Exportar o tipo MenuItem
// Usar o tipo diretamente de MenuProps para evitar duplicação se possível
// Required<MenuProps>['items'][number] garante que temos um item válido do array
export type MenuItem = Required<MenuProps>['items'][number];

// 2. Exportar a função getItem
// A função permanece a mesma, apenas exportada
export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    // O "as MenuItem" garante que o objeto retornado corresponda ao tipo
    return { key, icon, children, label, type } as MenuItem;
} 