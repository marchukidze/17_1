
window.addEventListener('load', function () {

	const step = 50;
	const height = 50;
	let sameKey = false;

	function keyup(event) {
		if (event.keyCode == 17) {
			blockTransformKeyUp()
			sameKey = false;
		}
	}

	function keydown(event) {

		if (event.keyCode == 39) {
			rightBlock()
		}

		else if (event.keyCode == 37) {
			leftBlock()
		}

		else if (event.keyCode == 40 && !sameKey) {
			blockDown()
		}

		else if (event.keyCode == 38 && !sameKey) {
			blockUp()
		}

		else if (event.keyCode == 17) {
			blockTransformKeyDown()
			sameKey = true;
		}

		else if (event.keyCode == 32 && !sameKey) {
			jumpBlock()
		}
	}

	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);

	class MenuItem {
		constructor(title, action) {
			this.title = title;
			this.action = action;
		}

		getItemTemplate() {
			return `<div class= menu-item data-action="${this.action}">${this.title}</div>`;
		}
	}

	const ACTION_KEY_JUMP = 'Jump';
	const ACTION_KEY_LEFT = 'Left';
	const ACTION_KEY_RIGHT = 'Right';
	const ACTION_KEY_REMOVE = 'Remove';
	const ACTION_KEY_CHANGECOLOR = 'Change_color';
	const ACTION_KEY_RESET = 'Reset';

	const ACTIONS = {
		[ACTION_KEY_JUMP]: ACTION_KEY_JUMP,
		[ACTION_KEY_LEFT]: ACTION_KEY_LEFT,
		[ACTION_KEY_RIGHT]: ACTION_KEY_RIGHT,
		[ACTION_KEY_CHANGECOLOR]: ACTION_KEY_CHANGECOLOR,
		[ACTION_KEY_REMOVE]: ACTION_KEY_REMOVE,
		[ACTION_KEY_RESET]: ACTION_KEY_RESET,
	};

	const сontextMenuBlock = [
		new MenuItem('Jump', ACTIONS[ACTION_KEY_JUMP]),
		new MenuItem('Left', ACTIONS[ACTION_KEY_LEFT]),
		new MenuItem('Right', ACTIONS[ACTION_KEY_RIGHT]),
		new MenuItem('Change-color', ACTIONS[ACTION_KEY_CHANGECOLOR]),
	];

	const сontextMenuDocument = [
		new MenuItem('Remove', ACTIONS[ACTION_KEY_REMOVE]),
		new MenuItem('Reset', ACTIONS[ACTION_KEY_RESET]),
	];

	const target = document.body;

	target.innerHTML += `
	   <div class="block"></div>
		<div class="context-menu block-menu">
			${сontextMenuBlock.map(item => item.getItemTemplate()).join('')}
		</div>
		<div class="context-menu document-menu">
			${сontextMenuDocument.map(item => item.getItemTemplate()).join('')}
		</div>
	`;

	document.addEventListener('contextmenu', event => {
		event.preventDefault();
		const contextMenu = document.querySelector('.context-menu.document-menu');
		contextMenu.style.left = `${event.clientX}px`;
		contextMenu.style.top = `${event.clientY}px`;
		contextMenu.classList.add('active');
	});

	document.querySelector('.block').addEventListener('contextmenu', event => {
		event.stopPropagation();
		event.preventDefault();
		const contextMenu = document.querySelector('.context-menu.block-menu');
		contextMenu.style.left = `${event.clientX}px`;
		contextMenu.style.top = `${event.clientY}px`;
		contextMenu.classList.add('active');
	});

	document.addEventListener('click', () => {
		hideContextMenu();
	});

	function hideContextMenu() {
		const contextMenus = document.querySelectorAll('.context-menu');
		contextMenus.forEach(menu => {
			menu.classList.remove('active');
		});
	}

	const struct = {
		[ACTION_KEY_JUMP]: () => { jumpBlock() },
		[ACTION_KEY_LEFT]: () => { leftBlock() },
		[ACTION_KEY_RIGHT]: () => { rightBlock() },
		[ACTION_KEY_CHANGECOLOR]: () => { changeColor() },
		[ACTION_KEY_REMOVE]: () => { block.remove() },
		[ACTION_KEY_RESET]: () => { resetBlock() },
	};

	target.querySelectorAll('.menu-item').forEach(item => {
		item.addEventListener('click', (event) => {
			const handler = struct[item.dataset.action];
			if (handler) {
				handler();
			}
		})
	});

	let block = document.querySelector('.block');
	let colors = ['#9a8eb9', '#5f44a8', '#31284b'];
	let colorNum = colors.length;
	count = 1;

	function resetBlock() {
		block.style.top = 'calc(50% - 75px)';
		block.style.left = 'calc(50% - 75px)';
		block.style.backgroundColor = colors[1]
	}

	function jumpBlock() {
		let offsetTop = block.offsetTop;
		block.style.top = offsetTop - height + 'px';
		setTimeout(() => block.style.top = block.offsetTop + height + 'px', 1000);
	}

	function leftBlock() {
		let offsetLeft = block.offsetLeft;
		block.style.left = offsetLeft - step + 'px';
		if (offsetLeft <= 0) {
			block.style.left = step * 2 + 'px';
		}
	}

	function rightBlock() {
		let offsetLeft = block.offsetLeft;
		block.style.left = offsetLeft + step + 'px';
		if (offsetLeft + block.offsetWidth >= window.innerWidth) {
			block.style.left = window.innerWidth - block.offsetWidth - step * 2 + 'px';
		}
	}

	function changeColor() {
		count++;
		if (count === colorNum) {
			count = 0;
		}
		block.style.backgroundColor = colors[count];
	}

	function blockDown() {
		let offsetTop = block.offsetTop;
		block.style.top = offsetTop + step + 'px';
		if (offsetTop + block.offsetHeight >= window.innerHeight) {
			block.style.top = window.innerHeight - block.offsetHeight - step * 2 + 'px';
		}
	}

	function blockUp() {
		let offsetTop = block.offsetTop;
		block.style.top = offsetTop - step + 'px';
		if (offsetTop <= 0) {
			block.style.top = step * 2 + 'px';
		}
	}

	function blockTransformKeyDown() {
		block.style.transform = 'scaleY(0.6) scaleX(1.15)';
    }

	function blockTransformKeyUp() {
		block.style.transform = 'scaleY(1) scaleX(1)';
	}
});




