import { getIdeasPath} from './ensureBaseFiles.js';
import path from 'path';
import fs from 'fs';

export function saveJsonToIdeas(json: unknown){
    const filePath = path.join(getIdeasPath(), 'mockup.json');
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf-8');
}
