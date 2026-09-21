/* Links page (links/index.html): every link lives here. Edit this file to change a title, description, URL, look, order, or to hide a card.

   Fields
     title        big serif heading on the card
     description  one short line under it
     url          where it goes. Paths are relative to the links/ folder, so the portfolio is "../".
                  Use a full https:// address if you'd rather (a QR code should point at the links page itself).
     external     true = opens in a new tab (use for other websites and PDFs)
     icon         "linkedin" | "resume" | "mail" | "pencil" | "" (none)
     style        "sticky" (pink note) | "notebook" (ruled paper) | "grid" (blue grid paper) | "orange" | "lavender"
     size         "primary" (big, full width) | "wide" (full width) | "half" (two per row)
     tilt         degrees the card is rotated at rest (keep it small, about -2 to 2)
     tape         "violet" | "yellow" | "" strip of tape across the top
     star         true = yellow hand-drawn star on the corner
     draw         true = hand-drawn marker underline on the last word of the title
     detail       optional small line of text (the email address, for example)
     dog          true = the golden retriever peeks over the top of this card (use on one card only)
     note         handwritten note that sits beside the dog (only shows on the card with dog: true)
     visible      false hides the card without deleting it

   Cards appear in the order listed. */
window.JB = window.JB || {};
JB.LINKS = [
  {
    title: "Explore my portfolio",
    description: "Projects, design, ideas + the work behind them.",
    url: "../",
    icon: "",
    style: "sticky", size: "primary", tilt: -1.2, tape: "violet", star: true, draw: true,
    visible: true
  },
  {
    title: "LinkedIn",
    description: "Let’s connect professionally.",
    url: "https://www.linkedin.com/in/jessica-b-238604137/",
    external: true,
    icon: "linkedin",
    style: "notebook", size: "half", tilt: 1.1,
    visible: true
  },
  {
    title: "Resume",
    description: "Experience, education + skills.",
    url: "../assets/Jess-Boyd-Resume.pdf",   /* PLACEHOLDER: drop your PDF in assets/ with this name, or change the path */
    external: true,
    icon: "resume",
    style: "grid", size: "half", tilt: -1.4, tape: "yellow",
    visible: true
  },
  {
    title: "My current projects",
    description: "What I’m making + exploring lately.",
    url: "#",                                /* PLACEHOLDER: add the real address, then set visible: true */
    icon: "pencil",
    style: "lavender", size: "wide", tilt: 0.7,
    visible: false
  },
  {
    title: "Email me",
    description: "Say hi or reach out about working together.",
    detail: "connect.jessboyd@gmail.com",
    url: "mailto:connect.jessboyd@gmail.com",
    icon: "mail",
    style: "orange", size: "wide", tilt: 0.6,
    dog: true, note: "say hi!",
    visible: true
  }
];
