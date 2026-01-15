'use client';

import { motion } from 'framer-motion';

export default function ResultCard({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: delay,
                type: "spring",
                stiffness: 100
            }}
            style={{ perspective: "1000px" }}
        >
            {children}
        </motion.div>
    );
}
