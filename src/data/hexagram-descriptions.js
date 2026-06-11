/**
 * I Ching — the classical source the 64 Human Design gates are built on.
 * Each entry renders King Wen Hexagram N (= Gate N): the woven Judgment + Image,
 * and the six changing-line meanings (line 1 = bottom). Original modern prose,
 * faithful to the public-domain text — not reproduced from any one translation.
 * Keyed [gate] -> { name, meaning, lines: {1..6} }.
 */

export const HEXAGRAM_DESCRIPTIONS = {
  1: {
    name: "The Creative",
    meaning: "The Creative brings the highest order of success, and it favors those who stay constant to what is right and true; its pure originating energy carries things forward when your purpose is grounded in integrity rather than impulse. It is heaven set above heaven — an image of tireless, vigorous motion — so the wise person draws on that endless strength to keep growing, working on themselves steadily and never letting up.",
    lines: {
      1: "A dragon lies hidden in the deep — the creative force is genuine but not yet ready, so refrain from action and let your power quietly build.",
      2: "The dragon appears in the open field, now visible to all; it serves you well to come forward and to seek the great, capable person who can recognize and join you.",
      3: "Responsibility weighs on you, so labor wholeheartedly through the day and stay watchful into the night; danger is present, yet by remaining alert you keep yourself free of blame.",
      4: "The dragon wavers at the edge of the deep, free to spring upward or to sink back; this is a turning point where either choice, made honestly, leaves you without fault.",
      5: "The dragon flies high in the heavens, its power fully expressed and rightly placed; now it serves you to seek out the great person whose presence amplifies what you can achieve.",
      6: "A dragon that climbs too high will know regret; driven past its natural limit, arrogance cuts the strong off from others and brings the fall.",
    }
  },
  2: {
    name: "The Receptive",
    meaning: "The Receptive is the power of pure devotion, and it opens the way to the highest success — not by striking out in front, but by responding, like a mare that keeps its footing over endless plains. Take the lead and you wander off course; follow a worthy guide and you are shown the path, finding companions where the work calls you and steady fortune in patient constancy. Its image is the earth, which bears every burden without complaint, so the person of depth widens their own nature until it can hold the whole world.",
    lines: {
      1: "Frost stiffening beneath your step warns that hard ice is coming; faint first signs already point to where a slow process will end, so read them and prepare while it is early.",
      2: "Be straight, level, and wide in your nature. When you are simply true to what you are, without scheming toward any aim, nothing is left undone and every matter still comes right.",
      3: "Hold your talents in reserve and stay steady at your work. If you act in another's service, do not grasp at the credit; carry the task through to completion, and the good outcome arrives in its own season.",
      4: "Bind the sack and knot it shut. In a watchful, hazardous time, keep your thoughts and gifts withdrawn — you draw no praise and invite no harm, and that careful silence is itself the safety.",
      5: "A yellow undergarment, worn beneath and unseen, brings the highest good fortune; real worth lives in quiet, well-placed restraint rather than show, and modesty that knows its proper station is richly rewarded.",
      6: "When the yielding strains beyond its bounds, dragons clash out in the wild, and the blood they shed runs dark and yellow at once; to force the receptive into open rivalry wounds every side and wastes what was precious.",
    }
  },
  3: {
    name: "Difficulty at the Beginning",
    meaning: "Difficulty at the Beginning is the turbulence of new life forcing its way up, a sprout straining against packed earth; real success is available, but only through steady commitment, and the wise course is not to launch boldly alone but to gather capable allies and let the venture take root before reaching further. Its image pairs thunder stirring below with rain-cloud massing above, a charged confusion out of which form has yet to settle; the considered response is to sort the tangle thread by thread and draw a workable order from the chaos.",
    lines: {
      1: "You stall at the threshold, checked before you can move; rather than push against the block, hold your ground with patience and put down roots. Drawing the right people to your side now, and meeting them as a servant rather than a master, is what carries you through.",
      2: "Obstacles stack up and progress halts, as if horse and cart pulled apart and could go no further. One who approaches you is no raider but an honest suitor awaiting the right moment; the steady-hearted does not pledge herself in haste, and only when the season turns—ten years on—does the bond rightly form. Wait for what is true, not what is merely at hand.",
      3: "To chase the deer into the forest with no forester to guide you is only to lose yourself among the trees. One who reads the moment well sees there is no quarry to be had and turns back in time; to press blindly onward leads straight into regret.",
      4: "Again horse and cart stand apart, but here the answer is to reach out: move toward the one who can join with you and lend their strength. Going forward in this spirit brings good fortune, and nothing is wasted in the effort.",
      5: "Your means to give and to influence are dammed up, unable to reach those who need them—the channels are not yet dug. Modest, well-aimed action still does real good, but forcing a grand release now, before the way is open, only ends in ruin. Nourish what can be nourished today and let the rest wait.",
      6: "At the far edge of the struggle everything seizes up; horse and cart pull apart for good, and the grief runs down like tears of blood. Every road has been tried and none goes through, so the only true release is to stop pushing, let the loss be felt, and weep rather than fight on.",
    }
  },
  4: {
    name: "Youthful Folly",
    meaning: "Youthful Folly is the natural rawness of a beginning, and it brings no disgrace as long as it reaches for guidance instead of refusing it: the teacher does not run after the pupil; the pupil comes to the teacher. Ask once in earnest and a clear answer is given, but question again and again out of doubt or mistrust and you only cloud the spring, so the wise wait to be sought rather than force themselves on anyone. As water rises at the mountain's foot, fresh but not yet knowing its course, so a person of formed character feeds the young mind steadily, building sound habit through thoroughness and patient, consistent action.",
    lines: {
      1: "To break through ignorance, some discipline is needed at the outset, and a firm correction can be useful for loosening bad habits. But once it has served to set a limit, the constraint must be lifted; if rigid punishment becomes the whole method instead of a door into understanding, it only shames and hardens the one being taught, and the effort ends in regret.",
      2: "The strength here is patience: carry the foolish and the immature with an even temper, rather than demanding they already be wise. Such tolerance can even welcome a rough or unpolished partner into the household and win their trust, and the one who bears these burdens kindly holds the family together well.",
      3: "Do not fling yourself at someone merely because they are powerful or dazzling, losing your footing and self-respect in the rush to please them. A person who gives themselves away like this gains nothing good, so keep hold of yourself instead of chasing whatever glitters.",
      4: "This is folly that gets stuck — spinning fantasies sealed off from anything real and refusing the correction that could free it. Such stubbornness stays tangled in empty imaginings, and shame is the outcome until reality is finally faced.",
      5: "This is the folly of the innocent who learns with an open mind, like a child without conceit, glad to be taught. That humble willingness draws good fortune, because the unguarded and teachable mind takes in instruction easily and grows.",
      6: "When folly must be met with force, the purpose is to stop the harm, not to vent anger or punish for its own sake. Stand firm against the wrongdoing itself rather than turning cruel toward the person, so the correction shields rather than wounds — drive off the trespass, don't become the trespasser.",
    }
  },
  5: {
    name: "Waiting",
    meaning: "Waiting teaches grounded confidence: with danger ahead that cannot yet be crossed, forcing the moment only invites ruin, so keep your sincerity intact and trust that right timing will open the way and carry you safely across the great water. The image is clouds massed in the sky, the rain gathered but not yet falling; seeing this, the wise person waits without fretting — eating, drinking, and holding an easy, good-humored spirit until the moment is ripe.",
    lines: {
      1: "Waiting far out on the open meadow, well clear of the danger; keep to your steady, everyday round and do not stir toward the trouble, and you stay free of fault.",
      2: "Waiting nearer in, on the sand by the water; small frictions and loose talk begin to surface, but if you remain calm and unhurried it comes to a good end.",
      3: "Waiting stuck in the mud at the very edge of the water — you have crowded too close, and that nearness draws the enemy toward you; only watchful, deliberate care keeps the loss from turning into disaster.",
      4: "Waiting having sunk into the pit of blood, caught now in genuine peril; the way out is to stay composed and give ground, climbing free rather than thrashing in deeper.",
      5: "Waiting over food and wine, a calm respite at the very center of the danger where you restore your strength; stay constant, and good fortune comes.",
      6: "You drop into the pit at the close, and three uninvited guests appear; meet them with respect, and what seemed like ruin resolves into good fortune.",
    }
  },
  6: {
    name: "Conflict",
    meaning: "Conflict comes when an honest aim runs into a wall that will not give way, like water draining downward while heaven climbs the other direction; you are sincere yet blocked, so the wise move is to stop partway and stay wary rather than press all the way to a ruinous finish — and this is no moment to launch a bold venture across rough water. Seek out a fair-minded authority who can weigh the matter justly. Because heaven and water pull apart from the start, the thoughtful person settles the terms of every undertaking clearly at the outset, before dispute can take root.",
    lines: {
      1: "Let the matter drop instead of dragging it on. A little gossip may follow, but keeping the friction small means it ends well.",
      2: "You face an opponent too strong to beat, so do not push the quarrel; pull back to your own home and stand down. By refusing the fight you spare your whole town of three hundred households from being dragged into harm.",
      3: "Live on the worth you have already earned and hold steady, knowing the ground is dangerous; in the end it turns out well. If you serve someone greater, finish the work without grasping at the credit for yourself.",
      4: "You have the strength to force the dispute, but it cannot succeed. Turn back, accept how things stand, and let your heart change toward what is right; settling into that brings good fortune.",
      5: "Bring your case before one who judges with true fairness. Here the conflict meets an honest arbiter, and the outcome is the best it can be.",
      6: "Suppose strife carries you to the top and you are handed a badge of rank. A prize won by fighting gives no peace; before the morning is out it will be torn from you and contested, again and again.",
    }
  },
  7: {
    name: "The Army",
    meaning: "The Army succeeds only under a tested, upright leader who can unify a mass of people; without firm discipline and a just cause, sheer numbers lead to ruin, but in the right hands there is good fortune and no fault. Its image is water gathered within the earth — a hidden store beneath the surface — so the wise leader nourishes the people and wins their devotion through generosity, holding strength in reserve until it is truly needed.",
    lines: {
      1: "An army must march out under clear structure and discipline from the outset; when that ordered footing is missing at the start, even a rightful aim ends in misfortune.",
      2: "The commander stays among the ranks rather than aloof from them, sharing their lot and so earning real trust; from this steady, centered conduct, honors and reward from above naturally arrive.",
      3: "When leadership is divided or left to incompetent hands, the campaign collapses and the wagons may carry the dead back home — a venture run by the wrong people invites disaster.",
      4: "A deliberate withdrawal carries no blame; falling back to firmer ground when advance would be reckless is wise judgment, not defeat.",
      5: "When trouble enters the field it is right to meet it, but only seasoned, responsible leadership should direct the campaign; hand it to untried people and the effort, however just, ends in ruin.",
      6: "With victory secured, the ruler grants fitting honors, titles, and lands, but the petty and unworthy must never be placed in lasting positions of power — reward them in other ways, lest they spoil what was won.",
    }
  },
  8: {
    name: "Holding Together",
    meaning: "Holding together brings good fortune, but consult yourself once more and be sure: are you grounded, lasting, and steady enough to be relied on? If so, others join you without blame, the wavering gradually come around, and only those who arrive too late meet misfortune. The image is water lying upon the earth, seeping into every hollow and clinging fast — so the early kings settled the regions and kept warm bonds with those who governed them, uniting through closeness rather than command.",
    lines: {
      1: "Bind yourself to others through plain sincerity from the outset, and the tie holds without fault. When that good faith fills you completely, like a clay bowl filled to the brim, good fortune eventually arrives from a quarter you did not expect.",
      2: "Let the bond grow from within, springing from your own integrity rather than being chased. Hold to who you are and let the connection meet you as an equal; to offer yourself cheaply from below is to lose your standing. Steadfastness brings good fortune.",
      3: "You find yourself among people who are not truly yours — companions whose path does not run with your own. Keep some distance and stay reserved, for tying yourself to the wrong people leads nowhere worth going.",
      4: "Now the bond rightly shows itself outwardly, openly joining you to one who is worthy. There is no shame in declaring this loyalty plainly; holding firm in following the capable brings good fortune.",
      5: "This is union made plain and openhanded, like a king who hunts driving game from three sides only and lets what flees before him go. Those who wish to come are welcomed without pressure, those who turn away are let go, and so people draw near of their own will — good fortune.",
      6: "Here the union has no head, no beginning rooted in real commitment. To reach for belonging only at the very end, when the moment for forming bonds has already passed, leaves you with nothing to stand on — misfortune.",
    }
  },
  9: {
    name: "The Taming Power of the Small",
    meaning: "A single small force checks a much greater one — like a thin bank of clouds drifting in from the west that thickens but lets down no rain. The time calls for restraint and patient preparation rather than force: you work on what lies near and within reach, refining yourself and your influence while the larger movement stays beyond your grasp. The Image is wind moving across the open sky, with nothing solid to seize, so the wise person tends to the surface of things, polishing character and outward grace until the moment ripens.",
    lines: {
      1: "Sensing resistance ahead, you turn back to your own path instead of pressing the matter. Returning to where you truly belong is no defeat here — it keeps you free of blame and leaves the way open, and good fortune follows.",
      2: "Seeing another already drawn back by the moment, you let yourself be pulled back alongside rather than pushing on alone. Retreating in good company carries good fortune; there is no shame in choosing not to advance.",
      3: "Like a cart whose spokes have sprung loose from the wheels, the joint effort jolts to a halt and can go no further. Husband and wife turn their eyes from each other, unable to keep accord — the small power is overreaching, and forcing things ahead only breaks them.",
      4: "In a strained moment when harm seems close at hand, sincerity clears the danger away and the dread dissolves. Holding to what is true carries you past the threat without wound and without fault.",
      5: "Your sincerity binds others to you so steadily that trust itself becomes a shared strength. As though joined hand in hand, you gather your neighbors in and grow richer together, never at their cost.",
      6: "At last the rain falls and the long restraint has done its work, so for now you may rest, since patient effort and steady character have reached their fullness. But the balance is fragile: the moon stands nearly full, and to press or assert yourself further from here invites misfortune.",
    }
  },
  10: {
    name: "Treading",
    meaning: "Treading is moving carefully where there is real danger — like walking close behind a tiger, near enough to step on its tail, yet carrying yourself with such steady courtesy that it does not turn and bite; conduct yourself rightly and you pass through and succeed. The image is open heaven above and a still lake below: this is the natural order of high and low, and the wise person marks these distinctions clearly, settling each person into a place where they belong.",
    lines: {
      1: "Walk on plainly, exactly as you are, asking for nothing extra; someone of simple, unburdened conduct goes forward without fault.",
      2: "You tread a smooth and open road where the way is clear; a quiet, self-contained person free of ambition holds an inner steadiness, and this brings good fortune.",
      3: "A half-blind man trusts his eyes and a lame man trusts his stride — reaching past what they can actually do, they step on the tiger and are bitten; this is the recklessness of the weak who push ahead as though strong, fit only to serve as a hired fighter under someone else's command.",
      4: "You step on the tiger's tail, but because you move in fear and great caution, watchful at every step, you come through in the end to good fortune.",
      5: "You tread with firm resolve and full commitment; the way is right, yet stay alert to the danger even so, for the ground is steep and the position precarious.",
      6: "Look back over the whole path you have walked and weigh what its signs reveal; if your conduct has come full circle without flaw, great good fortune follows.",
    }
  },
  11: {
    name: "Peace",
    meaning: "Peace comes when heaven's rising power settles beneath earth's descending power, so the two mingle and all things thrive; the petty and grasping withdraws while the great and generous draws near, and the season rewards steadfast right action. With earth set above heaven and their breaths interweaving, the wise leader uses this fertile time to shape and complete the rhythms of nature, marshaling the world's resources so the people are fed and sustained.",
    lines: {
      1: "Tug at a single reed and a whole knot of roots lifts with it — worthy people bring their own kind along, so move forward in company and good fortune follows.",
      2: "Take in even the coarse and uncultivated, cross the river boldly without waiting for a boat, forget no one however distant, and play no favorites — hold to the balanced center and you meet what the hour asks of you.",
      3: "Every level stretch eventually tilts into a slope, every departure circles back to return; stay upright through the turn, do not fret over what is bound to come, and your nourishment will keep its blessing.",
      4: "He comes down lightly and open-handed, leaning on no riches of his own, drawing close to those beside him — the high descend to the low in unforced trust, moved by sincerity rather than any caution.",
      5: "The sovereign sends his younger sister to be wed below, setting aside his rank to join with those beneath him; from this comes true favor and the fullest good fortune.",
      6: "The rampart slips back into the trench it rose from — the good season has turned; raise no army now, keep your commands within your own walls, and steady as you stay, there is still cause for regret.",
    }
  },
  12: {
    name: "Standstill",
    meaning: "Standstill is a season of blocked flow: heaven rises away above and earth settles below, so the two never touch and nothing circulates or ripens; mean and grasping people are climbing while those of real worth are pushed down, and the counsel is that the principled person gains nothing by bending to this corrupt order. The Image is heaven and earth parting ways, refusing to meet. When the age has turned foul, draw back, guard your character out of sight, and refuse to be tempted into office or paid into compromise.",
    lines: {
      1: "Pull at one stalk of grass and a whole tangle of roots lifts with it; so the worthy do not retreat alone but draw their own kind along. At the opening of a hard time, holding firm in withdrawal brings good fortune and a clear way through.",
      2: "The small-minded survive by fawning and going along, and for them such submission pays. But the steadfast person, though enduring the obstruction quietly, will not trade principle for favor, and by that refusal keeps their worth whole.",
      3: "Those lifted into place by crooked means carry a swallowed shame; in their own hearts they know the position is undeserved. Their unease betrays how false their standing truly is.",
      4: "Now the obstruction nears its turn. One who acts on a higher mandate, at the moment that is given rather than seized, completes the work without fault, and all who labor in the same spirit come to share the good that follows.",
      5: "The standstill begins to break, and good fortune comes to the one of real strength and worth — yet this is no time to relax. They keep warning themselves, \"What if it slips, what if it fails?\" and so bind their footing fast, like a thing lashed to the deep-rooted shoots of a mulberry stump.",
      6: "At last the obstruction topples and is gone. What began as dead stagnation breaks open into relief and gladness, for no condition holds forever, and standstill, having run its course, tips over into movement once more.",
    }
  },
  13: {
    name: "Fellowship with Men",
    meaning: "Fellowship with others succeeds when the bond is formed in the open, on aims spoken plainly for all to share, not in closed circles or private favor; a union this broad has the strength to carry you across the great water of hard undertakings, provided the purpose is upright and the commitment steady. The image is fire below and heaven above, flame rising of its own nature toward the open sky. Seeing this, the wise person sorts people and things by kind and draws clear distinctions, so that real community can rest on honest ground rather than confusion.",
    lines: {
      1: "Fellowship at the gate, in plain view of all. Because nothing is concealed and no faction has yet taken shape, joining together openly here carries no blame.",
      2: "Fellowship confined to one's own clan brings cause for shame. To bind only with your own kind is a narrow, partial union, and it falls short of the open-handed kinship the moment asks for.",
      3: "He conceals weapons in the brush and climbs the high ridge to keep watch, braced for treachery that may never come. For three years he holds this guarded posture and makes no move, and so the union he longed for never arrives.",
      4: "He scales the rampart as if to attack, but does not carry the assault through. Seeing that force here cannot rightly prevail, he is turned back toward principle, and this restraint brings good fortune.",
      5: "Those meant to be joined are first held apart, and they weep and cry out in their longing. Yet after great striving they break through every barrier and come together at last in laughter; perseverance through the struggle wins the meeting.",
      6: "Fellowship reaches only as far as the outskirts, a bond with those at a distance rather than with close companions. There is no regret in it, yet the deepest aim of true union is left unfulfilled.",
    }
  },
  14: {
    name: "Possession in Great Measure",
    meaning: "Possession in Great Measure brings supreme success: you hold real abundance, and it stays sound because your character is clear and your aim is generous rather than grasping. The image is fire blazing high in the heavens — the sun at noon, its light reaching everything — so the wise person checks what is harmful, fosters what is good, and lives in accord with a benevolent heaven. Great wealth honestly held and humbly stewarded is the surest fortune.",
    lines: {
      1: "At the very start you are not yet entangled with the harmful side of plenty; stay mindful of the difficulty ahead and you remain blameless, for that caution keeps wealth from corrupting you.",
      2: "A great wagon, built to carry a heavy load, stands ready; with capable helpers and solid resources you can take on real responsibility and set out in any direction without coming to harm.",
      3: "A worthy noble lays his possessions open in service to the sovereign and the common good; a small-minded person could never do this, for he would only hoard for himself.",
      4: "Do not flaunt your abundance or measure yourself against those who shine brightest beside you; by holding your wealth in check, unboastful and unprovocative, you escape envy and stay free of fault.",
      5: "Meet others with sincere, open-hearted trust, yet carry a dignity that is felt rather than displayed; this warmth, kept from being mistaken for weakness by your quiet command, wins devotion and brings good fortune.",
      6: "At the very height of plenty you are blessed from above; by staying humble and right-acting rather than proud, you draw heaven's favor, and nothing fails to go well.",
    }
  },
  15: {
    name: "Modesty",
    meaning: "Modesty opens a way through, and the person of character holds to it until matters are seen all the way to their end. What rises too high is drawn down and what sits too low is lifted up, so that heaven and earth even out surplus against lack — the mountain rests hidden inside the earth, great mass kept quietly out of view. The wise take this as their measure, drawing down from what overflows to fill what runs short, weighing each thing so the shares come out fair.",
    lines: {
      1: "Modesty layered upon modesty: one who lays no claim to standing can wade across the wide river and meet with fortune, since asking nothing for themselves they can shoulder the hardest passage and come through unharmed.",
      2: "Humility grown so real that it rings out of its own accord, like a tone heard without being struck; to keep faith with such honest modesty steadily over time draws good fortune.",
      3: "Genuine work and earned merit joined to a quiet manner: because such a one stays unassuming even after achieving much, the task is brought fully to its close and fortune follows.",
      4: "In every direction it serves to let modesty guide one's movement; here it is right to act and to put humility plainly into practice, leading through service without ever pushing past one's place.",
      5: "Wealth is not needed to win a neighbor's help; from this modest standing it is fitting to move with firmness, to set things right by force where that is called for, and nothing will go amiss.",
      6: "Modesty that has long sounded inwardly now carries over into deeds; it is right to send the troops forward, yet only to bring order to one's own city and land, never to reach for what lies outside them.",
    }
  },
  16: {
    name: "Enthusiasm",
    meaning: "Enthusiasm is the moment when energy gathers and movement comes without strain, so it favors appointing helpers and marshaling collective effort; once people are truly stirred, even great undertakings advance against little resistance. Its image is thunder bursting up out of the earth, a sudden release of power stored through the long stillness. Meeting that returning force, the early kings answered with music and ceremony, exalting what deserved honor, offering it to the highest power, and calling their ancestors to share in the rite.",
    lines: {
      1: "Broadcasting your good fortune and your closeness to those in power spends the energy on display alone; enthusiasm paraded this way burns out quickly and ends in misfortune.",
      2: "Steady as bedrock, you sense the turn before a single day has passed and neither rush ahead nor cling on too long; this exact feel for when to move and when to halt is true discernment, and holding to it brings good fortune.",
      3: "Gazing upward at those above and hesitating for their cue invites regret; wait too long for permission instead of acting on your own reading, and the moment passes, leaving only remorse.",
      4: "You are the wellspring the enthusiasm flows from, and through you great things are achieved; cast off doubt, and as a clasp draws scattered strands together, companions and allies gather to your side.",
      5: "Chronically afflicted yet never finished off, your enthusiasm is pressed down and cannot run free, but that very constraint guards you from reckless indulgence, so you carry on and survive.",
      6: "Enthusiasm has darkened your sight and carried you off course; yet if you wake to the illusion even at the very end and turn back, no real harm remains.",
    }
  },
  17: {
    name: "Following",
    meaning: "Following brings the highest success, and it holds firm when your devotion stays correct rather than convenient — there is no fault in giving yourself to what is genuinely worthy. The Image shows thunder fallen quiet within the lake: the active force has settled into rest as night comes on. In the same spirit, the wise person withdraws indoors at nightfall to recover, knowing that the strength to lead well begins with knowing when to yield.",
    lines: {
      1: "What you follow is shifting, and that change is sound if you hold to what is right. Don't seal yourself off — step beyond your familiar circle and meet people on open ground, and these fresh connections will bear fruit.",
      2: "Cling to the small, near attachment and you let slip the strong and worthy one. You cannot hold both, so weigh carefully which you bind yourself to.",
      3: "Hold to the strong and worthy and release the lesser attachment, and your following finds what it seeks. Stay steady and correct on this higher course, and it serves you.",
      4: "Drawing a following to yourself may look like success, yet pressing it for your own gain ends badly. Keep your conduct sincere and your way plain to all, and where then is the fault?",
      5: "Be wholehearted toward what is genuinely good. Commit yourself to the excellent and true, and the outcome is fortunate.",
      6: "Here allegiance has grown so firm it binds completely, loyalty held fast and tied tight. Such devotion is honored at the highest level — as a king presents the faithful one with offerings on the sacred mountain.",
    }
  },
  18: {
    name: "Work on What Has Been Spoiled",
    meaning: "Hexagram 18 takes up decay that has crept in through long neglect or what was mishandled by those who came before: the task is to clear away the rot, and the oracle grants high success and favors a bold crossing to whoever undertakes it — provided the reform is weighed with care, three days of thought before acting and three days of attention after, so the corruption does not simply creep back. Its Image is wind moving along the base of a mountain, churning and unsettling whatever has gone stale; in the same spirit the wise person stirs the people out of their torpor and strengthens their inner resolve, setting renewal loose where things had begun to spoil.",
    lines: {
      1: "You are repairing what your father let go to ruin. Because a capable heir steps up to mend it, no blame clings to the father who left it behind; the way passes through danger, yet it ends in good fortune.",
      2: "You are setting right what your mother spoiled — a softer, more tender disorder. Do not press the correction with rigid insistence; too much severity would wound rather than heal, so proceed with a yielding hand.",
      3: "In mending the father's failings you go somewhat too far and stir a little remorse. Still, energetic repair, even when a touch heavy-handed, brings no serious fault — far better an excess of zeal than to let the decay stand.",
      4: "You make peace with the ruin your father left and put off the work of fixing it. Carry on indulging it and only disgrace awaits you, as the spoilage deepens for lack of any move to mend it.",
      5: "You take up the father's unfinished repair and carry it through to order, and you are met with praise. You need not labor alone; the right helpers gather to you and the restoration is completed together.",
      6: "You no longer serve kings and princes, stepping clear of the world's tangled work of repair. You hold to loftier, freer aims, setting your own measure and answering to a worth that lies beyond ordinary service.",
    }
  },
  19: {
    name: "Approach",
    meaning: "Approach: a season when a benevolent influence is rising and steadily drawing near, like warmth returning to the land after winter; this brings great success, but it favors only those who keep to what is right. A warning rides with the promise: the advance will not climb forever, so move while the way is open, for when the eighth month comes the tide turns to decline. The Image shows the earth standing above the marsh, bending toward the water below, and from this the wise person teaches without ever tiring and shelters and sustains the people without limit.",
    lines: {
      1: "You draw near in concert with one who shares your aim, and so long as you both stay true to what is right, this joined advance brings good fortune.",
      2: "You draw near in concert with another, and the way is open and fortunate; do not be unsettled by the warning of eventual decline, for the time itself is carrying you forward.",
      3: "To approach with easy, complacent confidence yields nothing of worth; but if you grow troubled by this and correct it, the fault does not last.",
      4: "You approach fully and without reserve, meeting the other openly and face to face; there is no blame in such complete engagement.",
      5: "This is the approach of wisdom, fitting for one who governs: you choose able people, entrust the work to them, and let them act for you rather than gripping everything yourself, and this brings good fortune.",
      6: "This is a wholehearted, generous approach that brings good fortune and no blame; the seasoned and noble-minded one bends down to help those still learning, and such openness can bring nothing but good.",
    }
  },
  20: {
    name: "Contemplation",
    meaning: "Contemplation asks for a steady, sincere regard in place of restless doing: like someone who has washed their hands for a rite but not yet laid down the offering, you hold a moment of poised reverence, and those watching feel it and trust you. Picture wind passing over the earth, brushing each thing it crosses; so the wise survey the lives and circumstances around them and shape their guidance to what they genuinely see. Look truthfully, and be worth the looking, for here you both observe and are observed.",
    lines: {
      1: "Seeing the world the way a small child does, grasping only its surface. For an ordinary person this costs nothing, but for anyone meant to guide or set an example, so shallow a view is a quiet disgrace.",
      2: "Watching life through a thin crack in the doorway, taking in only a narrow slice of what is out there. Such a guarded, partial glimpse may serve someone whose proper sphere is small and sheltered, yet it falls far short for one who carries real weight in the world.",
      3: "Turning your attention back on yourself — your conduct, your decisions, and where they have brought you. Read the shape of your own life honestly, and let what you find tell you whether to press forward or draw back.",
      4: "Viewing a society up close at its finest, seeing clearly how a people are led and held together. One who observes with such informed eyes belongs near the seat of power, welcomed as an honored guest and offered a place to contribute.",
      5: "Examine your own life by the mark it leaves on others. If the way you live truly serves the people near you, you carry no fault; your worth is measured by the good your example sets loose in those you touch.",
      6: "Regarding your own life from the outside, as a stranger might, with the heat of self-interest cooled away. Standing clear of ego's pull, you are without fault, for you weigh the whole rather than defending your own narrow corner.",
    }
  },
  21: {
    name: "Biting Through",
    meaning: "Biting Through teaches that when an obstacle lodges in your path—an injustice, a corrupt person, something that stalls everything else—you succeed by clamping down and biting clean through it, the way jaws crush whatever sits between them. The way forward favors clear judgment and firmly applied penalties. Its image is thunder below and lightning above: a storm that both lights up wrongdoing and strikes it, so set your laws out plainly and enforce the consequences without flinching.",
    lines: {
      1: "For a first, small offense the correction stays light—the feet are clamped in stocks and the toes can no longer move. Checked early, before a bad habit sets and hardens, it spares far greater trouble down the road; no blame follows.",
      2: "You bite so deep into the soft flesh that your teeth pass right through and the nose disappears. Facing an obvious, undeniable wrong, you bear down with full force—and though the punishment runs a little past the mark, against such plain guilt no fault clings to you.",
      3: "Biting into old preserved meat, you strike a spot that has gone foul and tainted. Moving to correct an entrenched, long-standing wrong, you meet resistance and ill will and feel slightly poisoned by it—a touch of humiliation, but since the wrong is clear, no real blame.",
      4: "You bite into tough dried meat clinging to the bone and hit a metal arrowhead buried inside. The obstacle is hard and the work severe, yet if you stay tough, hold steady through the difficulty, and keep your aim firm and upright, good fortune comes.",
      5: "Biting into dried meat, you come upon yellow gold. Holding the seat of rightful authority, you act with the steadfastness gold stands for while staying alert to the danger that judging carries; mindful of how much is at stake, you keep yourself blameless.",
      6: "A heavy wooden cangue presses on the neck until it covers the ears, so no warning can reach him anymore. One who keeps heaping up offenses and rejects every correction arrives at the point past saving—this brings misfortune.",
    }
  },
  22: {
    name: "Grace",
    meaning: "Grace succeeds: when form and beauty are given to substance, small ventures can advance, though adornment alone holds no authority over great decisions. A fire burns at the mountain's foot, throwing light up its slopes so every contour shows — so too, bring care and good form to the everyday matters before you, yet never let surface polish settle a weighty question of judgment.",
    lines: {
      1: "You lend grace to your own feet, stepping down from the carriage to walk; to choose the plain honest road on foot over a borrowed ease that would compromise you is the truer adornment.",
      2: "To beautify only the beard is to decorate what merely trails the motion of the chin; such ornament has no life of its own, so let how you appear follow the substance that moves it rather than show off for itself.",
      3: "Graced and made to gleam, sunk in comfort and ease as if soaked through with fragrant dew — agreeable as this is, keep firm and stay upright, for a life built of charm and indulgence alone quietly loses its ground.",
      4: "At the fork between bare simplicity and bright display, a white horse arrives as though winged; the one who comes is no raider but an honest suitor, and choosing modest truth over show brings the right joining in time.",
      5: "Grace upon the humble heights and among the gardens, where the gift of silk offered is thin and slight; such plain sincerity may look miserly and feel like a small disgrace, yet its honesty wins good fortune at the end.",
      6: "Adornment pared back to pure white, every excess let go; when ornament returns to plain simplicity and gives itself to the substance underneath, there is no fault.",
    }
  },
  23: {
    name: "Splitting Apart",
    meaning: "This is a season of stripping away: what once held the structure firm is being worn down from underneath, the props give out, and a fall becomes inevitable. The Judgment warns that there is nothing to gain by setting out or forcing matters now — the wise simply yield to the moment, hold still, and let the wearing-down finish its work. The Image is a mountain set upon the earth; since the high cannot stand once the ground beneath erodes, those in any high place secure themselves only by being generous to those below and keeping the base steady.",
    lines: {
      1: "The undoing starts out of sight at the lowest point, as a bed is ruined by splintering its legs. Those who would hold to what is right are overruled at this stage, and the damage keeps climbing.",
      2: "The splitting rises to the bed's frame. Ruin presses nearer while companions and protectors drop away, so one is left isolated and badly exposed, with no firm footing to rely on.",
      3: "Caught among others who are part of the collapse, this one quietly turns away from them and keeps faith with what is sound. By refusing to share in the rot, they draw no blame.",
      4: "The splitting reaches past the bed to the skin of the one lying on it. The harm now touches the person directly — a misfortune arrived in full, no longer something that can be deflected.",
      5: "The tide turns. Like a line of fish drawn along in order, the smaller ones fall willingly into place behind a worthy leader and are granted the favor of the inner court. What was coming apart is gathered, and the way opens to good fortune.",
      6: "The decay has spent itself, and one great fruit hangs untouched, holding the seed of what comes next. The worthy are carried onward as if borne in a carriage, while those who tore things down wreck the very roof over their own heads.",
    }
  },
  24: {
    name: "Return",
    meaning: "Return: the turning point arrives. The dark has spent itself, and a single line of light rises again at the base, so growth resumes on its own and the way forward stands open; comings and goings pass without harm, friends and allies gather blamelessly, and what left comes round again on its cycle, in about seven steps. The image is thunder resting within the earth, the first stir of new energy held in winter's cold: as the early kings did at the solstice, shut the gates, let merchants and travelers go still, and give the faint, returning force the quiet it needs to gather strength.",
    lines: {
      1: "You wander only a little way before you catch yourself and turn back, so nothing is spoiled; setting things right while the slip is still small brings great good fortune.",
      2: "You turn back calmly and gladly, not insisting on going it alone but taking your cue from those already walking rightly; this gentle return is fortunate.",
      3: "You return over and over, repeatedly losing your footing and circling back, which is unsettled and risky; yet because the wish to come back is real, it leaves no blame.",
      4: "Moving among others who are all drifting off course, you alone choose to turn back toward what is right; the path may feel solitary, but it is the sound one.",
      5: "You return with a generous and honest heart, judging yourself frankly and without excuse; such large-minded self-correction leaves nothing to regret.",
      6: "You let the moment to turn back slip away and stay obstinately lost; this confused return brings misfortune, with damage arising from within and pressing from without. An effort launched now ends in defeat, and the setback is felt for a very long time.",
    }
  },
  25: {
    name: "Innocence",
    meaning: "Innocence is the unforced rightness that arises when you act straight from your true nature, without calculation or hidden aim — hold to that genuineness and great success follows, but if you drift out of true with yourself, misfortune comes and there is nothing to gain by setting out. The image is thunder stirring beneath the open sky, rousing all things into their natural, spontaneous life; seeing this, the wise rulers of old, abundant in virtue and moving in step with the seasons, fostered and sustained every living thing, letting each follow the course its own nature intends.",
    lines: {
      1: "Move from your first honest impulse, before you start angling for advantage, and it goes well — the original, uncalculated act is the one that carries you through.",
      2: "Work the ground without already counting the harvest, break new soil without fixing your mind on next year's field; act for the sake of the act itself, and rewards arrive of their own accord — so it serves you to keep going.",
      3: "Innocence can still meet undeserved trouble: a stranger leads off the tethered ox, and the villager who lives there is left to bear the loss. Misfortune sometimes falls on you by sheer chance, through no fault of your own.",
      4: "Stay firmly anchored in what is truly yours and truly right, and no harm reaches you — remain faithful to your own nature, and outside pressure finds nothing to spoil.",
      5: "An affliction appears that you did nothing to cause; don't reach for remedies or meddle with it. Leave it alone and it lifts on its own, because the trouble was never of your making to begin with.",
      6: "When the moment itself has turned against action, even faultless effort leads nowhere good. Here the right move is stillness; press forward against the time and you only walk into harm.",
    }
  },
  26: {
    name: "The Taming Power of the Great",
    meaning: "Great restraining force holds power in check and stores it up: persevering pays, eating away from home brings fortune, and it is favorable to cross the great water. The image is heaven held within the mountain — the great accumulates. So the wise study the sayings and deeds of those who lived before, gathering them as nourishment for their own virtue.",
    lines: {
      1: "Danger lies ahead. It is best to halt where you are; pressing forward courts harm. Stop, and you stay clear of injury.",
      2: "The wagon's axle-housing is stripped away, so it cannot roll forward. The check is real and beyond your doing, so there is no fault in standing still rather than breaking the cart.",
      3: "A fine horse gives chase alongside the others, and the road now opens to you. But stay difficult and upright; practice your guarding and your driving each day. Then it is favorable to have a destination to reach.",
      4: "A guard-board is fastened to a young bull's head before its horns come in. Restraining a force this early, while it is still gentle, brings great good fortune.",
      5: "The tusks of a gelded boar. The fierce energy is mastered at the root rather than met head-on; by drawing off the impulse instead of fighting its sharp edge, what was dangerous turns harmless, and there is good fortune.",
      6: "You reach the highway of heaven itself. The long restraint is now released, the stored-up power moves freely, and the way ahead is open. Progress meets no obstruction.",
    }
  },
  27: {
    name: "The Corners of the Mouth",
    meaning: "The Corners of the Mouth concerns nourishment: persistence brings good fortune, so attend closely to how nourishment is provided and to what you choose to put in your own mouth. The lower trigram is your care for yourself, the upper your care for others. Thunder stirs at the foot of the still mountain — so the wise are careful with their words and measured in eating and drinking.",
    lines: {
      1: "You abandon your own magic tortoise — the inner source that needs no outside feeding — and instead let your mouth hang open, gazing with envy at another's food. Turning from what truly sustains you to crave someone else's portion brings misfortune.",
      2: "You reach the wrong way for nourishment: looking up to the summit when you should draw on what is below, straying from the path to beg from the hill above. To keep seeking like this, against the natural order, leads to misfortune.",
      3: "You turn your back on real nourishment and chase what gratifies but feeds nothing; holding to this course, however firmly, brings misfortune. For ten years let it stay untouched, for nothing good can come of it in any direction.",
      4: "You look upward to the strong source above to gain the means of feeding those below you, and this brings good fortune, for your aim is to nourish others, not yourself. Watch over them as a tiger watches, with steady, tireless eyes and unflagging desire, and there is no fault.",
      5: "Knowing you cannot nourish everyone by your own strength, you step away from the usual path and lean on one wiser and stronger to carry the work. Remaining steadfast where you are brings good fortune, but this is no time to cross the great water.",
      6: "All nourishment now flows from you — a place of great power and equal peril. Stay awake to the danger of it and good fortune follows; from here it becomes worthwhile to cross the great water and take on what is hard.",
    }
  },
  28: {
    name: "Preponderance of the Great",
    meaning: "This is a season of structural strain: the great ridge-beam is heavy in the middle and frayed at both ends, so the whole structure buckles under a burden it was never built to bear. The advice is not to freeze but to choose a direction and move, since a load this great will crack you if you keep pretending it isn't there. The picture is a flooded marsh whose water has climbed over the buried trees, and from it the wise stand alone without fear and step away from the world's approval without bitterness, keeping faith with what they know even when they stand entirely unaccompanied.",
    lines: {
      1: "Before setting anything heavy in place, lay down a soft mat of white reeds beneath it — that is, cushion every new venture with extra care and modesty. Such painstaking caution at the outset may seem like more than the task requires, but it keeps you faultless when the weight you are taking on is real.",
      2: "An old willow thought finished sends out green shoots, and an aging man weds a young wife — a mismatched pairing that, against expectation, renews and bears fruit. Fresh vigor arrives from a source no one would have counted on, and the unequal joining turns out well.",
      3: "The beam strains and is close to snapping, because you bull ahead alone and wave off every offered hand. Carrying far too much entirely on your own shoulders, deaf to all warning, brings nothing but the break.",
      4: "The beam is shored up and curves firm and strong, and this turns out well — the bracing holds exactly where the pressure falls. But if you reach beneath it for private gain or carry a hidden agenda, that concealed motive brings disgrace.",
      5: "An old willow throws out blossoms, and an older woman marries a young man — a late, brief flowering that earns no reproach yet leaves nothing behind. The bloom is genuine but rootless in time, neither something to praise nor something to condemn.",
      6: "You press on into the flood until the current closes over your head, crossing at the cost of your own life. Because what you served was worth it, no fault attaches to you — yet the loss is real, and the hard outcome could not be escaped.",
    }
  },
  29: {
    name: "The Abysmal",
    meaning: "This is water doubled, one gorge of rushing water pouring into another, the sign of danger repeated until peril fills the whole landscape. The counsel is to keep an inner truth so steady that your sincerity carries you through: hold fast to your heart's purpose and let your conduct stay constant however the depths churn, and you find passage and can even guide others across. As water flows on without halting, never piling up but always pressing forward and filling each low place before it moves on, so meet repeated hardship by staying in motion, practicing your craft again and again until it becomes second nature.",
    lines: {
      1: "Danger has become habit, and you sink deeper into the pit; growing accustomed to the abyss is itself the misfortune. Lost at the bottom of the gorge, you can no longer find the way out.",
      2: "The pit is deep and real danger surrounds you, so do not reach for any grand rescue. Aim only for what is small and within grasp, securing modest gains step by step until the worst is behind you.",
      3: "Caught between one abyss and the next, every direction forward or back drops into deeper water. Since any move only sinks you further, do not struggle or act; pause, hold still, and refuse to throw yourself in.",
      4: "In the depth of the danger, set all ceremony aside: a single jug of wine, a bowl of rice, plain earthen vessels passed honestly through the window are enough. Stripped-down sincerity between people in hard times brings no blame in the end.",
      5: "The water has not yet spilled over the gorge but has risen just to the brim, and there it will settle. Do not overreach; fill only to the point where the danger levels off, and you come through without fault.",
      6: "Bound with cords and ropes and shut behind a hedge of thorns, you are wholly lost in the abyss and for three years cannot find the way out. Persisting in error here keeps you trapped a long, long time, and that is misfortune.",
    }
  },
  30: {
    name: "The Clinging",
    meaning: "The Clinging is fire: a light that owns no body of its own and shines only by gripping the fuel it consumes, so its lesson is to stay bound to what is solid and true — hold steadfastly to the right and you succeed, the way patiently tending a cow yields a gentle, willing creature and good fortune. Doubled, the trigram shows flame catching flame, brightness handed from one fire to the next; seeing this, the wise pour their own clarity outward and light up all four directions. Because nothing that clings can stand by itself, real strength lies in being rightly attached rather than alone.",
    lines: {
      1: "At dawn the tracks scatter every which way and nothing has yet found its order; meet this early confusion with seriousness and place each step with care, and you escape the blunders that rushing would cause.",
      2: "Light glows in golden yellow, the hue of the balanced center — to cling here to what is measured and central is the highest fortune, the most steadfast ground of all.",
      3: "The sun's last light clings to the western edge of the sky; rather than meeting the day's natural ending in peace, one drums and sings to mask the truth or wails at the nearness of old age — and either response brings misfortune.",
      4: "It arrives all at once: it flares, blazes high, gutters out, and is flung aside — a flame that comes too hard and too fast spends itself in an instant, devours nothing, and wins no lasting place.",
      5: "Tears come pouring and the breath breaks into sighs of grief, yet this very sorrow is the turn that draws compassion and brings good fortune; clinging tightest at the moment of deepest shaking, one is held up.",
      6: "The king marches out to set things right and to discipline; the wise course is to strike only the instigators while sparing the followers who were merely led astray, so that the wrong is mended without needless cruelty, and there is no blame.",
    }
  },
  31: {
    name: "Influence",
    meaning: "Influence is the magnetism that draws two people together, like a young man courting a young woman; the connection thrives, and constancy carries it forward, when the heart stays open and receptive rather than grasping. Picture a lake gathered in the hollow at the mountain's summit, the firm peak below cupping the yielding water above. The wise person learns from this to keep the mind hollow and unassuming, so that others feel free to draw near.",
    lines: {
      1: "The stirring is felt only in the big toe — a faint flicker of attraction too slight to move you to act, so nothing has truly begun.",
      2: "The pull reaches the calves, an impulse straining to leap ahead on its own; rushing after it brings misfortune, while staying put and biding your time brings good fortune.",
      3: "The influence grips the thighs, which merely go wherever the body carries them; clinging to every impulse and following blindly this way leads only to regret.",
      4: "Now it reaches the heart, where it matters most: hold to a steady, sincere course and the regret dissolves, but if your mind churns and your thoughts chase first one person then another, only the few you deliberately settle on will answer you.",
      5: "The influence lodges in the flesh of the back, behind and above the heart, beyond the reach of real feeling; such willed, surface attraction moves nothing deep, yet since it does no harm, there is nothing to regret.",
      6: "The influence shows only in the jaws, cheeks, and tongue — all talk and persuasion with no substance beneath it, the most superficial way of trying to sway another.",
    }
  },
  32: {
    name: "Duration",
    meaning: "Duration is the success that comes from staying with a worthy course over time; it brings no blame and favors having a clear direction to move toward. Its trigrams pair thunder above with wind below — forces that rage yet return season upon season — so what endures is not frozen stillness but steadiness held through change. As the wise person keeps a fixed bearing while the world shifts around them, you last by holding your direction, not by refusing to move.",
    lines: {
      1: "Grasping for permanence at the very outset, before anything has had time to settle, only invites trouble; bonds and undertakings must root themselves gradually, and demanding the whole depth at once asks more than the ground can yet bear.",
      2: "Regret dissolves because you hold to your own center, neither straining beyond your reach nor shrinking below it; staying within what is truly yours keeps you steady.",
      3: "Whoever gives their character no settled home is tossed about by passing moods and meets disgrace on every side; without steadiness within, even fair intentions end in shame.",
      4: "Hunting a field that holds no game returns nothing, no matter how long you stay; persistence aimed at the wrong place or pursuit is spent in vain, since constancy rewards only what is rightly directed.",
      5: "Unwavering constancy in conduct suits one whose role is to follow a single course, yet it constrains one whose role is to weigh and decide as conditions turn; the same fixed loyalty that becomes one position can hold the other back.",
      6: "Endurance worn down by constant agitation — straining to press on through endless unrest — drains a person and arrives nowhere good; steadiness raised on inner turmoil cannot hold.",
    }
  },
  33: {
    name: "Retreat",
    meaning: "Retreat. The yielding force is pushing up from below and the strong has passed its height, so the wise move is a measured, dignified pulling-back; success here is real but it lies in keeping things small and holding firm in modest aims. The Image is the mountain rising under the open sky: heaven draws endlessly away above while the mountain reaches up yet cannot overtake it — so the thoughtful person holds petty people off, not with hostility but with calm, distant reserve that offers them nothing to grip.",
    lines: {
      1: "You are at the tail of the retreat, last in line and pressed right up against the advancing danger. This is a precarious place, so attempt nothing and make no move; staying quiet and still is what carries you through.",
      2: "Hold to your purpose as though bound with tough yellow oxhide, a grip nothing can cut or pry apart. Such steadiness of will and loyalty cannot be shaken loose, and it carries you to your aim.",
      3: "A retreat that keeps getting snagged and held back is strained and unnerving, dangerous in its tension. The dependents clinging to you are the cause, so treat them as you would your own household to look after — caring for them this way turns the situation to good fortune.",
      4: "To step back of your own free will brings good fortune to the one who can do it cleanly, finding release rather than loss. The small-minded person clings and cannot let go, and that refusal is their undoing.",
      5: "This is a retreat on good terms — gracious, well-timed, free of bitterness — backed by the inner firmness to know the exact moment to withdraw. Because the choice is right and clear-eyed, persistence in it brings good fortune.",
      6: "This is a light-hearted, untroubled retreat, made freely with nothing clinging to you and no doubt to slow your step. With every tie released and the road wide open, the whole situation turns to your advantage.",
    }
  },
  34: {
    name: "The Power of the Great",
    meaning: "Great power is gathered here, and what makes it sound is perseverance: strength that holds to what is right endures, while force pressed against principle falls apart. The image is thunder rolling above heaven — vast energy on the move, which the wise person governs by never taking a single step that breaks with what is fitting, refusing to let sheer might stand in for being right.",
    lines: {
      1: "Power gathered in the toes — all forward urge and no ground beneath it. To press ahead from this lowest place brings misfortune, since raw drive without a footing cannot reach its aim.",
      2: "To hold steady brings good fortune. Here genuine strength meets no resistance and advances in right measure, moving with the moment instead of straining past it.",
      3: "The small-minded spend their strength on display; the wise carry it as if it weighed nothing. To charge each obstacle like a ram driving its head at a fence only snares the horns and leaves you stuck fast.",
      4: "Steady persistence carries you through and regret melts away: the fence parts without a fight. The strength now works like the axle of a great cart, bearing the whole load and rolling on — power voiced through steadiness rather than collision.",
      5: "Release the stubborn, butting drive as lightly as letting a goat slip from your hands in open country. There is nothing to regret, for strength held this easily no longer needs guarding or forcing.",
      6: "The ram has driven into the hedge and can move neither back nor on, its horns held fast. At first no path will serve; yet to see the bind clearly and stay still is what at last turns the way toward good fortune.",
    }
  },
  35: {
    name: "Progress",
    meaning: "Progress is the sunrise: light climbs clear above the earth and warms all it touches, so a deserving servant is welcomed by a generous ruler, showered with gifts and received in audience again and again within a single day. The Image is the bright sun ascending over the land, and its counsel is to turn that light inward, polishing your own clarity and virtue until your conduct shines as openly as the day. Real advancement comes not from pushing upward but from worth made luminous, which draws recognition toward you.",
    lines: {
      1: "You move to advance and are turned back or distrusted; stay firm and upright, take no offense at the missing confidence, and hold a calm generosity even when reward is withheld — meet the delay honestly and no blame falls on you.",
      2: "Advancing now is shadowed by sorrow and unease, but keep to what is correct and good fortune will come; the blessing reaches you from an ancestral source, a maternal forebear above — support arrives indirectly when you remain steadfast.",
      3: "Everyone around you places their trust in you and shares your aim, so the earlier hesitation falls away and all cause for regret dissolves; carried by common confidence, you advance together without misgiving.",
      4: "To push ahead grasping and timid, hoarding like a burrowing rodent, is a furtive and unstable course; however correct you imagine yourself, clinging to advancement this way keeps you in real danger.",
      5: "Settled in the place of true progress, set aside all anxiety over gain and loss; whatever you undertake turns out well, and fretting over the outcome only clouds the good fortune already moving in your favor.",
      6: "Pressing forward with horns lowered to strike is fit only for correcting faults within your own household or city; turned there it succeeds and the danger passes into good fortune, but used to subdue others it stays perilous, and even justified force here ends in some humiliation.",
    }
  },
  36: {
    name: "Darkening of the Light",
    meaning: "The clarity of fire has dropped below the surface of the earth, and a season takes hold in which the able are slandered and those who hold power turn on the good; the wise course is to stay true to what you know inwardly while drawing your brightness out of sight, bearing the difficulty without surrendering your integrity — steadiness amid harm is what carries you through. The picture is the sun set below the ground: living among ordinary people, you dim your outward glow to avoid being struck at, yet keep your inner sight whole and unclouded. Hold on quietly through the wrong, for such darkness is a passing weather, not a permanent state.",
    lines: {
      1: "At the outset the light takes flight with its wings beaten down, sensing harm in time and pulling back, going three days without food rather than feeding at a poisoned table; the people you pass speak against your retreat, but going hungry on your own road is far better than lingering to be ruined.",
      2: "You are wounded in the left thigh — slowed and hurt, yet not broken, still able to move; the right response is to act at once and carry others to safety with the power of a sturdy mount, lending your strength rather than nursing the injury.",
      3: "While hunting in the south you corner the very leader from whom the darkness flows, a true opening to put the world right; even so, do not demand that everything be mended in a single stroke, for damage with deep roots will not yield to haste.",
      4: "You pass into the inner chambers on the dark side of the house and lay hold of what truly drives those in power; once you have read the rot at its core, you make for the gate and take your leave before the door closes on you.",
      5: "Like the kinsman of a tyrant who wore the mask of madness to outlast him, you must hood your light while keeping faith with what is right; the quiet endurance that guards your inner truth even while it stays hidden is what proves worthwhile.",
      6: "The dark crests and breaks: the one who once rose to the height of the sky now drops into the ground below, for whoever puts out the light without restraint in the end snuffs out himself and works his own downfall.",
    }
  },
  37: {
    name: "The Family",
    meaning: "The Family shows that a home stays whole when each person honors their place and the bonds between them, and the oracle names the woman's quiet constancy as the root that holds it all. The Image reads wind rising out of fire: warmth and influence that radiate outward from a living center. So the wise person makes sure their words carry real weight and their daily conduct holds steady over time, since a family is formed far more by the example of how one actually lives than by anything one decrees.",
    lines: {
      1: "Establish the household's order and limits firmly at the very beginning, while everything is still being formed. Set things rightly from the start and there is nothing later to regret.",
      2: "Do not reach outward for influence or ambition. Stay at the center of the home, attend faithfully to feeding and caring for those in it, and lasting good fortune grows from that humble steadiness.",
      3: "Govern the family with harsh severity and there is regret and even danger — yet that firmness still ends well. But let wife and children dissolve into idle laughter with no order at all, and the household slides into disgrace.",
      4: "The one who makes the family flourish — bringing real abundance and harmony to the home — is a wellspring of great good fortune.",
      5: "A leader whose loving presence reaches and settles the whole household has no cause for fear. Where the home is held by warmth rather than dread, all goes well.",
      6: "Authority grounded in genuine sincerity and a bearing of natural dignity commands lasting respect. Held to the end, this brings good fortune.",
    }
  },
  38: {
    name: "Opposition",
    meaning: "Opposition: when wills diverge and people pull in different directions, only small and modest undertakings prosper — grand designs buckle under the strain, while attending to little things keeps the way open. The image is fire climbing upward and the marsh-water settling below, two forces that drift apart by their very nature; the wise person, knowing harmony cannot be forced, holds to what is shared while still standing apart in their own convictions.",
    lines: {
      1: "Regret fades on its own — let the horse that bolted go rather than chase it, for it finds its own way back; and when a disagreeable person crosses your path, meet them rather than shun them, since driving them off by force only breeds real hostility, though you stay watchful against missteps.",
      2: "You meet your lord by chance in a narrow lane, an unplanned encounter in cramped circumstances — there is no fault in this, for reconnecting by whatever side path opens is exactly what estrangement calls for.",
      3: "You feel your cart dragged backward and your oxen balked, and you are publicly disgraced as if your hair and nose were cut away — a humiliating, blocked start; yet there is no true beginning here, and it will come to a good end, for the obstruction does not last.",
      4: "Cut off and alone amid the opposition around you, you at last meet a kindred spirit you can trust; though the situation is dangerous, joining honestly with that one ally clears the fault and steadies you.",
      5: "Regret vanishes: your true companion bites clean through what wraps you apart, as easily as through soft skin, and comes to you — go forward and unite with them, for what blame could lie in such a meeting?",
      6: "At the depth of isolation you see your companion as a pig caked in filth, a wagon crowded with demons, and you raise your bow to shoot — then you lower it, seeing they are no robber but a kinsman come to wed; the suspicion dissolves, rain falls, and fortune turns good.",
    }
  },
  39: {
    name: "Obstruction",
    meaning: "Obstruction marks the moment when the way forward is truly barred, and forcing through only worsens things; the favorable move is to yield, go where the ground opens rather than toward the steep impasse, seek out a person of strength and wisdom, and hold steady — staying true under pressure ends well. The trigrams set water atop a mountain, peril resting on a height too sheer to climb, so the thoughtful person treats the blocked road as a summons to look back at themselves and refine their own conduct.",
    lines: {
      1: "Push ahead and you walk straight into worse trouble; wait instead, and the patience of staying put is what wins you quiet credit.",
      2: "Obstacle stacks on obstacle for the one in loyal service, yet none of it springs from any fault of theirs; they press on, bound by duty to something larger than personal gain.",
      3: "The road forward only leads deeper into difficulty, so you turn back to the trusted companions you came from; this return to firm ground is steadying, not surrender.",
      4: "Advancing alone simply gathers more obstacles, so you come back to join with the one above you; an impasse this great is answered by alliance, binding yourself to a stronger partner rather than going it alone.",
      5: "At the very heart of the hardest obstruction, allies arrive to share the weight; the steadiness and balance you have held draw friends to your side exactly when the strain is greatest.",
      6: "Pressing on alone would only pile up difficulty, so rather than abandon the struggle you turn back toward it, for your seasoned hand is still needed and the work undone; throwing your lot in with a worthy leader, your return brings good fortune.",
    }
  },
  40: {
    name: "Deliverance",
    meaning: "Deliverance is the breaking of tension after a hard passage — thunder cracks, rain falls, and what was bound up is finally let loose. Once the trouble has passed, the counsel is to come back to ordinary life and not press for more; but wherever something still needs setting right, attend to it quickly and be done. As the storm clears the air, the thoughtful person pardons errors and releases old wrongs rather than holding them.",
    lines: {
      1: "At the very beginning, just as the strain lets go, there is nothing yet to do and nothing to answer for. Stay still, say little, and let the relief settle on its own.",
      2: "As a hunter takes three foxes in the field and is given a yellow-shafted arrow, you clear out the sly, hidden things working against you and hold to a straight, balanced course. Stay true to it and fortune follows.",
      3: "To carry a load on your back yet ride in a fine carriage is to claim a place you have not earned — and it tempts thieves toward you. Showing off what you cannot back up invites loss, and however right you feel, it ends in disgrace.",
      4: "Free yourself of the wrong company, releasing the small, clinging ties that hold you back like a grip on your own toe. Once they are gone, the one who truly belongs with you arrives, and that person can be trusted.",
      5: "When a person of real worth can cut themselves loose from what entangles them, things go well. The proof is in the parting itself: the petty fall away of their own accord, and your sincerity makes the break plain to all.",
      6: "Like a prince taking aim at a hawk perched on a high wall and bringing it down, you remove the last stubborn obstacle with one clean, decisive shot. When the moment is ripe and you strike true, everything moves in your favor.",
    }
  },
  41: {
    name: "Decrease",
    meaning: "Decrease is the time of drawing down from below to enrich what stands above, and when this is carried by genuine sincerity it brings the highest good fortune, no fault, and the freedom to keep on and to set out toward a goal — for even two modest bowls, offered with a true heart, are gift enough. Below the mountain lies the still lake: as the lake quietly lowers itself to nourish the slopes above, the wise person trims what runs to excess within, mastering flashes of anger and reining in restless appetite.",
    lines: {
      1: "Once your own work is settled it is right to set it aside and rush to another's aid, yet measure the gift; to pour yourself out completely is no fault-free virtue, so give exactly as much as truly helps and no more.",
      2: "Hold steady to your own ground. This is not the hour to push forward into some venture, for forcing the matter goes wrong; by keeping yourself intact rather than draining away to please, you are able to enrich others.",
      3: "When three travel as one, friction wears the company down until one falls away; the person who walks alone soon meets the single companion meant for them. True partnership comes only when the crowd is pared back to the genuine pair.",
      4: "Lessen your own failings and do it without dragging your feet, and the one you hope for comes hurrying gladly to meet you; ease what burdens you, and what you need arrives in joy, with no blame.",
      5: "Fortune arrives that nothing can turn aside — as though enriched by ten pairs of tortoise shells whose answer no one can gainsay. When destiny favors you this completely, do not refuse it; simply receive.",
      6: "Now you can pour benefit into others while losing nothing yourself, increasing all around you without stripping anything from those below. Your good spreads outward as blessing for everyone, and you gather a wide following, no longer bound to a single household.",
    }
  },
  42: {
    name: "Increase",
    meaning: "Increase rewards those who set out toward a goal; this is a time when blessing pours from the high down to the low, so that even great ventures—crossing the widest river among them—turn out well. Above is wind, below is thunder, and the two strengthen each other as they move: seeing the model of this, the wise person hurries toward every good they notice to make it their own, and the moment they find a flaw in themselves, they let it go. Real increase begins when those at the top give of themselves to raise everyone beneath them.",
    lines: {
      1: "This is the moment to take on something great and difficult. Strong support is flowing toward you, so even an ambitious move turns out well, and no one faults you for reaching high from a humble place—so long as the aim is truly worth it.",
      2: "Increase comes to you from outside, so firmly given that nothing could turn it aside—not ten pairs of oracle tortoises, not any counter-argument. Hold steady and stay true, and direct this good fortune upward toward its source, toward heaven or the ruler, and it lasts.",
      3: "Even loss and hard events can enrich you when you meet them honestly. Keep to a sincere middle course, state your case plainly, and stand on the proof of your good faith as if holding an official seal that vouches for you.",
      4: "Hold the balanced center, and your judgment will be trusted. Serve as a faithful go-between, and those in power will follow your lead—enough to back you even in a matter as weighty as moving an entire community to new ground.",
      5: "When your heart is genuinely kind and seeks nothing back, you need not even ask whether things will go well. The highest blessing comes, because others see the goodness in you and return it with kindness of their own.",
      6: "Here increase turns into loss. One who only takes and gives nothing back enriches no one, and may be struck by a blow from outside. A grasping heart that will not stay steady, that lets its purpose drift, draws misfortune to itself.",
    }
  },
  43: {
    name: "Break-through",
    meaning: "Break-through is the decisive moment when a long-standing wrong must be named aloud and cleared away — five firm lines rise together to dislodge the single yielding line clinging at the top. Carry the matter openly to the seat of authority and speak it with full sincerity, but recognize the danger: warn your own people first, do not reach for weapons, and let resolve rather than aggression carry you forward. The image is a lake swollen above the sky, brimming to the point of release; so the wise person lets their abundance flow down to those below instead of letting merit and wealth pile up, since whatever is hoarded eventually breaks its own banks.",
    lines: {
      1: "You feel powerful in the forward-pressing toes and rush to advance, but you set out without being equal to what the task demands; moving before you can carry it through turns the effort into a misstep.",
      2: "You raise the alarm and stay watchful, armed through the evening and into the night — yet because you readied yourself for trouble before it arrived, when it comes there is nothing to dread.",
      3: "Pressing ahead with a hard, set face brings misfortune; bent on cutting off the wrong, you walk on alone and are caught in the rain, soaked and treated as tainted even by those who should stand with you — but holding to right action through their scorn leaves you, in the end, without blame.",
      4: "You are raw and restless, like skin worn off the thigh so each step comes hard; were you willing to be led along like a sheep in the flock the regret would dissolve, but you will not trust the counsel you are given, and so you stay stuck.",
      5: "The clinging weed has to be pulled out at the root with steady, unflinching resolve — the work calls for firmness held over time, and keeping to a balanced, middle course as you clear it leaves you free of fault.",
      6: "No cry of warning is raised, and when the reckoning comes you find no one left to call on for help; standing isolated with no support beneath you, your end turns to misfortune.",
    }
  },
  44: {
    name: "Coming to Meet",
    meaning: "Heaven stands above, wind moves below, and beneath five solid lines a single soft one has slipped in at the base — a subtle, alluring force entering quietly and starting to climb. The oracle calls this an encounter with something too bold and yielding to be taken into partnership: it seems slight at first, yet given room it grows until it dominates, so it must not be wed to your purpose. The image of wind traveling everywhere under the sky tells the one who leads to send word into every quarter and make their will plainly known, so that nothing can gather strength unseen.",
    lines: {
      1: "Halt the soft, encroaching influence right at its start, the way a metal brace locks a wheel before the cart can roll; restrained, it brings good fortune, but let it move freely and it presses on to cause harm. It is like a thin pig that paces and frets — small now, but restless, and unwilling to stay small if no one holds it back.",
      2: "There is a fish kept in the kitchen, contained and watched over — no blame, because you keep this influence within your own reach instead of letting it wander. But it is not something to set before guests or carry abroad; to share it out would only loose what ought to be quietly held.",
      3: "You go forward as though the flesh were raw at your thighs, sore and unsure of each step, pulled toward something yet unable to stride freely. Because you falter and will not be led into a wrong tie, you suffer the discomfort but commit no real wrong — the peril is real, the mistake escaped.",
      4: "The kitchen is empty, the fish gone — the bond you let lapse has drifted away, and nothing remains to call on when the need comes. By holding yourself apart from the very people you were meant to keep close, you stir up ill will and bring trouble down on yourself.",
      5: "Like a melon kept cool beneath sheltering willow leaves, you veil your strength and guard your influence with quiet care rather than showing it off. Keep what is true held within and lay no claim on the world by force, and what belongs to you will come in its own hour, as though it fell to you out of heaven.",
      6: "You face others with rigid pride, horns thrust out like a ramming beast, staying distant and offering no warmth. Such hardness brings humiliation, yet there is no one to fault but yourself — the loneliness you feel is your own doing.",
    }
  },
  45: {
    name: "Gathering Together",
    meaning: "Gathering Together marks the moment when scattered people converge into a single body. The oracle promises success when a true leader of real standing holds the center, when a worthy offering honors the bond that draws the group, and when steady correctness aims the whole gathering toward a goal worth pursuing. The Image is a lake heaped above the earth, its waters pooled and pressing to spill over, so the wise person keeps their weapons in order and readies themselves ahead of time, for wherever a crowd masses, sudden trouble can break out unannounced.",
    lines: {
      1: "Your wish to belong is honest, but your resolve will not hold to the end, so the company keeps breaking apart and re-forming in confusion; raise a plain cry for help, and a single answering clasp of the hand can turn the disorder to laughter, so go ahead without regret or shame.",
      2: "You are drawn into the group by a natural inner pull, not by scheming for a place, and this brings good fortune and leaves you blameless; what binds you is real sincerity, so even a small, plain offering carries more weight than a lavish one.",
      3: "You yearn to join but stand outside the closed circle, sighing where no advantage shows itself; move forward anyway by drawing near someone closer to the center, and though there is a touch of humiliation, no true harm follows.",
      4: "You labor for the whole and not for your own standing, gathering others in the ruler's name rather than your own, and only such complete, selfless good fortune carries you past blame, for the union you serve is far larger than yourself.",
      5: "People assemble around the rightful place you hold, yet some arrive without real trust in their hearts; keep to great, lasting, unwavering uprightness, and the lingering regret fades as their confidence is slowly won.",
      6: "You find yourself shut out and grieving at the very end, moved to open sighs and tears at being unable to join; this honest lament is itself the plea that clears the fault, and it leaves no lasting blame.",
    }
  },
  46: {
    name: "Pushing Upward",
    meaning: "Pushing Upward brings great success through steady ascent: the moment favors rising, so seek out the capable person who can lift you, set aside fear, and press forward — moving toward the south, toward warmth and light, leads to good fortune. The image is a tree growing up from within the earth, gaining height a little at a time; in the same spirit, a person of strong character accumulates many small acts and modest gains until they amount to something high and enduring.",
    lines: {
      1: "Your rise is met with welcome and trust from those already above you; because you are received gladly, lean into that support and let it carry you upward — this opening ascent brings great good fortune.",
      2: "Even a small, plain offering is accepted when the heart behind it is sincere; here genuine devotion outweighs anything elaborate, and that honesty clears away fault and lets you advance.",
      3: "You push upward into a city that stands open and empty, with nothing at all to obstruct you; the way is strangely effortless, so keep moving but stay watchful rather than trusting that such ease will hold.",
      4: "You are entrusted to present offerings at the sacred mountain on the king's behalf, honored with a role at the very center of authority; this brings good fortune and leaves no room for blame.",
      5: "Hold to a steady, correct course and good fortune follows; you climb upward one step at a time, and it is exactly this patient, measured ascent — never rushed — that carries you safely to the height.",
      6: "Now you are pushing upward in the dark, no longer able to see where to stop; what serves you is not more blind climbing but turning your persistence into quiet, unbroken steadiness, holding firmly to what is right.",
    }
  },
  47: {
    name: "Oppression",
    meaning: "Oppression is a time of being drained and hemmed in, when energy is sapped and circumstances close around you — yet the counsel holds that a person of inner strength still finds the way through to good fortune, for hardship may test true character but cannot break it. Pleading your case or arguing your way out only deepens the trap, since words carry no weight now; speak less and stand firm. The image is a lake whose water has run out beneath it, a marsh gone dry: the wise person stays loyal to what they value and will stake their whole life, if need be, to carry out their purpose.",
    lines: {
      1: "Sitting on a bare stump in a darkening valley, you let yourself sink into gloom and pull away from the world; this passive despair only stretches the hardship, and you stay shut in for a long time with no one reaching you.",
      2: "You feel worn down even amid food and wine, pressed by plenty rather than want, just as a call to higher service arrives in ceremonial scarlet; stay grounded and make what humble offerings and steady devotion you can, for to push forward rashly brings misfortune while quiet persistence is favored.",
      3: "You let stone block your way and grasp at thorns to steady yourself, then return home to find even your own house empty of welcome; leaning on what cannot hold you and finding no refuge, this is a confusion that invites misfortune.",
      4: "You move to help another but come slowly and haltingly, hindered as if your way is blocked by a heavy golden carriage; there is awkwardness and delay, and you cannot reach them as fast as you wish, yet your intentions are sound and in the end the aim is met.",
      5: "Cut down as if by the blade, oppressed from above and below by those who should have been allies, you find relief only by degrees; stay sincere and turn to quiet, genuine devotion, and deliverance will come in its own time.",
      6: "You feel bound as if tangled in creeping vines, perched uneasily and telling yourself that any move will end in regret; but once you see that this very hesitation is the trap, you resolve to act, and going forward brings good fortune.",
    }
  },
  48: {
    name: "The Well",
    meaning: "The Judgment: a settlement can be picked up and relocated, but the well stays put — it neither runs dry nor overflows, and everyone comes and goes drawing from the same steady source. The danger lies in falling short at the last moment: a rope too short to reach the water, or a bucket that shatters as it nears the rim, wasting a supply that was always reliable. The Image shows wood sinking into the depths to bring water up; one who leads should hearten people in their labor and urge them to sustain one another.",
    lines: {
      1: "The well is choked with mud, so no one drinks and even the wildlife has stopped coming. A person who lets themselves go stagnant and untended slips out of use, and life simply flows around them.",
      2: "Down at the bottom the water is clear, but it reaches only the fish, and the jug is cracked so the water drains away. Genuine ability is squandered when it is spent on trifles or left in disrepair, never rising to those who could be nourished by it.",
      3: "The well has been dredged clean and the water runs fresh, yet still no one comes to drink — a sorrow, because this could refresh anyone. When someone capable is passed over, the loss falls on them and on all who might have been served.",
      4: "The well is being relined with stone, set back in good order. Stepping back to repair and steady yourself, even when it interrupts what you give to others, is sound work and carries no fault.",
      5: "A clear, cold spring rises in the well, fresh and fit to drink. The worth is fully here and at its best — but it has to actually be drawn and shared before it does any good.",
      6: "The well is drawn from without limit and left open so all may reach it; this is its purpose fully met, and it brings the greatest good fortune. Generosity that holds nothing back is the well made complete.",
    }
  },
  49: {
    name: "Revolution",
    meaning: "Revolution arrives only when the old order has rotted beyond repair, and the Judgment warns that genuine change wins belief solely on its own appointed day — move too early and people resist, but act when the time is ripe and all regret dissolves. The Image shows fire blazing within the lake, two powers at war that cannot coexist; their very conflict compels transformation, so the wise person orders the calendar and marks the seasons plainly, keeping change in stride with time rather than fighting against it.",
    lines: {
      1: "The moment to act has not yet arrived; hold yourself fast as though bound in the tough hide of a yellow ox, staying still and storing strength instead of moving too soon.",
      2: "When your own day at last comes round, then act — and act fully; the ground is ready and the cause is sound, so to set out now brings good fortune and leaves no fault behind.",
      3: "Charging ahead invites ruin, yet clinging to the old is no safer; only after talk of change has circled three times and held up under scrutiny can you commit and be believed.",
      4: "Regret falls away and the people give you their trust; with true sincerity even the established order may be overturned, and such a change carries good fortune.",
      5: "The great leader remakes things as vividly as a tiger growing its bright new coat; the rightness of the change is so evident that no oracle need be consulted before others place their faith in it.",
      6: "The small person changes only the surface, as a leopard's spots shift, while the noble one is transformed at the core; once the great work is finished, stop pressing — to force still more change now brings misfortune, but to settle into the new order brings good fortune.",
    }
  },
  50: {
    name: "The Cauldron",
    meaning: "The Cauldron is the cooking vessel that turns raw matter into nourishment, and its omen is the highest good fortune and lasting success: where the labor of refinement is honored, what was crude becomes food fit for sacred and noble ends. Its image is wood kindling fire beneath the pot, and so the wise person holds a true and steady place, making themselves a worthy vessel to receive heaven's mandate.",
    lines: {
      1: "The cauldron is tipped over so its old sediment pours out; the upending looks undignified, yet clearing away what has gone stale readies the pot for fresh food. Just as an outsider of low standing may be raised up and bear worthy fruit, an unorthodox start can serve a good end. No blame.",
      2: "The cauldron is filled with genuine substance, so you carry something of real value; rivals may resent your fullness, but if you stay collected they cannot reach you to spoil it. Hold your ground with care and good fortune follows.",
      3: "The cauldron's handles are changed so it cannot be carried, and the rich pheasant meat inside sits uneaten; your gifts go unused and your path is stalled for a season. When the blockage at last gives way and the rain comes, the regret melts away and the outcome turns out well.",
      4: "The cauldron's legs give way and the prince's meal is overturned, the food spilled and the vessel fouled; this is the cost of accepting a charge heavier than you can bear or relying on those unequal to the task. Shame and misfortune follow.",
      5: "The cauldron has yellow handles fitted with rings of solid metal, signs of a centered, receptive nature joined to dependable strength. Stay firm, true, and open, and this proves enduring and rewarding.",
      6: "The cauldron is fitted with rings of jade, hard yet softly luminous, marking the crown of the whole movement where firmness and gentleness meet in balance. Supreme good fortune; nothing is left that does not turn to benefit.",
    }
  },
  51: {
    name: "The Arousing",
    meaning: "Thunder breaks suddenly, and the message is that shock, for all its violence, clears the way to growth when you meet it with composure. The wise one cries out at first, then laughs again, for even when the tremor rolls across a hundred miles they keep the sacred ladle and wine-cup steady and spill nothing. The Image is thunder upon thunder, peal after peal; seeing it, you live in watchful awe, examine your own conduct, and let the fear school you into setting your life in order.",
    lines: {
      1: "The first jolt makes you cry out and tremble, but when it passes you are laughing and at ease again; the fright turns out to be a blessing, for the alarm leaves you alert and steadied. Fortunate.",
      2: "The shock arrives with real peril and your valuables are swept away in great number; do not run after them, but withdraw to high ground and let them go. What is lost will come back to you of itself within seven days.",
      3: "The shock leaves you rattled and off your footing, scattered and confused; but if that very unsettling spurs you to act and put things right, you pass through it without harm.",
      4: "Here the shock bogs you down and you sink into the mud; hemmed in by soft ground and unable to find traction, you cannot move forward cleanly until firmer footing returns.",
      5: "The shock strikes back and forth, coming and going, and the danger never lets up; yet if you hold to your center, nothing of true worth is lost, and there remains real work for you to carry out.",
      6: "The shock leaves you undone, staring about in dread, and to press ahead now would bring misfortune. But while it still falls on your neighbor and not yet on you, take warning early and step aside; though kin may mutter and fault your caution, you yourself stay free of blame.",
    }
  },
  52: {
    name: "Keeping Still",
    meaning: "Keeping Still is the way of the mountain: come to rest at the proper moment, and the inner chatter of craving falls silent. Find stillness in the region of the spine, that part of you the grasping self cannot reach, and you may cross your own courtyard unaware of the crowd in it — moving without attachment, you draw no reproach. Twin mountains stand one upon the other: so the wise person holds their thoughts within the bounds of the present and does not let them wander past where they stand.",
    lines: {
      1: "Stillness in the toes — halt before the first step is taken, while the path back is still short and nothing has gone wrong. Stay constant in this early restraint, and let it hold.",
      2: "Stillness reaches the calves, but the one ahead keeps walking and will not pause. Unable to rescue whom you follow, you are carried along, and the heart is left brooding and ill at ease.",
      3: "Halting at the waist locks the loins until they feel ready to split apart — a stillness imposed by force, not one allowed to arrive. Restraint pressed this hard smothers the breath and leaves the heart smoldering with suffocated dread.",
      4: "Stillness settles into the torso — the very trunk of the self comes to rest, not merely the moving parts. This is quiet reached at the core; the clamoring self subsides, and nothing is amiss.",
      5: "Stillness in the jaws: speech is held back until it carries real weight, ordered and free of excess. Keep words measured this way, and regret finds no opening.",
      6: "Stillness made full and openhanded — a calm grown solid and generous, ripened past mere holding-on. Such complete and wholehearted rest is the source of good fortune.",
    }
  },
  53: {
    name: "Development",
    meaning: "Development moves the way a tree takes hold on a mountain — gradually, in proper order, with no stage skipped. The Judgment compares this to a young woman given in marriage with full ceremony: advancing step by step along the correct path brings good fortune, perseverance is rewarded, and only haste can ruin it. The Image, a tree rising above the mountain, urges you to grow into worth and steadiness over time, so that your settled character gradually refines those around you.",
    lines: {
      1: "The wild goose draws near the shore — the youngest, just arriving, exposed and untested at the threshold. There may be small dangers and murmuring from others, yet staying cautious instead of forcing ahead leaves no blame.",
      2: "The goose draws near the safety of the rocks, eating and drinking in peace and good company. The advance has reached secure footing, and the good fortune found here is meant to be shared rather than kept.",
      3: "The goose pushes onto the bare high plateau and overreaches — the husband sets out and does not come back, the wife conceives but loses the child. Rash advance into conflict brings misfortune; the only safe course is to hold together and fend off attackers.",
      4: "The goose reaches a tree and finds a level branch to settle on — not its natural perch, but a safe enough resting place for now. By yielding and adapting to the situation, one finds shelter and stays free of harm.",
      5: "The goose draws near the high ground. For three years the wife bears no child, kept apart by misunderstanding or obstacle — yet in the end nothing can hold the union back, and good fortune comes.",
      6: "The goose draws near the cloud heights, its feathers worthy of the sacred dance. The long ascent complete, one reaches a serene height above ordinary striving and becomes a model of order and grace — good fortune.",
    }
  },
  54: {
    name: "The Marrying Maiden",
    meaning: "The Marrying Maiden cautions that pressing ahead from this position brings misfortune, with nothing to be gained, for one enters without a rightful place — like a younger woman taken into a household as a secondary partner, who has standing only through grace, restraint, and willingness to remain subordinate. The Image sets Thunder above the Lake: arousing movement over joy, the mutual attraction that pulls people into union. Knowing such drawings-together carry the seeds of disorder if mishandled, the thoughtful person holds the eventual outcome in mind from the start and guards against the harm that an unconsidered beginning can breed.",
    lines: {
      1: "She joins in a humble, secondary role, as a junior partner rather than the principal wife; though her position is slight, she can still be of real use and make progress within it — like someone lame in one foot who, accepting that limit, manages to walk and carry on.",
      2: "With one sound eye she still perceives what matters in a dim setting; the one she has bound herself to proves unsteady and absent, yet she keeps a quiet, faithful constancy, holding to inner integrity like one who endures alone.",
      3: "She finds no honorable match to receive her, and with no proper place opening, she turns back and accepts a subordinate role she would rather have refused — taking the lesser position because the worthy one never came.",
      4: "The maiden lets the expected season slip by and weds well past the usual time; this delay is no fault but sound restraint, for she holds out until the fitting moment and the right union finally come.",
      5: "Like a ruler's daughter who marries below her rank and yet wears plainer garments than her own attendants, she lays aside display for substance; her unpretending worth draws good fortune, like the moon grown nearly full but stopping short of the brimming that begins decline.",
      6: "The woman lifts a basket holding no fruit, the man cuts at the sheep and draws no blood — a rite gone through with nothing real inside it; such empty, formal gestures yield nothing and lead nowhere.",
    }
  },
  55: {
    name: "Abundance",
    meaning: "Abundance is the height of fullness, when light and plenty come to their fullest pitch — and the counsel is to meet this peak without dread, like a king who has arrived; be the sun at high noon, shining without anxiety even though noon must give way to afternoon. Thunder and lightning arrive together: with the clarity of fire within and the rousing force of thunder without, the wise person examines disputes precisely and carries out justice with decisive energy. Such fullness is dazzling but cannot be held forever, so spend this hour of plenty fully and well.",
    lines: {
      1: "You meet your counterpart, a partner of equal measure, and though you are cut from the same cloth there is no error in joining. Spending this stretch of time side by side is right; to go forward together earns recognition.",
      2: "The screens around you have grown so dense that at midday you can pick out the Dipper in the dark sky; press forward to enlighten those above and you will only draw suspicion and resentment. Hold instead to inner sincerity, let truthful devotion radiate and stir the other's heart, and good fortune follows.",
      3: "The obscuring curtain is thicker still — at noon you glimpse even the faint small star, and your right arm is broken, your power to act crippled through no fault of yours. There is no blame, yet for now nothing can be carried through.",
      4: "Again the canopy is so heavy that the Dipper shows at midday, but now you encounter the one who matches you, the counterpart of the first line. The darkness lifts, the meeting joins equal to equal, and good fortune arrives.",
      5: "You draw to yourself people of shining ability and welcome their gifts. Gathering the worthy and capable brings blessing and renown — there is cause for congratulation, and good fortune.",
      6: "You raise your house to grand abundance but turn it into a screen over your own household; you peer through the door and it is silent, no one stirring, and for three years no one appears. Walled in by pride and hoarded plenty, shutting others out, you have brought misfortune on yourself.",
    }
  },
  56: {
    name: "The Wanderer",
    meaning: "The Wanderer finds modest success and benefits from holding to what is right, for one passing through unfamiliar country survives by quiet correctness and unassuming conduct rather than bold demands. Fire moves over the mountain, flaring along the ridges and never settling in one place—an image of what cannot stay. Seeing this, the wise act with sharp clarity in matters of justice, deciding each case swiftly and refusing to let any dispute linger, since nothing in transit should be permitted to take root.",
    lines: {
      1: "At the very start, the traveler busies himself with trifles and grasps at small concerns; this pettiness cheapens him and is the very thing that calls down trouble upon the road.",
      2: "The traveler arrives at his lodging with his belongings intact and gains a faithful young helper; conducting himself well, he secures both shelter and dependable support, and has no cause for complaint.",
      3: "His lodging burns and he loses his faithful servant; whether through his own harshness or simple misfortune, the traveler is left exposed and his footing turns dangerous.",
      4: "The traveler reaches a place to rest and regains his goods and the means of his work, yet no ease comes with it; among strangers his heart stays guarded and his standing is never truly his own.",
      5: "He brings down a pheasant with a single arrow; the offering wins admiration and, in time, recognition and rank—skill shown plainly opens the way to honor even far from home.",
      6: "The bird's nest goes up in flames; the heedless traveler laughs before he understands, and laughter turns to weeping and grief as his careless ease costs him his ox—the peril of one who drops his guard at the journey's end.",
    }
  },
  57: {
    name: "The Gentle",
    meaning: "The Gentle is the soft, ceaseless pressure of wind: not a blow but a steady, repeated influence that seeps into every gap, the way a constant breeze slowly bends a whole field of grain. Progress here is modest and incremental, so it helps to fix on a clear direction and to seek the guidance of someone who already sees the whole. The Image is wind upon wind, one gust following the last; the wise person works this way too, issuing clear and consistent direction and letting it sink in over time until it reshapes how people actually live.",
    lines: {
      1: "Swinging between pressing forward and pulling back leaves you scattered and weak. The remedy is the steadiness of a disciplined soldier: choose a direction, hold to it, and let firm resolve settle the wavering.",
      2: "Hidden, undermining forces are stirring out of sight, like something concealed beneath the bed. Draw them into the open through patient, thorough searching, calling freely on every diligent helper and adviser you can; exposing what was buried brings good fortune and clears you of blame.",
      3: "Turning the same question over and over, prying at it long past any use, hardens penetration into paralysis. This anxious, repeated hesitation brings shame, because the moment for deciding has already slipped away.",
      4: "Regret dissolves and the effort yields plainly: like a successful hunt that takes game of three kinds, enough to share all around. Humility joined to decisive action brings full, well-earned returns.",
      5: "Steadiness brings good fortune and regret fades; though there was no auspicious beginning, the ending is sound, and nothing fails to advance. Move deliberately around any change, weighing the days before it and the days after, and the correction takes firm hold for good fortune.",
      6: "Penetration carried to its extreme defeats itself, like searching so far beneath the bed that nothing is left to stand on. You have given away your resources and the very tool you worked with; pressing on from here only leads to misfortune.",
    }
  },
  58: {
    name: "The Joyous",
    meaning: "The Joyous is two lakes resting one upon the other, their waters feeding and replenishing each other — a picture of shared gladness that opens the way to success so long as it holds firm and true. Real joy grows from strength and honesty within, not from flattery or display, and steadiness keeps it from spilling over into excess. Taking this to heart, the wise person gathers with kindred friends to talk things through and practice together, for open exchange renews the spirit as one lake renews another.",
    lines: {
      1: "Joy that rests quietly within itself, owing nothing to anyone and seeking no one's approval, is settled and brings good fortune; needing nothing from outside, it has nothing to lose.",
      2: "Joy that springs from honesty within brings good fortune, and any lingering regret melts away; when you are sincere at the core, the pull toward hollow or unworthy pleasures loses its grip.",
      3: "Reaching outward for amusement and stimulation to summon up satisfaction leads to misfortune, because pleasure chased from without can never fill the emptiness it was meant to ease.",
      4: "Torn between a shallow delight and a higher good, you find no peace while the choice hangs unmade; once you turn from the cheap pleasure toward what is sound, the unrest gives way to true gladness.",
      5: "Placing your trust in something that is quietly wearing you down carries real danger; see the corrosive influence for what it is rather than letting its charm disarm you.",
      6: "Joy that exists only to seduce and draw others along for its own sake has lost all inner direction, ruled now by appetite rather than any worthy aim.",
    }
  },
  59: {
    name: "Dispersion",
    meaning: "Dispersion is the melting of what has hardened — the hour when rigidity, grudges, and isolation start to come apart. The oracle says to turn toward the larger whole: gather where the sacred is honored, give yourself to something greater, and like fording a wide river, take on the committed work that knits people together again; steadiness sees you through. Its image is wind passing over water, breaking up and stirring the surface — and seeing this, the ancient rulers turned to worship to draw scattered hearts into shared devotion.",
    lines: {
      1: "Offer help while the drifting apart is only beginning and still easy to reverse. Act at once, with the ready power of a good horse, and hearts soften again before any coldness can take hold.",
      2: "As things begin to come loose, move quickly to whatever steadies you and lean on it for footing. Do this, and the regret that grows out of estrangement falls away.",
      3: "Now you melt away your own self-absorption and set your private wants aside. Losing yourself in service to something larger, you are spared the regret of standing apart and alone.",
      4: "You break up your own faction and let go of the narrow circle you belonged to — and this turns out wonderfully well. From that scattering a wider, truer fellowship takes shape, one no ordinary outlook could have pictured in advance.",
      5: "At the peak of the crisis, let a great unifying call move through the people the way sweat moves through the body — one clear, rallying word — so the scattering energy collects around a worthy center. The leader who does this stays secure and free of fault.",
      6: "Dissolve the danger itself by leading yourself and your own clear of the harm ahead. Let the wound bleed itself out, keep well away from what threatens, and by removing the source of injury you stay free of blame.",
    }
  },
  60: {
    name: "Limitation",
    meaning: "Limitation brings success, but a limit that turns harsh and bitter cannot endure, so restraint must itself be kept within bounds. The image is a lake holding water: the lake can take in only so much before it spills over, and so the wise set firm measures of number and degree, weighing conduct and judging where virtue lies.",
    lines: {
      1: "When the courtyard and its gate are closed and the moment forbids movement, hold still within your own threshold; knowing not to step out is itself the right limit, and it draws no blame.",
      2: "Now the inner gate stands open and the time to go forth has plainly come, yet you delay within your rooms; to restrain yourself when action is called for is mistimed, and it brings misfortune.",
      3: "One who will accept no measure and overflows every bound is left with sighing and regret; yet since the excess was freely chosen, the fault lies nowhere but with oneself, and no blame falls outside.",
      4: "Limitation that settles into place with ease, resting content within what circumstance allows rather than forcing it, moves without friction and meets success; restraint costs nothing when it follows the natural shape of things.",
      5: "To take the limit upon yourself willingly, and to make it sweet by bearing it before requiring it of others, brings good fortune; act first by your own example, and going forward wins honor and reward.",
      6: "Restraint driven to a galling, bitter extreme cannot hold, and to cling to it invites ruin and regret; but where such severity is truly required for a season, accepting its hardship lets the regret pass away.",
    }
  },
  61: {
    name: "Inner Truth",
    meaning: "Inner Truth teaches that conviction held deep in the heart reaches even the dullest and most unyielding of creatures, so the way forward is honest feeling rather than force or clever argument; held to with steadiness, even a daunting passage may be undertaken. The Image sets moving air over still water, breath touching what lies beneath the surface: just as the wind penetrates below, the wise leader looks into wrongdoing with patient care and holds back the harshest sentence until the heart of the case is truly known.",
    lines: {
      1: "Standing settled in yourself, ready and undivided, brings good fortune; but the moment you quietly pin your trust on some other prospect as well, that inner calm slips away.",
      2: "A bird calls from the shadows and its young, unseen, answers back: real feeling carries across any distance on its own. What is true in you summons its echo in another, the way an offered cup of wine becomes something gladly shared.",
      3: "Having tied yourself to a partner who holds all the strings, you lurch between beating the drum and falling silent, between tears and song. Joy taken wholly on loan from someone else leaves you tossed by their every mood.",
      4: "Like the moon just short of full, step back from your former companion and turn toward what stands higher; the harness-horse that leaves the team to go its own way keeps faith with itself and earns no blame.",
      5: "A truthfulness so whole that it gathers others and binds them to you as one carries no fault; the steady, trusted strength at the center keeps the whole gathering held together.",
      6: "A rooster's crow strains toward the sky—noise and display reaching for what only inner truth can reach. Clinging to hollow words and outward show, however upright the pose, leads only to ruin.",
    }
  },
  62: {
    name: "Preponderance of the Small",
    meaning: "The small may pass and prevail now: minor, everyday affairs can succeed, but ambitious ventures are out of reach — hold to what is correct, keep your scale modest, and let the call of the flying bird teach you that it is better to come down than to climb. Thunder rings out over the mountain, sounding closer and sharper than it would on open ground; so attend to small duties with unusual care — be more deferential in your conduct, more heartfelt in mourning, more sparing in what you spend.",
    lines: {
      1: "A bird takes wing before it is ready to fly, and climbing too far too soon ends badly. The moment does not yet hold what you would need to rise, so keep to the ground.",
      2: "She goes past her grandfather and comes upon her grandmother; she makes no grab at the ruler's place but meets him properly as a servant does. Staying within her rightful measure, she is without fault.",
      3: "Taking no special care against harm, you leave an opening, and someone slips up behind to wound you. In a small time like this, only added watchfulness keeps trouble away; misfortune follows the careless.",
      4: "You commit no error: you meet what the moment asks and go no further than is fitting. To push ahead now would be dangerous, so stay alert and restrained — there is no need to keep forcing the matter.",
      5: "Thick clouds drift in from the western edge, yet no rain comes; the time is not ripe to fulfill what you hope for. Like a prince who looses an arrow and takes the bird hiding in its hollow, draw out the help that lies concealed and make the most of small means.",
      6: "Failing to meet the moment, he overshoots it entirely, like a bird that soars far past where it should have landed. This brings misfortune — a disaster of one's own making — for to exceed the mark just when restraint was called for is the gravest fault.",
    }
  },
  63: {
    name: "After Completion",
    meaning: "After Completion: the crossing is made and every line stands in its proper place, so what remains is success in small things and the discipline to hold what has been won. The judgment favors steadfastness yet warns that order at its peak already carries the seed of confusion — good fortune at the start can slide into disarray at the end. The image is water set above fire: a force that cooks and accomplishes, yet always near to boiling over or running dry, so the thoughtful person foresees where things may fail and prepares against trouble before it comes.",
    lines: {
      1: "He drags the wheels to slow the cart, like a fox that wets its tail crossing the water; by holding back at the very beginning instead of charging ahead, you keep yourself free of blame.",
      2: "A woman loses the screen that shields her carriage and is left uncovered; she need not go searching for it, for in seven days it comes back on its own — wait, and what was lost returns of itself.",
      3: "As the old ruler labored three full years to put down a distant rebellion, so a worthy conquest exhausts you completely; carry it through, but never leave such hard-won gains in the hands of petty people.",
      4: "Fine garments still carry rags to plug the seeping leaks, and you stay wary the whole day through; even in a settled hour, this watchfulness against the smallest cracks is what keeps you safe.",
      5: "The neighbor in the east slaughters an ox in grand sacrifice, yet gains less than the neighbor in the west with a plain spring offering; sincerity simply given draws the real blessing, while costly display does not.",
      6: "He has crossed over, but goes on until the water covers his head; to push past completion is to court ruin — the peril here is not knowing when the work is finished.",
    }
  },
  64: {
    name: "Before Completion",
    meaning: "Before Completion is the moment just short of the far bank, when fire has climbed above water and the two powers pull apart — the old order is gone and the new one has not yet taken hold, but the crossing can still be made. There is success in it, yet only for the one who moves like a seasoned fox testing the ice; the reckless young fox who dashes across and wets its tail at the last step gains nothing, losing the prize with the goal in sight. Seeing fire and water out of place, the wise person examines the true nature of each thing and sets it where it belongs, so that what is scattered can be drawn back toward order.",
    lines: {
      1: "Like the young fox that soaks its tail trying to cross before its time, you press forward without yet grasping where any of this leads or having the footing to finish — to push ahead now only brings disgrace.",
      2: "You hold the brake and check the wheels rather than force a crossing the moment is not ready for; this discipline, knowing exactly when to stay still, is what carries you to good fortune.",
      3: "The passage is not yet complete, and to strike out and attack now would bring ruin — yet the time has come to gather strength and set out across the great water, for the worth lies in readying the crossing, not in forcing it early.",
      4: "Hold firm and the regret dissolves; with the force to break through entrenched resistance, you carry the long campaign to its end, and after the years of effort the reward and recognition come.",
      5: "Steadfastness brings good fortune and leaves no regret, for the inner light of the worthy person now shines with true sincerity, and that genuine radiance draws success.",
      6: "There is honest joy in sharing wine as the crossing is won, and no fault in the celebration — but soak your head in it and abandon all restraint, and you throw away the very thing you had rightfully secured.",
    }
  },
};
