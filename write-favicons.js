// this utility will generate favicons from our themes.css file
const fs = require('fs')
const read = require('read-css')

/**
 * @method
 * @param {Array} rules
 * @return {Array}
 */
const removeUnneededRules = (rules) =>
  rules.filter(
    (rule) => rule.selectors && rule.selectors[0].includes('.theme-')
  )
const removeUnneededDeclarations = (declarations) =>
  declarations.filter(
    (declaration) =>
      declaration.property &&
      (declaration.property.includes('--accent-legend') ||
        declaration.property.includes('--accent-cap'))
  )

const createHSLObject = (declarations) => {
  const hsl = {}
  declarations.forEach((declaration) => {
    const propertyName = declaration.property.replace('--accent-', '')
    hsl[propertyName] = declaration.value
  })
  return hsl
}

const createThemeObject = (rules) =>
  rules.map((rule) => {
    let { declarations } = rule
    const ruleName = rule.selectors[0].replace('.theme-', '')
    declarations = removeUnneededDeclarations(declarations)
    declarations = createHSLObject(declarations)
    return {
      [ruleName]: {
        background: `hsl(${declarations['cap-h']}, ${declarations['cap-s']}, ${declarations['cap-l']})`,
        backgroundS: `hsl(${declarations['cap-h']}, ${
          declarations['cap-s']
        }, ${decreasePercentValue(declarations['cap-l'])})`,
        foreground: `hsl(${declarations['legend-h']}, ${declarations['legend-s']}, ${declarations['legend-l']})`,
      },
    }
  })

const decreasePercentValue = (value) => {
  const base = value.slice(0, -1)
  const result = Number(base) - 5
  return `${result}%`
}

const generateThemes = async () => {
  const { stylesheet } = await read('./assets/themes.css')
  let { rules } = stylesheet
  rules = removeUnneededRules(rules)
  const themes = createThemeObject(rules)
  return themes
}

const generateFavicons = (themes) => {
  const favicons = []
  themes.forEach((theme) => {
    const themeName = Object.keys(theme)[0]
    favicons.push({
      [themeName]: `<svg
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect fill="${theme[themeName].backgroundS}" width="24" height="24" rx="2"/>
  <rect fill="${theme[themeName].background}" x="2" width="20" height="20" rx="2"/>
  <path fill="${theme[themeName].foreground}" d="M14.145 12.1625C14.3817 12.4123 14.5 12.6839 14.5 12.9772C14.5 13.2813 14.3868 13.5475 14.1605 13.7756C13.9444 14.0037 13.6924 14.1178 13.4043 14.1178C13.0751 14.1178 12.7819 13.9766 12.5247 13.6941L7.74072 8.75698V12.8957C7.74072 13.2868 7.6327 13.5964 7.41665 13.8245C7.2006 14.0526 6.90739 14.1667 6.53702 14.1667C6.16665 14.1667 5.87344 14.0526 5.65739 13.8245C5.44134 13.5964 5.33331 13.2868 5.33331 12.8957V3.75466C5.33331 3.37446 5.44134 3.0703 5.65739 2.84218C5.87344 2.61406 6.16665 2.5 6.53702 2.5C6.90739 2.5 7.2006 2.61406 7.41665 2.84218C7.6327 3.0703 7.74072 3.37446 7.74072 3.75466V7.64898L12.4012 2.87477C12.6276 2.63579 12.8848 2.51629 13.1728 2.51629C13.4609 2.51629 13.7129 2.63035 13.929 2.85847C14.145 3.07573 14.2531 3.33644 14.2531 3.6406C14.2531 3.95562 14.1296 4.23805 13.8827 4.4879L10.2099 8.12151L14.145 12.1625Z" />
</svg>`,
    })
  })
  return favicons
}

const writeFaviconstoFile = (favicons) => {
  favicons.forEach((favicon) => {
    const filename = `static/favicon-${Object.keys(favicon)[0]}.svg`
    const svg = Object.values(favicon)[0]
    fs.writeFile(filename, svg, (err) => {
      if (err) throw err
      console.log(filename, 'saved!')
    })
  })
}

const init = async () => {
  const themes = await generateThemes()
  const favicons = generateFavicons(themes)
  writeFaviconstoFile(favicons)
}

init()
