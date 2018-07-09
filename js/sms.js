(function() {

	var
	createNode = function(type) {

		return document.createElement(type);

	},
	addClass = function(node, className) {

		node.classList.add(className);
		return node;

	},
	append = function(child, parent) {

		parent.appendChild(child);

	},
	setHtml = function(node, html) {

		node.innerHTML = html;
		return node;

	},
	setAttribute = function(node, key, value) {

		node.setAttribute(key, value);
		return node;

	};

	var
	iPhone = function() {

		this.node = createNode('div');

		this.conversations = [];

		addClass(this.node, 'messages');

	};
	iPhone.prototype.speed = 2;
	iPhone.prototype.conversation = 0;
	iPhone.prototype.start = function() {

		var
		phone = this,
		conversation = this.conversations[this.conversation],
		messsage = conversation.messages[conversation.message],
		node = createNode('div');

		setTimeout(function() {

			setHtml(node, messsage[2]);

			setAttribute(node, 'data-sent', messsage[1]);
			addClass(node, 'message');

			append(node, phone.node);

			document.body.scrollTop = (document.body.clientHeight-window.innerHeight);

			if(conversation.moreMessages()) {
				conversation.message ++;
				phone.start();
			}
			else {
				console.log('no more messages');
			};

		}, (messsage[0]*1000)/phone.speed);

	};

	iPhone.prototype.addConversation = function(conversation) {

		return this.conversations.push(conversation);

	};

	var
	Conversation = function(recipient, messages) {

		this.recipient = recipient;
		this.messages = messages;

	};
	Conversation.prototype.moreMessages = function() {

		return this.message<(this.messages.length-1);

	};
	Conversation.prototype.message = 0;

	phone = new iPhone();
	phone.addConversation(new Conversation('Mark', [
		// [delay, sent, message],
		[3, 0, 'hello'],
		[5, 1, 'hi there'],
		[2, 1, 'how are you?'],
		[5, 0, 'not bad thanks'],
		[1, 0, 'you?'],
		[3, 1, 'good thanks'],
		[5, 0, 'been up to much?'],
		[3, 1, 'not much'],
		[3, 1, 'you?'],
		[5, 0, 'sort of'],
		[1, 0, 'well'],
		[3, 0, 'i made this thing'],
		[5, 1, 'yeah?'],
		[2, 0, 'called facebook'],
		[5, 1, 'what\'s that?'],
		[3, 0, 'i reckon it\'ll be the next big thing!'],
		[2, 1, 'you do?'],
		[2, 0, 'yeah'],
		[1, 0, 'i wrote it using php'],
		[5, 1, 'you did?'],
		[3, 0, 'yeah'],
		[6, 1, 'but php is shit, right?'],
		[2, 0, 'well'],
		[3, 0, 'depends who you\'re asking']
	]));

	append(phone.node, document.body);

	phone.start();

})();
