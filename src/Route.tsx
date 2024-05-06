import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import BasePage from "./app/BasePage.tsx";
import HomePage from "./app/HomePage.tsx";
import TimerGame from "./app/components/TimerGame.tsx";
import DictionaryForm from "./app/components/DictionaryForm.tsx";

const PAGE_CONFIG: RouteObject[] = [
    {
        path: '/nihongo',
        element: <BasePage />,
        children: [
            { path: 'home', element: <HomePage /> },
            { path: 'timer-game', element: <TimerGame />},
            { path: 'add-dictionary', element: <DictionaryForm />}
        ],
    },
    { path: '/', element: <Navigate to="/nihongo/home" /> },
    { path: '', element: <Navigate to="/nihongo/home" /> },
    { path: '*', element: <Navigate to="/nihongo/home" /> },
];

const Router = () => {
    return <div>{useRoutes(PAGE_CONFIG)}</div>;
};

export default Router;