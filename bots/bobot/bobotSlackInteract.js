const slackForm = require('../bobot/slack/forms/dialogme')
const roster = require('../bobot/slack/interactions/roster')

const perform = (data) => {

  const reply = JSON.parse(data)

  if (reply.type === 'view_submission') {
    console.log('view_submissions', reply); //modal response
    console.log('blocks', reply.view.blocks);
    console.log('state', reply.view.state);

    if (reply.view.callback_id === 'add_to_roster') {
      return roster.add(reply)
    }
    return
  }

  if (reply.type === 'block_actions') {
    reply.channel_id = reply.channel.id
    console.log('block_actions, slack relpy to interactive pick -> \n\n', reply);

    if (reply.actions[0].type === 'button') {
      if (reply.message.blocks[0].text.text === 'Dialog Me') {
        return slackForm.response(reply)
      }      
    }

    if (reply.actions[0].type === 'static_select') {
      if (reply.message.blocks[0].text.text === 'Allot a team member to a roster slot') {
        return roster.allotMember(reply)
      }
    }
    
    if (reply.actions[0].type === 'datepicker') {
      if (reply.message.blocks[0].text.text === 'Allot a team member to a roster slot') {
        return roster.allotMember(reply)
      }
    }

  }

}

exports.perform = perform