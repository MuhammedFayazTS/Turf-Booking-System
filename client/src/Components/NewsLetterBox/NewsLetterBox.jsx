import React from 'react'

function NewsLetterBox({isLight}) {
    return (
        <>
            <div className="mx-auto max-w-7xl px-2 py-10 lg:px-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="w-full md:w-2/3 lg:w-1/2">
                        <h2 className={`text-3xl font-bold ${isLight?'text-white':'text-black'}`}>
                            Sign up for our weekly newsletter
                        </h2>
                        <p className={`mt-4   ${isLight?'text-gray-300':'text-gray-600'}`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
                            ipsum eu nunc commodo posuere et sit amet ligula.
                        </p>
                        <div className="mt-4">
                            <p className={`font-semibold  ${isLight?'text-gray-50':'text-gray-800'}`}>
                                Trusted by over 100,000+ businesses and individuals
                            </p>
                            <div className="mt-2 flex items-center">
                                <div className="flex space-x-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="h-5 w-5 text-yellow-400"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                </div>
                                <span className="ml-2 inline-block">
                                    <span className={`text-sm font-semibold ${isLight?'text-yellow-400':'text-gray-800'}`}>
                                        4.8/5 . 3420 Reviews
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 w-full md:w-2/3 lg:mt-0 lg:w-1/2">
                        <form className="flex lg:justify-center">
                            <div className="flex w-full max-w-md flex-col space-y-4">
                                <input
                                    className={`flex h-10 w-full rounded-md border ${isLight?'border-white/30 text-white placeholder:text-gray-300':'border-black/30 placeholder:text-gray-600'} bg-transparent px-3 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                                    type="email"
                                    placeholder="Email"
                                />
                                <button
                                    type="button"
                                    className={`w-full rounded-md px-3 py-2 text-sm font-semibold ${isLight?'   bg-gray-300 text-black':' bg-black text-white  hover:bg-black/80'} shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                        <p className="mt-2 lg:text-center">
                            <span className={`text-sm ${isLight?'text-gray-400':'text-gray-600'}`}>
                                By signing up, you agree to our terms of service and privacy policy.
                            </span>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NewsLetterBox