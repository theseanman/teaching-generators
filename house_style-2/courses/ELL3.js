// Course-level settings: everything that differs between courses lives here, not in the renderer.
module.exports = {
  code: "ELL3", name: "ELL 3", room: "148", teacher: "Mr. Reid",
  comp: ["COM", "TH", "PS"],
  helpSlip: {
    tagline: "Stuck? Ask. Good writers ask for help.",
    sample: { name: "Mina K.", date: "Sep 14", need: "Part D, question 2",
      question: ["Is \u201che is kind\u201d enough, or do I need a", "quote from the story too?"],
      reply: ["Yes, you need both. Find the line", "that made you think it. Try line 8."] } },
  // Routine slides, pulled into a lesson with { type: "routines" }
  routines: [
    { type: "section", label: "How our class works", title: "How our class works", sub: "Before we start", icon: "icon-hand.png" },
    { type: "routine", label: "Your exercise book", tag: "How our class works", head: "Your exercise book goes home", icon: "icon-book.png",
      big: "Take it home.\nBring it back.",
      items: ["Write notes in it, so you can review at home.", "Write down assignments and due dates.", "Write down announcements and reminders.", "Warm-ups go in here \u2014 starting today."] },
    { type: "routine", label: "Your duotang", tag: "How our class works", head: "Your duotang stays in class", icon: "icon-folder.png", tone: "teal",
      big: "It lives here.\nIt never goes home.",
      items: ["Your worksheets and class work go in your duotang.", "At the end of every lesson, put today\u2019s work in it.", "Hand it in \u2014 I read your work from it.", "It is here for you at the start of every class."] },
    { type: "imagesteps", label: "Help slips", tag: "How our class works", head: "Stuck? Use a help slip", image: "helpslip.png",
      steps: ["Take a slip from the box. You do not need to ask me first.", "Tick what you want me to check.", "Write exactly what you need help with, and your question in words.", "Hand it to me and keep working. It comes back with my answer in the box."] },
    { type: "imagebullets", label: "What a help slip looks like", tag: "How our class works", head: "A help slip, filled in", image: "helpslip-filled.png",
      title: "What makes this a good help slip",
      bullets: ["It says exactly where: Part D, question 2.", "It asks a real question in words \u2014 not just \u201CI don\u2019t get it.\u201D", "Mina kept working while she waited.", "Asking for help is not a problem. It is how writers get better."] } ]
};
