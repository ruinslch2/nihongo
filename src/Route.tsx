import {Navigate, RouteObject, useRoutes} from 'react-router-dom';
import BasePage from "./app/BasePage.tsx";
import HomePage from "./app/HomePage.tsx";
import DictionaryForm from "./app/components/DictionaryForm.tsx";
import SelectCardPage from "./app/Pages/SelectCardPage.tsx";

const PAGE_CONFIG: RouteObject[] = [
    {
        path: '/nihongo',
        element: <BasePage/>,
        children: [
            {path: 'home', element: <HomePage/>},
            {path: 'timer-game', element: <SelectCardPage isVoice={false}/>},
            {path: 'timer-game-voice', element: <SelectCardPage isVoice={true}/>},
            {path: 'add-dictionary', element: <DictionaryForm/>},
            {path: '', element: <Navigate to="/nihongo/home"/>},
            {path: '*', element: <Navigate to="/nihongo/home"/>},
        ]
    },
]


const Router = () => {
    return <div>{useRoutes(PAGE_CONFIG)}</div>;
};

export default Router;