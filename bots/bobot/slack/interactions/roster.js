const datatron = require('../../../../server/datatron')
const messages = require('../../../../server/messages')

const fs = require('fs')

const file = datatron.loadFileData()
const roster = JSON.parse(file)
let users = {}

const reply = (payload) => {
	users = {}	
	return comprehend(payload)

}

const allotMembersInteraction = (payload) => {
  payload.replyType = 'blocks'
	payload.reply = formBuilder()
	user(payload)
  return payload	
}

const comprehend = (payload) => {

	const hint = hinter(payload.text)
	if (hint('help') || payload.text === '') return messages.text(payload, help)	
	if (hint('allot') || hint('schedule') || hint('allocate') || hint('slot')) return allotMembersInteraction(payload)
	if (hint('add') || hint('new')) return addMember(payload)
	if ((hint('show') || hint('list')) && hint('member')) return listMembersSlots(payload)
	if (hint('show') || hint('list')) return showRoster(payload)
	if (hint('dismiss')
		|| hint('remove')
		|| hint('remove member')
		|| hint('delete member')) return removeMember(payload)
	if ((hint('remove') || hint('clear')) && (hint('slot') || hint('sheduled'))) return clearSlot(payload)

	return doNotComprehend(payload)
}

const addMember = (payload) => {
	const words = payload.text.split(' ')
	const newMember = words[words.length - 1]
	if (roster.members[newMember]) {
		return textMessage(payload, `member ${newMember} is on the list`)
	}
	roster.members.push(newMember)
	fs.writeFileSync('data/roster.dat.json', JSON.stringify(roster))
	return textMessage(payload, `member ${newMember} added to the list`)
}

const showRoster = (payload) => {
	let format = ``
	for (slot in roster.roster) {
		const d = new Date(slot);
		const dayName = d.toString().split(' ')[0];
		format += `${dayName} ${slot} ${roster.roster[slot]}` + '\n'
	}
	return messages.text(payload, format)
}

const listMembersSlots = (payload) => {
	const text = payload.text
	const words = text.split(' ')
	const member = words[words.length - 1]
	const found = roster.members.find(m => m === member)
	if (found === undefined) {
		return textMessage(payload, `Member ${member} is not in the list`)
	}

	let slots = ``
	for (slot in roster.roster) {
		if (roster.roster[slot] === member) {
			slots = slots + `${slot} \n`
		}
	}
	if (slots) {
		return textMessage(payload, `${member}\n ${slots}`)
	}
	return textMessage(payload, `Member ${member} has no slots alloted`)
}

const removeMember = (payload) => {
	// remove from members and remove from schedule
}

const textMessage = (payload, text) => {
	payload.replyType = 'text'
	payload.reply = text
	return payload
}

const allotMember = (payload) => {

	if (payload.actions[0].type === 'datepicker') {
		const date = payload.actions[0].selected_date
		if (roster.roster[date]) {
			payload.replyType = 'text'
			payload.reply = `${roster.roster[date]} is sheduled for ${date}`
			payload.blocks = {}
			return payload
		}

		users[payload.user.id].date = date
	}

	if (payload.actions[0].type === 'static_select') { 
		users[payload.user.id].name = payload.actions[0].selected_option.value
	}

	if (users[payload.user.id].date && users[payload.user.id].name) {
		console.log('add to roster');
		roster.roster[users[payload.user.id].date] = users[payload.user.id].name
		fs.writeFileSync('data/roster.dat.json', JSON.stringify(roster))
		payload.blocks = {}
		payload.replyType = "text"
		payload.reply = `${users[payload.user.id].name} sheduled for ${users[payload.user.id].date}
		${JSON.stringify(roster.roster)}
		`
		return payload
	}

	//console.log('users ', users);

	payload.reply = false
	return

}

const hinter = (text) => {
  return (comp) => text.indexOf(comp) > -1
}

const doNotComprehend = (payload) => {
	payload.replyType = 'text'
	payload.reply = `I don't know /roster ${payload.text}, try /roster help`
	return payload
}

const user = (payload) => {
	if (!users[payload.user_id]) {
		users[payload.user_id] = { }
	}
}

const formBuilder = () => {

	allotmentForm[2].elements[0].placeholder.text = "Choose a team member"

  allotmentForm[2].elements[0].options = roster.members.map(m => {
    return {
      "text": {
        "type": "plain_text",
        "text": `${m}`,
        "emoji": true
      },
      "value": `${m}`
    }    
	})

	const [month, date, year] = (new Date()).toLocaleDateString().split('/')
	allotmentForm[3].elements[0].initial_date = `${year}-${month}-${date}`

  return allotmentForm
}


const allotmentForm = [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Allot a team member to a roster slot",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Pick a team member and a date"
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "static_select",
					"placeholder": {
						"type": "plain_text",
						"text": "Select an item",
						"emoji": true
					},
					"options": [
						{
							"text": {
								"type": "plain_text",
								"text": "*this is plain_text text*",
								"emoji": true
							},
							"value": "value-0"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "*this is plain_text text*",
								"emoji": true
							},
							"value": "value-1"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "*this is plain_text text*",
								"emoji": true
							},
							"value": "value-2"
						}
					]
				}
			]
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "datepicker",
					"initial_date": "2020-01-01",
					"placeholder": {
						"type": "plain_text",
						"text": "Select a date",
						"emoji": true
					}
				}
			]
		}
]
	
const help = `I can help you with the roster.

Type /roster or /roster help to see this list.
Type /roster show or list to see the full roster.
Type /roster show 15-02-2020 or /roster show today or /roster show tommorow.
Type /roster allot - to schedule a member on the roster
Type /roster add [name] - to add a new member to the roster membership
Type /roster move - to move a member from a schedule slot
Type /roster cancel - to de-schedule a member from a slot
Type /roster dismiss - to remove a member from roster membership`

exports.reply = reply
exports.allotMember = allotMember