
# BioCalc – Plataforma Web

Este projeto é um trabalho escolar que consiste no desenvolvimento de uma plataforma web que implementa as funcionalidades da ferramenta **BioCalc – Calculadora de Créditos de Descarbonização para Biocombustíveis Sólidos**.  
A ferramenta original é disponibilizada em formato de planilha e pode ser encontrada no link:

https://www.grupoengs.com.br/produtos

A plataforma foi desenvolvida em arquitetura **front-end + back-end**, utilizando tecnologias modernas e banco de dados não relacional.

---

## Tecnologias Utilizadas

### **Frontend**
- React  
- HTML  
- CSS  
- JavaScript  
- Bootstrap  

### **Backend**
- Node.js  
- JavaScript  
- Mongoose  

### **Banco de Dados**
- MongoDB  

Os dados utilizados no banco foram extraídos de uma subplanilha da ferramenta original e adaptados para documentos MongoDB, organizados em coleções específicas.

---

## Execução do Projeto

Siga os passos abaixo para rodar o projeto localmente.



## 1. Clone o Repositório

```bash
git clone https://github.com/MasteryRyge/BioCalc
```

---

## 2. Configuração do Banco de Dados (MongoDB)

Crie um banco de dados no **MongoDB** contendo as seguintes coleções:

- `AlocacaoMudancaUsoTerra`  
- `CombustivelFossilSubstituto`  
- `EmissaoInsumos`  
- `FatoresCaracterizacao`  
- `FatoresEmissaoCombustaoEstacionaria`  
- `FatoresEmissaoQueimaCombustiveis`  
- `MassaEspecificaPoderCalorifico`  
- `MudancaUsoTerra`  
- `PoderCalorico`  

Para cada coleção, importe os arquivos correspondentes encontrados na pasta **Copia_banco** do projeto.

Em seguida:

1. Pegue a **URL de conexão** do seu cluster MongoDB.  
2. No arquivo `server.js` (localizado em `/backend`), substitua a URL na função:

```js
mongoose.connect("SUA_URL_AQUI")
```

Essa configuração está na **linha 27** do arquivo.

---

## 3. Backend

Acesse a pasta **backend**:

```bash
cd backend
```

### Instale as dependências:

```bash
npm install
```

### Inicie o servidor:

```bash
node server.js
```

---

## 4. Frontend

Acesse a pasta **frontend**:

```bash
cd frontend
```

### Instale as dependências:

```bash
npm install
```

### Inicie o frontend:

```bash
npm start
```

---

## Funcionamento

Após iniciar o backend e o frontend:

- O servidor estará rodando localmente na porta 5000  
- O frontend abrirá automaticamente no navegador, no URL http://localhost:3000
- Você poderá usar a ferramente preenchendo os campos
