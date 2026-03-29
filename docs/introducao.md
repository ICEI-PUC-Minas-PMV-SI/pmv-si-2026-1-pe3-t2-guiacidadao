# 1. INTRODUÇÃO

A consolidação do sistema de seguridade social brasileiro, estruturado a partir da Constituição Federal de 1988, representou um marco na institucionalização de políticas públicas voltadas à proteção social e à promoção da dignidade humana (Brasil, 1988). Fundamentado nos eixos da saúde, previdência e assistência social, esse sistema foi concebido para assegurar direitos básicos, reduzir desigualdades e garantir condições mínimas de existência para a população, especialmente para os grupos em situação de vulnerabilidade socioeconômica. Nesse contexto, benefícios e programas sociais desempenham um papel central como instrumentos de redistribuição de renda e inclusão social (IPEA, 2024).

Entretanto, apesar da robustez normativa que sustenta esse arcabouço, a efetivação desses direitos na prática ainda enfrenta obstáculos significativos. O acesso a benefícios sociais costuma ser mediado por um conjunto complexo de normas jurídicas, procedimentos administrativos e plataformas digitais governamentais que exigem do cidadão habilidades específicas de interpretação, navegação e cumprimento de requisitos burocráticos (Oliveira et al., 2025; Gmach; Siqueira, 2024). Em muitos casos, essas exigências acabam funcionando como barreiras indiretas ao acesso, dificultando a compreensão das informações e a correta identificação dos direitos disponíveis.

Nesse cenário, observa-se que a vulnerabilidade social frequentemente se associa a uma vulnerabilidade informacional (Castells, 1999). Muitos cidadãos encontram dificuldades para compreender a linguagem técnica presente em documentos oficiais, interpretar critérios de elegibilidade ou localizar orientações claras sobre como solicitar determinados benefícios. A crescente digitalização dos serviços públicos, embora amplie o potencial de acesso, também pode acentuar desigualdades quando não é acompanhada de soluções que priorizem usabilidade, clareza informacional e inclusão digital (CGI.br, 2023).

Diante desse contexto, surge a necessidade de desenvolver ferramentas tecnológicas que atuem como mediadoras entre o cidadão e o sistema de proteção social. Assim, o desenvolvimento de uma aplicação web voltada à orientação sobre benefícios sociais apresenta-se como uma proposta relevante. Ao reunir, estruturar e traduzir informações complexas em linguagem acessível, uma plataforma desse tipo pode contribuir para reduzir barreiras informacionais, facilitar a identificação dos benefícios disponíveis e ampliar o acesso da população aos mecanismos de proteção garantidos pelo Estado.

## 1.1. Problema

A proteção social brasileira revela uma tensão estrutural entre a garantia normativa de direitos e as condições concretas de acesso a esses direitos. Embora a Constituição de 1988 tenha ampliado significativamente o reconhecimento dos direitos sociais, a efetivação dos benefícios correspondentes permanece condicionada a processos administrativos complexos e a barreiras informacionais persistentes (Brasil, 1988; Oliveira et al., 2025). Nesse contexto, destaca-se a vulnerabilidade informacional, produzida pela combinação entre linguagem técnico-jurídica e pela crescente digitalização dos serviços públicos. Tal configuração tende a transferir ao cidadão a responsabilidade de compreender normas, procedimentos e requisitos institucionais, exigindo níveis de letramento funcional e autonomia tecnológica que não estão igualmente distribuídos na sociedade.

Como consequência, a garantia formal de direitos convive com obstáculos que dificultam sua materialização no cotidiano dos usuários das políticas públicas. A complexidade informacional e procedimental pode resultar na desistência de solicitações ou na necessidade de intermediação para a realização de procedimentos administrativos, o que tensiona os princípios de universalidade e acessibilidade que orientam a seguridade social. Nesse cenário, torna-se evidente a necessidade de estratégias que priorizem a simplificação da informação, a clareza comunicacional e a redução das barreiras cognitivas, de modo a promover formas mais acessíveis de interação entre os cidadãos e os sistemas de acesso às políticas públicas.

