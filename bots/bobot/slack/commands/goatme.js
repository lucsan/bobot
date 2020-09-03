const hinter = (text) => {
  return (comp) => text.indexOf(comp) > -1
}

const reply = (user, text) => {
  if (text === '') {
    return `🐐 What kinda goating needs ya ${user}?
    I got big, I got small, I got meh`
  }
  const hint = hinter(text)
  if (hint('big')) return `🐐 __Mehhhhhhhhhhhhrrrrrrr__`
  if (hint('small')) return `🐐 Bleat`
  if (hint('meh')) return `🐐 meh`
  return `🐐 Whaaa?`
}

exports.reply = reply