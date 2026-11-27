// The site in Spanish. main.js loads this file only when Spanish is chosen, and lays its words over the English
// ones in worldviews.js and catalogue.js before the page is first drawn, so every other file works unchanged.
// Each worldview gives its name, tagline and question, then for each act in order: its name, its words, and its
// labels. An act must have the same labels as in English (see check below), since the painting is laid out for them.
// The same rules hold as for the English: plain words, short sentences, act names short.

export const UI = {
  site: 'Cosmovisiones en movimiento',
  description: 'Una acuarela animada de las grandes cosmovisiones del mundo, que empieza en el teísmo cristiano y sigue las preguntas que se alejan de él.',
  menu: 'Cosmovisiones',
  acts: 'Los cuatro actos',
  painting: 'La pintura.',
  pencil: 'aún sin pintar',
  nogl: 'Esta pintura necesita WebGL, que tu navegador tiene desactivado.',
  language: 'Idioma',
};

// where a long word in an act's name may break on a phone (see BREAKS in main.js)
export const BREAKS = 'Re-den-ción Re-lo-je-ro Ig-no-ran-cia Su-pers-ti-ción Im-per-ma-nen-cia Apa-ci-gua-mien-to De-cons-truc-ción '
  + 'Au-to-ex-pre-sión Rea-li-za-ción Des-co-ne-xión Co-no-ci-mien-to Li-be-ra-ción Su-fri-mien-to Ex-tin-ción Alie-na-ción '
  + 'Re-vo-lu-ción Co-mu-nis-mo Re-pre-sión Ina-ca-ba-do Sin-gu-la-ri-dad As-cen-sión Des-per-tar An-te-pa-sa-dos Su-mi-sión '
  + 'Pro-gre-so Mo-vi-mien-to Ple-ni-tud Elec-ción Arro-ja-do Ab-sur-do Re-tor-no Bon-da-do-so Crea-ción In-cier-to Ve-ni-de-ro '
  + 'Sa-gra-da Me-mo-ria Des-or-den Cul-ti-vo Pri-sión Ca-ver-na As-cen-so Exi-lio Sen-ti-do Re-me-dio Mun-dos Sen-de-ro Re-no-va-ción Ti-nie-blas';

export const NAMES = {
  christian: 'Teísmo cristiano',
  judaism: 'Judaísmo',
  islam: 'Islam',
  deism: 'Deísmo',
  mtd: 'Deísmo terapéutico moralista',
  naturalism: 'Naturalismo',
  humanism: 'Humanismo secular',
  nihilism: 'Nihilismo',
  existentialism: 'Existencialismo',
  postmodernism: 'Posmodernismo',
  marxism: 'Marxismo',
  individualism: 'Individualismo expresivo',
  transhumanism: 'Transhumanismo',
  'new-age': 'Nueva Era',
  'neo-paganism': 'Neopaganismo',
  'hindu-monism': 'Monismo hindú',
  buddhism: 'Budismo',
  taoism: 'Taoísmo',
  confucianism: 'Confucianismo',
  animism: 'Animismo',
  zoroastrianism: 'Zoroastrismo',
  platonism: 'Platonismo',
  gnosticism: 'Gnosticismo',
};

const TRINE = ['El Dios trino', 'Padre, Hijo y Espíritu Santo'];
const NONE = 'Nada arriba';

