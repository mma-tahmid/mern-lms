
import './App.css'

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginRegistrationPage from './Pages/LoginRegistrationPage';


const App = () => {

  const appRouter = createBrowserRouter([

    {
      path: '/',
      element: <LoginRegistrationPage />
    },

    // {
    //   path: '/product-details',
    //   element: <ProductDetailsPage />
    // },

    // {
    //   path: '/shopping-cart',
    //   element: <ShoppingCartPage />
    // },

    // other public and admin routes...

    // {
    //   path: '/admin',
    //   element: <AdminLayout />,
    //   children: [
    //     { path: 'navbar', element: <NavbarPage /> },
    //     { path: 'banner', element: <BannerPage /> },
    //     // { path: 'about', element: <AboutPage /> },
    //     // { path: 'service', element: <ServicePage /> },
    //     // { path: 'resume', element: <ResumePage /> },
    //     // { path: 'portfolio', element: <PortfolioPage /> },
    //     // { path: 'testimonial', element: <TestimonialPage /> },
    //     // { path: 'partner', element: <PartnerPage /> },
    //     // { path: 'blog', element: <BlogPage /> },
    //     // { path: 'contact', element: <ContactPage /> },
    //     // { path: 'footer', element: <FooterPage /> },
    //   ]
    // }

  ]);


  return (

    <>
      <RouterProvider router={appRouter} />

    </>


  );
};

export default App;




