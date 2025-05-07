#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import * as css from 'css'
import { globSync } from 'glob'

// Define paths
const mastorsCssPath = path.resolve(__dirname, 'mastorsCDN/mastors.css')
const mastorsCdnCssPath = path.resolve(__dirname, 'mastorsCDN/mastorscdn.css')
const rendererDir = path.join(__dirname, 'renderer')
const vueFilesPath = path.join(rendererDir, '**', '*.vue').replace(/\\/g, '/')

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
}

// Debounce utility
function debounce(fn: () => void, ms: number): () => void {
  let timeoutId: NodeJS.Timeout | null = null
  return () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn()
      timeoutId = null
    }, ms)
  }
}

// Function to extract base class name from a CSS selector
function extractBaseClassName(selector: string): string | null {
  const classRegex = /\.[a-zA-Z0-9_-]+/
  const match = selector.match(classRegex)
  return match ? match[0].slice(1) : null
}

// Function to parse mastors.css and get all class-based rules
function getMastorsClasses(): Map<string, css.Rule[]> {
  if (!fs.existsSync(mastorsCssPath)) {
    console.error(`${colors.red}Error: ${mastorsCssPath} not found.${colors.reset}`)
    return new Map()
  }
  const mastorsContent = fs.readFileSync(mastorsCssPath, 'utf-8')
  const ast = css.parse(mastorsContent)
  const classRules = new Map<string, css.Rule[]>()

  ast.stylesheet?.rules.forEach((rule) => {
    if (rule.type === 'rule' && rule.selectors) {
      rule.selectors.forEach((selector) => {
        const baseClass = extractBaseClassName(selector)
        if (baseClass) {
          const rules = classRules.get(baseClass) || []
          rules.push(rule as css.Rule)
          classRules.set(baseClass, rules)
        }
      })
    }
  })

  return classRules
}

// Function to extract class names from a .vue file
function extractVueClasses(filePath: string): Set<string> {
  if (!fs.existsSync(filePath)) {
    return new Set()
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  const classes = new Set<string>()

  // Extract classes from <template>
  const templateMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/)
  if (templateMatch) {
    const templateContent = templateMatch[1]
    // Match class attributes (class="lobby player-card")
    const classAttrRegex = /class="([^"]*)"/g
    let match
    while ((match = classAttrRegex.exec(templateContent))) {
      match[1].split(/\s+/).forEach((cls) => {
        if (cls) classes.add(cls)
      })
    }
    // Match :class or v-bind:class (:class="['lobby', 'active']" or :class="{ lobby: true }")
    const vBindClassRegex = /:class="([^"]*)"/g
    while ((match = vBindClassRegex.exec(templateContent))) {
      const binding = match[1]
      // Handle array syntax: ['lobby', 'active']
      if (binding.startsWith('[')) {
        binding
          .slice(1, -1)
          .split(',')
          .forEach((cls) => {
            const cleaned = cls.replace(/['"]/g, '').trim()
            if (cleaned) classes.add(cleaned)
          })
      }
      // Handle object syntax: { lobby: true, 'player-card': condition }
      else if (binding.startsWith('{')) {
        const objMatch = binding.match(/['"]?([a-zA-Z0-9_-]+)['"]?\s*:/g)
        if (objMatch) {
          objMatch.forEach((key) => {
            const cls = key.replace(/['"]|:/g, '').trim()
            if (cls) classes.add(cls)
          })
        }
      }
    }
  }

  // Extract classes from <style>
  const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/)
  if (styleMatch) {
    const styleContent = styleMatch[1]
    try {
      const ast = css.parse(styleContent)
      ast.stylesheet?.rules.forEach((rule) => {
        if (rule.type === 'rule' && rule.selectors) {
          rule.selectors.forEach((selector) => {
            const baseClass = extractBaseClassName(selector)
            if (baseClass) classes.add(baseClass)
          })
        }
      })
    } catch (e) {
      // Silent error handling
    }
  }

  return classes
}

// Function to generate mastorscdn.css
function generateCdnCss() {
  const mastorsClasses = getMastorsClasses()
  if (mastorsClasses.size === 0) {
    console.warn(
      `${colors.yellow}No classes found in mastors.css. Skipping generation.${colors.reset}`
    )
    return
  }

  const vueFiles = globSync(vueFilesPath, { windowsPathsNoEscape: true })
  if (vueFiles.length === 0) {
    console.warn(`${colors.yellow}No .vue files found in renderer directory.${colors.reset}`)
    return
  }

  const usedClasses = new Set<string>()
  vueFiles.forEach((file) => {
    const vueClasses = extractVueClasses(file)
    vueClasses.forEach((cls) => usedClasses.add(cls))
  })

  if (usedClasses.size === 0) {
    console.warn(`${colors.yellow}No classes found in .vue files.${colors.reset}`)
    return
  }

  // Build new CSS rules
  const matchedRules: css.Rule[] = []
  for (const [className, rules] of mastorsClasses) {
    if (usedClasses.has(className)) {
      matchedRules.push(...rules)
    }
  }

  if (matchedRules.length === 0) {
    console.warn(`${colors.yellow}No matching classes found in mastors.css.${colors.reset}`)
    return
  }

  const ast: css.Stylesheet = {
    type: 'stylesheet',
    stylesheet: {
      rules: matchedRules,
      parsingErrors: []
    }
  }
  const cssOutput = css.stringify(ast, { compress: false })

  fs.writeFileSync(mastorsCdnCssPath, cssOutput, 'utf-8')
  console.log(
    `${colors.green}mastorscdn.css updated with${colors.reset} ${colors.yellow}${matchedRules.length}${colors.reset} ${colors.green}classes.${colors.reset}`
  )
}

// Watch for changes in .vue files and run initial generation
try {
  if (!fs.existsSync(rendererDir)) {
    console.error(`${colors.red}Error: Directory ${rendererDir} does not exist.${colors.reset}`)
    process.exit(1)
  }

  // Run initial generation
  generateCdnCss()

  // Set up fs.watch with debounced handler
  const debouncedGenerateCdnCss = debounce(generateCdnCss, 500)
  console.log(`${colors.yellow}Monitoring .vue files for changes...${colors.reset}`)
  fs.watch(rendererDir, { recursive: true }, (event, filename) => {
    if (filename && filename.endsWith('.vue')) {
      debouncedGenerateCdnCss()
    }
  })
} catch (error) {
  console.error(
    `${colors.red}Failed to start watcher or generate mastorscdn.css: ${error}${colors.reset}`
  )
  process.exit(1)
}
