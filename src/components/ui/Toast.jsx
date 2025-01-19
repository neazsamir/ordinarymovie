export const Toast = ({ type, message }) => {
    const bgColor =
        type === "error" ? "bg-red-500" :
        type === "success" ? "bg-green-500" :
        type === "warning" ? "bg-yellow-500" : "bg-gray-500";

    return (
        <div
            className={`${bgColor} fixed left-1/2 bottom-[50px] rounded px-5 py-2 text-white font-bold min-w-[90%] h-fit text-[14px] transform -translate-x-1/2 shadow-lg motion-preset-slide-right `} >
            {message}
        </div>
    );
};