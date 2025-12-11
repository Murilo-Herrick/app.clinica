# Integrantes
- Murilo Herrick Riva de Camargo
- Nicolas Moreira Ribeiro
- Vinicius Brolezzi Gaban

# MedPro — Guia de Execução
Aplicação Web + Mobile + API REST  
(Spring Boot + Docker + React Native / Expo)

---

# Estrutura do Projeto

backend/medpro → API em Spring Boot  
frontend/app.clinica → Aplicação mobile/web com React Native (Expo)

---

# Executando o Backend (API Spring Boot)

### Backend utiliza MySQL via Docker Compose, ja inicializando a API junto

### Passo 1 — Acessar a pasta do backend

```bash
cd backend/medpro
```

### Passo 2 — Subir o banco de dados com Docker

```bash
docker-compose up -d
```

Configurações padrão do container:

Item | Valor  
-----|-------
Banco | medpro  
User | root  
Senha | root  
Porta MySQL local | 3307  

# 🌐 Documentação da API (Swagger)

Após iniciar o backend, a documentação estará disponível em:

👉 http://localhost:8080/swagger-ui/index.html

---

# Executando o App Mobile / Web (Expo)

### Passo 1 — Acessar a pasta do frontend

```bash
cd frontend/app.clinica
```

### Passo 2 — Instalar dependências

```bash
npm install
```

### Passo 3 — Iniciar o projeto

```bash
npx expo start
```

Opções no terminal:

- w → Executar no navegador (Expo Web)  
- QR Code → Abrir no celular via Expo Go  

---

# Executando no Celular (Expo Go)

- Conectar celular e computador na mesma rede Wi-Fi  
- Abrir o app Expo Go  
- Ler o QR Code exibido no terminal  
- A aplicação será carregada no dispositivo  

---

# Comunicação com a API

O frontend utiliza o IP local da máquina:

```js
baseURL: "http://SEU_IP_LOCAL:8080"
```

Para descobrir o IP:

```bash
ipconfig
```

Usar o campo **Endereço IPv4**, por exemplo:

```
192.168.15.8
```

Atualizar no arquivo:

```
frontend/app.clinica/src/services/api.js
```

---

# Resumo de Execução Completa

```bash
docker-compose up -d
```

```bash
npx expo start
```
