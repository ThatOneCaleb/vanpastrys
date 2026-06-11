"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MenuItem = {
  name: string;
  price: string;
  specialty?: boolean;
  note?: string;
};

type Category = {
  id: string;
  label: string;
  items: MenuItem[];
};

const categories: Category[] = [
  {
    id: "bread",
    label: "Bread",
    items: [
      { name: "Round English Muffin", price: "4.00", specialty: true, note: "Van's Specialty — our biggest seller" },
      { name: "Sugar Cinnamon", price: "4.50" },
      { name: "Almond-Raisin", price: "9.00" },
      { name: "Round Cinnamon Raisin", price: "4.50" },
      { name: "Raisin", price: "4.50" },
      { name: "Multi-Grain", price: "4.50" },
      { name: "Swirl Rye", price: "3.25" },
      { name: "Cracked Wheat", price: "3.25" },
      { name: "Whole Wheat", price: "2.75" },
      { name: "White", price: "2.50" },
    ],
  },
  {
    id: "donuts",
    label: "Donuts",
    items: [
      { name: "Fat Balls (Olie Bollen)", price: "1.75", specialty: true, note: "The Dutch original, since 1924" },
      { name: "Apple Fritter", price: "2.00" },
      { name: "Almond Bear Claw", price: "2.75" },
      { name: "Pecan Roll", price: "2.75" },
      { name: "Raspberry Bismark", price: "2.25" },
      { name: "Turtle Cinnamon", price: "2.50" },
      { name: "Maple Nut", price: "2.50" },
      { name: "Custard Long John", price: "2.00" },
      { name: "Glazed Old-Fashioned", price: "1.50" },
      { name: "Glazed", price: "1.25" },
    ],
  },
  {
    id: "pastries",
    label: "Cookies & Pastries",
    items: [
      { name: "Banket", price: "9.00", specialty: true, note: "Van's Specialty — Dutch almond pastry" },
      { name: "Dutch Crisp Cookies", price: "3.00", specialty: true, note: "Van's Specialty" },
      { name: "Butter Croissant", price: "1.75" },
      { name: "Almond Tart", price: "3.50" },
      { name: "Cream Puff", price: "3.50" },
      { name: "Apple Turnover", price: "3.50" },
      { name: "Lemon Tart", price: "3.50" },
      { name: "Cream Cheese Kolacky", price: "1.50" },
      { name: "Chocolate Chip Cookie", price: "1.00" },
      { name: "Coconut Macaroon", price: "0.75" },
    ],
  },
  {
    id: "muffins",
    label: "Muffins & More",
    items: [
      { name: "Blueberry Muffin", price: "1.25" },
      { name: "Cherry Muffin", price: "1.25" },
      { name: "Chocolate Chip Muffin", price: "1.25" },
      { name: "Honey Bran Muffin", price: "1.50" },
      { name: "Almond Coffee Cake", price: "9.00" },
      { name: "Strawberry Cream Cheese Coffee Cake", price: "9.00" },
      { name: "Hamburger Buns", price: "6 / 2.00" },
      { name: "Sour Dough Rolls", price: "6 / 2.50" },
    ],
  },
  {
    id: "cakes",
    label: "Custom Cakes",
    items: [],
  },
];

