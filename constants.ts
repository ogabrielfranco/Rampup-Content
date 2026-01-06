
import { Methodology } from './types';

/**
 * Guia de campos para auxiliar o usuário no preenchimento dos formulários.
 * Contém a descrição técnica e o motivo da importância para a IA.
 */
export const FIELD_GUIDE: Record<string, { label: string, explanation: string }> = {
  nicho: {
    label: "Nicho de Atuação",
    explanation: "Define seu mercado específico. É importante porque permite que a IA utilize o vocabulário técnico e os ganchos mentais que ressoam com seu setor."
  },
  publico: {
    label: "Público-Alvo",
    explanation: "Identifica quem consumirá o conteúdo. Ajuda a IA a ajustar o tom de voz (formal vs informal) e a identificar as dores emocionais certas."
  },
  tema: {
    label: "Tema Central",
    explanation: "O assunto específico do post. Quanto mais focado for o tema, menor a chance de o conteúdo parecer genérico ou superficial."
  },
  resultado: {
    label: "Resultado Desejado",
    explanation: "O benefício final que seu produto/serviço gera. Serve como a 'promessa' do conteúdo, essencial para gerar desejo de compra."
  },
  texto: {
    label: "Conteúdo Base",
    explanation: "Um rascunho ou transcrição bruta. A IA usará isso como matéria-prima para estruturar ganchos, legendas e roteiros profissionais."
  },
  assunto: {
    label: "Assunto Técnico",
    explanation: "O tópico complexo que você quer simplificar. Fundamental para gerar autoridade ao explicar algo difícil de forma fácil."
  },
  contexto: {
    label: "Contexto Situacional",
    explanation: "O cenário da comunicação (ex: palestra, direct, reunião). Permite que a IA adapte a abordagem para o nível de intimidade correto."
  },
  regiao: {
    label: "Região Geográfica",
    explanation: "Localização do seu mercado. Importante para adaptar gírias, tendências locais e referências culturais específicas."
  }
};

/**
 * Categorias de Metodologias organizadas em ordem alfabética por título.
 */
