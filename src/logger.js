function pad (value, digits) {
  const string = String(value)

  return string.length < digits
    ? '0'.repeat(digits - string.length) + string
    : string
}

export default class DefaultLogger {
  print (file, snapshots, options) {
    snapshots.forEach(snapshot => {
      const transformationLabel = snapshot.isFirstSnapshot() ? 'initially' : `after ${snapshot.prevPlugin}`

      console.log(this.formatTime(snapshot.timestamp), file)
      console.log(`[ ${transformationLabel} ]`)
      console.log(snapshot.css.toString())
    })
  }

  formatTime (date) {
    date = date instanceof Date ? date : new Date(date)
    return pad(date.getHours(), 2) + ':'
      + pad(date.getMinutes(), 2) + ':'
      + pad(date.getSeconds(), 2) + '.'
      + pad(date.getMilliseconds(), 3)
  }
}
