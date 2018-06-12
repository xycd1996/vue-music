function getRandomInt(min, max) {
  return (Math.random() * (max - min + 1) + min) | 0// Math.random()取值范围为[0,1),+1使得能够取得上限值
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}