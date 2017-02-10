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

	},
	iPhone = function(messages, recipient) {

		this.node = createNode("div");
		this.messages = messages;
		this.recipient = recipient;

		addClass(this.node, "messages");

		this.start();

	};
	iPhone.prototype.message = 0;
	iPhone.prototype.speed = 2;
	iPhone.prototype.start = function() {

		var
		phone = this,
		messsage = phone.messages[phone.message],
		node = createNode("div");

		setTimeout(function() {

			setHtml(node, messsage[2]);
			
			setAttribute(node, "data-sent", messsage[1]);
			addClass(node, "message");

			append(node, phone.node);

			document.body.scrollTop = (document.body.clientHeight-window.innerHeight);

			if(phone.moreMessages()) {
				phone.message ++;
				phone.start();
			}
			else {
				console.log("!! no more messages");
			};

		}, (messsage[0]*1000)/phone.speed);

	};
	iPhone.prototype.moreMessages = function() {

		return this.message<(this.messages.length-1);

	};

	phone = new iPhone([
		// [delay, sent, message],
		[3, 0, "hello"],
		[5, 1, "hi there"],
		[2, 1, "how are you?"],
		[5, 0, "not bad thanks"],
		[1.5, 0, "you?"],
		[3, 1, "good thanks"],
		[5, 0, "been up to much?"],
		[3, 1, "not much"],
		[3, 1, "you?"],
		[5, 0, "sort of"],
		[1, 0, "well"],
		[3, 0, "i made this thing"],
		[5, 1, "yeah?"],
		[2, 0, "called facebook"],
		[5, 1, "what's that?"],
		[3, 0, "i reckon it'll be the next big thing!"],
		[2, 1, "you do?"],
		[2, 0, "yeah"],
		[1, 0, "i wrote it using php"],
		[5, 1, "you did?"],
		[3, 0, "yeah"],
		[6, 1, "but php is shit, right?"],
		[2, 0, "well"],
		[3, 0, "depends who you're asking really"]
	], "Mark");

	append(phone.node, document.body);

})();