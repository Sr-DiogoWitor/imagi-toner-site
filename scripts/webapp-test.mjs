const url = process.env.TEST_URL || 'http://127.0.0.1:4173';
const response = await fetch(url);
const html = await response.text();
const checks = {
  status: response.status,
  title: /<title>[^<]+<\/title>/.test(html),
  hero: html.includes('id="hero-title"'),
  sections: ['inicio', 'servicos', 'solucoes', 'sobre', 'contato'].every((id) => html.includes('id="' + id + '"')),
};
if (response.status !== 200 || !checks.title || !checks.hero || !checks.sections) process.exit(1);
console.log(JSON.stringify(checks, null, 2));
