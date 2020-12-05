import utilStyles from "../styles/utils.module.css"

export default function Card({ children }) {
  return <div className={utilStyles.card}>{children}</div>;
}
