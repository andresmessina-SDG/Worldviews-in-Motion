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
        '*': ['One God in three persons, each fully God and the three one God: Jesus sent his disciples to baptize “in the name of the Father and of the Son and of the Holy Spirit”, one name and three persons. He needs nothing, made everything and rules over all, and he is personal: he speaks, loves and judges.', 'Deut 6:4 · Matt 28:19'],
      },
      world: {
        0: ['“In the beginning, God created the heavens and the earth”: out of nothing, and not out of himself. The world is real, ordered and good, his handiwork, not an illusion or an accident. That is why it can be studied, enjoyed and cared for.', 'Gen 1:1, 31'],
        1: ['The world is still God’s good work, but the curse that followed man’s sin lies on it: “cursed is the ground because of you.” Thorns, toil, decay and death came with it, and “the whole creation has been groaning” ever since, waiting to be set free.', 'Gen 3:17–19 · Rom 8:20–22'],
        2: ['“God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life”; and “whoever does not believe is condemned already.” What sin ruined, Christ is putting right: in his people now, and at last in the whole creation.', 'John 3:16–18 · Rom 8:21'],
        3: ['Not a world thrown away but a world made new: “Behold, I am making all things new.” No curse, no tears, no death, and God himself dwelling with his people. But not everyone enters it: “nothing unclean will ever enter it,” but “only those who are written in the Lamb’s book of life.”', 'Rev 21:1–5, 27'],
      },
      bridge: {
        0: ['From the beginning God spoke to man and bound himself to him by covenant, with commands, promises and his own company. Man knows God because God makes himself known: “at many times and in many ways, God spoke to our fathers by the prophets.”', 'Gen 2:16–17 · Heb 1:1–2'],
        1: ['Man broke covenant with God, and fellowship turned to fear: Adam hid among the trees. The distance is moral, not a matter of space. Yet the longing remains, as Augustine prayed: “You have made us for yourself, and our heart is restless until it rests in you.”', 'Gen 3:8–10 · Augustine, Confessions I.1'],
        2: ['The eternal Son took on flesh, one person fully God and fully man: “there is one God, and there is one mediator between God and men, the man Christ Jesus.” He did not only teach the way back; he bore sin’s penalty himself and rose again.', '1 Tim 2:5 · 2 Cor 5:21'],
        3: ['What was lost in Eden is given back, and more: “They will see his face.” Faith gives way to sight, and nothing will ever come between God and his people again.', 'Rev 22:4 · 1 John 3:2'],
      },
      self: {
        0: ['Man is made in God’s image: personal, rational and moral, made to know God and rule the earth under him. His worth comes from his Maker, not his usefulness. “Man’s chief end is to glorify God, and to enjoy him for ever.”', 'Gen 1:26–27 · Westminster Shorter Catechism, Q. 1'],
        1: ['Man still bears God’s image, but sin has bent every part of him: mind, will and affections. He is not merely weak or ignorant but “dead in the trespasses and sins”, a rebel who cannot save himself.', 'Rom 3:10–12 · Eph 2:1–3'],
        2: ['“By grace you have been saved through faith. And this is not your own doing; it is the gift of God.” The believer is forgiven, declared righteous and made new. The one who will not come stays as he was: “whoever does not obey the Son shall not see life, but the wrath of God remains on him.”', 'Eph 2:8–10 · John 3:36'],
        3: ['Raised in body and made perfect in holiness, the redeemed live with God for ever, themselves at last as they were meant to be. All the dead are raised, but not all to life: “these will go away into eternal punishment, but the righteous into eternal life.”', 'Matt 25:46 · 1 Cor 15:42–44'],
      },
      sin: {
        1: ['Sin is not first a mistake or a sickness but rebellion: man refusing God’s rule to be, as the serpent promised, “like God”. “The wages of sin is death,” and everyone since Adam is born under it.', 'Gen 3:5 · Rom 5:12; 6:23'],
        2: ['Sin is not ignored or excused but paid for: “he was pierced for our transgressions; he was crushed for our iniquities.” Christ bore its full penalty in his people’s place, so that God is both “just and the justifier” of the one who believes.', 'Isa 53:5–6 · Rom 3:25–26'],
      },
    },

    judaism: {
      god: {
        '*': ['“Hear, O Israel: the LORD our God, the LORD is one.” The God of Abraham, Isaac and Jacob: holy, just and merciful, the maker of all, who acts in history. A Jew says the Shema morning and evening. He has no image, no partner and no incarnation.', 'Deut 6:4–5 · Exod 34:6–7'],
      },
      world: {
        '*': ['God made the world good and gave it to man to tend. It is not to be escaped but enjoyed and made holy. Before bread a Jew says: “Blessed are you, LORD our God, King of the universe, who brings forth bread from the earth.”', 'Gen 1:31; 2:15 · the blessing over bread'],
        1: ['The land was God’s gift, and its loss, first to Babylon and then to Rome, is read as the fruit of Israel’s sins: “By the waters of Babylon, there we sat down and wept, when we remembered Zion.” Exile became the setting of Jewish life for nearly two thousand years.', 'Deut 28:63–64 · Ps 137:1'],
        2: ['Every part of life is hallowed by a commandment: what is eaten, when one rests, how one does business, what is said over bread. “You shall be holy, for I the LORD your God am holy”: the world is made holy by keeping God’s law within it.', 'Lev 19:2'],
        3: ['The world to come, when the exiles are gathered, the temple rebuilt and “the earth shall be full of the knowledge of the LORD as the waters cover the sea.” The wicked are judged first, in Gehinnom; the rabbis taught that the righteous of the nations also have a share. Many details they left open.', 'Isa 11:9 · Tosefta Sanhedrin 13:2'],
      },
      bridge: {
        0: ['God bound himself to Abraham by oath: a land, descendants beyond counting, and a promise that “in you all the families of the earth shall be blessed.” At Sinai the covenant was given to his children as a people.', 'Gen 12:1–3; 15:17–18'],
        1: ['The prophets charge Israel with breaking the covenant, yet God does not cast them off. Jeremiah promised a new covenant, with sins remembered no more: “I will put my law within them, and I will write it on their hearts.” It is a promise Judaism still awaits.', 'Jer 31:31–34'],
        2: ['“Moses received the Torah at Sinai and handed it on to Joshua”, and so on, to the rabbis: Judaism holds that God gave a written law and an oral one, later set down in the Mishnah and the Talmud. Scripture knows of no second law, and Jesus rebuked traditions that set God’s word aside.', 'Avot 1:1 · Mark 7:8–13'],
        3: ['“I believe with perfect faith in the coming of the Messiah; and though he tarry, I will wait daily for his coming.” So runs Maimonides’ twelfth principle. Yet Daniel and Haggai place the Messiah’s coming while the second temple still stood, and it fell in AD 70.', 'Maimonides, Thirteen Principles · Dan 9:26 · Hag 2:9'],
      },
      self: {
        0: ['Man is made in God’s image, and every life is of great worth. Israel was chosen not for its greatness (“it was not because you were more in number than any other people that the LORD set his love on you”) but to be a holy people and a light to the nations.', 'Gen 1:27 · Deut 7:6–8'],
        1: ['Man is not born guilty or corrupt. He has two inclinations, one good and one evil, and is free to master the evil one by study and obedience. Scripture speaks more darkly: “the intention of man’s heart is evil from his youth.”', 'Gen 4:7; 8:21 · Ps 51:5'],
        2: ['When a Jew sins, he returns to God (teshuvah) by regret, confession and a changed life, above all on the Day of Atonement: “Return, O Israel, to the LORD your God.” God receives the penitent, but the sacrifice the Law appointed is gone.', 'Hos 14:1–2'],
        3: ['“I believe with perfect faith that there will be a resurrection of the dead.” Yet not all rise to the same end: “some to everlasting life, and some to shame and everlasting contempt.” The Mishnah teaches that “all Israel has a share in the world to come”, then names those who have none, beginning with whoever denies the resurrection.', 'Maimonides, Thirteen Principles · Dan 12:2 · Sanhedrin 10:1'],
      },
      sin: {
        1: ['Sin is a wrong act, not a fallen nature. The evil inclination is a drive to be tamed, and the Torah its remedy. The Talmud has God say: “I created the evil inclination, and I created the Torah as its antidote.” But a drive to be tamed needs no saviour.', 'Kiddushin 30b · Gen 8:21'],
        2: ['Without the temple there is no altar. When it fell, Yohanan ben Zakkai consoled his disciple: “We have another atonement as effective as this: acts of lovingkindness.” Prayer, repentance and charity took the offerings’ place. Yet the Law taught that “it is the blood that makes atonement”.', 'Avot de-Rabbi Natan 4 · Lev 17:11'],
      },
    },

    islam: {
      god: {
        '*': ['“Say: He is God, the One, God the Eternal. He begets not, nor is he begotten, and there is none like him.” Allah is absolutely one, merciful and almighty, wholly beyond his creation. To confess his oneness (tawhid) is the heart of Islam.', 'Quran 112'],
        1: ['“God does not forgive that partners be set up beside him, but he forgives what is less than that to whom he wills.” In the Quran’s eyes this shirk includes calling Jesus the Son of God, and the Trinity itself.', 'Quran 4:48; 5:73'],
        2: ['God reveals his will, in law and prophets, but not himself: “it is not for any human being that God should speak to him except by revelation, or from behind a veil, or by sending a messenger.” He is known by his names and commands, not met as a person who comes to man.', 'Quran 42:51'],
        3: ['Of God’s ninety-nine names in Islam, none is Father. The believer is God’s servant, never his child; the cry “Abba, Father” has no place in Islam.', 'Quran 19:93 · Rom 8:15'],
      },
      world: {
        0: ['God made the world by his command, “Be!”, and it was. It is real and good, created for man, and every part of it is a sign pointing to its Maker.', 'Quran 36:82'],
        1: ['Creation is full of signs (ayat) of God: “on the earth are signs for those of certain faith, and in yourselves. Will you not then see?” Yet men pass them by, heedless.', 'Quran 51:20–21 · Rom 1:20'],
        2: ['God’s law (sharia), drawn from the Quran and Muhammad’s example, is to govern all of life, worship, family, trade, crime and the state alike: “We have set you on a clear way (sharia) in the matter, so follow it.”', 'Quran 45:18'],
        3: ['Paradise is a garden of rivers, shade, fruit and companions, for those God admits. Sunni teaching counts the sight of God its highest joy: “faces that Day will be radiant, looking at their Lord.” Yet even there he is Lord and Judge, never Father.', 'Quran 47:15; 75:22–23'],
      },
      bridge: {
        2: ['Muslims hold the Quran to be God’s own speech, sent down to Muhammad through Gabriel: his final word. It denies the cross outright: “they did not kill him, nor did they crucify him, but it was made to appear so to them.” Between God and man it offers a book to obey, with no mediator and no atonement.', 'Quran 4:157; 42:51'],
        3: ['On the Last Day each person’s deeds are weighed: heavy scales lead to the Garden, light ones to the Fire. Even Muhammad said: “None of you will enter Paradise by his deeds… not even I, unless God covers me with his mercy.”', 'Quran 101:6–9 · Bukhari 6467'],
      },
      self: {
        0: ['Man is God’s deputy (khalifa), entrusted with the earth: “I am placing on the earth a deputy.” And Muhammad taught that “every child is born upon the fitra,” a natural disposition to know and submit to God.', 'Quran 2:30; 30:30 · Bukhari 1385'],
        1: ['Adam sinned and repented, and God “accepted his repentance”, so no guilt is passed down. Man is born pure, but “man was created weak” and forgetful: he needs reminding, not a new heart.', 'Quran 2:37; 4:28'],
        2: ['“Islam is built upon five”: the confession that there is no god but God and Muhammad is his messenger, prayer five times a day, almsgiving, the pilgrimage and the fast of Ramadan. Whether the Muslim is saved still rests on God’s will.', 'Bukhari 8 · Quran 2:177'],
        3: ['He hopes that his good deeds will outweigh his bad, and that God will be merciful, but no one may be sure. The gospel offers a certainty Islam cannot: “that you may know that you have eternal life.”', '1 John 5:13'],
      },
      sin: {
        1: ['Man goes wrong because he forgets God. Of Adam himself the Quran says, “he forgot, and We found in him no firm resolve.” The remedy is remembrance (dhikr) and guidance from God’s messengers, not rescue from a sinful nature.', 'Quran 20:115'],
        2: ['God forgives whom he wills, when they repent. No sacrifice is needed, for “no bearer of burdens shall bear the burden of another.” But then God’s justice is set aside rather than satisfied.', 'Quran 6:164 · Rom 3:26'],
      },
    },

    deism: {
      god: {
        '*': ['A supreme being, known by reason from the order of nature, who made the world and left it to run by its own laws. He does not reveal himself, work miracles or answer prayer. Voltaire, Paine and many of the Enlightenment held to such a God.', 'Paine, The Age of Reason'],
        2: ['God is known only by inference, from the design of the world, as a watchmaker from a watch. Voltaire held that “if God did not exist, it would be necessary to invent him.” But a God known only as a conclusion is a hypothesis, not one who can be loved or trusted.', 'Voltaire, Épître à l’auteur des Trois imposteurs'],
        3: ['God is further off than ever: if he never speaks, nothing can be known of what he thinks of us, or of what comes after death.', 'Heb 1:1–2'],
      },
      world: {
        '*': ['The world is a vast machine on fixed laws that no miracle breaks: clockwork, wound up once by its Maker. Newton had written that “this most beautiful system of the sun, planets, and comets, could only proceed from the counsel and dominion of an intelligent and powerful Being.”', 'Newton, Principia, General Scholium'],
        1: ['Alexander Pope wrote that “whatever is, is right”: the world is as good as it can be, and evil only seems so from where we stand. Then nothing is really wrong, and nothing needs mending.', 'Pope, An Essay on Man'],
        2: ['Nature is man’s only scripture: “The Word of God is the creation we behold,” wrote Paine. From its laws man learns God’s existence and his own duty, a “natural religion” that needs no revelation.', 'Paine, The Age of Reason · Tindal, Christianity as Old as the Creation'],
        3: ['The machine runs on, with no end in view and no day of reckoning, for its Maker has said nothing of either.', ''],
      },
      bridge: {
        '*': ['Deism denies that God has spoken: no prophets, no miracles, no scripture and no incarnation. “My own mind is my own church,” wrote Thomas Paine. But if God has not spoken, his mind and will remain closed to us.', 'Paine, The Age of Reason · Heb 1:1–2'],
        2: ['Man climbs toward God by reason alone. Reason is God’s gift, but on the Bible’s account it is darkened by sin, and men “became futile in their thinking”.', 'Rom 1:21'],
        3: ['God has promised nothing: neither forgiveness, nor resurrection, nor a life to come. Herbert of Cherbury, the father of English deism, still counted “reward or punishment after this life” among the articles of natural religion; but reason can guess at a judgement it cannot tell how to escape.', 'Herbert of Cherbury, De Veritate'],
      },
      self: {
        '*': ['Man is a rational being, able to discover by the light of nature that God exists and what is right; he needs no revelation and no redeemer. Jefferson advised his nephew: “Fix reason firmly in her seat, and call to her tribunal every fact, every opinion.”', 'Jefferson, letter to Peter Carr, 1787'],
        1: ['What holds man back is not a sinful heart but superstition, and the priests who keep him in the dark. Paine called the churches “human inventions, set up to terrify and enslave mankind, and monopolize power and profit.” Teach man, and he will do well.', 'Paine, The Age of Reason'],
        3: ['Paine hoped for “happiness beyond this life”, and Franklin believed that the soul “will be treated with justice in another life respecting its conduct in this.” Most deists expected both reward and punishment. But a God who has promised nothing gives no ground for the hope, nor any way to escape the fear.', 'Paine, The Age of Reason · Franklin, letter to Ezra Stiles, 1790'],
      },
      sin: {
        1: ['Deism has no fall: wrong comes from ignorance and superstition, and the cure is education and reason. Yet the most enlightened are not thereby the most good, for “the heart is deceitful above all things, and desperately sick.”', 'Jer 17:9'],
      },
    },

    mtd: {
      god: {
        '*': ['“A God exists who created and orders the world and watches over human life on earth”: the first tenet of the faith the sociologists Christian Smith and Melinda Denton found among many young Americans, often within churches. He is there, but not much involved.', 'Smith & Denton, Soul Searching'],
        1: ['“God does not need to be particularly involved in one’s life except when God is needed to resolve a problem.” He asks for nothing: no worship, no obedience, no repentance. He is fetched in an emergency and forgotten again when it passes.', 'Smith & Denton, Soul Searching'],
        2: ['God is on call, there to solve problems and help people feel better: “something like a combination Divine Butler and Cosmic Therapist,” as Smith and Denton put it. Such a God serves man’s wishes; he is not the Lord.', 'Smith & Denton, Soul Searching · Isa 45:9'],
        3: ['In heaven God is still at people’s service, the guarantor of their happiness: what they look forward to is not God but a good time. The psalmist wanted God himself: “Whom have I in heaven but you?”', 'Ps 73:25'],
      },
      world: {
        '*': ['The world is a pleasant place under God’s eye, where people try to get along and be happy, for “God wants people to be good, nice, and fair to each other.” Nothing in it is gravely wrong.', 'Smith & Denton, Soul Searching'],
        1: ['The world is stressful: life brings pressure, hurt and disappointment. These are felt as problems to be managed, not signs of a world under a curse.', ''],
        3: ['At death the good leave this world for a better one. Nothing is said of this world being judged or made new, though Scripture waits for “new heavens and a new earth in which righteousness dwells.”', '2 Pet 3:13'],
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
        1: ['What is wrong is unhappiness: stress, hurt feelings and low self-esteem. There is no sin against God, only feelings to be soothed. David knew better: “Against you, you only, have I sinned.”', 'Ps 51:4'],
        2: ['Unhappiness is soothed and nothing is forgiven, because nothing needed forgiving. H. Richard Niebuhr described such a faith long before: “A God without wrath brought men without sin into a kingdom without judgment through the ministrations of a Christ without a cross.”', 'Niebuhr, The Kingdom of God in America'],
      },
    },

    naturalism: {
      god: {
        '*': ['“The Cosmos is all that is or ever was or ever will be.” There is no God and no realm beyond nature: no spirits, no souls, no heaven. Only what science can in principle measure is real.', 'Sagan, Cosmos'],
        1: ['With no one above, suffering is no one’s doing: there is no one to blame, and no one to cry out to. The question “why?” has no one to answer it.', ''],
        2: ['There is no one to ask for help or wisdom; man has only his own mind and the methods of science to guide him.', ''],
        3: ['No one will remember any of it: when the last mind is gone, no one will know that anything happened at all. There is no God to hold the past in mind, so in the end it will be as though nothing had ever been.', ''],
      },
      world: {
        0: ['The cosmos is matter and energy, moving by blind physical law. It was not made, has no purpose and is going nowhere. The physicist Steven Weinberg: “The more the universe seems comprehensible, the more it also seems pointless.”', 'Weinberg, The First Three Minutes'],
        1: ['Pain, disease and death are not a fall from something better; they are how evolution works. Dawkins: the universe has “no design, no purpose, no evil and no good, nothing but blind, pitiless indifference.” Yet if there is no evil, suffering cannot be called wrong.', 'Dawkins, River Out of Eden'],
        2: ['Science studies the world, and technology puts it to use. Yet that the world can be understood at all is a fact naturalism cannot explain. Einstein: “The eternal mystery of the world is its comprehensibility.” Why should a mindless universe be so open to minds?', 'Einstein, Physics and Reality'],
        3: ['In time the stars burn out and the universe runs down. Russell: “all the labours of the ages, all the devotion, all the inspiration, all the noonday brightness of human genius, are destined to extinction in the vast death of the solar system.”', 'Russell, A Free Man’s Worship'],
      },
      bridge: {
        '*': ['A closed system: every event has a natural cause, and nothing from outside breaks in. Lewontin admitted the commitment comes first: “we cannot allow a Divine Foot in the door.” So miracles and revelation are ruled out before any evidence is heard.', 'Lewontin, Billions and Billions of Demons'],
        2: ['The system is still closed: no help can come from outside, and whatever man needs he must find or make within nature. Carl Sagan, looking at the earth from deep space: “there is no hint that help will come from elsewhere to save us from ourselves.”', 'Sagan, Pale Blue Dot'],
        3: ['History has no goal. Monod: “man knows at last that he is alone in the universe’s unfeeling immensity, out of which he emerged only by chance.”', 'Monod, Chance and Necessity'],
      },
      self: {
        0: ['Man is a complex animal, produced by unguided evolution. Francis Crick: “You, your joys and your sorrows, your memories and your ambitions… are in fact no more than the behavior of a vast assembly of nerve cells and their associated molecules.”', 'Crick, The Astonishing Hypothesis'],
        1: ['Man suffers and dies like every other living thing. Darwin wrote of “the clumsy, wasteful, blundering low and horridly cruel works of nature.” Yet man’s sense that this is wrong, that it ought not to be, is on this view only another product of nature.', 'Darwin, letter to J. D. Hooker, 1856'],
        2: ['If the mind is the product of blind processes aimed at survival, why trust it to find truth? Darwin felt it: “the horrid doubt always arises whether the convictions of man’s mind, which has been developed from the mind of the lower animals, are of any value or at all trustworthy.”', 'Darwin, letter to W. Graham, 1881'],
        3: ['Each person lives briefly and is gone for ever; his love, his work and his memory end with the chemistry that made them. Stephen Hawking: “There is no heaven or afterlife for broken-down computers; that is a fairy story for people afraid of the dark.”', 'Hawking, interview in The Guardian, 2011'],
      },
      sin: {
        1: ['Suffering is not a punishment or a sign of anything; no one meant it. Yet if no one meant it, there is no ground to call it evil, only unwelcome.', ''],
      },
    },

    humanism: {
      god: {
        '*': ['There is no God, so man must make what he can of himself and his world by reason and science. The Humanist Manifestos of 1933 and 1973 set this out: “No deity will save us; we must save ourselves.”', 'Humanist Manifesto II'],
        1: ['Religion is a story man tells in his childhood and outgrows as he learns. Freud called it “the universal obsessional neurosis of humanity”, and expected it to fade as science grew. Yet the wish for a father proves nothing about whether there is one.', 'Freud, The Future of an Illusion'],
        3: ['When mankind is gone, there will be no one to remember it: no God to keep its works, and no history to write them.', ''],
      },
      world: {
        '*': ['The cosmos is all there is, matter and nothing more: the first Humanist Manifesto regarded “the universe as self-existing and not created.” It was not made for us, but we can understand it and shape it to our good.', 'Humanist Manifesto I (1933)'],
        1: ['The universe is neither friendly nor hostile: it does not know we are here. Whatever good there is, man must bring.', ''],
        2: ['Nature tells us what is, not what ought to be: from facts alone no duty follows, as Hume saw. So where does the humanist’s “ought” come from?', 'Hume, A Treatise of Human Nature'],
        3: ['In the far future the sun will die and take mankind with it. Every achievement of progress will end in the same silence.', ''],
      },
      bridge: {
        2: ['Progress: by education, science and good laws, mankind can rise ever higher by its own effort. Condorcet held that “the perfectibility of man is truly indefinite.” The twentieth century, the most educated and scientific yet, was also the bloodiest.', 'Condorcet, Sketch for a Historical Picture of the Progress of the Human Mind'],
        3: ['If all ends in extinction, progress is a stair that leads nowhere. Hope that rests only on man’s effort runs out with man.', 'Eccl 1:2–4'],
      },
      self: {
        0: ['“Man is the measure of all things,” said Protagoras: he is of great worth, the most remarkable thing nature has produced. But if he is only matter shaped by chance, the worth humanism gives him is a borrowed belief, not a fact.', 'Protagoras · Gen 1:27'],
        1: ['Man is good at heart; what holds him back is ignorance, poverty, prejudice and religion. Remove these, and he will flourish.', ''],
        2: ['Man chooses his own values: “Ethics is autonomous and situational, needing no theological or ideological sanction,” says the second Humanist Manifesto. But values each man chooses for himself can bind no one else, and cannot condemn anyone who chooses otherwise.', 'Humanist Manifesto II (1973)'],
        3: ['“There is no credible evidence that life survives the death of the body.” Each person lives on only in his works and in others’ memory, and these too will fade. The humanist faces death with courage but without hope: a good life well remembered is the most there is.', 'Humanist Manifesto II · 1 Cor 15:19'],
      },
      sin: {
        1: ['What is wrong lies outside man: in superstition, ignorance and bad institutions. The heart itself needs no change, only better teaching.', 'Jer 17:9'],
      },
    },

    nihilism: {
      god: {
        '*': ['Nietzsche’s madman: “God is dead. God remains dead. And we have killed him… Who gave us the sponge to wipe away the entire horizon?” With no God, there is no purpose, meaning or value built into anything.', 'Nietzsche, The Gay Science 125'],
        1: ['There is no one to judge, so nothing is truly good or evil, and even condemning cruelty is only a preference. Nietzsche saw it plainly: “When one gives up the Christian faith, one pulls the right to Christian morality out from under one’s feet.”', 'Nietzsche, Twilight of the Idols'],
        2: ['There is no one to save, and nothing to be saved from. Salvation needs something wrong and someone able to put it right; nihilism has neither, so it can offer no remedy at all.', ''],
      },
      world: {
        '*': ['The cosmos is here for no reason: it means nothing, aims at nothing and values nothing. Macbeth’s verdict on life becomes the verdict on everything: “a tale told by an idiot, full of sound and fury, signifying nothing.”', 'Shakespeare, Macbeth V.5'],
        1: ['Nothing in the world is worth more than anything else. If no value exists, then neither does the value of truth, and nihilism cannot even call itself true.', ''],
      },
      bridge: {
        '*': ['“What does nihilism mean? That the highest values devaluate themselves. The aim is lacking; ‘why?’ finds no answer.” With nothing above, meaning drains away: there is nothing for it to rest on.', 'Nietzsche, The Will to Power 2 · Eccl 1:14'],
        2: ['There is no way out, because nothing is wrong to escape from, and nowhere better to go. Where there is no meaning, there can be neither a fall nor a rescue: only what happens.', ''],
        3: ['Everything runs off and is lost; nothing is kept, and nothing that was done will count. “Vanity of vanities,” says the Preacher, but he ends by looking to God; the nihilist ends where Ecclesiastes begins.', 'Eccl 12:13–14'],
      },
      self: {
        0: ['Man is an accident of matter. In Nietzsche’s fable, on a star in a remote corner of the universe “clever animals invented knowledge”; then the star cooled, “and the clever animals had to die.” His sense that his life should count is one more accident, pointing at nothing.', 'Nietzsche, On Truth and Lies in a Nonmoral Sense'],
        1: ['If the mind is an accident too, it cannot be trusted to know anything, including that nihilism is true. The view undermines its own ground.', ''],
        2: ['Man is hollow, with no reason to act one way rather than another: “We are the hollow men, we are the stuffed men,” wrote T. S. Eliot. Few people can live as though this were true; most borrow meaning they cannot justify.', 'Eliot, The Hollow Men'],
        3: ['When a man dies it makes no difference that he lived. Yet no one, not even the nihilist, can bring himself to believe that of the people he loves, for God “has put eternity into man’s heart.”', 'Eccl 3:11'],
      },
    },

    existentialism: {
      god: {
        '*': ['Sartre took Dostoevsky’s words as his own: “If God did not exist, everything would be permitted… that, for existentialism, is the starting point.” With no God to give man a nature or a purpose, man must give himself one.', 'Sartre, Existentialism Is a Humanism'],
        1: ['Man calls out for meaning, and no one answers. Camus began from there: “There is but one truly serious philosophical problem, and that is suicide.” He did not deny the longing; he denied anyone was there to meet it.', 'Camus, The Myth of Sisyphus'],
        2: ['No one stands over man to correct him: no law above his choices, and no judge of them. He answers only to himself. Yet even Sartre held that in choosing for himself, a man chooses for all mankind.', 'Sartre, Existentialism Is a Humanism'],
        3: ['No one keeps what a man made of himself: when he dies, it is lost. Sartre: “It is absurd that we are born; it is absurd that we die.”', 'Sartre, Being and Nothingness'],
      },
      world: {
        '*': ['The world is simply there: solid, silent and indifferent. Camus: “The absurd is born of this confrontation between the human need and the unreasonable silence of the world.”', 'Camus, The Myth of Sisyphus'],
        3: ['The world goes on unchanged when a man dies, as if he had never chosen anything. Camus’s condemned man, on the night before his execution: “I opened myself to the gentle indifference of the world.” The silence that met his questions in life meets his death too.', 'Camus, The Stranger'],
      },
      bridge: {
        '*': ['Meaning is not found but made, by one’s choices. Camus ends with Sisyphus, pushing his rock for ever: “One must imagine Sisyphus happy.” But meaning a man makes is only as large as he is, and it ends when he does.', 'Camus, The Myth of Sisyphus'],
        2: ['Any choice will do, if it is truly his own. To a student who asked his advice Sartre replied: “You are free, therefore choose, that is to say, invent.” But then nothing can be said against a cruel choice made authentically.', 'Sartre, Existentialism Is a Humanism'],
      },
      self: {
        0: ['“Existence comes before essence”: man first exists, then defines himself. There is no human nature given in advance, so no one can say what a man is for until he has chosen it.', 'Sartre, Existentialism Is a Humanism'],
        1: ['Man is free, and his freedom is a burden: he is anxious and alone, “condemned to be free”. No God, no nature and no tradition can choose for him, and every excuse is a lie.', 'Sartre, Being and Nothingness'],
        2: ['“Man is nothing else but what he makes of himself,” wrote Sartre: what a man chooses, he becomes. But a self made from nothing has nothing to measure itself against.', 'Sartre, Existentialism Is a Humanism'],
        3: ['Death ends the work of making oneself, and the project is left unfinished for ever. Sartre would not let it give life a meaning: death is “that which on principle removes all meaning from life.”', 'Sartre, Being and Nothingness'],
      },
      sin: {
        1: ['The one fault is “bad faith”: hiding from one’s freedom behind roles, rules or excuses. It is the existentialist’s sin, but it is a failure toward oneself, never toward God.', 'Sartre, Being and Nothingness'],
      },
    },

    postmodernism: {
      god: {
        '*': ['There is no God and no final truth above our words: no Word, only words. Lyotard described the postmodern as “incredulity toward metanarratives”.', 'Lyotard, The Postmodern Condition'],
        1: ['God is one more story, told by those who gain power from it: priests, kings, churches. Belief is unmasked as a means of control. Yet the unmasking is itself a claim to see things as they really are.', ''],
        2: ['Truth is not denied but made small: true for this group, in this place, for now. Christ claimed more: “I am the way, and the truth, and the life.”', 'John 14:6'],
      },
      world: {
        0: ['Reality is hidden behind our words; we never meet the world as it is, only as our language and culture shape it. Nietzsche, the movement’s forerunner: “facts is precisely what there is not, only interpretations.”', 'Nietzsche, notebooks (The Will to Power 481)'],
        1: ['Foucault: “Each society has its régime of truth”: what counts as true, normal or good is set by those with power. Yet Foucault wrote as though his own account were simply true.', 'Foucault, Truth and Power'],
        2: ['Reality is whatever a group agrees on. Rorty described truth as what our peers will “let us get away with saying.” But if truth is only agreement, nothing is left to appeal to when groups disagree, except power.', 'Rorty, Philosophy and the Mirror of Nature'],
        3: ['Reality is lost for good behind an endless play of signs. Baudrillard: “It is a question of substituting the signs of the real for the real.” Every sign points only to other signs, never to the thing itself. If so, this sentence too points to nothing.', 'Baudrillard, Simulacra and Simulation'],
      },
      bridge: {
        0: ['Language does not describe the world, it builds one. “There is nothing outside the text,” wrote Derrida. But this claim is itself offered as a true description of how things are.', 'Derrida, Of Grammatology'],
        1: ['Every grand story (Christianity, the Enlightenment, Marxism) is called a mask for power, told to silence others. Yet the claim that all stories serve power is itself a grand story.', ''],
        2: ['Deconstruction takes apart a text or tradition to expose what it hides. It spares only its own story: its own claims are never deconstructed.', 'Derrida, Of Grammatology'],
        3: ['Stories replace stories without end, and none of them is true; what works for now is all one can hope for. Christianity answers with a story told by the one who stands outside it, and who entered it.', ''],
      },
      self: {
        0: ['The self is not a soul or a nature, but a product of the stories told about it: by family, culture and language. There is no one underneath the stories, waiting to be found.', ''],
        1: ['Man is shaped, even made, by those in power and the categories they impose: sane and mad, normal and deviant. Foucault traced how prisons, clinics and schools made people what they are said to be, and turned Plato round: “the soul is the prison of the body.”', 'Foucault, Discipline and Punish'],
        2: ['Each person is free to tell his own story. But if no story is truer than another, telling his tells no one anything.', ''],
        3: ['In the end the self comes apart: a crossing-point of voices and roles, with no one at the centre. Foucault foresaw man “erased, like a face drawn in sand at the edge of the sea.” A self with no centre has no one to be saved, and no one to love.', 'Foucault, The Order of Things'],
      },
      sin: {
        1: ['Oppression is called wrong, and fiercely. Yet postmodernism has no standard by which anything is wrong, so its own outrage borrows the moral law it denies: the law “written on their hearts”.', 'Rom 2:14–15'],
        2: ['Oppression is named and fought, but with no standard above all groups to judge it; the judgment can only be one group’s power against another’s.', ''],
      },
    },

    marxism: {
      god: {
        0: ['Religion is “the opium of the people”: a comfort the oppressed take to dull their pain, which keeps them from changing their condition. Once society is just, it will no longer be needed.', 'Marx, Critique of Hegel’s Philosophy of Right'],
        1: ['Religion is “the sigh of the oppressed creature”: a real cry, but aimed at heaven instead of at those who exploit.', 'Marx, Critique of Hegel’s Philosophy of Right'],
        2: ['With no God, man must save himself, and the party will lead him there. Lenin held that “the working class, exclusively by its own effort, is able to develop only trade-union consciousness”: it needs a vanguard that knows what history requires, and answers to no one.', 'Lenin, What Is to Be Done?'],
        3: ['There is no judgement to come: the only judge is history, and those who serve it are justified, whatever they do. Castro ended his defence at his trial in 1953: “Condemn me. It does not matter. History will absolve me.”', 'Castro, History Will Absolve Me'],
      },
      world: {
        0: ['Matter is all there is, and history moves forward by conflict (dialectical materialism). How men make a living, the “economic base”, shapes everything else: law, morals, art and religion.', 'Marx & Engels, The Communist Manifesto'],
        1: ['“The history of all hitherto existing society is the history of class struggles”: owners against workers, those who hold the means of production against those with only their labour to sell.', 'Marx & Engels, The Communist Manifesto'],
        2: ['The workers’ state plans all production from the centre. Mises showed why it cannot work: “where there is no free market, there is no pricing mechanism; without a pricing mechanism, there is no economic calculation.”', 'Mises, Economic Calculation in the Socialist Commonwealth'],
        3: ['In the end the state withers away and a classless society emerges: “from each according to his ability, to each according to his needs.” It is heaven on earth, and always still to come.', 'Marx, Critique of the Gotha Programme'],
      },
      bridge: {
        0: ['“It is not the consciousness of men that determines their being, but their social being that determines their consciousness.” All ideas rest on the economic base. But then Marx’s own ideas are only the product of his class position, and no truer than any other.', 'Marx, Preface to A Contribution to the Critique of Political Economy'],
        1: ['Surplus value: profit is what the owner takes from the worker’s labour beyond his wage. “Capital is dead labour, that, vampire-like, only lives by sucking living labour.” But as Böhm-Bawerk showed, value comes from what people want, not from labour put in.', 'Marx, Capital I · Böhm-Bawerk, Karl Marx and the Close of His System'],
        2: ['“The philosophers have only interpreted the world, in various ways; the point is to change it.” Revolution is salvation: the workers seize power by force. Wherever it was tried, it brought not liberation but the gulag and the famine.', 'Marx, Theses on Feuerbach XI'],
      },
      self: {
        0: ['Man is not a soul made in God’s image but “the ensemble of the social relations”: what society and labour make him.', 'Marx, Theses on Feuerbach'],
        1: ['The worker is alienated, cut off from what he makes, from his work, from others and from himself: he “only feels himself outside his work, and in his work feels outside himself.” Marx saw a real ache, but traced it to property, not to man’s separation from God.', 'Marx, Economic and Philosophic Manuscripts of 1844'],
        2: ['Change the conditions and you change man: a “new man” will be made by the new society. Where it was tried, the new man had to be forced.', ''],
        3: ['Each generation is spent for a future it will never see, and the individual counts for nothing beside the cause.', ''],
      },
      sin: {
        1: ['Evil lies in the system, in private property and class, not in the human heart. “The theory of the Communists may be summed up in the single sentence: Abolition of private property.” Change the system, and evil goes.', 'Marx & Engels, The Communist Manifesto'],
        2: ['But evil was still there in the hearts of the new rulers. Solzhenitsyn, who survived their camps, wrote that “the line dividing good and evil cuts through the heart of every human being.”', 'Solzhenitsyn, The Gulag Archipelago'],
      },
    },

    individualism: {
      god: {
        '*': ['There is no authority above the self: not God, not nature, not tradition. Meaning is found by looking within. Robert Bellah’s Habits of the Heart named it: each person has “a unique core of feeling and intuition that should unfold or be expressed.”', 'Bellah et al., Habits of the Heart'],
        1: ['God, if he is kept at all, becomes one more rule to throw off, or a supporter of whatever the self has already chosen. A nurse in Habits of the Heart named her faith after herself: “It’s Sheilaism. Just my own little voice.”', 'Bellah et al., Habits of the Heart'],
        2: ['The self is its own judge, and no one may tell it it is wrong. Emerson: “Nothing is at last sacred but the integrity of your own mind.” But a judge who answers to no one cannot be appealed against, even by the self it wrongs.', 'Emerson, Self-Reliance'],
        3: ['No one is left to say who I am but me. Yet the self that names itself is never sure the name is true. The psalmist rested in being known: “O LORD, you have searched me and known me!”', 'Ps 139:1–4'],
      },
      world: {
        0: ['Society is a stage on which the self acts out who it is. Rousseau began his Confessions: “I am made unlike any one I have ever met… I may be no better, but at least I am different.”', 'Rousseau, Confessions'],
        1: ['Family, church and moral law are seen as walls that hem the self in, and to be free is to break out of them. Emerson: “Whoso would be a man, must be a nonconformist.”', 'Emerson, Self-Reliance'],
        2: ['Society is now required to affirm each self as it presents itself. The American Supreme Court put the creed in law: “At the heart of liberty is the right to define one’s own concept of existence, of meaning, of the universe, and of the mystery of human life.”', 'Planned Parenthood v. Casey (1992)'],
        3: ['The result is a crowd of selves, each alone, free of every bond and with no one bound to it either. Tocqueville foresaw it: each man thrown “back forever upon himself alone”, and confined at last “within the solitude of his own heart.”', 'Tocqueville, Democracy in America II.2.2'],
      },
      bridge: {
        2: ['Authenticity: to follow one’s heart, whatever others think. Charles Taylor describes it: “There is a certain way of being human that is my way.” But Scripture warns that “the heart is deceitful above all things.”', 'Taylor, The Ethics of Authenticity · Jer 17:9'],
      },
      self: {
        0: ['Each person has a true self within, found by looking inward: its feelings and desires are its truth. But feelings change, and contradict each other; they cannot all be true.', ''],
        1: ['The self feels held in by others’ rules: parents, churches, customs and moral codes that tell it who to be. What it truly is, it is not allowed to be, and so it feels false to itself.', ''],
        2: ['The self is its own maker: it decides what it is, and others must accept it. But a self made by choice can be unmade by the next one.', ''],
        3: ['The goal is to be fully oneself and feel fulfilled, and when the self dies, the story it told about itself ends with it. Jesus turned the goal round: “whoever loses his life for my sake and the gospel’s will save it.”', 'Mark 8:35'],
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
        2: ['Nature is being redesigned: genes edited, bodies repaired with new parts, minds linked to machines. But who decides what the redesign is for? C. S. Lewis warned that “Man’s power over Nature” turns out to be “a power exercised by some men over other men with Nature as its instrument.”', 'Lewis, The Abolition of Man'],
        3: ['In the end nature itself is wired over: Kurzweil foresees matter and energy “saturated” with intelligence, the universe waking up. The world becomes one great machine of thought, with no Maker but the minds that built it.', 'Kurzweil, The Singularity Is Near'],
      },
      bridge: {
        2: ['Technology is the way of salvation: upgrade by upgrade, man will rise above his limits. Julian Huxley coined the word: “man remaining man, but transcending himself, by realizing new possibilities of and for his human nature.”', 'Huxley, New Bottles for New Wine'],
        3: ['Uploading: a mind copied into a machine and run for as long as the hardware lasts. But a copy is not the one who was copied: the man still dies, and something else goes on.', ''],
      },
      self: {
        0: ['Man is a rough draft, not a finished work: the product of evolution, which we can now take into our own hands. Nietzsche’s Zarathustra said it first: “Man is something that shall be overcome.” Scripture says the opposite: man is made in God’s image, and is not an experiment.', 'Nietzsche, Thus Spoke Zarathustra · Gen 1:27'],
        1: ['Man is trapped in a failing body, limited by ageing, disease and death. Transhumanists call these not the fruit of a fall, nor part of a creature’s lot, but defects in the design that nature happened to give us.', ''],
        2: ['The posthuman, remade by his own hand: stronger, cleverer, longer-lived. But a man who remakes himself has still not changed his heart.', ''],
        3: ['The body is left behind as so much hardware. This is not new: it is the old gnostic contempt for flesh, which God made and called good, and which Christ rose in.', 'Luke 24:39'],
      },
      sin: {
        1: ['Death is not a wage for sin but a problem to solve. Harari: “death is not an inevitable destiny, but merely a technical problem… And every technical problem has a technical solution.” Scripture: “the wages of sin is death.”', 'Harari, Homo Deus · Rom 6:23'],
        2: ['Death is delayed, not defeated: lives lengthen, but every one still ends. Only one has come back from death never to die again: “Christ has been raised from the dead, the firstfruits of those who have fallen asleep.”', '1 Cor 15:20–26'],
      },
    },

    'new-age': {
      god: {
        '*': ['God is the Universe: an impersonal energy, a universal consciousness of which everything is part. Popular culture gave it a voice in Star Wars: the Force, “an energy field created by all living things.” Not a Person who speaks, loves or judges, but a force to be felt and tapped.', 'Star Wars (1977)'],
        1: ['An impersonal energy cannot be offended, so there is nothing to forgive and no one to forgive it. But it cannot love either: a force has no heart to set on anyone. Scripture’s God is no force: “God is love.”', '1 John 4:8'],
        2: ['The Universe is tapped, not worshipped: drawn on for health, wealth and peace by a method The Secret sums up as “Ask, Believe, Receive.” It answers to the right technique, like electricity, and asks for nothing back.', 'Byrne, The Secret'],
        3: ['The divine is reached by climbing, through spiritual growth over many lives, not received as a gift. Grace has no place where every soul must earn its own way up, but salvation is “not a result of works, so that no one may boast.”', 'Eph 2:8–9'],
      },
      world: {
        0: ['All is one: the cosmos and the self are one great whole, and the one is divine. The difference between Creator and creature is denied.', 'Rom 1:25'],
        1: ['Most people see only the surface of things, a world of separate objects and selves, and miss the oneness and divinity beneath. Blake’s line became a motto: “If the doors of perception were cleansed every thing would appear to man as it is, Infinite.”', 'Blake, The Marriage of Heaven and Hell'],
        2: ['The world is shaped by the mind: thoughts attract their like and create our reality. The Secret puts it simply: “Your current thoughts are creating your future life.” Then the sick and the poor have, in some sense, chosen their lot.', 'Byrne, The Secret'],
        3: ['A new age, the Age of Aquarius, is always about to dawn, when humanity will awaken together. A musical sang it in 1967, “This is the dawning of the Age of Aquarius”, and Marilyn Ferguson’s Aquarian Conspiracy (1980) announced it in earnest.', 'Hair · Ferguson, The Aquarian Conspiracy'],
      },
      bridge: {
        2: ['Cosmic consciousness: in meditation and altered states, the self is said to know its oneness with all. There, right and wrong dissolve into the One.', ''],
        3: ['Reincarnation: the soul returns life after life, learning, until it is pure. There is no Saviour, only the long climb, and no last judgement.', 'Heb 9:27'],
      },
      self: {
        0: ['In the depths of the self, each person is divine. Shirley MacLaine, the movement’s best-known voice, put it most plainly: “I am God.”', 'MacLaine, Out on a Limb'],
        1: ['The self has forgotten its own divinity and lives shut inside its ordinary mind. Eckhart Tolle’s teaching: “You are not your mind.”', 'Tolle, The Power of Now'],
        2: ['The awakened self creates its own reality by its thoughts and intentions: what it pictures and expects, the Universe brings. It is the self in the place of the Creator, of whom alone it is said, “he spoke, and it came to be.”', 'Ps 33:9'],
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
        0: ['The earth is the Goddess’s body, and so divine: all life shares in her. In the Charge of the Goddess she speaks as “the beauty of the green earth, and the white Moon among the stars.” Nature is not made by God; it is god.', 'Valiente, The Charge of the Goddess'],
        1: ['The earth is wounded by industry, cities and machines, which have cut people off from the cycles of nature. The neo-pagan revival grew in part as a protest against the modern, industrial world.', ''],
        2: ['The earth is served in place of its Maker, which Paul names precisely: they “worshipped and served the creature rather than the Creator.”', 'Rom 1:25'],
        3: ['The earth goes round for ever, always turning, never made new. Christ’s promise is not a cycle but a new beginning: “Behold, I am making all things new.”', 'Rev 21:5'],
      },
      bridge: {
        0: ['The wheel of the year: eight festivals (the solstices, the equinoxes and the four days between) turning with the seasons, for ever.', ''],
        2: ['Magic: power sought by will, ritual and the energies of nature. Crowley’s definition was widely taken up: “the Science and Art of causing Change to occur in conformity with Will.” It is power taken, not grace received.', 'Crowley, Magick in Theory and Practice · Deut 18:10–12'],
        3: ['The wheel turns round and round with no last day: no end to history, no judgement and no goal. Time is a circle, not a story going somewhere.', ''],
      },
      self: {
        0: ['Man is a child of the earth, one creature among many in the web of life, no higher than the rest. Scripture sets him apart, to “have dominion” over the earth for its Maker, and to answer to him for it.', 'Gen 1:28'],
        1: ['Man is cut off from the earth and its rhythms: the moon, the seasons, the land. The cure is to come home to nature, not to be reconciled to its Maker, the God “who through Christ reconciled us to himself.”', '2 Cor 5:18'],
        2: ['The pagan lives by the Wiccan Rede: “An it harm none, do what ye will.” But who decides what harms, and by what measure?', 'The Wiccan Rede'],
        3: ['At death the soul rests in the Summerland, a pleasant land of the dead, then is born again into another life, round and round with the wheel.', ''],
      },
      sin: {
        1: ['What is wrong is imbalance and disconnection, not sin against a holy God. Harm is real, but it is harm to nature and to others, never an offence against a lawgiver.', ''],
        2: ['Disconnection is healed by ritual, with nothing to forgive, because no one has been wronged but nature and oneself. Without a holy God, guilt has nowhere to go and no one to lift it.', ''],
      },
    },

    'hindu-monism': {
      god: {
        '*': ['Brahman: the one reality, without parts or qualities, beyond all names. “In the beginning this was Being alone, one only, without a second.” Advaita Vedanta, taught above all by Shankara, holds that it is all that truly is: not a Person who speaks or loves, but being, consciousness and bliss.', 'Chandogya Upanishad 6.2.1 · Shankara'],
        1: ['Brahman alone is real. Shankara’s summary: “Brahman is real, the world is false, and the self is nothing other than Brahman.”', 'Shankara, Brahmajnanavali'],
        2: ['Brahman is beyond good and evil, as beyond every pair of opposites: the Upanishad can say of it only “not this, not this.” Then evil has no final weight, and goodness no final claim: both belong to the dream.', 'Brihadaranyaka Upanishad 2.3.6 · Isa 5:20'],
        3: ['Brahman is all that there ever was: when the dream ends, nothing else remains, and nothing was ever truly other than it.', ''],
      },
      world: {
        0: ['The world is not made by Brahman but is Brahman, appearing in many forms: “All this is Brahman.” There is no Creator distinct from creation, and so no creature who could know and love him.', 'Chandogya Upanishad 3.14.1 · Rom 1:25'],
        1: ['The world of many things is maya, an appearance, like a rope mistaken in the dusk for a snake, Shankara’s own picture. But if all is illusion, whose illusion is it? Brahman cannot be ignorant, and there is no one else.', 'Shankara, Vivekachudamani'],
        2: ['Maya is seen through: the knower no longer takes the many for real, as one who sees the rope no longer fears the snake.', ''],
        3: ['Moksha is release from the wheel of rebirth. The Upanishad prays: “Lead me from the unreal to the real, from darkness to light, from death to immortality.”', 'Brihadaranyaka Upanishad 1.3.28'],
      },
      bridge: {
        1: ['Samsara is the wheel of birth, death and rebirth, driven by karma, the moral weight of one’s deeds. “Those whose conduct here has been good will quickly attain a good birth… but those whose conduct here has been evil will quickly attain an evil birth, the birth of a dog, a hog or an outcaste.”', 'Chandogya Upanishad 5.10.7 · Bhagavad Gita 2.22'],
        2: ['Release may take many lives: knowledge ripens slowly, through discipline, study and meditation under a teacher. The Gita offers other paths too: devotion and selfless action. But each depends on the seeker’s own effort.', 'Bhagavad Gita 4.39'],
      },
      self: {
        0: ['Atman, the true self, is not the body or the mind but pure consciousness: “This Self is Brahman.” The deepest self of each person is God.', 'Mandukya Upanishad 2'],
        1: ['The self believes it is a separate person with its own body, thoughts and life. This belief, not rebellion, is what binds it.', ''],
        2: ['The great saying of the Upanishads: “Tat tvam asi”, “You are that”: the self is Brahman. Then worship ends in identity, and there is no one left to love God.', 'Chandogya Upanishad 6.8.7'],
        3: ['In release the self is no longer separate. The Upanishad: “As rivers flowing into the ocean lose their name and form, so the knower… goes to the divine Person.” No one is left to enjoy it.', 'Mundaka Upanishad 3.2.8'],
      },
      sin: {
        1: ['Avidya, ignorance of what the self truly is, is the root of bondage: not sin against a holy God, but a mistake about reality.', ''],
        2: ['Ignorance is cleared by knowledge, not forgiven. Nothing needs pardon, because no one has been wronged; but then guilt, to which every “conscience also bears witness”, is only an illusion too.', 'Rom 2:15'],
      },
    },

    buddhism: {
      god: {
        '*': ['Buddhism has no creator. Gods may exist, but they too are born, die and are reborn, caught in the same wheel. No one made the world, and no one above can save from it.', ''],
        1: ['There is no one above to help: suffering must be understood and ended by each person’s own insight. “You yourselves must strive; the Buddhas only point the way.” The Buddha is a teacher, not a saviour who carries anyone along it.', 'Dhammapada 276'],
        2: ['No grace comes from outside. The Buddha told his disciples: “Be islands unto yourselves, be a refuge unto yourselves, seeking no external refuge.”', 'Mahaparinibbana Sutta (DN 16)'],
        3: ['In nirvana there is nothing above to meet: no God to see face to face, and no one to be welcomed home.', 'Rev 22:4'],
      },
      world: {
        0: ['Everything arises from causes and passes away; nothing has a lasting essence. “All conditioned things are impermanent”, said the Buddha. Even the world is a stream of events, not a creation.', 'Dhammapada 277'],
        1: ['Samsara: birth, death and birth again, without beginning, among gods, men, animals, hungry ghosts and the hells, as karma decides. In the Fire Sermon the Buddha declared that “all is burning”: the senses and the mind ablaze with craving, hatred and delusion.', 'Adittapariyaya Sutta (SN 35.28)'],
        3: ['Nirvana is the flame blown out: craving extinguished, and with it rebirth. “As a flame put out by the force of the wind goes out and can no longer be reckoned, so the sage released from name-and-body.” It is not a place, and not a union with God.', 'Sutta Nipata 1074'],
      },
      bridge: {
        1: ['Rebirth: the karma of one life shapes the next. Yet since there is no lasting self, no one passes from life to life. The monk Nagasena compared it to a lamp lit from another: the one reborn is “neither the same nor another”, a puzzle Buddhists have long debated.', 'Milindapanha'],
        2: ['The Noble Eightfold Path: right view, intention, speech, action, livelihood, effort, mindfulness and concentration. Each must walk it himself: “purity and impurity depend on oneself; no one can purify another.”', 'Dhammacakkappavattana Sutta · Dhammapada 165'],
      },
      self: {
        0: ['There is no soul (anatta). The self is five passing parts: body, feeling, perception, mental formations and consciousness. As Nagasena taught, “chariot” names its parts put together, not something more.', 'Milindapanha'],
        1: ['The self grasps at what cannot last, and so suffers. The first sermon: “birth is suffering, ageing is suffering, sickness is suffering, death is suffering.”', 'Dhammacakkappavattana Sutta'],
        2: ['The self works its own release by effort, discipline and meditation. The Buddha’s last words: “All conditioned things are subject to decay. Strive on with diligence.”', 'Mahaparinibbana Sutta (DN 16)'],
        3: ['Was anyone ever there? Asked whether the enlightened one exists after death, the Buddha would not answer. Christ promises his people not extinction but to be raised and known: “then I shall know fully, even as I have been fully known.”', 'Cula-Malunkyovada Sutta (MN 63) · 1 Cor 13:12'],
      },
      sin: {
        1: ['Craving (tanha) is the cause of suffering: “craving for sensual pleasures, craving for existence, craving for non-existence.” The problem is desire, not sin against God.', 'Dhammacakkappavattana Sutta'],
        2: ['Craving cools as the path is walked: desire is not redirected to its true good, but put out. Christianity does the opposite: “Delight yourself in the LORD, and he will give you the desires of your heart.”', 'Ps 37:4'],
      },
    },

    taoism: {
      god: {
        0: ['“The Tao that can be told is not the eternal Tao; the name that can be named is not the eternal name.” The Tao is the nameless source and way of all things, not a person.', 'Tao Te Ching 1'],
        1: ['The Tao does not take sides. Laozi: “Heaven and earth are not humane; they regard the ten thousand things as straw dogs.” The Way cares no more for the good than for the wicked.', 'Tao Te Ching 5'],
        2: ['The Tao is followed, but never met: “Man follows earth, earth follows heaven, heaven follows the Tao, and the Tao follows what is so of itself.” There is no one to pray to, love or thank, only a way to move with.', 'Tao Te Ching 25'],
        3: ['The Tao is unaware that a man has gone: it neither mourns nor welcomes him. It is the way things go, not one who knows and keeps those who have gone.', ''],
      },
      world: {
        0: ['“The Tao gave birth to one, one gave birth to two, two to three, and three to the ten thousand things.” All things arise from the interplay of yin and yang, forever turning.', 'Tao Te Ching 42'],
        1: ['The ten thousand things go on turning, whatever man does; trouble comes not from them but from his forcing. “The world is a sacred vessel that cannot be acted upon: whoever acts on it ruins it, whoever grasps it loses it.”', 'Tao Te Ching 29'],
        2: ['Light and dark, strong and weak, life and death: each needs the other, and neither is better. “When all the world knows the good as good, there arises the not-good.” Good and evil, too, become a pair in balance.', 'Tao Te Ching 2 · Isa 5:20'],
        3: ['The ten thousand things turn on without end: no beginning, no goal and no last day. Laozi: “Returning is the motion of the Tao.” All things come back to where they began.', 'Tao Te Ching 40'],
      },
      bridge: {
        2: ['Wu wei: effortless action, moving with the current rather than against it. Laozi: “The highest good is like water. Water benefits the ten thousand things and does not contend.”', 'Tao Te Ching 8'],
      },
      self: {
        0: ['Man is one thing among ten thousand, with no special place or calling. Zhuangzi dreamed he was a butterfly, and woke unsure: “I do not know whether I was Zhuang Zhou dreaming I was a butterfly, or a butterfly dreaming I am Zhuang Zhou.”', 'Zhuangzi 2'],
        1: ['Man pushes against the current: he grasps, plans and moralises, and falls out of step with the Way. Laozi: “The more laws and orders are made prominent, the more thieves and robbers there will be.”', 'Tao Te Ching 57'],
        2: ['Man yields like water. Laozi: “Nothing in the world is softer and weaker than water, yet for attacking the hard and strong nothing surpasses it.”', 'Tao Te Ching 78'],
        3: ['At death man is changed back into the Way. Found drumming on a bowl after his wife died, Zhuangzi explained that she had only changed again, “just like the progression of the four seasons, spring, summer, fall, winter.” There is nothing to mourn, and nothing to hope for.', 'Zhuangzi 18'],
      },
      sin: {
        1: ['The fault is forcing: grasping, scheming and making rules. Laozi: “When the great Way is abandoned, there arise humaneness and righteousness.” Even morality is a sign of decline.', 'Tao Te Ching 18'],
      },
    },

    confucianism: {
      god: {
        0: ['Heaven (tian) orders all things but does not speak. Confucius: “What does Heaven ever say? The four seasons run their course and the hundred things are born. What does Heaven ever say?”', 'Analects 17.19'],
        1: ['Heaven is silent still: it gives no law in words, no prophet, no promise. A ruler who loses virtue loses “the Mandate of Heaven”, but Heaven itself says nothing; it is read only in what happens.', 'Mencius 5A.5'],
        2: ['Heaven is read only in the order of things: in the seasons, in a just ruler, in the harmony of a well-run family.', ''],
        3: ['Asked about death, Confucius turned the question aside: “Not yet understanding life, how can you understand death?” On the greatest question of all, Heaven gives no word.', 'Analects 11.12'],
      },
      world: {
        0: ['All under Heaven is the family and the state, ordered as one. Confucius: “Let the ruler be a ruler, the minister a minister, the father a father, the son a son.”', 'Analects 12.11'],
        1: ['When people neglect their duties, all under Heaven falls out of order: rulers without virtue, sons without respect, a land without peace.', ''],
        2: ['Order returns when each keeps his place. Confucius: “He who governs by virtue is like the pole star, which keeps its place while all the stars turn toward it.”', 'Analects 2.1'],
        3: ['Order is handed down through the generations, in families and in rites. Filial piety binds the living to the dead, and the past to the present: “When parents are alive, serve them with propriety; when they die, bury them with propriety.”', 'Analects 2.5'],
      },
      bridge: {
        0: ['The five bonds, each with its own duty. Mencius: “between father and son, affection; between ruler and minister, righteousness; between husband and wife, attention to their separate functions; between old and young, a proper order; between friends, fidelity.” Harmony comes when each is kept.', 'Mencius 3A.4'],
        1: ['The bonds loosen when duties are neglected, and the whole order with them. Confucius’s disciple Youzi called respect for parents and elder brothers “the root of humaneness”: a son who dishonours his father loosens the bond that holds society together.', 'Analects 1.2'],
        2: ['Ritual (li): right conduct, practised daily until it becomes second nature. Confucius: “To restrain oneself and return to ritual is humaneness.”', 'Analects 12.1'],
        3: ['The ancestors are honoured by the living with offerings and rites. Confucius kept them, but would not speak of what lies beyond: “Not yet able to serve men, how can you serve the spirits?”', 'Analects 11.12'],
      },
      self: {
        0: ['Man is good by nature, if cultivated. Mencius: “Human nature is good, just as water flows downward.” But Xunzi, the other great Confucian teacher, held the opposite: that human nature is bad.', 'Mencius 6A.2 · Xunzi 23'],
        1: ['Man out of his place brings disorder: duty neglected, the bonds strained. Confucius: “The gentleman understands what is right; the petty man understands what is profitable.”', 'Analects 4.16'],
        2: ['The gentleman (junzi) perfects himself by study, ritual and reflection, and his example spreads: “from the Son of Heaven down to the common people, all must consider the cultivation of the person the root.” He is made good by his own effort, with no need of grace.', 'The Great Learning'],
        3: ['Man lives on in the remembrance of his descendants, while the rites continue: “Attend carefully to the funerals of parents, and follow them when long gone with sacrifices,” taught Zengzi. Confucianism has little to say of anything beyond.', 'Analects 1.9'],
      },
      sin: {
        1: ['The fault is neglect of duty: a breach of order between people, not an offence against God. It is set right between people, by restoring proper conduct; Heaven is not a party to be reconciled.', 'Ps 51:4'],
        2: ['Neglect is mended by study, ritual and self-cultivation, not forgiven. Where the fault lies in the heart, cultivation cannot reach it; God promises more: “I will give you a new heart, and a new spirit I will put within you.”', 'Ezek 36:26'],
      },
    },

    animism: {
      god: {
        0: ['Far above the spirits there is a High God, the creator, but he has withdrawn from daily life and is seldom called on. Scholars of religion call him the deus otiosus, the idle God.', 'Eliade, Patterns in Comparative Religion'],
        1: ['The High God is too far away to help; daily life is dealt with through the nearer spirits. So the one who made all things is the one least turned to: “although they knew God, they did not honor him as God or give thanks to him.”', 'Rom 1:21'],
        2: ['The High God is still not called on. Paul says the unknown God has drawn near: “he is actually not far from each one of us.”', 'Acts 17:27'],
        3: ['The High God is still far off; even death does not bring him closer. The dead go to the ancestors, not to God.', ''],
      },
      world: {
        0: ['The world is alive with spirits: in rivers, trees, animals, places and the dead. John Mbiti wrote that “Africans are notoriously religious”: religion runs through every part of life.', 'Mbiti, African Religions and Philosophy'],
        1: ['When spirits are offended, the world turns against man: sickness, drought and misfortune follow. Nothing happens by chance; every misfortune has someone behind it, and the question is always who.', 'Evans-Pritchard, Witchcraft, Oracles and Magic among the Azande'],
        2: ['Balance is restored for now, until the next offence; peace with the spirits is always temporary, a truce to be renewed. Christ ended the bargaining: he “disarmed the rulers and authorities and put them to open shame, by triumphing over them.”', 'Col 2:15'],
        3: ['The spirits remain, and the dead join them; the world stays full of unseen powers. The living must keep feeding and honouring the dead, or bear their anger.', ''],
      },
      bridge: {
        2: ['Sacrifice is given to buy peace with an angry spirit. It is a bargain, renewed each time. Christ’s sacrifice was offered “once for all”.', 'Heb 10:10–12'],
      },
      self: {
        0: ['Man is one life among many spirits, and must live carefully among them: honouring the right ones, keeping the taboos, and not giving offence. Life is a web of obligations to unseen powers.', ''],
        1: ['Man lives in fear of what he cannot see: witchcraft, curses and angry spirits. Christ came to free “those who through fear of death were subject to lifelong slavery.”', 'Heb 2:15'],
        2: ['Man bargains for safety with sacrifices and charms. There is no promise, only the hope that the bargain holds.', ''],
        3: ['At death a person becomes an ancestor. Mbiti called the recently dead the “living-dead”: they live on while they are remembered by name, then fade into anonymity.', 'Mbiti, African Religions and Philosophy'],
      },
      sin: {
        1: ['Offence: a taboo broken, a spirit angered. It is a breach of balance with the powers, not sin against a holy God.', ''],
        2: ['The offence is appeased, not forgiven: the spirit is quieted, but the relationship stays one of fear. “There is no fear in love, but perfect love casts out fear.”', '1 John 4:18'],
      },
    },

    zoroastrianism: {
      god: {
        0: ['Ahura Mazda, the Wise Lord, dwells in light and is wholly good: “the region of light is the place of Auharmazd, which they call ‘endless light’.” Below him the Hostile Spirit waits “in darkness, with backward understanding and desire for destruction”.', 'Bundahishn 1.2–3 (tr. West)'],
        1: ['The Wise Lord is not yet the victor. He set a time on the war, because “if I do not grant a period of contest, then it will be possible for him to act so that he may be able to cause the seduction of my creatures to himself.” The God of the Bible makes no terms with evil. Of the Persian king Cyrus he says: “I form light and create darkness… I am the LORD, who does all these things.”', 'Bundahishn 1.17 · Isa 45:1, 7'],
        2: ['Zarathustra came to know the Wise Lord by asking him: “who, as a skilful artisan, hath made the lights and the darkness?” In his own hymn the night is God’s work as much as the day; the later books gave the darkness to his enemy.', 'Yasna 44.5 (tr. Mills)'],
        3: ['At the end the Wise Lord wins, and “brings the land of hell back for the enlargement of the world.” But a God who must wait nine thousand years to win was never Lord of all. “The LORD has established his throne in the heavens, and his kingdom rules over all.”', 'Bundahishn 30.32 · Ps 103:19'],
      },
      world: {
        0: ['The world is good, made by the Wise Lord to fight evil in. Before birth the guardian spirits of men were asked whether they would “contend in a bodily form with the fiend,” and they agreed to go. Here Zoroastrians are right that matter is good: “God saw everything that he had made, and behold, it was very good.”', 'Bundahishn 2.10–11 · Gen 1:31'],
        1: ['The Hostile Spirit “sprang, like a snake, out of the sky down to the earth… just like a fly, he rushed out upon the whole creation.” Since then good and evil have been mixed in everything.', 'Bundahishn 3.11–14 (tr. West)'],
        2: ['The world is a battlefield, kept pure by fire, water and rites. A corpse is the worst defilement, so the dead were laid out in towers for the birds. Jesus put defilement in the heart instead: “the things that come out of a person are what defile him.”', 'Vendidad 3, 5–8 · Mark 7:15'],
        3: ['All is made wonderful, and “the world is immortal for ever and everlasting.” Christians hope for a new earth too, made new by God, not won back from a rival: “Behold, I am making all things new.”', 'Bundahishn 30.32 · Rev 21:5'],
      },
      bridge: {
        0: ['Asha is truth and right order, the way things ought to be; its enemy is druj, the Lie. The prayer said most often begins: “Holiness is the best of all good.” Scripture roots right order in God himself, not in a principle beside him: “The Rock, his work is perfect, for all his ways are justice.”', 'Ashem Vohu (tr. Darmesteter) · Deut 32:4'],
        1: ['The assault struck each creation in turn: the sky, water, earth, plants, the first ox, the first man and fire. Yet the Wise Lord had set its limit before it began: “he knew that by appointing this period the evil spirit would be undone.”', 'Bundahishn 1.18; 3'],
        2: ['At death the soul comes to the Chinvat Bridge, over hell. A maiden meets the righteous soul: “above the Kinvad bridge she places it in the presence of the heavenly gods themselves.” For the wicked the bridge narrows to a thread, and they fall. Christ does not wait at the far end of a bridge; he is the way across: “No one comes to the Father except through me.”', 'Vendidad 19.30 (tr. Darmesteter) · John 14:6'],
        3: ['The Saoshyant, the last saviour, is born at the end of time to a maiden, from Zarathustra’s seed, which the angels “in time will blend… with a mother.” He is a man who helps, not God who saves. Wise men from the east, magi, the title of Persian priests, came to worship the child Jesus.', 'Bundahishn 32.8 · Matt 2:1–11'],
      },
      self: {
        0: ['Man is the Wise Lord’s ally. His guardian spirit, his fravashi, chose this life before birth: the fravashis of men “became of the same opinion with the omniscient wisdom about going to the world.”', 'Bundahishn 2.11 (tr. West)'],
        1: ['Man is born pure, and evil comes at him from outside. Scripture finds it within: “Behold, I was brought forth in iniquity, and in sin did my mother conceive me.”', 'Ps 51:5'],
        2: ['The faithful promise three things when they are first tied with the sacred cord: good thoughts, good words, good deeds. The winged Faravahar about him is read today as the fravashi, his guardian spirit, with three rows of feathers for the three. The reading is modern; what the Persian kings meant by it is not known.', 'Achaemenid reliefs, Persepolis'],
        3: ['All are raised, and ask one another, “hast thou been righteous or wicked?” Then “all men will pass into that melted metal and will become pure.” If the wicked are made pure anyway, the weighing at the bridge settled little. Jesus spoke of two ends: “these will go away into eternal punishment, but the righteous into eternal life.”', 'Bundahishn 30.20–21 · Matt 25:46'],
      },
      sin: {
        0: ['The two spirits are twins: “a better thing, they two, and a worse, as to thought, as to word, and as to deed.” If good and evil are equally old, nothing stands above them to say which is good. Many Parsis today hold that evil was never God’s equal. Scripture: “God is light, and in him is no darkness at all.”', 'Yasna 30.3 (tr. Mills) · 1 John 1:5'],
        1: ['The Lie came at man from outside. The first couple “exclaimed that the evil spirit created the water and earth,” and “through that false speech they both became wicked.” Yet even the later books give the Hostile Spirit no body of his own: he can only spoil what God made. That is near the Christian answer, that evil is a parasite on the good.', 'Bundahishn 15.8–9 (tr. West)'],
        2: ['Deeds are weighed in Rashnu’s golden scales. Arda Viraf was told that “every one whose good works are three Srosho-charanams more than his sin is for heaven.” But no one can tip those scales: “If you, O LORD, should mark iniquities, O Lord, who could stand?” The Christian hope is forgiveness, not a surplus: “by grace you have been saved through faith… not a result of works.”', 'Arda Viraf 6 (tr. West) · Ps 130:3 · Eph 2:8–9'],
      },
    },

    platonism: {
      god: {
        0: ['The Good: the highest of the Forms, source of the being and truth of all things. Plato calls it “beyond being, exceeding it in dignity and power”. It is the source of all, but not a person.', 'Plato, Republic 509b'],
        1: ['The Good shines, but those in the cave see only the shadows its light makes. Even for the freed, “in the world of knowledge the idea of good appears last of all, and is seen only with an effort.”', 'Plato, Republic 517b'],
        2: ['The Good waits to be reached by the soul’s ascent; it does not come down. The God of the Bible does: “the Word became flesh and dwelt among us.”', 'John 1:14'],
        3: ['The Good is seen at last, but it cannot love. Plotinus called the end of the journey “the flight of the alone to the Alone”.', 'Plotinus, Enneads VI.9.11'],
      },
      world: {
        0: ['The world of becoming is a copy of the eternal Forms, always changing. In the Timaeus, time is “a moving image of eternity”.', 'Plato, Timaeus 37d'],
        1: ['The cave: prisoners chained so that they see only shadows on the wall, and for them “the truth would be literally nothing but the shadows of the images.” Freed and led into the sunlight, one is at first dazzled; back in the cave, the others would kill him.', 'Plato, Republic 514a–517a'],
        2: ['The world is seen through at last, for what it is: a shadow of the real. The philosopher turns away from it, but Plato bids him return to lead others out: “each of you, when his turn comes, must go down.”', 'Plato, Republic 519d–520c'],
        3: ['After death every soul is judged. The unpurified are born again: in the Phaedo the gluttonous “pass into asses”. The worst never return at all: the incurable “are hurled into Tartarus, which is their suitable destiny, and they never come out.”', 'Plato, Phaedo 81e–82a; 113e · Gorgias 523–526'],
      },
      bridge: {
        0: ['The Forms: perfect, eternal patterns of which things here are copies, known by the mind, not the senses. “Is there such a thing as absolute justice?” asks Socrates; “Assuredly there is.” Yet the Forms are truth without a speaker: perfect ideas, with no mind whose ideas they are.', 'Plato, Phaedo 65d'],
        1: ['The soul knew the Forms before birth, but has forgotten them in the body. In the Phaedrus, souls recall a time “when with the rest of the happy band they saw beauty shining in brightness,” before they fell to earth.', 'Plato, Phaedrus 249e–250c'],
        2: ['The ascent: by reason and discipline the soul climbs from shadows to the Forms. Plato’s ladder in the Symposium rises from one beautiful body to “beauty itself”. It is for the few, not the many.', 'Plato, Symposium 211'],
        3: ['The purified soul leaves the body for ever, to dwell with the divine. Christianity hopes instead for the body raised and glorified: “It is sown a natural body; it is raised a spiritual body.”', '1 Cor 15:42–44'],
      },
      self: {
        0: ['Man is an immortal soul housed in a body. The soul is the real person, “in the very likeness of the divine, and immortal, and intellectual”; the body is a temporary dwelling, and often a hindrance.', 'Plato, Phaedo 80a'],
        1: ['The soul is imprisoned in the body. Socrates recalls a sage’s saying “that we are now dead, and that the body (soma) is our tomb (sema).”', 'Plato, Gorgias 493a'],
        2: ['The philosopher recalls what his soul once knew: “learning is recollection”. Socrates said those who rightly practise philosophy “practise nothing else but dying and death”.', 'Plato, Meno 81d · Phaedo 64a'],
        3: ['The body is left behind like a tomb. Scripture calls the body God’s good work, and more: “do you not know that your body is a temple of the Holy Spirit within you?”', '1 Cor 6:19'],
      },
      sin: {
        1: ['What is wrong is ignorance, forgetting the Forms, not rebellion against a holy God. Socrates: “no man voluntarily pursues evil, or that which he thinks to be evil.” To know the good is to do it.', 'Plato, Protagoras 358c–d'],
        2: ['Ignorance is cured by knowledge. But knowing the good is not doing it: “I do not do the good I want.”', 'Rom 7:19'],
      },
    },

    gnosticism: {
      god: {
        '*': ['The true God, the unknown Father, dwells far above in the Fullness (pleroma), beyond all knowing, untouched by this world. He did not make it.', 'Apocryphon of John'],
        3: ['The true God is reached at last, but still unknown: the gnostic is saved by knowing about God, not by being known and loved by him. Paul put the weight the other way: “now that you have come to know God, or rather to be known by God.”', 'Gal 4:9'],
      },
      world: {
        0: ['The world is matter, made by mistake: a power of the Fullness, Sophia, fell, and from her error came a lesser god who made this world. The Gospel of Philip: “The world came about through a mistake.” Creation is a catastrophe, not a gift.', 'Apocryphon of John · Gospel of Philip 75'],
        1: ['The world is a prison, ruled by the maker’s powers (archons), who keep the sparks of light asleep in their bodies. The Gospel of Thomas: “Whoever has come to understand the world has found only a corpse.”', 'Gospel of Thomas 56'],
        2: ['The world is not worth saving: salvation is escape from it, not its renewal. Paul says the opposite: “the creation itself will be set free from its bondage to corruption.”', 'Rom 8:21'],
        3: ['In the end all matter is burned up, never made new, and with it those who have no spark. Irenaeus reports that the Valentinians divided men into three kinds, spiritual, animal and material, and that the material “must of necessity perish”. God says instead: “Behold, I am making all things new.”', 'Irenaeus, Against Heresies I.6.1; I.7.5 · Rev 21:5'],
      },
      bridge: {
        0: ['The maker, Yaldabaoth, is a lesser god, ignorant of the Fullness above him. In the Apocryphon of John he boasts: “I am a jealous God, and there is no other God beside me”, turning the God of Israel into the villain.', 'Apocryphon of John · Isa 45:5'],
        1: ['The maker is a jailer, not a Father: he and his rulers hold the spirit captive in matter, keeping it drunk with forgetfulness. Creation, birth and the body are all part of the prison.', 'Apocryphon of John'],
        2: ['The Revealer comes down in disguise and only seems to have a body, so does not truly die. John answers: “every spirit that does not confess that Jesus Christ has come in the flesh is not from God.”', '1 John 4:2–3'],
        3: ['The spark goes home past the gatekeepers, giving them the secret words. The gnostic teacher Theodotus: what frees is “the knowledge of who we were, and what we have become; where we were, and whither we have been thrown”.', 'Clement, Excerpts from Theodotus 78'],
      },
      self: {
        0: ['Man is a spark of the true God trapped in clay: spirit, of divine origin, inside a body made by the lesser god. The Jesus of Thomas marvels “at how this great wealth has made its home in this poverty.”', 'Apocryphon of John · Gospel of Thomas 29'],
        1: ['The spark is asleep in the body, forgetting where it came from. The Gospel of Thomas: “When you know yourselves, then you will be known.”', 'Gospel of Thomas 3'],
        2: ['The awakened few are saved by knowing, not by grace: only those with the spark can wake. Irenaeus reported their boast that they are saved “not by means of conduct, but because they are spiritual by nature.”', 'Irenaeus, Against Heresies I.6.2'],
        3: ['The body is thrown off for good, as worthless, a garment of clay. Christ rose in his body (“a spirit does not have flesh and bones as you see that I have”), and will raise ours.', 'Luke 24:39 · Phil 3:21'],
      },
      sin: {
        1: ['The trouble is matter, not the will: evil lies in the stuff of the world, so no one is to blame, and there is nothing to forgive. Jesus put it in the heart: “out of the heart of man, come evil thoughts.”', 'Mark 7:21–23'],
        2: ['Matter is escaped, never forgiven. Sin is left untouched, because it was never seen as sin: a man may lose his body and keep his pride. “If we say we have no sin, we deceive ourselves, and the truth is not in us.”', '1 John 1:8–9'],
      },
    },
  },

  es: {
    christian: {
      god: {
        '*': ['Un solo Dios en tres personas, cada una plenamente Dios y las tres un solo Dios: Jesús mandó bautizar “en el nombre del Padre, y del Hijo, y del Espíritu Santo”, un solo nombre y tres personas. No necesita nada, lo hizo todo y lo gobierna todo, y es personal: habla, ama y juzga.', 'Dt 6:4 · Mt 28:19'],
      },
      world: {
        0: ['“En el principio creó Dios los cielos y la tierra”: de la nada, no de sí mismo. El mundo es real, ordenado y bueno, obra de sus manos, no una ilusión ni un accidente. Por eso puede estudiarse, disfrutarse y cuidarse.', 'Gn 1:1, 31'],
        1: ['El mundo sigue siendo buena obra de Dios, pero pesa sobre él la maldición que siguió al pecado del hombre: “maldita será la tierra por tu causa.” Con ella vinieron espinos, fatiga, corrupción y muerte, y desde entonces “toda la creación gime”, esperando ser libertada.', 'Gn 3:17–19 · Ro 8:20–22'],
        2: ['“De tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna”; y “el que no cree, ya ha sido condenado”. Lo que el pecado arruinó, Cristo lo está restaurando: en su pueblo ahora, y al fin en toda la creación.', 'Jn 3:16–18 · Ro 8:21'],
        3: ['No un mundo desechado, sino un mundo hecho nuevo: “He aquí, yo hago nuevas todas las cosas.” Sin maldición, sin lágrimas, sin muerte, y Dios mismo morando con su pueblo. Pero no todos entran: “no entrará en ella ninguna cosa inmunda”, “sino solamente los que están inscritos en el libro de la vida del Cordero”.', 'Ap 21:1–5, 27'],
      },
      bridge: {
        0: ['Desde el principio Dios habló al hombre y se comprometió con él por pacto, con mandamientos, promesas y su propia compañía. El hombre conoce a Dios porque Dios se da a conocer: “muchas veces y de muchas maneras en otro tiempo a los padres por los profetas”.', 'Gn 2:16–17 · He 1:1–2'],
        1: ['El hombre quebrantó el pacto con Dios, y la comunión se volvió temor: Adán se escondió entre los árboles. La distancia es moral, no de lugar. Pero el anhelo permanece, como oró Agustín: “Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti.”', 'Gn 3:8–10 · Agustín, Confesiones I.1'],
        2: ['El Hijo eterno se hizo carne, una sola persona plenamente Dios y plenamente hombre: “hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre.” No solo enseñó el camino de vuelta: cargó él mismo con la pena del pecado y resucitó.', '1 Ti 2:5 · 2 Co 5:21'],
        3: ['Lo perdido en el Edén se devuelve, y más: “y verán su rostro.” La fe da paso a la vista, y nada volverá a interponerse entre Dios y su pueblo.', 'Ap 22:4 · 1 Jn 3:2'],
      },
      self: {
        0: ['El hombre está hecho a imagen de Dios: personal, racional y moral, creado para conocer a Dios y gobernar la tierra bajo él. Su valor viene de su Hacedor, no de su utilidad. “El fin principal del hombre es glorificar a Dios y gozar de él para siempre.”', 'Gn 1:26–27 · Catecismo Menor de Westminster, P. 1'],
        1: ['El hombre aún lleva la imagen de Dios, pero el pecado ha torcido todo su ser: mente, voluntad y afectos. No es solo débil o ignorante, sino que está “muerto en sus delitos y pecados”: un rebelde que no puede salvarse a sí mismo.', 'Ro 3:10–12 · Ef 2:1–3'],
        2: ['“Por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.” El creyente es perdonado, declarado justo y hecho nuevo. El que no quiere venir sigue como estaba: “el que rehúsa creer en el Hijo no verá la vida, sino que la ira de Dios está sobre él.”', 'Ef 2:8–10 · Jn 3:36'],
        3: ['Resucitados en el cuerpo y perfeccionados en santidad, los redimidos viven con Dios para siempre, al fin ellos mismos como debían ser. Todos los muertos resucitan, pero no todos para vida: “irán éstos al castigo eterno, y los justos a la vida eterna.”', 'Mt 25:46 · 1 Co 15:42–44'],
      },
      sin: {
        1: ['El pecado no es ante todo un error ni una enfermedad, sino rebelión: el hombre rechaza el gobierno de Dios para ser, como prometió la serpiente, “como Dios”. “La paga del pecado es muerte”, y todos desde Adán nacen bajo ella.', 'Gn 3:5 · Ro 5:12; 6:23'],
        2: ['El pecado no se pasa por alto ni se excusa: se paga. “Mas él herido fue por nuestras rebeliones, molido por nuestros pecados.” Cristo cargó con toda su pena en lugar de su pueblo, para que Dios sea “el justo, y el que justifica” al que cree.', 'Is 53:5–6 · Ro 3:25–26'],
      },
    },

    judaism: {
      god: {
        '*': ['“Oye, Israel: el SEÑOR nuestro Dios, el SEÑOR uno es.” El Dios de Abraham, Isaac y Jacob: santo, justo y misericordioso, Hacedor de todo, que actúa en la historia. El judío dice el Shemá mañana y tarde. No tiene imagen, ni asociado, ni encarnación.', 'Dt 6:4–5 · Éx 34:6–7'],
      },
      world: {
        '*': ['Dios hizo bueno el mundo y lo dio al hombre para que lo cuidara. No es para huir de él, sino para disfrutarlo y santificarlo. Antes del pan, el judío dice: “Bendito eres tú, Señor nuestro Dios, Rey del universo, que sacas el pan de la tierra.”', 'Gn 1:31; 2:15 · la bendición del pan'],
        1: ['La tierra fue un don de Dios, y su pérdida, primero ante Babilonia y luego ante Roma, se lee como fruto de los pecados de Israel: “Junto a los ríos de Babilonia, allí nos sentábamos, y aun llorábamos, acordándonos de Sion.” El exilio fue el marco de la vida judía durante casi dos mil años.', 'Dt 28:63–64 · Sal 137:1'],
        2: ['Cada parte de la vida queda santificada por un mandamiento: lo que se come, cuándo se descansa, cómo se negocia, qué se dice sobre el pan. “Santos seréis, porque santo soy yo Jehová vuestro Dios”: el mundo se santifica guardando en él la ley de Dios.', 'Lv 19:2'],
        3: ['El mundo venidero, cuando los desterrados sean reunidos, el templo reconstruido y “la tierra será llena del conocimiento de Jehová, como las aguas cubren el mar”. Antes, los impíos son juzgados en el Guehinom; los rabinos enseñaron que también los justos de las naciones tienen parte. Muchos detalles los dejaron abiertos.', 'Is 11:9 · Tosefta Sanedrín 13:2'],
      },
      bridge: {
        0: ['Dios se obligó con Abraham por juramento: una tierra, una descendencia incontable y la promesa de que “serán benditas en ti todas las familias de la tierra”. En el Sinaí el pacto se dio a sus hijos como pueblo.', 'Gn 12:1–3; 15:17–18'],
        1: ['Los profetas acusan a Israel de quebrantar el pacto, pero Dios no lo desecha. Jeremías prometió un nuevo pacto, en que los pecados no se recordarán más: “Daré mi ley en su mente, y la escribiré en su corazón.” Es una promesa que el judaísmo aún espera.', 'Jer 31:31–34'],
        2: ['“Moisés recibió la Torá en el Sinaí y la transmitió a Josué”, y así hasta los rabinos: el judaísmo sostiene que Dios dio una ley escrita y otra oral, fijada luego en la Mishná y el Talmud. La Escritura no conoce una segunda ley, y Jesús reprendió las tradiciones que dejaban de lado la palabra de Dios.', 'Avot 1:1 · Mr 7:8–13'],
        3: ['“Creo con fe completa en la venida del Mesías; y aunque se demore, esperaré cada día su venida.” Así dice el duodécimo principio de Maimónides. Pero Daniel y Hageo sitúan la venida del Mesías cuando el segundo templo aún estaba en pie, y cayó en el año 70.', 'Maimónides, Trece principios · Dn 9:26 · Hag 2:9'],
      },
      self: {
        0: ['El hombre está hecho a imagen de Dios, y toda vida tiene gran valor. Israel fue escogido no por su grandeza (“no por ser vosotros más que todos los pueblos os ha querido Jehová y os ha escogido”), sino para ser un pueblo santo y luz de las naciones.', 'Gn 1:27 · Dt 7:6–8'],
        1: ['El hombre no nace culpable ni corrompido. Tiene dos inclinaciones, una buena y otra mala, y es libre de dominar la mala por el estudio y la obediencia. La Escritura habla con más gravedad: “el intento del corazón del hombre es malo desde su juventud.”', 'Gn 4:7; 8:21 · Sal 51:5'],
        2: ['Cuando un judío peca, vuelve a Dios (teshuvá) por el pesar, la confesión y una vida cambiada, sobre todo en el Día de la Expiación: “Vuelve, oh Israel, a Jehová tu Dios.” Dios recibe al arrepentido, pero el sacrificio que la Ley señalaba ya no existe.', 'Os 14:1–2'],
        3: ['“Creo con fe perfecta que habrá resurrección de los muertos.” Pero no todos resucitan para lo mismo: “unos para vida eterna, y otros para vergüenza y confusión perpetua”. La Misná enseña que “todo Israel tiene parte en el mundo venidero”, y luego nombra a quienes no la tienen, empezando por quien niega la resurrección.', 'Maimónides, Trece principios · Dn 12:2 · Sanedrín 10:1'],
      },
      sin: {
        1: ['El pecado es un acto malo, no una naturaleza caída. La mala inclinación es un impulso que hay que domar, y la Torá su remedio. El Talmud pone en boca de Dios: “Yo creé la mala inclinación, y creé la Torá como su antídoto.” Pero un impulso que se doma no necesita un salvador.', 'Kidushín 30b · Gn 8:21'],
        2: ['Sin el templo no hay altar. Cuando cayó, Yohanán ben Zakai consoló a su discípulo: “Tenemos otra expiación tan eficaz como esta: las obras de misericordia.” La oración, el arrepentimiento y la caridad ocuparon el lugar de las ofrendas. Pero la Ley enseñaba que “la misma sangre hará expiación”.', 'Avot de Rabí Natán 4 · Lv 17:11'],
      },
    },

    islam: {
      god: {
        '*': ['“Di: Él es Dios, Uno, Dios el Eterno. No ha engendrado ni ha sido engendrado, y no hay nadie igual a él.” Alá es absolutamente uno, misericordioso y todopoderoso, del todo por encima de su creación. Confesar su unicidad (tawhid) es el corazón del islam.', 'Corán 112'],
        1: ['“Dios no perdona que se le asocie a nadie, pero perdona lo que es menos que eso a quien quiere.” A ojos del Corán, este shirk incluye llamar a Jesús Hijo de Dios, y la Trinidad misma.', 'Corán 4:48; 5:73'],
        2: ['Dios revela su voluntad, en la ley y los profetas, pero no a sí mismo: “no es propio de ningún mortal que Dios le hable sino por inspiración, o detrás de un velo, o enviándole un mensajero.” Se le conoce por sus nombres y mandatos, no se le encuentra como persona que viene al hombre.', 'Corán 42:51'],
        3: ['De los noventa y nueve nombres de Dios en el islam, ninguno es Padre. El creyente es siervo de Dios, nunca su hijo; el clamor “¡Abba, Padre!” no tiene lugar en el islam.', 'Corán 19:93 · Ro 8:15'],
      },
      world: {
        0: ['Dios hizo el mundo con su orden, “¡Sé!”, y fue. Es real y bueno, creado para el hombre, y cada parte de él es una señal que apunta a su Hacedor.', 'Corán 36:82'],
        1: ['La creación está llena de signos (ayat) de Dios: “en la tierra hay signos para los que tienen certeza, y en vosotros mismos. ¿Es que no veis?” Pero los hombres pasan de largo, distraídos.', 'Corán 51:20–21 · Ro 1:20'],
        2: ['La ley de Dios (sharía), sacada del Corán y del ejemplo de Mahoma, ha de gobernar toda la vida: el culto, la familia, el comercio, el delito y el Estado por igual. “Te hemos puesto en un camino claro (sharía) en el asunto: síguelo.”', 'Corán 45:18'],
        3: ['El paraíso es un jardín de ríos, sombra, frutos y compañía, para quienes Dios admite. La enseñanza suní tiene la visión de Dios por su mayor gozo: “ese día habrá rostros resplandecientes, que mirarán a su Señor.” Pero aun allí él es Señor y Juez, nunca Padre.', 'Corán 47:15; 75:22–23'],
      },
      bridge: {
        2: ['Los musulmanes sostienen que el Corán es la palabra misma de Dios, revelada a Mahoma por medio de Gabriel: su palabra final. Niega la cruz sin rodeos: “no lo mataron ni lo crucificaron, sino que así se les hizo parecer.” Entre Dios y el hombre ofrece un libro que obedecer, sin mediador y sin expiación.', 'Corán 4:157; 42:51'],
        3: ['En el Último Día se pesan las obras de cada uno: la balanza pesada lleva al Jardín, la ligera al Fuego. Aun Mahoma dijo: “Las obras de ninguno de vosotros lo harán entrar en el Paraíso… ni siquiera a mí, si Dios no me cubre con su misericordia.”', 'Corán 101:6–9 · Bujari 6467'],
      },
      self: {
        0: ['El hombre es el representante (jalifa) de Dios, a quien se confía la tierra: “Voy a poner en la tierra un representante.” Y Mahoma enseñó que “todo niño nace en la fitra”, una disposición natural a conocer a Dios y someterse a él.', 'Corán 2:30; 30:30 · Bujari 1385'],
        1: ['Adán pecó y se arrepintió, y Dios “aceptó su arrepentimiento”, así que no se hereda culpa alguna. El hombre nace puro, pero “el hombre fue creado débil” y olvidadizo: necesita que se le recuerde, no un corazón nuevo.', 'Corán 2:37; 4:28'],
        2: ['“El islam está edificado sobre cinco”: confesar que no hay dios sino Dios y que Mahoma es su mensajero, la oración cinco veces al día, la limosna, la peregrinación y el ayuno de Ramadán. Si el musulmán se salva sigue dependiendo de la voluntad de Dios.', 'Bujari 8 · Corán 2:177'],
        3: ['Espera que sus buenas obras pesen más que las malas y que Dios sea misericordioso, pero nadie puede estar seguro. El evangelio ofrece una certeza que el islam no puede: “para que sepáis que tenéis vida eterna.”', '1 Jn 5:13'],
      },
      sin: {
        1: ['El hombre se extravía porque olvida a Dios. Del mismo Adán dice el Corán: “olvidó, y no encontramos en él firmeza.” El remedio es el recuerdo (dikr) y la guía de los mensajeros de Dios, no el rescate de una naturaleza pecadora.', 'Corán 20:115'],
        2: ['Dios perdona a quien quiere, cuando se arrepiente. No hace falta sacrificio, porque “nadie cargará con la carga ajena”. Pero entonces la justicia de Dios se deja de lado en vez de satisfacerse.', 'Corán 6:164 · Ro 3:26'],
      },
    },

    deism: {
      god: {
        '*': ['Un ser supremo, conocido por la razón a partir del orden de la naturaleza, que hizo el mundo y lo dejó funcionar con sus propias leyes. No se revela, no hace milagros ni responde la oración. Voltaire, Paine y muchos de la Ilustración creyeron en un Dios así.', 'Paine, La edad de la razón'],
        2: ['A Dios solo se le conoce por inferencia, a partir del diseño del mundo, como al relojero por el reloj. Voltaire sostenía que “si Dios no existiera, habría que inventarlo.” Pero un Dios conocido solo como conclusión es una hipótesis, no alguien a quien amar o en quien confiar.', 'Voltaire, Epístola al autor de los Tres impostores'],
        3: ['Dios está más lejos que nunca: si nunca habla, nada puede saberse de lo que piensa de nosotros, ni de lo que viene tras la muerte.', 'He 1:1–2'],
      },
      world: {
        '*': ['El mundo es una inmensa máquina de leyes fijas que ningún milagro quebranta: un reloj al que su Hacedor dio cuerda una vez. Newton había escrito que “este elegantísimo sistema del sol, los planetas y los cometas solo pudo proceder del consejo y dominio de un Ser inteligente y poderoso”.', 'Newton, Principia, Escolio general'],
        1: ['Alexander Pope escribió que “todo lo que es, está bien”: el mundo es tan bueno como puede ser, y el mal solo lo parece desde donde estamos. Entonces nada está realmente mal, y nada necesita arreglo.', 'Pope, Ensayo sobre el hombre'],
        2: ['La naturaleza es la única escritura del hombre: “La Palabra de Dios es la creación que contemplamos”, escribió Paine. De sus leyes aprende el hombre que Dios existe y cuál es su deber: una “religión natural” que no necesita revelación.', 'Paine, La edad de la razón · Tindal, El cristianismo, tan antiguo como la creación'],
        3: ['La máquina sigue funcionando, sin fin a la vista ni día de rendir cuentas, porque su Hacedor no ha dicho nada de ninguno de los dos.', ''],
      },
      bridge: {
        '*': ['El deísmo niega que Dios haya hablado: ni profetas, ni milagros, ni escritura, ni encarnación. “Mi propia mente es mi propia iglesia”, escribió Thomas Paine. Pero si Dios no ha hablado, su mente y su voluntad nos quedan cerradas.', 'Paine, La edad de la razón · He 1:1–2'],
        2: ['El hombre sube hacia Dios solo con la razón. La razón es un don de Dios, pero según la Biblia está oscurecida por el pecado, y los hombres “se envanecieron en sus razonamientos”.', 'Ro 1:21'],
        3: ['Dios no ha prometido nada: ni perdón, ni resurrección, ni vida venidera. Herbert de Cherbury, padre del deísmo inglés, aún contaba “el premio o el castigo después de esta vida” entre los artículos de la religión natural; pero la razón puede intuir un juicio sin saber cómo librarse de él.', 'Herbert de Cherbury, De Veritate'],
      },
      self: {
        '*': ['El hombre es un ser racional, capaz de descubrir por la luz de la naturaleza que Dios existe y qué es lo recto; no necesita revelación ni redentor. Jefferson aconsejó a su sobrino: “Asienta firmemente a la razón en su trono, y cita ante su tribunal todo hecho, toda opinión.”', 'Jefferson, carta a Peter Carr, 1787'],
        1: ['Lo que frena al hombre no es un corazón pecador, sino la superstición y los sacerdotes que lo mantienen a oscuras. Paine llamó a las iglesias “invenciones humanas, establecidas para aterrorizar y esclavizar a la humanidad, y monopolizar el poder y el lucro”. Enséñese al hombre, y obrará bien.', 'Paine, La edad de la razón'],
        3: ['Paine esperaba “la felicidad más allá de esta vida”, y Franklin creía que el alma “será tratada con justicia en otra vida según su conducta en esta”. La mayoría de los deístas esperaban premio y castigo. Pero un Dios que nada ha prometido no da fundamento a la esperanza, ni modo de escapar al temor.', 'Paine, La edad de la razón · Franklin, carta a Ezra Stiles, 1790'],
      },
      sin: {
        1: ['El deísmo no tiene caída: el mal viene de la ignorancia y la superstición, y el remedio es la educación y la razón. Pero los más ilustrados no son por eso los mejores, porque “engañoso es el corazón más que todas las cosas, y perverso”.', 'Jer 17:9'],
      },
    },

    mtd: {
      god: {
        '*': ['“Existe un Dios que creó y ordena el mundo y vela por la vida humana en la tierra”: el primer artículo de la fe que los sociólogos Christian Smith y Melinda Denton hallaron en muchos jóvenes estadounidenses, a menudo dentro de las iglesias. Está ahí, pero apenas interviene.', 'Smith y Denton, Soul Searching'],
        1: ['“Dios no necesita intervenir particularmente en la vida de uno, salvo cuando se le necesita para resolver un problema.” No pide nada: ni culto, ni obediencia, ni arrepentimiento. Se le llama en una emergencia y se le olvida cuando pasa.', 'Smith y Denton, Soul Searching'],
        2: ['Dios está de guardia, para resolver problemas y ayudar a sentirse mejor: “algo así como una combinación de Mayordomo Divino y Terapeuta Cósmico”, en palabras de Smith y Denton. Un Dios así sirve a los deseos del hombre; no es el Señor.', 'Smith y Denton, Soul Searching · Is 45:9'],
        3: ['En el cielo Dios sigue al servicio de la gente, garante de su felicidad: lo que esperan no es a Dios, sino pasarlo bien. El salmista quería a Dios mismo: “¿A quién tengo yo en los cielos sino a ti?”', 'Sal 73:25'],
      },
      world: {
        '*': ['El mundo es un lugar agradable bajo la mirada de Dios, donde la gente procura llevarse bien y ser feliz, porque “Dios quiere que las personas sean buenas, amables y justas unas con otras”. Nada en él está gravemente mal.', 'Smith y Denton, Soul Searching'],
        1: ['El mundo es estresante: la vida trae presión, heridas y decepciones. Se viven como problemas que gestionar, no como señales de un mundo bajo maldición.', ''],
        3: ['Al morir, los buenos dejan este mundo por otro mejor. Nada se dice de que este mundo sea juzgado o hecho nuevo, aunque la Escritura espera “cielos nuevos y tierra nueva, en los cuales mora la justicia”.', '2 P 3:13'],
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
        1: ['Lo que anda mal es la infelicidad: el estrés, los sentimientos heridos y la baja autoestima. No hay pecado contra Dios, solo sentimientos que calmar. David sabía más: “Contra ti, contra ti solo he pecado.”', 'Sal 51:4'],
        2: ['La infelicidad se calma y nada se perdona, porque nada necesitaba perdón. H. Richard Niebuhr describió esa fe mucho antes: “Un Dios sin ira llevó a hombres sin pecado a un reino sin juicio mediante el ministerio de un Cristo sin cruz.”', 'Niebuhr, El reino de Dios en América'],
      },
    },

    naturalism: {
      god: {
        '*': ['“El cosmos es todo lo que es, lo que fue y lo que será.” No hay Dios ni ámbito alguno más allá de la naturaleza: ni espíritus, ni almas, ni cielo. Solo es real lo que la ciencia podría en principio medir.', 'Sagan, Cosmos'],
        1: ['Sin nadie arriba, el sufrimiento no es obra de nadie: no hay a quién culpar ni a quién clamar. La pregunta “¿por qué?” no tiene quien la responda.', ''],
        2: ['No hay nadie a quien pedir ayuda o sabiduría; el hombre solo tiene su propia mente y los métodos de la ciencia para guiarse.', ''],
        3: ['Nadie lo recordará: cuando se apague la última mente, nadie sabrá que algo ocurrió. No hay Dios que guarde el pasado en su memoria, así que al final será como si nada hubiera existido nunca.', ''],
      },
      world: {
        0: ['El cosmos es materia y energía que se mueven por leyes físicas ciegas. No fue hecho, no tiene propósito y no va a ninguna parte. El físico Steven Weinberg: “Cuanto más comprensible parece el universo, más sin sentido parece también.”', 'Weinberg, Los tres primeros minutos del universo'],
        1: ['El dolor, la enfermedad y la muerte no son una caída desde algo mejor: son el modo en que obra la evolución. Dawkins: el universo no tiene “ningún diseño, ningún propósito, ni mal ni bien, nada más que una indiferencia ciega y despiadada.” Pero si no hay mal, el sufrimiento no puede llamarse malo.', 'Dawkins, El río del Edén'],
        2: ['La ciencia estudia el mundo, y la técnica lo aprovecha. Pero que el mundo pueda entenderse es un hecho que el naturalismo no puede explicar. Einstein: “El eterno misterio del mundo es su comprensibilidad.” ¿Por qué un universo sin mente habría de estar tan abierto a las mentes?', 'Einstein, Física y realidad'],
        3: ['Con el tiempo las estrellas se apagan y el universo se agota. Russell: “todos los trabajos de los siglos, toda la devoción, toda la inspiración, todo el brillo meridiano del genio humano, están destinados a extinguirse en la vasta muerte del sistema solar.”', 'Russell, El culto del hombre libre'],
      },
      bridge: {
        '*': ['Un sistema cerrado: todo suceso tiene una causa natural, y nada de fuera irrumpe. Lewontin admitió que el compromiso va primero: “no podemos permitir que un Pie Divino cruce la puerta.” Así los milagros y la revelación quedan descartados antes de oír prueba alguna.', 'Lewontin, Billions and Billions of Demons'],
        2: ['El sistema sigue cerrado: ninguna ayuda puede venir de fuera, y lo que el hombre necesite ha de hallarlo o hacerlo dentro de la naturaleza. Carl Sagan, mirando la tierra desde el espacio: “no hay indicio de que vaya a llegar ayuda de otra parte para salvarnos de nosotros mismos.”', 'Sagan, Un punto azul pálido'],
        3: ['La historia no tiene meta. Monod: “el hombre sabe al fin que está solo en la inmensidad indiferente del universo, de donde ha surgido por azar.”', 'Monod, El azar y la necesidad'],
      },
      self: {
        0: ['El hombre es un animal complejo, producto de una evolución sin guía. Francis Crick: “Tú, tus alegrías y tus penas, tus recuerdos y tus ambiciones… no sois de hecho más que el comportamiento de un vasto conjunto de células nerviosas y sus moléculas asociadas.”', 'Crick, La búsqueda científica del alma'],
        1: ['El hombre sufre y muere como todo ser vivo. Darwin escribió de “las torpes, derrochadoras, chapuceras, bajas y horriblemente crueles obras de la naturaleza”. Pero la impresión del hombre de que eso está mal, de que no debería ser así, es según esta visión solo otro producto de la naturaleza.', 'Darwin, carta a J. D. Hooker, 1856'],
        2: ['Si la mente es producto de procesos ciegos orientados a sobrevivir, ¿por qué confiar en que halle la verdad? Darwin lo sintió: “siempre surge la horrible duda de si las convicciones de la mente del hombre, desarrollada a partir de la de los animales inferiores, tienen algún valor o son en absoluto fiables.”', 'Darwin, carta a W. Graham, 1881'],
        3: ['Cada persona vive un poco y desaparece para siempre; su amor, su obra y su memoria acaban con la química que los produjo. Stephen Hawking: “No hay cielo ni vida después de la muerte para las computadoras averiadas; eso es un cuento de hadas para quienes temen a la oscuridad.”', 'Hawking, entrevista en The Guardian, 2011'],
      },
      sin: {
        1: ['El sufrimiento no es castigo ni señal de nada; nadie lo quiso. Pero si nadie lo quiso, no hay base para llamarlo malo, solo indeseado.', ''],
      },
    },

    humanism: {
      god: {
        '*': ['No hay Dios, así que el hombre debe hacer lo que pueda de sí mismo y de su mundo con la razón y la ciencia. Los Manifiestos Humanistas de 1933 y 1973 lo expusieron: “Ninguna deidad nos salvará; debemos salvarnos nosotros mismos.”', 'Manifiesto Humanista II'],
        1: ['La religión es un relato que el hombre cuenta en su infancia y abandona a medida que aprende. Freud la llamó “la neurosis obsesiva universal de la humanidad”, y esperaba que se desvaneciera al crecer la ciencia. Pero el deseo de un padre no prueba nada sobre si lo hay.', 'Freud, El porvenir de una ilusión'],
        3: ['Cuando la humanidad desaparezca, no habrá nadie que la recuerde: ningún Dios que guarde sus obras, ni historia que las escriba.', ''],
      },
      world: {
        '*': ['El cosmos es todo lo que hay, materia y nada más: el primer Manifiesto Humanista consideraba “el universo como existente por sí mismo y no creado”. No fue hecho para nosotros, pero podemos entenderlo y darle forma para nuestro bien.', 'Manifiesto Humanista I (1933)'],
        1: ['El universo no es amigo ni enemigo: no sabe que estamos aquí. El bien que haya, ha de traerlo el hombre.', ''],
        2: ['La naturaleza nos dice lo que es, no lo que debe ser: de los hechos solos no se sigue ningún deber, como vio Hume. ¿De dónde sale entonces el “debes” del humanista?', 'Hume, Tratado de la naturaleza humana'],
        3: ['En un futuro lejano el sol morirá y se llevará consigo a la humanidad. Todo logro del progreso acabará en el mismo silencio.', ''],
      },
      bridge: {
        2: ['El progreso: por la educación, la ciencia y las buenas leyes, la humanidad puede elevarse cada vez más por su propio esfuerzo. Condorcet sostuvo que “la perfectibilidad del hombre es realmente indefinida”. El siglo XX, el más instruido y científico hasta entonces, fue también el más sangriento.', 'Condorcet, Bosquejo de un cuadro histórico de los progresos del espíritu humano'],
        3: ['Si todo acaba en la extinción, el progreso es una escalera que no lleva a ninguna parte. La esperanza que descansa solo en el esfuerzo del hombre se agota con el hombre.', 'Ec 1:2–4'],
      },
      self: {
        0: ['“El hombre es la medida de todas las cosas”, dijo Protágoras: tiene gran valor, es lo más notable que ha producido la naturaleza. Pero si solo es materia moldeada por el azar, el valor que el humanismo le da es una creencia prestada, no un hecho.', 'Protágoras · Gn 1:27'],
        1: ['El hombre es bueno en el fondo; lo que lo frena es la ignorancia, la pobreza, el prejuicio y la religión. Quítense, y florecerá.', ''],
        2: ['El hombre elige sus propios valores: “La ética es autónoma y situacional, y no necesita sanción teológica ni ideológica”, dice el segundo Manifiesto Humanista. Pero los valores que cada uno elige para sí no obligan a nadie más, ni pueden condenar a quien elija otros.', 'Manifiesto Humanista II (1973)'],
        3: ['“No hay pruebas creíbles de que la vida sobreviva a la muerte del cuerpo.” Cada persona sigue viviendo solo en sus obras y en la memoria de otros, y también eso se borrará. El humanista afronta la muerte con valor, pero sin esperanza: una vida buena bien recordada es lo más que hay.', 'Manifiesto Humanista II · 1 Co 15:19'],
      },
      sin: {
        1: ['El mal está fuera del hombre: en la superstición, la ignorancia y las malas instituciones. El corazón no necesita cambiar, solo mejor enseñanza.', 'Jer 17:9'],
      },
    },

    nihilism: {
      god: {
        '*': ['El loco de Nietzsche: “Dios ha muerto. Dios sigue muerto. Y nosotros lo hemos matado… ¿Quién nos dio la esponja para borrar el horizonte entero?” Sin Dios no hay propósito, sentido ni valor inscritos en nada.', 'Nietzsche, La gaya ciencia 125'],
        1: ['No hay nadie que juzgue, así que nada es de verdad bueno ni malo, y aun condenar la crueldad es solo una preferencia. Nietzsche lo vio con claridad: “Cuando se abandona la fe cristiana, se retira de debajo de los pies el derecho a la moral cristiana.”', 'Nietzsche, El ocaso de los ídolos'],
        2: ['No hay nadie que salve, ni nada de qué ser salvado. La salvación necesita algo que esté mal y alguien capaz de arreglarlo; el nihilismo no tiene ninguna de las dos cosas, así que no puede ofrecer remedio alguno.', ''],
      },
      world: {
        '*': ['El cosmos está aquí sin razón alguna: no significa nada, no apunta a nada y no valora nada. El veredicto de Macbeth sobre la vida se vuelve el veredicto sobre todo: “un cuento contado por un idiota, lleno de ruido y furia, que nada significa.”', 'Shakespeare, Macbeth V.5'],
        1: ['Nada en el mundo vale más que otra cosa. Si no existe ningún valor, tampoco el de la verdad, y el nihilismo ni siquiera puede llamarse verdadero.', ''],
      },
      bridge: {
        '*': ['“¿Qué significa nihilismo? Que los valores supremos se desvalorizan. Falta la meta; falta la respuesta al ‘¿por qué?’.” Sin nada arriba, el sentido se escurre: no hay nada en que apoyarlo.', 'Nietzsche, La voluntad de poder 2 · Ec 1:14'],
        2: ['No hay salida, porque nada está mal de qué escapar, ni lugar mejor adonde ir. Donde no hay sentido, no puede haber caída ni rescate: solo lo que ocurre.', ''],
        3: ['Todo se escurre y se pierde; nada se guarda, y nada de lo hecho contará. “Vanidad de vanidades”, dice el Predicador, pero termina mirando a Dios; el nihilista acaba donde Eclesiastés empieza.', 'Ec 12:13–14'],
      },
      self: {
        0: ['El hombre es un accidente de la materia. En la fábula de Nietzsche, en un astro de un rincón apartado del universo “unos animales inteligentes inventaron el conocimiento”; luego el astro se enfrió, “y los animales inteligentes tuvieron que morir”. Su anhelo de que su vida cuente es otro accidente, que no apunta a nada.', 'Nietzsche, Sobre verdad y mentira en sentido extramoral'],
        1: ['Si la mente también es un accidente, no se puede confiar en que sepa nada, ni siquiera que el nihilismo es verdad. La postura socava su propio fundamento.', ''],
        2: ['El hombre está hueco, sin razón para obrar de un modo y no de otro: “Somos los hombres huecos, somos los hombres rellenos de paja”, escribió T. S. Eliot. Pocos pueden vivir como si eso fuera cierto; la mayoría toma prestado un sentido que no puede justificar.', 'Eliot, Los hombres huecos'],
        3: ['Cuando un hombre muere, no importa que haya vivido. Pero nadie, ni siquiera el nihilista, logra creer eso de los que ama, porque Dios “ha puesto eternidad en el corazón de ellos”.', 'Ecl 3:11'],
      },
    },

    existentialism: {
      god: {
        '*': ['Sartre hizo suyas las palabras de Dostoievski: “Si Dios no existiera, todo estaría permitido… ese es el punto de partida del existencialismo.” Sin Dios que le dé una naturaleza o un propósito, el hombre debe dárselos a sí mismo.', 'Sartre, El existencialismo es un humanismo'],
        1: ['El hombre clama por sentido, y nadie responde. Camus partió de ahí: “No hay más que un problema filosófico verdaderamente serio: el suicidio.” No negó el anhelo; negó que hubiera alguien para colmarlo.', 'Camus, El mito de Sísifo'],
        2: ['Nadie está por encima del hombre para corregirlo: ni ley sobre sus elecciones, ni juez de ellas. Solo responde ante sí mismo. Pero aun Sartre sostuvo que al elegir para sí, el hombre elige para toda la humanidad.', 'Sartre, El existencialismo es un humanismo'],
        3: ['Nadie guarda lo que un hombre hizo de sí mismo: cuando muere, se pierde. Sartre: “Es absurdo que hayamos nacido; es absurdo que muramos.”', 'Sartre, El ser y la nada'],
      },
      world: {
        '*': ['El mundo simplemente está: sólido, callado e indiferente. Camus: “Lo absurdo nace de esta confrontación entre el llamado humano y el silencio irrazonable del mundo.”', 'Camus, El mito de Sísifo'],
        3: ['El mundo sigue igual cuando un hombre muere, como si nunca hubiera elegido nada. El condenado de Camus, la noche antes de su ejecución: “me abría por primera vez a la tierna indiferencia del mundo.” El silencio que respondió a sus preguntas en vida responde también a su muerte.', 'Camus, El extranjero'],
      },
      bridge: {
        '*': ['El sentido no se encuentra, se hace, con las propias elecciones. Camus termina con Sísifo, empujando su roca para siempre: “Hay que imaginarse a Sísifo feliz.” Pero un sentido hecho por el hombre es solo tan grande como él, y acaba cuando él acaba.', 'Camus, El mito de Sísifo'],
        2: ['Cualquier elección vale, si es de verdad suya. A un alumno que le pidió consejo, Sartre respondió: “Eres libre, elige, es decir, inventa.” Pero entonces nada puede decirse contra una elección cruel hecha con autenticidad.', 'Sartre, El existencialismo es un humanismo'],
      },
      self: {
        0: ['“La existencia precede a la esencia”: el hombre primero existe y luego se define. No hay naturaleza humana dada de antemano, así que nadie puede decir para qué es un hombre hasta que él lo elija.', 'Sartre, El existencialismo es un humanismo'],
        1: ['El hombre es libre, y su libertad es una carga: está angustiado y solo, “condenado a ser libre”. Ni Dios, ni la naturaleza, ni la tradición pueden elegir por él, y toda excusa es una mentira.', 'Sartre, El ser y la nada'],
        2: ['“El hombre no es otra cosa que lo que él se hace”, escribió Sartre: lo que elige, eso llega a ser. Pero un yo hecho de la nada no tiene nada con que medirse.', 'Sartre, El existencialismo es un humanismo'],
        3: ['La muerte pone fin a la tarea de hacerse a sí mismo, y el proyecto queda inacabado para siempre. Sartre no le concedía dar sentido a la vida: la muerte es “lo que, por principio, quita a la vida toda significación”.', 'Sartre, El ser y la nada'],
      },
      sin: {
        1: ['La única falta es la “mala fe”: esconderse de la propia libertad tras papeles, normas o excusas. Es el pecado del existencialista, pero una falta contra uno mismo, nunca contra Dios.', 'Sartre, El ser y la nada'],
      },
    },

    postmodernism: {
      god: {
        '*': ['No hay Dios ni verdad final por encima de nuestras palabras: ningún Verbo, solo palabras. Lyotard definió lo posmoderno como “la incredulidad ante los metarrelatos”.', 'Lyotard, La condición posmoderna'],
        1: ['Dios es un relato más, contado por quienes ganan poder con él: sacerdotes, reyes, iglesias. La fe queda desenmascarada como medio de control. Pero desenmascarar es ya pretender ver las cosas como de verdad son.', ''],
        2: ['La verdad no se niega, se empequeñece: verdad para este grupo, en este lugar, por ahora. Cristo afirmó más: “Yo soy el camino, y la verdad, y la vida.”', 'Jn 14:6'],
      },
      world: {
        0: ['La realidad está oculta tras nuestras palabras; nunca encontramos el mundo tal como es, solo como lo moldean nuestra lengua y cultura. Nietzsche, el precursor: “precisamente hechos no hay, solo interpretaciones.”', 'Nietzsche, fragmentos póstumos (La voluntad de poder 481)'],
        1: ['Foucault: “Cada sociedad tiene su régimen de verdad”: lo que cuenta como verdadero, normal o bueno lo fijan quienes tienen el poder. Pero Foucault escribía como si su propio relato fuera simplemente verdadero.', 'Foucault, Verdad y poder'],
        2: ['La realidad es lo que un grupo acuerde. Rorty describió la verdad como lo que nuestros pares “nos dejan decir sin objeción”. Pero si la verdad es solo acuerdo, cuando los grupos discrepan no queda nada a qué apelar, salvo el poder.', 'Rorty, La filosofía y el espejo de la naturaleza'],
        3: ['La realidad se pierde para siempre tras un juego interminable de signos. Baudrillard: “Se trata de sustituir lo real por los signos de lo real.” Cada signo remite solo a otros signos, nunca a la cosa misma. Si así fuera, también esta frase remite a nada.', 'Baudrillard, Cultura y simulacro'],
      },
      bridge: {
        0: ['El lenguaje no describe el mundo: lo construye. “No hay nada fuera del texto”, escribió Derrida. Pero esta afirmación se ofrece ella misma como una descripción verdadera de cómo son las cosas.', 'Derrida, De la gramatología'],
        1: ['Todo gran relato (el cristianismo, la Ilustración, el marxismo) se llama máscara del poder, contado para acallar a otros. Pero afirmar que todo relato sirve al poder es también un gran relato.', ''],
        2: ['La deconstrucción desarma un texto o una tradición para exponer lo que oculta. Solo perdona su propio relato: sus propias afirmaciones nunca se deconstruyen.', 'Derrida, De la gramatología'],
        3: ['Unos relatos sustituyen a otros sin fin, y ninguno es verdadero; lo que sirve por ahora es todo lo que cabe esperar. El cristianismo responde con un relato contado por quien está fuera de él, y que entró en él.', ''],
      },
      self: {
        0: ['El yo no es un alma ni una naturaleza, sino un producto de los relatos que se cuentan de él: la familia, la cultura y el lenguaje. No hay nadie debajo de los relatos, esperando ser hallado.', ''],
        1: ['Al hombre lo moldean, y aun lo hacen, quienes tienen el poder y las categorías que imponen: cuerdo y loco, normal y desviado. Foucault rastreó cómo cárceles, clínicas y escuelas hicieron de la gente lo que se dice que es, e invirtió a Platón: “el alma, prisión del cuerpo.”', 'Foucault, Vigilar y castigar'],
        2: ['Cada uno es libre de contar su propio relato. Pero si ningún relato es más verdadero que otro, contar el suyo no le dice nada a nadie.', ''],
        3: ['Al final el yo se deshace: un cruce de voces y papeles, sin nadie en el centro. Foucault previó al hombre “borrado, como en los límites del mar un rostro de arena”. Un yo sin centro no tiene a nadie que salvar, ni a nadie que amar.', 'Foucault, Las palabras y las cosas'],
      },
      sin: {
        1: ['La opresión se denuncia, y con vehemencia. Pero el posmodernismo no tiene norma por la cual algo esté mal, así que su indignación toma prestada la ley moral que niega: “la obra de la ley escrita en sus corazones”.', 'Ro 2:14–15'],
        2: ['La opresión se denuncia y se combate, pero sin norma por encima de todos los grupos para juzgarla; el juicio solo puede ser el poder de un grupo contra el de otro.', ''],
      },
    },

    marxism: {
      god: {
        0: ['La religión es “el opio del pueblo”: un consuelo que toman los oprimidos para calmar su dolor, que les impide cambiar su condición. Cuando la sociedad sea justa, ya no hará falta.', 'Marx, Crítica de la filosofía del derecho de Hegel'],
        1: ['La religión es “el suspiro de la criatura oprimida”: un clamor real, pero dirigido al cielo en vez de a quienes explotan.', 'Marx, Crítica de la filosofía del derecho de Hegel'],
        2: ['Sin Dios, el hombre debe salvarse a sí mismo, y el partido lo conducirá. Lenin sostuvo que “la clase obrera, exclusivamente con sus propias fuerzas, solo está en condiciones de elaborar una conciencia tradeunionista”: necesita una vanguardia que sepa lo que exige la historia, y que no responda ante nadie.', 'Lenin, ¿Qué hacer?'],
        3: ['No hay juicio venidero: el único juez es la historia, y quienes la sirven quedan justificados, hagan lo que hagan. Castro terminó su defensa en el juicio de 1953: “Condenadme, no importa, la historia me absolverá.”', 'Castro, La historia me absolverá'],
      },
      world: {
        0: ['La materia es todo lo que hay, y la historia avanza mediante el conflicto (materialismo dialéctico). Cómo se ganan la vida los hombres, la “base económica”, da forma a todo lo demás: el derecho, la moral, el arte y la religión.', 'Marx y Engels, Manifiesto comunista'],
        1: ['“La historia de todas las sociedades hasta nuestros días es la historia de la lucha de clases”: dueños contra obreros, los que poseen los medios de producción contra los que solo tienen su trabajo que vender.', 'Marx y Engels, Manifiesto comunista'],
        2: ['El Estado obrero planifica toda la producción desde el centro. Mises mostró por qué no puede funcionar: “donde no hay mercado libre, no hay mecanismo de precios; sin mecanismo de precios, no hay cálculo económico.”', 'Mises, El cálculo económico en la comunidad socialista'],
        3: ['Al final el Estado se extingue y surge la sociedad sin clases: “de cada cual según su capacidad, a cada cual según sus necesidades.” Es el cielo en la tierra, y siempre está por venir.', 'Marx, Crítica del programa de Gotha'],
      },
      bridge: {
        0: ['“No es la conciencia del hombre la que determina su ser, sino el ser social el que determina su conciencia.” Toda idea descansa en la base económica. Pero entonces las ideas del propio Marx son solo producto de su posición de clase, y no más verdaderas que otras.', 'Marx, Prólogo a la Contribución a la crítica de la economía política'],
        1: ['La plusvalía: la ganancia es lo que el dueño toma del trabajo del obrero más allá de su salario. “El capital es trabajo muerto que solo se reanima, a la manera de un vampiro, chupando trabajo vivo.” Pero, como mostró Böhm-Bawerk, el valor viene de lo que la gente quiere, no del trabajo invertido.', 'Marx, El capital I · Böhm-Bawerk, La conclusión del sistema marxiano'],
        2: ['“Los filósofos no han hecho más que interpretar de diversos modos el mundo; de lo que se trata es de transformarlo.” La revolución es la salvación: los obreros toman el poder por la fuerza. Dondequiera que se intentó, no trajo liberación sino el gulag y la hambruna.', 'Marx, Tesis sobre Feuerbach XI'],
      },
      self: {
        0: ['El hombre no es un alma hecha a imagen de Dios, sino “el conjunto de las relaciones sociales”: lo que la sociedad y el trabajo hacen de él.', 'Marx, Tesis sobre Feuerbach'],
        1: ['El obrero está enajenado: separado de lo que produce, de su trabajo, de los demás y de sí mismo; “solo se siente en sí fuera del trabajo, y en el trabajo fuera de sí”. Marx vio un dolor real, pero lo atribuyó a la propiedad, no a la separación del hombre de Dios.', 'Marx, Manuscritos económico-filosóficos de 1844'],
        2: ['Cambia las condiciones y cambiarás al hombre: la nueva sociedad hará un “hombre nuevo”. Donde se intentó, al hombre nuevo hubo que forzarlo.', ''],
        3: ['Cada generación se gasta por un futuro que nunca verá, y el individuo no cuenta nada frente a la causa.', ''],
      },
      sin: {
        1: ['El mal está en el sistema, en la propiedad privada y las clases, no en el corazón humano. “Los comunistas pueden resumir su teoría en esta fórmula única: abolición de la propiedad privada.” Cámbiese el sistema, y el mal desaparecerá.', 'Marx y Engels, El manifiesto comunista'],
        2: ['Pero el mal seguía en el corazón de los nuevos amos. Solzhenitsyn, que sobrevivió a sus campos, escribió que “la línea que separa el bien del mal pasa por el corazón de cada ser humano.”', 'Solzhenitsyn, Archipiélago Gulag'],
      },
    },

    individualism: {
      god: {
        '*': ['No hay autoridad por encima del yo: ni Dios, ni la naturaleza, ni la tradición. El sentido se encuentra mirando hacia dentro. Robert Bellah lo describió en Hábitos del corazón: cada persona tiene “un núcleo único de sentimiento e intuición que debe desplegarse o expresarse.”', 'Bellah et al., Hábitos del corazón'],
        1: ['Dios, si se le conserva, se vuelve una regla más que sacudirse, o un aliado de lo que el yo ya ha elegido. Una enfermera en Habits of the Heart puso a su fe su propio nombre: “Es sheilaísmo. Solo mi propia vocecita.”', 'Bellah y otros, Habits of the Heart'],
        2: ['El yo es su propio juez, y nadie puede decirle que se equivoca. Emerson: “Nada es al fin sagrado sino la integridad de tu propia mente.” Pero un juez que no responde ante nadie no admite apelación, ni siquiera del yo al que agravia.', 'Emerson, Confianza en uno mismo'],
        3: ['No queda nadie que diga quién soy sino yo. Pero el yo que se nombra a sí mismo nunca está seguro de que el nombre sea verdadero. El salmista descansaba en ser conocido: “Oh Jehová, tú me has examinado y conocido.”', 'Sal 139:1–4'],
      },
      world: {
        0: ['La sociedad es un escenario donde el yo representa quién es. Rousseau empezó sus Confesiones: “No estoy hecho como ninguno de cuantos he visto… Si no valgo más, al menos soy distinto.”', 'Rousseau, Confesiones'],
        1: ['La familia, la iglesia y la ley moral se ven como muros que encierran al yo, y ser libre es romperlos. Emerson: “Quien quiera ser hombre ha de ser inconformista.”', 'Emerson, Confianza en uno mismo'],
        2: ['La sociedad debe ahora afirmar a cada yo tal como se presenta. El Tribunal Supremo de Estados Unidos puso el credo en ley: “En el corazón de la libertad está el derecho a definir el propio concepto de la existencia, del sentido, del universo y del misterio de la vida humana.”', 'Planned Parenthood v. Casey (1992)'],
        3: ['El resultado es una multitud de yoes, cada uno solo: libre de todo lazo, y sin nadie ligado a él tampoco. Tocqueville lo previó: cada hombre devuelto “sin cesar hacia sí mismo”, y encerrado al fin “en la soledad de su propio corazón”.', 'Tocqueville, La democracia en América II.2.2'],
      },
      bridge: {
        2: ['La autenticidad: seguir al propio corazón, piensen lo que piensen los demás. Charles Taylor la describe: “Hay un cierto modo de ser humano que es mi modo.” Pero la Escritura advierte: “Engañoso es el corazón más que todas las cosas.”', 'Taylor, La ética de la autenticidad · Jer 17:9'],
      },
      self: {
        0: ['Cada persona tiene dentro un yo verdadero, que se encuentra mirando hacia dentro: sus sentimientos y deseos son su verdad. Pero los sentimientos cambian y se contradicen; no pueden ser todos verdad.', ''],
        1: ['El yo se siente sujeto por normas ajenas: padres, iglesias, costumbres y códigos morales que le dicen quién ser. Lo que de verdad es, no se le permite serlo, y por eso se siente falso consigo mismo.', ''],
        2: ['El yo es su propio hacedor: decide lo que es, y los demás deben aceptarlo. Pero un yo hecho por elección puede deshacerse con la siguiente.', ''],
        3: ['La meta es ser plenamente uno mismo y sentirse realizado, y cuando el yo muere, la historia que contaba de sí acaba con él. Jesús invirtió la meta: “todo el que pierda su vida por causa de mí y del evangelio, la salvará.”', 'Mr 8:35'],
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
        2: ['Se rediseña la naturaleza: genes editados, cuerpos con piezas nuevas, mentes conectadas a máquinas. Pero ¿quién decide para qué es el rediseño? C. S. Lewis advirtió que “el poder del Hombre sobre la Naturaleza” resulta ser “un poder ejercido por algunos hombres sobre otros, con la Naturaleza como instrumento”.', 'Lewis, La abolición del hombre'],
        3: ['Al final la naturaleza misma queda cableada: Kurzweil prevé la materia y la energía “saturadas” de inteligencia, el universo despertando. El mundo se vuelve una gran máquina de pensar, sin más Hacedor que las mentes que la construyeron.', 'Kurzweil, La Singularidad está cerca'],
      },
      bridge: {
        2: ['La tecnología es el camino de salvación: mejora a mejora, el hombre se elevará sobre sus límites. Julian Huxley acuñó la palabra: “el hombre sigue siendo hombre, pero se trasciende a sí mismo, realizando nuevas posibilidades de y para su naturaleza humana.”', 'Huxley, New Bottles for New Wine'],
        3: ['La mente copiada: una mente volcada en una máquina, que funciona mientras dure el equipo. Pero una copia no es el copiado: el hombre muere igual, y otra cosa sigue.', ''],
      },
      self: {
        0: ['El hombre es un borrador, no una obra acabada: producto de la evolución, que ahora podemos tomar en nuestras manos. El Zaratustra de Nietzsche lo dijo primero: “El hombre es algo que debe ser superado.” La Escritura dice lo contrario: el hombre está hecho a imagen de Dios, y no es un experimento.', 'Nietzsche, Así habló Zaratustra · Gn 1:27'],
        1: ['El hombre está atrapado en un cuerpo que falla, limitado por la vejez, la enfermedad y la muerte. Los transhumanistas no ven en ello el fruto de una caída ni la condición de una criatura, sino defectos del diseño que la naturaleza nos dio por azar.', ''],
        2: ['El poshumano, rehecho por su propia mano: más fuerte, más listo, más longevo. Pero un hombre que se rehace a sí mismo aún no ha cambiado su corazón.', ''],
        3: ['El cuerpo queda atrás como un simple equipo. No es nuevo: es el viejo desprecio gnóstico por la carne, que Dios hizo y llamó buena, y en la que Cristo resucitó.', 'Lc 24:39'],
      },
      sin: {
        1: ['La muerte no es la paga del pecado, sino un problema que resolver. Harari: “la muerte no es un destino inevitable, sino solo un problema técnico… Y todo problema técnico tiene una solución técnica.” La Escritura: “la paga del pecado es muerte.”', 'Harari, Homo Deus · Ro 6:23'],
        2: ['La muerte se retrasa, no se vence: las vidas se alargan, pero todas siguen acabando. Solo uno ha vuelto de la muerte para no morir más: “Cristo ha resucitado de los muertos; primicias de los que durmieron es hecho.”', '1 Co 15:20–26'],
      },
    },

    'new-age': {
      god: {
        '*': ['Dios es el Universo: una energía impersonal, una conciencia universal de la que todo forma parte. La cultura popular le dio voz en La guerra de las galaxias: la Fuerza, “un campo de energía creado por todos los seres vivos”. No una Persona que habla, ama o juzga, sino una fuerza que se siente y se aprovecha.', 'La guerra de las galaxias (1977)'],
        1: ['Una energía impersonal no puede ser ofendida, así que no hay nada que perdonar ni nadie que perdone. Pero tampoco puede amar: una fuerza no tiene corazón que poner en nadie. El Dios de la Escritura no es una fuerza: “Dios es amor.”', '1 Jn 4:8'],
        2: ['Al Universo se le aprovecha, no se le adora: se recurre a él para la salud, la riqueza y la paz con un método que El secreto resume así: “Pide, cree, recibe.” Responde a la técnica correcta, como la electricidad, y no pide nada a cambio.', 'Byrne, El secreto'],
        3: ['A lo divino se llega escalando, por el crecimiento espiritual a lo largo de muchas vidas, no se recibe como un don. La gracia no tiene lugar donde cada alma debe ganarse la subida, pero la salvación es “no por obras, para que nadie se gloríe”.', 'Ef 2:8–9'],
      },
      world: {
        0: ['Todo es uno: el cosmos y el yo son un gran todo, y lo uno es divino. Se niega la diferencia entre el Creador y la criatura.', 'Ro 1:25'],
        1: ['La mayoría ve solo la superficie de las cosas, un mundo de objetos y yoes separados, y no percibe la unidad y la divinidad que hay debajo. El verso de Blake se volvió un lema: “Si las puertas de la percepción se depurasen, todo aparecería al hombre como es: infinito.”', 'Blake, El matrimonio del cielo y el infierno'],
        2: ['El mundo lo moldea la mente: los pensamientos atraen a sus semejantes y crean nuestra realidad. El secreto lo dice sin rodeos: “Tus pensamientos actuales están creando tu vida futura.” Entonces el enfermo y el pobre, en cierto sentido, han elegido su suerte.', 'Byrne, El secreto'],
        3: ['Una nueva era, la Era de Acuario, siempre está a punto de amanecer, cuando la humanidad despertará a una. Un musical lo cantó en 1967, “Este es el amanecer de la Era de Acuario”, y La conspiración de Acuario de Marilyn Ferguson (1980) lo anunció en serio.', 'Hair · Ferguson, La conspiración de Acuario'],
      },
      bridge: {
        2: ['La conciencia cósmica: en la meditación y en estados alterados, se dice que el yo conoce su unidad con todo. Allí el bien y el mal se disuelven en lo Uno.', ''],
        3: ['La reencarnación: el alma vuelve vida tras vida, aprendiendo, hasta quedar pura. No hay Salvador, solo la larga subida, y ningún juicio final.', 'He 9:27'],
      },
      self: {
        0: ['En lo hondo del yo, cada persona es divina. Shirley MacLaine, la voz más conocida del movimiento, lo dijo sin rodeos: “Yo soy Dios.”', 'MacLaine, Out on a Limb'],
        1: ['El yo ha olvidado su propia divinidad y vive encerrado en su mente ordinaria. La enseñanza de Eckhart Tolle: “Tú no eres tu mente.”', 'Tolle, El poder del ahora'],
        2: ['El yo despierto crea su propia realidad con sus pensamientos e intenciones: lo que imagina y espera, el Universo se lo trae. Es el yo en el lugar del Creador, el único de quien se dice: “él dijo, y fue hecho.”', 'Sal 33:9'],
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
        0: ['La tierra es el cuerpo de la Diosa, y por tanto divina: toda vida participa de ella. En la Invocación de la Diosa, ella habla como “la belleza de la tierra verde, y la Luna blanca entre las estrellas”. La naturaleza no está hecha por Dios: es dios.', 'Valiente, La invocación de la Diosa'],
        1: ['La tierra está herida por la industria, las ciudades y las máquinas, que han apartado a la gente de los ciclos de la naturaleza. El resurgir neopagano nació en parte como protesta contra el mundo moderno e industrial.', ''],
        2: ['A la tierra se la sirve en lugar de su Hacedor, lo que Pablo nombra con precisión: “honrando y dando culto a las criaturas antes que al Creador.”', 'Ro 1:25'],
        3: ['La tierra gira para siempre, siempre dando vueltas, nunca renovada. La promesa de Cristo no es un ciclo sino un nuevo comienzo: “He aquí, yo hago nuevas todas las cosas.”', 'Ap 21:5'],
      },
      bridge: {
        0: ['La rueda del año: ocho fiestas (los solsticios, los equinoccios y los cuatro días intermedios) que giran con las estaciones, para siempre.', ''],
        2: ['La magia: poder buscado por la voluntad, el rito y las energías de la naturaleza. La definición de Crowley se adoptó ampliamente: “la Ciencia y el Arte de provocar el Cambio conforme a la Voluntad.” Es poder tomado, no gracia recibida.', 'Crowley, Magick en teoría y práctica · Dt 18:10–12'],
        3: ['La rueda da vueltas y vueltas sin día final: sin fin de la historia, sin juicio y sin meta. El tiempo es un círculo, no una historia que va a alguna parte.', ''],
      },
      self: {
        0: ['El hombre es hijo de la tierra, una criatura entre muchas en la red de la vida, no más alta que las demás. La Escritura lo distingue, para que “señoree” la tierra en nombre de su Hacedor y le rinda cuentas de ella.', 'Gn 1:28'],
        1: ['El hombre está separado de la tierra y sus ritmos: la luna, las estaciones, el campo. El remedio es volver a la naturaleza, no reconciliarse con su Hacedor, el Dios “que nos reconcilió consigo mismo por Cristo”.', '2 Co 5:18'],
        2: ['El pagano vive según la Rede wicana: “Si a nadie dañas, haz lo que quieras.” Pero ¿quién decide qué daña, y con qué medida?', 'La Rede wicana'],
        3: ['Al morir, el alma descansa en la Tierra del Verano, una tierra apacible de los muertos, y luego vuelve a nacer en otra vida, dando vueltas con la rueda.', ''],
      },
      sin: {
        1: ['Lo que falla es el desequilibrio y la desconexión, no el pecado contra un Dios santo. El daño es real, pero es daño a la naturaleza y a otros, nunca una ofensa contra un legislador.', ''],
        2: ['La desconexión se sana con ritos, sin nada que perdonar, porque nadie ha sido agraviado salvo la naturaleza y uno mismo. Sin un Dios santo, la culpa no tiene adónde ir ni quién la quite.', ''],
      },
    },

    'hindu-monism': {
      god: {
        '*': ['Brahman: la única realidad, sin partes ni cualidades, más allá de todo nombre. “Al principio esto era solo el Ser, uno solo, sin segundo.” El Advaita Vedanta, enseñado sobre todo por Shankara, sostiene que es todo lo que verdaderamente es: no una Persona que habla o ama, sino ser, conciencia y dicha.', 'Chandogya Upanishad 6.2.1 · Shankara'],
        1: ['Solo Brahman es real. El resumen de Shankara: “Brahman es real, el mundo es falso, y el yo no es otra cosa que Brahman.”', 'Shankara, Brahmajnanavali'],
        2: ['Brahman está más allá del bien y del mal, como de todo par de opuestos: la Upanishad solo puede decir de él “no es esto, no es esto”. Entonces el mal no tiene peso último, ni el bien exigencia última: ambos pertenecen al sueño.', 'Brihadaranyaka Upanishad 2.3.6 · Is 5:20'],
        3: ['Brahman es todo lo que siempre hubo: cuando el sueño acaba, no queda nada más, y nada fue nunca de verdad distinto de él.', ''],
      },
      world: {
        0: ['El mundo no es hecho por Brahman, sino que es Brahman manifestándose en muchas formas: “Todo esto es Brahman.” No hay un Creador distinto de la creación, y por tanto ninguna criatura que pueda conocerlo y amarlo.', 'Chandogya Upanishad 3.14.1 · Ro 1:25'],
        1: ['El mundo de las muchas cosas es maya, una apariencia, como una cuerda que al anochecer se toma por una serpiente, la imagen del propio Shankara. Pero si todo es ilusión, ¿de quién es la ilusión? Brahman no puede ignorar, y no hay nadie más.', 'Shankara, Vivekachudamani'],
        2: ['Maya queda vista por lo que es: el que conoce ya no toma lo múltiple por real, como quien ve la cuerda ya no teme a la serpiente.', ''],
        3: ['Moksha es la liberación de la rueda de los renacimientos. El Upanishad ora: “Llévame de lo irreal a lo real, de la oscuridad a la luz, de la muerte a la inmortalidad.”', 'Brihadaranyaka Upanishad 1.3.28'],
      },
      bridge: {
        1: ['El samsara es la rueda del nacer, morir y renacer, movida por el karma, el peso moral de los actos. “Quienes aquí han obrado bien alcanzarán pronto un buen nacimiento… pero quienes aquí han obrado mal alcanzarán pronto un mal nacimiento: el de un perro, un cerdo o un paria.”', 'Chandogya Upanishad 5.10.7 · Bhagavad Gita 2.22'],
        2: ['La liberación puede llevar muchas vidas: el conocimiento madura despacio, con disciplina, estudio y meditación junto a un maestro. La Gita ofrece también otros caminos: la devoción y la acción desinteresada. Pero todos dependen del esfuerzo del que busca.', 'Bhagavad Gita 4.39'],
      },
      self: {
        0: ['El Atman, el verdadero yo, no es el cuerpo ni la mente, sino conciencia pura: “Este Atman es Brahman.” El yo más profundo de cada persona es Dios.', 'Mandukya Upanishad 2'],
        1: ['El yo se cree una persona separada, con su propio cuerpo, sus pensamientos y su vida. Esta creencia, no la rebelión, es lo que lo ata.', ''],
        2: ['La gran sentencia de los Upanishads: “Tat tvam asi”, “Tú eres Eso”: el yo es Brahman. Entonces la adoración acaba en identidad, y no queda nadie que ame a Dios.', 'Chandogya Upanishad 6.8.7'],
        3: ['En la liberación el yo ya no está separado. El Upanishad: “Como los ríos que fluyen al océano pierden su nombre y su forma, así el que conoce… va a la Persona divina.” No queda nadie para disfrutarla.', 'Mundaka Upanishad 3.2.8'],
      },
      sin: {
        1: ['Avidya, la ignorancia de lo que el yo es de verdad, es la raíz de la atadura: no un pecado contra un Dios santo, sino un error sobre la realidad.', ''],
        2: ['La ignorancia se disipa con el conocimiento, no se perdona. Nada necesita perdón, porque a nadie se ha agraviado; pero entonces la culpa, de la que “da testimonio su conciencia”, también es solo una ilusión.', 'Ro 2:15'],
      },
    },

    buddhism: {
      god: {
        '*': ['El budismo no tiene creador. Puede haber dioses, pero también nacen, mueren y renacen, atrapados en la misma rueda. Nadie hizo el mundo, y nadie arriba puede salvar de él.', ''],
        1: ['No hay nadie arriba que ayude: el sufrimiento ha de entenderlo y terminarlo la propia comprensión de cada uno. “Vosotros mismos debéis esforzaros; los Budas solo señalan el camino.” El Buda es un maestro, no un salvador que lleve a nadie por él.', 'Dhammapada 276'],
        2: ['Ninguna gracia viene de fuera. El Buda dijo a sus discípulos: “Sed islas para vosotros mismos, sed vuestro propio refugio, sin buscar refugio fuera.”', 'Mahaparinibbana Sutta (DN 16)'],
        3: ['En el nirvana no hay nada arriba que encontrar: ningún Dios que ver cara a cara, ni nadie que reciba en casa.', 'Ap 22:4'],
      },
      world: {
        0: ['Todo surge de causas y pasa; nada tiene esencia duradera. “Todas las cosas condicionadas son impermanentes”, dijo el Buda. Hasta el mundo es una corriente de sucesos, no una creación.', 'Dhammapada 277'],
        1: ['Samsara: nacer, morir y nacer otra vez, sin principio, entre dioses, hombres, animales, espíritus hambrientos e infiernos, según decida el karma. En el Sermón del Fuego el Buda declaró que “todo arde”: los sentidos y la mente en llamas de ansia, odio y engaño.', 'Adittapariyaya Sutta (SN 35.28)'],
        3: ['El nirvana es la llama apagada: el ansia extinguida, y con ella el renacimiento. “Como una llama apagada por la fuerza del viento se extingue y ya no puede contarse, así el sabio liberado del nombre y el cuerpo.” No es un lugar, ni una unión con Dios.', 'Sutta Nipata 1074'],
      },
      bridge: {
        1: ['El renacimiento: el karma de una vida moldea la siguiente. Pero como no hay un yo duradero, nadie pasa de una vida a otra. El monje Nagasena lo comparó con una lámpara encendida de otra: el que renace “no es el mismo ni es otro”, un enigma que los budistas han debatido largamente.', 'Milindapanha'],
        2: ['El Noble Óctuple Sendero: recta visión, intención, palabra, acción, modo de vida, esfuerzo, atención y concentración. Cada uno debe recorrerlo por sí mismo: “la pureza y la impureza dependen de uno mismo; nadie puede purificar a otro.”', 'Dhammacakkappavattana Sutta · Dhammapada 165'],
      },
      self: {
        0: ['No hay alma (anatta). El yo es cinco partes pasajeras: cuerpo, sensación, percepción, formaciones mentales y conciencia. Como enseñó Nagasena, “carro” nombra sus piezas juntas, no algo más.', 'Milindapanha'],
        1: ['El yo se aferra a lo que no puede durar, y por eso sufre. El primer sermón: “el nacimiento es sufrimiento, la vejez es sufrimiento, la enfermedad es sufrimiento, la muerte es sufrimiento.”', 'Dhammacakkappavattana Sutta'],
        2: ['El yo obra su propia liberación con esfuerzo, disciplina y meditación. Las últimas palabras del Buda: “Todas las cosas condicionadas están sujetas a decadencia. Esforzaos con diligencia.”', 'Mahaparinibbana Sutta (DN 16)'],
        3: ['¿Hubo alguien alguna vez? Cuando le preguntaron si el iluminado existe tras la muerte, el Buda no quiso responder. Cristo promete a su pueblo no la extinción, sino ser resucitado y conocido: “entonces conoceré como fui conocido.”', 'Cula-Malunkyovada Sutta (MN 63) · 1 Co 13:12'],
      },
      sin: {
        1: ['El ansia (tanha) es la causa del sufrimiento: “el ansia de placeres sensuales, el ansia de existencia, el ansia de no existencia”. El problema es el deseo, no el pecado contra Dios.', 'Dhammacakkappavattana Sutta'],
        2: ['El ansia se enfría al recorrer el sendero: el deseo no se reorienta hacia su verdadero bien, sino que se apaga. El cristianismo hace lo contrario: “Deléitate asimismo en el SEÑOR, y él te concederá las peticiones de tu corazón.”', 'Sal 37:4'],
      },
    },

    taoism: {
      god: {
        0: ['“El Tao que puede expresarse no es el Tao eterno; el nombre que puede nombrarse no es el nombre eterno.” El Tao es la fuente sin nombre y el camino de todas las cosas, no una persona.', 'Tao Te Ching 1'],
        1: ['El Tao no toma partido. Laozi: “El cielo y la tierra no son benévolos; tratan a los diez mil seres como perros de paja.” El Camino no se ocupa más del bueno que del malvado.', 'Tao Te Ching 5'],
        2: ['Al Tao se le sigue, pero nunca se le encuentra: “El hombre sigue a la tierra, la tierra sigue al cielo, el cielo sigue al Tao, y el Tao sigue lo que es así por sí mismo.” No hay nadie a quien orar, amar o agradecer, solo un camino con el que moverse.', 'Tao Te Ching 25'],
        3: ['El Tao no nota que un hombre se ha ido: ni lo llora ni lo recibe. Es el modo en que van las cosas, no alguien que conoce y guarda a los que se han ido.', ''],
      },
      world: {
        0: ['“El Tao engendró el uno, el uno engendró el dos, el dos el tres, y el tres los diez mil seres.” Todo surge del juego del yin y el yang, que giran sin cesar.', 'Tao Te Ching 42'],
        1: ['Las diez mil cosas siguen girando, haga lo que haga el hombre; el mal no viene de ellas, sino de su forzar. “El mundo es un vaso sagrado sobre el que no se puede actuar: quien actúa sobre él lo arruina, quien lo aferra lo pierde.”', 'Tao Te Ching 29'],
        2: ['Luz y oscuridad, fuerza y debilidad, vida y muerte: cada uno necesita al otro, y ninguno es mejor. “Cuando todo el mundo conoce el bien como bien, surge lo que no es bueno.” También el bien y el mal se vuelven un par en equilibrio.', 'Tao Te Ching 2 · Is 5:20'],
        3: ['Los diez mil seres giran sin fin: sin principio, sin meta y sin día final. Laozi: “El retorno es el movimiento del Tao.” Todas las cosas vuelven a donde empezaron.', 'Tao Te Ching 40'],
      },
      bridge: {
        2: ['Wu wei: la acción sin esfuerzo, moverse con la corriente y no contra ella. Laozi: “El bien supremo es como el agua. El agua beneficia a los diez mil seres y no compite.”', 'Tao Te Ching 8'],
      },
      self: {
        0: ['El hombre es una cosa entre diez mil, sin lugar ni vocación especial. Zhuangzi soñó que era una mariposa, y despertó sin saber: “No sé si fui Zhuang Zhou soñando que era una mariposa, o si soy una mariposa que sueña ser Zhuang Zhou.”', 'Zhuangzi 2'],
        1: ['El hombre empuja contra la corriente: se aferra, planea y moraliza, y pierde el paso del Camino. Laozi: “Cuantas más leyes y órdenes se promulgan, más ladrones y bandidos hay.”', 'Tao Te Ching 57'],
        2: ['El hombre cede como el agua. Laozi: “Nada en el mundo es más blando y débil que el agua, pero para atacar lo duro y fuerte nada la supera.”', 'Tao Te Ching 78'],
        3: ['Al morir, el hombre vuelve a transformarse en el Camino. Hallado tamborileando sobre un cuenco tras la muerte de su esposa, Zhuangzi explicó que ella solo había cambiado otra vez, “como la sucesión de las cuatro estaciones: primavera, verano, otoño, invierno”. No hay nada que llorar, ni nada que esperar.', 'Zhuangzi 18'],
      },
      sin: {
        1: ['La falta es forzar: aferrarse, maquinar y poner reglas. Laozi: “Cuando se abandona el gran Tao, surgen la benevolencia y la rectitud.” Hasta la moral es señal de decadencia.', 'Tao Te Ching 18'],
      },
    },

    confucianism: {
      god: {
        0: ['El Cielo (tian) ordena todas las cosas, pero no habla. Confucio: “¿Acaso habla el Cielo? Las cuatro estaciones siguen su curso y nacen los cien seres. ¿Acaso habla el Cielo?”', 'Analectas 17.19'],
        1: ['El Cielo sigue callado: no da ley en palabras, ni profeta, ni promesa. El gobernante que pierde la virtud pierde “el Mandato del Cielo”, pero el Cielo mismo no dice nada; solo se le lee en lo que ocurre.', 'Mencio 5A.5'],
        2: ['Al Cielo solo se le lee en el orden de las cosas: en las estaciones, en un gobernante justo, en la armonía de una familia bien llevada.', ''],
        3: ['Preguntado por la muerte, Confucio desvió la pregunta: “Si aún no entiendes la vida, ¿cómo vas a entender la muerte?” Sobre la mayor de las preguntas, el Cielo no dice palabra.', 'Analectas 11.12'],
      },
      world: {
        0: ['Todo bajo el Cielo es la familia y el Estado, ordenados como uno. Confucio: “Que el príncipe sea príncipe, el ministro ministro, el padre padre y el hijo hijo.”', 'Analectas 12.11'],
        1: ['Cuando la gente descuida sus deberes, todo bajo el Cielo se desordena: gobernantes sin virtud, hijos sin respeto, una tierra sin paz.', ''],
        2: ['El orden vuelve cuando cada uno guarda su lugar. Confucio: “Quien gobierna por la virtud es como la estrella polar, que permanece en su lugar mientras todas las estrellas giran hacia ella.”', 'Analectas 2.1'],
        3: ['El orden se transmite de generación en generación, en las familias y en los ritos. La piedad filial une a los vivos con los muertos, y el pasado con el presente: “Cuando los padres viven, sírvelos con decoro; cuando mueren, entiérralos con decoro.”', 'Analectas 2.5'],
      },
      bridge: {
        0: ['Los cinco vínculos, cada uno con su deber. Mencio: “entre padre e hijo, afecto; entre soberano y ministro, rectitud; entre esposo y esposa, atención a sus funciones distintas; entre mayores y jóvenes, el debido orden; entre amigos, fidelidad.” La armonía llega cuando se guarda cada uno.', 'Mencio 3A.4'],
        1: ['Los vínculos se aflojan cuando se descuidan los deberes, y con ellos todo el orden. Youzi, discípulo de Confucio, llamó al respeto por los padres y los hermanos mayores “la raíz de la humanidad”: un hijo que deshonra a su padre afloja el lazo que sostiene la sociedad.', 'Analectas 1.2'],
        2: ['El rito (li): la conducta recta, practicada a diario hasta volverse segunda naturaleza. Confucio: “Dominarse a sí mismo y volver al rito es la benevolencia.”', 'Analectas 12.1'],
        3: ['Los vivos honran a los antepasados con ofrendas y ritos. Confucio los guardaba, pero no quería hablar de lo que hay más allá: “Si aún no puedes servir a los hombres, ¿cómo vas a servir a los espíritus?”', 'Analectas 11.12'],
      },
      self: {
        0: ['El hombre es bueno por naturaleza, si se cultiva. Mencio: “La naturaleza humana es buena, como el agua fluye hacia abajo.” Pero Xunzi, el otro gran maestro confuciano, sostuvo lo contrario: que la naturaleza humana es mala.', 'Mencio 6A.2 · Xunzi 23'],
        1: ['El hombre fuera de su lugar trae desorden: el deber descuidado, los lazos tensos. Confucio: “El caballero entiende lo que es justo; el hombre mezquino entiende lo que da provecho.”', 'Analectas 4.16'],
        2: ['El caballero (junzi) se perfecciona por el estudio, el rito y la reflexión, y su ejemplo se extiende: “desde el Hijo del Cielo hasta el pueblo llano, todos deben considerar el cultivo de la persona como la raíz.” Se hace bueno por su propio esfuerzo, sin necesidad de gracia.', 'El Gran Saber'],
        3: ['El hombre sigue viviendo en el recuerdo de sus descendientes, mientras continúan los ritos: “Cuidad con esmero los funerales de los padres, y honradlos con sacrificios cuando hace mucho que se fueron”, enseñó Zengzi. El confucianismo tiene poco que decir de lo que haya más allá.', 'Analectas 1.9'],
      },
      sin: {
        1: ['La falta es descuidar el deber: una ruptura del orden entre personas, no una ofensa contra Dios. Se arregla entre personas, restaurando la conducta debida; el Cielo no es una parte con quien reconciliarse.', 'Sal 51:4'],
        2: ['El descuido se repara con estudio, rito y cultivo de sí, no se perdona. Donde la falta está en el corazón, el cultivo no la alcanza; Dios promete más: “Os daré corazón nuevo, y pondré espíritu nuevo dentro de vosotros.”', 'Ez 36:26'],
      },
    },

    animism: {
      god: {
        0: ['Muy por encima de los espíritus hay un Dios Supremo, el creador, pero se ha retirado de la vida diaria y rara vez se le invoca. Los estudiosos de la religión lo llaman deus otiosus, el Dios ocioso.', 'Eliade, Tratado de historia de las religiones'],
        1: ['El Dios Alto está demasiado lejos para ayudar; la vida diaria se arregla con los espíritus más cercanos. Así, el que hizo todas las cosas es al que menos se acude: “habiendo conocido a Dios, no le glorificaron como a Dios, ni le dieron gracias.”', 'Ro 1:21'],
        2: ['Al Dios Supremo aún no se le invoca. Pablo dice que el Dios desconocido se ha acercado: “no está lejos de cada uno de nosotros.”', 'Hch 17:27'],
        3: ['El Dios Supremo sigue lejos; ni siquiera la muerte lo acerca. Los muertos van con los antepasados, no con Dios.', ''],
      },
      world: {
        0: ['El mundo está lleno de espíritus: en ríos, árboles, animales, lugares y en los muertos. John Mbiti escribió que “los africanos son notoriamente religiosos”: la religión atraviesa cada parte de la vida.', 'Mbiti, Religiones y filosofía africanas'],
        1: ['Cuando se ofende a los espíritus, el mundo se vuelve contra el hombre: llegan la enfermedad, la sequía y la desgracia. Nada ocurre por azar; detrás de cada desgracia hay alguien, y la pregunta es siempre quién.', 'Evans-Pritchard, Brujería, magia y oráculos entre los azande'],
        2: ['El equilibrio se restablece por ahora, hasta la próxima ofensa; la paz con los espíritus siempre es pasajera, una tregua que renovar. Cristo puso fin al regateo: “despojando a los principados y a las potestades, los exhibió públicamente, triunfando sobre ellos”.', 'Col 2:15'],
        3: ['Los espíritus permanecen, y los muertos se les unen; el mundo sigue lleno de poderes invisibles. Los vivos deben seguir alimentando y honrando a los muertos, o sufrir su ira.', ''],
      },
      bridge: {
        2: ['El sacrificio se da para comprar la paz con un espíritu airado. Es un trato, que se renueva cada vez. El sacrificio de Cristo se ofreció “una vez para siempre”.', 'He 10:10–12'],
      },
      self: {
        0: ['El hombre es una vida entre muchos espíritus, y debe vivir con cuidado entre ellos: honrando a los debidos, guardando los tabúes y sin ofender. La vida es una red de obligaciones con poderes invisibles.', ''],
        1: ['El hombre vive con miedo a lo que no ve: la brujería, las maldiciones y los espíritus airados. Cristo vino a librar “a todos los que por el temor de la muerte estaban durante toda la vida sujetos a servidumbre.”', 'He 2:15'],
        2: ['El hombre regatea su seguridad con sacrificios y amuletos. No hay promesa, solo la esperanza de que el trato se mantenga.', ''],
        3: ['Al morir, la persona se vuelve antepasado. Mbiti llamó a los muertos recientes los “muertos vivientes”: siguen vivos mientras se les recuerda por su nombre, y luego se desvanecen en el anonimato.', 'Mbiti, Religiones y filosofía africanas'],
      },
      sin: {
        1: ['La ofensa: un tabú roto, un espíritu airado. Es una ruptura del equilibrio con los poderes, no un pecado contra un Dios santo.', ''],
        2: ['La ofensa se apacigua, no se perdona: el espíritu se calma, pero la relación sigue siendo de miedo. “En el amor no hay temor, sino que el perfecto amor echa fuera el temor.”', '1 Jn 4:18'],
      },
    },

    zoroastrianism: {
      god: {
        0: ['Ahura Mazda, el Señor Sabio, mora en la luz y es bueno del todo: “la región de la luz es el lugar de Ormazd, que llaman ‘luz sin fin’”. Debajo de él aguarda el Espíritu Hostil, “en tinieblas, de entendimiento torcido y con deseo de destruir”.', 'Bundahishn 1.2–3'],
        1: ['El Señor Sabio aún no ha vencido. Puso plazo a la guerra, porque “si no concedo un tiempo de lucha, él podrá obrar de modo que seduzca a mis criaturas para sí”. El Dios de la Biblia no pacta con el mal. Del rey persa Ciro dice: “que formo la luz y creo las tinieblas… Yo Jehová soy el que hago todo esto.”', 'Bundahishn 1.17 · Is 45:1, 7'],
        2: ['Zaratustra conoció al Señor Sabio preguntándole: “¿quién, como hábil artesano, hizo las luces y las tinieblas?” En su propio himno la noche es obra de Dios tanto como el día; los libros posteriores dieron las tinieblas a su enemigo.', 'Yasna 44.5'],
        3: ['Al final vence el Señor Sabio, y “devuelve la tierra del infierno para ensanchar el mundo”. Pero un Dios que debe esperar nueve mil años para vencer nunca fue Señor de todo. “Jehová estableció en los cielos su trono, y su reino domina sobre todos.”', 'Bundahishn 30.32 · Sal 103:19'],
      },
      world: {
        0: ['El mundo es bueno, hecho por el Señor Sabio para luchar en él contra el mal. Antes de nacer, a los espíritus guardianes de los hombres se les preguntó si querían “luchar en forma corporal contra el demonio”, y aceptaron ir. En esto el zoroastrismo acierta: la materia es buena. “Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera.”', 'Bundahishn 2.10–11 · Gn 1:31'],
        1: ['El Espíritu Hostil “saltó como una serpiente del cielo a la tierra… igual que una mosca, se lanzó sobre toda la creación”. Desde entonces el bien y el mal están mezclados en todo.', 'Bundahishn 3.11–14'],
        2: ['El mundo es un campo de batalla, guardado puro con fuego, agua y ritos. Un cadáver es la peor impureza, y por eso los muertos se dejaban en torres para las aves. Jesús puso la impureza en el corazón: “lo que sale de él, eso es lo que contamina al hombre.”', 'Vendidad 3, 5–8 · Mr 7:15'],
        3: ['Todo se hace maravilloso, y “el mundo es inmortal por siempre jamás”. También los cristianos esperan una tierra nueva, pero hecha nueva por Dios, no recobrada de un rival: “He aquí, yo hago nuevas todas las cosas.”', 'Bundahishn 30.32 · Ap 21:5'],
      },
      bridge: {
        0: ['Asha es la verdad y el recto orden, como deben ser las cosas; su enemiga es la druj, la Mentira. La oración que más se reza empieza: “La santidad es el mejor de todos los bienes.” La Escritura arraiga el recto orden en Dios mismo, no en un principio junto a él: “Él es la Roca, cuya obra es perfecta, porque todos sus caminos son rectitud.”', 'Ashem Vohu · Dt 32:4'],
        1: ['El asalto golpeó cada creación por turno: el cielo, el agua, la tierra, las plantas, el primer buey, el primer hombre y el fuego. Pero el Señor Sabio había fijado su límite antes de que empezara: “sabía que, fijando ese plazo, el espíritu maligno quedaría deshecho”.', 'Bundahishn 1.18; 3'],
        2: ['Al morir, el alma llega al puente Chinvat, sobre el infierno. Una doncella sale al encuentro del alma justa: “por encima del puente Chinvat la coloca ante los mismos dioses celestiales”. Para el malvado el puente se estrecha hasta un hilo, y cae. Cristo no espera al otro lado de un puente; él es el camino: “nadie viene al Padre, sino por mí.”', 'Vendidad 19.30 · Jn 14:6'],
        3: ['El Saoshyant, el último salvador, nace al fin de los tiempos de una doncella, de la simiente de Zaratustra, que los ángeles “a su tiempo unirán… con una madre”. Es un hombre que ayuda, no Dios que salva. Unos magos, título de los sacerdotes persas, vinieron del oriente a adorar al niño Jesús.', 'Bundahishn 32.8 · Mt 2:1–11'],
      },
      self: {
        0: ['El hombre es aliado del Señor Sabio. Su espíritu guardián, su fravashi, eligió esta vida antes de nacer: los fravashis de los hombres “se pusieron de acuerdo con la sabiduría omnisciente en ir al mundo”.', 'Bundahishn 2.11'],
        1: ['El hombre nace puro, y el mal le viene de fuera. La Escritura lo halla dentro: “He aquí, en maldad he sido formado, y en pecado me concibió mi madre.”', 'Sal 51:5'],
        2: ['Los fieles prometen tres cosas cuando se les ciñe por primera vez el cordón sagrado: buenos pensamientos, buenas palabras, buenas obras. El Faravahar alado que lo rodea se lee hoy como el fravashi, su espíritu guardián, con tres filas de plumas por las tres. Esa lectura es moderna; no se sabe qué quisieron decir con él los reyes persas.', 'Relieves aqueménidas, Persépolis'],
        3: ['Todos resucitan, y se preguntan unos a otros: “¿has sido justo o malvado?” Luego “todos los hombres pasarán por ese metal fundido y quedarán puros”. Si los malvados quedan puros de todos modos, poco decidió el peso en el puente. Jesús habló de dos destinos: “E irán éstos al castigo eterno, y los justos a la vida eterna.”', 'Bundahishn 30.20–21 · Mt 25:46'],
      },
      sin: {
        0: ['Los dos espíritus son gemelos: “uno mejor y otro peor, en pensamiento, en palabra y en obra”. Si el bien y el mal son igual de antiguos, nada está por encima de ellos para decir cuál es el bueno. Muchos parsis de hoy sostienen que el mal nunca fue igual a Dios. La Escritura: “Dios es luz, y no hay ningunas tinieblas en él.”', 'Yasna 30.3 · 1 Jn 1:5'],
        1: ['La Mentira le vino al hombre de fuera. La primera pareja “exclamó que el espíritu maligno había creado el agua y la tierra”, y “por esa palabra falsa ambos se volvieron malvados”. Aun así, los libros posteriores no dan al Espíritu Hostil cuerpo propio: solo puede estropear lo que Dios hizo. Eso se acerca a la respuesta cristiana: el mal es un parásito del bien.', 'Bundahishn 15.8–9'],
        2: ['Las obras se pesan en la balanza de oro de Rashnu. A Arda Viraf se le dijo que “todo aquel cuyas buenas obras superen a su pecado en tres sroshocharanams va al cielo”. Pero nadie puede inclinar esa balanza: “JAH, si mirares a los pecados, ¿quién, oh Señor, podrá mantenerse?” La esperanza cristiana es el perdón, no un saldo a favor: “por gracia sois salvos por medio de la fe… no por obras.”', 'Arda Viraf 6 · Sal 130:3 · Ef 2:8–9'],
      },
    },

    platonism: {
      god: {
        0: ['El Bien: la más alta de las Formas, fuente del ser y de la verdad de todas las cosas. Platón lo llama “más allá del ser, por encima de él en dignidad y poder”. Es fuente de todo, pero no una persona.', 'Platón, República 509b'],
        1: ['El Bien resplandece, pero los de la caverna solo ven las sombras que hace su luz. Aun para el liberado, “en el mundo inteligible lo último que se percibe, y con dificultad, es la idea del bien”.', 'Platón, República 517b'],
        2: ['El Bien espera a ser alcanzado por el ascenso del alma; no desciende. El Dios de la Biblia sí: “el Verbo se hizo carne, y habitó entre nosotros.”', 'Jn 1:14'],
        3: ['El Bien se ve al fin, pero no puede amar. Plotino llamó al final del viaje “la huida del solo hacia el Solo”.', 'Plotino, Enéadas VI.9.11'],
      },
      world: {
        0: ['El mundo del devenir es copia de las Formas eternas, siempre cambiante. En el Timeo, el tiempo es “una imagen móvil de la eternidad”.', 'Platón, Timeo 37d'],
        1: ['La caverna: prisioneros encadenados que solo ven sombras en la pared, y para ellos “la verdad no sería otra cosa que las sombras de los objetos”. Liberado y llevado a la luz del sol, uno queda al principio deslumbrado; de vuelta en la caverna, los demás lo matarían.', 'Platón, República 514a–517a'],
        2: ['El mundo se ve al fin como lo que es: una sombra de lo real. El filósofo se aparta de él, pero Platón le manda volver para sacar a otros: “cada uno de vosotros, cuando le llegue el turno, ha de bajar.”', 'Platón, República 519d–520c'],
        3: ['Tras la muerte, toda alma es juzgada. Las no purificadas nacen otra vez: en el Fedón los glotones “pasan a asnos”. Las peores ya no vuelven: las incurables “son arrojadas al Tártaro, que es su destino merecido, y nunca salen de allí”.', 'Platón, Fedón 81e–82a; 113e · Gorgias 523–526'],
      },
      bridge: {
        0: ['Las Formas: modelos perfectos y eternos de los que las cosas de aquí son copias, conocidos por la mente, no por los sentidos. “¿Existe una justicia en sí?”, pregunta Sócrates; “Ciertamente existe.” Pero las Formas son verdad sin quien la diga: ideas perfectas, sin una mente de la que sean ideas.', 'Platón, Fedón 65d'],
        1: ['El alma conoció las Formas antes de nacer, pero las ha olvidado en el cuerpo. En el Fedro, las almas recuerdan un tiempo en que, “junto con el coro feliz, vieron la belleza resplandeciente”, antes de caer a la tierra.', 'Platón, Fedro 249e–250c'],
        2: ['El ascenso: con la razón y la disciplina el alma sube de las sombras a las Formas. La escala de Platón en el Banquete sube de un cuerpo bello a “la belleza misma”. Es para unos pocos, no para muchos.', 'Platón, Banquete 211'],
        3: ['El alma purificada deja el cuerpo para siempre, para morar con lo divino. El cristianismo espera en cambio el cuerpo resucitado y glorificado: “Se siembra cuerpo animal, resucitará cuerpo espiritual.”', '1 Co 15:42–44'],
      },
      self: {
        0: ['El hombre es un alma inmortal alojada en un cuerpo. El alma es la persona real, “semejantísima a lo divino, inmortal e inteligible”; el cuerpo es una morada pasajera, y a menudo un estorbo.', 'Platón, Fedón 80a'],
        1: ['El alma está presa en el cuerpo. Sócrates recuerda el dicho de un sabio: “que ahora estamos muertos, y que el cuerpo (soma) es nuestra tumba (sema).”', 'Platón, Gorgias 493a'],
        2: ['El filósofo recuerda lo que su alma supo una vez: “aprender es recordar”. Sócrates dijo que quienes practican rectamente la filosofía “no practican otra cosa que morir y estar muertos”.', 'Platón, Menón 81d · Fedón 64a'],
        3: ['El cuerpo se deja atrás como una tumba. La Escritura llama al cuerpo buena obra de Dios, y más: “¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros?”', '1 Co 6:19'],
      },
      sin: {
        1: ['Lo que anda mal es la ignorancia, el olvido de las Formas, no la rebelión contra un Dios santo. Sócrates: “nadie va voluntariamente hacia el mal, ni hacia lo que cree que es malo.” Conocer el bien es hacerlo.', 'Platón, Protágoras 358c–d'],
        2: ['La ignorancia se cura con el conocimiento. Pero conocer el bien no es hacerlo: “no hago el bien que quiero.”', 'Ro 7:19'],
      },
    },

    gnosticism: {
      god: {
        '*': ['El Dios verdadero, el Padre desconocido, mora muy por encima, en la Plenitud (pleroma), más allá de todo conocimiento, intocado por este mundo. No lo hizo él.', 'Apócrifo de Juan'],
        3: ['Al Dios verdadero se llega al fin, pero sigue siendo desconocido: el gnóstico se salva por saber de Dios, no por ser conocido y amado por él. Pablo puso el peso al revés: “ahora, conociendo a Dios, o más bien, siendo conocidos por Dios”.', 'Gá 4:9'],
      },
      world: {
        0: ['El mundo es materia, hecha por error: una potencia de la Plenitud, Sofía, cayó, y de su error nació un dios menor que hizo este mundo. El Evangelio de Felipe: “El mundo surgió por un error.” La creación es una catástrofe, no un regalo.', 'Apócrifo de Juan · Evangelio de Felipe 75'],
        1: ['El mundo es una cárcel, gobernada por las potestades del hacedor (arcontes), que mantienen dormidas en sus cuerpos las chispas de luz. El Evangelio de Tomás: “Quien ha llegado a conocer el mundo ha encontrado un cadáver.”', 'Evangelio de Tomás 56'],
        2: ['El mundo no merece salvarse: la salvación es escapar de él, no su renovación. Pablo dice lo contrario: “la creación misma será libertada de la esclavitud de corrupción.”', 'Ro 8:21'],
        3: ['Al final toda la materia arde, nunca se hace nueva, y con ella quienes no tienen chispa. Ireneo cuenta que los valentinianos dividían a los hombres en tres clases, espirituales, psíquicos y materiales, y que los materiales “necesariamente perecen”. Dios dice en cambio: “He aquí, yo hago nuevas todas las cosas.”', 'Ireneo, Contra las herejías I.6.1; I.7.5 · Ap 21:5'],
      },
      bridge: {
        0: ['El hacedor, Yaldabaot, es un dios menor, ignorante de la Plenitud que está sobre él. En el Apócrifo de Juan se jacta: “Yo soy un Dios celoso, y no hay otro Dios fuera de mí”, haciendo del Dios de Israel el villano.', 'Apócrifo de Juan · Is 45:5'],
        1: ['El hacedor es un carcelero, no un Padre: él y sus potestades tienen cautivo al espíritu en la materia, embriagándolo de olvido. La creación, el nacimiento y el cuerpo son parte de la prisión.', 'Apócrifo de Juan'],
        2: ['El Revelador desciende disfrazado y solo parece tener cuerpo, así que no muere de verdad. Juan responde: “todo espíritu que no confiesa que Jesucristo ha venido en carne, no es de Dios.”', '1 Jn 4:2–3'],
        3: ['La chispa vuelve a casa más allá de los guardianes, diciéndoles las palabras secretas. El maestro gnóstico Teodoto: lo que libera es “el conocimiento de quiénes éramos y en qué nos hemos convertido; dónde estábamos y adónde hemos sido arrojados”.', 'Clemente, Extractos de Teodoto 78'],
      },
      self: {
        0: ['El hombre es una chispa del Dios verdadero atrapada en el barro: espíritu de origen divino dentro de un cuerpo hecho por el dios menor. El Jesús de Tomás se asombra de “cómo esta gran riqueza ha venido a habitar en esta pobreza”.', 'Apócrifo de Juan · Evangelio de Tomás 29'],
        1: ['La chispa duerme en el cuerpo, olvidada de su origen. El Evangelio de Tomás: “Cuando os conozcáis a vosotros mismos, entonces seréis conocidos.”', 'Evangelio de Tomás 3'],
        2: ['Los pocos despiertos se salvan por saber, no por gracia: solo quienes tienen la chispa pueden despertar. Ireneo recogió su jactancia de que se salvan “no por su conducta, sino porque son espirituales por naturaleza”.', 'Ireneo, Contra las herejías I.6.2'],
        3: ['El cuerpo se desecha para siempre, como cosa sin valor, un vestido de barro. Cristo resucitó en su cuerpo (“un espíritu no tiene carne ni huesos, como veis que yo tengo”), y resucitará el nuestro.', 'Lc 24:39 · Flp 3:21'],
      },
      sin: {
        1: ['El problema es la materia, no la voluntad: el mal está en la sustancia del mundo, así que nadie tiene la culpa, y no hay nada que perdonar. Jesús lo situó en el corazón: “del corazón de los hombres, salen los malos pensamientos”.', 'Mr 7:21–23'],
        2: ['De la materia se escapa, nunca se perdona. El pecado queda intacto, porque nunca se vio como pecado: un hombre puede perder su cuerpo y conservar su orgullo. “Si decimos que no tenemos pecado, nos engañamos a nosotros mismos, y la verdad no está en nosotros.”', '1 Jn 1:8–9'],
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
