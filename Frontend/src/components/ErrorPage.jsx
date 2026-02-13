import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import errorImage from "../assets/error404.jpg"; 

function ErrorPage() {
    const error = useRouteError();

    let title = "Something went wrong";
    let message = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;

        if (error.status === 404) {
            message = "الصفحة التي تحاول الوصول إليها غير موجودة. ربما تم نقلها أو حذفها، أو الرابط غير صحيح. الرجاء العودة إلى الصفحة الرئيسية.";
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-50">
            
            {/* Wrapper */}
            <div className="flex flex-col text-center text-black px-6 w-fit h-fit justify-center items-center">
                
                {/* Error Illustration */}
                <img
                    src={errorImage}
                    alt="404 Error"
                    className="w-full max-w-lg mx-auto object-contain mb-4 rounded-2xl shadow-lg"
                />

                {/* Error Title */}
                <h1 className="text-4xl font-bold mb-4 text-green-700">
                    {title}
                </h1>

                {/* Error Message */}
                <p className="mb-10 text-lg opacity-90 max-w-lg">
                    {message}
                </p>

                {/* Back Home Button */}
                <a
                    href="/"
                    className="inline-block bg-green-600 text-white rounded-full px-6 py-2 text-sm font-medium border border-green-600 transition-all duration-300 ease-in-out hover:bg-white hover:text-green-600"
                >
                    العودة للصفحة الرئيسية
                </a>

            </div>
        </div>
    );
}

export default ErrorPage;
