import React from 'react';
import { Link } from 'react-router-dom';
import {
    DashboardOutlined,
    BankOutlined,
    WalletOutlined,
    SafetyOutlined,
    ScheduleOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined,
    PictureOutlined,
    SlackOutlined,
} from '@ant-design/icons';
// Importar tipo e função utilitária
import type { MenuItem } from '../utils/menuUtils';
import { getItem } from '../utils/menuUtils';

// Definir e exportar o array de itens de menu
export const menuItems: MenuItem[] = [
    getItem(<Link to='/'>Visão Geral</Link>, '/', <DashboardOutlined />),
    getItem('Contas', '/contas', <BankOutlined />, [
        getItem(
            <Link to='/contas/carteira'>Carteira</Link>,
            '/contas/carteira',
            <WalletOutlined />
        ),
        getItem(
            <Link to='/contas/poupanca'>Poupança</Link>,
            '/contas/poupanca',
            <SafetyOutlined />
        ),
    ]),
    getItem('Lançamentos Futuros', '/lancamentos', <ScheduleOutlined />, [
        getItem(
            <Link to='/lancamentos/pagar'>Contas a Pagar</Link>,
            '/lancamentos/pagar',
            <ArrowDownOutlined />
        ),
        getItem(
            <Link to='/lancamentos/receber'>Contas a Receber</Link>,
            '/lancamentos/receber',
            <ArrowUpOutlined />
        ),
    ]),
    getItem(
        <Link to='/imagens'>Imagens</Link>,
        '/imagens',
        <PictureOutlined />
    ),
    getItem(<Link to='/azulele'>Azulele</Link>, '/azulele', <SlackOutlined />),
]; 