'use client'

import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import type { ReactNode } from 'react'

const blurContainer = (stagger: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
})

const blurItem: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
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
  as?: BlurRevealTag
}

type BlurRevealTag = 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span'

const motionTags: Record<BlurRevealTag, typeof motion.div> = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
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
  const MotionComponent = motionTags[as]

  return (
    <MotionComponent className={className} variants={blurItem}>
      {children}
    </MotionComponent>
  )
}