export default function Menu() {
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <section id="full-menu" className="relative overflow-hidden bg-parchment py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <p className="font-inter text-[11px] uppercase tracking-widest text-gold">
          From the Counter
        </p>
        <h2 className="mt-5 font-playfair text-[42px] font-bold italic leading-[1.05] text-brown md:text-[56px] lg:text-[64px]">
          The Menu
        </h2>
        <p className="mt-4 max-w-md font-inter text-[15px] leading-relaxed text-brown/60">
          Every item below is baked fresh each morning at 955 Fulton Street —
          the same way it&rsquo;s been done for a hundred years.
        </p>

        {/* Category tabs */}
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-brown/15">
          {categories.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              data-cursor="hover"
              className={`relative pb-4 font-playfair text-[20px] italic transition-colors duration-300 md:text-[24px] ${
                i === active ? "text-brown" : "text-brown/40 hover:text-brown/70"
              }`}
            >
              {c.label}
              {i === active && (
                <motion.span
                  layoutId="menu-tab-underline"
                  className="absolute -bottom-px left-0 right-0 h-[2px] bg-dutch-blue"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Items list */}
        <AnimatePresence mode="wait">
          {cat.id === "cakes" ? (
            <motion.div
              key="cakes"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              {/* Hero callout */}
              <div className="border border-gold/30 bg-espresso p-8 md:p-12">
                <p className="font-inter text-[10px] uppercase tracking-[0.22em] text-gold">
                  Made to Order
                </p>
                <h3 className="mt-4 font-playfair text-[32px] italic leading-snug text-warm-white md:text-[40px]">
                  Custom Sheet Cakes
                  <br />
                  Decorated In-House.
                </h3>
                <p className="mt-4 max-w-xl font-inter text-[14px] leading-relaxed text-cream/60">
                  Every cake is baked and decorated right here at 955 Fulton Street —
                  the same hands, the same recipes. We do sheet cakes only, available
                  in three sizes.
                </p>

                {/* Size grid */}
                <div className="mt-8 grid grid-cols-3 divide-x divide-gold/20 border border-gold/20">
                  {[
                    { size: "¼ Sheet", serves: "~12 servings" },
                    { size: "½ Sheet", serves: "~24 servings" },
                    { size: "Full Sheet", serves: "~48 servings" },
                  ].map((s) => (
                    <div key={s.size} className="p-5 text-center">
                      <p className="font-playfair text-[22px] italic text-gold">
                        {s.size}
                      </p>
                      <p className="mt-1 font-inter text-[11px] uppercase tracking-wider text-cream/45">
                        {s.serves}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Ordering rules */}
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: "24",
                      label: "Hours Notice",
                      desc: "All cake orders require a minimum of 24 hours advance notice.",
                    },
                    {
                      icon: "↗",
                      label: "Order Deadline",
                      desc: "Order Monday by 9 AM for Tuesday. Order Friday by 9 AM for a possible Saturday.",
                    },
                    {
                      icon: "→",
                      label: "Pickup Only",
                      desc: "Online and phone orders are for in-store pickup at 955 Fulton St E.",
                    },
                  ].map((rule) => (
                    <div
                      key={rule.label}
                      className="border border-gold/15 bg-warm-white/5 p-5"
                    >
                      <span className="font-playfair text-[28px] italic text-gold/60">
                        {rule.icon}
                      </span>
                      <p className="mt-2 font-inter text-[11px] uppercase tracking-[0.16em] text-cream/80">
                        {rule.label}
                      </p>
                      <p className="mt-2 font-inter text-[13px] leading-relaxed text-cream/50">
                        {rule.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="tel:+16164581637"
                    data-cursor="hover"
                    className="inline-flex items-center gap-3 border border-gold bg-gold px-7 py-3.5 font-inter text-[12px] uppercase tracking-[0.18em] text-espresso transition-colors duration-300 hover:bg-gold/90"
                  >
                    Call to Order · (616) 458-1637
                  </a>
                  <a
                    href="https://www.vanspastry.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-3 border border-gold/40 px-7 py-3.5 font-inter text-[12px] uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:border-gold"
                  >
                    Order Online (Pickup)
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.ul
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 grid grid-cols-1 gap-x-16 md:grid-cols-2"
            >
              {cat.items.map((item) => (
                <li
                  key={item.name}
                  className="group border-b border-brown/10 py-5"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-playfair text-[19px] italic text-brown transition-colors duration-300 group-hover:text-gold md:text-[21px]">
                      {item.name}
                      {item.specialty && (
                        <span className="ml-3 inline-block -translate-y-[3px] border border-dutch-blue/60 px-2 py-[2px] font-inter text-[9px] not-italic uppercase tracking-[0.18em] text-dutch-blue">
                          Specialty
                        </span>
                      )}
                    </span>
                    <span className="flex-1 border-b border-dotted border-brown/25 transition-colors duration-300 group-hover:border-gold/40" />
                    <span className="font-playfair text-[18px] text-brown/70 transition-colors duration-300 group-hover:text-gold">
                      ${item.price}
                    </span>
                  </div>
                  {item.note && (
                    <p className="mt-1 font-inter text-[12px] uppercase tracking-[0.14em] text-brown/45">
                      {item.note}
                    </p>
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <p className="mt-10 font-inter text-[13px] text-brown/50">
          Seasonal items rotate — pumpkin and apple donuts in fall, paczki for
          Fat Tuesday, hot cross buns at Easter.{" "}
          <a
            href="/assets/vans-menu.pdf"
            download="vans-menu.pdf"
            data-cursor="hover"
            className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-brown"
          >
            Download the full menu
          </a>
        </p>
      </div>
    </section>
  );
}
