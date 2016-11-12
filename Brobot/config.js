var config = {
	instruments: [
		{
			name: "(electric) Snare",
			note: 40,
			pinNumber: 9,
			latency: 8 // tested
		},
		{
			name: "(electric) Kick",
			note: 36,
			pinNumber: 5,
			latency: 16 // tested
		},
		{
			name: "(closed) Hat",
			note: 42,
			pinNumber: 10,
			latency: 15 // tested
		},
		{
			name: "Crash (cymbal 1)",
			note: 49,
			pinNumber: 11,
			latency: 15 // tested
		},
		{
			name: "Floor Tom (low)",
			note: 41,
			pinNumber: 6,
			latency: 9 // tested
		},
		{
			name: "Low Tom",
			note: 45,
			pinNumber: 7,
			latency: 9 // tested
		}
//                {
//                        name: "Ride",
//                        note: 51,
//                        pinNumber: 10,
//                        softLatencyAbsolute: 8
//                }
	]
}
module.exports = config;
