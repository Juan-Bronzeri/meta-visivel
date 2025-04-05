const API_URL = 'http://localhost:3001/api'; // URL base do seu backend

// Interface para dados do usuário (simplificada)
interface User {
    username: string;
    // Adicionar outros campos se o backend retornar mais dados
}

// Função para fazer login
export const login = async (username: string, password: string): Promise<{ accessToken: string }> => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        // Tenta ler a mensagem de erro do backend, se houver
        const errorData = await response.text();
        throw new Error(errorData || `Erro ${response.status} ao fazer login`);
    }

    return response.json();
};

// Função para verificar o status da autenticação com o token
export const checkAuthStatus = async (token: string): Promise<{ isAuthenticated: boolean; user?: User }> => {
    const response = await fetch(`${API_URL}/auth/status`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        // Token inválido ou expirado
        return { isAuthenticated: false };
    }

    if (!response.ok) {
        throw new Error(`Erro ${response.status} ao verificar status`);
    }

    const data = await response.json();
    return { isAuthenticated: true, user: data.user };
};

// Função para registrar um novo usuário
export const register = async (username: string, email: string, password: string): Promise<void> => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.text();
        // Lançar erro para ser pego no componente
        throw new Error(errorData || `Erro ${response.status} ao registrar`);
    }

    // Se a resposta for 201 Created, não precisa retornar dados (apenas sucesso)
    console.log('Registro enviado com sucesso para o backend');
};

// Função de logout (apenas chama o endpoint, o principal é no cliente)
export const logoutUser = async (): Promise<void> => {
    // O token é normalmente removido no cliente, mas podemos notificar o backend
    try {
        await fetch(`${API_URL}/logout`, { method: 'POST' });
    } catch (error) {
        console.warn('Erro ao notificar backend sobre logout:', error);
        // Não tratar como erro crítico, pois o logout do cliente é o principal
    }
}; 