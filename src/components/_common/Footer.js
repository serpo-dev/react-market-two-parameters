import { Fragment } from "react";

function Footer() {
    return (<Fragment>
        <footer>
            А здесь расположен footer! 😀 Автор - <a
                rel="noreferrer"
                href=" https://github.com/serpo-dev"
                target="_blank"
                style={{ color: "blue", fontWeight: 700 }}
            >
                serpo-dev
            </a>.
        </footer>
    </Fragment >)
}

export default Footer;