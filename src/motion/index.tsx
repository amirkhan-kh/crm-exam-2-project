import { useRef, useEffect} from "react";
import type { ReactNode } from 'react'
import { motion, useInView, useAnimation } from "motion/react";
interface RevalProps {
    children: ReactNode;
    width?: string | number;
  }
  export const Reval = ({ children, width }: RevalProps) =>{
    const ref = useRef(null)
    const isInView = useInView(ref, {once: true}) 
    const mainControls = useAnimation()
    const slideControls = useAnimation()

    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
        
    }, [isInView ])
    return(
        <div ref={ref} style={{position: "relative", width, overflow: "hidden"}}>
            <motion.div
                variants={{
                    hidden: {opacity: 0, y: 195},
                    visible: {opacity: 1, y: 0},
                }}
                initial="hidden"
                animate={mainControls }
                transition={{ duration: 1, delay: 0.25 }}
            >
                {children}
            </motion.div>
            <motion.div
                variants={{
                    hidden: {opacity: 0, y: 195},
                    visible: {opacity: 1, y: 0},
                }}
                initial="hidden"
                animate={slideControls }
                transition={{ duration: 1, ease: 'easeIn'}}
                style={{
                    position: "absolute",
                    top: 4,
                    left: 0,
                    right: 0,
                    bottom: 4,
                    zIndex: 20,
                    

                }}
            >
            </motion.div>

        </div>
    )
}