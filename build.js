const terser = require("terser");
const postcss = require("postcss");
const cssnano = require("cssnano");
const fs = require("fs").promises;

async function minifyJS(inputPath, outputPath) {
  const code = await fs.readFile(inputPath, "utf8");
  const result = await terser.minify(code);
  await fs.writeFile(outputPath, result.code, "utf8");
  console.log(`✅ Minified JS: ${outputPath}`);
}

async function minifyCSS(inputPath, outputPath) {
  const css = await fs.readFile(inputPath, "utf8");
  const result = await postcss([cssnano]).process(css, { from: undefined });
  await fs.writeFile(outputPath, result.css, "utf8");
  console.log(`✅ Minified CSS: ${outputPath}`);
}

async function run() {
  await minifyJS("./scripts/app.js", "./scripts/app.min.js");
  await minifyJS("./scripts/product.js", "./scripts/product.min.js");

  await minifyCSS("./styles/main.css", "./styles/main.min.css");
  await minifyCSS("./styles/auth.css", "./styles/auth.min.css");
}

run().catch(err => {
  console.error("❌ Error during build:", err);
});
