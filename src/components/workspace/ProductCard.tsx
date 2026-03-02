'use client';
import { motion } from 'framer-motion';
import type { Product } from '@/types/workspace';
import { useWorkspaceStore, useLastAction } from '@/store/workspace-store';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useWorkspaceStore((s) => s.addItem);
    const removeItem = useWorkspaceStore((s) => s.removeItem);
    const isSelected = useWorkspaceStore((s) => s.isSelected);
    const lastAction = useLastAction();

    const selected = isSelected(product.id);
    const wasJustAdded =
        lastAction.type === 'add' && lastAction.itemId === product.id;

    const handleToggle = () => {
        if (selected) {
            removeItem(product.id);
        } else {
            addItem(product);
        }
    };

    return (
        <motion.div
            layout
            onClick={handleToggle}
            whileHover={{
                y: -2,
                transition: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            whileTap={{ scale: 0.98 }}
            className={`
        relative p-3.5 rounded-xl cursor-pointer transition-colors duration-200
        ${
            selected
                ? 'bg-terracotta/6 border-[1.5px] border-terracotta/40'
                : 'bg-transparent border-[1.5px] border-transparent hover:bg-black/1.5 hover:border-light-gray'
        }
      `}
        >
            <div className='flex items-center gap-3.5'>
                {/* Emoji icon */}
                <motion.div
                    animate={wasJustAdded ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-colors duration-200
            ${selected ? 'bg-terracotta/10' : 'bg-sand'}
          `}
                >
                    {product.emoji}
                </motion.div>

                {/* Info */}
                <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-1.5'>
                        <span className='text-sm font-semibold text-charcoal truncate'>
                            {product.name}
                        </span>
                        {product.popular && (
                            <span className='text-[10px] font-bold text-terracotta bg-terracotta/[0.08] px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0'>
                                Popular
                            </span>
                        )}
                    </div>
                    <p className='text-[12px] text-warm-gray mt-0.5 leading-snug truncate'>
                        {product.description}
                    </p>
                </div>

                {/* Price */}
                <div className='text-right shrink-0'>
                    <div
                        className={`font-mono text-[15px] font-semibold ${selected ? 'text-terracotta' : 'text-charcoal'}`}
                    >
                        ${product.pricePerMonth}
                    </div>
                    <div className='text-[10px] text-warm-gray'>/month</div>
                </div>
            </div>

            {/* Features (shown when selected) */}
            {selected && product.features && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className='mt-2.5 pt-2.5 border-t border-terracotta/10 flex flex-wrap gap-1.5'
                >
                    {product.features.map((f) => (
                        <span
                            key={f}
                            className='text-[10px] text-warm-gray bg-sand px-2 py-0.5 rounded-md'
                        >
                            {f}
                        </span>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}
