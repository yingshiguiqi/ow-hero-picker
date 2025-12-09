// 抓取守望先锋英雄头像的脚本
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 英雄名称映射（英文名到中文名）
const heroMapping = {
  'dva': 'D.Va',
  'orisa': '奥丽莎',
  'doomfist': '末日铁拳',
  'mauga': '毛加',
  'ramattra': '拉玛刹',
  'reinhardt': '莱因哈特',
  'roadhog': '路霸',
  'sigma': '西格玛',
  'winston': '温斯顿',
  'wrecking-ball': '破坏球',
  'zarya': '查莉娅',
  'junker-queen': '渣客女王',
  'ashe': '艾什',
  'bastion': '堡垒',
  'cassidy': '卡西迪',
  'echo': '回声',
  'genji': '源氏',
  'hanzo': '半藏',
  'junkrat': '狂鼠',
  'mei': '美',
  'pharah': '法老之鹰',
  'reaper': '死神',
  'soldier-76': '士兵：76',
  'sombra': '黑影',
  'symmetra': '秩序之光',
  'torbjorn': '托比昂',
  'tracer': '猎空',
  'venture': '探奇',
  'widowmaker': '黑百合',
  'sojourn': '索杰恩',
  'ana': '安娜',
  'baptiste': '巴蒂斯特',
  'brigitte': '布里吉塔',
  'juno': '朱诺',
  'kiriko': '雾子',
  'lifeweaver': '生命之梭',
  'lucio': '卢西奥',
  'mercy': '天使',
  'moira': '莫伊拉',
  'zenyatta': '禅雅塔',
  'illari': '伊拉锐',
};