## 1.2. Objetivos do trabalho

### Objetivo Geral
Desenvolver uma aplicação web que oriente cidadãos na identificação e no acesso a benefícios sociais.

### Objetivos Específicos
* Desenvolver o módulo de gerenciamento do catálogo de benefícios, permitindo ao Colaborador cadastrar, editar e desativar benefícios com seus critérios de elegibilidade e requisitos documentais;
* Projetar a interface da aplicação com base nos princípios de Design Centrado no Usuário e nas diretrizes de acessibilidade WCAG, priorizando a usabilidade para pessoas com baixo letramento digital;
* Implementar o módulo de diagnóstico de elegibilidade, incluindo triagem rápida para visitantes e análise completa do perfil socioeconômico para usuários autenticados;
* Desenvolver as funcionalidades de cálculo de renda familiar per capita e simulação de cenários de elegibilidade;
* Construir o módulo de acompanhamento processual, contemplando checklists de documentos por benefício, painel de progresso e geração de documento resumo para compartilhamento.

## 1.3. Justificativa

A centralização da informação em uma única plataforma permite que o cidadão compreenda sua situação de forma sistêmica, reduzindo erros na montagem do processo administrativo. Ao organizar requisitos e documentos em um só local, o GuiaCidadão aumenta a qualidade da instrução processual, o que diminui a incidência de pedidos negados por falhas documentais e evita que o usuário precise recorrer a múltiplas fontes oficiais confusas.

Além disso, essa organização estruturada promove a eficiência no atendimento social, uma vez que o cidadão chega aos órgãos competentes com a documentação correta e os requisitos validados, fortalecendo a transparência e a autonomia do indivíduo no exercício de seus direitos.

Segundo dados do IBGE, cerca de 15,3% da população brasileira com 10 anos ou mais não utilizavam a internet em 2021, concentrando-se sobretudo entre idosos, pessoas de baixa renda e moradores de áreas rurais (IBGE, 2021), o que reforça a necessidade de soluções que priorizem acessibilidade e clareza informacional. Ademais, estudos indicam que falhas documentais e a complexidade dos procedimentos digitais estão entre os principais fatores de exclusão no acesso a benefícios sociais (IPEA, 2024).

## 1.4. Público-alvo

O GuiaCidadão atende três perfis de usuário, cada um com necessidades e ganhos distintos.

O Cidadão é o usuário central da aplicação: qualquer pessoa que precise identificar benefícios sociais compatíveis com seu perfil ou entender o que precisa fazer para solicitá-los. O foco de design é o cidadão que enfrenta vulnerabilidade informacional, dificuldade em compreender a linguagem técnica dos benefícios, navegar pelas plataformas governamentais ou organizar a documentação exigida. Para esse perfil, a aplicação entrega orientação personalizada: o cidadão descobre a quais benefícios tem direito, compreende os requisitos de cada um e acompanha seu progresso com autonomia. A interface adota linguagem simples e segue as diretrizes de acessibilidade WCAG para atender também quem acessa via dispositivo móvel ou apresenta baixo letramento digital.

O Visitante é o cidadão em primeiro contato com a aplicação, antes de criar uma conta. Para ele, a aplicação entrega uma resposta imediata: com apenas três perguntas, obtém uma lista preliminar de benefícios compatíveis com seu perfil, sem precisar se cadastrar. Se optar por criar uma conta, os dados informados são aproveitados automaticamente, eliminando o repreenchimento.

O Colaborador é o usuário responsável por manter o catálogo de benefícios atualizado. Para ele, a aplicação entrega uma interface administrativa que permite cadastrar, editar e desativar benefícios com seus critérios de elegibilidade e listas de documentos, garantindo que as informações apresentadas ao cidadão sejam sempre precisas e atualizadas.
