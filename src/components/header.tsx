import Image from "next/image";

export function Header(){
    return (
        <header className="w-full h-20 sm:h-28 flex items-center">
            <Image 
            alt="Logomarca do Blog" 
            src={"/images/logo.svg"}
            width={229}
            height={229}
            className="w-44 sm:w-[229px]"
            />
        </header>
    )
}