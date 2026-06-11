const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const CREAM = rgb(0.961, 0.929, 0.839);    // #F5EDD6
const ESPRESSO = rgb(0.173, 0.098, 0.031); // #2C1A08
const GOLD = rgb(0.769, 0.576, 0.247);     // #C4933F
const DUTCH = rgb(0.118, 0.196, 0.392);    // #1E3264
const BROWN = rgb(0.345, 0.224, 0.118);    // #58391E
const MUTED = rgb(0.545, 0.396, 0.251);    // #8B6540

const menu = [
  {
    label: "Bread",
    items: [
      ["Round English Muffin  [S]", "4.00"],
      ["Sugar Cinnamon", "4.50"],
      ["Almond-Raisin", "9.00"],
      ["Round Cinnamon Raisin", "4.50"],
      ["Raisin", "4.50"],
      ["Multi-Grain", "4.50"],
      ["Swirl Rye", "3.25"],
      ["Cracked Wheat", "3.25"],
      ["Whole Wheat", "2.75"],
      ["White", "2.50"],
    ],
  },
  {
    label: "Donuts",
    items: [
      ["Fat Balls (Olie Bollen)  [S]", "1.75"],
      ["Apple Fritter", "2.00"],
      ["Almond Bear Claw", "2.75"],
      ["Pecan Roll", "2.75"],
      ["Raspberry Bismark", "2.25"],
      ["Turtle Cinnamon", "2.50"],
      ["Maple Nut", "2.50"],
      ["Custard Long John", "2.00"],
      ["Glazed Old-Fashioned", "1.50"],
      ["Glazed", "1.25"],
    ],
  },
  {
    label: "Cookies & Pastries",
    items: [
      ["Banket  [S]", "9.00"],
      ["Dutch Crisp Cookies  [S]", "3.00"],
      ["Butter Croissant", "1.75"],
      ["Almond Tart", "3.50"],
      ["Cream Puff", "3.50"],
      ["Apple Turnover", "3.50"],
      ["Lemon Tart", "3.50"],
      ["Cream Cheese Kolacky", "1.50"],
      ["Chocolate Chip Cookie", "1.00"],
      ["Coconut Macaroon", "0.75"],
    ],
  },
  {
    label: "Muffins & More",
    items: [
      ["Blueberry Muffin", "1.25"],
      ["Cherry Muffin", "1.25"],
      ["Chocolate Chip Muffin", "1.25"],
      ["Honey Bran Muffin", "1.50"],
      ["Almond Coffee Cake", "9.00"],
      ["Strawberry Cream Cheese Coffee Cake", "9.00"],
      ["Hamburger Buns", "6 / 2.00"],
      ["Sour Dough Rolls", "6 / 2.50"],
    ],
  },
];

