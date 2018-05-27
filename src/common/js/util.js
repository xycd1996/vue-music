function getRandomInt(min, max) {
  return (Math.random() * (max - min + 1) + min) | 0// Math.random()取值范围为[0,1),+1使得能够取得上限值
}

export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr
}