import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UserLoggedIn } from "../slice/userSlice"

const USER_API_BASE_URL = "http://localhost:8000/api/v7/user-auth/"

export const authApi = createApi({
    reducerPath: "authApis",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API_BASE_URL,
        credentials: 'include'
    }),

    // for post method use -----> mutation
    // for get  method use ------> query

    endpoints: (builder) => ({

        // Register user

        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "registration",
                method: "POST",
                body: inputData
            })
        }),

        // login User 

        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData
            }),

            //for dispatch
            async onQueryStarted(_, { queryFulfilled, dispatch }) {

                try {
                    const response = await queryFulfilled()
                    dispatch(UserLoggedIn({ currentUser: response.data?.output }))
                }

                catch (error) {
                    console.log(error)
                }

            }
        })



    })

})

export const {
    useRegisterUserMutation,
    useLoginUserMutation
} = authApi