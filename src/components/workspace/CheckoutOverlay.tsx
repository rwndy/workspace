"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  useWorkspaceStore,
  useWorkspaceItems,
  useWorkspaceDuration,
  useCheckoutOpen,
} from "@/store/workspace-store";
import { useState } from "react";

export function CheckoutOverlay() {
  const items = useWorkspaceItems();
  const duration = useWorkspaceDuration();
  const showCheckout = useCheckoutOpen();
  const toggleCheckout = useWorkspaceStore((s) => s.toggleCheckout);
  const getTotalMonthly = useWorkspaceStore((s) => s.getTotalMonthly);

  const [confirmed, setConfirmed] = useState(false);

  const totalMonthly = getTotalMonthly();
  const discountedMonthly = Math.round(totalMonthly * (1 - duration.discount / 100));
  const totalForPeriod = discountedMonthly * duration.months;

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const handleClose = () => {
    setConfirmed(false);
    toggleCheckout();
  };

  return (
    <AnimatePresence>
      {showCheckout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-warm-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {!confirmed ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Header */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                      className="text-5xl mb-3"
                    >
                      🎉
                    </motion.div>
                    <h2 className="text-2xl font-extrabold text-charcoal mb-1">
                      Your workspace is ready!
                    </h2>
                    <p className="text-sm text-warm-gray">
                      We'll deliver everything to your door in Bali
                    </p>
                  </div>

                  {/* Item list */}
                  <div className="bg-sand rounded-xl p-4 mb-5">
                    {items.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className="flex items-center justify-between py-2 border-b border-black/[0.04] last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{item.emoji}</span>
                          <span className="text-sm font-medium text-charcoal">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-semibold text-charcoal">
                          ${item.pricePerMonth}/mo
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pricing summary */}
                  <div className="mb-6 space-y-1">
                    <div className="flex justify-between items-baseline text-sm text-warm-gray">
                      <span>{duration.label} rental</span>
                      <span>
                        {duration.discount > 0
                          ? `${duration.discount}% off applied`
                          : "No discount"}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-lg font-bold text-charcoal">Total</span>
                      <div className="text-right">
                        <span className="font-mono text-3xl font-extrabold text-terracotta">
                          ${discountedMonthly}
                        </span>
                        <span className="text-sm text-warm-gray">/month</span>
                        <div className="text-xs text-warm-gray mt-0.5">
                          ${totalForPeriod} total for {duration.months} month
                          {duration.months !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirm}
                    className="w-full py-4 rounded-xl bg-gradient-to-br from-terracotta to-terracotta-light text-white text-base font-bold shadow-lg shadow-terracotta/30 mb-3"
                  >
                    Confirm Rental →
                  </motion.button>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 text-sm text-warm-gray hover:text-charcoal transition-colors"
                  >
                    Keep customizing
                  </button>

                  <p className="text-[11px] text-warm-gray/60 text-center mt-3">
                    Free delivery in Bali · Cancel anytime before delivery · Insurance included
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="text-6xl mb-4"
                  >
                    ✅
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-charcoal mb-2">
                    Booking confirmed!
                  </h2>
                  <p className="text-sm text-warm-gray mb-1">
                    Your workspace setup will be delivered within 24 hours.
                  </p>
                  <p className="text-sm text-warm-gray mb-6">
                    Check your email for confirmation details.
                  </p>

                  <div className="bg-sand rounded-xl p-4 mb-6 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span>📍</span>
                      <span className="text-sm font-semibold text-charcoal">
                        Delivery to your address
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span>📦</span>
                      <span className="text-sm text-charcoal">
                        {items.length} items · {duration.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💰</span>
                      <span className="font-mono text-sm font-semibold text-terracotta">
                        ${discountedMonthly}/month
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="w-full py-3.5 rounded-xl bg-charcoal text-white text-sm font-bold"
                  >
                    Done
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
