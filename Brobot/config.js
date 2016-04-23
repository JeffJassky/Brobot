var config = {
	instruments: [
		{
			name: "snare",
			note: 36,
			pinNumber: 3,
			minimumPwm: 30,
			piezoPin: 0,
			delay: 100
		},
		{
			name: "kick",
			note: 39,
			pinNumber: 5,
			minimumPwm: 30,
			piezoPin: 1,
			delay: 100
		},
		{
			name: "hat",
			note: 40,
			pinNumber: 9,
			minimumPwm: 30,
			piezoPin: 2,
			delay: 100
		}
	]
}
module.exports = config;