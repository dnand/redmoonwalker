// Build Walkthrough Data Structure
// Simple step-by-step guides for building specific shoes

export interface BuildResource {
  id: string
  title: string
  description: string
  type: "video" | "guide" | "article"
  link: string
  courseSlug?: string
}

export interface BuildStep {
  id: string
  position: number
  title: string
  instruction: string
  details?: string
  imageUrl?: string
  duration?: string
  resources: BuildResource[]
  tips?: string[]
  category?: string
}

export interface BuildWalkthrough {
  id: string
  slug: string
  title: string
  description: string
  coverImageUrl: string
  difficulty: "beginner" | "intermediate" | "advanced"
  totalTime: string
  materialsNeeded: string[]
  toolsNeeded: string[]
  steps: BuildStep[]
  productId?: string
}

export const mockBuilds: BuildWalkthrough[] = [
  {
    id: "build-1",
    slug: "jordan-1-low-travis-scott",
    title: "Nike Air Jordan 1 Low Travis Scott",
    description: "Build the iconic Travis Scott x Air Jordan 1 Low from scratch. This guide covers the complete construction process from cutting patterns to attaching the sole, including the signature reverse swoosh placement.",
    coverImageUrl: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800",
    difficulty: "advanced",
    totalTime: "6-8 hours",
    materialsNeeded: [
      "Mocha/Dark Brown leather (upper)",
      "Sail/Cream leather (mudguard, midsole wrap)",
      "Black leather (swoosh, collar)",
      "University Red accent leather",
      "White leather (tongue base)",
      "Foam padding (collar, tongue)",
      "Reinforcement material (heel counter, toe box)",
      "Lasting board",
      "Pre-made sole unit (Air Jordan 1 sole)",
      "Thread (matching colors)",
      "Contact cement",
      "Edge paint"
    ],
    toolsNeeded: [
      "Leather cutting knife/rotary cutter",
      "Cutting mat",
      "Skiving knife or machine",
      "Sewing machine (industrial preferred)",
      "Zig-zag capable machine",
      "Lasting pliers",
      "Shoe last (AJ1 Low shape)",
      "Rubber mallet",
      "Heat gun",
      "Clamps",
      "Pattern templates",
      "Ruler and marking tools"
    ],
    steps: [
      // === PATTERN & PREP (Steps 1-4) ===
      {
        id: "ts-step-1",
        position: 1,
        title: "Cut the Pattern Pieces",
        category: "Pattern & Prep",
        instruction: "Cut all pattern pieces from your leather: quarter panels, heel overlay, mudguard, apron (toe box), swooshes, eyestays, tongue pieces, collar, and backtab.",
        details: "For the Travis Scott colorway, cut the quarters and heel from mocha/brown leather, the mudguard and toe from sail/cream leather, swooshes from black leather, and accent pieces from red. Ensure grain direction runs consistently across all pieces.",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
        duration: "45 min",
        tips: [
          "Use sharp rotary cutter for clean edges",
          "Label each piece with chalk on the flesh side",
          "Cut swooshes as mirror pairs (left/right)",
          "The reverse swoosh should point backward"
        ],
        resources: [
          {
            id: "ts-res-1",
            title: "Pattern Cutting for Sneakers",
            description: "Learn to cut leather patterns accurately",
            type: "video",
            link: "/learn/complete-beginners-guide-shoemaking/1/2",
            courseSlug: "complete-beginners-guide-shoemaking"
          }
        ]
      },
      {
        id: "ts-step-2",
        position: 2,
        title: "Skive Edges",
        category: "Pattern & Prep",
        instruction: "Skive (thin) all edges that will be overlapped or folded. This includes the edges of quarter panels, mudguard overlaps, swoosh edges, and collar fold lines.",
        details: "Reduce edge thickness to approximately 50% of original. Focus on areas where pieces overlap to prevent bulk. The swoosh edges should be skived thin for clean stitching.",
        duration: "30 min",
        tips: [
          "Keep skiving blade sharp and clean",
          "Skive at consistent angle (about 15 degrees)",
          "Test on scrap leather first",
          "Swoosh edges need thinner skiving for flexibility"
        ],
        resources: [
          {
            id: "ts-res-2",
            title: "Edge Skiving Techniques",
            description: "Professional skiving for sneaker construction",
            type: "guide",
            link: "/learn/complete-beginners-guide-shoemaking/2/1",
            courseSlug: "complete-beginners-guide-shoemaking"
          }
        ]
      },
      {
        id: "ts-step-3",
        position: 3,
        title: "Attach Reinforcements",
        category: "Pattern & Prep",
        instruction: "Apply reinforcement material to the back of the toe box area, heel counter location, and eyestay zones for structure.",
        details: "Use heat-activated or adhesive-backed reinforcement. The toe box reinforcement should extend about 2 inches back from the toe. Heel counter reinforcement goes on the inside of the heel panel.",
        duration: "20 min",
        tips: [
          "Heat gun helps activate adhesive reinforcements",
          "Smooth out any air bubbles immediately",
          "Dont extend reinforcement into flex zones"
        ],
        resources: []
      },
      {
        id: "ts-step-4",
        position: 4,
        title: "Apply Logos & Graphics",
        category: "Pattern & Prep",
        instruction: "Apply any heat transfers, embossing, or printed graphics to the relevant pieces before assembly. This includes the Cactus Jack branding elements.",
        details: "The Travis Scott version features reverse branding and special Cactus Jack logos. Apply these using heat press or transfer methods to the tongue and heel areas.",
        imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600",
        duration: "25 min",
        tips: [
          "Test heat/pressure on scrap first",
          "Position logos precisely before pressing",
          "Allow cooling before handling"
        ],
        resources: []
      },

      // === HEEL ASSEMBLY (Steps 5-8) ===
      {
        id: "ts-step-5",
        position: 5,
        title: "Glue Heel to Quarter Panels",
        category: "Heel Assembly",
        instruction: "Apply contact cement to the heel overlay piece and the corresponding area on both quarter panels. Let dry tacky, then bond together precisely.",
        details: "The heel piece creates the distinctive look of the AJ1. Position it centered between the two quarter panels at the back of the shoe.",
        imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
        duration: "15 min",
        tips: [
          "Apply thin, even coat of cement",
          "Wait until cement is tacky (not wet)",
          "Align carefully - you get one shot"
        ],
        resources: []
      },
      {
        id: "ts-step-6",
        position: 6,
        title: "Glue Quarter Liners",
        category: "Heel Assembly",
        instruction: "Attach the interior lining to the quarter panels. Apply cement to both surfaces, let dry tacky, and bond the liner to the flesh side of the quarters.",
        details: "The liner provides comfort and structure. Ensure edges align perfectly with the outer leather for clean finishing.",
        duration: "20 min",
        tips: [
          "Work from center outward to avoid bubbles",
          "Trim any excess liner after bonding",
          "Use roller for full adhesion"
        ],
        resources: []
      },
      {
        id: "ts-step-7",
        position: 7,
        title: "Zig Zag Medial Side of Heel",
        category: "Heel Assembly",
        instruction: "Using a zig-zag stitch, secure the medial (inner) side of the heel to the quarter panel. This creates a durable, slightly flexible seam.",
        details: "The zig-zag stitch allows some flex in the heel area. Stitch about 3mm from the edge for consistency.",
        duration: "15 min",
        tips: [
          "Use matching thread color",
          "Set machine to medium-width zig-zag",
          "Backstitch at start and end"
        ],
        resources: [
          {
            id: "ts-res-5",
            title: "Zig-Zag Stitching for Sneakers",
            description: "When and how to use zig-zag stitches",
            type: "video",
            link: "/learn/advanced-stitching-techniques/1/1",
            courseSlug: "advanced-stitching-techniques"
          }
        ]
      },
      {
        id: "ts-step-8",
        position: 8,
        title: "Regular Stitch Lateral Side of Heel",
        category: "Heel Assembly",
        instruction: "Use a straight stitch to secure the lateral (outer) side of the heel to the quarter panel. This side typically shows more and needs cleaner stitching.",
        details: "The lateral side is more visible when worn, so take extra care with stitch consistency. Use approximately 8-10 stitches per inch.",
        duration: "15 min",
        tips: [
          "Keep consistent distance from edge",
          "Go slow for even stitches",
          "Check tension before starting"
        ],
        resources: []
      },

      // === EYESTAY & STABILIZERS (Steps 9-11) ===
      {
        id: "ts-step-9",
        position: 9,
        title: "Glue Eyestays",
        category: "Eyestay & Stabilizers",
        instruction: "Apply contact cement to the eyestay pieces and position them on the quarter panels where the lace holes will be punched.",
        details: "Eyestays are the reinforced areas that hold the eyelets. They should align perfectly with your lace hole pattern template.",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        duration: "15 min",
        tips: [
          "Use template to ensure hole alignment",
          "Press firmly along entire length",
          "Both sides should mirror each other"
        ],
        resources: []
      },
      {
        id: "ts-step-10",
        position: 10,
        title: "Glue Stabilizers",
        category: "Eyestay & Stabilizers",
        instruction: "Attach the stabilizer pieces to the medial and lateral sides of the quarter panels. These provide structural support around the midfoot.",
        details: "Stabilizers run along the side panels below the eyestays. They create the distinctive layered look of the AJ1.",
        duration: "15 min",
        tips: [
          "Align with pattern markings precisely",
          "Stabilizers should sit under eyestays",
          "Check symmetry between left and right"
        ],
        resources: []
      },
      {
        id: "ts-step-11",
        position: 11,
        title: "Stitch Stabilizers",
        category: "Eyestay & Stabilizers",
        instruction: "Sew around the perimeter of the stabilizers to permanently secure them. Follow the edge at a consistent distance.",
        details: "Use a straight stitch about 2-3mm from the edge. This stitching is visible and adds to the design.",
        duration: "20 min",
        tips: [
          "Practice consistent stitch distance",
          "Pivot carefully at corners",
          "Match thread to stabilizer color"
        ],
        resources: []
      },

      // === SWOOSH APPLICATION (Steps 12-13) ===
      {
        id: "ts-step-12",
        position: 12,
        title: "Glue Swooshes",
        category: "Swoosh Application",
        instruction: "Position and glue the swooshes. For the Travis Scott version, the lateral swoosh is REVERSED (pointing backward). The medial swoosh is standard (pointing forward).",
        details: "This is the signature element of the Travis Scott collaboration. The lateral (outside) swoosh points toward the heel. Triple-check placement before bonding.",
        imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
        duration: "20 min",
        tips: [
          "CRITICAL: Lateral swoosh points BACKWARD",
          "Medial swoosh is normal (forward)",
          "Use template for exact positioning",
          "Take photos before bonding to verify"
        ],
        resources: []
      },
      {
        id: "ts-step-13",
        position: 13,
        title: "Stitch Swooshes",
        category: "Swoosh Application",
        instruction: "Stitch around the entire perimeter of both swooshes. Maintain consistent distance from the edge throughout the curve.",
        details: "The swoosh stitching is highly visible. Use black thread on black swooshes. Stitch about 2mm from the edge.",
        duration: "25 min",
        tips: [
          "Go slow around the curves",
          "Pivot needle at the tip carefully",
          "End stitches where swoosh goes under other panels"
        ],
        resources: [
          {
            id: "ts-res-8",
            title: "Curved Stitching Mastery",
            description: "Stitching smooth curves on swooshes",
            type: "video",
            link: "/learn/advanced-stitching-techniques/1/2",
            courseSlug: "advanced-stitching-techniques"
          }
        ]
      },

      // === BACKTAB & HEEL COUNTER (Steps 14-16) ===
      {
        id: "ts-step-14",
        position: 14,
        title: "Glue Backtab",
        category: "Backtab & Heel Counter",
        instruction: "Attach the backtab (the pull tab at the back of the heel) to the top of the heel panel. Center it precisely.",
        details: "The backtab on Travis Scott versions often features special branding. Ensure any logos are oriented correctly.",
        duration: "10 min",
        tips: [
          "Center perfectly using measurements",
          "Backtab should extend above collar line"
        ],
        resources: []
      },
      {
        id: "ts-step-15",
        position: 15,
        title: "Stitch Backtab",
        category: "Backtab & Heel Counter",
        instruction: "Stitch the backtab to the heel panel following the shape. Typically a U-shaped stitch line.",
        details: "This stitching secures the pull tab and adds visual detail. Use matching thread.",
        duration: "10 min",
        tips: [
          "Stitch both sides evenly",
          "Reinforce stress points"
        ],
        resources: []
      },
      {
        id: "ts-step-16",
        position: 16,
        title: "Glue Heel Counter",
        category: "Backtab & Heel Counter",
        instruction: "Insert and glue the internal heel counter (stiffener) between the outer leather and lining in the heel area.",
        details: "The heel counter provides the structured cup shape of the heel. Position it before the upper is fully closed.",
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
        duration: "15 min",
        tips: [
          "Heat counter to make it moldable",
          "Center in heel pocket precisely",
          "Press firmly while setting"
        ],
        resources: []
      },

      // === COLLAR ASSEMBLY (Steps 17-20) ===
      {
        id: "ts-step-17",
        position: 17,
        title: "Stitch Collar Liner",
        category: "Collar Assembly",
        instruction: "Sew the collar liner piece along its length to create the padded collar tube that wraps around the ankle opening.",
        details: "The collar liner is typically soft leather or synthetic that will hold the foam padding.",
        duration: "15 min",
        tips: [
          "Sew with consistent seam allowance",
          "Leave opening for foam insertion"
        ],
        resources: []
      },
      {
        id: "ts-step-18",
        position: 18,
        title: "Glue Collar Foam",
        category: "Collar Assembly",
        instruction: "Insert foam padding into the collar liner tube and secure with adhesive. This creates the cushioned ankle collar.",
        details: "Use soft, dense foam for comfort. The foam should fill the collar without bunching.",
        duration: "15 min",
        tips: [
          "Cut foam slightly smaller than liner cavity",
          "Distribute foam evenly throughout"
        ],
        resources: []
      },
      {
        id: "ts-step-19",
        position: 19,
        title: "Flip Collar Liner",
        category: "Collar Assembly",
        instruction: "Turn the collar right-side out so the finished surface faces outward and seams are hidden inside.",
        details: "Use a turning tool to push corners fully. The collar should be smooth with no visible seams on the exterior.",
        duration: "10 min",
        tips: [
          "Work gently to avoid tearing seams",
          "Use blunt tool to push out corners"
        ],
        resources: []
      },
      {
        id: "ts-step-20",
        position: 20,
        title: "Glue Collar Liner to Upper",
        category: "Collar Assembly",
        instruction: "Attach the completed collar assembly to the top edge of the quarter panels, wrapping around the ankle opening.",
        details: "The collar should sit evenly around the entire ankle opening. Align seams with the heel center.",
        imageUrl: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600",
        duration: "20 min",
        tips: [
          "Start at heel center and work forward",
          "Keep collar height consistent all around",
          "Ensure collar meets at front vamp cleanly"
        ],
        resources: []
      },

      // === MUDGUARD & APRON (Steps 21-22) ===
      {
        id: "ts-step-21",
        position: 21,
        title: "Glue Mudguard to Apron",
        category: "Mudguard & Apron",
        instruction: "Attach the mudguard (toe cap area) to the apron (toe box upper). The mudguard wraps around the toe with the distinctive AJ1 shape.",
        details: "The mudguard on the Travis Scott version is typically sail/cream colored. Align with toe box reinforcement underneath.",
        imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600",
        duration: "20 min",
        tips: [
          "Center mudguard on apron precisely",
          "Work from center toward sides",
          "No wrinkles or bubbles"
        ],
        resources: []
      },
      {
        id: "ts-step-22",
        position: 22,
        title: "Stitch Mudguard to Apron",
        category: "Mudguard & Apron",
        instruction: "Sew along the mudguard edge where it overlaps the apron. Follow the curved shape consistently.",
        details: "This is a highly visible stitch line. Use matching thread and maintain even spacing.",
        duration: "20 min",
        tips: [
          "Follow curve smoothly",
          "Consistent 2-3mm from edge",
          "Backstitch at start/end points"
        ],
        resources: []
      },

      // === TONGUE CONSTRUCTION (Steps 23-27) ===
      {
        id: "ts-step-23",
        position: 23,
        title: "Tongue Layer 1 - Base",
        category: "Tongue Construction",
        instruction: "Start the tongue assembly with the base layer. This is typically white/sail leather that forms the bottom of the tongue stack.",
        details: "Cut the base layer to the full tongue pattern size. This layer contacts the foot when worn.",
        imageUrl: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600",
        duration: "10 min",
        tips: [
          "Use softer leather for comfort",
          "Ensure smooth side faces foot"
        ],
        resources: []
      },
      {
        id: "ts-step-24",
        position: 24,
        title: "Tongue Layer 2 - Foam Padding",
        category: "Tongue Construction",
        instruction: "Add foam padding layer to the tongue for cushioning. Cut foam slightly smaller than the tongue outline.",
        details: "The foam provides padding between the base and top layer. Taper the edges so they dont create hard edges.",
        duration: "10 min",
        tips: [
          "Bevel foam edges to avoid lumps",
          "Use medium-density foam"
        ],
        resources: []
      },
      {
        id: "ts-step-25",
        position: 25,
        title: "Tongue Layer 3 - Top Cover",
        category: "Tongue Construction",
        instruction: "Add the top leather layer of the tongue. This visible layer features the branded tongue label.",
        details: "The top layer wraps over the foam and tucks under the edges. Attach any tongue labels before final assembly.",
        duration: "15 min",
        tips: [
          "Center any logos/labels",
          "Fold edges cleanly over foam",
          "Glue edges securely"
        ],
        resources: []
      },
      {
        id: "ts-step-26",
        position: 26,
        title: "Glue Tongue to Apron",
        category: "Tongue Construction",
        instruction: "Attach the completed tongue assembly to the apron (toe box). The tongue base connects under the vamp area.",
        details: "Position the tongue centered on the apron with proper overlap for the tongue gusset area.",
        duration: "15 min",
        tips: [
          "Center tongue precisely",
          "Overlap should match pattern specs",
          "Ensure tongue sits flat"
        ],
        resources: []
      },
      {
        id: "ts-step-27",
        position: 27,
        title: "Stitch Tongue to Apron",
        category: "Tongue Construction",
        instruction: "Sew the tongue attachment seam across the bottom where it meets the apron/vamp area.",
        details: "This seam should be reinforced as it takes stress during wear. Double-stitch if possible.",
        duration: "15 min",
        tips: [
          "Reinforce with double stitching",
          "Stitch through all layers",
          "This seam is hidden when worn"
        ],
        resources: []
      },

      // === LATERAL & MEDIAL ASSEMBLY (Steps 28-31) ===
      {
        id: "ts-step-28",
        position: 28,
        title: "Glue Lateral Mudguard to Stabilizer",
        category: "Side Panel Assembly",
        instruction: "Attach the lateral (outside) portion of the mudguard to the lateral stabilizer, connecting the toe area to the side panels.",
        details: "This creates the continuous side profile of the shoe. The mudguard should overlap the stabilizer edge.",
        imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600",
        duration: "15 min",
        tips: [
          "Align edges carefully",
          "Check profile from side view"
        ],
        resources: []
      },
      {
        id: "ts-step-29",
        position: 29,
        title: "Stitch Lateral Mudguard to Stabilizer",
        category: "Side Panel Assembly",
        instruction: "Sew along the join between the lateral mudguard and stabilizer. Follow the natural curve of the shoe profile.",
        details: "This stitching runs along the side of the shoe and is highly visible.",
        duration: "15 min",
        tips: [
          "Maintain consistent stitch line",
          "Use appropriate thread color"
        ],
        resources: []
      },
      {
        id: "ts-step-30",
        position: 30,
        title: "Glue Medial Mudguard to Stabilizer",
        category: "Side Panel Assembly",
        instruction: "Attach the medial (inside) portion of the mudguard to the medial stabilizer, mirroring the lateral side.",
        details: "Ensure symmetry between both sides of the shoe. The medial side has the standard forward-facing swoosh.",
        duration: "15 min",
        tips: [
          "Match the curve of the lateral side",
          "Verify swoosh is oriented forward (normal)"
        ],
        resources: []
      },
      {
        id: "ts-step-31",
        position: 31,
        title: "Stitch Medial Mudguard to Stabilizer",
        category: "Side Panel Assembly",
        instruction: "Sew along the join between the medial mudguard and stabilizer, completing the upper side panel assembly.",
        details: "This completes the upper construction before lasting.",
        duration: "15 min",
        tips: [
          "Check all seams for consistency",
          "Trim any loose threads"
        ],
        resources: []
      },

      // === LASTING & SOLE (Steps 32-35) ===
      {
        id: "ts-step-32",
        position: 32,
        title: "Attach Lasting Board to Last",
        category: "Lasting & Sole",
        instruction: "Secure the lasting board (insole board) to the bottom of the shoe last using temporary tacks or tape.",
        details: "The lasting board provides the foundation for lasting and will become part of the final shoe structure.",
        imageUrl: "https://images.unsplash.com/photo-1491553895911-0055uj6352d9?w=600",
        duration: "10 min",
        tips: [
          "Center board on last precisely",
          "Secure edges but allow for lasting"
        ],
        resources: [
          {
            id: "ts-res-last",
            title: "Lasting Fundamentals",
            description: "How to last sneaker uppers",
            type: "video",
            link: "/learn/last-making-fitting/2/1",
            courseSlug: "last-making-fitting"
          }
        ]
      },
      {
        id: "ts-step-33",
        position: 33,
        title: "Last Upper to Shoe Last",
        category: "Lasting & Sole",
        instruction: "Pull the completed upper over the last and secure it to the lasting board. Start at the toe, then heel, then sides.",
        details: "Use lasting pliers to pull the upper margin tight. Tack or glue the upper to the lasting board around the entire perimeter. Remove all wrinkles.",
        imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600",
        duration: "30 min",
        tips: [
          "Heat upper slightly for easier lasting",
          "Work toe and heel first, then sides",
          "Check for symmetry frequently",
          "Eliminate all wrinkles in the toe box"
        ],
        resources: []
      },
      {
        id: "ts-step-34",
        position: 34,
        title: "Prepare Upper for Sole",
        category: "Lasting & Sole",
        instruction: "Rough up the lasting margin with sandpaper and apply primer/cement to prepare for sole attachment.",
        details: "Score the bottom of the lasted upper and the mating surface of the sole. Apply cement to both surfaces and let dry until tacky.",
        duration: "20 min",
        tips: [
          "Sand in one direction only",
          "Apply cement evenly",
          "Wait for proper tack time"
        ],
        resources: []
      },
      {
        id: "ts-step-35",
        position: 35,
        title: "Attach Sole",
        category: "Lasting & Sole",
        instruction: "Align the sole unit with the lasted upper and bond them together. Apply pressure and heat to activate the cement fully.",
        details: "Position the sole precisely - you only get one chance. Press the sole firmly, especially around the edges. Use heat gun to reactivate cement if needed.",
        imageUrl: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600",
        duration: "25 min",
        tips: [
          "Align heel and toe first",
          "Press firmly all around perimeter",
          "Use heat to reactivate cement if needed",
          "Allow 24 hours for full cure before removing last"
        ],
        resources: []
      }
    ]
  },
  {
    id: "build-2",
    slug: "simple-loafer-build",
    title: "Weekend Loafer Build",
    description: "Build a casual slip-on loafer in a weekend. Simpler construction perfect for those new to shoemaking.",
    coverImageUrl: "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=800",
    difficulty: "beginner",
    totalTime: "4-6 hours",
    materialsNeeded: [
      "Upper leather (2-3 oz)",
      "Lining leather",
      "Rubber sole",
      "Insole material",
      "Thread",
      "Contact cement"
    ],
    toolsNeeded: [
      "Sharp knife",
      "Lasting pliers",
      "Shoe last",
      "Hammer",
      "Awl",
      "Needles",
      "Sandpaper"
    ],
    steps: [
      {
        id: "loafer-step-1",
        position: 1,
        title: "Cut Pattern Pieces",
        instruction: "Cut the vamp (front piece with the slot), quarters, and lining from your leather.",
        details: "Loafers have fewer pieces than Oxfords. Focus on getting the slot shape right.",
        duration: "20 min",
        tips: ["The slot should be about 2.5 inches long"],
        resources: []
      },
      {
        id: "loafer-step-2",
        position: 2,
        title: "Create the Strap",
        instruction: "Cut and fold the penny strap. Stitch it across the slot opening.",
        details: "The strap is decorative but also reinforces the slot.",
        duration: "15 min",
        tips: ["Traditional penny slot fits a penny underneath"],
        resources: []
      },
      {
        id: "loafer-step-3",
        position: 3,
        title: "Attach Lining",
        instruction: "Glue lining to all upper pieces. Trim flush and burnish edges.",
        duration: "20 min",
        tips: [],
        resources: []
      },
      {
        id: "loafer-step-4",
        position: 4,
        title: "Close the Upper",
        instruction: "Stitch the quarters to the vamp at the sides. Ensure the curve is smooth.",
        duration: "30 min",
        tips: ["The seam sits just behind the ball of the foot"],
        resources: [
          {
            id: "loafer-res-1",
            title: "Closing Uppers",
            description: "Techniques for joining upper pieces",
            type: "video",
            link: "/learn/complete-beginners-guide-shoemaking/3/1",
            courseSlug: "complete-beginners-guide-shoemaking"
          }
        ]
      },
      {
        id: "loafer-step-5",
        position: 5,
        title: "Prepare the Last",
        instruction: "Attach the insole to the last. Tape the last opening if needed.",
        duration: "10 min",
        tips: [],
        resources: []
      },
      {
        id: "loafer-step-6",
        position: 6,
        title: "Last the Upper",
        instruction: "Pull the upper over the last. Start at toe, then heel, then sides. Tack in place.",
        duration: "30 min",
        tips: ["Loafers need a snug fit since theres no lacing"],
        resources: [
          {
            id: "loafer-res-2",
            title: "Lasting Techniques",
            description: "How to last properly",
            type: "video",
            link: "/learn/last-making-fitting/2/1",
            courseSlug: "last-making-fitting"
          }
        ]
      },
      {
        id: "loafer-step-7",
        position: 7,
        title: "Attach the Sole",
        instruction: "Cement the rubber sole to the lasted upper. Press firmly and let cure.",
        details: "Score both surfaces. Apply cement, let dry tacky, then bond.",
        duration: "20 min",
        tips: ["Use a roller or hammer the sole for full contact"],
        resources: []
      },
      {
        id: "loafer-step-8",
        position: 8,
        title: "Finish and Remove Last",
        instruction: "Trim excess sole, finish edges, remove the last. Clean and condition the leather.",
        duration: "25 min",
        tips: ["Insert shoe trees to maintain shape"],
        resources: []
      }
    ]
  }
]

