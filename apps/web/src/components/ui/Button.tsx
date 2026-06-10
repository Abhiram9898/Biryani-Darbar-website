import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
export function Button({className,children,...props}:HTMLMotionProps<'button'>){return <motion.button whileHover={{scale:1.04}} whileTap={{scale:.97}} className={cn('rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFB347] px-6 py-3 font-semibold text-black shadow-[0_12px_40px_rgba(212,175,55,.25)]',className)} {...props}>{children}</motion.button>}
