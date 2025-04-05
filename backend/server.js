const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose(); // Importar sqlite3

const app = express();
const PORT = process.env.PORT || 3001; // Porta para o backend
const JWT_SECRET = 'seu_segredo_super_secreto'; // Mude isso para uma variável de ambiente em produção!
const SALT_ROUNDS = 10; // Número de "rodadas" para o hash (padrão seguro)

// Middlewares
app.use(cors()); // Permite requisições de origens diferentes (frontend)
app.use(bodyParser.json()); // Para entender JSON no corpo das requisições

// ---- Conexão com Banco de Dados SQLite ----
const dbPath = './database.db'; // Arquivo do banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        // Criar/Atualizar a tabela de usuários
        db.serialize(() => { // Usar serialize para garantir a ordem das operações
             db.run(`CREATE TABLE IF NOT EXISTS users (
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 username TEXT UNIQUE NOT NULL,
                 passwordHash TEXT NOT NULL,
                 email TEXT UNIQUE NOT NULL
             )`, (err) => {
                 if (err) {
                     console.error('Erro ao criar/verificar tabela users:', err.message);
                 } else {
                     console.log('Tabela users verificada/criada.');
                     // Tentar adicionar coluna email se não existir (para bancos já criados)
                     db.run('ALTER TABLE users ADD COLUMN email TEXT UNIQUE', (alterErr) => {
                         if (alterErr && !alterErr.message.includes('duplicate column name')) {
                            console.error('Erro ao adicionar coluna email:', alterErr.message);
                         } else if (!alterErr) {
                             console.log('Coluna email adicionada com sucesso (ou já existia).');
                         } else {
                             console.log('Coluna email já existe.');
                         }
                         // Inicializar admin após garantir estrutura da tabela
                         initializeAdminUser();
                     });
                 }
             });
         });
    }
});

// ---- Inicialização do Usuário Admin (Ajustado para incluir email) ----
const initializeAdminUser = async () => {
    const adminUsername = 'admin';
    const adminEmail = 'admin@example.com'; // Email padrão para admin
    const plainPassword = 'password';

    db.get(`SELECT username FROM users WHERE username = ?`, [adminUsername], async (err, row) => {
        if (err) {
            return console.error('Erro ao verificar usuário admin:', err.message);
        }
        if (!row) {
            console.log(`Usuário ${adminUsername} não encontrado, criando...`);
            try {
                const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
                // Inserir com email
                db.run(`INSERT INTO users (username, email, passwordHash) VALUES (?, ?, ?)`, 
                       [adminUsername, adminEmail, hash], 
                       (insertErr) => {
                            if (insertErr) {
                                console.error(`Erro ao inserir usuário ${adminUsername}:`, insertErr.message);
                            } else {
                                console.log(`Usuário ${adminUsername} criado com sucesso.`);
                            }
                       });
            } catch (hashError) {
                console.error('Erro ao gerar hash para admin:', hashError);
            }
        } else {
             console.log(`Usuário ${adminUsername} já existe.`);
        }
    });
};

// ---- Middleware para verificar Token ----
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // Se não há token, não autorizado

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Se token inválido ou expirado
        req.user = user; // Adiciona info do usuário na requisição
        next(); // Passa para o próximo middleware ou rota
    });
};

// ---- Rotas ----

// Rota de Registro de Usuário
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validação básica
    if (!username || !email || !password) {
        return res.status(400).send('Nome de usuário, email e senha são obrigatórios.');
    }
    // TODO: Adicionar validação de formato de email e força da senha

    console.log(`Tentativa de registro: User: ${username}, Email: ${email}`);

    // Verificar se usuário ou email já existem (em paralelo para eficiência)
    const checkUserQuery = `SELECT username FROM users WHERE username = ? OR email = ?`;
    db.get(checkUserQuery, [username, email], async (err, row) => {
        if (err) {
            console.error('Erro ao verificar usuário/email existente:', err.message);
            return res.status(500).send('Erro interno ao processar registro.');
        }
        if (row) {
            // Usuário ou email já existe
            const message = row.username === username 
                ? 'Nome de usuário já está em uso.'
                : 'Email já está em uso.';
            console.log(`Falha no registro: ${message}`);
            return res.status(409).send(message); // 409 Conflict
        }

        // Se não existe, criar o hash e inserir
        try {
            const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
            const insertQuery = `INSERT INTO users (username, email, passwordHash) VALUES (?, ?, ?)`;
            db.run(insertQuery, [username, email, passwordHash], function (insertErr) { // Usar function para ter acesso a this.lastID
                if (insertErr) {
                    console.error('Erro ao inserir novo usuário:', insertErr.message);
                    return res.status(500).send('Erro interno ao registrar usuário.');
                }
                console.log(`Usuário ${username} registrado com sucesso com ID: ${this.lastID}`);
                res.status(201).send('Usuário registrado com sucesso!'); // 201 Created
            });
        } catch (hashError) {
            console.error('Erro ao gerar hash durante registro:', hashError);
            res.status(500).send('Erro interno ao processar registro.');
        }
    });
});

// Rota de Login (Modificada para buscar no BD)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Tentativa de login:', username);

    // Buscar usuário no banco de dados
    db.get(`SELECT passwordHash FROM users WHERE username = ?`, [username], async (err, row) => {
        if (err) {
            console.error('Erro ao buscar usuário no login:', err.message);
            return res.status(500).send('Erro interno ao processar login');
        }

        if (row && row.passwordHash) {
            // Usuário encontrado, comparar senha
            try {
                const match = await bcrypt.compare(password, row.passwordHash);
                if (match) {
                    // Senha correta
                    const accessToken = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });
                    console.log('Login bem sucedido (hash BD comparado) para:', username);
                    res.json({ accessToken });
                } else {
                    // Senha incorreta
                    console.log('Falha no login (senha incorreta BD) para:', username);
                    res.status(401).send('Usuário ou senha inválidos');
                }
            } catch (compareError) {
                console.error('Erro ao comparar senha:', compareError);
                res.status(500).send('Erro interno ao processar login');
            }
        } else {
            // Usuário não encontrado
            console.log('Falha no login (usuário não encontrado BD) para:', username);
            res.status(401).send('Usuário ou senha inválidos');
        }
    });
});

// Rota para verificar status da autenticação (protegida)
app.get('/api/auth/status', authenticateToken, (req, res) => {
    // Se chegou aqui, o token é válido (verificado pelo middleware)
    res.json({ isAuthenticated: true, user: req.user });
});

// Rota de Logout (simbólica com JWT, o cliente deve remover o token)
app.post('/api/logout', (req, res) => {
    // Em uma implementação com sessão, aqui você limparia a sessão.
    // Com JWT, o cliente apenas descarta o token.
    console.log('Recebida requisição de logout');
    res.sendStatus(200);
});

// Inicia o servidor (não precisa mais esperar initializeAdminUser aqui, pois ele é chamado após conexão com BD)
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});

// ---- Tratamento de Encerramento Graceful ----
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Conexão com SQLite fechada.');
        process.exit(0);
    });
}); 