async function build() {
  const doc = await PDFDocument.create();
  doc.setTitle("Van's Pastry Shoppe — Menu");
  doc.setAuthor("Van's Pastry Shoppe");
  doc.setSubject("Full menu — baked fresh daily at 955 Fulton Street, Grand Rapids, MI");

  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await doc.embedFont(StandardFonts.Helvetica);
  const obliqueFont = await doc.embedFont(StandardFonts.HelveticaOblique);

  const W = 612, H = 792; // US Letter
  const MARGIN = 52;
  const COL_W = (W - MARGIN * 2 - 24) / 2;

  const page = doc.addPage([W, H]);

  // Background
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: CREAM });

  // Top bar (dutch blue)
  page.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: DUTCH });

  // Bottom bar
  page.drawRectangle({ x: 0, y: 0, width: W, height: 6, color: DUTCH });

  let y = H - 40;

  // Header
  page.drawText("VAN'S PASTRY SHOPPE", {
    x: MARGIN, y,
    font: boldFont, size: 20, color: ESPRESSO,
  });

  y -= 18;
  page.drawText("955 Fulton Street E  ·  Grand Rapids, MI  ·  Est. 1924", {
    x: MARGIN, y,
    font: regularFont, size: 9, color: MUTED,
  });

  y -= 8;
  // Horizontal rule (gold)
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: W - MARGIN, y },
    thickness: 1, color: GOLD,
  });

  y -= 20;

  page.drawText("FRESH DAILY MENU", {
    x: MARGIN, y,
    font: boldFont, size: 11, color: DUTCH,
  });

  y -= 24;

  // Two-column layout
  const colPositions = [MARGIN, MARGIN + COL_W + 24];
  let colIdx = 0;
  let colY = [y, y];

  for (const section of menu) {
    const col = colIdx % 2;
    let cy = colY[col];
    const x = colPositions[col];

    // Section heading
    page.drawRectangle({
      x, y: cy - 3, width: COL_W, height: 18,
      color: DUTCH,
    });
    page.drawText(section.label.toUpperCase(), {
      x: x + 8, y: cy,
      font: boldFont, size: 9, color: CREAM,
    });
    cy -= 22;

    for (const [name, price] of section.items) {
      const isSpecialty = name.includes("[S]");
      const displayName = name.replace("  [S]", "");

      // Dotted leader line
      const nameW = (isSpecialty ? boldFont : regularFont).widthOfTextAtSize(displayName, 9);
      const priceW = regularFont.widthOfTextAtSize("$" + price, 9);
      const leaderStart = x + nameW + 4;
      const leaderEnd = x + COL_W - priceW - 4;

      if (leaderEnd > leaderStart + 8) {
        for (let lx = leaderStart; lx < leaderEnd; lx += 5) {
          page.drawText(".", {
            x: lx, y: cy - 1,
            font: regularFont, size: 9, color: MUTED,
          });
        }
      }

      page.drawText(displayName, {
        x, y: cy,
        font: isSpecialty ? boldFont : regularFont,
        size: 9, color: isSpecialty ? BROWN : ESPRESSO,
      });
      page.drawText("$" + price, {
        x: x + COL_W - priceW, y: cy,
        font: regularFont, size: 9, color: ESPRESSO,
      });

      cy -= 15;
    }

    colY[col] = cy - 8;
    colIdx++;
  }

  // Custom cakes section — full width, near bottom
  const cakeTop = Math.min(colY[0], colY[1]) - 16;
  page.drawLine({
    start: { x: MARGIN, y: cakeTop + 8 },
    end: { x: W - MARGIN, y: cakeTop + 8 },
    thickness: 0.5, color: GOLD,
  });

  const cakeY = cakeTop - 8;
  page.drawText("CUSTOM SHEET CAKES — Made to Order", {
    x: MARGIN, y: cakeY,
    font: boldFont, size: 9, color: DUTCH,
  });
  page.drawText("24-hour advance notice required  ·  Pickup only at 955 Fulton St E  ·  Call (616) 458-1637 to order", {
    x: MARGIN, y: cakeY - 14,
    font: regularFont, size: 8, color: MUTED,
  });

  const cakeSizes = [
    ["¼ Sheet", "~12 servings"],
    ["½ Sheet", "~24 servings"],
    ["Full Sheet", "~48 servings"],
  ];
  let csx = MARGIN;
  for (const [sz, srv] of cakeSizes) {
    page.drawText(sz, { x: csx, y: cakeY - 28, font: boldFont, size: 9, color: BROWN });
    page.drawText(srv, { x: csx, y: cakeY - 40, font: regularFont, size: 8, color: MUTED });
    csx += 120;
  }

  // Footer
  y = 22;
  page.drawText("[S] = Van's Specialty      Seasonal items rotate — paczki for Fat Tuesday, hot cross buns at Easter, pumpkin donuts in fall.", {
    x: MARGIN, y,
    font: obliqueFont, size: 7.5, color: MUTED,
  });

  const pdfBytes = await doc.save();
  const outPath = path.join(__dirname, "../public/assets/vans-menu.pdf");
  fs.writeFileSync(outPath, pdfBytes);
  console.log("Generated:", outPath, `(${Math.round(pdfBytes.length / 1024)} KB)`);
}

build().catch((e) => { console.error(e); process.exit(1); });
