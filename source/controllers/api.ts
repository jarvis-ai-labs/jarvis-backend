// Import and configure dotenv to load environment variables
import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();

// Import required modules
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Task list data
const TASK_LIST = [
  "生成会议纪要",
  "生成康奈尔学习笔记",
  "归纳说话人观点",
  "提取关键词",
  "概括全文",
  "规整文本",
  "梳理任务",
  "总结目标",
  "总结成果",
  "生成计划",
  "生成思维导图大纲",
  "生成PPT大纲",
  "梳理学习重点",
  "生成章节速览",
  "生成测试题",
  "生成艾宾浩斯遗忘曲线"
];

// Task-specific prompt templates
const PROMPT_MAP: {[key: string]: string} = {
  "生成会议纪要": "请将以下会议录音整理成结构清晰的会议纪要，包含：\n1. 会议时间/地点\n2. 参会人员\n3. 主要议题\n4. 讨论要点（分点说明）\n5. 决议事项\n6. 待办任务（含负责人和截止时间）\n内容：\n",
  "生成康奈尔学习笔记": "请将以下内容整理为康奈尔笔记格式：\n- 左侧笔记区：关键知识点\n- 右侧详情区：详细解释/示例\n- 底部总结区：核心要点总结\n内容：\n",
  "归纳说话人观点": "请分析以下对话内容：\n1. 区分不同发言者\n2. 归纳每人核心观点\n3. 标注观点之间的异同\n4. 总结共识与分歧\n内容：\n",
  "提取关键词": "请从以下文本中提取15个关键词：\n- 按重要性降序排列\n- 每个关键词附带50字内解释\n- 标注在原文中的出现位置\n内容：\n",
  "概括全文": "请用三段式概括以下内容：\n1. 背景/问题（50字）\n2. 核心内容（100字）\n3. 结论/启示（50字）\n内容：\n",
  "规整文本": "请对以下文本进行规范化处理：\n1. 分段整理（每段不超过5行）\n2. 调整语序逻辑\n3. 修正语法错误\n4. 统一术语表达\n内容：\n",
  "梳理任务": "请将以下内容分解为可执行任务：\n1. 任务清单（含优先级）\n2. 所需资源\n3. 时间节点\n4. 负责人\n5. 验收标准\n内容：\n",
  "总结目标": "请用SMART原则分析以下内容的目标：\n1. Specific（具体性）\n2. Measurable（可衡量）\n3. Achievable（可实现）\n4. Relevant（相关性）\n5. Time-bound（时限性）\n内容：\n",
  "总结成果": "请按以下维度总结成果：\n1. 已完成事项\n2. 关键数据指标\n3. 未达预期部分\n4. 经验教训\n5. 改进建议\n内容：\n",
  "生成计划": "请制定包含以下要素的计划：\n1. 阶段划分（含时间范围）\n2. 各阶段里程碑\n3. 风险预案\n4. 资源分配\n5. 进度跟踪机制\n内容：\n",
  "生成思维导图大纲": "请用层级结构输出大纲：\n1. 中心主题\n2. 一级分支（3-5个）\n3. 二级分支（每个一级下2-3个）\n4. 用→连接关联节点\n内容：\n",
  "生成PPT大纲": "请按以下结构设计PPT：\n1. 封面页（标题+副标题）\n2. 目录页\n3. 章节页（3-5个）\n4. 内容页（图表结合）\n5. 总结页\n6. Q&A页\n内容：\n",
  "梳理学习重点": "请按认知层次分类知识点：\n1. 记忆类（概念/定义）\n2. 理解类（原理/机制）\n3. 应用类（案例/场景）\n4. 拓展类（前沿方向）\n内容：\n",
  "生成章节速览": "请用三部分解构内容：\n1. 知识地图（框架图）\n2. 核心公式/定理\n3. 典型例题\n4. 常见误区\n内容：\n",
  "生成测试题": "请按以下要求命题：\n1. 单选题（10道）\n2. 多选题（5道）\n3. 判断题（5道）\n4. 简答题（3道）\n5. 附参考答案\n内容：\n",
  "生成艾宾浩斯遗忘曲线": "请制定复习计划：\n1. 按5分钟、30分钟、12小时\n2. 1天、2天、4天、7天、15天\n3. 每个节点提供复习要点\n4. 制作时间表\n内容：\n"
};

/**
 * Get the list of supported tasks
 */
export const getTasks = (req: Request, res: Response) => {
  res.status(200).json({ 
    status: "ok",
    data: TASK_LIST.map((task, index) => ({
      id: index + 1,
      name: task,
      description: PROMPT_MAP[task] || ""
    }))
  });
};

/**
 * Process text task
 */
export const processTask = async (req: Request, res: Response) => {
  try {
    const { task, text } = req.body;
    
    if (!PROMPT_MAP[task]) {
      return res.status(400).json({ error: "无效的任务类型" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });
    
    const prompt = `${PROMPT_MAP[task]}${text}`;
    const result = await model.generateContent(prompt);
    
    res.status(200).json({
      status: "ok",
      data: await result.response.text()
    });

  } catch (error: any) {
    res.status(500).json({ 
      error: error.message || "处理请求时发生错误"
    });
  }
};

// Export the airdrop function as the default export
export default { getTasks, processTask };
