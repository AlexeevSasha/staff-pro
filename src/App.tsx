import {Routes, Route} from 'react-router-dom'
import {LayoutAuth} from "./modules/auth/components/LayoutAuth";
import {SignIn} from "./modules/auth/page/SignIn";
import {SignUp} from "./modules/auth/page/SignUp";
import {ForgotPassword} from "./modules/auth/page/ForgotPassword";
import {AuthProvider, UserProvider} from "./common/hooks/AuthProvider";
import {MainLayout} from "./common/components/MainLayout";


const App = () => {
    return (
        <Routes>
            <Route element={<UserProvider/>}>
            <Route path='/' element={<LayoutAuth/>}>
                <Route index element={<SignIn/>}/>
                <Route path='register' element={<SignUp/>}/>
                <Route path='forgot-password' element={<ForgotPassword/>}/>
            </Route>
            </Route>
            <Route element={<AuthProvider/>}>
                <Route path='dashboard' element={<MainLayout/>}>
                </Route>
            </Route>
        </Routes>

    );
}

export default App;
