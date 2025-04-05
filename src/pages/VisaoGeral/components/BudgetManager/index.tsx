import React, { useState, useEffect } from 'react';
import { InputNumber, Button, Space, message, Spin } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

// Simulação de API (poderia vir de um serviço)
const saveBudgetAPI = (budget: number): Promise<{ success: boolean }> => {
    console.log('[API Simulada] Salvando orçamento:', budget);
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('totalBudget', budget.toString());
            console.log('[API Simulada] Orçamento salvo com sucesso.');
            resolve({ success: true });
        }, 500);
    });
};

interface BudgetManagerProps {
    currentBudget: number | null; // Orçamento atualmente salvo
    onSaveBudget: (newBudget: number) => void; // Callback para notificar o pai
    isLoadingExternally?: boolean; // Indica se o pai está carregando o orçamento inicial
}

const BudgetManager: React.FC<BudgetManagerProps> = ({
    currentBudget,
    onSaveBudget,
    isLoadingExternally = false, // Valor padrão
}) => {
    const [inputValue, setInputValue] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Atualiza o input quando o orçamento atual (vindo do pai) mudar
    useEffect(() => {
        setInputValue(currentBudget);
    }, [currentBudget]);

    const handleSave = async () => {
        if (inputValue === null || isNaN(inputValue) || inputValue < 0) {
            message.warning('Por favor, insira um valor de orçamento válido.');
            return;
        }
        setIsSaving(true);
        try {
            const response = await saveBudgetAPI(inputValue);
            if (response.success) {
                onSaveBudget(inputValue); // Notifica o componente pai
                message.success('Orçamento salvo com sucesso!');
            } else {
                message.error('Falha ao salvar o orçamento.');
            }
        } catch (error) {
            console.error('Erro ao salvar orçamento:', error);
            message.error('Erro ao tentar salvar o orçamento.');
        } finally {
            setIsSaving(false);
        }
    };

    const isLoading = isSaving || isLoadingExternally;
    const hasChanged = inputValue !== currentBudget;

    return (
        <Spin spinning={isLoadingExternally && !isSaving} tip="Carregando orçamento...">
            <Space.Compact style={{ width: '100%' }}>
                 <InputNumber<number>
                     style={{ width: '100%' }} // Ocupa o espaço dentro do Compact
                     placeholder="Orçamento mensal"
                     precision={2}
                     decimalSeparator=","
                     addonBefore="R$"
                     min={0}
                     value={inputValue}
                     onChange={setInputValue}
                     disabled={isLoading} // Desabilita durante o carregamento/salvamento
                     // Pressionar Enter também salva
                     onPressEnter={handleSave}
                 />
                 <Button
                     type="primary"
                     icon={<SaveOutlined />}
                     onClick={handleSave}
                     loading={isSaving} // Mostra loading apenas ao salvar
                     disabled={!hasChanged || isLoading} // Desabilita se não mudou ou está carregando
                 >
                     Salvar
                 </Button>
             </Space.Compact>
        </Spin>
    );
};

export default BudgetManager; 