const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('K-Nomad 홈페이지 캡처 중...');

  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 전체 페이지 스크린샷
  await page.screenshot({ path: 'k-nomad-full.png', fullPage: true });
  console.log('전체 페이지 스크린샷 저장: k-nomad-full.png');

  // Hero 섹션
  await page.screenshot({ path: 'k-nomad-hero.png' });
  console.log('Hero 섹션 스크린샷 저장: k-nomad-hero.png');

  // 스크롤해서 카드 섹션
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'k-nomad-cards.png' });
  console.log('City Cards 스크린샷 저장: k-nomad-cards.png');

  // 모바일 뷰
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'k-nomad-mobile.png', fullPage: true });
  console.log('모바일 스크린샷 저장: k-nomad-mobile.png');

  await browser.close();
  console.log('\n캡처 완료!');
})();
