const perform = (payload) => {
  console.log(payload)
  if (payload.type === 'url_verification') return payload
  
  const event = payload.event

  // Slack event mention
  if (event.type == 'app_mention') { return appMention(payload) }

  // Slack event message.channels (note: this event fires as well as app_mention if the bots name is mentioned)
  if (event.type == 'message') {
    console.log('message', event.text);
    return false
  }

}

const appMention = (payload) => {
  console.log('bot mentioned')
  const text = payload.event.text.replace(`<@${payload.authed_users}> `, '')
  console.log('text', text);
  
  payload.replyType = 'text'  
  payload.reply = `do you want goating <@${payload.event.user}>?`
  return payload
  // @bobot add @barry to the roster for 2020-09-14
  // @bobot roster add barry 2020-
}

const comprehend = (text) => {

}

const noMessage = () => {

}

const hinter = (text) => {
  return (comp) => text.indexOf(comp) > -1
}


exports.perform = perform