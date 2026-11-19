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
  },
};

// The note for a label in an act, or null: the act's own, else the one for every act.
export function noteFor(lang, wv, act, key) {
  const n = NOTES[lang]?.[wv]?.[key];
  if (!n) return null;
  return n[act] ?? n['*'] ?? null;
}
