/**
 * Insert all the component themes into the main themes lib files
 *
 */

import fs from 'fs-extra'
import globby from 'globby'
import packpath from 'packpath'
import path, { basename } from 'path'
import prettier from 'prettier'
import { ErrorHandler, log } from '../../lib'

const prettierrc = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc'), 'utf-8')
)

const runThemeFactory = async () => {
  log.start('> PrePublish: Starting the themes factory ...')

  const processToNamesIgnoreList = [
    '!**/__tests__/',
    '!**/web-components/',
    '!**/style/',
    '!**/helper-classes/',
    '!**/*_not_in_use*'
  ]

  // make themes
  await runFactory({
    // input
    processToNamesList: [
      path.resolve(
        __dirname,
        '../../../src/{components,patterns}/**/style/themes/**/dnb-*.scss'
      ),
      ...processToNamesIgnoreList
    ],
    // output
    scssOutputPath: path.resolve(__dirname, '../../../src/style/themes'),
    customContent: `
/**
  ATTENTION: This file is auto generated by using "themeFactory".
  Do not change the content above!
  All the themes get auto generated in here
*/`
  }).then(() => {
    if (require.main === module) {
      log.succeed(
        '> PrePublish: "themeFactory" Created the themes files with all the components'
      )
    }
  })
}

const autoAdvice = `
/**
 * ATTENTION: This file is auto generated by using "themeFactory".
 * You CAN change the content on the very top!
 */
`

export const runFactory = async ({
  processToNamesList, // input
  scssOutputPath = null, // output
  customContent = '',
  returnResult = false
}) => {
  try {
    processToNamesList = await globby(processToNamesList)
    processToNamesList.sort()
  } catch (e) {
    console.log('Error', e)
  }

  processToNamesList = processToNamesList.map((source) => ({
    source,
    name: basename(source)
  }))

  const groups = {}
  const collectedOutput = []

  processToNamesList.forEach((object) => {
    const name = /(.*)-theme-(.*)\.scss/g.exec(object.name)[2]
    groups[name] = groups[name] || []
    groups[name].push(object)
  })

  // make a group of all gathered themes we later will interact through
  const themes = []
  Object.entries(groups).forEach((group) => {
    const name = group[0]
    const files = group[1]
    const theme = files
      .reduce((acc, { source }) => {
        const path = packpath.self()
        acc.push(
          `\n@import '${source.replace(
            new RegExp(`${path}/src/`, 'g'),
            '../../../'
          )}';`
        )
        return acc
      }, [])
      .join('')
    themes.push({
      name,
      theme
    })
  })

  try {
    themes.forEach(async ({ name, theme }) => {
      const file = `${scssOutputPath}/theme-${name}/dnb-theme-${name}.scss`
      let fileContent = ''
      if (fs.existsSync(file)) {
        fileContent = await fs.readFile(file, 'utf-8')
        fileContent = fileContent.replace(
          /(\/\*\*[^]*not change the content above![^]*\*\/)([^]*)/g,
          `$1\n${theme}\n`
        )
      } else {
        fileContent = `${autoAdvice}\n${customContent}\n${theme}\n`
      }
      if (returnResult) {
        collectedOutput.push(fileContent)
      } else {
        await fs.writeFile(
          file,
          prettier.format(fileContent, {
            ...prettierrc,
            filepath: file
          })
        )
      }
    })
  } catch (e) {
    log.fail(`There was an error on creating ${scssOutputPath}!`)
    new ErrorHandler(e)
  }

  if (returnResult) {
    return collectedOutput
  }
}

if (require.main === module && process.env.NODE_ENV !== 'test') {
  log.start()
  runThemeFactory().then(() => {
    log.succeed()
  })
}

export { runThemeFactory }
