// import React from "react";
// import { images } from "../../assets/asset";


// const Banner = () => {
//   return (
//     <div
//       className=" px-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center rounded-xl h-[65vh]"
//       style={{
//         backgroundImage: `url(${images.bannerImg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "right center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Left Content */}
//       <div className=" p-6 rounded-lg text-white max-w-xl">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
//           Unleash <span className="text-red-500">Your Power</span>
//         </h1>
//         <p className="text-lg mb-6 text-gray-300">
//           Build strength, sculpt your body, and transform your lifestyle with expert-guided training programs.
//         </p>
//         <button className="bg-red-600 text-white px-6 py-3 uppercase tracking-wide font-semibold hover:bg-red-700 transition-all duration-300">
//           Explore Classes
//         </button>
//       </div>

//       {/* Right is empty; image fills as background */}
//       <div className="hidden md:block"></div>
//     </div>
//   );
// };

// export default Banner;
import React from "react";
import { images } from "../../assets/asset";
import { Link } from "react-router";

const Banner = () => {
    return (
        <div className="relative h-[65vh] overflow-hidden">


            {/* Background image + content */}
            <div
                className="relative z-10 px-4 flex justify-center items-center h-full"
                style={{
                    backgroundImage: `url(${images.loginImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Left Content */}
                <div className="p-6 rounded-lg text-white bg-red md:w-1/2 flex flex-col items-center">
                    <h1 className="text-4xl md:text-9xl font-bold mb-4  text-center">
                        Unleash <span className="text-lime-500">Your Power</span>
                    </h1>
                    <p className="text-3xl md:text-3xl mb-6 text-gray-300 text-center">
                        Build strength, sculpt your body, and transform your lifestyle with expert-guided training programs.
                    </p>
                    <Link to='/all-classes' className="bg-lime-400 w-fit text-black px-6 py-3 uppercase tracking-wide font-semibold hover:bg-lime-700 transition-all duration-300 cursor-pointer">
                        Explore Classes
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Banner;
