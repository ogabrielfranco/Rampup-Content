
export interface Methodology {
  id: string;
  title: string;
  description: string;
  icon: string;
  prompts: MethodologyPrompt[];
  isSubPromptSystem?: boolean;
}

export interface MethodologyPrompt {
  id: string;
  label: string;
  template: string;
  fields: string[];
}

export interface GenerationResult {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}
