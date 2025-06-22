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


const LoginPage = () => {

    const [signUpInput, setsignUpInput] = useState({
        fullName: "",
        email: "",
        password: ""
    })


    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })

    // console.log(loginInput)
    // console.log(signUpInput)

    const changeInputEventHandeler = (e, types) => {
        const { name, value } = e.target

        if (types === "signup") {
            setsignUpInput({ ...signUpInput, [name]: value })
        } else {
            setLoginInput({ ...loginInput, [name]: value })
        }

    }

    const handleRegistration = async (typess) => {
        const inputData = typess === "signup" ? signUpInput : loginInput
        console.log(inputData)


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
                                    onChange={(e) => changeInputEventHandeler(e, "signup")}
                                    value={signUpInput.fullName}

                                />
                            </div>

                            <div className="grid gap-3">

                                <Label>Email</Label>
                                <Input type="email"
                                    placeholder="Enter your email"
                                    required="true"
                                    name="email"
                                    onChange={(e) => changeInputEventHandeler(e, "signup")}
                                    value={signUpInput.email}
                                />
                            </div>

                            <div className="grid gap-3">

                                <Label>Password</Label>
                                <Input type="password"
                                    placeholder="Enter your Password"
                                    required="true"
                                    name="password"
                                    onChange={(e) => changeInputEventHandeler(e, "signup")}
                                    value={signUpInput.password}
                                />
                            </div>

                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleRegistration("signup")}>Signup</Button>
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
                                    onChange={(e) => changeInputEventHandeler(e, "login")}
                                    value={loginInput.email}
                                />
                            </div>

                            <div className="grid gap-3">

                                <Label>Password</Label>
                                <Input type="password"
                                    placeholder="Enter your Password"
                                    required="true"
                                    name="password"
                                    onChange={(e) => changeInputEventHandeler(e, "login")}
                                    value={loginInput.password}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleRegistration("login")}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>


    );
};

export default LoginPage;