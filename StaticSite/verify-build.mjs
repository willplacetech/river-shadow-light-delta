import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const distUrl = new URL("./dist/", import.meta.url);
const html = await readFile(new URL("index.html", distUrl), "utf8");
const assets = await readdir(new URL("assets/", distUrl));
const scriptName = assets.find((name) => name.endsWith(".js"));
const styleName = assets.find((name) => name.endsWith(".css"));

assert.ok(scriptName, "Static JavaScript bundle is missing");
assert.ok(styleName, "Static CSS bundle is missing");
assert.match(html, /Pousada Recanto da Paz/);
assert.doesNotMatch(html, /\/api\/|\/auth\//);

const script = await readFile(new URL(`assets/${scriptName}`, distUrl), "utf8");
assert.doesNotMatch(script, /react-dom|react\/jsx-runtime/);

const dataSource = await readFile(new URL("../src/data/pousada.ts", import.meta.url), "utf8");
const photos = [...dataSource.matchAll(/src:\s*"(\/photos\/[^"]+)"/g)].map((match) => match[1]);
assert.ok(photos.length > 0, "No gallery photos found in the source data");

for (const photo of photos) {
  await access(fileURLToPath(new URL(`.${photo}`, distUrl)));
}

console.log(`Static output verified: ${photos.length} photo paths, HTML/CSS/JS present, no React runtime.`);
