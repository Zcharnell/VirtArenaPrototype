(function(){
	VirtArenaControl.Abilities = {
		preemptiveStrike:{
			name:"Preemptive Strike",
			type:"attack",
			user:"ally",
			desc:"+20 Power (doesn’t increase max attack) against Virts that have not activated this turn."
		},
		doubleStrike:{
			name:"Double Strike",
			type:"attack",
			user:"arturius",
			desc:"+20 Power for its second attack this turn."
		},
		preparation:{
			name:"Preparation",
			type:"attack",
			user:"ally",
			desc:"+20 Penetration next turn"
		},
		flash:{
			name:"Flash",
			type:"defense",
			user:"arturius",
			desc:"+40 Defense and +10 Deflect if Arturius has already activated this turn (1 turn cd)."
		},
		parry:{
			name:"Parry",
			type:"defense",
			user:"arturius",
			desc:"Make a Power Roll with Saber and reduce the attack’s Power by the result."
		},
		reinforce:{
			name:"Reinforce",
			type:"defense",
			user:"ally",
			desc:"+20 Defense and +40 Stability."
		},
		chargedShot:{
			name:"Charged Shot",
			type:"turn",
			user:"arturius",
			desc:"Arturius has -2 Move, Heavy Plasma Rifle gains Blast, and Fusion Tokens grant +10 Power per 2 tokens anted but do not grant Speed."
		},
		riposte:{
			name:"Riposte",
			type:"defense",
			user:"ally",
			desc:"+20 Defense. After resolving the attack, make a Power 30 Penetration 80 attack against the attacker if it’s within Range 1."
		}
	}
})();