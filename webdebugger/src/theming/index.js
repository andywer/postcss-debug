// Those are the availably themes
// and the values are the CSS class names you have to set on the <body> to
// use the theme
const THEME_RED = ''
const THEME_DARK = 'dark__theme'

let activeTheme = THEME_RED

function setTheme (theme) {
  const prevTheme = activeTheme
  activeTheme = theme

  if (prevTheme) {
    document.body.classList.remove(prevTheme)
  }
  if (activeTheme) {
    document.body.classList.add(activeTheme)
  }
}

function toggleTheme () {
  if (activeTheme === THEME_RED) {
    setTheme(THEME_DARK)
  } else {
    setTheme(THEME_RED)
  }
}

export function setupKeyListener () {
  document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.keyCode == 68) {
      toggleTheme()
    }
  })
}