// Helper function to get a build by slug
export function getBuildBySlug(slug: string): BuildWalkthrough | undefined {
  return mockBuilds.find(b => b.slug === slug)
}

// Helper function to get user notes from localStorage
export function getBuildNotes(buildId: string): Record<string, string> {
  if (typeof window === "undefined") return {}
  const notes = localStorage.getItem(`build_notes_${buildId}`)
  return notes ? JSON.parse(notes) : {}
}

// Helper function to save a note for a step
export function saveBuildNote(buildId: string, stepId: string, note: string) {
  if (typeof window === "undefined") return
  const notes = getBuildNotes(buildId)
  notes[stepId] = note
  localStorage.setItem(`build_notes_${buildId}`, JSON.stringify(notes))
}

// Helper function to get build progress
export function getBuildProgress(buildId: string): string[] {
  if (typeof window === "undefined") return []
  const progress = localStorage.getItem(`build_progress_${buildId}`)
  return progress ? JSON.parse(progress) : []
}

// Helper function to mark a step as complete
export function markStepComplete(buildId: string, stepId: string) {
  if (typeof window === "undefined") return
  const progress = getBuildProgress(buildId)
  if (!progress.includes(stepId)) {
    progress.push(stepId)
    localStorage.setItem(`build_progress_${buildId}`, JSON.stringify(progress))
  }
}

// Get steps grouped by category
export function getStepsByCategory(build: BuildWalkthrough): Record<string, BuildStep[]> {
  const grouped: Record<string, BuildStep[]> = {}
  build.steps.forEach(step => {
    const category = step.category || "General"
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(step)
  })
  return grouped
}
