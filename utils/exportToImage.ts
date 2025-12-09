import html2canvas from 'html2canvas';

// 导出为图片
export async function exportToImage(elementId: string, filename: string = 'overwatch-heroes.png') {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('未找到要导出的元素');
      return;
    }
    
    const canvas = await html2canvas(element, {
      backgroundColor: '#1e293b',
      scale: 2, // 提高清晰度
      logging: false,
      useCORS: true,
    });
    
    // 转换为blob并下载
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  } catch (error) {
    console.error('导出图片失败:', error);
  }
}
