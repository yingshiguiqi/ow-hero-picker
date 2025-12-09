import { heroes, Hero } from '@/data/heroes';

// 文本识别英雄
export function recognizeHeroesFromText(text: string): Hero[] {
  const recognizedHeroes: Hero[] = [];
  const normalizedText = text.toLowerCase();
  
  heroes.forEach(hero => {
    // 检查英雄名称
    if (normalizedText.includes(hero.name.toLowerCase())) {
      recognizedHeroes.push(hero);
      return;
    }
    
    // 检查英文名
    if (normalizedText.includes(hero.nameEn.toLowerCase())) {
      recognizedHeroes.push(hero);
      return;
    }
    
    // 检查别名
    if (hero.aliases) {
      for (const alias of hero.aliases) {
        if (normalizedText.includes(alias.toLowerCase())) {
          recognizedHeroes.push(hero);
          break;
        }
      }
    }
  });
  
  // 去重
  return Array.from(new Set(recognizedHeroes));
}

// 从图片识别英雄（使用OCR）
export async function recognizeHeroesFromImage(file: File): Promise<Hero[]> {
  // 这里需要实现OCR功能
  // 可以使用 Tesseract.js 或其他OCR服务
  // 暂时返回空数组，实际项目中需要实现
  try {
    // 动态导入 Tesseract.js
    const Tesseract = (await import('tesseract.js')).default;
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const imageData = e.target?.result;
        
        if (imageData) {
          try {
            const result = await Tesseract.recognize(
              imageData as string,
              'chi_sim+eng', // 中文简体 + 英文
              {
                logger: (info) => console.log(info),
              }
            );
            
            const text = result.data.text;
            const recognizedHeroes = recognizeHeroesFromText(text);
            resolve(recognizedHeroes);
          } catch (error) {
            console.error('OCR识别失败:', error);
            resolve([]);
          }
        } else {
          resolve([]);
        }
      };
      
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Tesseract.js 加载失败:', error);
    return [];
  }
}

// 导出配置为JSON
export function exportConfiguration(data: any): string {
  return JSON.stringify(data, null, 2);
}

// 下载文件
export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
