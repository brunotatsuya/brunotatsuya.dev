'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const blurContainer = (stagger: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
})

const blurItem = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

type BlurRevealProps = {
  children: ReactNode
  className?: string
  stagger?: number
  amount?: number
  once?: boolean
}

type BlurRevealItemProps = {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function BlurReveal({
  children,
  className,
  stagger = 0.08,
  amount = 0.3,
  once = true,
}: BlurRevealProps) {
  return (
    <motion.div
      className={className}
      variants={blurContainer(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

export function BlurRevealItem({
  children,
  className,
  as = 'div',
}: BlurRevealItemProps) {
  const MotionComponent = motion(as)

  return (
    <MotionComponent className={className} variants={blurItem}>
      {children}
    </MotionComponent>
  )
}
