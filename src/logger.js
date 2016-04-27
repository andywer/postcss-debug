
export default {
  print(snapshots, options) {
    snapshots.forEach(snapshot => console.log(snapshot.timestamp, snapshot.css.toString()))
  }
}
