const { join } = require('path');
const { readdirSync, writeFileSync } = require('fs');

function getSVGFilenames () {
  const basePath = join(process.cwd(), 'src')
  const dir = readdirSync(join(basePath, 'svg'))
  const filenames = dir.map(file => file.split('.')[0])
  writeFileSync(join(basePath, 'js', './SVGIconNames.json'), JSON.stringify(filenames), 'utf-8')
}

getSVGFilenames()
