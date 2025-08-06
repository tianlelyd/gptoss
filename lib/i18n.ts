export const translations = {
  en: {
    about: {
      title: "About gptoss",
      description: "gptoss is a playground for developers to explore OpenAI's open-weight models.",
      features: {
        title: "Features",
        items: [
          "Support for multiple OpenAI models",
          "Adjustable reasoning levels",
          "Real-time streaming responses",
          "Token usage tracking",
          "System prompt customization",
          "Dark/Light theme support",
        ]
      },
      models: {
        title: "Available Models",
        items: {
          "gpt-4.1-nano": "Optimized for running on-device with 20B parameters",
          "gpt-4": "Designed for large-scale infrastructure with 120B parameters",
        }
      }
    },
    help: {
      title: "Help",
      gettingStarted: {
        title: "Getting Started",
        content: "1. Select a model from the sidebar\n2. Choose your reasoning level\n3. Optionally set a system prompt\n4. Start chatting!"
      },
      reasoningLevels: {
        title: "Reasoning Levels",
        high: "High: Detailed step-by-step reasoning",
        medium: "Medium: Key aspects considered",
        low: "Low: Direct responses"
      },
      tips: {
        title: "Tips",
        items: [
          "Use system prompts to guide the model's behavior",
          "Higher reasoning levels provide more detailed explanations",
          "Token usage is tracked in real-time",
          "Your chat history is saved locally",
        ]
      }
    }
  },
  zh: {
    about: {
      title: "关于 gptoss",
      description: "gptoss 是一个供开发者探索 OpenAI 开源权重模型的实验平台。",
      features: {
        title: "功能特性",
        items: [
          "支持多个 OpenAI 模型",
          "可调节推理级别",
          "实时流式响应",
          "Token 使用量跟踪",
          "系统提示词自定义",
          "深色/浅色主题支持",
        ]
      },
      models: {
        title: "可用模型",
        items: {
          "gpt-4.1-nano": "针对设备端运行优化，20B 参数",
          "gpt-4": "为大规模基础设施设计，120B 参数",
        }
      }
    },
    help: {
      title: "帮助",
      gettingStarted: {
        title: "快速开始",
        content: "1. 从侧边栏选择模型\n2. 选择推理级别\n3. 可选设置系统提示词\n4. 开始对话！"
      },
      reasoningLevels: {
        title: "推理级别",
        high: "高：详细的逐步推理",
        medium: "中：考虑关键方面",
        low: "低：直接响应"
      },
      tips: {
        title: "使用技巧",
        items: [
          "使用系统提示词来引导模型行为",
          "更高的推理级别提供更详细的解释",
          "实时跟踪 Token 使用量",
          "您的聊天历史会在本地保存",
        ]
      }
    }
  }
}

export type Language = keyof typeof translations

export function useTranslation(lang: Language = 'en') {
  return translations[lang]
}