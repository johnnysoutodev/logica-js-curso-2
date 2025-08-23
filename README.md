# 🎯 Jogo do Número Secreto

Um jogo interativo desenvolvido em JavaScript puro onde o objetivo é descobrir o número secreto através de tentativas e dicas.

## 🎮 Sobre o Jogo

O **Jogo do Número Secreto** é uma aplicação web simples e divertida onde:

- 🎲 O sistema gera um número aleatório entre 1 e 100
- 🔍 O jogador deve adivinhar qual é esse número
- 💡 A cada tentativa, o jogo fornece dicas: "maior" ou "menor"
- 🏆 O objetivo é descobrir o número com o menor número de tentativas possível
- 🔄 Possibilidade de reiniciar o jogo a qualquer momento

### ✨ Funcionalidades

- Interface responsiva e intuitiva
- Feedback visual para as tentativas
- Contador de tentativas
- Síntese de voz para acessibilidade
- Design moderno e atrativo

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilização e responsividade
- **JavaScript**: Lógica do jogo e interatividade
- **Web Speech API**: Síntese de voz

## 🚀 Deploy Automatizado

Este projeto implementa um sistema completo de **CI/CD (Continuous Integration/Continuous Deployment)** utilizando GitHub Actions e Vercel.

### 📋 Arquitetura do Deploy

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Develop       │────│  GitHub Actions  │────│     Vercel      │
│   (Código)      │    │   (Build/Deploy) │    │   (Produção)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 🔄 Fluxo de Deploy

#### **1. Desenvolvimento Local**
```bash
src/                    # Código fonte
├── index.html         # HTML principal
├── css/style.css      # Estilos
├── js/app.js          # Lógica do jogo
└── img/               # Imagens
```

#### **2. Processo de Build**
- **Minificação HTML**: Remove espaços e comentários
- **Minificação CSS**: Otimiza estilos com CleanCSS
- **Minificação JavaScript**: Comprime código com Terser
- **Otimização de Imagens**: Copia e otimiza assets
- **Output**: Arquivos gerados na pasta `dist/`

#### **3. Deploy Automático**

##### 🌿 **Sincronização de Branches**
```yaml
Push → develop → sync-deploy.yml → deploy branch
```

##### 🚀 **Deploy para Produção**
```yaml
deploy branch → deploy.yml → Build → Vercel → Live Site
```

### 🛠️ Configuração do Sistema

#### **Scripts de Build**
```json
{
  "scripts": {
    "build": "node build.js",
    "vercel-build": "npm run build",
    "clean": "rimraf dist"
  }
}
```

#### **Ferramentas de Minificação**
- **HTML**: `html-minifier-terser`
- **CSS**: `clean-css`
- **JavaScript**: `terser`
- **Arquivos**: `fs-extra`

#### **Configuração Vercel**
```json
{
  "outputDirectory": "dist",
  "buildCommand": "npm run vercel-build",
  "installCommand": "npm ci"
}
```

### 📊 Workflows GitHub Actions

#### **1. Sync Develop to Deploy** (`sync-deploy.yml`)
- **Trigger**: Push para `develop`
- **Função**: Sincroniza código da `develop` para `deploy`
- **Resultado**: Aciona automaticamente o deploy

#### **2. Deploy to Vercel** (`deploy.yml`)
- **Trigger**: Push para `deploy`
- **Função**: Build, minificação e deploy
- **Resultado**: Site online + tag de release

### 🏷️ Versionamento Automático

Cada deploy gera automaticamente uma tag de release:
```
v2025.08.22-build.123
```

### 🔧 Variáveis de Ambiente

As seguintes secrets são necessárias no GitHub:

```bash
VERCEL_TOKEN         # Token de acesso da Vercel
VERCEL_ORG_ID        # ID da organização
VERCEL_PROJECT_ID    # ID do projeto
PAT_TOKEN           # Personal Access Token (para trigger automático)
```

### ⚡ Performance

- **Build Time**: ~30 segundos
- **Deploy Time**: ~1 minuto
- **Cache Strategy**: Assets com cache de 1 ano, HTML sem cache
- **Minificação**: Redução de ~60% no tamanho dos arquivos

## 🌐 Demo

🔗 **Site Online**: [jogo-numero-secreto-by-one.vercel.app](https://jogo-numero-secreto-by-one.vercel.app)

## 🏃‍♂️ Como Executar Localmente

### **Pré-requisitos**
- Node.js 22.x ou superior
- Git

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/johnnysoutodev/jogo-numero-secreto_by-one.git

# Entre no diretório
cd jogo-numero-secreto_by-one

# Instale as dependências
npm install

# Execute o build
npm run build

# Sirva os arquivos (opcional)
npx live-server dist/
```

### **Desenvolvimento**
```bash
# Modo desenvolvimento (serve src/ diretamente)
npm run dev
```

## 📁 Estrutura do Projeto

```
jogo-numero-secreto_by-one/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Deploy para Vercel
│       └── sync-deploy.yml     # Sincronização de branches
├── src/                        # Código fonte
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── img/
├── dist/                       # Arquivos buildados (gerado)
├── build.js                    # Script de build
├── package.json               # Dependências e scripts
├── vercel.json                # Configuração Vercel
└── README.md                  # Este arquivo
```

## 🤝 Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
4. **Commit** suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
5. **Push** para a branch: `git push origin feature/nova-funcionalidade`
6. **Abra** um Pull Request para `develop`

### 🔄 Fluxo de Contribuição

```
feature-branch → PR → develop → auto-deploy → deploy → Vercel
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Johnny Souto**
- GitHub: [@johnnysoutodev](https://github.com/johnnysoutodev)
- LinkedIn: [Johnny Souto](https://linkedin.com/in/johnnysouto)

## 🙏 Agradecimentos

- [Oracle Next Education (ONE)](https://www.oracle.com/br/education/oracle-next-education/) - Programa de formação
- [Alura](https://www.alura.com.br/) - Plataforma de ensino
- [Vercel](https://vercel.com/) - Plataforma de deploy

---

<div align="center">
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
  <p>🎯 <strong>Desenvolvido com ❤️ por Johnny Souto</strong></p>
</div>
