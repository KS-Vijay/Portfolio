const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Class names mappings
  { regex: /space-violet/g, replace: 'accent-emerald' },
  { regex: /space-purple/g, replace: 'accent-indigo' },
  { regex: /space-pink/g, replace: 'accent-teal' },
  { regex: /space-dark/g, replace: 'bg-base' },
  { regex: /space-deep/g, replace: 'bg-surface' },
  
  // text-white -> text-aurora-text
  { regex: /text-white/g, replace: 'text-aurora-text' },
  { regex: /text-\[\#ffffff\]/gi, replace: 'text-aurora-text' },

  // Hex codes for purple -> emerald (#34d399) or indigo (#6366f1)
  // Let's replace the popular purple ones with emerald
  { regex: /#8b5cf6/gi, replace: '#34d399' },
  { regex: /#7c3aed/gi, replace: '#34d399' },
  { regex: /#a78bfa/gi, replace: '#34d399' },
  { regex: /#6b46c1/gi, replace: '#6366f1' },  // secondary
  { regex: /#ec4899/gi, replace: '#22d3ee' },  // pink -> teal
  
  // Dark backgrounds mapped to #050d1a (base) or #0a1628 (surface)
  { regex: /#0a0a0f/gi, replace: '#050d1a' },
  { regex: /#1a1a2e/gi, replace: '#0a1628' },
  { regex: /#0f0f0f|#111111|#0a0a0a/gi, replace: '#050d1a' },

  // White text replacements
  { regex: /#ffffff/gi, replace: '#e2f5ef' },
  { regex: /#f8f8f8/gi, replace: '#e2f5ef' }
];

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

walkSync(srcDir, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;
    
    replacements.forEach(({ regex, replace }) => {
      if (regex.test(content)) {
        content = content.replace(regex, replace);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${filePath}`);
    }
  }
});
console.log("Done replacing colors.");