const TEXT = {
  christian: {
    tagline: 'Dios creó el mundo, y descendió para salvarlo.',
    q: '¿Y si el Mesías aún no ha venido?',
    acts: [
      ['Creación', 'Dios creó el mundo de la nada y vio que era bueno. Creó al hombre a su imagen y habló con él.', {
        god: TRINE,
        world: ['La creación', 'Distinta de Dios, y buena'],
        bridge: ['Dios habla', 'Su palabra y su pacto'],
        self: ['El hombre', 'Hecho a imagen de Dios'],
      }],
      ['Caída', 'El hombre se rebeló contra Dios. El pecado corrompió su corazón y trajo muerte y ruina al mundo.', {
        god: TRINE,
        world: ['La creación', 'Aún buena, pero dañada'],
        bridge: ['Comunión rota', 'El hombre se esconde de Dios'],
        self: ['El hombre', 'Aún imagen de Dios, ya pecador'],
        sin: ['Pecado', 'Rebelión en el corazón'],
      }],
      ['Redención', 'Dios descendió. El Hijo se hizo hombre, murió por los pecadores y resucitó. Todo aquel que cree en él es perdonado.', {
        god: TRINE,
        world: ['La creación', 'Amada, y en restauración'],
        bridge: ['Cristo el Mediador', 'Dios desciende al hombre'],
        self: ['El hombre', 'Salvo por gracia, mediante la fe'],
        sin: ['Pecado', 'Pagado en la cruz'],
      }],
      ['Nueva creación', 'Cristo volverá, resucitará a los muertos y juzgará al mundo. Quienes lo rechazaron serán condenados; su pueblo vivirá con Dios en un mundo renovado.', {
        god: TRINE,
        world: ['La nueva creación', 'Sin pecado ni muerte'],
        bridge: ['Cara a cara', 'Verán su rostro'],
        self: ['El pueblo de Dios', 'Resucitado, y para siempre con él'],
      }],
    ],
  },

  judaism: {
    tagline: 'Un solo Dios escogió a un pueblo, y le dio su ley.',
    q: '¿Y si Dios habló otra vez, por un último profeta?',
    acts: [
      ['Creación', 'El SEÑOR, el único Dios, creó un mundo bueno e hizo al hombre a su imagen. Escogió a Abraham, y por medio de él, a Israel, y se comprometió con ellos por pacto.', {
        god: ['El SEÑOR', '“El SEÑOR uno es”'],
        world: ['La creación', 'Hecha por Dios, y buena'],
        bridge: ['El pacto', 'Con Abraham y sus hijos'],
        self: ['El hombre', 'Hecho a imagen de Dios'],
      }],
      ['Pecado y exilio', 'El hombre nace con la inclinación mala; la buena llega después, y es libre de elegir. Israel quebrantó el pacto y fue desterrado; el templo cayó y cesaron los sacrificios.', {
        god: ['El SEÑOR', 'Fiel a su pacto'],
        world: ['La creación', 'Buena, pero Israel está en el exilio'],
        bridge: ['El pacto', 'Roto por Israel, guardado por Dios'],
        self: ['El hombre', 'Libre de escoger el bien'],
        sin: ['Pecado', 'La mala inclinación, no una naturaleza caída'],
      }],
      ['Torá', 'Dios dio a Moisés en el Sinaí la Torá escrita y la oral, y el Talmud recoge la oral. El judío vuelve a Dios por el arrepentimiento, la oración y la caridad, que ahora sustituyen a los sacrificios.', {
        god: ['El SEÑOR', 'Perdona al arrepentido'],
        world: ['La creación', 'Santificada por los mandamientos'],
        bridge: ['La Torá, escrita y oral', 'Un yugo que nadie ha podido llevar'],
        self: ['Israel', 'Vuelve a Dios por el arrepentimiento'],
        sin: ['Pecado', 'Sin sacrificio por él desde el año 70 d. C.'],
      }],
      ['El mundo venidero', 'Vendrá el Mesías, un hombre del linaje de David. Reunirá a los exiliados, reconstruirá el templo y traerá la paz. Los muertos resucitarán y serán juzgados, y los justos entrarán en el mundo venidero.', {
        god: ['El SEÑOR', 'Rey sobre toda la tierra'],
        world: ['El mundo venidero', 'El templo reconstruido, y la paz'],
        bridge: ['El Mesías', 'Aún esperado, aunque el templo ya cayó'],
        self: ['Israel', 'Reunido en su tierra, y resucitado'],
      }],
    ],
  },

  islam: {
    tagline: 'No hay más dios que Dios, y el hombre debe someterse a él.',
    q: '¿Y si Dios nunca habló?',
    acts: [
      ['Creación', 'No hay más dios que Dios. Es uno, sin asociados y sin hijo. Hizo el mundo con su orden, “¡Sé!”, y puso al hombre en la tierra como su lugarteniente.', {
        god: ['Alá', '“No engendra ni fue engendrado”'],
        world: ['La creación', 'Hecha por su palabra, “¡Sé!”'],
        self: ['El hombre', 'Lugarteniente de Dios en la tierra'],
      }],
      ['Olvido', 'Adán desobedeció y Dios lo perdonó, así que ningún pecado se hereda. El hombre nace puro, pero débil y olvidadizo. El peor pecado es asociar otros a Dios.', {
        god: ['Alá', 'Todo lo perdona, salvo el shirk'],
        world: ['La creación', 'Llena de señales, desatendidas'],
        self: ['El hombre', 'Nace puro, pero débil'],
        sin: ['Olvido', 'Una debilidad, no una naturaleza caída'],
      }],
      ['Sumisión', 'Dios envió profetas, y el último fue Mahoma, con el Corán. Jesús fue un profeta, no el Hijo de Dios, y no fue crucificado. El hombre debe someterse a la ley de Dios y cumplir los cinco pilares.', {
        god: ['Alá', 'Revela su voluntad, no a sí mismo'],
        world: ['La creación', 'Sometida a la ley de Dios'],
        bridge: ['El Corán', 'La palabra hecha libro, no carne'],
        self: ['El musulmán', 'Salvo por someterse, si Dios quiere'],
        sin: ['Olvido', 'Perdonado, sin expiación'],
      }],
      ['Juicio', 'En el Último Día los muertos resucitarán y sus obras serán pesadas. Los que Dios acepte entrarán en el Jardín, y los demás irán al Fuego. Nadie puede saber cuál le espera.', {
        god: ['Alá', 'Juez, pero nunca Padre'],
        world: ['El Jardín', 'Para los que Dios acepta'],
        bridge: ['La balanza', 'Obras pesadas, y nadie está seguro'],
        self: ['El hombre', 'Espera que su bien pese más que su mal'],
      }],
    ],
  },

  deism: {
    tagline: 'Dios dio cuerda al reloj y lo dejó andar.',
    q: '¿Y si el Dios lejano acude cuando lo necesitamos?',
    acts: [
      ['El Relojero', 'Dios hizo el mundo, lo puso en marcha con leyes fijas y se apartó. No habla ni actúa en él.', {
        god: ['El Creador', 'Lejano y callado'],
        world: ['El mundo', 'Una máquina de leyes fijas'],
        bridge: ['Sin palabra de lo alto', 'Dios no ha hablado'],
        self: ['El hombre', 'Capaz de razonar'],
      }],
      ['Ignorancia', 'Nada está roto en la raíz. A los hombres los frenan la ignorancia y la superstición.', {
        god: ['El Creador', 'Lejano y callado'],
        world: ['El mundo', '“Todo lo que es, está bien”'],
        bridge: ['Sin palabra de lo alto', 'Dios no ha hablado'],
        self: ['El hombre', 'Su razón, nublada'],
        sin: ['Ignorancia', 'Y la superstición'],
      }],
      ['Razón', 'Bastan la razón y la buena conducta. El hombre estudia la naturaleza y deduce por sí mismo su deber.', {
        god: ['El Creador', 'Conocido solo por inferencia'],
        world: ['El mundo', 'Sus leyes enseñan al hombre'],
        bridge: ['La razón', 'El hombre sube razonando'],
        self: ['El hombre', 'Guiado por su propia luz'],
      }],
      ['Un fin incierto', 'Quizá los buenos sean premiados tras la muerte, y los malos castigados. Pero Dios no ha prometido nada, así que nadie puede estar seguro.', {
        god: ['El Creador', 'Más lejos, y aún callado'],
        world: ['El mundo', 'Sigue su tictac'],
        bridge: ['Ninguna promesa', 'Nada se ha dicho'],
        self: ['El hombre', 'Espera un premio'],
      }],
    ],
  },

  mtd: {
    tagline: 'Sé amable, sé feliz, y llama a Dios cuando lo necesites.',
    q: '¿Y si no hay nadie a quien llamar?',
    acts: [
      ['Un Dios bondadoso', 'Existe un Dios que hizo el mundo y vela por él. Quiere que la gente sea buena, amable y justa con los demás.', {
        god: ['Dios', 'Amable, y girando en torno al hombre'],
        world: ['El mundo', 'Bajo su mirada'],
        self: ['El hombre', 'Bueno en el fondo'],
      }],
      ['Sentirse mal', 'Nadie es malo de verdad. Lo que falla es la infelicidad: el estrés, los sentimientos heridos y la baja autoestima.', {
        god: ['Dios', 'Olvidado hasta que haga falta'],
        world: ['El mundo', 'Estresante'],
        self: ['El hombre', 'Aún bueno, pero infeliz'],
        sin: ['Infelicidad', 'Sentimientos heridos, no pecado'],
      }],
      ['Ayuda', 'Dios no tiene por qué intervenir en la vida diaria, pero se le puede llamar para resolver un problema. El fin de la vida es ser feliz y sentirse bien con uno mismo.', {
        god: ['Dios', 'De guardia, como un mayordomo'],
        world: ['El mundo', 'Soportable otra vez'],
        bridge: ['La oración', 'Una llamada de auxilio'],
        self: ['El hombre', 'Contento consigo mismo'],
        sin: ['Infelicidad', 'Aliviada, sin nada que perdonar'],
      }],
      ['El cielo', 'La gente buena va al cielo al morir, y casi todos son lo bastante buenos.', {
        god: ['Dios', 'Aún a su servicio'],
        world: ['El mundo', 'Dejado atrás'],
        self: ['La gente buena', 'Buena según su propia medida'],
      }],
    ],
  },

  naturalism: {
    tagline: 'La materia es todo lo que hay, y nadie la hizo.',
    q: '¿Y si el hombre puede ser bueno sin Dios?',
    acts: [
      ['Solo materia', 'El cosmos es todo lo que hay. Nadie lo hizo, y nada existe fuera de él.', {
        god: [NONE, 'Ni Dios ni otro mundo'],
        world: ['El cosmos', 'Materia y energía, y nada más'],
        bridge: ['Un sistema cerrado', 'Todo suceso tiene una causa natural'],
        self: ['El hombre', 'Hecho por el azar y el tiempo'],
      }],
      ['Sufrimiento', 'El mundo no ha caído. El dolor y la muerte son, sin más, como funciona la naturaleza. El bien y el mal son ideas humanas.', {
        god: [NONE, 'Nadie a quien culpar'],
        world: ['El cosmos', 'Indiferente'],
        bridge: ['Un sistema cerrado', 'Todo suceso tiene una causa natural'],
        self: ['El hombre', 'Sufre y muere'],
        sin: ['Sufrimiento', 'Nadie lo quiso'],
      }],
      ['Ciencia', 'El hombre solo puede contar consigo mismo. La ciencia explica la naturaleza, y la tecnología la pone a trabajar.', {
        god: [NONE, 'Nadie a quien pedir'],
        world: ['El cosmos', 'Estudiado, medido y usado'],
        bridge: ['Aún cerrado', 'Ninguna ayuda viene de fuera'],
        self: ['El hombre', 'Su razón, un producto más de la naturaleza'],
      }],
      ['Extinción', 'Cada persona muere y desaparece. Con el tiempo las estrellas se apagan y el cosmos se enfría.', {
        god: [NONE, 'Nadie que recuerde'],
        world: ['El cosmos', 'Frío, oscuro y agotándose'],
        bridge: ['Ninguna meta', 'La historia no va a ninguna parte'],
        self: ['El hombre', 'Aquí por poco, y luego nada'],
      }],
    ],
  },

  humanism: {
    tagline: 'El hombre no necesita a Dios: la razón puede hacer bueno el mundo.',
    q: '¿Y si nada de esto importa?',
    acts: [
      ['La medida de todo', 'El cosmos es todo lo que hay, y nadie lo hizo. El hombre es su mejor producto, hecho por el azar a lo largo de las eras, y el único capaz de entenderlo.', {
        god: [NONE, '“Ninguna deidad nos salvará”'],
        world: ['El cosmos', 'Materia, y nada más'],
        self: ['El hombre', 'De gran valor, aunque hecho por azar'],
      }],
      ['Superstición', 'Nada falla en el fondo del hombre. El problema está en la ignorancia, la pobreza y el prejuicio, y sobre todo en la religión, que impide pensar por uno mismo.', {
        god: [NONE, 'Un cuento que el hombre deja atrás'],
        world: ['El cosmos', 'Ni a favor ni en contra de nosotros'],
        self: ['El hombre', 'Bueno en el fondo, pero frenado'],
        sin: ['Superstición', 'La culpa está fuera del hombre'],
      }],
      ['Progreso', 'La razón y la ciencia harán libre al hombre. Con educación, tecnología y buenas leyes, la gente puede construir un mundo mejor y elegir sus propios valores.', {
        god: [NONE, '“Debemos salvarnos nosotros mismos”'],
        world: ['El cosmos', 'No nos dice ningún “debes”'],
        bridge: ['El progreso', 'Siempre hacia arriba, por su propio esfuerzo'],
        self: ['El hombre', 'Elige sus propios valores'],
      }],
      ['Solo esta vida', 'Cada persona muere y desaparece, y solo sigue viva en lo que deja tras de sí. En un futuro lejano el sol se apagará y se llevará consigo a la humanidad.', {
        god: [NONE, 'Nadie que recuerde a la humanidad'],
        world: ['El cosmos', 'Enfriándose y agotándose'],
        bridge: ['El progreso', 'Al final, una escalera a ninguna parte'],
        self: ['El hombre', 'Recordado un tiempo, y luego olvidado'],
      }],
    ],
  },

  nihilism: {
    tagline: 'Ningún Dios arriba, y ningún sentido abajo.',
    q: '¿Y si el hombre crea su propio sentido?',
    acts: [
      ['Un accidente', 'El cosmos está aquí sin razón alguna, y el hombre también. Nadie quiso ni lo uno ni lo otro.', {
        god: [NONE, 'Ni Dios ni propósito'],
        world: ['El cosmos', 'Aquí sin razón alguna'],
        bridge: ['El sentido se escurre', 'Nada queda que lo sostenga'],
        self: ['El hombre', 'Un accidente'],
      }],
      ['Sin sentido', 'Nada es bueno ni malo, y nada vale más que otra cosa. Hasta la verdad está en duda.', {
        god: [NONE, 'Nadie que juzgue'],
        world: ['El cosmos', 'Vacío de valor'],
        bridge: ['El sentido se escurre', 'Nada queda que lo sostenga'],
        self: ['El hombre', 'No puede fiarse de su propia mente'],
      }],
      ['Sin remedio', 'Nada está mal, así que nada puede arreglarse. Pocos logran vivir como si esto fuera cierto.', {
        god: [NONE, 'Nadie que salve'],
        world: ['El cosmos', 'No ofrece nada'],
        bridge: ['Sin salida', 'Y ningún lugar adonde ir'],
        self: ['El hombre', 'Vacío, sin razón para actuar'],
      }],
      ['La nada', 'La muerte acaba con toda vida, y el cosmos no lo notará. Da igual que alguien haya vivido.', {
        god: [NONE, 'Nada por delante'],
        world: ['El cosmos', 'Vaciado'],
        bridge: ['Todo se escurre', 'Nada se guarda'],
        self: ['El hombre', 'Se fue, y no importó'],
      }],
    ],
  },

  existentialism: {
    tagline: 'El mundo no tiene sentido, así que el hombre debe darse el suyo.',
    q: '¿Y si hasta el yo es obra del lenguaje?',
    acts: [
      ['Arrojado', 'El hombre se encuentra en un mundo sin sentido. Primero existe, y lo que es está aún por decidir.', {
        god: [NONE, 'Ningún Dios que dé un propósito'],
        world: ['El mundo', 'Sólido, callado y absurdo'],
        self: ['El hombre', 'La existencia precede a la esencia'],
      }],
      ['Lo absurdo', 'El hombre quiere sentido y el mundo no tiene ninguno que darle. Vivir según las reglas de otros solo oculta el hecho.', {
        god: [NONE, 'Nadie que responda'],
        world: ['El mundo', 'No responde nada'],
        self: ['El hombre', 'Libre, angustiado y solo'],
        sin: ['Mala fe', 'Huir de su propia libertad'],
      }],
      ['Elección', 'Debe elegir, y sus elecciones lo hacen lo que es. El sentido que tenga su vida, se lo da él.', {
        god: [NONE, 'Nadie que lo corrija'],
        world: ['El mundo', 'Aún callado'],
        bridge: ['Un sentido hecho por él', 'Cualquier elección vale, si es de veras suya'],
        self: ['El hombre', 'Llega a ser lo que elige'],
      }],
      ['Muerte', 'La muerte acaba con lo que hacía de sí mismo. Su sentido no dura más que él.', {
        god: [NONE, 'Nadie que guarde su obra'],
        world: ['El mundo', 'Sigue igual'],
        bridge: ['Un sentido hecho por él', 'Se apaga cuando él se apaga'],
        self: ['El hombre', 'Su obra acaba con él'],
      }],
    ],
  },

  postmodernism: {
    tagline: 'No hay verdad, solo relatos, y todo relato sirve al poder.',
    q: '¿Y si un relato sí es verdad: la lucha de clases?',
    acts: [
      ['Solo relatos', 'Nadie puede conocer la realidad tal como es. El lenguaje no describe el mundo: lo construye. Cada cultura vive dentro de sus propios relatos, y ninguno está por encima de los demás.', {
        god: [NONE, 'Ningún Verbo, solo palabras'],
        world: ['La realidad', 'Oculta tras nuestras palabras'],
        bridge: ['El lenguaje', 'Construye el mundo que parece mostrar'],
        self: ['El hombre', 'Hecho por los relatos que cuentan de él'],
      }],
      ['Poder', 'Toda pretensión de verdad es una lucha por el poder. Los grandes relatos de Dios, la razón y el progreso se han usado para acallar a quienes ven el mundo de otro modo.', {
        god: [NONE, 'Un relato más, contado por poder'],
        world: ['La realidad', 'Pintada con los colores de quien manda'],
        bridge: ['El gran relato', 'Llamado máscara del poder'],
        self: ['El hombre', 'Moldeado por los que mandan'],
        sin: ['Opresión', 'Llamada mala, aunque nada lo es'],
      }],
      ['Deconstrucción', 'Hay que desarmar los grandes relatos y exponer el poder que hay detrás. Que cada grupo cuente su propio relato, y que ninguno pretenda ser verdad para todos.', {
        god: [NONE, 'Verdad con minúscula'],
        world: ['La realidad', 'Lo que un grupo acuerde'],
        bridge: ['La deconstrucción', 'Solo perdona su propio relato'],
        self: ['El hombre', 'Libre de contar su propio relato'],
        sin: ['Opresión', 'Denunciada, sin norma con que juzgarla'],
      }],
      ['Juego sin fin', 'No hay capítulo final. Unos relatos sustituyen a otros, y nadie puede decir cuál es verdad. Lo que sirve por ahora es todo lo que cabe esperar.', {
        god: [NONE, 'Ninguna última palabra'],
        world: ['La realidad', 'Perdida para siempre'],
        bridge: ['Relatos', 'Sin fin, y ninguno verdadero'],
        self: ['El yo', 'Deshaciéndose'],
      }],
    ],
  },

  marxism: {
    tagline: 'La historia es una guerra de clases, y la revolución le pondrá fin.',
    q: '¿Y si lo que hay que liberar es el yo?',
    acts: [
      ['Materia en movimiento', 'La materia es todo lo que hay, y avanza mediante el conflicto. El hombre es un animal que trabaja. Cómo se gana la vida da forma a sus leyes, su moral y su religión.', {
        god: [NONE, '“El opio del pueblo”'],
        world: ['La sociedad', 'Construida sobre cómo se gana la vida'],
        bridge: ['La base económica', 'Toda idea descansa en ella, aun la de Marx'],
        self: ['El hombre', 'La suma de sus relaciones sociales'],
      }],
      ['Alienación', 'La propiedad privada dividió a la humanidad en clases. Los dueños viven de lo que hacen los obreros, y el obrero queda separado de su trabajo, de los demás y de sí mismo.', {
        god: [NONE, '“El suspiro del oprimido”'],
        world: ['La sociedad de clases', 'Dueños contra obreros'],
        bridge: ['La plusvalía', 'Como si solo el trabajo diera valor'],
        self: ['El obrero', 'Extraño a su propio trabajo'],
        sin: ['Explotación', 'El mal está en el sistema, no en el corazón'],
      }],
      ['Revolución', 'Los obreros se alzarán y derrocarán a los dueños por la fuerza. Su partido gobernará en su nombre, tomará la tierra y las fábricas, y planificará toda la producción desde el centro.', {
        god: [NONE, 'El hombre debe salvarse solo'],
        world: ['El Estado obrero', 'Planificado sin precios con que calcular'],
        bridge: ['La revolución', 'Salvación por la toma del poder'],
        self: ['El hombre nuevo', 'Rehecho por condiciones nuevas'],
        sin: ['Explotación', 'Sigue en el corazón de los nuevos amos'],
      }],
      ['Comunismo', 'Al final el Estado se extinguirá. Sin clases ni propiedad, todos compartirán: “de cada cual según su capacidad, a cada cual según sus necesidades.”', {
        god: [NONE, 'Ningún juicio por venir'],
        world: ['La sociedad sin clases', 'El cielo en la tierra, siempre por venir'],
        self: ['El hombre', 'Sacrificado por un futuro que no verá'],
      }],
    ],
  },

  individualism: {
    tagline: 'El verdadero yo está dentro, y hay que liberarlo.',
    q: '¿Y si el cuerpo mismo puede rehacerse a medida del yo?',
    acts: [
      ['El yo interior', 'Cada persona tiene dentro un verdadero yo: sentimientos y deseos que son solo suyos. Quién es de verdad lo descubre mirando hacia dentro, no a Dios ni a los demás.', {
        god: [NONE, 'Mira dentro de ti'],
        world: ['La sociedad', 'Un escenario para el yo'],
        self: ['El yo', 'Sus sentimientos son su verdad'],
      }],
      ['Represión', 'El mal está fuera del yo: la familia, la tradición, la religión y las normas morales que dicen a cada uno quién debe ser. Negar los propios deseos es ser falso con uno mismo.', {
        god: [NONE, 'O una norma más que sacudirse'],
        world: ['La sociedad', 'Sus normas encierran al yo'],
        self: ['El yo', 'Sujeto por normas ajenas'],
        sin: ['Represión', 'Pecar es negarse a uno mismo'],
      }],
      ['Autoexpresión', 'La libertad llega al descubrir quién eres de verdad y expresarlo, piensen lo que piensen los demás. La tarea de la sociedad es afirmar la identidad que cada uno elige.', {
        god: [NONE, 'El yo es su propio juez'],
        world: ['La sociedad', 'Obligada a afirmar'],
        bridge: ['La autenticidad', 'Seguir al corazón, que es engañoso'],
        self: ['El yo', 'Su propio hacedor'],
      }],
      ['Realización', 'La meta de la vida es llegar a ser plenamente uno mismo y sentirse realizado. Más allá no hay esperanza: cuando el yo muere, se acaba la historia que contaba de sí.', {
        god: [NONE, 'Nadie que me diga quién soy'],
        world: ['La sociedad', 'Una multitud de yoes, cada uno solo'],
        self: ['El yo', 'Realizado, hasta que muere'],
      }],
    ],
  },

  transhumanism: {
    tagline: 'El hombre está inacabado, y la tecnología lo terminará.',
    q: '¿Y si el hombre se hace divino al despertar, no con máquinas?',
    acts: [
      ['Inacabado', 'El hombre es producto de la evolución, y la evolución no ha terminado. La naturaleza humana es una obra en curso, y ahora podemos tomarla en nuestras manos.', {
        god: [NONE, '“Todavía no”'],
        world: ['La naturaleza', 'Materia prima que mejorar'],
        self: ['El hombre', 'Un borrador, no la imagen de Dios'],
      }],
      ['Límites', 'Lo que falla es nuestra biología: la vejez, la enfermedad, la debilidad y la muerte. No son castigos ni misterios. Son problemas de ingeniería.', {
        god: [NONE, 'Nadie a quien culpar de la muerte'],
        world: ['La naturaleza', 'Ciega, cruel y lenta'],
        self: ['El hombre', 'Atrapado en un cuerpo que falla'],
        sin: ['Muerte', 'Un problema que resolver, no una paga'],
      }],
      ['Mejora', 'La ciencia nos hará más que humanos: genes editados, cuerpos reparados, mentes unidas a máquinas. Cada uno podrá elegir sus propias mejoras.', {
        god: [NONE, 'El hombre quiere llenar el hueco'],
        world: ['La naturaleza', 'En pleno rediseño'],
        bridge: ['La tecnología', 'Salvación por actualización'],
        self: ['El poshumano', 'Rehecho por su propia mano'],
        sin: ['Muerte', 'Aplazada, no vencida'],
      }],
      ['La Singularidad', 'Un día las máquinas superarán a sus creadores. Quizá las mentes se copien en computadoras y vivan mientras funcione el equipo. La muerte será opcional.', {
        god: ['La Singularidad', '“Seréis como Dios”'],
        world: ['La naturaleza', 'Cableada por completo'],
        bridge: ['La mente copiada', 'Una copia, pero ¿hay alguien dentro?'],
        self: ['El cuerpo', 'Dejado atrás'],
      }],
    ],
  },

  'new-age': {
    tagline: 'Todo es uno, todo es divino, y tú también.',
    q: '¿Y si los dioses son muchos?',
    acts: [
      ['Todo es uno', 'Todo es uno, y lo uno es divino: una energía viva, no una Persona. Cada uno de nosotros es una chispa de ella. En lo hondo del yo, cada persona es Dios.', {
        god: ['El Universo', 'Energía, no una Persona'],
        world: ['El cosmos', 'Uno con el yo'],
        self: ['El yo', '“Yo soy Dios”'],
      }],
      ['Olvido', 'Lo que falla no es el pecado sino el olvido. Hemos perdido de vista nuestra propia divinidad y vivimos encerrados en una conciencia estrecha y cotidiana.', {
        god: ['El Universo', 'Nadie a quien ofender'],
        world: ['El cosmos', 'Visto solo en la superficie'],
        self: ['El yo', 'Dormido a su propia divinidad'],
        sin: ['Olvido', 'No pecado, solo una mente estrecha'],
      }],
      ['Despertar', 'La meditación, los cristales, la canalización y otras técnicas abren la mente a una conciencia superior. El yo despierto descubre que crea su propia realidad.', {
        god: ['El Universo', 'Aprovechado, no adorado'],
        world: ['El cosmos', 'Moldeado por la mente'],
        bridge: ['La conciencia cósmica', 'Donde el bien y el mal se disuelven'],
        self: ['El yo', 'Crea su propia realidad'],
        sin: ['Olvido', 'Curado con técnica, no con gracia'],
      }],
      ['Ascensión', 'La muerte es un paso, no un fin. El alma vuelve vida tras vida, sube hacia la luz, y la humanidad está al borde de una nueva era.', {
        god: ['El Universo', 'Alcanzado subiendo, no por gracia'],
        world: ['La nueva era', 'Siempre a punto de amanecer'],
        bridge: ['La reencarnación', 'Vida tras vida, y ningún Salvador'],
        self: ['El alma', 'Sube, sin juicio que afrontar'],
      }],
    ],
  },

  'neo-paganism': {
    tagline: 'La tierra es sagrada, y la rueda del año gira para siempre.',
    q: '¿Y si los muchos dioses son rostros de uno solo?',
    acts: [
      ['La tierra sagrada', 'Lo divino vive dentro de la naturaleza. Los wiccanos honran a una Diosa y a un Dios; otros paganos, a muchos dioses. La tierra es el cuerpo de la Diosa, y toda vida participa de ella.', {
        god: ['La Diosa', 'Doncella, Madre y Anciana'],
        world: ['La tierra', 'Su cuerpo, y divina'],
        bridge: ['La rueda del año', 'Ocho fiestas, girando para siempre'],
        self: ['El hombre', 'Un hijo de la tierra'],
      }],
      ['Desconexión', 'Nada en nosotros es pecaminoso. Lo que ha ido mal es que la gente ha perdido el contacto con la naturaleza y las viejas costumbres, apartada por las ciudades, las máquinas y las iglesias.', {
        god: ['La Diosa', 'Olvidada, no ofendida'],
        world: ['La tierra', 'Herida por la industria'],
        self: ['El hombre', 'Desconectado de la tierra'],
        sin: ['Desconexión', 'Desequilibrio, no pecado'],
      }],
      ['Rito y magia', 'Los ritos de luna llena y las fiestas restauran el vínculo. La magia obra por la voluntad y las energías de la naturaleza, sin más límite que la Rede: “Si a nadie dañas, haz lo que quieras.”', {
        god: ['La Diosa', 'Invocada en el rito'],
        world: ['La tierra', 'Adorada en lugar del Creador'],
        bridge: ['La magia', 'Poder buscado, no gracia recibida'],
        self: ['El pagano', '“No dañar a nadie”, a su medida'],
        sin: ['Desconexión', 'Sanada con ritos, sin nada que perdonar'],
      }],
      ['La rueda gira', 'La muerte es parte del ciclo, como el invierno. El alma descansa en la Tierra del Verano y vuelve a nacer. La rueda gira, y nada termina ni es hecho nuevo.', {
        god: ['La Diosa', 'Anciana, y luego Doncella otra vez'],
        world: ['La tierra', 'Siempre girando, nunca renovada'],
        bridge: ['La rueda del año', 'Vueltas y vueltas, sin día final'],
        self: ['El hombre', 'Vuelve a la tierra, y renace'],
      }],
    ],
  },

  'hindu-monism': {
    tagline: 'Todo es uno, y lo uno es Brahman.',
    q: '¿Y si no hay yo, ni tampoco Uno?',
    acts: [
      ['Lo Uno', 'Solo Brahman es real: uno, sin partes y más allá de toda descripción. Todo lo que existe es Brahman.', {
        god: ['Brahman', 'Lo Uno, y todo lo que es'],
        world: ['El mundo', 'Brahman no lo hizo: es Brahman'],
        self: ['Atman', 'El yo también es Brahman'],
      }],
      ['Ignorancia', 'Las muchas cosas que vemos son maya, una apariencia. Al tomarlas por reales, el yo renace una y otra vez.', {
        god: ['Brahman', 'La única realidad'],
        world: ['Maya', 'Una ilusión, pero ¿de quién?'],
        bridge: ['Samsara', 'La rueda de renacimientos, movida por el karma'],
        self: ['Atman', 'Se cree separado'],
        sin: ['Avidya', 'No saber qué es el yo'],
      }],
      ['Conocimiento', 'La liberación llega al saber que el yo es Brahman. La meditación y la disciplina llevan allí, a menudo a lo largo de muchas vidas.', {
        god: ['Brahman', 'Más allá del bien y del mal'],
        world: ['Maya', 'Vista por lo que es'],
        bridge: ['Samsara', 'Quizá pasen antes muchas vidas'],
        self: ['Atman', '“Tú eres Eso”'],
        sin: ['Avidya', 'Disipándose'],
      }],
      ['Liberación', 'El yo queda libre del renacimiento y ya no está separado, como una gota que vuelve al mar. No queda ninguna persona.', {
        god: ['Brahman', 'Todo lo que siempre hubo'],
        world: ['Moksha', 'Liberación de la rueda'],
        self: ['El yo', 'No queda nadie para disfrutarla'],
      }],
    ],
  },

  buddhism: {
    tagline: 'La vida es sufrimiento, y la cura es dejar de desear.',
    q: '¿Y si hay que fluir con el cambio, no escapar de él?',
    acts: [
      ['Impermanencia', 'Todo surge de causas y pasa. Nada dura: no hay creador ni un yo duradero.', {
        god: ['Ningún creador', 'Hasta los dioses nacen y mueren'],
        world: ['Todas las cosas', 'Surgen y pasan'],
        self: ['El yo', 'Cinco partes pasajeras, y ningún alma'],
      }],
      ['Sufrimiento', 'La vida es sufrimiento, porque ansiamos lo que no puede durar. El ansia produce karma, y el karma trae el renacimiento.', {
        god: ['Ningún creador', 'Nadie arriba que ayude'],
        world: ['Samsara', 'Nacer, morir y volver a nacer'],
        bridge: ['El renacimiento', 'Aunque ningún yo renace'],
        self: ['El yo', 'Aferrado a lo que no dura'],
        sin: ['Ansia', 'Sed de lo que pasa'],
      }],
      ['El sendero', 'El ansia puede acabarse. El Óctuple Sendero de sabiduría, conducta y meditación lleva allí, y cada uno debe recorrerlo por sí mismo.', {
        god: ['Ningún creador', 'Ninguna gracia de fuera'],
        bridge: ['El Óctuple Sendero', 'Sabiduría, conducta y meditación'],
        self: ['El yo', 'En el eje, por su propio esfuerzo'],
        sin: ['Ansia', 'Enfriándose'],
      }],
      ['Nirvana', 'Cuando acaba el ansia, acaba el renacimiento y la llama se apaga. El Buda no quiso decir si queda alguien.', {
        god: ['Ningún creador', 'Nada arriba que encontrar'],
        world: ['El nirvana', 'La llama apagada'],
        self: ['El yo', '¿Hubo alguna vez alguien?'],
      }],
    ],
  },

  taoism: {
    tagline: 'Sigue el Camino de la naturaleza, y nunca lo fuerces.',
    q: '¿Y si el orden viene del deber, no de dejarse llevar?',
    acts: [
      ['El Camino', 'El Tao es la fuente sin nombre de todas las cosas. De él vienen el yin y el yang, y de su girar, todo lo demás.', {
        god: ['El Tao', 'El Camino que no puede nombrarse'],
        world: ['Las diez mil cosas', 'Yin y yang, siempre girando'],
        self: ['El hombre', 'Una cosa entre diez mil'],
      }],
      ['Forzar', 'Los males llegan cuando el hombre fuerza las cosas: se aferra, maquina y pone reglas. Pierde el paso del Camino.', {
        god: ['El Tao', 'No toma partido'],
        world: ['Las diez mil cosas', 'Siguen girando'],
        self: ['El hombre', 'Empuja contra la corriente'],
        sin: ['Forzar', 'Aferrarse, maquinar, poner reglas'],
      }],
      ['No forzar', 'Deja de esforzarte y cede, como el agua: es blanda, y sin embargo desgasta la piedra. Vive con sencillez y deja que las cosas sigan su curso.', {
        god: ['El Tao', 'Seguido, pero nunca encontrado'],
        world: ['Las diez mil cosas', 'Luz y sombra, ambas necesarias'],
        bridge: ['Wu wei', 'Moverse con la corriente'],
        self: ['El hombre', 'Cede, como el agua'],
      }],
      ['Retorno', 'Al morir, la persona se transforma de nuevo en el Camino, como el otoño da paso al invierno. No hay nada que llorar.', {
        god: ['El Tao', 'No nota que se ha ido'],
        world: ['Las diez mil cosas', 'Giran sin fin'],
        self: ['El hombre', 'Devuelto al Camino'],
      }],
    ],
  },

  confucianism: {
    tagline: 'Cumple tu deber en tu lugar, y habrá orden.',
    q: '¿Y si los antepasados no son los únicos espíritus?',
    acts: [
      ['Orden', 'El Cielo ordena todas las cosas, pero no habla. El hombre nace en lazos de deber, y su naturaleza es buena si se cultiva.', {
        god: ['El Cielo', '“¿Acaso habla el Cielo?”'],
        world: ['Todo bajo el Cielo', 'La familia, y el Estado'],
        bridge: ['Los cinco lazos', 'Cada uno con sus deberes'],
        self: ['El hombre', 'Bueno por naturaleza, si se cultiva'],
      }],
      ['Desorden', 'El desorden llega cuando la gente descuida sus deberes: gobernantes sin virtud, hijos sin respeto. Los lazos se aflojan.', {
        god: ['El Cielo', 'Aún callado'],
        world: ['Todo bajo el Cielo', 'Desordenado'],
        bridge: ['Los cinco lazos', 'Aflojados'],
        self: ['El hombre', 'Fuera de su lugar'],
        sin: ['Descuido', 'Deberes sin cumplir'],
      }],
      ['Cultivo', 'El orden vuelve mediante el estudio, el rito y el respeto a los padres. El caballero se perfecciona, y su ejemplo se extiende.', {
        god: ['El Cielo', 'Leído solo en el orden de las cosas'],
        world: ['Todo bajo el Cielo', 'Ordenado otra vez'],
        bridge: ['El rito', 'Conducta recta, practicada a diario'],
        self: ['El caballero', 'Hecho bueno por su propio esfuerzo'],
        sin: ['Descuido', 'Remediado'],
      }],
      ['Memoria', 'Confucio dijo poco de la muerte: “Si aún no conocemos la vida, ¿cómo conocer la muerte?” Los vivos honran a los muertos con ritos.', {
        god: ['El Cielo', 'Nada dice de la muerte'],
        world: ['Todo bajo el Cielo', 'El orden heredado'],
        bridge: ['Los antepasados', 'Honrados por los vivos'],
        self: ['El hombre', 'Recordado mientras duren los ritos'],
      }],
    ],
  },

  animism: {
    tagline: 'El mundo está lleno de espíritus, y hay que tenerlos contentos.',
    q: '¿Y si un Señor Sabio se alza contra los demonios?',
    acts: [
      ['Un mundo vivo', 'Los espíritus habitan en ríos, árboles, animales y en los muertos. Muy por encima de ellos hay un Creador, pero se ha retirado y rara vez se le invoca.', {
        god: ['El Dios Supremo', 'Lejano, y rara vez invocado'],
        world: ['El mundo', 'Lleno de espíritus'],
        self: ['El hombre', 'Una vida entre muchos espíritus'],
      }],
      ['Ofensa', 'La enfermedad y la desgracia llegan cuando se ofende a los espíritus, se rompen tabúes o se echan maldiciones. Se vive con miedo a poderes invisibles.', {
        god: ['El Dios Supremo', 'Demasiado lejos para ayudar'],
        world: ['El mundo', 'Sus espíritus, vueltos contra él'],
        self: ['El hombre', 'Teme lo que no puede ver'],
        sin: ['Ofensa', 'Un tabú roto, un espíritu airado'],
      }],
      ['Apaciguamiento', 'Un adivino averigua qué espíritu está airado. Sacrificios, amuletos y ritos lo apaciguan y restablecen el equilibrio, por un tiempo.', {
        god: ['El Dios Supremo', 'Aún sin ser invocado'],
        world: ['El mundo', 'En equilibrio otra vez, por ahora'],
        bridge: ['El sacrificio', 'Dado para comprar la paz'],
        self: ['El hombre', 'Regatea su seguridad'],
        sin: ['Ofensa', 'Apaciguada, no perdonada'],
      }],
      ['Los antepasados', 'Al morir, la persona se une a los antepasados, que siguen cerca y deben ser alimentados. Cuando nadie recuerda sus nombres, se desvanecen.', {
        god: ['El Dios Supremo', 'Aún lejos'],
        world: ['El mundo', 'Sus espíritus permanecen'],
        self: ['El hombre', 'Antepasado, hasta ser olvidado'],
      }],
    ],
  },

  zoroastrianism: {
    tagline: 'La luz y las tinieblas están en guerra, y el hombre debe elegir su bando.',
    q: '¿Y si el mal es solo ignorancia, que la razón cura?',
    acts: [
      ['Luz y tinieblas', 'Ahura Mazda, el Señor Sabio, mora en la luz sin fin. Debajo de él, en tinieblas sin fin, está el Espíritu Hostil, malo del todo y no hecho por él. El Señor Sabio hizo un mundo bueno para combatirlo, y puso en él al hombre como su aliado.', {
        god: ['Ahura Mazda', 'El Señor Sabio, en la luz sin fin'],
        world: ['La creación', 'Buena, y hecha para la batalla'],
        bridge: ['Asha', 'La verdad, el orden de todas las cosas'],
        self: ['El hombre', 'Su aliado, libre para elegir'],
        sin: ['Angra Mainyu', 'El Espíritu Hostil, increado'],
      }],
      ['El asalto', 'El Espíritu Hostil irrumpió en el mundo desde abajo, trayendo muerte, enfermedad, humo y sal. Murieron el primer buey y el primer hombre. Ahora el bien y el mal están mezclados en todo, y la primera pareja mintió diciendo que él había hecho el mundo.', {
        god: ['Ahura Mazda', 'Resiste, aún sin vencer'],
        world: ['El mundo', 'Luz y tinieblas mezcladas'],
        bridge: ['Asha', 'Desgarrada, pero no deshecha'],
        self: ['El hombre', 'Mortal ya, pero nacido puro'],
        sin: ['La Mentira', 'Un invasor, no una naturaleza'],
      }],
      ['La elección', 'Zaratustra trajo la palabra del Señor Sabio: elegir la verdad y no la Mentira. Con buenos pensamientos, buenas palabras y buenas obras, y guardando puros el fuego y el cuerpo, cada uno lucha por la luz. Al morir, sus obras se pesan en el puente Chinvat.', {
        god: ['Ahura Mazda', 'Conocido por su profeta'],
        world: ['El mundo', 'Un campo de batalla, guardado puro'],
        bridge: ['El puente Chinvat', 'Ancho para el justo, un hilo para el malvado'],
        self: ['Los fieles', 'Buenos pensamientos, palabras y obras'],
        sin: ['La Mentira', 'Vencida en la balanza, se espera'],
      }],
      ['La renovación', 'Al final, un último salvador, nacido de la simiente de Zaratustra, resucita a los muertos. Un río de metal fundido corre sobre la tierra y deja puros a todos. El Espíritu Hostil queda deshecho, el infierno purificado, y el mundo hecho maravilloso.', {
        god: ['Ahura Mazda', 'Supremo al fin'],
        world: ['El mundo', 'Hecho maravilloso, sin tinieblas debajo'],
        bridge: ['El Saoshyant', 'El salvador que aún ha de venir'],
        self: ['Toda la humanidad', 'Resucitada y hecha pura'],
      }],
    ],
  },

  platonism: {
    tagline: 'El mundo real está más arriba, y el alma debe volver a él.',
    q: '¿Y si el artesano es ciego?',
    acts: [
      ['Dos mundos', 'Por encima del mundo cambiante están las Formas: modelos perfectos y eternos, con el Bien sobre todos ellos. Un artesano divino dio forma a la materia según ellas, así que todo lo que vemos es una copia.', {
        god: ['El Bien', 'Fuente de todo, pero no una persona'],
        world: ['El mundo del devenir', 'Copias, siempre cambiantes'],
        bridge: ['Las Formas', 'Perfectas e inmutables'],
        self: ['El hombre', 'Un alma inmortal en un cuerpo'],
      }],
      ['La caverna', 'El alma ha caído en un cuerpo y ha olvidado las Formas. Como prisioneros en una caverna, la gente toma las sombras por la cosa real.', {
        god: ['El Bien', 'Brilla, pero nadie lo ve'],
        world: ['La caverna', 'Sombras tomadas por reales'],
        bridge: ['Las Formas', 'Olvidadas'],
        self: ['El alma', 'Presa en el cuerpo'],
        sin: ['Ignorancia', 'Olvido, no rebelión'],
      }],
      ['El ascenso', 'La filosofía vuelve el alma de las sombras hacia la luz. Por la razón y la disciplina recuerda las Formas y sube hacia el Bien.', {
        god: ['El Bien', 'Espera ser alcanzado'],
        world: ['El mundo del devenir', 'Visto al fin por lo que es'],
        bridge: ['El ascenso', 'Por la razón, para unos pocos'],
        self: ['El filósofo', 'Recuerda lo que una vez supo'],
        sin: ['Ignorancia', 'Curada por el conocimiento'],
      }],
      ['Liberación', 'Al morir, toda alma es juzgada. Las purificadas dejan el cuerpo para siempre y vuelven a las Formas; otras nacen de nuevo, y las incurables son arrojadas al Tártaro.', {
        god: ['El Bien', 'Visto al fin, pero no puede amar'],
        world: ['El mundo del devenir', 'Donde renacen las otras almas'],
        bridge: ['El alma', 'Libre del cuerpo para siempre'],
        self: ['El cuerpo', 'Dejado atrás como una tumba'],
      }],
    ],
  },

  gnosticism: {
    tagline: 'Un dios menor hizo este mundo, y el conocimiento secreto es la salida.',
    q: '¿Y si Dios vino en carne?',
    acts: [
      ['La Plenitud', 'El Dios verdadero mora muy por encima, en la Plenitud, más allá de todo conocimiento. Uno de sus poderes cayó, y de su error nació un dios menor. Él hizo este mundo, y cree ser el único Dios.', {
        god: ['El Dios verdadero', 'Más allá de todo conocimiento'],
        world: ['El mundo', 'Materia, hecha por error'],
        bridge: ['El hacedor', 'Un dios menor, y ciego'],
        self: ['El hombre', 'Una chispa de Dios en el barro'],
      }],
      ['La prisión', 'Chispas del Dios verdadero duermen en cuerpos humanos, retenidas allí por las potestades del hacedor. El problema no es el pecado sino la materia, y olvidar quién eres de verdad.', {
        god: ['El Dios verdadero', 'Más allá de todo conocimiento'],
        world: ['La prisión', 'Regida por sus poderes'],
        bridge: ['El hacedor', 'Carcelero, no Padre'],
        self: ['La chispa', 'Dormida en el cuerpo'],
        sin: ['Materia', 'El mal está en la sustancia, no en la voluntad'],
      }],
      ['Conocimiento', 'Un Revelador desciende disfrazado. Solo parece tener cuerpo, y no muere por nadie. Trae un conocimiento secreto, y los que tienen la chispa despiertan y recuerdan su hogar.', {
        god: ['El Dios verdadero', 'Más allá de todo conocimiento'],
        world: ['El mundo', 'No merece salvarse'],
        bridge: ['El Revelador', 'Solo parecía ser carne'],
        self: ['Los pocos despiertos', 'Salvos por saber, no por gracia'],
        sin: ['Materia', 'Escapada, nunca perdonada'],
      }],
      ['El retorno', 'Al morir, la chispa despierta sube más allá de las potestades de los cielos, les dice las palabras secretas y vuelve a casa. El cuerpo queda para pudrirse, y al final toda la materia es destruida.', {
        god: ['El Dios verdadero', 'Alcanzado, pero aún desconocido'],
        world: ['El mundo', 'Consumido, no renovado'],
        bridge: ['La chispa', 'En casa, tras los guardianes'],
        self: ['El cuerpo', 'Desechado para siempre'],
      }],
    ],
  },
};

// Lays the Spanish over the English. A worldview or act with no Spanish, or with other labels than the English,
// is reported in the console and keeps its English, so nothing on the page is left blank or laid out wrongly.
export function apply(WORLDVIEWS, CATALOGUE) {
  for (const c of CATALOGUE) if (NAMES[c.id]) c.name = NAMES[c.id];
  for (const [id, wv] of Object.entries(WORLDVIEWS)) {
    const es = TEXT[id];
    if (!es || es.acts.length !== wv.acts.length) { console.error(`es.js: no Spanish for ${id}`); continue; }
    wv.name = NAMES[id] || wv.name;
    wv.tagline = es.tagline;
    wv.move = { ...wv.move, q: es.q };
    wv.acts.forEach((a, i) => {
      const [name, text, labels] = es.acts[i];
      const same = Object.keys(labels).sort().join() === Object.keys(a.labels).sort().join();
      if (!same) console.error(`es.js: ${id}, act ${i + 1}, has other labels than the English`);
      a.name = name;
      a.text = text;
      if (same) a.labels = labels;
    });
  }
}
