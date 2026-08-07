import styles from "./Premios.module.css";

export default function Premios() {
  return (
    <section className={styles.prizes}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Vale la pena animarse</p>

        <h2>Premios 2026</h2>

        <p className={styles.subcopy}>Un concurso de Active Learning</p>

        <div className={styles.prizeGrid}>
          <article className={styles.prizeCard}>
            <div className={`${styles.badge} ${styles.gold}`} aria-hidden="true">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <rect
                  x="6"
                  y="9"
                  width="30"
                  height="19"
                  rx="2"
                  stroke="#152548"
                  strokeWidth="2.2"
                />
                <path d="M3 31h36l-3 4H6l-3-4z" fill="#152548" />
              </svg>

              <svg className={styles.star} viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 2l2.6 6.6L21 9l-5 4.6L17.4 21 12 17.3 6.6 21 8 13.6 3 9l6.4-.4z" />
              </svg>
            </div>

            <div>
              <h3>Primer premio</h3>
              <p>Computadora</p>
            </div>
          </article>

          <article className={styles.prizeCard}>
            <div className={`${styles.badge} ${styles.sky}`} aria-hidden="true">
              <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
                <rect
                  x="4"
                  y="2"
                  width="26"
                  height="38"
                  rx="3"
                  stroke="#152548"
                  strokeWidth="2.2"
                />
                <line
                  x1="9"
                  y1="10"
                  x2="25"
                  y2="10"
                  stroke="#152548"
                  strokeWidth="1.6"
                />
                <line
                  x1="9"
                  y1="16"
                  x2="25"
                  y2="16"
                  stroke="#152548"
                  strokeWidth="1.6"
                />
                <line
                  x1="9"
                  y1="22"
                  x2="20"
                  y2="22"
                  stroke="#152548"
                  strokeWidth="1.6"
                />
              </svg>

              <svg className={styles.star} viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 2l2.6 6.6L21 9l-5 4.6L17.4 21 12 17.3 6.6 21 8 13.6 3 9l6.4-.4z" />
              </svg>
            </div>

            <div>
              <h3>Segundo premio</h3>
              <p>E-reader</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
