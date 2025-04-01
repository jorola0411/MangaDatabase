import { Link } from 'react-router';

function Login() {

    return (
        <>
           
            <div className="grid grid-cols-4 min-h-screen max-w-[1200px] w-full mx-auto my-0 px-4 py-0 mt-10">
     
                    <div className="text-center overflow-y-auto w-full relative p-8 col-span-4">
                        <h1 className='text-2xl'>Show your favorite manga here!</h1>
                        <div className='flex justify-between max-w-[300px] items-center mx-auto mt-20'>
                        <Link to="/sign-up" className='bg-green-500 border p-2 hover:bg-green-700 hover:text-white'>Sign Up</Link>
                        <Link to="/sign-in" className='bg-gray-200 border p-2 hover:bg-gray-700 hover:text-white'>Sign In</Link>
               
                    </div>
                </div>
            </div>
            <footer className="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-center items-center text-center">Copyright 2025</footer>
        </>
    )
}

export default Login