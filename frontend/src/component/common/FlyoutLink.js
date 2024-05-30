import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
//co xai
const FlyoutLink = ({children,href, FlyoutContent}) => {
    const [open, setOpen] = useState(false);
    const showFlyout = FlyoutContent && open;
    const linkRef = useRef(null);

    useEffect(() => {
        if (open && linkRef.current) {
            linkRef.current.focus();
        }
    }, [open]);

    return (
        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="ml-10 relative h-fit w-fit"
        >
            <Link to={href} className=" text-black hover:text-gray-700 font-medium relative">
                {children}
                <span
                    style={{
                        transform: open ? "scaleX(1)" : "scaleX(0)",
                        width: "100%",
                    }}
                    className="absolute -bottom-2 left-0 right-2 h-1 origin-left scale-x-0 rounded-full bg-opacity-100 bg-blue-light transition-transform duration-300 ease-out"
                />
            </Link>
                <AnimatePresence>
                    {showFlyout && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            style={{ translateX: "-50%", zIndex: 9999 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute left-1/2 top-12 bg-purple text-black" //phần mũi tên các góc của category
                        >
                            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-purple" /> 
                            {FlyoutContent}
                        </motion.div>
                    )}
                </AnimatePresence>
        </div>

    );
};

export default FlyoutLink;
