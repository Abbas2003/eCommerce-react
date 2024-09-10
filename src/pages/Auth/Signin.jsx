import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";

function SignIn() {

  const navigate = useNavigate()
  const handleGoBack = () => navigate("/auth")

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result=>", result)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user=>", user);
        navigate("/")
        
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        console.log("error=>", errorCode, errorMessage, email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  const [loading, setLoading] = useState(false)
  const handleSignIn = async() =>  {
    try{
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/")
        console.log("User Signed In");
        setLoading(false)
      })
    }
    catch(err){
      setLoading(false)
      console.log("User Signed In Error",err?.message);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Sign In</h1>
        {/* <form> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              onClick={handleSignIn}
              type="submit"
              isLoading={loading}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 my-1"
              onClick={handleSignInWithGoogle}
            >
              Sign In with Google
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              type="submit"
              className="w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-lg  transition duration-300"
            >
              Go Back
            </button>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default SignIn;