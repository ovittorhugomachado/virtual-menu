import { useManageMenu } from "../../../context/manage-menu/manage-menu-context";

export const Footer = () => {

    const { tempBackgroundColor } = useManageMenu();

    return (
            <footer className={`${tempBackgroundColor === 'black' ? 'border-zinc-800' : 'border-zinc-300'} w-screen h-25 mt-20  border-t-1 flex items-center justify-center`}>
                {tempBackgroundColor === 'black' ? (
                    <img
                        src="../logo-text-dark.png"
                        alt="Footer Dark Mode"
                        width={200}
                    />
                ) : (
                    <img
                        src="../logo-text-light.png"
                        alt="Footer Light Mode"
                        width={200}
                    />
                )}
            </footer>
    )
}