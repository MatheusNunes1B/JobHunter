import sharp from 'sharp';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';
for (const name of ['icon', 'splash']) {
 const m = await sharp(`assets/${name}.png`).metadata();
 console.log(name, m.width, m.height, 'alpha:', m.hasAlpha);
 if (m.width !== (name === 'icon' ? 1024 : 2732) || m.width !== m.height || m.hasAlpha) throw Error('Invalid PNG');
}
const workflow = parse(readFileSync('.github/workflows/android-build.yml', 'utf8'));
if (!workflow.on.push.branches.includes('main') || !workflow.on.push.branches.includes('master') || !('workflow_dispatch' in workflow.on)) throw Error('Invalid triggers');
const artifact = workflow.jobs.build.steps.find(step => step.uses?.startsWith('actions/upload-artifact'));
if (artifact.with.name !== 'meu-aplicativo-apk' || artifact.with.path !== 'android/app/build/outputs/apk/debug/app-debug.apk') throw Error('Invalid artifact');
for (const dpi of ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi']) console.log(dpi, readdirSync(`android/app/src/main/res/mipmap-${dpi}`).join(', '));
console.log('YAML and assets validated.');
