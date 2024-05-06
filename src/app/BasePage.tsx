import {Outlet} from "react-router-dom";
import {Suspense} from "react";

const BasePage = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="items-center justify-center flex min-h-screen w-full flex-col">
                <Outlet/>
            </div>
        </Suspense>
    )
}

export default BasePage