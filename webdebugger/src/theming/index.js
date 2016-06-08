// Those are the availably themes
// and the values are the CSS class names you have to set on the <body> to
// use the theme
const THEME_RED = ''
const THEME_DARK = 'dark__theme'

const LS_THEME_KEY = 'theme'

let activeTheme = THEME_RED

function setTheme (theme) {
  const prevTheme = activeTheme
  activeTheme = theme

  applyThemeToDOM(prevTheme, activeTheme)
  window.localStorage.setItem(LS_THEME_KEY, activeTheme)
}

function applyThemeToDOM (prevTheme, nextTheme) {
  if (prevTheme) {
    document.body.classList.remove(prevTheme)
  }
  if (nextTheme) {
    document.body.classList.add(nextTheme)
  }
}

function toggleTheme () {
  if (activeTheme === THEME_RED) {
    setTheme(THEME_DARK)
  } else {
    setTheme(THEME_RED)
  }
}

function setupKeyListener () {
  document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.keyCode == 68) {
      toggleTheme()
    }
  })
}

export function init () {
  setupKeyListener()

  const theme = window.localStorage.getItem(LS_THEME_KEY)
  if (theme) {
    setTheme(theme)
  }
}
