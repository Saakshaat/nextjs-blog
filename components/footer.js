import utilStyles from '../styles/utils.module.css'

export default function Footer({children}) {
    return (
        <footer className={utilStyles.socialsFooter}>
            {children}
        </footer>
    )
}