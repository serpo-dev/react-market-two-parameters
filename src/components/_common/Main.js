import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../../routes";

function Main() {
    return (<Fragment>
        <main>
            <Routes>
                {routes.map((attrs, i) => <Route {...attrs} key={i} />)}
            </Routes>
        </main>
    </Fragment>)
}

export default Main;