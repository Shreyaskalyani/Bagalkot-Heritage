const http = require('http');

http.get('http://localhost:3000/food-culture', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    // Find FoodHero section in HTML
    const heroMatch = data.match(/<section[^>]*aria-label="Bagalkot Food Culture Hero"[^>]*>([\s\S]*?)<\/section>/);
    if (heroMatch) {
      console.log('Found Hero Section:');
      console.log(heroMatch[0].substring(0, 800));
    } else {
      console.log('Hero section not matched directly');
    }
  });
}).on('error', err => console.error(err));
