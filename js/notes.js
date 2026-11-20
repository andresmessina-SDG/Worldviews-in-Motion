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
        1: ['Man broke covenant with God, and fellowship turned to fear: Adam hid among the trees. The distance is moral, not a matter of space: sin separates man from a holy God.', 'Gen 3:8–10 · Isa 59:2'],
        2: ['The eternal Son took on flesh, so that one person, fully God and fully man, could stand between a holy God and guilty people. He did not only teach the way back: he bore sin’s penalty himself and rose again.', '1 Tim 2:5 · 2 Cor 5:21'],
        3: ['What was lost in Eden is given back, and more: God’s people will see him as he is. Faith gives way to sight, and nothing will ever come between them again.', 'Rev 22:4 · 1 John 3:2'],
      },
      self: {
        0: ['Man is made in God’s image: personal, rational and moral, made to know God and to rule the earth under him. His worth does not come from his usefulness but from his Maker.', 'Gen 1:26–27'],
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
        '*': ['The LORD, the God of Abraham, Isaac and Jacob: one, holy, just and merciful, the maker of all, who acts in history. A Jew confesses him morning and evening in the Shema. He has no image, no partner and no incarnation.', 'Deut 6:4–5 · Exod 34:6–7'],
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
        2: ['Judaism holds that Moses received two Torahs at Sinai: the written books, and an oral law handed down until the rabbis set it out in the Mishnah and the Talmud. Scripture itself knows of no second law, and Jesus rebuked traditions that set God’s word aside.', 'Avot 1:1 · Mark 7:8–13'],
        3: ['Maimonides set the Jewish hope: a king of David’s line who will rebuild the temple and gather Israel. Yet Daniel and Haggai place the Messiah’s coming while the second temple still stood, and it fell in AD 70.', 'Dan 9:26 · Hag 2:9'],
      },
      self: {
        0: ['Man is made in God’s image, and every life is of great worth. Israel was chosen not because it was great, but to be a holy people and a light to the nations.', 'Gen 1:27 · Deut 7:6–8'],
        1: ['Man is not born guilty or corrupt. He has two inclinations, one good and one evil, and is free to master the evil one by study and obedience. Scripture speaks more darkly of the human heart.', 'Gen 4:7; 8:21 · Ps 51:5'],
        2: ['When a Jew sins, he returns to God (teshuvah) by regret, confession and a changed life, above all on the Day of Atonement. God receives the penitent, but the sacrifice the Law appointed is gone.', 'Hos 14:1–2'],
        3: ['The resurrection of the dead is one of Judaism’s thirteen principles of faith. Israel, scattered among the nations, will be brought home and raised to life.', 'Ezek 37:12–14 · Dan 12:2'],
      },
      sin: {
        1: ['Sin is a wrong act, not a fallen nature. The evil inclination is a drive to be tamed and even put to good use, and the Torah is its remedy. But a drive to be tamed needs no saviour.', 'Gen 4:7 · Kiddushin 30b'],
        2: ['Without the temple there is no altar, so the rabbis taught that prayer, repentance and charity take the place of the offerings. Yet the Law taught that it is the blood that makes atonement.', 'Lev 17:11 · Heb 10:4'],
      },
    },

    islam: {
      god: {
        '*': ['Allah, the one God: absolutely one, with no partner, no son and no equal, merciful and almighty, wholly beyond his creation. To confess his oneness (tawhid) is the heart of Islam.', 'Quran 112'],
        1: ['To set up partners beside God (shirk) is the one sin he will not forgive. In the Quran’s eyes this includes calling Jesus the Son of God, and the Trinity itself.', 'Quran 4:48; 5:73'],
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
        2: ['Muslims hold the Quran to be God’s own speech, uncreated, sent down to Muhammad through Gabriel over twenty-three years: his final word to mankind. It reveals his will and his law, but between God and man it offers a book to obey, with no mediator and no atonement.', 'Quran 2:2; 42:51'],
        3: ['On the Last Day each person’s deeds are weighed: heavy scales lead to the Garden, light ones to the Fire. Even Muhammad said his deeds would not admit him unless God covered him with mercy.', 'Quran 101:6–9 · Bukhari 6467'],
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
        2: ['God is known only by inference, from the design of the world, as a watchmaker is inferred from a watch. But a God known only as a conclusion is a hypothesis, not one who can be loved or trusted.', 'Paley, Natural Theology'],
        3: ['God is further off than ever: if he never speaks, nothing can be known of what he thinks of us, or of what comes after death.', 'Heb 1:1–2'],
      },
      world: {
        '*': ['The world is a vast machine, running on fixed laws that no miracle ever breaks: Newton’s clockwork, wound up once by its Maker.', 'Newton, Principia'],
        1: ['Alexander Pope wrote that “whatever is, is right”: the world is as good as it can be, and evil only seems so from where we stand. Then nothing is really wrong, and nothing needs mending.', 'Pope, An Essay on Man'],
        2: ['Nature is man’s only scripture: from its laws he learns God’s existence and his own duty. This is “natural religion”, which needs no revelation.', 'Tindal, Christianity as Old as the Creation'],
        3: ['The machine runs on, with no end in view and no day of reckoning, for its Maker has said nothing of either.', ''],
      },
      bridge: {
        '*': ['Deism denies that God has spoken: no prophets, no miracles, no scripture and no incarnation. Whatever can be known of God, reason finds out. But if God has not spoken, his mind and will remain closed to us.', 'Heb 1:1–2'],
        2: ['Man climbs toward God by reason alone. Reason is God’s gift, but on the Bible’s account it is darkened by sin, and men “became futile in their thinking”.', 'Rom 1:21'],
        3: ['God has promised nothing: neither forgiveness, nor resurrection, nor a life to come. A deist can hope, but he has no word to rest his hope on.', ''],
      },
      self: {
        '*': ['Man is a rational being, able to discover by the light of nature that God exists and what is right. He needs no revelation and no redeemer.', ''],
        1: ['What holds man back is not a sinful heart but ignorance, superstition and the priests who keep him in the dark. Teach him, and he will do well.', 'Paine, The Age of Reason'],
        3: ['The deist hopes that a just God will reward the good after death, but cannot be sure there is a life to come at all.', ''],
      },
      sin: {
        1: ['Deism has no fall: wrong comes from ignorance and superstition, and the cure is education and reason. Yet the most enlightened men are not thereby the most good.', 'Jer 17:9'],
      },
    },

    mtd: {
      god: {
        '*': ['A God who made the world and watches over it, but is not much involved in daily life. Sociologists Christian Smith and Melinda Denton named this the working faith of many young Americans, often within churches.', 'Smith & Denton, Soul Searching'],
        1: ['God is out of mind until something goes wrong. He asks for nothing: no worship, no obedience, no repentance. He is there to be fetched in an emergency, and is forgotten again when it passes.', ''],
        2: ['God is on call, like a butler or a therapist: there to solve problems and help people feel better. Such a God serves man’s wishes; he is not the Lord.', 'Isa 45:9'],
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
        '*': ['People are basically good. The goal of life is to be happy and feel good about oneself, and to be nice and fair to others.', ''],
        1: ['Even when people do wrong, they are still good underneath; what has gone wrong is how they feel. Scripture says, “None is righteous, no, not one.”', 'Rom 3:10'],
        3: ['Good people go to heaven when they die, and nearly everyone is good enough by their own measure. But God’s measure is his own holiness.', 'Rom 3:23'],
      },
      sin: {
        1: ['What is wrong is unhappiness: stress, hurt feelings and low self-esteem. There is no sin against God, only feelings to be soothed.', ''],
        2: ['Unhappiness is soothed, and nothing is forgiven, because nothing needed forgiving. So the cross has no place, and grace becomes needless.', 'Gal 2:21'],
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
        1: ['El hombre quebrantó el pacto con Dios, y la comunión se volvió temor: Adán se escondió entre los árboles. La distancia es moral, no de lugar: el pecado separa al hombre de un Dios santo.', 'Gn 3:8–10 · Is 59:2'],
        2: ['El Hijo eterno se hizo carne, para que una sola persona, plenamente Dios y plenamente hombre, se interpusiera entre un Dios santo y un pueblo culpable. No solo enseñó el camino de vuelta: cargó él mismo con la pena del pecado y resucitó.', '1 Ti 2:5 · 2 Co 5:21'],
        3: ['Lo que se perdió en el Edén se devuelve, y aún más: el pueblo de Dios lo verá tal como es. La fe da paso a la vista, y nada volverá a interponerse entre ellos.', 'Ap 22:4 · 1 Jn 3:2'],
      },
      self: {
        0: ['El hombre está hecho a imagen de Dios: personal, racional y moral, creado para conocer a Dios y gobernar la tierra bajo él. Su valor no viene de su utilidad, sino de su Hacedor.', 'Gn 1:26–27'],
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
        '*': ['El SEÑOR, el Dios de Abraham, Isaac y Jacob: uno, santo, justo y misericordioso, Hacedor de todo, que actúa en la historia. El judío lo confiesa mañana y tarde en el Shemá. No tiene imagen, ni asociado, ni encarnación.', 'Dt 6:4–5 · Éx 34:6–7'],
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
        2: ['El judaísmo sostiene que Moisés recibió dos Torás en el Sinaí: los libros escritos y una ley oral transmitida hasta que los rabinos la fijaron en la Mishná y el Talmud. La Escritura misma no conoce una segunda ley, y Jesús reprendió las tradiciones que dejaban de lado la palabra de Dios.', 'Avot 1:1 · Mr 7:8–13'],
        3: ['Maimónides fijó la esperanza judía: un rey del linaje de David que reconstruirá el templo y reunirá a Israel. Pero Daniel y Hageo sitúan la venida del Mesías cuando el segundo templo aún estaba en pie, y cayó en el año 70.', 'Dn 9:26 · Hag 2:9'],
      },
      self: {
        0: ['El hombre está hecho a imagen de Dios, y toda vida tiene gran valor. Israel fue escogido no por ser grande, sino para ser un pueblo santo y luz de las naciones.', 'Gn 1:27 · Dt 7:6–8'],
        1: ['El hombre no nace culpable ni corrompido. Tiene dos inclinaciones, una buena y otra mala, y es libre de dominar la mala con el estudio y la obediencia. La Escritura habla con más gravedad del corazón humano.', 'Gn 4:7; 8:21 · Sal 51:5'],
        2: ['Cuando el judío peca, vuelve a Dios (teshuvá) con pesar, confesión y una vida cambiada, sobre todo en el Día de la Expiación. Dios recibe al arrepentido, pero el sacrificio que la Ley estableció ya no existe.', 'Os 14:1–2'],
        3: ['La resurrección de los muertos es uno de los trece principios de fe del judaísmo. Israel, disperso entre las naciones, será traído a casa y devuelto a la vida.', 'Ez 37:12–14 · Dn 12:2'],
      },
      sin: {
        1: ['El pecado es un acto malo, no una naturaleza caída. La mala inclinación es un impulso que hay que domar y aun aprovechar, y la Torá es su remedio. Pero un impulso que se doma no necesita un salvador.', 'Gn 4:7 · Kidushín 30b'],
        2: ['Sin templo no hay altar, así que los rabinos enseñaron que la oración, el arrepentimiento y la caridad ocupan el lugar de las ofrendas. Pero la Ley enseñaba que es la sangre la que hace expiación.', 'Lv 17:11 · He 10:4'],
      },
    },

    islam: {
      god: {
        '*': ['Alá, el único Dios: absolutamente uno, sin asociado, sin hijo y sin igual, misericordioso y todopoderoso, del todo por encima de su creación. Confesar su unicidad (tawhid) es el corazón del islam.', 'Corán 112'],
        1: ['Asociar a otros con Dios (shirk) es el único pecado que no perdona. A ojos del Corán esto incluye llamar a Jesús Hijo de Dios, y la Trinidad misma.', 'Corán 4:48; 5:73'],
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
        2: ['Los musulmanes sostienen que el Corán es la palabra misma de Dios, increada, revelada a Mahoma por medio de Gabriel a lo largo de veintitrés años: su palabra final a la humanidad. Revela su voluntad y su ley, pero entre Dios y el hombre ofrece un libro que obedecer, sin mediador y sin expiación.', 'Corán 2:2; 42:51'],
        3: ['En el Último Día se pesan las obras de cada uno: la balanza pesada lleva al Jardín, la ligera al Fuego. Aun Mahoma dijo que sus obras no le darían entrada si Dios no lo cubría con su misericordia.', 'Corán 101:6–9 · Bujari 6467'],
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
        2: ['A Dios solo se le conoce por inferencia, a partir del diseño del mundo, como se infiere un relojero de un reloj. Pero un Dios conocido solo como conclusión es una hipótesis, no alguien a quien se pueda amar o en quien confiar.', 'Paley, Teología natural'],
        3: ['Dios está más lejos que nunca: si nunca habla, nada puede saberse de lo que piensa de nosotros, ni de lo que viene tras la muerte.', 'He 1:1–2'],
      },
      world: {
        '*': ['El mundo es una inmensa máquina que funciona con leyes fijas que ningún milagro rompe: el mecanismo de relojería de Newton, al que su Hacedor dio cuerda una vez.', 'Newton, Principia'],
        1: ['Alexander Pope escribió que “todo lo que es, está bien”: el mundo es tan bueno como puede ser, y el mal solo lo parece desde donde estamos. Entonces nada está realmente mal, y nada necesita arreglo.', 'Pope, Ensayo sobre el hombre'],
        2: ['La naturaleza es la única escritura del hombre: de sus leyes aprende que Dios existe y cuál es su deber. Es la “religión natural”, que no necesita revelación.', 'Tindal, El cristianismo tan antiguo como la creación'],
        3: ['La máquina sigue funcionando, sin fin a la vista ni día de rendir cuentas, porque su Hacedor no ha dicho nada de ninguno de los dos.', ''],
      },
      bridge: {
        '*': ['El deísmo niega que Dios haya hablado: ni profetas, ni milagros, ni escritura, ni encarnación. Lo que pueda saberse de Dios lo descubre la razón. Pero si Dios no ha hablado, su mente y su voluntad nos quedan cerradas.', 'He 1:1–2'],
        2: ['El hombre sube hacia Dios solo con la razón. La razón es un don de Dios, pero según la Biblia está oscurecida por el pecado, y los hombres “se envanecieron en sus razonamientos”.', 'Ro 1:21'],
        3: ['Dios no ha prometido nada: ni perdón, ni resurrección, ni vida venidera. El deísta puede esperar, pero no tiene palabra en que apoyar su esperanza.', ''],
      },
      self: {
        '*': ['El hombre es un ser racional, capaz de descubrir por la luz natural que Dios existe y qué es lo justo. No necesita revelación ni redentor.', ''],
        1: ['Lo que frena al hombre no es un corazón pecador sino la ignorancia, la superstición y los sacerdotes que lo mantienen a oscuras. Enséñale, y obrará bien.', 'Paine, La edad de la razón'],
        3: ['El deísta espera que un Dios justo premie a los buenos tras la muerte, pero no puede estar seguro de que haya vida venidera alguna.', ''],
      },
      sin: {
        1: ['El deísmo no tiene caída: el mal viene de la ignorancia y la superstición, y la cura es la educación y la razón. Pero los hombres más ilustrados no son por ello los más buenos.', 'Jer 17:9'],
      },
    },

    mtd: {
      god: {
        '*': ['Un Dios que hizo el mundo y vela por él, pero apenas interviene en la vida diaria. Los sociólogos Christian Smith y Melinda Denton llamaron así a la fe real de muchos jóvenes estadounidenses, a menudo dentro de las iglesias.', 'Smith y Denton, Soul Searching'],
        1: ['Dios está olvidado hasta que algo sale mal. No pide nada: ni culto, ni obediencia, ni arrepentimiento. Se le busca en una urgencia, y se le vuelve a olvidar cuando pasa.', ''],
        2: ['Dios está de guardia, como un mayordomo o un terapeuta: para resolver problemas y ayudar a sentirse mejor. Un Dios así sirve a los deseos del hombre; no es el Señor.', 'Is 45:9'],
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
        '*': ['La gente es buena en el fondo. La meta de la vida es ser feliz y sentirse bien con uno mismo, y ser amable y justo con los demás.', ''],
        1: ['Aun cuando la gente obra mal, sigue siendo buena por dentro; lo que ha fallado es cómo se siente. La Escritura dice: “No hay justo, ni aun uno.”', 'Ro 3:10'],
        3: ['La gente buena va al cielo al morir, y casi todos son lo bastante buenos según su propia medida. Pero la medida de Dios es su propia santidad.', 'Ro 3:23'],
      },
      sin: {
        1: ['Lo que falla es la infelicidad: el estrés, los sentimientos heridos y la baja autoestima. No hay pecado contra Dios, solo sentimientos que aliviar.', ''],
        2: ['La infelicidad se alivia y nada se perdona, porque nada necesitaba perdón. Así la cruz no tiene lugar, y la gracia se vuelve innecesaria.', 'Gá 2:21'],
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
