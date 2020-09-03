const clock = () => {
  const [month, day, year]     = ( new Date() ).toLocaleDateString().split("/")
  const [hour, minute, second] = ( new Date() ).toLocaleTimeString().slice(0,8).split(":")

  return [year, month, day, hour, minute, second]
}

const start = () => {
  setInterval(() => {watcher()}, 1000)
}

const watcher = (ts) => {
  const triggers = [
    {
      id: 'test1 - fires once a minute on a given second',
      time: { second: 10 },
      act: () => { console.log('triggered test1') }        
    },
    {
      id: 'tickTest - fires every tick',
      time: { tick: true },
      act: () => { console.log('tick test triggered') }
    }
  ]

  const [year, month, day, hour, minute, second] = clock()



  for (trigger of triggers) {
    console.log(trigger.time);
    if (trigger.time.tick !== undefined) {
      trigger.act()
    }
    if (trigger.time.second !== undefined) {
      if (trigger.time.second == second) trigger.act()
    }
    
  //console.log(trigger.time.minute, minute)
  }

  

  console.log(year, month, day, hour, minute, second);
}

start()