let Curse = {
	name: "Initial curse",
	date: new Date()
}

let getCurse = () => Curse;
let setCurse = (curse) => {
	Curse.name = curse;
	Curse.date = new Date();
}

module.exports = {getCurse, setCurse};