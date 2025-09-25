import React, { useState } from 'react';

import { AppWindowIcon, CodeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


const LoginRegistrationPage = () => {

    const [signUpInputData, setsignUpInputData] = useState({
        fullName: "",
        email: "",
        password: ""
    })


    const [loginInputData, setLoginInputData] = useState({
        email: "",
        password: ""
    })

    // console.log(loginInput)
    // console.log(signUpInput)

    // Step 1: Function returning a function
    //     This is called function currying.
    // const changeInputEventHandeler = (type) => (e) => { ... }

    const changeInputEventHandeler = (formType) => (e) => {

        const { name, value } = e.target;

        // name → comes from < Input name = "fullName" />
        //     value → comes from what user typed

        if (formType === "signup") {
            setsignUpInputData({ ...signUpInputData, [name]: value });
        } else {
            setLoginInputData({ ...loginInputData, [name]: value });
        }
    };

    //     const changeInputEventHandeler = (type) => {
    //   return function (e) {
    //     // logic here
    //   }
    // }

    //     First function takes type ("signup" or "login")
    // It returns another function that expects the event (e)


    

    const handleRegistrationAndLogin = async (formType) => {

        try {

            if (formType === "signup") {

                //const inputData = signUpInput;

                console.log("Signup Data:", signUpInputData);

                //const res = await axios.post("/api/register", inputData);
                //console.log("Signup success:", res.data);
            } else if (formType === "login") {
                //const inputData = loginInput;
                console.log("Login Data:", loginInputData);

                //const res = await axios.post("/api/login", inputData);
                //console.log("Login success:", res.data);
            }
        } catch (err) {
            console.error("Error:", err.response ? err.response.data : err.message);
        }
    }



    return (

        <div className='flex justify-center w-full items-center min-h-screen'>

            {/* “Use min-h-screen to ensure the container takes up the full height of the viewport, which is necessary for vertical centering (items center) with Flexbox.” */}
            {/* min-h-screen sets container height to full viewport.
            ✅ Needed for vertical centering with Flexbox.
            ✅ Works with flex and items-center. */}


            <Tabs defaultValue="account" className="w-[400px]">

                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger className="cursor-pointer" value="signup">Signup</TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="login">Login</TabsTrigger>
                </TabsList>

                {/* SIGNUP PART */}
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you're done
                                {/* when you&apos;re */}

                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">

                            <div className="grid gap-3">

                                <Label>Full Name</Label>
                                <Input type="text"
                                    placeholder="Enter Your Name"
                                    required="true"
                                    name="fullName"
                                    onChange={changeInputEventHandeler("signup")}
                                    value={signUpInputData.fullName}

                                />
                            </div>

                            <div className="grid gap-3">

                                <Label>Email</Label>
                                <Input type="email"
                                    placeholder="Enter your email"
                                    required="true"
                                    name="email"
                                    onChange={changeInputEventHandeler("signup")}
                                    value={signUpInputData.email}
                                />
                            </div>

                            <div className="grid gap-3">

                                <Label>Password</Label>
                                <Input type="password"
                                    placeholder="Enter your Password"
                                    required="true"
                                    name="password"
                                    onChange={changeInputEventHandeler("signup")}
                                    value={signUpInputData.password}
                                />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleRegistrationAndLogin("signup")}>Signup</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>


                {/* Login PART */}

                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login Your Password here. After Signup, you'll be logged in
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">

                                <Label>Email</Label>
                                <Input type="email"
                                    placeholder="Enter your email"
                                    required="true"
                                    name="email"
                                    onChange={changeInputEventHandeler("login")}
                                    value={loginInputData.email}
                                />
                            </div>

                            <div className="grid gap-3">

                                <Label>Password</Label>
                                <Input type="password"
                                    placeholder="Enter your Password"
                                    required="true"
                                    name="password"
                                    onChange={changeInputEventHandeler("login")}
                                    value={loginInputData.password}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleRegistrationAndLogin("login")}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>


    );
};

export default LoginRegistrationPage;


// 2. Curried arrow function with return

// For your React example:

// const changeInputEventHandeler = (type) => {
//     // outer function has braces, so we must use return
//     return (e) => {
//         const { name, value } = e.target;

//         if (type === "signup") {
//             setsignUpInput({ ...signUpInput, [name]: value });
//         } else {
//             setLoginInput({ ...loginInput, [name]: value });
//         }
//     };
// };


// Outer function: (type) => { ... } → has braces
// We explicitly return the inner function (e) => { ... }
// Inner function: still has braces because we are doing multiple lines, but it doesn’t need a return unless you want to return something else


//     So summary:

// Use braces { } → you must use return if you want the outer function to return something

// Without braces → implicit return, no return keyword needed

// In curried functions, either style works, but with return it looks explicit and sometimes clearer.