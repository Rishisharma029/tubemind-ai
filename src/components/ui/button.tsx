"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    
    // Core Tailwind variants matching Shadcn/Linear styling
    const baseStyle = "inline-flex items-center justify-center font-medium rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-95";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/95 shadow-sm shadow-primary/20",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/40",
      outline: "bg-transparent text-foreground border border-border hover:bg-secondary/40",
      ghost: "bg-transparent text-foreground hover:bg-secondary/60",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm"
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-7 py-3.5 text-base gap-2.5",
      icon: "w-10 h-10 rounded-xl"
    };

    const cn = twMerge(clsx(baseStyle, variants[variant], sizes[size], className));

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn}
        disabled={disabled || isLoading}
        {...(props as React.ComponentPropsWithoutRef<"button">)}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
