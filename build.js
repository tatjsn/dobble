import { RADIUS } from "./conf.js";

export function symbol(symbol) {
	let node = new Image();
  node.src = `./images/${symbol}`;
	node.classList.add("symbol");
	return node;
}

function getPositionTransform(index, count) {
	function angleLayout(index, count, dist) {
		let angle = index * 2*Math.PI / count;
		let x = Math.cos(angle) * dist;
		let y = Math.sin(angle) * dist;
		return `translate(${x}px, ${y}px)`;
	}

	if (count < 4) {
		return angleLayout(index, count, RADIUS * 0.5);
	} else if (count < 9) {
		if (index == 0) { return ""; }
		return angleLayout(index-1, count-1, RADIUS * 0.7);
	} else {
		if (index  < 3) {
			return angleLayout(index, 3, RADIUS * 0.3);
		} else {
			return angleLayout(index-3 + 0.5, count-3, RADIUS * 0.75);
		}
	}
}

function getScaleRange(count) {
	if (count < 4) {
		return [1, 2];
	} else if (count < 9) {
		return [0.8, 1.4];
	} else {
		return [0.5, 1];
	}
}

function positionAndStyle(symbol, index, count) {
	let transforms = [`translate(-50%, -50%)`];

	let position = getPositionTransform(index, count);
	transforms.push(position);

	transforms.push(`rotate(${Math.random()*360}deg)`);

	let scaleRange = getScaleRange(count);
	let scale = scaleRange[0] + Math.random()*(scaleRange[1]-scaleRange[0]);
	transforms.push(`scale(${scale})`);

	symbol.style.transform = transforms.join(" ");
}

function card(card, symbols) {
	let node = document.createElement("div");
	node.classList.add("card");

	card.forEach((sindex, i) => {
		let s = symbol(symbols[sindex]);
		positionAndStyle(s, i, card.length);
		node.appendChild(s);
	});

	return node;
}

export function cards(cards, symbols) {
	let node = document.createDocumentFragment();
	cards.map(c => card(c, symbols)).forEach(c => node.appendChild(c));
	return node;
}