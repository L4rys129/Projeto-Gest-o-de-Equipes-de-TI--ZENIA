# ZenIA

Plataforma digital de saúde mental voltada para trabalhadores — especialmente equipes de Tecnologia da Informação — que precisam de uma ferramenta acessível, discreta e cientificamente embasada para entender e cuidar do próprio bem-estar emocional.

🔗 **Acesse:** [zenia-virid.vercel.app](https://zenia-virid.vercel.app)

---

## Sobre o projeto

O ZenIA nasceu de entrevistas reais com profissionais de TI que relataram altos níveis de ansiedade, esgotamento e estresse — sem nenhuma ferramenta de apoio disponível na empresa. A plataforma oferece um diagnóstico indicativo do estado emocional do usuário e recomenda práticas terapêuticas validadas pela neurociência e psicologia clínica.

> O ZenIA não substitui psicólogo ou psiquiatra. É uma ferramenta de primeiro contato e triagem indicativa.

---

## Funcionalidades

- **Quiz diagnóstico gamificado** — 15 perguntas baseadas nos instrumentos clínicos GAD-7 (ansiedade), MBI (esgotamento) e PSS (estresse), com barra de progresso, sistema de XP e feedback visual
- **Resultado por área** — porcentagens separadas para ansiedade, esgotamento e estresse, classificadas em 4 níveis: nenhum sinal, leve, moderado e elevado
- **Atividades terapêuticas interativas:**
  - Respiração 4-7-8 (técnica do Dr. Andrew Weil / Harvard)
  - Grounding 5-4-3-2-1 (Terapia Cognitivo-Comportamental)
  - Relaxamento Muscular Progressivo — PMR (Edmund Jacobson)
  - Diário guiado com prompts reflexivos
- **Recomendações personalizadas** com base no maior indicador do quiz, com referências científicas
- **Histórico de avaliações** com acompanhamento da evolução ao longo do tempo
- **Sistema de conquistas** — badges desbloqueados por XP acumulado
- **3 temas visuais** adaptados ao perfil de gênero informado no cadastro
- **Autenticação segura** com cadastro, login e recuperação de senha por e-mail
- **PWA** — instalável como app no celular ou computador, diretamente pelo navegador

---

## Tecnologias

| Camada | Tecnologia |
|--------|------------|
| Frontend | HTML5, CSS3 (variáveis + media queries), JavaScript ES6+ com módulos |
| Backend / BaaS | Supabase (PostgreSQL + Auth + API REST automática) |
| Hospedagem | Vercel (deploy automático via GitHub, CDN global, HTTPS) |
| Fontes | Google Fonts — Fraunces e DM Sans |
| Versionamento | Git + GitHub |

---

## Arquitetura

```
Frontend (HTML/CSS/JS — arquivos estáticos)
    │
    ├── Supabase Auth      → cadastro, login, recuperação de senha
    ├── Supabase REST API  → salva e busca resultados do quiz
    └── Vercel CDN         → hospedagem e deploy automático
            │
            ▼
Supabase (PostgreSQL)
    │
    ├── auth.users         → gerenciado pelo Supabase Auth
    └── public.resultados  → resultados dos quizzes por usuário
```

---

## Banco de Dados

Gerenciado pelo **Supabase** com **PostgreSQL**.

### Tabela `public.resultados`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID (PK) | Gerado automaticamente |
| `usuario_id` | UUID (FK) | Referencia `auth.users(id)` |
| `ansiedade` | INTEGER | Pontuação de ansiedade (0–100) |
| `esgotamento` | INTEGER | Pontuação de esgotamento (0–100) |
| `estresse` | INTEGER | Pontuação de estresse (0–100) |
| `total` | INTEGER | Pontuação geral |
| `xp` | INTEGER | Pontos de experiência acumulados |
| `criado_em` | TIMESTAMP | Preenchido automaticamente |

### Script de criação

```sql
create table public.resultados (
  id          uuid    default gen_random_uuid() primary key,
  usuario_id  uuid    references auth.users(id),
  ansiedade   integer default 0,
  esgotamento integer default 0,
  estresse    integer default 0,
  total       integer default 0,
  xp          integer default 0,
  criado_em   timestamp default now()
);

alter table public.resultados disable row level security;

grant all on public.resultados to anon;
grant all on public.resultados to authenticated;
```

> ⚠️ O RLS está desativado para fins de desenvolvimento. Em produção, reative e configure políticas de acesso por usuário.

---

## Temas visuais

| Perfil | Paleta | Estética |
|--------|--------|----------|
| Feminino | Rosa e lilás | Suave, orgânica, acolhedora |
| Masculino | Azul escuro | Técnica, direta, orientada a metas |
| Neutro | Verde e lilás | Clean, inclusiva, acolhedora |

---

## Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/zenia.git
   cd zenia
   ```

2. Configure as variáveis do Supabase no arquivo de configuração (ex: `supabase.js`):
   ```js
   const SUPABASE_URL = 'https://seu-projeto.supabase.co'
   const SUPABASE_ANON_KEY = 'sua-anon-key'
   ```

3. Abra o `index.html` no navegador ou sirva os arquivos com qualquer servidor HTTP estático:
   ```bash
   npx serve .
   ```

---

## Deploy

O projeto está integrado ao **Vercel**. Qualquer push na branch `main` publica automaticamente a nova versão em produção.

---

## Próximos passos

- Notificações push para lembretes de bem-estar
- Gráficos de evolução temporal no histórico
- Área de integração com profissionais de saúde mental
- Reativar e configurar Row Level Security (RLS) no Supabase
- Licenciamento para empresas como benefício corporativo

---

## Equipe

Desenvolvido como projeto acadêmico por:

- Éric da Silva Barros
- Evandro Benati
- Hellen Ariane Bastos de Oliveira
- Isabela Araujo de Santana
- Larissa Santos Ferreira
- Maria Eduarda Lemos Pelegrin Machado
- Pedro Henrique Ferreira Lima
- Zulma Vicente Cespedes

---

## Referências científicas

- **GAD-7** — Spitzer et al. (2006) — escala de ansiedade generalizada
- **MBI** — Maslach & Leiter (2016) — inventário de burnout
- **PSS** — Cohen, Kamarck & Mermelstein (1983) — escala de estresse percebido
- **Respiração 4-7-8** — Dr. Andrew Weil, Harvard Medical School
- **Grounding 5-4-3-2-1** — Terapia Cognitivo-Comportamental
- **PMR** — Edmund Jacobson (1929)

---

*ZenIA v1.0 — São Paulo, 2026*
