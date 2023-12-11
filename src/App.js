import React from 'react'
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

const currentUrl = window.location.href;
const basename = currentUrl.includes("github.io") ? "/react-shop-cart-with-two-parameters/" : undefined;

const App = () => (<>
    <Provider store={store}>
        <BrowserRouter basename={basename}>
            <Layout />
        </BrowserRouter>
    </Provider>
</>)

export default App;