// window.addEventListener('load', function () {

// 	const step = 50;
// 	const height = 50;
// 	let sameKey = false;
// 	let block = document.querySelector('.block');
// 	function keyup(event) {
// 		if (event.keyCode == 17) {
// 			block.style.transform = 'scaleY(1) scaleX(1)';
// 			sameKey = false;
// 		}
// 	}

// 	function keydown(event) {
	
// 		let offsetLeft = block.offsetLeft;
// 		let offsetTop = block.offsetTop;

// 		if (event.keyCode == 39) {
// 			block.style.left = offsetLeft + step + 'px';
// 			if (offsetLeft + block.offsetWidth >= window.innerWidth) {
// 				block.style.left = window.innerWidth - block.offsetWidth - step * 2 + 'px';
// 			}
// 		}

// 		else if (event.keyCode == 37) {
// 			block.style.left = offsetLeft - step + 'px';
// 			if (offsetLeft <= 0) {
// 				block.style.left = step * 2 + 'px';
// 			}
// 		}

// 		else if (event.keyCode == 40 && !sameKey) {
// 			block.style.top = offsetTop + step + 'px';
// 			if (offsetTop + block.offsetHeight >= window.innerHeight) {
// 				block.style.top = window.innerHeight - block.offsetHeight - step * 2 + 'px';
// 			}
// 		}

// 		else if (event.keyCode == 38 && !sameKey) {
// 			block.style.top = offsetTop - step + 'px';
// 			if (offsetTop <= 0) {
// 				block.style.top = step * 2 + 'px';
// 			}
// 		}

// 		else if (event.keyCode == 17) {
// 			block.style.transform = 'scaleY(0.6) scaleX(1.15)';
// 			sameKey = true;
// 		}

// 		else if (event.keyCode == 32 && !sameKey) {
// 			block.style.top = offsetTop - height + 'px';
// 			setTimeout(() => block.style.top = block.offsetTop + height + 'px', 1000);
// 		}
// 	}

// 	document.addEventListener('keydown', keydown);
// 	document.addEventListener('keyup', keyup);

// 	let ContextMenuBlock = document.querySelector('.block-menu');
// 	let ContextMenuDocument = document.querySelector('.document-menu');
// 	let jump = document.querySelector('.jump');
// 	let left = document.querySelector('.left');
// 	let right = document.querySelector('.right');
// 	let changeColor = document.querySelector('.change-color');
// 	let remove = document.querySelector('.remove');
// 	let reset = document.querySelector('.reset');
// 	let colors = ['#9a8eb9', '#5f44a8', '#31284b'];
// 	let colorNum = colors.length;
// 	count = 1;

// 	window.addEventListener("contextmenu", function (event) {
// 		event.preventDefault();
// 		if (event.target == block) {
// 			OpenMenu(ContextMenuBlock);
// 		} else {
// 			OpenMenu(ContextMenuDocument);
// 		}
// 	});

// 	function OpenMenu(menu) {
// 		menu.style.top = `${event.clientY}px`;
// 		menu.style.left = `${event.clientX}px`;
// 		menu.classList.add("active");
// 	}

// 	window.addEventListener("click", function (event) {
// 		ContextMenuBlock.classList.remove("active");
// 		ContextMenuDocument.classList.remove("active");
// 	});

// 	window.addEventListener("click", function (event) {
// 		let offsetLeft = block.offsetLeft;
// 		let offsetTop = block.offsetTop;
// 		if (event.target == jump) {
// 			block.style.top = offsetTop - height + 'px';
// 			setTimeout(() => block.style.top = block.offsetTop + height + 'px', 1000);
// 		}

// 		if (event.target == left) {
// 			block.style.left = offsetLeft - step + 'px';

// 			if (offsetLeft <= 0) {
// 				block.style.left = step * 2 + 'px';
// 			}
// 		}

// 		if (event.target == right) {
// 			block.style.left = offsetLeft + step + 'px';

// 			if (offsetLeft + block.offsetWidth >= window.innerWidth) {
// 				block.style.left = window.innerWidth - block.offsetWidth - step * 2 + 'px';
// 			}
// 		}

// 		if (event.target == changeColor) {
// 			count++;
// 			if (count === colorNum) {
// 				count = 0;
// 			}
// 			block.style.backgroundColor = colors[count];
// 		}

// 		if (event.target == remove) {
// 			block.remove()
// 		}

// 		if (event.target == reset) {
// 			block.style.top = 'calc(50% - 75px)';
// 			block.style.left = 'calc(50% - 75px)';
// 		}

// 	});
// });
