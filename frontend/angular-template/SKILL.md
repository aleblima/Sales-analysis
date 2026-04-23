---
name: angular-template
description: >
  Use esta skill sempre que o usuário pedir para gerar código HTML e CSS para componentes Angular do projeto MonitorVendas. Triggers incluem: "crie o template", "gere o HTML", "gere o CSS", "crie a tela de", "faça o layout de", "implemente o visual de" para qualquer componente (region-list, region-form, seller-list, seller-form, sale-list, sale-form, dashboard). Esta skill define as regras rígidas de geração de código para garantir compatibilidade com Angular 21 Standalone Components e a stack do projeto.
---

# Skill: Angular Template Generator — MonitorVendas

Você vai gerar código HTML e CSS para componentes Angular do projeto MonitorVendas. Siga **rigorosamente** as regras abaixo. Nunca desvie delas, mesmo que o usuário peça algo que pareça conveniente.

---

## Stack do projeto

- **Angular 21** com **Standalone Components**
- **TypeScript** no `.ts`, **HTML** no `.html`, **CSS** no `.css` — sempre arquivos separados
- **ng2-charts** para gráficos (apenas no dashboard — não importe em outros componentes)
- **Sem bibliotecas de UI externas** (sem Angular Material, sem PrimeNG, sem Bootstrap) salvo instrução explícita do usuário
- Backend: **Spring Boot** em `http://localhost:8080`
- Banco: **MySQL**, entidades: Region, Seller, Sale

---

## Regras obrigatórias de geração

### 1. Apenas HTML e CSS — sem lógica TypeScript
- O arquivo `.html` contém **apenas template**
- Toda lógica (chamadas HTTP, subscribe, variáveis, métodos) já existe no `.ts` — não a duplique nem a reescreva
- Nunca adicione `<script>` tags no HTML

### 2. CSS sempre em arquivo separado
- Todo estilo vai no `.css` do componente — nunca inline (`style=""`) e nunca no `.html`
- O CSS é **isolado por componente** — use seletores simples sem depender de estilos globais
- Nunca use `!important`

### 3. Diretivas Angular no template
Use as diretivas modernas do Angular 17+:
```html
@for (item of items; track item.id) { ... }
@if (condition) { ... } @else { ... }
```
Não use `*ngFor` nem `*ngIf` — essas são sintaxes antigas incompatíveis com este projeto.

### 4. Imports no @Component — obrigatório
Todo componente Standalone precisa declarar no array `imports` o que usa no template. Ao gerar o HTML, **sempre liste** quais imports o `.ts` vai precisar adicionar. Exemplo:
```
// Adicione ao imports do @Component:
// RouterLink, RouterOutlet (se usar navegação)
// CommonModule (se necessário)
```

### 5. Navegação com RouterLink
Para botões ou links que navegam entre rotas, use:
```html
<a routerLink="/region/new">Nova Região</a>
<!-- ou -->
<button routerLink="/region/new">Nova Região</button>
```
Nunca use `href` para navegação interna.

### 6. Eventos e bindings
```html
<!-- Output (eventos) -->
<button (click)="delete(region.id)">Excluir</button>

<!-- Input (property binding) -->
<input [value]="region.name" />

<!-- Two-way binding -->
<input [(ngModel)]="form.name" />
```

### 7. Escopo por componente
Gere **um componente por vez**. Nunca gere múltiplos componentes num único bloco de código. Se o usuário pedir vários, gere sequencialmente e aguarde confirmação entre cada um.

---

## Estrutura de componentes do projeto

```
region/
  region-list.html + region-list.css   → lista regiões, botão excluir, link para /region/new
  region-form.html + region-form.css   → formulário de criação de região

seller/
  seller-list.html + seller-list.css   → lista vendedores, botão excluir, link para /seller/new
  seller-form.html + seller-form.css   → formulário de criação, select de regiões

sale/
  sale-list.html + sale-list.css       → lista vendas com filtro por data
  sale-form.html + sale-form.css       → formulário de criação, select de vendedores

dashboard/
  dashboard.html + dashboard.css       → gráficos ng2-charts + cards de faturamento
```

---

## Dashboard — regras específicas (ng2-charts)

O dashboard é o **único componente** onde ng2-charts é usado. Quando gerar o dashboard:

- Use `<canvas baseChart>` com os atributos do ng2-charts
- Os dados (`chartData`, `chartLabels`, `chartOptions`) vêm do `.ts` via property binding
- Nunca hardcode dados no template — sempre bind de propriedades do componente
- Adicione ao imports do componente: `BaseChartDirective` de `ng2-charts`

Exemplo de estrutura:
```html
<canvas baseChart
  [data]="chartData"
  [options]="chartOptions"
  type="line">
</canvas>
```

---

## Formato de resposta esperado

Ao gerar um componente, sempre entregue:

1. **Bloco HTML** — arquivo `.html` completo
2. **Bloco CSS** — arquivo `.css` completo  
3. **Lista de imports** — o que precisa ser adicionado ao `imports[]` do `@Component` no `.ts`
4. **Nenhum código TypeScript** — apenas um comentário se algo precisa ser ajustado no `.ts`
