import styles from "./TemasPorCategoria.module.css";

const TEMAS = [
  {
    categoria: "Poesía",
    temas: [
      {
        numero: "1",
        titulo: "Personas y naturaleza",
        texto:
          "¿Cómo dialogan las personas con el mundo natural? Un paisaje, un río, un árbol, el mar o una montaña pueden convertirse en protagonistas de una historia interior. Escribí un poema que explore ese vínculo.",
      },
      {
        numero: "2",
        titulo: "Dolores y alegrías de la libertad personal",
        texto:
          "La libertad también implica decisiones, responsabilidades, pérdidas y descubrimientos. Escribí un poema que exprese qué dolores y alegrías implica ser libre y cómo esa búsqueda transforma a las personas.",
      },
      {
        numero: "3",
        titulo: "El paso del tiempo y nuestra identidad",
        texto:
          "¿Qué nos cambia? ¿Qué permanece? La infancia, la adolescencia, los recuerdos, los sueños y el futuro pueden ser el punto de partida para un poema sobre quiénes somos y quiénes queremos llegar a ser.",
      },
    ],
  },
  {
    categoria: "Cuento breve",
    temas: [
      {
        numero: "1",
        titulo: "Un hecho histórico argentino contado en primera persona",
        texto:
          "Elegí un momento de la historia argentina e imaginá que lo viviste. Contá la historia desde la mirada de uno de sus protagonistas o de un personaje anónimo que estuvo allí.",
      },
      {
        numero: "2",
        titulo: "La verdad tenía otra versión",
        texto:
          "Todo parecía claro, hasta que aparece un nuevo narrador o una nueva evidencia que cambia por completo la historia. Construí un relato donde el lector descubre que la realidad podría ser distinta de lo que creía.",
      },
      {
        numero: "3",
        titulo: "Un encuentro imposible",
        texto:
          "¿Qué ocurriría si dos personas de épocas diferentes pudieran conversar? ¿O si un personaje histórico se encontrara con alguien de la actualidad? Imaginá ese encuentro y convertilo en un cuento.",
      },
    ],
  },
  {
    categoria: "Ensayo personal",
    temas: [
      {
        numero: "1",
        titulo: "Logros y desafíos de la democracia argentina",
        texto:
          "A más de cuarenta años del regreso de la democracia, ¿cuáles han sido sus principales logros y cuáles son los desafíos pendientes? Comparalo con otras democracias del mundo para fundamentar tu análisis.",
      },
      {
        numero: "2",
        titulo: "El impacto del avance tecnológico en la felicidad de las personas",
        texto:
          "¿Los avances tecnológicos de los últimos 200 años nos han hecho más felices? Reflexioná sobre cómo cambiaron la forma en que vivimos, aprendemos y nos relacionamos, y elaborá una hipótesis sobre cómo podría influir la IA en el bienestar de las personas en los próximos veinte años, considerando beneficios y riesgos.",
      },
      {
        numero: "3",
        titulo: "Desafíos de la educación del futuro",
        texto:
          "¿En qué ayuda y en qué falla la educación presente? ¿Qué debería aprender un estudiante para estar preparado para el año 2050? Escribí un ensayo sobre qué debe mantenerse y qué debe cambiar del sistema educativo, y qué conocimientos, habilidades y virtudes serán más importantes en las próximas décadas.",
      },
    ],
  },
];

export default function TemasPorCategoria() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Sobre qué escribir</p>

        <h2>Temas por categoría 2026</h2>

        <div className={styles.tabs} aria-hidden="true">
          <span>Poesía</span>
          <span>Cuento breve</span>
          <span>Ensayo personal</span>
        </div>

        <div className={styles.groups}>
          {TEMAS.map((grupo) => (
            <article key={grupo.categoria} className={styles.group}>
              <h3>{grupo.categoria}</h3>

              <div className={styles.items}>
                {grupo.temas.map((tema) => (
                  <div key={`${grupo.categoria}-${tema.numero}`} className={styles.item}>
                    <span className={styles.number}>{tema.numero}</span>

                    <div>
                      <h4>{tema.titulo}</h4>
                      <p>{tema.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
