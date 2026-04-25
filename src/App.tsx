import {  RouterProvider } from "react-router";
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
// import { Suspense } from "react";
// import FallbackLoading from "./components/FallbackLoading";

library.add(fas, far, fab);


export function App() {
  return (
  <>
        {/* <Suspense fallback={<FallbackLoading />}> */}
      <RouterProvider router={router} />
      {/* </Suspense> */}
    </>
  )
}

export default App
