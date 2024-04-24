export default function InputField({ placeholder, icon, id, type }) {
  return (
    <div className="relative">
      {icon && (
        <div
          className={`${type !== "password" && "pointer-events-none"} absolute cursor-pointer hover:text-primary-400 inset-y-0 end-0 flex items-center pe-3.5 text-neutral-300`}
        >
          {icon}
        </div>
      )}

      <input
        type={type}
        id={id}
        className=" border border-neutral-200 text-neutral-400 text-sm rounded-md focus:ring-neutral-500 focus:neutral-blue-500 block w-full p-2.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder={placeholder}
      />
    </div>
  );
}
