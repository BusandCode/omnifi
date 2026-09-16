#!/usr/bin/env node
const fs = require('fs');

const files = process.argv.slice(2);
let fixed = 0, skipped = 0;

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  const original = src;

  // 1. Swap the static import for useTheme
  const importRegex = /import\s*\{\s*colors\s*\}\s*from\s*(['"])([^'"]*theme\/colors)\1;\r?\n?/;
  const importMatch = src.match(importRegex);
  if (!importMatch) {
    console.log(`SKIP (no static colors import): ${file}`);
    skipped++;
    continue;
  }
  const themePath = importMatch[2].replace('theme/colors', 'theme/ThemeContext');
  src = src.replace(importRegex, `import { useTheme } from '${themePath}';\n`);

  // 2. Find the component function
  const fnRegex = /export function (\w+)\(([^)]*)\)\s*(?::\s*[^{]+)?\{/;
  const fnMatch = src.match(fnRegex);
  if (!fnMatch) {
    console.log(`SKIP (no matching "export function" found — check manually): ${file}`);
    fs.writeFileSync(file, original);
    skipped++;
    continue;
  }
  const hookLine = `\n  const { colors: themeColors } = useTheme();`;
  const insertPos = fnMatch.index + fnMatch[0].length;
  src = src.slice(0, insertPos) + hookLine + src.slice(insertPos);

  // 3. Move `const styles = StyleSheet.create({...})` into a useMemo inside the component
  const stylesStart = src.match(/const styles = StyleSheet\.create\(\{/);
  if (stylesStart) {
    const startIdx = stylesStart.index;
    let i = startIdx + stylesStart[0].length - 1; // the opening {
    let depth = 0, endIdx = -1;
    for (; i < src.length; i++) {
      if (src[i] === '{') depth++;
      if (src[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
    }
    if (endIdx !== -1) {
      let j = endIdx + 1;
      while (src[j] === ' ') j++;
      if (src[j] === ')') j++;
      if (src[j] === ';') j++;
      const fullBlock = src.slice(startIdx, j);
      src = src.slice(0, startIdx) + src.slice(j);

      const bodyMatch = fullBlock.match(/const styles = StyleSheet\.create\((\{[\s\S]*\})\);\s*$/);
      const objectLiteral = bodyMatch[1];
      const newBlock = `\n  const styles = useMemo(\n    () => StyleSheet.create(${objectLiteral}),\n    [themeColors]\n  );\n`;

      const afterHookIdx = src.indexOf(hookLine) + hookLine.length;
      src = src.slice(0, afterHookIdx) + newBlock + src.slice(afterHookIdx);

      if (!/useMemo/.test(src.split('\n').find(l => l.includes("from 'react'")) || '')) {
        if (/from ['"]react['"]/.test(src)) {
          src = src.replace(/import\s*\{([^}]*)\}\s*from\s*(['"])react\2;/, (m, names, q) => {
            const trimmed = names.trim();
            return `import {${trimmed ? trimmed + ', useMemo' : ' useMemo '}} from ${q}react${q};`;
          });
        } else {
          src = `import { useMemo } from 'react';\n` + src;
        }
      }
    }
  }

  // 4. Replace any remaining bare `colors.` references with `themeColors.`
  src = src.replace(/\bcolors\./g, 'themeColors.');

  fs.writeFileSync(file, src, 'utf8');
  console.log(`FIXED: ${file}`);
  fixed++;
}

console.log(`\nDone. Fixed: ${fixed}, Skipped: ${skipped}`);