export const METHODOLOGIES: Methodology[] = [
  // 01. Bloqueio Criativo
  {
    id: 'mCreativeBlock',
    title: 'Bloqueio Criativo 🎨',
    description: 'Mentor criativo para sair do bloqueio em minutos com prompts provocativos e ideias sob pressão.',
    icon: '🎨',
    isSubPromptSystem: true,
    prompts: [
      {
        id: 'cb1',
        label: 'Ativadores Anti-Bloqueio',
        template: 'Atue como um mentor criativo. Para o nicho [nicho], gere 5 tipos de prompts "Anti-Bloqueio" para ativar a criatividade: 1) "Me Conta Uma Verdade"; 2) "Se Você Fosse Começar do Zero..."; 3) "Ninguém Sabe Isso Sobre Você"; 4) "Transforma Isso em Conteúdo"; 5) "E Se Você Brincasse Com Isso?". Para cada um, sugira o estilo de vídeo (fala, trend, bastidor) e a emoção ativada.',
        fields: ['nicho']
      },
      {
        id: 'cb2',
        label: '25 Prompts de Desbloqueio',
        template: 'Gere 25 PROMPTS prontos e curtos para o nicho [nicho] que forcem o criador a sair da inércia. Cada prompt deve incluir: Frase de ativação, Gatilho criativo (ex: reflexão, storytelling, exagero) e Sugestão de formato de gravação.',
        fields: ['nicho']
      },
      {
        id: 'cb3',
        label: 'Técnicas de Ideias em Série',
        template: 'Apresente 5 técnicas de geração de ideias em série para quem está travado em [nicho]. Inclua métodos como: 3x1 (reciclar antigo), Inversão Criativa, Diálogo Interno (humor), Frases Não Ditáveis e Mini Desafios de 1 minuto.',
        fields: ['nicho']
      },
      {
        id: 'cb4',
        label: 'Calendário de Emergência',
        template: 'Monte um mini calendário criativo de 7 dias para o nicho [nicho], focado em execução rápida e sem complexidade. Defina um tema e um formato simples para cada dia (Segunda a Domingo).',
        fields: ['nicho']
      },
      {
        id: 'cb5',
        label: 'Checklist de Execução sem Inspiração',
        template: 'Crie um checklist tático para o nicho [nicho] que ajude o criador a produzir mesmo sem estar inspirado. Foque em simplicidade, uso do ambiente e autenticidade.',
        fields: ['nicho']
      }
    ]
  },
  // 02. Metodologia 01
  {
    id: 'm1',
    title: 'Metodologia 01: Growth Express',
    description: 'Prompts diretos para crescimento acelerado e conversão de dor em gancho.',
    icon: '🚀',
    isSubPromptSystem: true,
    prompts: [
      { id: 'm1p1', label: 'Conteúdo Viral', template: 'Você é um estrategista de redes sociais especialista em crescimento acelerado. Analise as últimas 10 tendências virais do Instagram em [nicho] e crie 5 ideias curtas, explosivas e com alto potencial de compartilhamento. Seja específico e prático.', fields: ['nicho'] },
      { id: 'm1p2', label: 'Dor em Gancho', template: 'Liste as 10 maiores dores que o público [publico] sente sobre [tema]. Transforme cada dor em um gancho de até 10 palavras, pronto para ser usado em Reels. Evite clichês, seja direto e provocador.', fields: ['publico', 'tema'] },
      { id: 'm1p3', label: 'Roteiro Retenção', template: 'Crie um roteiro de 30 segundos para Reels sobre [tema]. Estrutura: 1) Gancho irresistível, 2) História curta e envolvente, 3) CTA para comentar ou salvar. Use frases curtas e simples. Nenhuma enrolação.', fields: ['tema'] },
      { id: 'm1p4', label: 'Prova Social', template: 'Pegue o resultado [resultado] e crie 5 frases curtas que transmitam prova social e curiosidade, perfeitas para texto sobreposto em vídeos. Mantenha impacto máximo em até 10 palavras.', fields: ['resultado'] },
      { id: 'm1p5', label: 'Conteúdo Salvável', template: 'Liste 5 dicas práticas e pouco conhecidas sobre [tema]. Cada dica deve ter no máximo 12 palavras, ser clara e fácil de aplicar. O objetivo é criar um carrossel impossível de não salvar.', fields: ['tema'] },
      { id: 'm1p6', label: 'Reaproveitamento', template: 'Transforme este texto [texto] em: 1. Roteiro para Reels de 7 segundos, 2. Carrossel de 5 slides, 3. Post estático com frase de impacto. Adapte linguagem e formato para cada caso.', fields: ['texto'] },
      { id: 'm1p7', label: 'CTA Irresistível', template: 'Crie 10 CTAs curtos, criativos e diretos que incentivem comentários ou salvamentos em posts sobre [tema]. Evite frases genéricas, use gatilhos de curiosidade e ação.', fields: ['tema'] }
    ]
  },
  // 03. Metodologia 02
  {
    id: 'm2',
    title: 'Metodologia 02: Estrategista Orgânico',
    description: 'Foco em Reels virais, comportamento do algoritmo e gatilhos psicológicos.',
    icon: '📈',
    prompts: [{
      id: 'm2p1',
      label: 'Executar Metodologia 02',
      template: 'Atue como um estrategista de conteúdo especializado em redes sociais (15 anos exp). Crie ideias virais para o nicho de [nicho]. Passo a passo: 1. Análise de Tendências (30 dias). 2. Perfis de Referência (5). 3. Gatilhos Psicológicos. 4. 10 Ideias de Reels (Roteiro, Gancho, Áudio, Hashtags, Objetivo). 5. Calendário 7 dias. 6. Checklist de Otimização.',
      fields: ['nicho']
    }]
  },
  // 04. Metodologia 03
  {
    id: 'm3',
    title: 'Metodologia 03: Senior Creator (Reach)',
    description: 'Exploda o alcance orgânico sem mídia paga dominando o scroll stopper.',
    icon: '⚡',
    prompts: [{
      id: 'm3p1',
      label: 'Executar Metodologia 03',
      template: 'Atue como criador sênior (10 anos exp). Objetivo: Reels que explodem alcance em [nicho]. Passo a passo: 1. Conteúdos que mais geram alcance. 2. Gatilhos de Alcance Orgânico. 3. 15 Prompts para Reels (Instruções, Gancho, Áudio, CTA). 4. Estrutura de Roteiro Curto Repetível (15s). 5. Checklist para Maximizar Alcance.',
      fields: ['nicho']
    }]
  },
  // 05. Metodologia 04
  {
    id: 'm4',
    title: 'Metodologia 04: Cultura Digital & Trends',
    description: 'Identifique e adapte trends globais para o seu nicho com timing perfeito.',
    icon: '🌎',
    prompts: [{
      id: 'm4p1',
      label: 'Executar Metodologia 04',
      template: 'Atue como especialista em cultura digital. Objetivo: Prompts para conteúdos que viram trend em [nicho]. 1. Mapeie 5 Trends quentes (últimos 7 dias). 2. 5 Formatos que adaptam bem. 3. 20 PROMPTS Prontos (Execução, Tempo, Gancho, Áudio, CTA). 4. Checklist de Adaptação. 5. Modelo de Execução Rápida (Trend Sprint).',
      fields: ['nicho']
    }]
  },
  // 06. Metodologia 05
  {
    id: 'm5',
    title: 'Metodologia 05: Retenção Máxima',
    description: 'Domine os 3 primeiros segundos e force o algoritmo a entregar seu vídeo.',
    icon: '👀',
    prompts: [{
      id: 'm5p1',
      label: 'Executar Metodologia 05',
      template: 'Especialista em retenção de atenção. Objetivo: Capturar o público nos primeiros 3 segundos em [nicho]. 1. Papel dos 3s para o algoritmo. 2. Tipos de Ganchos eficazes. 3. 20 PROMPTS para Abertura (Abertura, Emoção, Duração). 4. Mini Banco de Frases Matadoras. 5. Checklist de Gancho Visual + Sonoro.',
      fields: ['nicho']
    }]
  },
  // 07. Metodologia 06
  {
    id: 'm6',
    title: 'Metodologia 06: Viralização por Compartilhamento',
    description: 'Produza conteúdos que causam identificação e forçam o botão "Enviar".',
    icon: '🔄',
    prompts: [{
      id: 'm6p1',
      label: 'Executar Metodologia 06',
      template: 'Especialista em compartilhamentos massivos. Objetivo: Reels em [nicho] que geram 1000+ shares. 1. Psicologia do compartilhamento. 2. Tipos de conteúdo compartilháveis. 3. 15 Fórmulas Secretas (Exemplo, Estilo, Gancho, CTA, Emoção). 4. Banco de CTAs para Shares. 5. Checklist de Otimização para Compartilhamento.',
      fields: ['nicho']
    }]
  },
  // 08. Metodologia 07
  {
    id: 'm7',
    title: 'Metodologia 07: Storytelling Persuasivo',
    description: 'Conecte, gere autoridade e venda de forma sutil através de histórias reais.',
    icon: '📖',
    prompts: [{
      id: 'm7p1',
      label: 'Executar Metodologia 07',
      template: 'Copywriter sênior especialista em storytelling. Objetivo: Storytelling com vendas sutis para [nicho]. 1. O que é Storytelling que vende sem forçar. 2. 5 Estruturas de Storytelling. 3. 15 PROMPTS de Storytelling (Emoção, Gancho, Áudio, CTA). 4. 10 Fechamentos com CTA Sutil. 5. Checklist de Storytelling que Converte.',
      fields: ['nicho']
    }]
  },
  // 09. Metodologia 08
  {
    id: 'm8',
    title: 'Metodologia 08: Máquina de Leads',
    description: 'Transforme visualizações em cadastros e vendas diretas com funis de 60s.',
    icon: '🎯',
    prompts: [{
      id: 'm8p1',
      label: 'Executar Metodologia 08',
      template: 'Estrategista de geração de leads. Objetivo: Reels de alta captura em [nicho]. 1. Fórmula do Reel que Gera Lead. 2. 5 Estruturas Ouro de Roteiro (Modelo, Gatilhos). 3. 10 Prompts de Captura (Estilo, Duração, Lead Magnet). 4. Mini Funil (Sequência de 3 Reels). 5. Checklist de Geração de Leads.',
      fields: ['nicho']
    }]
  },
  // 10. Metodologia 09
  {
    id: 'm9',
    title: 'Metodologia 09: Venda Invisível',
    description: 'Venda sem parecer publicidade usando educação, entretenimento e sementes.',
    icon: '🕵️',
    prompts: [{
      id: 'm9p1',
      label: 'Executar Metodologia 09',
      template: 'Estrategista de vendas sutis. Objetivo: Vender sem parecer venda em [nicho]. 1. O Segredo da Venda Invisível (3 elements). 2. 5 Estruturas de Roteiro Leves. 3. 15 Prompts de Venda Sutil (Tom, Estilo, Gatilho). 4. Mini Roteiro 30s Alta Conversão. 5. Checklist para Vender Sem Vender.',
      fields: ['nicho']
    }]
  },
  // 11. Metodologia 10
  {
    id: 'm10',
    title: 'Metodologia 10: Algoritmo Expert',
    description: 'Agrade o algoritmo com formatos que geram salvamentos e retenção infinita.',
    icon: '🤖',
    prompts: [{
      id: 'm10p1',
      label: 'Executar Metodologia 10',
      template: 'Estrategista especialista em métricas. Objetivo: Reels que o Instagram "ama" em [nicho]. 1. Fatores de performance. 2. 5 Formatos mais distribuídos. 3. 20 Prompts Prontos (Título, Gancho, Estrutura, Áudio). 4. Calendário 7 dias. 5. Checklist Final.',
      fields: ['nicho']
    }]
  },
  // 12. Metodologia 11
  {
    id: 'm11',
    title: 'Metodologia 11: Impacto 7 Segundos',
    description: 'Vídeos magnéticos para explodir em views via loop infinito e simplicidade.',
    icon: '⏱️',
    prompts: [{
      id: 'm11p1',
      label: 'Executar Metodologia 11',
      template: 'Criador especialista em impacto ultra rápido. Objetivo: Roteiros de 7s em [nicho]. 1. Por que 7s funciona. 2. 5 Tipos de vídeos de 7s. 3. 25 PROMPTS Prontos (Frase, Estilo, Áudio, Gatilho). 4. Mini Roteiro Universal. 5. Checklist de Performance.',
      fields: ['nicho']
    }]
  },
  // 13. Metodologia Proibida
  {
    id: 'mForbidden',
    title: 'Metodologia Proibida',
    description: 'Hackeie o cérebro reptiliano, arquétipos e percepção coletiva (Use com cautela).',
    icon: '👁️',
    isSubPromptSystem: true,
    prompts: [
      { id: 'mf1', label: 'Burlar Senso Crítico', template: 'Crie uma sequência de ideias que burle o senso crítico do leitor sobre [tema], ative o cérebro límbico e leve à compra como forma de alívio imediato da tensão provocada pela mensagem.', fields: ['tema'] },
      { id: 'mf2', label: 'Fidelização/Vício', template: 'Como criar um vício inconsciente em um cliente de [nicho] para que ele volte repetidamente sem perceber que está sendo condicionado?', fields: ['nicho'] },
      { id: 'mf3', label: 'Networking/Arquétipos', template: 'Como desbloquear os arquétipos energéticos (predador, sedutor, rebelde, líder) para amplificar minha presença em [contexto], criando um campo magnético que atrai ou intimida?', fields: ['contexto'] },
      { id: 'mf4', label: 'Seguidores/Inconsciente', template: 'Como ativar arquétipos universais em conteúdos de [nicho] que conectem ao inconsciente coletivo, atraindo seguidores por identificação simbólica profunda?', fields: ['nicho'] },
      { id: 'mf5', label: 'Ansiedade de Consumo', template: 'Como construir uma sequência de conteúdos para [nicho] que condicione o cérebro do seguidor a sentir desconforto na minha ausência, tornando meu perfil uma necessidade diária?', fields: ['nicho'] },
      { id: 'mf6', label: 'Aprender Rápido', template: 'Sou leigo em [assunto]. Crie um mapa proibido que me leve do zero ao especialista em tempo recorde, com as jogadas que ninguém ensina por medo de concorrência.', fields: ['assunto'] },
      { id: 'mf7', label: 'Sem Aparecer (Faceless)', template: 'Crie uma máquina de marca pessoal sem rosto para [nicho] que gera dinheiro no piloto automático. Nada de mostrar rosto — só inteligência aplicada para autoridade invisível.', fields: ['nicho'] },
      { id: 'mf8', label: 'Autoridade Instantânea', template: 'Como hackear a percepção coletiva em [nicho] para ser tratado como autoridade antes de ter provas reais, usando códigos linguísticos e arquétipos visuais?', fields: ['nicho'] },
      { id: 'mf9', label: 'Plano Brutal 30 Dias', template: 'Crie um plano brutal de 30 dias para transformar um Instagram apagado de [nicho] num perfil que respira autoridade. Inclua diagnóstico, tema visual, fricção/polarização e técnicas que abrem o algoritmo na marra.', fields: ['nicho'] },
      { id: 'mf10', label: 'Monetização Dark', template: 'Crie um plano de monetização em 7 dias para perfil dark de [nicho] com pouco seguidor. Inclua post isca, script de story oculto e técnicas de conversão por DM.', fields: ['nicho'] },
      { id: 'mf11', label: 'Mapeamento Indústrias', template: 'Quais indústrias de [regiao] operam com modelos ultrapassados, e como posso usar IA para revolucioná-las como a Amazon fez com o varejo?', fields: ['regiao'] },
      { id: 'mf12', label: 'Convencimento Extremo', template: 'Quais são os gatilhos psicológicos mais eficazes para convencer alguém de [nicho] a tomar uma decisão que beneficie a mim, mesmo que vá contra os interesses dela?', fields: ['nicho'] },
      { id: 'mf13', label: 'Barganha Humana', template: 'Crie uma tabela de "preços" psicológicos para pessoas em [contexto]. Me explique como qualquer ser humano pode ser comprado e os gatilhos que fazem trocar valores por status ou poder.', fields: ['contexto'] }
    ]
  },
  // 14. Metodologia: 50 Ideias
  {
    id: 'm50',
    title: 'Metodologia: 50 Ideias de Conteúdo',
    description: 'Um arsenal completo de 50 temas divididos por categorias de engajamento.',
    icon: '💡',
    prompts: [{
      id: 'm50p1',
      label: 'Executar 50 Ideias',
      template: 'Estrategista de engajamento consistente. Objetivo: 50 ideias de conteúdo para [nicho]. Categorias: Identificação (10), Valor Rápido (10), Storytelling (10), Autoridade Leve (10), Humor/Verdades (10).',
      fields: ['nicho']
    }]
  },
  // 15. Metodologia: Stories Ponte
  {
    id: 'mStories',
    title: 'Metodologia: Stories Ponte',
    description: 'Crie conexão íntima nos Stories e arraste o público para os seus Reels.',
    icon: '🌉',
    prompts: [{
      id: 'mStoriesP1',
      label: 'Executar Stories Ponte',
      template: 'Estrategista de integração de formatos. Objetivo: Stories que levam para Reels em [nicho]. 1. Poder do Stories como Pré-Reel. 2. 5 Estruturas de Stories-Ponte. 3. 25 PROMPTS para Stories (Frase, Estilo, Link). 4. Sequência de 3 Stories. 5. Checklist de Story-Ponte.',
      fields: ['nicho']
    }]
  },
  // 16. Método 1% Exclusive
  {
    id: 'm1Exclusive',
    title: 'Método 1% Exclusive 🤫',
    description: 'Atraia elite, feche negócios e construa autoridade silenciosa com mentalidade do topo.',
    icon: '🤫',
    isSubPromptSystem: true,
    prompts: [
      {
        id: 'm1e1',
        label: 'Estratégia: Por que o 1% é diferente',
        template: 'Atue como um estrategista avançado para o nicho [nicho]. Explique por que o conteúdo dos Top 1% é diferente: não correm atrás do algoritmo, falam com quem está pronto, transformam bastidor em posicionamento e dominam o jogo do "simples mas elite". Gere uma visão estratégica focada em menos views e mais faturamento.',
        fields: ['nicho']
      },
      {
        id: 'm1e2',
        label: '5 Formatos Top 1% Style',
        template: 'Para o nicho [nicho], crie roteiros baseados em 5 formatos de elite: 1) "A parte que ninguém mostra"; 2) "Não é pra todo mundo"; 3) "O que vejo no bastidor e não falo em aula"; 4) "Diferença de quem ganha real vs amador"; 5) "De mentor para mentor". Para cada um, defina emoção (exclusividade), estilo visual e trilha.',
        fields: ['nicho']
      },
      {
        id: 'm1e3',
        label: '25 Prompts Mentalidade Elite',
        template: 'Gere 25 PROMPTS com mentalidade de Top 1% para [nicho]. Inclua: Frase de abertura estilo bastidor revelado, entrega sutil de atalho/visão, estilo visual recomendado (limpo/minimalista) e CTA indireto.',
        fields: ['nicho']
      },
      {
        id: 'm1e4',
        label: 'Roteiro Energia 1% (30s)',
        template: 'Crie um roteiro de 30 segundos com linguagem de elite para o tema [tema] no nicho [nicho]. Estrutura: 0-3s Gancho de segredo; 4-20s Insight de destrave; 21-30s Fechamento sutil. Use gatilhos de respeito e antecipação.',
        fields: ['nicho', 'tema']
      },
      {
        id: 'm1e5',
        label: 'Checklist Conteúdo Exclusive',
        template: 'Gere um checklist definitivo para garantir que o conteúdo do nicho [nicho] siga o padrão 1% Exclusive. Foque em linguagem excludente (atrai quem decide), valor oculto, visual minimalista e impacto silencioso.',
        fields: ['nicho']
      }
    ]
  },
  // 17. Método BTS
  {
    id: 'mBTS',
    title: 'Método BTS 🎥',
    description: 'Estratégia de bastidores (Behind the Scenes) com apelo emocional e viral para humanizar sua marca.',
    icon: '🎥',
    isSubPromptSystem: true,
    prompts: [
      {
        id: 'bts1',
        label: 'Poder dos Bastidores',
        template: 'Atue como estrategista de conteúdo. Explique por que bastidores têm força no nicho [nicho], focando em: Vulnerabilidade real, Processo como inspiração, Erros humanizadores e Storytelling com verdade. Inclua um exemplo prático de BTS viral para este nicho.',
        fields: ['nicho']
      },
      {
        id: 'bts2',
        label: '5 Estruturas de BTS Viral',
        template: 'Para o nicho [nicho], crie roteiros baseados em 5 estruturas: 1) "O que deu errado antes de dar certo"; 2) "Enquanto ninguém estava vendo..."; 3) "Achei que nunca fosse funcionar"; 4) "O caos por trás da câmera"; 5) "Por trás de 15 segundos". Para cada uma, defina a emoção, o formato e a duração.',
        fields: ['nicho']
      },
      {
        id: 'bts3',
        label: '20 Scripts Prontos (BTS)',
        template: 'Gere 20 scripts prontos de bastidores para o nicho [nicho]. Cada script deve conter: Título, Gancho visual/verbal, Roteiro em 3 partes (início, meio, virada) e Estilo de edição sugerido.',
        fields: ['nicho']
      },
      {
        id: 'bts4',
        label: 'Calendário de Alto Engajamento',
        template: 'Crie um mini calendário de 7 dias de bastidores para o nicho [nicho], focado em engajamento emocional (Making of, Erros, Desabafos, Antes e Depois, Reflexão pós-conteúdo).',
        fields: ['nicho']
      },
      {
        id: 'bts5',
        label: 'Checklist BTS Viral',
        template: 'Gere um checklist definitivo para criar um Reels de bastidor real e viral no nicho [nicho]. Foque em ritmo, música, payoff final e humanização.',
        fields: ['nicho']
      }
    ]
  },
  // 18. Método Reels
  {
    id: 'mReels',
    title: 'Método REELS 🎬',
    description: '30+ Estruturas validadas para dobrar faturamento, ganhar autoridade e viralizar no Instagram.',
    icon: '🎬',
    isSubPromptSystem: true,
    prompts: [
      { 
        id: 'mr1', 
        label: 'Empreendedores & Negócios', 
        template: 'Atue como um estrategista de Reels de elite. Com base no nicho [nicho] e tema [tema], crie 5 roteiros baseados nestas estruturas: 1) Hook polêmico + 3 passos rápidos para dobrar faturamento; 2) Storytelling de escala 10x; 3) Gatilho de perda sobre erros fatais; 4) Quebra de crenças com dados ("3 mentiras"); 5) Passo a passo real de contrato fechado em 1 semana. Cada roteiro deve ter: Gancho (0-3s), Desenvolvimento e CTA.', 
        fields: ['nicho', 'tema'] 
      },
      { 
        id: 'mr2', 
        label: 'Vendas & Marketing (Scripts)', 
        template: 'Crie 5 scripts de Reels focados em resultados rápidos para o nicho [nicho]: 1) Script de fechamento 80%; 2) Mensagem estratégica de LinkedIn; 3) Como vender sem ser inconveniente (persuasão); 4) Prospecção de 50 clientes em 1h; 5) Quebra de objeção de preço sem dar desconto. Inclua sugestão de texto na tela e áudio dinâmico.', 
        fields: ['nicho'] 
      },
      { 
        id: 'mr3', 
        label: 'Alta Conversão (Seguidores)', 
        template: 'Foco em crescimento de base no nicho [nicho]. Gere 5 ideias de Reels: 1) Isca digital ("Comenta QUERO"); 2) 3 dicas ultra-rápidas ("Segue para mais"); 3) Checklist salvável ("Você VAI precisar"); 4) Identificação com problemas crônicos; 5) Humor estratégico sobre situações do nicho.', 
        fields: ['nicho'] 
      },
      { 
        id: 'mr4', 
        label: 'Autoridade & Posicionamento', 
        template: 'Para o nicho [nicho], crie 5 roteiros que elevam o status: 1) Lógica de precificação ("Como cobro R$XX"); 2) Padrões de clientes de alto ticket; 3) Rotina tática de CEO; 4) Polêmica inteligente contra mitos do mercado; 5) Priorização brutal de investimentos. Seja direto e magnético.', 
        fields: ['nicho'] 
      },
      { 
        id: 'mr5', 
        label: '30 Ideias Rápidas (Catálogo)', 
        template: 'Gere uma lista de 30 ideias curtas de Reels para o nicho [nicho]. Cada ideia deve ter um título forte (ex: "Negócio estagnado? 1 passo para crescer!") e uma breve descrição da cena, terminando sempre com uma sugestão de CTA focada em "Siga para...".', 
        fields: ['nicho'] 
      },
      { 
        id: 'mr6', 
        label: 'Psicologia: Dores & Desejos', 
        template: 'Analise o nicho [nicho] e tema [tema]. Crie 10 ganchos focados em DORES (ex: Marketing que não vende, Carreira travada) e 10 ganchos focados em DESEJOS (ex: Negócio milionário, Conexões de elite). Formate como uma tabela de ganchos mentais prontos para gravar.', 
        fields: ['nicho', 'tema'] 
      },
      { 
        id: 'mr7', 
        label: 'Insights & Dicas Virais', 
        template: 'Crie um guia de "Dicas Matadoras para Viralizar" específico para [nicho]. Inclua 5 exemplos de hooks de 3 segundos, orientações de edição dinâmica e 3 scripts de legenda com CTAs diretos de urgência.', 
        fields: ['nicho'] 
      }
    ]
  }
];
