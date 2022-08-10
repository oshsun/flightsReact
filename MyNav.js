import React from 'react'

const MyNav = () => {
    return (
        <div>MyNav
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="" element={<Prod />} />
                    <Route path="" element={<Cat />} />
                </Routes>
            </BrowserRouter>



        </div>
    )
}

export default MyNav