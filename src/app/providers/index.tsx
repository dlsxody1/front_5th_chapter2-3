import React from "react"
import { RouterProvider } from "./RouterProvider"
import { TanstackProvider } from "./TanstackProvider"
import Header from "../../widgets/ui/Header"
import PostsManagerPage from "../../pages/PostsManagerPage"
import Footer from "../../widgets/ui/Footer"

export const App = () => {
  return (
    <React.StrictMode>
      <TanstackProvider>
        <RouterProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <PostsManagerPage />
            </main>
            <Footer />
          </div>
        </RouterProvider>
      </TanstackProvider>
    </React.StrictMode>
  )
}
