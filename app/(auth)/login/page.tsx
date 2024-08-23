"use client";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {auth} from "@/lib/firebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useRouter} from "next/navigation";
import {useAuthState} from "react-firebase-hooks/auth";


const Login = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      console.log("User signed in: ", userCredential.user);
    } catch (error) {
      console.error("Error during sign-in: ", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  if (user && !loading) {
    router.push('/');
    return null; // Prevent rendering the rest of the component
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-light-200 dark:bg-dark-300 text-dark-600 dark:text-light-200">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-wrap">Welcome to Verse Insight</h1>
        <p className="text-center mb-6">Sign in with Google to explore, bookmark, and discover insightful verses and Hadiths.</p>
        <Button
          onClick={googleLogin}
          className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded shadow-md transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          Sign in with Google
        </Button>

      </Card>
    </div>
  );
};

export default Login;