// 英雄头像URL（基于守望先锋官网的图片CDN）
const heroImageUrls = {
  'dva': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ca114f72193e4d58a85c087e9409242f1a31e808cf4058678b8cbf767c2a9a0a.png',
  'orisa': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/71e96294617e81051d120b5d04b491bb1ea40e2933da44d6631aae149aac411d.png',
  'doomfist': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/13750471c693c1a360eb19d5ace229c8599a729cd961d72ebee0e157657b7d18.png',
  'mauga': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6c867c59cf94b6e0da32d9211bc5b99f3838caa3e1a7c7e0db9c3b9fbfd8f71a.png',
  'ramattra': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3e0367155e1940a24da076c6f1f065aacede88dbc323631491aa0cd5a51e0b66.png',
  'reinhardt': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af69ad7323ea8b6c693fa8f1207d85171bb96d84fb.png',
  'roadhog': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/72e02e747b66b61fcbc02d35d350770b3ec7cbaabd0a7ca17c0d82743d43a7e8.png',
  'sigma': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/cd7a4c0596d1a8632b5984878e8cb1f75266d77f3b5e0bf6c34cc0ad8baa2f1b.png',
  'winston': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/bd9c8e634d89488459dfc1aeb21b602fa5c39aa05601a4167682f3a3fed4e0ee.png',
  'wrecking-ball': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5c7e48cc24f17e6090f999933f8170bae9e3ef4023e94a1e4f9d28057d384093.png',
  'zarya': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8819ba85823136640d8eba2af6fd7b19d46b9ee8ab192a4e06fdf49310a7a890.png',
  'junker-queen': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/cef2406b2244b80506f83b8fb9ebaf214f41fa8795cbeef84026cd8018561d04.png',
  'ashe': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8dc2a024c9b7d95c7141b2ef065590dbd8d9944d5d2e0a4206f0d3e217c61928.png',
  'bastion': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4d715f722c42215072b5dd0240904aaed7b5285df0b2b082d0a7f1865b5ea992.png',
  'cassidy': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6cfb48b5597b657c2eafb1277dc5eef4a07eae90c265fcd37ed798189619f0a5.png',
  'echo': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f086bf235cc6b7f138609594218a8385c8e5f6405a39eceb0deb9afb429619fe.png',
  'genji': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png',
  'hanzo': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/aecd8fa677f0093344fab7ccb7c37516c764df3f5ff339a5a845a030a27ba7e0.png',
  'junkrat': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/037e3df083624e5480f8996821287479a375f62b470572a22773da0eaf9441d0.png',
  'mei': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/1533fcb0ee1d3f9586f84b4067c6f63eca3322c1c661f69bfb41cd9e4f4e2d7c.png',
  'pharah': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f8261595eca3e43e3b37cadb8161902cc416e38b7e0caa855f4555001156d814.png',
  'reaper': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/2edb9af69d987bb503cd31f7013ae693640e692b321a73d175957b9e64394f40.png',
  'soldier-76': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/20b4ef00ed05d6dba75df228241ed528df7b6c9556f04c8070bad1e2f89e0ff5.png',
  'sombra': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/bca8532688f01b071806063b9472f1c0f9fc9c7948e6b59e210006e69cec9022.png',
  'symmetra': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7f2024c5387c9d76d944a5db021c2774d1e9d7cbf39e9b6a35b364d38ea250ac.png',
  'torbjorn': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/1309ab1add1cc19189a2c8bc7b1471f88efa1073e9705d2397fdb37d45707d01.png',
  'tracer': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a3b1e2878fad56c5584a81eccc3ecdcb5e0eb736e15e5a4f3e706cd8be548aab.png',
  'venture': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3b4df5b88b7d8c8e4e2c1e93f7a8c8e7d5b3a8c8e4e2c1e93f7a8c8e7d5b3a8c.png',
  'widowmaker': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a714f1cb8b6c1b0b8cf2b6e8f7f9c1e8d7f9c1e8d7f9c1e8d7f9c1e8d7f9c1e8.png',
  'sojourn': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a0b8c6e7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5.png',
  'ana': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3429c394716364bbef802180e9763d04812751703e1e44cec34470b2c48e2b58.png',
  'baptiste': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f979896f74d9a8f8d24748cdf99f749dad5c672ff2ee6a1a1e3c1c4e8d8e8c8e.png',
  'brigitte': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/48392820c6976ee1cd8dde13e71df85bf15560083ee5c8658fe7c298095d619a.png',
  'juno': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b1e8c7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6.png',
  'kiriko': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/088aff2153bdfa426984b1d5c912f6523ed69a24bdb0923a57699cf5c1e5e604.png',
  'lifeweaver': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/39d4514f1b858bc228035b09d5a74ed41f8eeefc9a0d1873570b216ba04334df.png',
  'lucio': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e2ff2527610a0fbe0c9956f80925123ef3e66c213003e29d37436de30b90e4e1.png',
  'mercy': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/2508ddd39a178d5f6ae993ab43eeb3e7961e5a54a9507e6ae347381193f28943.png',
  'moira': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/000beeb5606e01497897fa9210dd3b1e78e1159ebfd8afdc9e989047d7d3d08f.png',
  'zenyatta': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/71cabc939c577581f66b952f9c70891db779251a8df0567c1c39f5b3273ce4e4.png',
  'illari': 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/1e88c5b8c836c0e4e8f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0.png',
};

// 创建目录
const publicDir = path.join(__dirname, '..', 'public', 'heroes');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 下载图片函数
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ 下载成功: ${filepath}`);
          resolve();
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      } else {
        reject(new Error(`下载失败: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// 主函数
async function downloadAllHeroImages() {
  console.log('开始下载英雄头像...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [heroId, imageUrl] of Object.entries(heroImageUrls)) {
    const filename = `${heroId}.png`;
    const filepath = path.join(publicDir, filename);
    
    try {
      await downloadImage(imageUrl, filepath);
      successCount++;
      // 添加延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`✗ 下载失败 ${heroId}: ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n下载完成！`);
  console.log(`成功: ${successCount}`);
  console.log(`失败: ${failCount}`);
  console.log(`总计: ${Object.keys(heroImageUrls).length}`);
}

// 运行
downloadAllHeroImages().catch(console.error);
