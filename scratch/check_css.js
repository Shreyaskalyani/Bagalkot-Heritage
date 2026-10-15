const http = require('http');

http.get('http://localhost:3000/food-culture', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const cssMatch = data.match(/href="(\/_next\/static\/css\/[^"]+)"/);
    if (!cssMatch) {
      console.log('No CSS file found');
      return;
    }
    const cssPath = cssMatch[1];
    console.log('Fetching CSS:', cssPath);
    http.get('http://localhost:3000' + cssPath, (cssRes) => {
      let css = '';
      cssRes.on('data', chunk => css += chunk);
      cssRes.on('end', () => {
        const absIdx = css.indexOf('.absolute{');
        const relIdx = css.indexOf('.relative{');
        console.log('.absolute index:', absIdx);
        console.log('.relative index:', relIdx);
        console.log('Does .relative override .absolute?', relIdx > absIdx);
      });
    });
  });
});
