// The notes: a little more about each thing a label names, opened on a card (see the card in main.js). Never shown
// until the reader asks.
//
// NOTES[language][worldview][label] holds the note for every act under '*', and, where an act changes what the label
// means, a note of its own under that act's number (0 to 3). Each note is [text, reference].
// Rules for writing them:
// - Two or three sentences, about 35 to 60 words: what the worldview itself holds, fairly, as one who holds it would say
//   it; then, where it applies, one plain sentence on where it falls short.
// - The reference is brief (a verse, a sura, a dialogue) and only where it carries weight.
// - Write the Spanish alongside the English; a label with a note in one language and not the other shows no bud there.

export const NOTES = {
  en: {
    christian: {
      god: {
        '*': ['One God in three persons, Father, Son and Holy Spirit, each fully God and the three one God. He needs nothing, made everything and rules over all, and he is personal: he speaks, loves and judges.', 'Deut 6:4 · Matt 28:19'],
      },
      world: {
        0: ['God made the world out of nothing, and it is not part of him. It is real, ordered and good: his handiwork, not an illusion or an accident. That is why it can be studied, enjoyed and cared for.', 'Gen 1:1, 31'],
        1: ['The world is still God’s good work, but the curse that followed man’s sin lies on it: thorns, toil, decay and death. Creation itself groans, waiting to be set free.', 'Gen 3:17–19 · Rom 8:20–22'],
        2: ['God so loved the world that he gave his Son. What sin ruined he is putting right, beginning in his people and reaching at last to the whole of creation.', 'John 3:16 · Col 1:19–20'],
        3: ['Not a world thrown away but a world made new: heaven and earth renewed, with no curse, no tears and no death. God himself will dwell with his people.', 'Rev 21:1–5'],
      },
      bridge: {
        0: ['From the beginning God spoke to man and bound himself to him by covenant, with commands, promises and his own company. Man knows God because God makes himself known.', 'Gen 2:16–17 · Heb 1:1–2'],
        1: ['Man broke covenant with God, and fellowship turned to fear: Adam hid among the trees. The distance is moral, not a matter of space. Yet the longing remains, as Augustine prayed: “You have made us for yourself, and our heart is restless until it rests in you.”', 'Gen 3:8–10 · Augustine, Confessions I.1'],
        2: ['The eternal Son took on flesh, so that one person, fully God and fully man, could stand between a holy God and guilty people. He did not only teach the way back: he bore sin’s penalty himself and rose again.', '1 Tim 2:5 · 2 Cor 5:21'],
        3: ['What was lost in Eden is given back, and more: God’s people will see him as he is. Faith gives way to sight, and nothing will ever come between them again.', 'Rev 22:4 · 1 John 3:2'],
      },
      self: {
        0: ['Man is made in God’s image: personal, rational and moral, made to know God and rule the earth under him. His worth comes from his Maker, not his usefulness. “Man’s chief end is to glorify God, and to enjoy him for ever.”', 'Gen 1:26–27 · Westminster Shorter Catechism, Q. 1'],
        1: ['Man still bears God’s image, but sin has bent every part of him: mind, will and affections. He is not merely weak or ignorant; he is a rebel who cannot save himself.', 'Rom 3:10–12 · Eph 2:1–3'],
        2: ['Saved not by his own merit but by God’s grace, received through faith alone in Christ alone. Forgiven, declared righteous and made new, he now lives to please God.', 'Eph 2:8–10 · Rom 5:1'],
        3: ['Raised in body and made perfect in holiness, the redeemed live with God for ever. They do not dissolve into God or drift as spirits: they are themselves, at last as they were meant to be.', '1 Cor 15:42–44 · Rev 21:3'],
      },
      sin: {
        1: ['Sin is not first a mistake or a sickness but rebellion: man refusing God’s rule and putting himself in God’s place. Its wage is death, and everyone since Adam is born under it.', 'Gen 3:6 · Rom 5:12; 6:23'],
        2: ['Sin is not ignored or excused but paid for. Christ bore its full penalty in his people’s place, so that God is both just and the one who justifies the ungodly.', 'Isa 53:5–6 · Rom 3:25–26'],
      },
    },

    judaism: {
      god: {
        '*': ['“Hear, O Israel: the LORD our God, the LORD is one.” The God of Abraham, Isaac and Jacob: holy, just and merciful, the maker of all, who acts in history. A Jew says the Shema morning and evening. He has no image, no partner and no incarnation.', 'Deut 6:4–5 · Exod 34:6–7'],
      },
      world: {
        '*': ['God made the world good and gave it to man to tend. It is not to be escaped but enjoyed and made holy: a meal, a marriage, a day of rest are all occasions for blessing him.', 'Gen 1:31; 2:15'],
        1: ['The land was God’s gift to Israel, and losing it is read as the fruit of Israel’s sins: first to Babylon, then to Rome. Exile became the setting of Jewish life for nearly two thousand years.', 'Deut 28:63–64 · Lam 1:3'],
        2: ['Every part of life is hallowed by a commandment: what is eaten, when one rests, how one does business, what is said over bread. The world is made holy by keeping God’s law within it.', 'Lev 19:2'],
        3: ['The world to come, in which the dead are raised, the exiles gathered and the temple rebuilt, and the knowledge of the LORD fills the earth. Its details the rabbis left open.', 'Isa 2:2–4 · Dan 12:2'],
      },
      bridge: {
        0: ['God bound himself to Abraham by oath: a land, descendants beyond counting, and a blessing for every nation through his seed. At Sinai the covenant was given to his children as a people.', 'Gen 12:1–3; 15:17–18'],
        1: ['The prophets charge Israel with breaking the covenant, yet God does not cast them off. Jeremiah promised a new covenant, written on the heart, with sins remembered no more: a promise Judaism still awaits.', 'Jer 31:31–34'],
        2: ['“Moses received the Torah at Sinai and handed it on to Joshua”, and so on, to the rabbis: Judaism holds that God gave a written law and an oral one, later set down in the Mishnah and the Talmud. Scripture knows of no second law, and Jesus rebuked traditions that set God’s word aside.', 'Avot 1:1 · Mark 7:8–13'],
        3: ['“I believe with perfect faith in the coming of the Messiah; and though he tarry, I will wait daily for his coming.” So runs Maimonides’ twelfth principle. Yet Daniel and Haggai place the Messiah’s coming while the second temple still stood, and it fell in AD 70.', 'Maimonides, Thirteen Principles · Dan 9:26 · Hag 2:9'],
      },
      self: {
        0: ['Man is made in God’s image, and every life is of great worth. Israel was chosen not because it was great, but to be a holy people and a light to the nations.', 'Gen 1:27 · Deut 7:6–8'],
        1: ['Man is not born guilty or corrupt. He has two inclinations, one good and one evil, and is free to master the evil one by study and obedience. Scripture speaks more darkly of the human heart.', 'Gen 4:7; 8:21 · Ps 51:5'],
        2: ['When a Jew sins, he returns to God (teshuvah) by regret, confession and a changed life, above all on the Day of Atonement. God receives the penitent, but the sacrifice the Law appointed is gone.', 'Hos 14:1–2'],
        3: ['The resurrection of the dead is one of Judaism’s thirteen principles of faith. Israel, scattered among the nations, will be brought home and raised to life.', 'Ezek 37:12–14 · Dan 12:2'],
      },
      sin: {
        1: ['Sin is a wrong act, not a fallen nature. The evil inclination is a drive to be tamed, and the Torah its remedy. The Talmud has God say: “I created the evil inclination, and I created the Torah as its antidote.” But a drive to be tamed needs no saviour.', 'Kiddushin 30b · Gen 8:21'],
        2: ['Without the temple there is no altar, so the rabbis taught that prayer, repentance and charity take the place of the offerings. Yet the Law taught that it is the blood that makes atonement.', 'Lev 17:11 · Heb 10:4'],
      },
    },

    islam: {
      god: {
        '*': ['“Say: He is God, the One, God the Eternal. He begets not, nor is he begotten, and there is none like him.” Allah is absolutely one, merciful and almighty, wholly beyond his creation. To confess his oneness (tawhid) is the heart of Islam.', 'Quran 112'],
        1: ['“God does not forgive that partners be set up beside him, but he forgives what is less than that to whom he wills.” In the Quran’s eyes this shirk includes calling Jesus the Son of God, and the Trinity itself.', 'Quran 4:48; 5:73'],
        2: ['God reveals his will, in law and prophets, but not himself. He is known by his names and his commands, not met as a person who comes to man.', 'Quran 42:51'],
        3: ['Of God’s ninety-nine names in Islam, none is Father. The believer is God’s servant, never his child; the cry “Abba, Father” has no place in Islam.', 'Quran 19:93 · Rom 8:15'],
      },
      world: {
        0: ['God made the world by his command, “Be!”, and it was. It is real and good, created for man, and every part of it is a sign pointing to its Maker.', 'Quran 36:82'],
        1: ['Creation is full of signs (ayat) of God, in the heavens, in the earth and in man himself, but men pass them by, heedless.', 'Quran 45:3–5 · Rom 1:20'],
        2: ['God’s law (sharia), drawn from the Quran and Muhammad’s example, is to govern all of life: worship, family, trade, crime and the state alike.', 'Quran 45:18'],
        3: ['Paradise is a garden of rivers, shade, fruit and companions, for those God admits. Sunni teaching counts the sight of God as its highest joy; yet even there he is Lord and Judge, never Father.', 'Quran 47:15; 75:22–23'],
      },
      bridge: {
        2: ['Muslims hold the Quran to be God’s own speech, sent down to Muhammad through Gabriel: his final word. It denies the cross outright: “they did not kill him, nor did they crucify him, but it was made to appear so to them.” Between God and man it offers a book to obey, with no mediator and no atonement.', 'Quran 4:157; 42:51'],
        3: ['On the Last Day each person’s deeds are weighed: heavy scales lead to the Garden, light ones to the Fire. Even Muhammad said: “None of you will enter Paradise by his deeds… not even I, unless God covers me with his mercy.”', 'Quran 101:6–9 · Bukhari 6467'],
      },
      self: {
        0: ['Man is God’s deputy (khalifa) on earth, entrusted with its care. Every child is born with a natural disposition (fitra) to know and submit to God.', 'Quran 2:30; 30:30'],
        1: ['Adam sinned and God forgave him, so no guilt is passed down. Man is born pure, but weak and forgetful, and needs reminding, not a new heart.', 'Quran 2:37; 4:28'],
        2: ['The Muslim submits by keeping the Five Pillars: the confession, prayer five times a day, almsgiving, the fast of Ramadan and the pilgrimage. Whether he is saved rests on God’s will.', 'Quran 2:177'],
        3: ['He hopes that his good deeds will outweigh his bad, and that God will be merciful, but no one may be sure. The gospel offers a certainty Islam cannot: “that you may know that you have eternal life.”', '1 John 5:13'],
      },
      sin: {
        1: ['Man goes wrong because he forgets God. The remedy is remembrance (dhikr) and guidance from God’s messengers, not rescue from a sinful nature.', 'Quran 20:115'],
        2: ['God forgives whom he wills, when they repent; no sacrifice is needed, and no one can bear another’s burden. But then God’s justice is set aside rather than satisfied.', 'Quran 6:164 · Rom 3:26'],
      },
    },

    deism: {
      god: {
        '*': ['A supreme being, known by reason from the order of nature, who made the world and left it to run by its own laws. He does not reveal himself, work miracles or answer prayer. Voltaire, Paine and many of the Enlightenment held to such a God.', 'Paine, The Age of Reason'],
        2: ['God is known only by inference, from the design of the world, as a watchmaker from a watch. Voltaire held that “if God did not exist, it would be necessary to invent him.” But a God known only as a conclusion is a hypothesis, not one who can be loved or trusted.', 'Voltaire, Épître à l’auteur des Trois imposteurs'],
        3: ['God is further off than ever: if he never speaks, nothing can be known of what he thinks of us, or of what comes after death.', 'Heb 1:1–2'],
      },
      world: {
        '*': ['The world is a vast machine, running on fixed laws that no miracle ever breaks: Newton’s clockwork, wound up once by its Maker.', 'Newton, Principia'],
        1: ['Alexander Pope wrote that “whatever is, is right”: the world is as good as it can be, and evil only seems so from where we stand. Then nothing is really wrong, and nothing needs mending.', 'Pope, An Essay on Man'],
        2: ['Nature is man’s only scripture: from its laws he learns God’s existence and his own duty. This is “natural religion”, which needs no revelation.', 'Tindal, Christianity as Old as the Creation'],
        3: ['The machine runs on, with no end in view and no day of reckoning, for its Maker has said nothing of either.', ''],
      },
      bridge: {
        '*': ['Deism denies that God has spoken: no prophets, no miracles, no scripture and no incarnation. “My own mind is my own church,” wrote Thomas Paine. But if God has not spoken, his mind and will remain closed to us.', 'Paine, The Age of Reason · Heb 1:1–2'],
        2: ['Man climbs toward God by reason alone. Reason is God’s gift, but on the Bible’s account it is darkened by sin, and men “became futile in their thinking”.', 'Rom 1:21'],
        3: ['God has promised nothing: neither forgiveness, nor resurrection, nor a life to come. A deist can hope, but he has no word to rest his hope on.', ''],
      },
      self: {
        '*': ['Man is a rational being, able to discover by the light of nature that God exists and what is right. He needs no revelation and no redeemer.', ''],
        1: ['What holds man back is not a sinful heart but ignorance, superstition and the priests who keep him in the dark. Teach him, and he will do well.', 'Paine, The Age of Reason'],
        3: ['Paine’s whole creed: “I believe in one God, and no more; and I hope for happiness beyond this life.” He hopes, but a God who has promised nothing gives him nothing to stand on.', 'Paine, The Age of Reason'],
      },
      sin: {
        1: ['Deism has no fall: wrong comes from ignorance and superstition, and the cure is education and reason. Yet the most enlightened men are not thereby the most good.', 'Jer 17:9'],
      },
    },

    mtd: {
      god: {
        '*': ['A God who made the world and watches over it, but is not much involved in daily life. Sociologists Christian Smith and Melinda Denton named this the working faith of many young Americans, often within churches.', 'Smith & Denton, Soul Searching'],
        1: ['God is out of mind until something goes wrong. He asks for nothing: no worship, no obedience, no repentance. He is there to be fetched in an emergency, and is forgotten again when it passes.', ''],
        2: ['God is on call, there to solve problems and help people feel better: “something like a combination Divine Butler and Cosmic Therapist,” as Smith and Denton put it. Such a God serves man’s wishes; he is not the Lord.', 'Smith & Denton, Soul Searching · Isa 45:9'],
        3: ['In heaven God is still at people’s service, the guarantor of their happiness. What they look forward to is not God, but a good time.', 'Ps 73:25'],
      },
      world: {
        '*': ['The world is a pleasant place under God’s eye, where people try to get along and be happy. Nothing in it is gravely wrong.', ''],
        1: ['The world is stressful: life brings pressure, hurt and disappointment. These are felt as problems to be managed, not signs of a world under a curse.', ''],
        3: ['At death the good leave this world for a better one. Nothing is said of this world being judged or made new.', ''],
      },
      bridge: {
        2: ['Prayer is a call for help when things go wrong: asking, not worship, confession or thanks. Jesus taught his disciples to pray first, “hallowed be your name; your kingdom come.”', 'Matt 6:9–10'],
      },
      self: {
        '*': ['People are basically good, and one of the creed’s tenets is that “the central goal of life is to be happy and to feel good about oneself.” Being nice and fair to others follows from that.', 'Smith & Denton, Soul Searching'],
        1: ['Even when people do wrong, they are still good underneath; what has gone wrong is how they feel. Scripture says, “None is righteous, no, not one.”', 'Rom 3:10'],
        3: ['“Good people go to heaven when they die,” and nearly everyone is good enough by their own measure. But God’s measure is his own holiness: “all have sinned and fall short of the glory of God.”', 'Smith & Denton, Soul Searching · Rom 3:23'],
      },
      sin: {
        1: ['What is wrong is unhappiness: stress, hurt feelings and low self-esteem. There is no sin against God, only feelings to be soothed.', ''],
        2: ['Unhappiness is soothed, and nothing is forgiven, because nothing needed forgiving. So the cross has no place, and grace becomes needless.', 'Gal 2:21'],
      },
    },

    naturalism: {
      god: {
        '*': ['“The Cosmos is all that is or ever was or ever will be.” There is no God and no realm beyond nature: no spirits, no souls, no heaven. Only what science can in principle measure is real.', 'Sagan, Cosmos'],
        1: ['With no one above, suffering is no one’s doing: there is no one to blame, and no one to cry out to. The question “why?” has no one to answer it.', ''],
        2: ['There is no one to ask for help or wisdom; man has only his own mind and the methods of science to guide him.', ''],
        3: ['No one will remember any of it: when the last mind is gone, no one will know that anything happened at all.', ''],
      },
      world: {
        0: ['The cosmos is matter and energy, moving by blind physical law. It was not made, has no purpose and is going nowhere. Everything, including mind and morality, is to be explained from below.', ''],
        1: ['Pain, disease and death are not a fall from something better; they are how evolution works. Dawkins: the universe has “no design, no purpose, no evil and no good, nothing but blind, pitiless indifference.” Yet if there is no evil, suffering cannot be called wrong.', 'Dawkins, River Out of Eden'],
        2: ['Science studies the world, and technology puts it to use. That the world can be understood at all is a fact naturalism cannot explain: why should a mindless universe be so orderly and so open to minds?', ''],
        3: ['In time the stars burn out and the universe runs down. Russell: “all the labours of the ages, all the devotion, all the inspiration, all the noonday brightness of human genius, are destined to extinction in the vast death of the solar system.”', 'Russell, A Free Man’s Worship'],
      },
      bridge: {
        '*': ['A closed system: every event has a natural cause, and nothing from outside breaks in. Lewontin admitted the commitment comes first: “we cannot allow a Divine Foot in the door.” So miracles and revelation are ruled out before any evidence is heard.', 'Lewontin, Billions and Billions of Demons'],
        2: ['The system is still closed: no help can come from outside. Whatever man needs, he must find or make within nature himself.', ''],
        3: ['History has no goal. Monod: “man knows at last that he is alone in the universe’s unfeeling immensity, out of which he emerged only by chance.”', 'Monod, Chance and Necessity'],
      },
      self: {
        0: ['Man is a complex animal, produced by unguided evolution. Francis Crick: “You, your joys and your sorrows, your memories and your ambitions… are in fact no more than the behavior of a vast assembly of nerve cells and their associated molecules.”', 'Crick, The Astonishing Hypothesis'],
        1: ['Man suffers and dies like every other living thing. His sense that this is wrong, that it ought not to be, is itself only a product of nature.', ''],
        2: ['If the mind is the product of blind processes aimed at survival, why trust it to find truth? Darwin felt it: “the horrid doubt always arises whether the convictions of man’s mind, which has been developed from the mind of the lower animals, are of any value or at all trustworthy.”', 'Darwin, letter to W. Graham, 1881'],
        3: ['Each person lives briefly and is gone for ever. His love, his work and his memory end with the chemistry that made them.', ''],
      },
      sin: {
        1: ['Suffering is not a punishment or a sign of anything; no one meant it. Yet if no one meant it, there is no ground to call it evil, only unwelcome.', ''],
      },
    },

    humanism: {
      god: {
        '*': ['There is no God, so man must make what he can of himself and his world by reason and science. The Humanist Manifestos of 1933 and 1973 set this out: “No deity will save us; we must save ourselves.”', 'Humanist Manifesto II'],
        1: ['Religion is a story man tells in his childhood and outgrows as he learns. Belief in God is seen as a stage of human development, now past.', ''],
        3: ['When mankind is gone, there will be no one to remember it: no God to keep its works, and no history to write them.', ''],
      },
      world: {
        '*': ['The cosmos is all there is: matter, and nothing more. It was not made for us, but we can understand it and shape it to our good.', ''],
        1: ['The universe is neither friendly nor hostile: it does not know we are here. Whatever good there is, man must bring.', ''],
        2: ['Nature tells us what is, not what ought to be: from facts alone no duty follows, as Hume saw. So where does the humanist’s “ought” come from?', 'Hume, A Treatise of Human Nature'],
        3: ['In the far future the sun will die and take mankind with it. Every achievement of progress will end in the same silence.', ''],
      },
      bridge: {
        2: ['Progress: by education, science and good laws, mankind can rise ever higher, by its own effort. The twentieth century, the most educated and scientific yet, was also the bloodiest.', ''],
        3: ['If all ends in extinction, progress is a stair that leads nowhere. Hope that rests only on man’s effort runs out with man.', 'Eccl 1:2–4'],
      },
      self: {
        0: ['“Man is the measure of all things,” said Protagoras: he is of great worth, the most remarkable thing nature has produced. But if he is only matter shaped by chance, the worth humanism gives him is a borrowed belief, not a fact.', 'Protagoras · Gen 1:27'],
        1: ['Man is good at heart; what holds him back is ignorance, poverty, prejudice and religion. Remove these, and he will flourish.', ''],
        2: ['Man chooses his own values. But values each man chooses for himself can bind no one else, and cannot condemn anyone who chooses otherwise.', ''],
        3: ['Each person lives on only in his works and in others’ memory, and these too will fade.', ''],
      },
      sin: {
        1: ['What is wrong lies outside man: in superstition, ignorance and bad institutions. The heart itself needs no change, only better teaching.', 'Jer 17:9'],
      },
    },

    nihilism: {
      god: {
        '*': ['Nietzsche’s madman: “God is dead. God remains dead. And we have killed him… Who gave us the sponge to wipe away the entire horizon?” With no God, there is no purpose, meaning or value built into anything.', 'Nietzsche, The Gay Science 125'],
        1: ['There is no one to judge, so nothing is truly good or evil. Even condemning cruelty is only a preference.', ''],
        2: ['There is no one to save, and nothing to be saved from. Salvation needs something wrong and someone able to put it right; nihilism has neither, so it can offer no remedy at all.', ''],
      },
      world: {
        '*': ['The cosmos is here for no reason. It means nothing, aims at nothing and values nothing; it is simply there.', ''],
        1: ['Nothing in the world is worth more than anything else. If no value exists, then neither does the value of truth, and nihilism cannot even call itself true.', ''],
      },
      bridge: {
        '*': ['“What does nihilism mean? That the highest values devaluate themselves. The aim is lacking; ‘why?’ finds no answer.” With nothing above, meaning drains away: there is nothing for it to rest on.', 'Nietzsche, The Will to Power 2 · Eccl 1:14'],
        2: ['There is no way out, because nothing is wrong to escape from, and nowhere better to go.', ''],
        3: ['Everything runs off and is lost; nothing is kept, and nothing that was done will count.', ''],
      },
      self: {
        0: ['Man is an accident of matter: no one meant him, and nothing is meant by him.', ''],
        1: ['If the mind is an accident too, it cannot be trusted to know anything, including that nihilism is true. The view undermines its own ground.', ''],
        2: ['Man is hollow, with no reason to act one way rather than another. Few people can live as though this were true; most borrow meaning they cannot justify.', ''],
        3: ['When a man dies it makes no difference that he lived. Yet no one, not even the nihilist, can bring himself to believe that of the people he loves.', 'Eccl 3:11'],
      },
    },

    existentialism: {
      god: {
        '*': ['Sartre took Dostoevsky’s words as his own: “If God did not exist, everything would be permitted… that, for existentialism, is the starting point.” With no God to give man a nature or a purpose, man must give himself one.', 'Sartre, Existentialism Is a Humanism'],
        1: ['Man calls out for meaning, and no one answers. Camus began from there: “There is but one truly serious philosophical problem, and that is suicide.” He did not deny the longing; he denied anyone was there to meet it.', 'Camus, The Myth of Sisyphus'],
        2: ['No one stands over man to correct him: no law above his choices, and no judge of them.', ''],
        3: ['No one keeps what a man made of himself: when he dies, it is lost.', ''],
      },
      world: {
        '*': ['The world is simply there: solid, silent and indifferent. Camus: “The absurd is born of this confrontation between the human need and the unreasonable silence of the world.”', 'Camus, The Myth of Sisyphus'],
        3: ['The world goes on unchanged when a man dies, as if he had never chosen anything.', ''],
      },
      bridge: {
        '*': ['Meaning is not found but made, by one’s choices. Camus ends with Sisyphus, pushing his rock for ever: “One must imagine Sisyphus happy.” But meaning a man makes is only as large as he is, and it ends when he does.', 'Camus, The Myth of Sisyphus'],
        2: ['Any choice will do, if it is truly his own. But then nothing can be said against a cruel choice made authentically.', ''],
      },
      self: {
        0: ['“Existence comes before essence”: man first exists, then defines himself. There is no human nature given in advance.', 'Sartre, Existentialism Is a Humanism'],
        1: ['Man is free, and his freedom is a burden: he is anxious and alone, “condemned to be free”.', 'Sartre, Being and Nothingness'],
        2: ['“Man is nothing else but what he makes of himself,” wrote Sartre: what a man chooses, he becomes. But a self made from nothing has nothing to measure itself against.', 'Sartre, Existentialism Is a Humanism'],
        3: ['Death ends the work of making oneself, and with it its meaning. The project is left unfinished, for ever.', ''],
      },
      sin: {
        1: ['The one fault is “bad faith”: hiding from one’s freedom behind roles, rules or excuses. It is the existentialist’s sin, but it is a failure toward oneself, never toward God.', 'Sartre, Being and Nothingness'],
      },
    },

    postmodernism: {
      god: {
        '*': ['There is no God and no final truth above our words: no Word, only words. Lyotard described the postmodern as “incredulity toward metanarratives”.', 'Lyotard, The Postmodern Condition'],
        1: ['God is one more story, told by those who gain power from it: priests, kings, churches. Belief is unmasked as a means of control. Yet the unmasking is itself a claim to see things as they really are.', ''],
        2: ['Truth is not denied but made small: true for this group, in this place, for now.', ''],
      },
      world: {
        0: ['Reality is hidden behind our words; we never meet the world as it is, only as our language and culture shape it.', ''],
        1: ['Foucault: “Each society has its régime of truth”: what counts as true, normal or good is set by those with power. Yet Foucault wrote as though his own account were simply true.', 'Foucault, Truth and Power'],
        2: ['Reality is whatever a group agrees on. Rorty described truth as what our peers will “let us get away with saying.” But if truth is only agreement, nothing is left to appeal to when groups disagree, except power.', 'Rorty, Philosophy and the Mirror of Nature'],
        3: ['Reality is lost for good, behind an endless play of words: every sign points only to other signs, never to the thing itself. If so, this sentence too points to nothing.', ''],
      },
      bridge: {
        0: ['Language does not describe the world, it builds one. “There is nothing outside the text,” wrote Derrida. But this claim is itself offered as a true description of how things are.', 'Derrida, Of Grammatology'],
        1: ['Every grand story (Christianity, the Enlightenment, Marxism) is called a mask for power, told to silence others. Yet the claim that all stories serve power is itself a grand story.', ''],
        2: ['Deconstruction takes apart a text or tradition to expose what it hides. It spares only its own story: its own claims are never deconstructed.', 'Derrida, Of Grammatology'],
        3: ['Stories replace stories without end, and none of them is true; what works for now is all one can hope for. Christianity answers with a story told by the one who stands outside it, and who entered it.', ''],
      },
      self: {
        0: ['The self is not a soul or a nature, but a product of the stories told about it.', ''],
        1: ['Man is shaped, even made, by those in power and the categories they impose.', ''],
        2: ['Each person is free to tell his own story. But if no story is truer than another, telling his tells no one anything.', ''],
        3: ['In the end the self comes apart: a crossing-point of voices and roles, with no one at the centre.', ''],
      },
      sin: {
        1: ['Oppression is called wrong, and fiercely. Yet postmodernism has no standard by which anything is wrong, so its own outrage borrows the moral law it denies.', 'Rom 2:14–15'],
        2: ['Oppression is named and fought, but with no standard above all groups to judge it; the judgment can only be one group’s power against another’s.', ''],
      },
    },

    marxism: {
      god: {
        0: ['Religion is “the opium of the people”: a comfort the oppressed take to dull their pain, which keeps them from changing their condition. Once society is just, it will no longer be needed.', 'Marx, Critique of Hegel’s Philosophy of Right'],
        1: ['Religion is “the sigh of the oppressed creature”: a real cry, but aimed at heaven instead of at those who exploit.', 'Marx, Critique of Hegel’s Philosophy of Right'],
        2: ['With no God, man must save himself, and the party will lead him there.', ''],
        3: ['There is no judgement to come: the only judge is history, and those who serve it are justified, whatever they do.', ''],
      },
      world: {
        0: ['Matter is all there is, and history moves forward by conflict (dialectical materialism). How men make a living, the “economic base”, shapes everything else: law, morals, art and religion.', 'Marx & Engels, The Communist Manifesto'],
        1: ['“The history of all hitherto existing society is the history of class struggles”: owners against workers, those who hold the means of production against those with only their labour to sell.', 'Marx & Engels, The Communist Manifesto'],
        2: ['The workers’ state plans all production from the centre. Mises showed why it cannot work: “where there is no free market, there is no pricing mechanism; without a pricing mechanism, there is no economic calculation.”', 'Mises, Economic Calculation in the Socialist Commonwealth'],
        3: ['In the end the state withers away and a classless society emerges: “from each according to his ability, to each according to his needs.” It is heaven on earth, and always still to come.', 'Marx, Critique of the Gotha Programme'],
      },
      bridge: {
        0: ['“It is not the consciousness of men that determines their being, but their social being that determines their consciousness.” All ideas rest on the economic base. But then Marx’s own ideas are only the product of his class position, and no truer than any other.', 'Marx, Preface to A Contribution to the Critique of Political Economy'],
        1: ['Surplus value: profit is what the owner takes from the worker’s labour beyond his wage. It rests on the claim that labour alone makes value, which Böhm-Bawerk showed fails: value comes from what people want, not from labour put in.', 'Böhm-Bawerk, Karl Marx and the Close of His System'],
        2: ['“The philosophers have only interpreted the world, in various ways; the point is to change it.” Revolution is salvation: the workers seize power by force. Wherever it was tried, it brought not liberation but the gulag and the famine.', 'Marx, Theses on Feuerbach XI'],
      },
      self: {
        0: ['Man is not a soul made in God’s image but “the ensemble of the social relations”: what society and labour make him.', 'Marx, Theses on Feuerbach'],
        1: ['The worker is alienated: cut off from what he makes, from his work, from others and from himself. Marx saw a real ache, but traced it to property, not to man’s separation from God.', ''],
        2: ['Change the conditions and you change man: a “new man” will be made by the new society. Where it was tried, the new man had to be forced.', ''],
        3: ['Each generation is spent for a future it will never see, and the individual counts for nothing beside the cause.', ''],
      },
      sin: {
        1: ['Evil lies in the system, in private property and class, not in the human heart. Change the system and evil goes.', ''],
        2: ['But evil was still there in the hearts of the new rulers. Solzhenitsyn, who survived their camps, wrote that “the line dividing good and evil cuts through the heart of every human being.”', 'Solzhenitsyn, The Gulag Archipelago'],
      },
    },

    individualism: {
      god: {
        '*': ['There is no authority above the self: not God, not nature, not tradition. Meaning is found by looking within. Robert Bellah’s Habits of the Heart named it: each person has “a unique core of feeling and intuition that should unfold or be expressed.”', 'Bellah et al., Habits of the Heart'],
        1: ['God, if he is kept at all, becomes one more rule to throw off, or a supporter of whatever the self has already chosen.', ''],
        2: ['The self is its own judge: no one may tell it it is wrong. But a judge who answers to no one cannot be appealed against, even by the self it wrongs.', ''],
        3: ['No one is left to say who I am but me. Yet the self that names itself is never sure the name is true.', 'Ps 139:1–4'],
      },
      world: {
        0: ['Society is a stage on which the self acts out who it is. Rousseau began his Confessions: “I am made unlike any one I have ever met… I may be no better, but at least I am different.”', 'Rousseau, Confessions'],
        1: ['Family, church and moral law are seen as walls that hem the self in. To be free is to break out of them.', ''],
        2: ['Society is now required to affirm each self as it presents itself. The American Supreme Court put the creed in law: “At the heart of liberty is the right to define one’s own concept of existence, of meaning, of the universe, and of the mystery of human life.”', 'Planned Parenthood v. Casey (1992)'],
        3: ['The result is a crowd of selves, each alone: free of every bond, and with no one bound to it either.', ''],
      },
      bridge: {
        2: ['Authenticity: to follow one’s heart, whatever others think. Charles Taylor describes it: “There is a certain way of being human that is my way.” But Scripture warns that “the heart is deceitful above all things.”', 'Taylor, The Ethics of Authenticity · Jer 17:9'],
      },
      self: {
        0: ['Each person has a true self within, found by looking inward: its feelings and desires are its truth. But feelings change, and contradict each other; they cannot all be true.', ''],
        1: ['The self feels held in by others’ rules: parents, churches, customs and moral codes that tell it who to be. What it truly is, it is not allowed to be, and so it feels false to itself.', ''],
        2: ['The self is its own maker: it decides what it is, and others must accept it. But a self made by choice can be unmade by the next one.', ''],
        3: ['The goal is to be fully oneself and feel fulfilled. When the self dies, the story it told about itself ends with it.', 'Mark 8:35'],
      },
      sin: {
        1: ['The only sin is to deny oneself: to suppress what one feels or wants. This turns Jesus’ call on its head: “If anyone would come after me, let him deny himself and take up his cross.”', 'Luke 9:23'],
      },
    },

    transhumanism: {
      god: {
        0: ['There is no God yet, but there may be one: man himself, remade. Asked whether God exists, Ray Kurzweil answered: “Not yet.”', 'Kurzweil, in Transcendent Man'],
        1: ['With no one above, death is no one’s judgement and carries no meaning: it is a fault in the machine, an engineering problem waiting to be solved. Nick Bostrom pictured it as a dragon-tyrant that mankind has only to find the courage to slay.', 'Bostrom, The Fable of the Dragon-Tyrant'],
        2: ['Man means to fill the place left empty. Harari: “we will now aim to upgrade humans into gods, and turn Homo sapiens into Homo deus.”', 'Harari, Homo Deus'],
        3: ['The Singularity: the moment machine intelligence outruns ours and remakes everything. It is the oldest temptation in a new form: “You will be like God.”', 'Gen 3:5 · Kurzweil, The Singularity Is Near'],
      },
      world: {
        0: ['Nature is raw material to be improved. Max More wrote to her: “Mother Nature, truly we are grateful for what you have made us… we have decided that it is time to amend the human constitution.”', 'More, A Letter to Mother Nature'],
        1: ['Nature is blind, cruel and slow: evolution took millions of years to give us bodies that age and fail. We can do better, and faster.', ''],
        2: ['Nature is being redesigned: genes edited, bodies repaired with new parts, minds linked to machines. What evolution did blindly over ages, engineers mean to do on purpose in decades. But who decides what the redesign is for?', ''],
        3: ['In the end nature itself is wired over: Kurzweil foresees matter and energy “saturated” with intelligence, the universe waking up. The world becomes one great machine of thought, with no Maker but the minds that built it.', 'Kurzweil, The Singularity Is Near'],
      },
      bridge: {
        2: ['Technology is the way of salvation: upgrade by upgrade, man will rise above his limits. Julian Huxley coined the word: “man remaining man, but transcending himself, by realizing new possibilities of and for his human nature.”', 'Huxley, New Bottles for New Wine'],
        3: ['Uploading: a mind copied into a machine and run for as long as the hardware lasts. But a copy is not the one who was copied: the man still dies, and something else goes on.', ''],
      },
      self: {
        0: ['Man is a rough draft, not a finished work: the product of evolution, which we can now take into our own hands. Scripture says the opposite: man is made in God’s image, and is not an experiment.', 'Gen 1:27'],
        1: ['Man is trapped in a failing body, limited by ageing, disease and death. Transhumanists call these not the fruit of a fall, nor part of a creature’s lot, but defects in the design that nature happened to give us.', ''],
        2: ['The posthuman, remade by his own hand: stronger, cleverer, longer-lived. But a man who remakes himself has still not changed his heart.', ''],
        3: ['The body is left behind as so much hardware. This is not new: it is the old gnostic contempt for flesh, which God made and called good, and which Christ rose in.', 'Luke 24:39'],
      },
      sin: {
        1: ['Death is not a wage for sin but a problem to solve. Harari: “death is not an inevitable destiny, but merely a technical problem… And every technical problem has a technical solution.” Scripture: “the wages of sin is death.”', 'Harari, Homo Deus · Rom 6:23'],
        2: ['Death is delayed, not defeated: lives lengthen, but every one still ends. Only one has come back from death never to die again, and he promises the same to all who are his.', '1 Cor 15:20–26'],
      },
    },

    'new-age': {
      god: {
        '*': ['God is the Universe: an impersonal energy, a universal consciousness, of which everything is part. Not a Person who speaks, loves or judges, but a force to be felt and tapped.', ''],
        1: ['An impersonal energy cannot be offended, so there is nothing to forgive and no one to forgive it. But it cannot love either: a force has no heart to set on anyone.', '1 John 4:8'],
        2: ['The Universe is tapped, not worshipped: drawn on through techniques for health, wealth and peace. It answers to the right method, like electricity, and asks for nothing back.', ''],
        3: ['The divine is reached by climbing, through spiritual growth over many lives, not received as a gift. Grace has no place where every soul must earn its own way up.', 'Eph 2:8–9'],
      },
      world: {
        0: ['All is one: the cosmos and the self are one great whole, and the one is divine. The difference between Creator and creature is denied.', 'Rom 1:25'],
        1: ['Most people see only the surface of things, a world of separate objects and selves, and miss the oneness and divinity beneath. Waking up means seeing through the separateness to the one great whole.', ''],
        2: ['The world is shaped by the mind: thoughts attract their like and create our reality. Then the sick and the poor have, in some sense, chosen their lot.', ''],
        3: ['A new age, the Age of Aquarius, is always about to dawn, when humanity will awaken together. Marilyn Ferguson’s Aquarian Conspiracy (1980) announced it.', 'Ferguson, The Aquarian Conspiracy'],
      },
      bridge: {
        2: ['Cosmic consciousness: in meditation and altered states, the self is said to know its oneness with all. There, right and wrong dissolve into the One.', ''],
        3: ['Reincarnation: the soul returns life after life, learning, until it is pure. There is no Saviour, only the long climb, and no last judgement.', 'Heb 9:27'],
      },
      self: {
        0: ['In the depths of the self, each person is divine. Shirley MacLaine, the movement’s best-known voice, put it most plainly: “I am God.”', 'MacLaine, Out on a Limb'],
        1: ['The self has forgotten its own divinity and lives shut inside its ordinary mind. Eckhart Tolle’s teaching: “You are not your mind.”', 'Tolle, The Power of Now'],
        2: ['The awakened self creates its own reality by its thoughts and intentions: what it pictures and expects, the Universe brings. It is the self in the place of the Creator, whose word alone makes things be.', 'Ps 33:9'],
        3: ['The soul rises from life to life toward the light, with no judgement to face, for there is no one to give account to. Scripture says: “it is appointed for man to die once, and after that comes judgement.”', 'Heb 9:27'],
      },
      sin: {
        1: ['What is wrong is not sin but forgetting: a narrow consciousness. There is no holy God to offend, only a mind to expand.', ''],
        2: ['Forgetting is cured by technique: meditation, crystals, channelling, the right teacher. Salvation is something done, not received, and it is never finished; there is always a higher level to reach.', ''],
      },
    },

    'neo-paganism': {
      god: {
        0: ['The Goddess: Maiden, Mother and Crone, the waxing, full and waning moon; and often a horned God beside her. For Starhawk the Goddess does not rule the world from outside it: she is the world.', 'Starhawk, The Spiral Dance'],
        1: ['The Goddess is forgotten, not offended: she gives no law to break, and asks for no repentance. What has been lost is a relationship with nature, not peace with a holy God.', ''],
        2: ['In the rite the Goddess is called down into the priestess. In the Charge of the Goddess she says: “All acts of love and pleasure are my rituals.”', 'Valiente, The Charge of the Goddess'],
        3: ['The Crone gives way to the Maiden again: the cycle never ends, and nothing is made new. Death is only winter, and spring always comes back, the same as before.', 'Rev 21:5'],
      },
      world: {
        0: ['The earth is the Goddess’s body, and so divine: all life shares in her. Nature is not made by God; it is god.', ''],
        1: ['The earth is wounded by industry, cities and machines, which have cut people off from the cycles of nature. The neo-pagan revival grew in part as a protest against the modern, industrial world.', ''],
        2: ['The earth is served in place of its Maker, which Paul names precisely: they “worshipped and served the creature rather than the Creator.”', 'Rom 1:25'],
        3: ['The earth goes round for ever, always turning, never made new. Christ’s promise is not a cycle but a new beginning: “Behold, I am making all things new.”', 'Rev 21:5'],
      },
      bridge: {
        0: ['The wheel of the year: eight festivals (the solstices, the equinoxes and the four days between) turning with the seasons, for ever.', ''],
        2: ['Magic: power sought by will, ritual and the energies of nature, to bring about change. It is power taken, not grace received.', 'Deut 18:10–12'],
        3: ['The wheel turns round and round with no last day: no end to history, no judgement and no goal. Time is a circle, not a story going somewhere.', ''],
      },
      self: {
        0: ['Man is a child of the earth, one creature among many in the web of life, no higher than the rest. Nothing sets him apart to rule the earth for its Maker, or answer to him for it.', 'Gen 1:28'],
        1: ['Man is cut off from the earth and its rhythms: the moon, the seasons, the land. The cure is to come home to nature, not to be reconciled to its Maker.', '2 Cor 5:18'],
        2: ['The pagan lives by the Wiccan Rede: “An it harm none, do what ye will.” But who decides what harms, and by what measure?', 'The Wiccan Rede'],
        3: ['At death the soul rests in the Summerland, a pleasant land of the dead, then is born again into another life, round and round with the wheel.', ''],
      },
      sin: {
        1: ['What is wrong is imbalance and disconnection, not sin against a holy God. Harm is real, but it is harm to nature and to others, never an offence against a lawgiver.', ''],
        2: ['Disconnection is healed by ritual, with nothing to forgive, because no one has been wronged but nature and oneself. Without a holy God, guilt has nowhere to go and no one to lift it.', ''],
      },
    },
  },

  es: {
    christian: {
      god: {
        '*': ['Un solo Dios en tres personas, Padre, Hijo y Espíritu Santo: cada una plenamente Dios, y las tres un solo Dios. No necesita nada, lo hizo todo y lo gobierna todo, y es personal: habla, ama y juzga.', 'Dt 6:4 · Mt 28:19'],
      },
      world: {
        0: ['Dios creó el mundo de la nada, y el mundo no es parte de él. Es real, ordenado y bueno: obra de sus manos, no una ilusión ni un accidente. Por eso se puede estudiar, disfrutar y cuidar.', 'Gn 1:1, 31'],
        1: ['El mundo sigue siendo la buena obra de Dios, pero sobre él pesa la maldición que siguió al pecado del hombre: espinos, fatiga, corrupción y muerte. La creación misma gime, esperando ser liberada.', 'Gn 3:17–19 · Ro 8:20–22'],
        2: ['De tal manera amó Dios al mundo que dio a su Hijo. Lo que el pecado arruinó, él lo está restaurando: empieza en su pueblo y alcanzará al fin a toda la creación.', 'Jn 3:16 · Col 1:19–20'],
        3: ['No un mundo desechado, sino un mundo hecho nuevo: cielos y tierra renovados, sin maldición, sin llanto y sin muerte. Dios mismo morará con su pueblo.', 'Ap 21:1–5'],
      },
      bridge: {
        0: ['Desde el principio Dios habló al hombre y se comprometió con él por pacto, con mandamientos, promesas y su propia compañía. El hombre conoce a Dios porque Dios se da a conocer.', 'Gn 2:16–17 · He 1:1–2'],
        1: ['El hombre quebrantó el pacto con Dios, y la comunión se volvió temor: Adán se escondió entre los árboles. La distancia es moral, no de lugar. Pero el anhelo permanece, como oró Agustín: “Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti.”', 'Gn 3:8–10 · Agustín, Confesiones I.1'],
        2: ['El Hijo eterno se hizo carne, para que una sola persona, plenamente Dios y plenamente hombre, se interpusiera entre un Dios santo y un pueblo culpable. No solo enseñó el camino de vuelta: cargó él mismo con la pena del pecado y resucitó.', '1 Ti 2:5 · 2 Co 5:21'],
        3: ['Lo que se perdió en el Edén se devuelve, y aún más: el pueblo de Dios lo verá tal como es. La fe da paso a la vista, y nada volverá a interponerse entre ellos.', 'Ap 22:4 · 1 Jn 3:2'],
      },
      self: {
        0: ['El hombre está hecho a imagen de Dios: personal, racional y moral, creado para conocer a Dios y gobernar la tierra bajo él. Su valor viene de su Hacedor, no de su utilidad. “El fin principal del hombre es glorificar a Dios y gozar de él para siempre.”', 'Gn 1:26–27 · Catecismo Menor de Westminster, P. 1'],
        1: ['El hombre aún lleva la imagen de Dios, pero el pecado ha torcido cada parte de él: mente, voluntad y afectos. No es solo débil o ignorante: es un rebelde que no puede salvarse a sí mismo.', 'Ro 3:10–12 · Ef 2:1–3'],
        2: ['Salvo no por su propio mérito sino por la gracia de Dios, recibida solo por la fe, solo en Cristo. Perdonado, declarado justo y hecho nuevo, ahora vive para agradar a Dios.', 'Ef 2:8–10 · Ro 5:1'],
        3: ['Resucitados en el cuerpo y perfeccionados en santidad, los redimidos viven con Dios para siempre. No se disuelven en Dios ni vagan como espíritus: son ellos mismos, al fin como debían ser.', '1 Co 15:42–44 · Ap 21:3'],
      },
      sin: {
        1: ['El pecado no es ante todo un error ni una enfermedad, sino rebelión: el hombre que rechaza el gobierno de Dios y se pone en su lugar. Su paga es muerte, y todos desde Adán nacen bajo él.', 'Gn 3:6 · Ro 5:12; 6:23'],
        2: ['El pecado no se pasa por alto ni se excusa: se paga. Cristo cargó con toda su pena en lugar de su pueblo, para que Dios sea a la vez justo y el que justifica al impío.', 'Is 53:5–6 · Ro 3:25–26'],
      },
    },

    judaism: {
      god: {
        '*': ['“Oye, Israel: el SEÑOR nuestro Dios, el SEÑOR uno es.” El Dios de Abraham, Isaac y Jacob: santo, justo y misericordioso, Hacedor de todo, que actúa en la historia. El judío dice el Shemá mañana y tarde. No tiene imagen, ni asociado, ni encarnación.', 'Dt 6:4–5 · Éx 34:6–7'],
      },
      world: {
        '*': ['Dios creó un mundo bueno y lo dio al hombre para que lo cuidara. No hay que huir de él, sino disfrutarlo y santificarlo: una comida, un matrimonio, un día de reposo son ocasiones de bendecirlo.', 'Gn 1:31; 2:15'],
        1: ['La tierra fue un don de Dios a Israel, y perderla se entiende como fruto de sus pecados: primero ante Babilonia, luego ante Roma. El exilio fue el marco de la vida judía durante casi dos mil años.', 'Dt 28:63–64 · Lm 1:3'],
        2: ['Cada parte de la vida se santifica con un mandamiento: lo que se come, cuándo se descansa, cómo se comercia, lo que se dice sobre el pan. El mundo se hace santo guardando en él la ley de Dios.', 'Lv 19:2'],
        3: ['El mundo venidero, en el que los muertos resucitan, los exiliados son reunidos, el templo se reconstruye y el conocimiento del SEÑOR llena la tierra. Sus detalles los rabinos los dejaron abiertos.', 'Is 2:2–4 · Dn 12:2'],
      },
      bridge: {
        0: ['Dios se comprometió con Abraham bajo juramento: una tierra, una descendencia incontable y una bendición para todas las naciones por medio de su simiente. En el Sinaí el pacto se dio a sus hijos como pueblo.', 'Gn 12:1–3; 15:17–18'],
        1: ['Los profetas acusan a Israel de quebrantar el pacto, pero Dios no lo desecha. Jeremías prometió un nuevo pacto, escrito en el corazón, en el que los pecados ya no se recuerdan: una promesa que el judaísmo aún espera.', 'Jer 31:31–34'],
        2: ['“Moisés recibió la Torá en el Sinaí y la transmitió a Josué”, y así hasta los rabinos: el judaísmo sostiene que Dios dio una ley escrita y otra oral, fijada luego en la Mishná y el Talmud. La Escritura no conoce una segunda ley, y Jesús reprendió las tradiciones que dejaban de lado la palabra de Dios.', 'Avot 1:1 · Mr 7:8–13'],
        3: ['“Creo con fe completa en la venida del Mesías; y aunque se demore, esperaré cada día su venida.” Así dice el duodécimo principio de Maimónides. Pero Daniel y Hageo sitúan la venida del Mesías cuando el segundo templo aún estaba en pie, y cayó en el año 70.', 'Maimónides, Trece principios · Dn 9:26 · Hag 2:9'],
      },
      self: {
        0: ['El hombre está hecho a imagen de Dios, y toda vida tiene gran valor. Israel fue escogido no por ser grande, sino para ser un pueblo santo y luz de las naciones.', 'Gn 1:27 · Dt 7:6–8'],
        1: ['El hombre no nace culpable ni corrompido. Tiene dos inclinaciones, una buena y otra mala, y es libre de dominar la mala con el estudio y la obediencia. La Escritura habla con más gravedad del corazón humano.', 'Gn 4:7; 8:21 · Sal 51:5'],
        2: ['Cuando el judío peca, vuelve a Dios (teshuvá) con pesar, confesión y una vida cambiada, sobre todo en el Día de la Expiación. Dios recibe al arrepentido, pero el sacrificio que la Ley estableció ya no existe.', 'Os 14:1–2'],
        3: ['La resurrección de los muertos es uno de los trece principios de fe del judaísmo. Israel, disperso entre las naciones, será traído a casa y devuelto a la vida.', 'Ez 37:12–14 · Dn 12:2'],
      },
      sin: {
        1: ['El pecado es un acto malo, no una naturaleza caída. La mala inclinación es un impulso que hay que domar, y la Torá su remedio. El Talmud pone en boca de Dios: “Yo creé la mala inclinación, y creé la Torá como su antídoto.” Pero un impulso que se doma no necesita un salvador.', 'Kidushín 30b · Gn 8:21'],
        2: ['Sin templo no hay altar, así que los rabinos enseñaron que la oración, el arrepentimiento y la caridad ocupan el lugar de las ofrendas. Pero la Ley enseñaba que es la sangre la que hace expiación.', 'Lv 17:11 · He 10:4'],
      },
    },

    islam: {
      god: {
        '*': ['“Di: Él es Dios, Uno, Dios el Eterno. No ha engendrado ni ha sido engendrado, y no hay nadie igual a él.” Alá es absolutamente uno, misericordioso y todopoderoso, del todo por encima de su creación. Confesar su unicidad (tawhid) es el corazón del islam.', 'Corán 112'],
        1: ['“Dios no perdona que se le asocie a nadie, pero perdona lo que es menos que eso a quien quiere.” A ojos del Corán, este shirk incluye llamar a Jesús Hijo de Dios, y la Trinidad misma.', 'Corán 4:48; 5:73'],
        2: ['Dios revela su voluntad, en la ley y los profetas, pero no a sí mismo. Se le conoce por sus nombres y sus mandatos, no se le encuentra como persona que viene al hombre.', 'Corán 42:51'],
        3: ['De los noventa y nueve nombres de Dios en el islam, ninguno es Padre. El creyente es siervo de Dios, nunca su hijo; el clamor “¡Abba, Padre!” no tiene lugar en el islam.', 'Corán 19:93 · Ro 8:15'],
      },
      world: {
        0: ['Dios hizo el mundo con su orden, “¡Sé!”, y fue. Es real y bueno, creado para el hombre, y cada parte de él es una señal que apunta a su Hacedor.', 'Corán 36:82'],
        1: ['La creación está llena de señales (ayat) de Dios, en los cielos, en la tierra y en el hombre mismo, pero los hombres pasan de largo, distraídos.', 'Corán 45:3–5 · Ro 1:20'],
        2: ['La ley de Dios (sharía), tomada del Corán y del ejemplo de Mahoma, ha de regir toda la vida: el culto, la familia, el comercio, el delito y el Estado por igual.', 'Corán 45:18'],
        3: ['El paraíso es un jardín de ríos, sombra, frutos y compañía para los que Dios admite. La enseñanza suní cuenta la visión de Dios como su gozo más alto; pero aun allí él es Señor y Juez, nunca Padre.', 'Corán 47:15; 75:22–23'],
      },
      bridge: {
        2: ['Los musulmanes sostienen que el Corán es la palabra misma de Dios, revelada a Mahoma por medio de Gabriel: su palabra final. Niega la cruz sin rodeos: “no lo mataron ni lo crucificaron, sino que así se les hizo parecer.” Entre Dios y el hombre ofrece un libro que obedecer, sin mediador y sin expiación.', 'Corán 4:157; 42:51'],
        3: ['En el Último Día se pesan las obras de cada uno: la balanza pesada lleva al Jardín, la ligera al Fuego. Aun Mahoma dijo: “Las obras de ninguno de vosotros lo harán entrar en el Paraíso… ni siquiera a mí, si Dios no me cubre con su misericordia.”', 'Corán 101:6–9 · Bujari 6467'],
      },
      self: {
        0: ['El hombre es el lugarteniente de Dios (jalifa) en la tierra, encargado de cuidarla. Todo niño nace con una disposición natural (fitra) a conocer a Dios y someterse a él.', 'Corán 2:30; 30:30'],
        1: ['Adán pecó y Dios lo perdonó, así que no se hereda culpa alguna. El hombre nace puro, pero débil y olvidadizo, y necesita que se le recuerde, no un corazón nuevo.', 'Corán 2:37; 4:28'],
        2: ['El musulmán se somete cumpliendo los cinco pilares: la confesión, la oración cinco veces al día, la limosna, el ayuno de Ramadán y la peregrinación. Que se salve depende de la voluntad de Dios.', 'Corán 2:177'],
        3: ['Espera que sus buenas obras pesen más que las malas y que Dios sea misericordioso, pero nadie puede estar seguro. El evangelio ofrece una certeza que el islam no puede: “para que sepáis que tenéis vida eterna.”', '1 Jn 5:13'],
      },
      sin: {
        1: ['El hombre se extravía porque olvida a Dios. El remedio es el recuerdo (dhikr) y la guía de los mensajeros de Dios, no el rescate de una naturaleza pecadora.', 'Corán 20:115'],
        2: ['Dios perdona a quien quiere, cuando se arrepiente; no hace falta sacrificio, y nadie puede cargar con la carga de otro. Pero entonces la justicia de Dios se deja de lado en vez de satisfacerse.', 'Corán 6:164 · Ro 3:26'],
      },
    },

    deism: {
      god: {
        '*': ['Un ser supremo, conocido por la razón a partir del orden de la naturaleza, que hizo el mundo y lo dejó funcionar con sus propias leyes. No se revela, no hace milagros ni responde la oración. Voltaire, Paine y muchos de la Ilustración creyeron en un Dios así.', 'Paine, La edad de la razón'],
        2: ['A Dios solo se le conoce por inferencia, a partir del diseño del mundo, como al relojero por el reloj. Voltaire sostenía que “si Dios no existiera, habría que inventarlo.” Pero un Dios conocido solo como conclusión es una hipótesis, no alguien a quien amar o en quien confiar.', 'Voltaire, Epístola al autor de los Tres impostores'],
        3: ['Dios está más lejos que nunca: si nunca habla, nada puede saberse de lo que piensa de nosotros, ni de lo que viene tras la muerte.', 'He 1:1–2'],
      },
      world: {
        '*': ['El mundo es una inmensa máquina que funciona con leyes fijas que ningún milagro rompe: el mecanismo de relojería de Newton, al que su Hacedor dio cuerda una vez.', 'Newton, Principia'],
        1: ['Alexander Pope escribió que “todo lo que es, está bien”: el mundo es tan bueno como puede ser, y el mal solo lo parece desde donde estamos. Entonces nada está realmente mal, y nada necesita arreglo.', 'Pope, Ensayo sobre el hombre'],
        2: ['La naturaleza es la única escritura del hombre: de sus leyes aprende que Dios existe y cuál es su deber. Es la “religión natural”, que no necesita revelación.', 'Tindal, El cristianismo tan antiguo como la creación'],
        3: ['La máquina sigue funcionando, sin fin a la vista ni día de rendir cuentas, porque su Hacedor no ha dicho nada de ninguno de los dos.', ''],
      },
      bridge: {
        '*': ['El deísmo niega que Dios haya hablado: ni profetas, ni milagros, ni escritura, ni encarnación. “Mi propia mente es mi propia iglesia”, escribió Thomas Paine. Pero si Dios no ha hablado, su mente y su voluntad nos quedan cerradas.', 'Paine, La edad de la razón · He 1:1–2'],
        2: ['El hombre sube hacia Dios solo con la razón. La razón es un don de Dios, pero según la Biblia está oscurecida por el pecado, y los hombres “se envanecieron en sus razonamientos”.', 'Ro 1:21'],
        3: ['Dios no ha prometido nada: ni perdón, ni resurrección, ni vida venidera. El deísta puede esperar, pero no tiene palabra en que apoyar su esperanza.', ''],
      },
      self: {
        '*': ['El hombre es un ser racional, capaz de descubrir por la luz natural que Dios existe y qué es lo justo. No necesita revelación ni redentor.', ''],
        1: ['Lo que frena al hombre no es un corazón pecador sino la ignorancia, la superstición y los sacerdotes que lo mantienen a oscuras. Enséñale, y obrará bien.', 'Paine, La edad de la razón'],
        3: ['Todo el credo de Paine: “Creo en un solo Dios, y en nada más; y espero la felicidad más allá de esta vida.” Espera, pero un Dios que no ha prometido nada no le da nada en que apoyarse.', 'Paine, La edad de la razón'],
      },
      sin: {
        1: ['El deísmo no tiene caída: el mal viene de la ignorancia y la superstición, y la cura es la educación y la razón. Pero los hombres más ilustrados no son por ello los más buenos.', 'Jer 17:9'],
      },
    },

    mtd: {
      god: {
        '*': ['Un Dios que hizo el mundo y vela por él, pero apenas interviene en la vida diaria. Los sociólogos Christian Smith y Melinda Denton llamaron así a la fe real de muchos jóvenes estadounidenses, a menudo dentro de las iglesias.', 'Smith y Denton, Soul Searching'],
        1: ['Dios está olvidado hasta que algo sale mal. No pide nada: ni culto, ni obediencia, ni arrepentimiento. Se le busca en una urgencia, y se le vuelve a olvidar cuando pasa.', ''],
        2: ['Dios está de guardia, para resolver problemas y ayudar a sentirse mejor: “algo así como una combinación de Mayordomo Divino y Terapeuta Cósmico”, en palabras de Smith y Denton. Un Dios así sirve a los deseos del hombre; no es el Señor.', 'Smith y Denton, Soul Searching · Is 45:9'],
        3: ['En el cielo Dios sigue al servicio de la gente, garante de su felicidad. Lo que esperan no es a Dios, sino pasarlo bien.', 'Sal 73:25'],
      },
      world: {
        '*': ['El mundo es un lugar agradable bajo la mirada de Dios, donde la gente procura llevarse bien y ser feliz. Nada en él está gravemente mal.', ''],
        1: ['El mundo es estresante: la vida trae presión, heridas y decepciones. Se viven como problemas que gestionar, no como señales de un mundo bajo maldición.', ''],
        3: ['Al morir, los buenos dejan este mundo por otro mejor. Nada se dice de que este mundo sea juzgado o hecho nuevo.', ''],
      },
      bridge: {
        2: ['La oración es una llamada de auxilio cuando algo va mal: pedir, no adorar, confesar ni dar gracias. Jesús enseñó a sus discípulos a orar primero: “santificado sea tu nombre; venga tu reino.”', 'Mt 6:9–10'],
      },
      self: {
        '*': ['La gente es buena en el fondo, y uno de los artículos de este credo es que “el objetivo central de la vida es ser feliz y sentirse bien con uno mismo.” Ser amable y justo con los demás se sigue de ahí.', 'Smith y Denton, Soul Searching'],
        1: ['Aun cuando la gente obra mal, sigue siendo buena por dentro; lo que ha fallado es cómo se siente. La Escritura dice: “No hay justo, ni aun uno.”', 'Ro 3:10'],
        3: ['“La gente buena va al cielo al morir”, y casi todos son lo bastante buenos según su propia medida. Pero la medida de Dios es su propia santidad: “todos pecaron, y están destituidos de la gloria de Dios.”', 'Smith y Denton, Soul Searching · Ro 3:23'],
      },
      sin: {
        1: ['Lo que falla es la infelicidad: el estrés, los sentimientos heridos y la baja autoestima. No hay pecado contra Dios, solo sentimientos que aliviar.', ''],
        2: ['La infelicidad se alivia y nada se perdona, porque nada necesitaba perdón. Así la cruz no tiene lugar, y la gracia se vuelve innecesaria.', 'Gá 2:21'],
      },
    },

    naturalism: {
      god: {
        '*': ['“El cosmos es todo lo que es, lo que fue y lo que será.” No hay Dios ni ámbito alguno más allá de la naturaleza: ni espíritus, ni almas, ni cielo. Solo es real lo que la ciencia podría en principio medir.', 'Sagan, Cosmos'],
        1: ['Sin nadie arriba, el sufrimiento no es obra de nadie: no hay a quién culpar ni a quién clamar. La pregunta “¿por qué?” no tiene quien la responda.', ''],
        2: ['No hay nadie a quien pedir ayuda o sabiduría; el hombre solo tiene su propia mente y los métodos de la ciencia para guiarse.', ''],
        3: ['Nadie lo recordará: cuando se apague la última mente, nadie sabrá que algo ocurrió.', ''],
      },
      world: {
        0: ['El cosmos es materia y energía, movidas por leyes físicas ciegas. Nadie lo hizo, no tiene propósito y no va a ninguna parte. Todo, incluidas la mente y la moral, se explica desde abajo.', ''],
        1: ['El dolor, la enfermedad y la muerte no son una caída desde algo mejor: son el modo en que obra la evolución. Dawkins: el universo no tiene “ningún diseño, ningún propósito, ni mal ni bien, nada más que una indiferencia ciega y despiadada.” Pero si no hay mal, el sufrimiento no puede llamarse malo.', 'Dawkins, El río del Edén'],
        2: ['La ciencia estudia el mundo y la tecnología lo pone a trabajar. Que el mundo pueda entenderse es un hecho que el naturalismo no explica: ¿por qué un universo sin mente habría de ser tan ordenado y tan accesible a la mente?', ''],
        3: ['Con el tiempo las estrellas se apagan y el universo se agota. Russell: “todos los trabajos de los siglos, toda la devoción, toda la inspiración, todo el brillo meridiano del genio humano, están destinados a extinguirse en la vasta muerte del sistema solar.”', 'Russell, El culto del hombre libre'],
      },
      bridge: {
        '*': ['Un sistema cerrado: todo suceso tiene una causa natural, y nada de fuera irrumpe. Lewontin admitió que el compromiso va primero: “no podemos permitir que un Pie Divino cruce la puerta.” Así los milagros y la revelación quedan descartados antes de oír prueba alguna.', 'Lewontin, Billions and Billions of Demons'],
        2: ['El sistema sigue cerrado: ninguna ayuda puede venir de fuera. Lo que el hombre necesite, ha de encontrarlo o hacerlo él mismo dentro de la naturaleza.', ''],
        3: ['La historia no tiene meta. Monod: “el hombre sabe al fin que está solo en la inmensidad indiferente del universo, de donde ha surgido por azar.”', 'Monod, El azar y la necesidad'],
      },
      self: {
        0: ['El hombre es un animal complejo, producto de una evolución sin guía. Francis Crick: “Tú, tus alegrías y tus penas, tus recuerdos y tus ambiciones… no sois de hecho más que el comportamiento de un vasto conjunto de células nerviosas y sus moléculas asociadas.”', 'Crick, La búsqueda científica del alma'],
        1: ['El hombre sufre y muere como cualquier otro ser vivo. Su sensación de que eso está mal, de que no debería ser así, es también solo un producto de la naturaleza.', ''],
        2: ['Si la mente es producto de procesos ciegos orientados a sobrevivir, ¿por qué confiar en que halle la verdad? Darwin lo sintió: “siempre surge la horrible duda de si las convicciones de la mente del hombre, desarrollada a partir de la de los animales inferiores, tienen algún valor o son en absoluto fiables.”', 'Darwin, carta a W. Graham, 1881'],
        3: ['Cada persona vive un instante y desaparece para siempre. Su amor, su obra y su memoria acaban con la química que los produjo.', ''],
      },
      sin: {
        1: ['El sufrimiento no es castigo ni señal de nada; nadie lo quiso. Pero si nadie lo quiso, no hay base para llamarlo malo, solo indeseado.', ''],
      },
    },

    humanism: {
      god: {
        '*': ['No hay Dios, así que el hombre debe hacer lo que pueda de sí mismo y de su mundo con la razón y la ciencia. Los Manifiestos Humanistas de 1933 y 1973 lo expusieron: “Ninguna deidad nos salvará; debemos salvarnos nosotros mismos.”', 'Manifiesto Humanista II'],
        1: ['La religión es un cuento que el hombre se cuenta en su infancia y deja atrás al aprender. La fe en Dios se ve como una etapa del desarrollo humano, ya superada.', ''],
        3: ['Cuando la humanidad desaparezca, no habrá nadie que la recuerde: ningún Dios que guarde sus obras, ni historia que las escriba.', ''],
      },
      world: {
        '*': ['El cosmos es todo lo que hay: materia, y nada más. No fue hecho para nosotros, pero podemos entenderlo y moldearlo para nuestro bien.', ''],
        1: ['El universo no es amigo ni enemigo: no sabe que estamos aquí. El bien que haya, ha de traerlo el hombre.', ''],
        2: ['La naturaleza nos dice lo que es, no lo que debe ser: de los hechos solos no se sigue ningún deber, como vio Hume. ¿De dónde sale entonces el “debes” del humanista?', 'Hume, Tratado de la naturaleza humana'],
        3: ['En un futuro lejano el sol morirá y se llevará consigo a la humanidad. Todo logro del progreso acabará en el mismo silencio.', ''],
      },
      bridge: {
        2: ['El progreso: con educación, ciencia y buenas leyes, la humanidad puede subir siempre más alto, por su propio esfuerzo. El siglo XX, el más instruido y científico hasta entonces, fue también el más sangriento.', ''],
        3: ['Si todo acaba en la extinción, el progreso es una escalera que no lleva a ninguna parte. La esperanza que descansa solo en el esfuerzo del hombre se agota con el hombre.', 'Ec 1:2–4'],
      },
      self: {
        0: ['“El hombre es la medida de todas las cosas”, dijo Protágoras: tiene gran valor, es lo más notable que ha producido la naturaleza. Pero si solo es materia moldeada por el azar, el valor que el humanismo le da es una creencia prestada, no un hecho.', 'Protágoras · Gn 1:27'],
        1: ['El hombre es bueno en el fondo; lo que lo frena es la ignorancia, la pobreza, el prejuicio y la religión. Quítense, y florecerá.', ''],
        2: ['El hombre elige sus propios valores. Pero valores que cada uno elige para sí no obligan a nadie más, ni pueden condenar a quien elija otros.', ''],
        3: ['Cada persona sigue viva solo en sus obras y en la memoria de otros, y también estas se desvanecerán.', ''],
      },
      sin: {
        1: ['El mal está fuera del hombre: en la superstición, la ignorancia y las malas instituciones. El corazón no necesita cambiar, solo mejor enseñanza.', 'Jer 17:9'],
      },
    },

    nihilism: {
      god: {
        '*': ['El loco de Nietzsche: “Dios ha muerto. Dios sigue muerto. Y nosotros lo hemos matado… ¿Quién nos dio la esponja para borrar el horizonte entero?” Sin Dios no hay propósito, sentido ni valor inscritos en nada.', 'Nietzsche, La gaya ciencia 125'],
        1: ['No hay nadie que juzgue, así que nada es de veras bueno ni malo. Hasta condenar la crueldad es solo una preferencia.', ''],
        2: ['No hay nadie que salve, ni nada de qué ser salvado. La salvación necesita algo que esté mal y alguien capaz de arreglarlo; el nihilismo no tiene ninguna de las dos cosas, así que no puede ofrecer remedio alguno.', ''],
      },
      world: {
        '*': ['El cosmos está aquí sin razón alguna. No significa nada, no apunta a nada y no valora nada; simplemente está.', ''],
        1: ['Nada en el mundo vale más que otra cosa. Si no existe ningún valor, tampoco el de la verdad, y el nihilismo ni siquiera puede llamarse verdadero.', ''],
      },
      bridge: {
        '*': ['“¿Qué significa nihilismo? Que los valores supremos se desvalorizan. Falta la meta; falta la respuesta al ‘¿por qué?’.” Sin nada arriba, el sentido se escurre: no hay nada en que apoyarlo.', 'Nietzsche, La voluntad de poder 2 · Ec 1:14'],
        2: ['No hay salida, porque nada está mal de qué escapar, ni lugar mejor adonde ir.', ''],
        3: ['Todo se escurre y se pierde; nada se guarda, y nada de lo hecho contará.', ''],
      },
      self: {
        0: ['El hombre es un accidente de la materia: nadie lo quiso, y nada se quiere decir con él.', ''],
        1: ['Si la mente también es un accidente, no se puede confiar en que sepa nada, ni siquiera que el nihilismo es verdad. La postura socava su propio fundamento.', ''],
        2: ['El hombre está vacío, sin razón para obrar de un modo u otro. Pocos pueden vivir como si esto fuera verdad; la mayoría toma prestado un sentido que no puede justificar.', ''],
        3: ['Cuando un hombre muere, da igual que haya vivido. Pero nadie, ni el nihilista, se atreve a creer eso de las personas que ama.', 'Ec 3:11'],
      },
    },

    existentialism: {
      god: {
        '*': ['Sartre hizo suyas las palabras de Dostoievski: “Si Dios no existiera, todo estaría permitido… ese es el punto de partida del existencialismo.” Sin Dios que le dé una naturaleza o un propósito, el hombre debe dárselos a sí mismo.', 'Sartre, El existencialismo es un humanismo'],
        1: ['El hombre clama por sentido, y nadie responde. Camus partió de ahí: “No hay más que un problema filosófico verdaderamente serio: el suicidio.” No negó el anhelo; negó que hubiera alguien para colmarlo.', 'Camus, El mito de Sísifo'],
        2: ['Nadie está por encima del hombre para corregirlo: ni ley sobre sus elecciones, ni juez de ellas.', ''],
        3: ['Nadie guarda lo que un hombre hizo de sí mismo: cuando muere, se pierde.', ''],
      },
      world: {
        '*': ['El mundo simplemente está: sólido, callado e indiferente. Camus: “Lo absurdo nace de esta confrontación entre el llamado humano y el silencio irrazonable del mundo.”', 'Camus, El mito de Sísifo'],
        3: ['El mundo sigue igual cuando un hombre muere, como si nunca hubiera elegido nada.', ''],
      },
      bridge: {
        '*': ['El sentido no se encuentra, se hace, con las propias elecciones. Camus termina con Sísifo, empujando su roca para siempre: “Hay que imaginarse a Sísifo feliz.” Pero un sentido hecho por el hombre es solo tan grande como él, y acaba cuando él acaba.', 'Camus, El mito de Sísifo'],
        2: ['Cualquier elección vale, si es de veras suya. Pero entonces nada puede decirse contra una elección cruel hecha con autenticidad.', ''],
      },
      self: {
        0: ['“La existencia precede a la esencia”: el hombre primero existe y luego se define. No hay naturaleza humana dada de antemano.', 'Sartre, El existencialismo es un humanismo'],
        1: ['El hombre es libre, y su libertad es una carga: está angustiado y solo, “condenado a ser libre”.', 'Sartre, El ser y la nada'],
        2: ['“El hombre no es otra cosa que lo que él se hace”, escribió Sartre: lo que elige, eso llega a ser. Pero un yo hecho de la nada no tiene nada con que medirse.', 'Sartre, El existencialismo es un humanismo'],
        3: ['La muerte acaba con la tarea de hacerse a sí mismo, y con ella su sentido. El proyecto queda inacabado para siempre.', ''],
      },
      sin: {
        1: ['La única falta es la “mala fe”: esconderse de la propia libertad tras papeles, normas o excusas. Es el pecado del existencialista, pero una falta contra uno mismo, nunca contra Dios.', 'Sartre, El ser y la nada'],
      },
    },

    postmodernism: {
      god: {
        '*': ['No hay Dios ni verdad final por encima de nuestras palabras: ningún Verbo, solo palabras. Lyotard definió lo posmoderno como “la incredulidad ante los metarrelatos”.', 'Lyotard, La condición posmoderna'],
        1: ['Dios es un relato más, contado por quienes ganan poder con él: sacerdotes, reyes, iglesias. La fe queda desenmascarada como medio de control. Pero desenmascarar es ya pretender ver las cosas como de verdad son.', ''],
        2: ['La verdad no se niega, se empequeñece: verdad para este grupo, en este lugar, por ahora.', ''],
      },
      world: {
        0: ['La realidad queda oculta tras nuestras palabras; nunca encontramos el mundo tal como es, solo como lo moldean nuestro lenguaje y nuestra cultura.', ''],
        1: ['Foucault: “Cada sociedad tiene su régimen de verdad”: lo que cuenta como verdadero, normal o bueno lo fijan quienes tienen el poder. Pero Foucault escribía como si su propio relato fuera simplemente verdadero.', 'Foucault, Verdad y poder'],
        2: ['La realidad es lo que un grupo acuerde. Rorty describió la verdad como lo que nuestros pares “nos dejan decir sin objeción”. Pero si la verdad es solo acuerdo, cuando los grupos discrepan no queda nada a qué apelar, salvo el poder.', 'Rorty, La filosofía y el espejo de la naturaleza'],
        3: ['La realidad se pierde para siempre, tras un juego interminable de palabras: cada signo apunta solo a otros signos, nunca a la cosa misma. Si es así, también esta frase apunta a nada.', ''],
      },
      bridge: {
        0: ['El lenguaje no describe el mundo: lo construye. “No hay nada fuera del texto”, escribió Derrida. Pero esta afirmación se ofrece ella misma como una descripción verdadera de cómo son las cosas.', 'Derrida, De la gramatología'],
        1: ['Todo gran relato (el cristianismo, la Ilustración, el marxismo) se llama máscara del poder, contado para acallar a otros. Pero afirmar que todo relato sirve al poder es también un gran relato.', ''],
        2: ['La deconstrucción desarma un texto o una tradición para exponer lo que oculta. Solo perdona su propio relato: sus propias afirmaciones nunca se deconstruyen.', 'Derrida, De la gramatología'],
        3: ['Unos relatos sustituyen a otros sin fin, y ninguno es verdadero; lo que sirve por ahora es todo lo que cabe esperar. El cristianismo responde con un relato contado por quien está fuera de él, y que entró en él.', ''],
      },
      self: {
        0: ['El yo no es un alma ni una naturaleza, sino un producto de los relatos que se cuentan de él.', ''],
        1: ['El hombre es moldeado, y aun hecho, por quienes tienen el poder y las categorías que imponen.', ''],
        2: ['Cada uno es libre de contar su propio relato. Pero si ningún relato es más verdadero que otro, contar el suyo no le dice nada a nadie.', ''],
        3: ['Al final el yo se deshace: un cruce de voces y papeles, sin nadie en el centro.', ''],
      },
      sin: {
        1: ['La opresión se llama mala, y con fuerza. Pero el posmodernismo no tiene norma por la que algo sea malo, así que su propia indignación toma prestada la ley moral que niega.', 'Ro 2:14–15'],
        2: ['La opresión se denuncia y se combate, pero sin norma por encima de todos los grupos para juzgarla; el juicio solo puede ser el poder de un grupo contra el de otro.', ''],
      },
    },

    marxism: {
      god: {
        0: ['La religión es “el opio del pueblo”: un consuelo que toman los oprimidos para calmar su dolor, que les impide cambiar su condición. Cuando la sociedad sea justa, ya no hará falta.', 'Marx, Crítica de la filosofía del derecho de Hegel'],
        1: ['La religión es “el suspiro de la criatura oprimida”: un clamor real, pero dirigido al cielo en vez de a quienes explotan.', 'Marx, Crítica de la filosofía del derecho de Hegel'],
        2: ['Sin Dios, el hombre debe salvarse a sí mismo, y el partido lo llevará hasta allí.', ''],
        3: ['No hay juicio por venir: el único juez es la historia, y quienes la sirven quedan justificados, hagan lo que hagan.', ''],
      },
      world: {
        0: ['La materia es todo lo que hay, y la historia avanza mediante el conflicto (materialismo dialéctico). Cómo se ganan la vida los hombres, la “base económica”, da forma a todo lo demás: el derecho, la moral, el arte y la religión.', 'Marx y Engels, Manifiesto comunista'],
        1: ['“La historia de todas las sociedades hasta nuestros días es la historia de la lucha de clases”: dueños contra obreros, los que poseen los medios de producción contra los que solo tienen su trabajo que vender.', 'Marx y Engels, Manifiesto comunista'],
        2: ['El Estado obrero planifica toda la producción desde el centro. Mises mostró por qué no puede funcionar: “donde no hay mercado libre, no hay mecanismo de precios; sin mecanismo de precios, no hay cálculo económico.”', 'Mises, El cálculo económico en la comunidad socialista'],
        3: ['Al final el Estado se extingue y surge la sociedad sin clases: “de cada cual según su capacidad, a cada cual según sus necesidades.” Es el cielo en la tierra, y siempre está por venir.', 'Marx, Crítica del programa de Gotha'],
      },
      bridge: {
        0: ['“No es la conciencia del hombre la que determina su ser, sino el ser social el que determina su conciencia.” Toda idea descansa en la base económica. Pero entonces las ideas del propio Marx son solo producto de su posición de clase, y no más verdaderas que otras.', 'Marx, Prólogo a la Contribución a la crítica de la economía política'],
        1: ['La plusvalía: la ganancia es lo que el dueño toma del trabajo del obrero por encima de su salario. Se apoya en la tesis de que solo el trabajo crea valor, que Böhm-Bawerk mostró falsa: el valor nace de lo que la gente quiere, no del trabajo invertido.', 'Böhm-Bawerk, La conclusión del sistema marxiano'],
        2: ['“Los filósofos no han hecho más que interpretar de diversos modos el mundo; de lo que se trata es de transformarlo.” La revolución es la salvación: los obreros toman el poder por la fuerza. Dondequiera que se intentó, no trajo liberación sino el gulag y la hambruna.', 'Marx, Tesis sobre Feuerbach XI'],
      },
      self: {
        0: ['El hombre no es un alma hecha a imagen de Dios, sino “el conjunto de las relaciones sociales”: lo que la sociedad y el trabajo hacen de él.', 'Marx, Tesis sobre Feuerbach'],
        1: ['El obrero está alienado: separado de lo que produce, de su trabajo, de los demás y de sí mismo. Marx vio un dolor real, pero lo atribuyó a la propiedad, no a la separación del hombre de Dios.', ''],
        2: ['Cambia las condiciones y cambiarás al hombre: la nueva sociedad hará un “hombre nuevo”. Donde se intentó, al hombre nuevo hubo que forzarlo.', ''],
        3: ['Cada generación se gasta por un futuro que nunca verá, y el individuo no cuenta nada frente a la causa.', ''],
      },
      sin: {
        1: ['El mal está en el sistema, en la propiedad privada y las clases, no en el corazón humano. Cambia el sistema y el mal desaparece.', ''],
        2: ['Pero el mal seguía en el corazón de los nuevos amos. Solzhenitsyn, que sobrevivió a sus campos, escribió que “la línea que separa el bien del mal pasa por el corazón de cada ser humano.”', 'Solzhenitsyn, Archipiélago Gulag'],
      },
    },

    individualism: {
      god: {
        '*': ['No hay autoridad por encima del yo: ni Dios, ni la naturaleza, ni la tradición. El sentido se encuentra mirando hacia dentro. Robert Bellah lo describió en Hábitos del corazón: cada persona tiene “un núcleo único de sentimiento e intuición que debe desplegarse o expresarse.”', 'Bellah et al., Hábitos del corazón'],
        1: ['Dios, si se le conserva, se vuelve una norma más que sacudirse, o un respaldo de lo que el yo ya ha elegido.', ''],
        2: ['El yo es su propio juez: nadie puede decirle que se equivoca. Pero un juez que no responde ante nadie no admite apelación, ni siquiera del yo al que perjudica.', ''],
        3: ['No queda nadie que diga quién soy, sino yo. Pero el yo que se pone nombre nunca está seguro de que el nombre sea verdadero.', 'Sal 139:1–4'],
      },
      world: {
        0: ['La sociedad es un escenario donde el yo representa quién es. Rousseau empezó sus Confesiones: “No estoy hecho como ninguno de cuantos he visto… Si no valgo más, al menos soy distinto.”', 'Rousseau, Confesiones'],
        1: ['La familia, la iglesia y la ley moral se ven como muros que encierran al yo. Ser libre es romperlos.', ''],
        2: ['La sociedad debe ahora afirmar a cada yo tal como se presenta. El Tribunal Supremo de Estados Unidos puso el credo en ley: “En el corazón de la libertad está el derecho a definir el propio concepto de la existencia, del sentido, del universo y del misterio de la vida humana.”', 'Planned Parenthood v. Casey (1992)'],
        3: ['El resultado es una multitud de yoes, cada uno solo: libres de todo vínculo, y sin nadie vinculado a ellos.', ''],
      },
      bridge: {
        2: ['La autenticidad: seguir al propio corazón, piensen lo que piensen los demás. Charles Taylor la describe: “Hay un cierto modo de ser humano que es mi modo.” Pero la Escritura advierte: “Engañoso es el corazón más que todas las cosas.”', 'Taylor, La ética de la autenticidad · Jer 17:9'],
      },
      self: {
        0: ['Cada persona tiene dentro un yo verdadero, que se encuentra mirando hacia dentro: sus sentimientos y deseos son su verdad. Pero los sentimientos cambian y se contradicen; no pueden ser todos verdad.', ''],
        1: ['El yo se siente sujeto por normas ajenas: padres, iglesias, costumbres y códigos morales que le dicen quién ser. Lo que de verdad es, no se le permite serlo, y por eso se siente falso consigo mismo.', ''],
        2: ['El yo es su propio hacedor: decide lo que es, y los demás deben aceptarlo. Pero un yo hecho por elección puede deshacerse con la siguiente.', ''],
        3: ['La meta es llegar a ser plenamente uno mismo y sentirse realizado. Cuando el yo muere, la historia que contaba de sí acaba con él.', 'Mr 8:35'],
      },
      sin: {
        1: ['El único pecado es negarse a uno mismo: reprimir lo que se siente o se desea. Esto pone del revés el llamado de Jesús: “Si alguno quiere venir en pos de mí, niéguese a sí mismo, tome su cruz.”', 'Lc 9:23'],
      },
    },

    transhumanism: {
      god: {
        0: ['Todavía no hay Dios, pero puede haberlo: el hombre mismo, rehecho. Preguntado si Dios existe, Ray Kurzweil respondió: “Todavía no.”', 'Kurzweil, en Transcendent Man'],
        1: ['Sin nadie arriba, la muerte no es juicio de nadie ni tiene sentido alguno: es una avería de la máquina, un problema de ingeniería por resolver. Nick Bostrom la imaginó como un dragón tirano que la humanidad solo necesita atreverse a matar.', 'Bostrom, La fábula del dragón tirano'],
        2: ['El hombre quiere llenar el hueco que quedó. Harari: “ahora aspiraremos a convertir a los humanos en dioses, y a transformar al Homo sapiens en Homo deus.”', 'Harari, Homo Deus'],
        3: ['La Singularidad: el momento en que la inteligencia de las máquinas supera la nuestra y lo rehace todo. Es la tentación más antigua en forma nueva: “Seréis como Dios.”', 'Gn 3:5 · Kurzweil, La Singularidad está cerca'],
      },
      world: {
        0: ['La naturaleza es materia prima que mejorar. Max More le escribió: “Madre Naturaleza, de veras te estamos agradecidos por lo que nos has hecho… hemos decidido que es hora de enmendar la constitución humana.”', 'More, Carta a la Madre Naturaleza'],
        1: ['La naturaleza es ciega, cruel y lenta: la evolución tardó millones de años en darnos cuerpos que envejecen y fallan. Podemos hacerlo mejor, y más rápido.', ''],
        2: ['La naturaleza está siendo rediseñada: genes editados, cuerpos reparados con piezas nuevas, mentes unidas a máquinas. Lo que la evolución hizo a ciegas durante eras, los ingenieros quieren hacerlo a propósito en décadas. Pero ¿quién decide para qué es el rediseño?', ''],
        3: ['Al final la naturaleza misma queda cableada: Kurzweil prevé la materia y la energía “saturadas” de inteligencia, el universo despertando. El mundo se vuelve una gran máquina de pensar, sin más Hacedor que las mentes que la construyeron.', 'Kurzweil, La Singularidad está cerca'],
      },
      bridge: {
        2: ['La tecnología es el camino de salvación: mejora a mejora, el hombre se elevará sobre sus límites. Julian Huxley acuñó la palabra: “el hombre sigue siendo hombre, pero se trasciende a sí mismo, realizando nuevas posibilidades de y para su naturaleza humana.”', 'Huxley, New Bottles for New Wine'],
        3: ['La mente copiada: una mente volcada en una máquina, que funciona mientras dure el equipo. Pero una copia no es el copiado: el hombre muere igual, y otra cosa sigue.', ''],
      },
      self: {
        0: ['El hombre es un borrador, no una obra acabada: producto de la evolución, que ahora podemos tomar en nuestras manos. La Escritura dice lo contrario: el hombre está hecho a imagen de Dios, y no es un experimento.', 'Gn 1:27'],
        1: ['El hombre está atrapado en un cuerpo que falla, limitado por la vejez, la enfermedad y la muerte. Los transhumanistas no ven en ello el fruto de una caída ni la condición de una criatura, sino defectos del diseño que la naturaleza nos dio por azar.', ''],
        2: ['El poshumano, rehecho por su propia mano: más fuerte, más listo, más longevo. Pero un hombre que se rehace a sí mismo aún no ha cambiado su corazón.', ''],
        3: ['El cuerpo queda atrás como un simple equipo. No es nuevo: es el viejo desprecio gnóstico por la carne, que Dios hizo y llamó buena, y en la que Cristo resucitó.', 'Lc 24:39'],
      },
      sin: {
        1: ['La muerte no es la paga del pecado, sino un problema que resolver. Harari: “la muerte no es un destino inevitable, sino solo un problema técnico… Y todo problema técnico tiene una solución técnica.” La Escritura: “la paga del pecado es muerte.”', 'Harari, Homo Deus · Ro 6:23'],
        2: ['La muerte se aplaza, no se vence: las vidas se alargan, pero todas siguen acabando. Solo uno ha vuelto de la muerte para no morir jamás, y promete lo mismo a todos los que son suyos.', '1 Co 15:20–26'],
      },
    },

    'new-age': {
      god: {
        '*': ['Dios es el Universo: una energía impersonal, una conciencia universal de la que todo forma parte. No una Persona que habla, ama o juzga, sino una fuerza que se siente y se aprovecha.', ''],
        1: ['Una energía impersonal no puede ser ofendida, así que no hay nada que perdonar ni nadie que perdone. Pero tampoco puede amar: una fuerza no tiene corazón que poner en nadie.', '1 Jn 4:8'],
        2: ['Al Universo se le aprovecha, no se le adora: se recurre a él con técnicas para la salud, la riqueza y la paz. Responde al método correcto, como la electricidad, y no pide nada a cambio.', ''],
        3: ['A lo divino se llega subiendo, por el crecimiento espiritual a lo largo de muchas vidas, no se recibe como un don. La gracia no tiene lugar donde cada alma debe ganarse su propia subida.', 'Ef 2:8–9'],
      },
      world: {
        0: ['Todo es uno: el cosmos y el yo son un gran todo, y lo uno es divino. Se niega la diferencia entre el Creador y la criatura.', 'Ro 1:25'],
        1: ['La mayoría solo ve la superficie de las cosas, un mundo de objetos y yoes separados, sin advertir la unidad y la divinidad que hay debajo. Despertar es ver a través de la separación hasta el gran todo.', ''],
        2: ['El mundo lo moldea la mente: los pensamientos atraen a sus semejantes y crean nuestra realidad. Entonces el enfermo y el pobre, en cierto sentido, eligieron su suerte.', ''],
        3: ['Una nueva era, la Era de Acuario, está siempre a punto de amanecer, cuando la humanidad despertará a la vez. La anunció La conspiración de Acuario de Marilyn Ferguson (1980).', 'Ferguson, La conspiración de Acuario'],
      },
      bridge: {
        2: ['La conciencia cósmica: en la meditación y en estados alterados, se dice que el yo conoce su unidad con todo. Allí el bien y el mal se disuelven en lo Uno.', ''],
        3: ['La reencarnación: el alma vuelve vida tras vida, aprendiendo, hasta quedar pura. No hay Salvador, solo la larga subida, y ningún juicio final.', 'He 9:27'],
      },
      self: {
        0: ['En lo hondo del yo, cada persona es divina. Shirley MacLaine, la voz más conocida del movimiento, lo dijo sin rodeos: “Yo soy Dios.”', 'MacLaine, Out on a Limb'],
        1: ['El yo ha olvidado su propia divinidad y vive encerrado en su mente ordinaria. La enseñanza de Eckhart Tolle: “Tú no eres tu mente.”', 'Tolle, El poder del ahora'],
        2: ['El yo despierto crea su propia realidad con sus pensamientos e intenciones: lo que imagina y espera, el Universo se lo trae. Es el yo en el lugar del Creador, cuya sola palabra hace que las cosas sean.', 'Sal 33:9'],
        3: ['El alma sube de vida en vida hacia la luz, sin juicio que afrontar, porque no hay ante quién rendir cuentas. La Escritura dice: “está establecido para los hombres que mueran una sola vez, y después de esto el juicio.”', 'He 9:27'],
      },
      sin: {
        1: ['Lo que falla no es el pecado sino el olvido: una conciencia estrecha. No hay Dios santo a quien ofender, solo una mente que expandir.', ''],
        2: ['El olvido se cura con técnica: meditación, cristales, canalización, el maestro adecuado. La salvación es algo que se hace, no que se recibe, y nunca termina; siempre hay un nivel más alto que alcanzar.', ''],
      },
    },

    'neo-paganism': {
      god: {
        0: ['La Diosa: Doncella, Madre y Anciana, la luna creciente, llena y menguante; y a menudo un Dios astado a su lado. Para Starhawk, la Diosa no gobierna el mundo desde fuera: es el mundo.', 'Starhawk, La danza en espiral'],
        1: ['La Diosa es olvidada, no ofendida: no da ninguna ley que quebrantar ni pide arrepentimiento. Lo que se ha perdido es una relación con la naturaleza, no la paz con un Dios santo.', ''],
        2: ['En el rito se invoca a la Diosa para que descienda en la sacerdotisa. En la Carga de la Diosa ella dice: “Todos los actos de amor y de placer son mis rituales.”', 'Valiente, La carga de la Diosa'],
        3: ['La Anciana da paso de nuevo a la Doncella: el ciclo nunca termina, y nada es hecho nuevo. La muerte es solo invierno, y la primavera siempre vuelve, igual que antes.', 'Ap 21:5'],
      },
      world: {
        0: ['La tierra es el cuerpo de la Diosa, y por tanto divina: toda vida participa de ella. La naturaleza no está hecha por Dios; es dios.', ''],
        1: ['La tierra está herida por la industria, las ciudades y las máquinas, que han apartado a la gente de los ciclos de la naturaleza. El resurgir neopagano nació en parte como protesta contra el mundo moderno e industrial.', ''],
        2: ['A la tierra se la sirve en lugar de su Hacedor, lo que Pablo nombra con precisión: “honrando y dando culto a las criaturas antes que al Creador.”', 'Ro 1:25'],
        3: ['La tierra gira para siempre, siempre dando vueltas, nunca renovada. La promesa de Cristo no es un ciclo sino un nuevo comienzo: “He aquí, yo hago nuevas todas las cosas.”', 'Ap 21:5'],
      },
      bridge: {
        0: ['La rueda del año: ocho fiestas (los solsticios, los equinoccios y los cuatro días intermedios) que giran con las estaciones, para siempre.', ''],
        2: ['La magia: poder buscado con la voluntad, el rito y las energías de la naturaleza, para producir cambios. Es poder tomado, no gracia recibida.', 'Dt 18:10–12'],
        3: ['La rueda da vueltas y vueltas sin día final: sin fin de la historia, sin juicio y sin meta. El tiempo es un círculo, no una historia que va a alguna parte.', ''],
      },
      self: {
        0: ['El hombre es un hijo de la tierra, una criatura entre muchas en la red de la vida, no más alta que las demás. Nada lo aparta para gobernar la tierra en nombre de su Hacedor, ni para responder ante él por ella.', 'Gn 1:28'],
        1: ['El hombre está desconectado de la tierra y de sus ritmos: la luna, las estaciones, el campo. La cura es volver a la naturaleza, no reconciliarse con su Hacedor.', '2 Co 5:18'],
        2: ['El pagano vive según la Rede wicana: “Si a nadie dañas, haz lo que quieras.” Pero ¿quién decide qué daña, y con qué medida?', 'La Rede wicana'],
        3: ['Al morir, el alma descansa en la Tierra del Verano, una tierra apacible de los muertos, y luego vuelve a nacer en otra vida, dando vueltas con la rueda.', ''],
      },
      sin: {
        1: ['Lo que falla es el desequilibrio y la desconexión, no el pecado contra un Dios santo. El daño es real, pero es daño a la naturaleza y a otros, nunca una ofensa contra un legislador.', ''],
        2: ['La desconexión se sana con ritos, sin nada que perdonar, porque nadie ha sido agraviado salvo la naturaleza y uno mismo. Sin un Dios santo, la culpa no tiene adónde ir ni quién la quite.', ''],
      },
    },
  },
};

// The note for a label in an act, or null: the act's own, else the one for every act.
export function noteFor(lang, wv, act, key) {
  const n = NOTES[lang]?.[wv]?.[key];
  if (!n) return null;
  return n[act] ?? n['*'] ?? null;
}
