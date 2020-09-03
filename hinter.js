

const hinter = (text) => {
  return (comp) => comp.find(w => text.indexOf(w) > -1)
}

const roster = [
  { barry: 'today' },
  { tracy: 'tommorow' }
]

const text1 = `who's on the roster?`

const interpreter = (text) => {

  console.log('says: ', text);

  const hints = hinter(text)

  const subjects= ['watch', 'duty', 'roster']

  const quest = hints(['who', 'whom', 'what', 'where', 'when', 'show', 'how', 'list'])
  const link = hints(['is', 'can', 'are', 'there'])
  const subject = hints(subjects)
  const temporal = hints(['today', 'tommorow', 'week', 'month', 'morning', 'afternoon'])
  const act = hints(['add', 'remove']) 

  console.log(quest, subject, temporal)

  if (quest == 'show' && subject == undefined && temporal == undefined) {
    return `what would you like to see? I can show you ${subjects}`
  }

  if (quest === 'who' && subject == 'roster' && temporal == undefined) {
    return `would you like to see the roster?`
  }

}

console.log(interpreter(text1))
console.log(interpreter(`is barry on the roster?`))
console.log(interpreter(`show me`))
console.log(interpreter(`show me who is on the roster`))




