export default function InputField({
    placeholder, icon, id, type
})
{
    return(
        <div className="relative">
            {icon && <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none text-neutral-300">
                {icon}
            </div>}
            
            <input type={type} id={id} className=" border border-neutral-200 text-neutral-400 text-xs rounded-md focus:ring-neutral-500 focus:neutral-blue-500 block w-full p-2.5" placeholder={placeholder}/>
        </div>
    )
}