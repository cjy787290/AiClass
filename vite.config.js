import { cpSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: './',
  plugins: [{
    name: 'copy-course-pages',
    apply: 'build',
    closeBundle() {
      for (const folder of ['文字魔法變簡報', '圖文玩出簡報力', '實用工具百寶箱']) {
        const destination = resolve(root, 'dist/content', folder, 'pages');
        mkdirSync(destination, { recursive: true });
        cpSync(resolve(root, 'content', folder, 'pages'), destination, { recursive: true });
      }
    },
  }],
});
