import {Routes, Route, Navigate} from 'react-router-dom'
import {LayoutAuth} from "./modules/auth/components/LayoutAuth";
import {SignIn} from "./modules/auth/page/SignIn";
import {SignUp} from "./modules/auth/page/SignUp";
import {ForgotPassword} from "./modules/auth/page/ForgotPassword";
import {AuthProvider, UserProvider} from "./common/hooks/AuthProvider";
import {MainLayout} from "./common/components/MainLayout";
import {Dashboard} from "./modules/dashboard/Dashboard";
import {Reports} from "./modules/dashboard/Reports";
import {Templates} from "./modules/documents/Templates";
import {Drafts} from "./modules/documents/Drafts";
import {Invoices} from "./modules/documents/Invoices";
import {Customers} from "./modules/customers/Customers";
import {Setting} from "./modules/dashboard/Setting";



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
                <Route  element={<MainLayout/>}>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/reports' element={<Reports/>}/>
                    <Route path='/documents' >
                        <Route index element={<Navigate to='invoices'/>}/>
                        <Route path='invoices' element={<Invoices/>}/>
                        <Route path='drafts' element={<Drafts/>}/>
                        <Route path='templates' element={<Templates/>}/>
                    </Route>
                    <Route path='/customers' element={<Customers/>}/>
                    <Route path='/settings' element={<Setting/>}/>
                </Route>
            </Route>
        </Routes>

    );
}

export default App;
