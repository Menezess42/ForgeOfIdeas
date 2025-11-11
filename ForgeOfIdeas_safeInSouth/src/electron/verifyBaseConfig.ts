import fs from 'fs';
import { baseDirPath } from './pathResolver.js';
import path from "path";

export function verifyBaseConfig() {
  const baseDir = baseDirPath(); // pega o caminho certo (dev/build)

  // Se não existir, cria
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const baseFiles = ['shelf.json', 'anvil.json'];

  for (const baseFile of baseFiles){
      const filePath = path.join(baseDir, baseFile);
      if (!fs.existsSync(filePath)){
          fs.writeFileSync(filePath, '');
      }
  }
}
