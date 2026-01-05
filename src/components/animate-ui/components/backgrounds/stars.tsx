'use client';

import * as React from 'react';
import {
  type HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
  type Transition,
} from 'motion/react';

import { cn } from '@/lib/utils';

type StarLayerProps = HTMLMotionProps<'div'> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: 'linear' },
  starColor = '#fff',
  className,
  ...props
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>('');

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn('absolute top-0 left-0 w-full h-500', className)}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-500"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<'div'> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  pointerEvents?: boolean;
};

function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = '#fff',
  pointerEvents = true,
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      data-slot="stars-background"
      //bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#000_100%)]
      className={cn(
        'relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#000_100%)]',
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >

      <div
        className="pointer-events-none absolute -bottom-40 left-0 right-0 z-10 h-[500px] w-full
                   overflow-hidden opacity-50 blur-[100px]"
      >
        {/* LUZ VERDE */}
        <motion.div
          className="absolute bottom-0 left-[10%] h-[200px] w-[30%] origin-bottom rounded-full bg-green-500"
          animate={{
            x: ['-20%', '19%'], 
            scaleY: [0.5, 1.2, 0.5],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 5, // Más lento
            ease: 'easeInOut',
          }}
        />

        {/* LUZ AMARILLA */}
        <motion.div
          className="absolute bottom-0 left-[30%] h-[200px] w-[40%] origin-bottom rounded-full bg-yellow-500"
          animate={{
            x: ['-25%', '25%'],
            scaleY: [0.8, 1.1, 0.8],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 8, // Duración diferente
            ease: 'easeInOut',
            delay: 3, // Delay
          }}
        />
        {/* LUZ ROJA */}
        <motion.div
          className="absolute bottom-0 left-[60%] h-[200px] w-[35%] origin-bottom rounded-full bg-red-500"
          animate={{
            x: ['-14%', '19%'],
            scaleY: [0.7, 1.3, 0.7],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 10,
            ease: 'easeInOut',
            delay: 7,
          }}
        />
        {/* LUZ AZUL */}
        <motion.div
          className="absolute bottom-0 left-[80%] h-[200px] w-[30%] origin-bottom rounded-full bg-blue-500"
          animate={{
            x: ['-19%', '17%'],
            scaleY: [0.6, 1.1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 6,
            ease: 'easeInOut',
            delay: 5,
          }}
        />
       
      </div>

      <motion.div
        style={{ x: springX, y: springY }}
        className={cn({ 'pointer-events-none': !pointerEvents })}
      >
        <StarLayer
          count={1000}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
        <StarLayer
          count={400}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: 'linear',
          }}
          starColor={starColor}
        />
        <StarLayer
          count={200}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 3,
            ease: 'linear',
          }}
          starColor={starColor}
        />
      </motion.div>
      {children}
    </div>
  );
}

export {
  StarLayer,
  StarsBackground,
  type StarLayerProps,
  type StarsBackgroundProps,
};