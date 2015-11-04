(function(){
	VirtArenaControl.Abilities = {
		preemptiveStrike:{
			name:"Preemptive Strike",
			type:"attack",
			user:"ally",
			target:"self",
			desc:"+20 Power (doesn’t increase max attack) against Units that have not activated this turn.",
			keys:['power'],
			values:[20]
		},
		power20:{
			name:"Power +20",
			type:"attack",
			user:"ally",
			target:"self",
			desc:"+20 Power (doesn’t increase max attack) against Units that have not activated this turn.",
			keys:['power'],
			values:[20]
		},
		defense20:{
			name:"Defense +20",
			type:"defense",
			user:"ally",
			target:"ally",
			desc:"+20 Power (doesn’t increase max attack) against Units that have not activated this turn.",
			keys:['defense'],
			values:[20]
		},
		stability20:{
			name:"Stability +20",
			type:"defense",
			user:"ally",
			target:"ally",
			desc:"+20 Power (doesn’t increase max attack) against Units that have not activated this turn.",
			keys:['stability'],
			values:[20]
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
			target:"self",
			desc:"+20 Penetration next turn",
			keys:['power'],
			values:[20]
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
			target:"self",
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
			target:"self",
			desc:"+20 Defense. After resolving the attack, make a Power 30 Penetration 80 attack against the attacker if it’s within Range 1."
		}
	}

	VirtArenaControl.Abilities.summonCompanion = function(tile){
		VirtArenaControl.TurnController.currentAbility.misc.team.addCompanion(VirtArenaControl.TurnController.currentAbility.misc.companion,tile);
		VirtArenaControl.TurnController.currentAbility.misc.team.cardUsed(VirtArenaControl.TurnController.currentAbility.card);
		VirtArenaControl.TurnController.resetCurrentAbility();
	}

	VirtArenaControl.Abilities.useAttackAbility = function(target){
		target.addAttackAbility(VirtArenaControl.TurnController.currentAbility.misc.ability);
		// VirtArenaControl.TurnController.currentAbility.misc.team.addCompanion(VirtArenaControl.TurnController.currentAbility.misc.companion,tile);
		VirtArenaControl.TurnController.currentAbility.misc.team.cardUsed(VirtArenaControl.TurnController.currentAbility.card);
		VirtArenaControl.TurnController.resetCurrentAbility();
	}

	VirtArenaControl.Abilities.useAttackAbility = function(target){
		target.addDefenseAbility(VirtArenaControl.TurnController.currentAbility.misc.ability);
		// VirtArenaControl.TurnController.currentAbility.misc.team.addCompanion(VirtArenaControl.TurnController.currentAbility.misc.companion,tile);
		VirtArenaControl.TurnController.currentAbility.misc.team.cardUsed(VirtArenaControl.TurnController.currentAbility.card);
		VirtArenaControl.TurnController.resetCurrentAbility();
	}
})();