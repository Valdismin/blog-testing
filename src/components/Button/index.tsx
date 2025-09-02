import {classNames} from "../../utils/classnames.ts";

function Button({
                    children,
                    onClick,
                    variant = "default",
                    className,
                    type = "button",
                }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "ghost" | "danger" | "primary";
    className?: string;
    type?: "button" | "submit";
}) {
    const base = "px-3 py-2 rounded-xl text-sm font-medium transition hover:opacity-90";
    const variants: Record<string, string> = {
        default: "bg-gray-100",
        ghost: "bg-transparent hover:bg-gray-100",
        danger: "bg-red-500 text-white",
        primary: "bg-blue-600 text-white",
    };
    return (
        <button type={type} onClick={onClick} className={classNames(base, variants[variant], className)}>
            {children}
        </button>
    );
}

export default Button;
