# GuiaTur Pro

Site profissional com agendamento online para guias turísticos.

## Sobre o Projeto

O GuiaTur Pro é uma solução focada em profissionalizar o atendimento de guias turísticos independentes e regionais. Através de um site personalizado, o guia pode divulgar seus passeios, organizar suas datas disponíveis e receber pedidos de agendamento de forma centralizada.

## Funcionalidades Principais

- **Landing Page Profissional**: Uma vitrine moderna para atrair turistas.
- **Catálogo de Passeios**: Exibição clara de roteiros, durações e valores.
- **Sistema de Agendamento**: Turistas podem selecionar datas e enviar pedidos diretamente.
- **Área do Guia**: Painel administrativo simplificado para gerenciar passeios e acompanhar pedidos.
- **Design Responsivo**: Experiência otimizada para dispositivos móveis.

## Tecnologias Utilizadas

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui.
- **Backend/Banco de Dados**: Supabase (PostgreSQL, Auth, Storage).
- **Ícones**: Lucide React.
- **Formatação de Datas**: date-fns.

## Como Executar Localmente

1.  **Clone o repositório**
2.  **Instale as dependências**
    ```sh
    npm install
    ```
3.  **Configure o Supabase**
    Crie um arquivo `.env` com as seguintes variáveis:
    ```
    VITE_SUPABASE_URL=seu_url
    VITE_SUPABASE_ANON_KEY=sua_chave_anon
    ```
4.  **Inicie o servidor de desenvolvimento**
    ```sh
    npm run dev
    ```

---
Desenvolvido por GuiaTur Pro.
