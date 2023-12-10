import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store';
import { Header, Main, Footer } from "./components/_common";

function Layout() {
    return (<>
        <div className='layout'>
            <Header />
            <Main />
            <Footer />
        </div>
    </>)
}

const App = () => (<>
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>
</>)

export default App;