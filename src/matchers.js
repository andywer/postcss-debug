export function contains (operand) {
  return string => string.indexOf(operand) > -1
}

export function regex (operand) {
  return string => string.match(operand)
}
