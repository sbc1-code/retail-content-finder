// Fictional catalog content for an independent portfolio sample.
export const articles = [
  {
    id: "coffee-grinder-cleaning",
    status: "published",
    title: "Clean a coffee grinder without damaging it",
    category: "Coffee & tea",
    task: "Care",
    summary: "Remove old grounds and oils with a dry brush before they affect flavor.",
    metaDescription: "A safe, five-minute routine for cleaning a home coffee grinder without water near the motor.",
    keywords: ["grinder", "coffee", "burr", "clean", "grounds", "flavor"],
    minutes: 5,
    image: { src: "assets/grinder.svg", alt: "Coffee grinder with its removable hopper beside it" },
    before: "Unplug the grinder. Check its manual before removing any burrs or panels.",
    steps: [
      "Empty the hopper and brush loose grounds from the lid and feed opening.",
      "Remove only the parts your manual identifies as user-removable. Brush the burrs and chamber with a dry, soft brush.",
      "Wipe the outside with a lightly damp cloth. Keep liquid out of the motor, burr chamber, and power connection.",
      "Reassemble dry parts, then grind a small amount of coffee to clear any remaining loose grounds."
    ],
    relatedIds: ["kettle-descaling", "blender-leak"]
  },
  {
    id: "blender-leak",
    status: "published",
    title: "Find the cause of a blender jar leak",
    category: "Kitchen",
    task: "Troubleshoot",
    summary: "Check the gasket, blade assembly, and fill level before replacing a part.",
    metaDescription: "A practical checklist for diagnosing a leaking blender jar and knowing when to stop using it.",
    keywords: ["blender", "leak", "gasket", "jar", "seal", "blade"],
    minutes: 7,
    image: { src: "assets/blender.svg", alt: "Blender jar and removable sealing ring shown separately" },
    before: "Unplug the blender. Do not operate it if liquid has entered the motor base or the jar is cracked.",
    steps: [
      "Dry the jar and place it on a towel so you can see where fresh moisture appears.",
      "Inspect the sealing ring for twists, tears, or trapped food. Refit it according to the product manual.",
      "Confirm the blade assembly and base are seated as directed, without overtightening.",
      "Fill below the marked maximum line and test with a small amount of water. Replace damaged parts with compatible parts."
    ],
    relatedIds: ["coffee-grinder-cleaning", "kettle-descaling"]
  },
  {
    id: "air-purifier-filter",
    status: "published",
    title: "Know when to replace an air purifier filter",
    category: "Home air",
    task: "Care",
    summary: "Use the filter indicator and a physical check together, then reset the reminder.",
    metaDescription: "Learn how to check a home air purifier filter, replace it safely, and reset the indicator.",
    keywords: ["air purifier", "filter", "airflow", "dust", "replace"],
    minutes: 6,
    image: null,
    before: "Turn the purifier off and unplug it. Use the filter type listed in its manual.",
    steps: [
      "Check the indicator and the manual's replacement interval; usage and air conditions can change the timing.",
      "Open the filter compartment and inspect for heavy buildup or damage. Do not wash a filter unless its manual says it is washable.",
      "Insert a compatible replacement in the marked airflow direction and close the cover fully.",
      "Reset the filter reminder using the model's instructions and note the replacement date."
    ],
    relatedIds: ["humidifier-care"]
  },
  {
    id: "lamp-bulb-fit",
    status: "published",
    title: "Choose a bulb that fits your lamp",
    category: "Lighting",
    task: "Choose a product",
    summary: "Match the base, fixture rating, brightness, and color temperature.",
    metaDescription: "Four checks to make before buying a replacement lamp bulb, including socket and fixture rating.",
    keywords: ["lamp", "bulb", "socket", "led", "brightness", "watt"],
    minutes: 4,
    image: null,
    before: "Switch the lamp off, unplug it, and let the old bulb cool before removing it.",
    steps: [
      "Read the fixture label for the permitted bulb type and maximum wattage.",
      "Match the old bulb's base shape and size. Do not force a bulb into a socket.",
      "Choose brightness in lumens and a color temperature that suits the room.",
      "For dimmable lamps, check that both the bulb and dimmer are compatible."
    ],
    relatedIds: ["air-purifier-filter"]
  },
  {
    id: "kettle-descaling",
    status: "published",
    title: "Descale an electric kettle",
    category: "Coffee & tea",
    task: "Care",
    summary: "Clear mineral buildup with the method recommended for your kettle.",
    metaDescription: "Simple steps to remove mineral scale from an electric kettle and rinse it before use.",
    keywords: ["kettle", "descale", "limescale", "mineral", "clean"],
    minutes: 12,
    image: null,
    before: "Unplug the kettle and let it cool. Follow the manufacturer's cleaning instructions first.",
    steps: [
      "Empty the kettle and add the manufacturer-recommended descaling solution at the stated dilution.",
      "Let it sit only as long as directed; do not immerse the kettle or its power base.",
      "Pour out the solution and rinse thoroughly.",
      "Boil and discard fresh water as directed before making a drink."
    ],
    relatedIds: ["coffee-grinder-cleaning"]
  },
  {
    id: "humidifier-care",
    status: "published",
    title: "Keep a humidifier tank clean",
    category: "Home air",
    task: "Care",
    summary: "Empty, dry, and clean the tank on a schedule that follows your manual.",
    metaDescription: "A simple humidifier tank care routine for reducing residue and keeping parts dry between uses.",
    keywords: ["humidifier", "tank", "clean", "water", "residue"],
    minutes: 8,
    image: null,
    before: "Unplug the unit. Follow the model's manual for cleaning products, frequency, and filter handling.",
    steps: [
      "Empty any remaining water and rinse the tank after use.",
      "Clean removable parts using only the method and products approved in the manual.",
      "Rinse thoroughly and dry the tank and accessible surfaces before storage.",
      "Replace filters on the schedule specified for your model."
    ],
    relatedIds: ["air-purifier-filter"]
  },
  {
    id: "draft-vacuum-brush",
    status: "draft",
    title: "Unclog a vacuum brush roll",
    category: "Floor care",
    task: "Troubleshoot",
    summary: "A draft article retained to show how the QA view catches release blockers.",
    metaDescription: "",
    keywords: ["vacuum", "brush", "clog"],
    minutes: 9,
    image: { src: "assets/vacuum.svg", alt: "" },
    before: "Unplug the vacuum and check the manual before opening the brush housing.",
    steps: ["Remove visible hair and debris using the manual's instructions."],
    relatedIds: ["replacement-vacuum-belt"]
  }
];
