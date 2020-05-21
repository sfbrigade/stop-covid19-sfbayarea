export default (num1: number, num2: number): string => {
  // increase case
  if (num2 >= num1) {
    const diff = num2 - num1
    const change = ((diff / num1) * 100).toFixed(2)
    return change
  } else {
    // decrease case
    const diff = num1 - num2
    const change = ((diff / num1) * -100).toFixed(2)
    return change
  }
}
