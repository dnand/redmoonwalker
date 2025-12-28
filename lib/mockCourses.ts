// Mock course data for demo mode - Step-by-step shoemaking walkthroughs
export const mockCourses = [
  {
    id: "course-1",
    slug: "complete-beginners-guide-shoemaking",
    title: "Complete Beginner's Guide to Shoemaking",
    description: "Learn the fundamentals of shoemaking from tools to finishing techniques.",
    productId: "mock-7",
    status: "PUBLISHED",
    modules: [
      {
        id: "module-1-1",
        position: 1,
        title: "Getting Started",
        steps: [
          {
            id: "step-1-1-1",
            position: 1,
            title: "Welcome & Course Overview",
            estimatedMinutes: 10,
            blocks: [
              {
                id: "block-1-1-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Welcome to Shoemaking!\n\nCongratulations on taking your first step into the world of handcrafted shoes. In this comprehensive course, you'll learn everything you need to create your first pair of leather shoes from scratch.\n\nBy the end of this course, you will:\n- Understand the anatomy of a shoe\n- Know how to select and work with leather\n- Master essential hand-stitching techniques\n- Create a complete pair of Oxford shoes",
                },
              },
              {
                id: "block-1-1-1-2",
                position: 2,
                type: "IMAGE",
                payload: {
                  url: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
                  alt: "Handcrafted leather shoes",
                  caption: "The beautiful result of traditional shoemaking",
                },
              },
              {
                id: "block-1-1-1-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "info",
                  title: "What You'll Need",
                  content: "Before starting, make sure you have access to a well-lit workspace with at least 4x3 feet of table space. You'll need about 20-30 hours total to complete your first pair.",
                },
              },
            ],
          },
          {
            id: "step-1-1-2",
            position: 2,
            title: "Essential Tools & Materials",
            estimatedMinutes: 15,
            blocks: [
              {
                id: "block-1-1-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Essential Shoemaking Tools\n\nEvery craftsman needs the right tools. Here's what you'll need to get started:\n\n## Cutting Tools\n- **Sharp leather knife** - For precise cuts\n- **Cutting mat** - Protects your work surface\n- **Metal ruler** - For straight edges\n- **Leather scissors** - For curves and detail work\n\n## Stitching Tools\n- **Pricking irons** (4-5mm spacing) - Create stitch holes\n- **Harness needles** - Heavy-duty for leather\n- **Waxed thread** - 0.8mm thickness recommended\n- **Stitching pony** - Holds leather while sewing",
                },
              },
              {
                id: "block-1-1-2-2",
                position: 2,
                type: "IMAGE",
                payload: {
                  url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                  alt: "Shoemaking tools laid out",
                  caption: "A complete set of beginner shoemaking tools",
                },
              },
              {
                id: "block-1-1-2-3",
                position: 3,
                type: "TEXT",
                payload: {
                  content: "## Lasting Tools\n- **Shoe last** - The form around which shoes are built\n- **Lasting pliers** - Pull leather tightly over the last\n- **Tack hammer** - For temporary lasting nails\n- **Lasting nails** - 12mm brass nails\n\n## Finishing Tools\n- **Edge beveler** - Rounds leather edges\n- **Burnishing tool** - Smooths and polishes edges\n- **Sandpaper** (various grits) - 120, 240, 400\n- **Edge paint** - Seals and colors edges",
                },
              },
              {
                id: "block-1-1-2-4",
                position: 4,
                type: "CALLOUT",
                payload: {
                  type: "tip",
                  title: "Budget Tip",
                  content: "Start with a basic toolkit (~$150-200). You can upgrade individual tools as you develop your skills and preferences.",
                },
              },
            ],
          },
          {
            id: "step-1-1-3",
            position: 3,
            title: "Understanding Shoe Anatomy",
            estimatedMinutes: 12,
            blocks: [
              {
                id: "block-1-1-3-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Parts of a Shoe\n\nBefore we start building, let's learn the vocabulary of shoemaking. Understanding these terms will make following instructions much easier.\n\n## Upper Components\n- **Vamp** - The front part covering the toes and instep\n- **Quarter** - The side and back portion\n- **Tongue** - The flap under the lacing\n- **Eyelet facing** - Where the lace holes are punched\n- **Counter** - Internal stiffener at the heel\n- **Toe puff** - Internal stiffener at the toe",
                },
              },
              {
                id: "block-1-1-3-2",
                position: 2,
                type: "IMAGE",
                payload: {
                  url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
                  alt: "Shoe anatomy diagram",
                  caption: "The main components of a dress shoe",
                },
              },
              {
                id: "block-1-1-3-3",
                position: 3,
                type: "TEXT",
                payload: {
                  content: "## Lower Components\n- **Insole** - The foundation that the upper attaches to\n- **Welt** - Strip connecting upper to outsole\n- **Outsole** - The bottom that contacts the ground\n- **Heel** - Built up layers at the back\n- **Shank** - Supportive insert between insole and outsole\n\n## The Last\nThe **last** is the most important element - it's the 3D form that determines your shoe's shape and fit. Lasts come in different toe shapes, widths, and heel heights.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-1-2",
        position: 2,
        title: "Pattern Making",
        steps: [
          {
            id: "step-1-2-1",
            position: 1,
            title: "Taking Last Measurements",
            estimatedMinutes: 20,
            blocks: [
              {
                id: "block-1-2-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Measuring Your Last\n\nAccurate measurements are the foundation of a well-fitting shoe. In this step, you'll learn how to measure your last and document key dimensions.\n\n## What You'll Need\n- Your shoe last\n- Flexible tape measure\n- Masking tape\n- Fine-tip marker\n- Paper and pencil",
                },
              },
              {
                id: "block-1-2-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Key Measurements\n\n1. **Length** - Measure from heel to toe along the bottom\n2. **Ball girth** - Circumference at the widest point\n3. **Instep girth** - Circumference over the arch\n4. **Heel girth** - Circumference around the heel\n5. **Toe spring** - Height of toe tip above the surface\n\n### Recording Your Measurements\nCreate a measurement card for each last. This becomes your reference for future patterns.",
                },
              },
              {
                id: "block-1-2-1-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "warning",
                  title: "Important",
                  content: "Always measure both left and right lasts - even pairs can have slight differences. Note any asymmetry.",
                },
              },
            ],
          },
          {
            id: "step-1-2-2",
            position: 2,
            title: "Creating the Base Pattern",
            estimatedMinutes: 30,
            blocks: [
              {
                id: "block-1-2-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Drafting Your Oxford Pattern\n\nNow we'll create the pattern pieces for a classic Oxford shoe. This process involves wrapping the last with tape, drawing your design lines, and transferring to pattern card.\n\n## Step 1: Tape the Last\n1. Cover the entire last with masking tape, overlapping edges\n2. Smooth out all wrinkles - the tape should lay flat\n3. Use multiple layers for durability\n4. Mark the center line from toe to heel on both top and bottom",
                },
              },
              {
                id: "block-1-2-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Step 2: Draw Design Lines\n\n1. **Vamp point** - Mark 60% back from toe tip\n2. **Throat line** - Draw the opening curve for lacing\n3. **Quarter line** - Extends from vamp point to heel\n4. **Back seam** - Vertical line at center back\n5. **Feather line** - Where upper meets insole (bottom edge)\n\n### Design Considerations\n- The throat opening should be deep enough for foot entry\n- Quarter overlap at front should be 15-20mm\n- Allow for closing margin (the gap when laced)",
                },
              },
              {
                id: "block-1-2-2-3",
                position: 3,
                type: "IMAGE",
                payload: {
                  url: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800",
                  alt: "Pattern lines on taped last",
                  caption: "Design lines marked on the taped last",
                },
              },
              {
                id: "block-1-2-2-4",
                position: 4,
                type: "TEXT",
                payload: {
                  content: "## Step 3: Remove and Flatten\n\n1. Carefully cut the tape along the back seam\n2. Peel off the tape \"skin\" from the last\n3. Cut open along the feather line\n4. Flatten onto paper, making small relief cuts as needed\n5. Tape to paper and trace the outline\n\nYou now have a 2D representation of your 3D last!",
                },
              },
            ],
          },
          {
            id: "step-1-2-3",
            position: 3,
            title: "Adding Seam Allowances",
            estimatedMinutes: 15,
            blocks: [
              {
                id: "block-1-2-3-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Seam Allowances & Pattern Finalization\n\nBefore cutting leather, we need to add seam allowances to our pattern pieces. This extra material allows for stitching and folding.\n\n## Standard Allowances\n- **Stitched edges** - 5-7mm\n- **Folded edges** - 8-10mm\n- **Lasting margin** - 15-20mm (bottom edge)\n- **Back seam** - 5mm each side",
                },
              },
              {
                id: "block-1-2-3-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Creating Working Patterns\n\n1. Trace your base pattern onto pattern card\n2. Add appropriate allowances to each edge\n3. Mark grain direction with an arrow\n4. Label each piece (Vamp, Quarter L, Quarter R, Tongue)\n5. Punch a hanging hole for storage\n6. Note the last size and style\n\n### Pattern Storage\nStore patterns flat in labeled folders. They're your templates for future shoes!",
                },
              },
              {
                id: "block-1-2-3-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "tip",
                  title: "Pro Tip",
                  content: "Make a test pair using inexpensive leather or even heavy fabric first. This validates your pattern before committing expensive materials.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-1-3",
        position: 3,
        title: "Cutting & Preparing Leather",
        steps: [
          {
            id: "step-1-3-1",
            position: 1,
            title: "Selecting & Inspecting Leather",
            estimatedMinutes: 15,
            blocks: [
              {
                id: "block-1-3-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Choosing the Right Leather\n\nLeather selection dramatically impacts your finished shoe. Here's what to look for:\n\n## For Uppers (Visible Parts)\n- **Calf leather** - 1.2-1.4mm thickness, fine grain\n- **Full grain** - Shows natural surface, develops patina\n- **Even color** - No spots, scratches, or brands\n- **Good temper** - Not too stiff, not too soft",
                },
              },
              {
                id: "block-1-3-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## For Linings\n- **Kid leather** or thin calf - 0.6-0.8mm\n- **Pig lining** - Excellent breathability\n- **Soft temper** - Comfortable against foot\n\n## For Soles & Structural Parts\n- **Veg-tan leather** - 3-4mm for insoles\n- **Oak-bark tanned** - 5-6mm for outsoles\n- **Firm temper** - Provides support\n\n### Inspecting for Defects\nAlways check both sides of leather. Hold up to light to spot thin areas, scratches, or holes that might not be visible on the surface.",
                },
              },
              {
                id: "block-1-3-1-3",
                position: 3,
                type: "IMAGE",
                payload: {
                  url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800",
                  alt: "Various leather samples",
                  caption: "Different leather types for different purposes",
                },
              },
            ],
          },
          {
            id: "step-1-3-2",
            position: 2,
            title: "Cutting the Upper Pieces",
            estimatedMinutes: 25,
            blocks: [
              {
                id: "block-1-3-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Cutting Your Leather\n\nCutting is one of the most critical steps. A bad cut wastes material and affects the final look. Take your time!\n\n## Preparation\n1. Lay leather flat, grain side up\n2. Identify any defects to avoid\n3. Note the grain direction (stretch is across the back)\n4. Plan your layout to minimize waste",
                },
              },
              {
                id: "block-1-3-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Cutting Technique\n\n1. **Position the pattern** - Grain arrow pointing head-to-tail\n2. **Weight or hold** - Keep pattern firmly in place\n3. **Score first** - Light pass to mark the line\n4. **Cut through** - Second pass with more pressure\n5. **Keep blade vertical** - Angled cuts cause skiving issues\n\n### Cutting Order\n1. Largest pieces first (vamp)\n2. Then quarters (left and right)\n3. Smaller pieces (tongue, facing)\n4. Finally linings from remaining good areas",
                },
              },
              {
                id: "block-1-3-2-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "warning",
                  title: "Safety First",
                  content: "Always cut away from your body. Keep fingers behind the blade. Use a sharp knife - dull blades require more pressure and slip more easily.",
                },
              },
            ],
          },
          {
            id: "step-1-3-3",
            position: 3,
            title: "Skiving & Edge Preparation",
            estimatedMinutes: 20,
            blocks: [
              {
                id: "block-1-3-3-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Skiving - Thinning the Edges\n\nSkiving reduces leather thickness at edges that will be folded or overlapped. This creates smooth, professional-looking seams.\n\n## Why Skive?\n- Reduces bulk at seams\n- Allows clean edge folding\n- Creates smooth surface under stitching\n- Prevents visible edge bumps",
                },
              },
              {
                id: "block-1-3-3-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Skiving Technique\n\n1. **Mark your skive area** - Usually 5-10mm from edge\n2. **Angle your knife** - About 15-20 degrees\n3. **Thin strokes** - Multiple light passes, not one heavy cut\n4. **Check progress** - Bend the edge to test flexibility\n5. **Smooth with sandpaper** - Remove any ridges\n\n### Areas to Skive\n- Top edges that will be folded\n- Overlapping seam areas\n- Lasting margin (bottom edge)\n- Tongue edges",
                },
              },
              {
                id: "block-1-3-3-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "tip",
                  title: "Practice First",
                  content: "Skiving takes practice. Use leather scraps to develop your technique before working on your actual pieces.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-1-4",
        position: 4,
        title: "Stitching the Upper",
        steps: [
          {
            id: "step-1-4-1",
            position: 1,
            title: "Preparing for Stitching",
            estimatedMinutes: 15,
            blocks: [
              {
                id: "block-1-4-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Preparation for Hand Stitching\n\nProper preparation ensures clean, even stitches. This step covers everything you need before needle touches leather.\n\n## Marking Your Stitch Lines\n1. Use a wing divider to mark lines parallel to edges\n2. Standard distance: 3-4mm from edge\n3. Keep consistent spacing on all pieces\n4. Mark on flesh side for hidden lines",
                },
              },
              {
                id: "block-1-4-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Pricking the Holes\n\n1. **Position your pricking irons** - Line up with your marked line\n2. **Strike firmly** - Holes should go through completely\n3. **Overlap slightly** - Match the last hole when repositioning\n4. **Keep irons vertical** - Angled holes create crooked stitches\n\n### Thread Preparation\n- Cut thread 4-5x the seam length\n- Wax the thread thoroughly\n- Attach needles to both ends (harness stitch method)",
                },
              },
              {
                id: "block-1-4-1-3",
                position: 3,
                type: "IMAGE",
                payload: {
                  url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
                  alt: "Pricking irons and stitching setup",
                  caption: "Pricking irons create evenly spaced stitch holes",
                },
              },
            ],
          },
          {
            id: "step-1-4-2",
            position: 2,
            title: "Saddle Stitch Technique",
            estimatedMinutes: 30,
            blocks: [
              {
                id: "block-1-4-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# The Saddle Stitch\n\nThe saddle stitch is the gold standard for leather work. Unlike machine stitching, if one thread breaks, the other holds the seam together.\n\n## Setting Up\n1. Clamp work in stitching pony\n2. Thread needles on both ends\n3. Position at starting hole\n4. Pull thread through until equal on both sides",
                },
              },
              {
                id: "block-1-4-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## The Stitching Motion\n\n1. **Right needle in** - Push through from right side\n2. **Left needle follows** - Same hole, opposite direction\n3. **Cross behind** - Needles pass behind each other in the hole\n4. **Pull tight** - Both hands pull simultaneously\n5. **Consistent tension** - Every stitch the same\n\n### Rhythm is Key\nDevelop a rhythm: in-through-cross-pull. In-through-cross-pull. Good stitching has a meditative quality once you find your flow.",
                },
              },
              {
                id: "block-1-4-2-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "tip",
                  title: "Stitch Direction",
                  content: "Always pass the right needle first, then the left crosses behind it. This creates consistent stitch angle throughout your seam.",
                },
              },
            ],
          },
          {
            id: "step-1-4-3",
            position: 3,
            title: "Assembling the Upper",
            estimatedMinutes: 45,
            blocks: [
              {
                id: "block-1-4-3-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Joining the Upper Pieces\n\nNow we'll stitch all our upper pieces together. Work in the correct order to ensure proper alignment.\n\n## Assembly Order\n1. **Vamp to facing** - Creates the lacing area\n2. **Quarters together** - Back seam (if applicable)\n3. **Quarters to vamp** - The main closure\n4. **Tongue attached** - Usually just at the throat\n5. **Lining to upper** - If using a lined construction",
                },
              },
              {
                id: "block-1-4-3-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Tips for Each Seam\n\n### Vamp to Facing\n- Align carefully at the throat\n- Check both sides match in length\n- Stitch from throat outward\n\n### Back Seam\n- Critical for heel fit\n- Reinforce with extra stitches at top\n- Keep perfectly centered\n\n### Quarter to Vamp\n- Start at vamp point\n- Work toward back\n- Maintain even overlap",
                },
              },
              {
                id: "block-1-4-3-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "success",
                  title: "Checkpoint",
                  content: "At this stage, your upper should fit over the last smoothly. If it's too tight or loose, now is the time to adjust before lasting.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-1-5",
        position: 5,
        title: "Lasting",
        steps: [
          {
            id: "step-1-5-1",
            position: 1,
            title: "Preparing for Lasting",
            estimatedMinutes: 15,
            blocks: [
              {
                id: "block-1-5-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Introduction to Lasting\n\nLasting is the process of shaping the flat upper around the 3D last. This is where your shoe truly takes form!\n\n## What You'll Need\n- Your last with insole attached\n- Completed upper\n- Lasting pliers\n- Tack hammer and lasting nails\n- Water spray bottle\n- Sharp knife",
                },
              },
              {
                id: "block-1-5-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Preparing the Insole\n\n1. **Cut insole** to match last bottom\n2. **Bevel the edge** - 45 degrees, about 5mm wide\n3. **Create a holdfast** - Groove around edge for upper attachment\n4. **Attach to last** - Use temporary nails or adhesive\n\n### Dampening the Upper\nLightly dampen the upper (not soaking). This makes the leather more pliable for stretching around the last.",
                },
              },
            ],
          },
          {
            id: "step-1-5-2",
            position: 2,
            title: "Toe Lasting",
            estimatedMinutes: 30,
            blocks: [
              {
                id: "block-1-5-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Lasting the Toe\n\nWe start at the toe because it requires the most stretching and shaping. Work carefully - this sets the foundation for the rest of the shoe.\n\n## Steps\n\n1. **Center the upper** on the last\n2. **Place toe puff** between upper and lining\n3. **Pull center toe** over and tack temporarily\n4. **Work outward** - Alternate sides to keep centered",
                },
              },
              {
                id: "block-1-5-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Technique\n\n1. **Grip with lasting pliers** - Close to the edge\n2. **Pull firmly** - Toward the center of the insole\n3. **Tack while holding** - Don't let go until secured\n4. **Remove wrinkles** - Adjust pulls to eliminate puckers\n5. **Check from above** - Upper should be smooth and even\n\n### Common Issues\n- **Wrinkles at toe** - Needs more outward pulling\n- **Off-center** - Remove tacks and restart\n- **Loose fit** - Not enough tension",
                },
              },
              {
                id: "block-1-5-2-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "warning",
                  title: "Don't Rush",
                  content: "Toe lasting takes patience. Professional shoemakers spend significant time on this step. A well-lasted toe makes all subsequent steps easier.",
                },
              },
            ],
          },
          {
            id: "step-1-5-3",
            position: 3,
            title: "Heel & Side Lasting",
            estimatedMinutes: 30,
            blocks: [
              {
                id: "block-1-5-3-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Lasting the Heel\n\nWith the toe secure, we move to the heel. The heel lasting determines how well the shoe cups around the foot.\n\n## Heel Lasting Steps\n\n1. **Insert heel counter** between upper and lining\n2. **Pull back center first** - Tack at center back\n3. **Work toward sides** - Alternate left and right\n4. **Seat the heel** - Hammer the counter into the corner",
                },
              },
              {
                id: "block-1-5-3-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Side Lasting\n\nWith toe and heel secure, the sides fall into place more easily.\n\n1. **Start at the waist** (arch area)\n2. **Work toward toe** on one side\n3. **Return to waist** and work toward heel\n4. **Repeat on other side**\n5. **Final adjustments** - Remove and replace tacks as needed\n\n### Checking Your Work\n- Run fingers along the feather line - should be smooth\n- Upper should be taut with no wrinkles\n- Back seam should be vertical and centered",
                },
              },
              {
                id: "block-1-5-3-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "success",
                  title: "Well Done!",
                  content: "Your upper is now lasted! Let it dry on the last overnight. The leather will \"remember\" its new shape.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-1-6",
        position: 6,
        title: "Welting & Sole Attachment",
        steps: [
          {
            id: "step-1-6-1",
            position: 1,
            title: "Understanding Welted Construction",
            estimatedMinutes: 15,
            blocks: [
              {
                id: "block-1-6-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Introduction to Welting\n\nThe welt is a strip of leather that connects the upper to the sole. Welted construction is prized for:\n\n- **Durability** - Easily resoled multiple times\n- **Water resistance** - Seam is away from the ground\n- **Flexibility** - Breaks in beautifully\n- **Craftsmanship** - Sign of quality construction",
                },
              },
              {
                id: "block-1-6-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Types of Welt\n\n- **Goodyear welt** - Machine-sewn, most common\n- **Hand-welted** - Traditional method we'll use\n- **Norwegian welt** - Visible welt, water-resistant\n- **Storm welt** - Raised lip for weather protection\n\n### Materials Needed\n- Welt strip (5mm x 15mm)\n- Welt thread (heavier than upper thread)\n- Curved awl\n- Welt beater",
                },
              },
            ],
          },
          {
            id: "step-1-6-2",
            position: 2,
            title: "Attaching the Welt",
            estimatedMinutes: 45,
            blocks: [
              {
                id: "block-1-6-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Hand Welting Process\n\nThis is one of the most skilled operations in shoemaking. Take your time and work carefully.\n\n## Preparation\n\n1. **Trim lasting margin** to 12-15mm\n2. **Hammer flat** to compress fibers\n3. **Mark stitch line** on insole edge\n4. **Soak welt strip** briefly to soften",
                },
              },
              {
                id: "block-1-6-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Welting Technique\n\n1. **Start at the heel breast** (where heel meets waist)\n2. **Awl through** insole lip, lasting margin, and welt\n3. **Stitch using** the double-needle method\n4. **Space evenly** - About 6-7 stitches per inch\n5. **Pull each stitch tight** before moving forward\n6. **Work around** the entire perimeter\n\n### At Corners\n- The toe and heel curves require careful work\n- Make relief cuts in the welt to help it bend\n- Keep stitches closer together on curves",
                },
              },
              {
                id: "block-1-6-2-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "tip",
                  title: "Patience Required",
                  content: "Handwelting a pair takes 2-4 hours. Professional craftsmen consider this the defining skill of a shoemaker.",
                },
              },
            ],
          },
          {
            id: "step-1-6-3",
            position: 3,
            title: "Attaching the Sole",
            estimatedMinutes: 40,
            blocks: [
              {
                id: "block-1-6-3-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Sole Attachment\n\nWith the welt in place, we can now attach the outsole. This creates the durable bottom of your shoe.\n\n## Preparation\n\n1. **Fill the cavity** - Cork or leather fills the gap between insole and outsole\n2. **Shape the sole blank** - Rough cut slightly larger than last\n3. **Bevel the edge** - Creates the stitch channel\n4. **Dampen the sole** - Helps it mold to shape",
                },
              },
              {
                id: "block-1-6-3-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Stitching the Sole\n\n1. **Glue sole** temporarily to welt\n2. **Mark stitch line** on sole edge\n3. **Awl through** welt and sole\n4. **Stitch using** same double-needle method\n5. **Keep channel** covered as you work\n6. **Close channel** by hammering back\n\n### Sole Stitching Tips\n- Angle stitches toward the sole center\n- Use slightly heavier thread than welting\n- Wax thoroughly - these stitches see wear",
                },
              },
              {
                id: "block-1-6-3-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "success",
                  title: "Major Milestone!",
                  content: "With the sole attached, your shoe has all its major components. You can now remove the last and see your work!",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-1-7",
        position: 7,
        title: "Heel Building & Finishing",
        steps: [
          {
            id: "step-1-7-1",
            position: 1,
            title: "Building the Heel",
            estimatedMinutes: 30,
            blocks: [
              {
                id: "block-1-7-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Constructing the Heel\n\nThe heel is built up from multiple layers of leather, called lifts. Each lift is shaped and attached to create the final heel.\n\n## Heel Components\n\n- **Top piece** - The wearing surface\n- **Lifts** - Building blocks of height\n- **Heel base** - First layer, includes seat\n- **Nails and pegs** - Traditional fasteners",
                },
              },
              {
                id: "block-1-7-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Building Process\n\n1. **Attach heel base** - Nail to sole, slightly oversized\n2. **Add lifts** - Glue and nail each layer\n3. **Shape as you build** - Trim edges before adding next lift\n4. **Final top piece** - Best quality leather\n5. **Finish nailing** - Pattern for decoration and security\n\n### Standard Heel Heights\n- Oxford/Derby: 25-30mm\n- Boot: 35-40mm\n- Higher heels require angled lifts",
                },
              },
            ],
          },
          {
            id: "step-1-7-2",
            position: 2,
            title: "Edge Finishing",
            estimatedMinutes: 45,
            blocks: [
              {
                id: "block-1-7-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Finishing the Edges\n\nEdge finishing is where craft meets artistry. A beautifully finished edge elevates the entire shoe.\n\n## The Finishing Process\n\n1. **Trim flush** - Sole and welt even with each other\n2. **Glass or rasp** - Remove excess material\n3. **Sand progressively** - 120, 240, 400 grit\n4. **Apply edge ink** - Color to match sole\n5. **Heat burnish** - Friction polishes the edge\n6. **Wax and buff** - Final shine and protection",
                },
              },
              {
                id: "block-1-7-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Edge Profiles\n\nDifferent edge styles create different looks:\n\n- **Flat edge** - Modern, casual appearance\n- **Beveled edge** - Classic dress shoe style\n- **Rounded edge** - Soft, comfortable look\n- **Fiddleback** - Decorative waist shaping\n\n### Heel Edge\nThe heel requires the same treatment as the sole edge. Work carefully around the breast (where heel meets waist).",
                },
              },
              {
                id: "block-1-7-2-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "tip",
                  title: "Take Your Time",
                  content: "Edge finishing cannot be rushed. Each step must fully dry before the next. Budget 2-3 hours for both shoes.",
                },
              },
            ],
          },
          {
            id: "step-1-7-3",
            position: 3,
            title: "Final Details & Clean Up",
            estimatedMinutes: 30,
            blocks: [
              {
                id: "block-1-7-3-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Final Details\n\nThese finishing touches transform your work from \"handmade\" to \"hand-crafted.\"\n\n## Upper Finishing\n\n1. **Punch eyelets** - Mark carefully, punch evenly\n2. **Set eyelets** - Match metal finish to your vision\n3. **Clean the upper** - Remove any marks or glue residue\n4. **Condition leather** - Light coat of cream\n5. **Final polish** - Bring up the shine",
                },
              },
              {
                id: "block-1-7-3-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Inside Finishing\n\n1. **Sock liner** - Optional cushioned layer\n2. **Brand stamp** - Your maker's mark\n3. **Size marking** - For future reference\n4. **Condition lining** - Keep leather supple\n\n### Quality Check\n- Both shoes should match exactly\n- No loose threads visible\n- All edges smooth to touch\n- Stitching even throughout\n- Upper smooth with no wrinkles",
                },
              },
              {
                id: "block-1-7-3-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "success",
                  title: "Congratulations! 🎉",
                  content: "You've completed your first pair of handmade shoes! Lace them up, take a photo, and wear them with pride. Each pair you make will be better than the last.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "course-2",
    slug: "advanced-stitching-techniques",
    title: "Advanced Stitching Techniques",
    description: "Master advanced hand-stitching and machine techniques for professional results.",
    productId: "mock-8",
    status: "PUBLISHED",
    modules: [
      {
        id: "module-2-1",
        position: 1,
        title: "Beyond the Basics",
        steps: [
          {
            id: "step-2-1-1",
            position: 1,
            title: "Course Introduction",
            estimatedMinutes: 10,
            blocks: [
              {
                id: "block-2-1-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Advanced Stitching Mastery\n\nWelcome to the advanced stitching course. Here you'll learn techniques that separate amateur work from professional craftsmanship.\n\n## What You'll Master\n- Multiple decorative stitch patterns\n- Inlay and overlay techniques\n- Curved and sculptural stitching\n- Speed and consistency methods\n- Problem-solving and repairs",
                },
              },
              {
                id: "block-2-1-1-2",
                position: 2,
                type: "CALLOUT",
                payload: {
                  type: "info",
                  title: "Prerequisites",
                  content: "This course assumes you've completed basic shoemaking training and are comfortable with the saddle stitch.",
                },
              },
            ],
          },
          {
            id: "step-2-1-2",
            position: 2,
            title: "Thread Selection Deep Dive",
            estimatedMinutes: 15,
            blocks: [
              {
                id: "block-2-1-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Choosing the Right Thread\n\nThread choice dramatically impacts both aesthetics and durability. Let's explore the options.\n\n## Thread Materials\n\n### Linen\n- Traditional choice\n- Strong and durable\n- Requires hand waxing\n- Natural stretch\n\n### Polyester\n- Consistent thickness\n- Pre-waxed options available\n- UV resistant\n- Good for beginners",
                },
              },
              {
                id: "block-2-1-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "### Nylon (Focus on Tiger Thread & Gütermann)\n- Very strong\n- Slight stretch\n- Excellent for heavy use\n- Many color options\n\n## Thread Sizing\n\n| Size | Use Case |\n|------|----------|\n| NM hoạ080 | Wallets, small goods |\n| 0.6mm | Fine shoes, bags |\n| 0.8mm | Standard shoes |\n| 1.0mm | Boots, belts |\n| 1.2mm+ | Saddles, heavy goods |",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-2-2",
        position: 2,
        title: "Decorative Stitching Patterns",
        steps: [
          {
            id: "step-2-2-1",
            position: 1,
            title: "Broguing Basics",
            estimatedMinutes: 25,
            blocks: [
              {
                id: "block-2-2-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# The Art of Broguing\n\nBroguing adds decorative perforations to leather. Originally functional (for water drainage), it's now purely aesthetic.\n\n## Brogue Types\n\n- **Full brogue** (Wingtip) - W-shaped toe cap with perforations\n- **Semi-brogue** - Straight cap with medallion\n- **Quarter brogue** - Minimal perforations along seams\n- **Longwing** - Wing extends to heel",
                },
              },
              {
                id: "block-2-2-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Punching Technique\n\n1. **Mark your pattern** - Use a template for consistency\n2. **Start from center** - Work outward for symmetry\n3. **Punch size variation** - Larger center, smaller edges\n4. **Clean cuts** - Sharp punch on end-grain block\n5. **Remove plugs** - Push from back to clean\n\n### Medallion Patterns\nThe toe medallion is the signature of the shoe. Classic patterns include:\n- Rosette\n- Petal\n- Starburst\n- Custom designs",
                },
              },
            ],
          },
          {
            id: "step-2-2-2",
            position: 2,
            title: "Contrast Stitching",
            estimatedMinutes: 20,
            blocks: [
              {
                id: "block-2-2-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Making a Statement with Thread Color\n\nContrast stitching adds visual interest and personality. Done well, it's striking. Done poorly, it's distracting.\n\n## Color Considerations\n\n- **Classic contrasts** - Brown leather/cream thread, black/white\n- **Subtle enhancement** - One shade lighter or darker\n- **Bold statements** - Complementary colors\n- **Avoid** - Colors that fight with the leather",
                },
              },
              {
                id: "block-2-2-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Technical Requirements\n\nContrast stitching demands perfection:\n\n1. **Absolutely even spacing** - Inconsistencies show more\n2. **Perfect tension** - Every stitch identical\n3. **Clean entry/exit** - No thread pulls or frays\n4. **Matched pairs** - Both shoes identical\n\n### When to Use Contrast\n- Casual shoes\n- Western boots\n- Commissioned work\n- Creative pieces",
                },
              },
            ],
          },
          {
            id: "step-2-2-3",
            position: 3,
            title: "Hand Welt Stitching Refinement",
            estimatedMinutes: 35,
            blocks: [
              {
                id: "block-2-2-3-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Perfecting Your Welt Stitch\n\nThe welt stitch is the most demanding in shoemaking. Here we'll refine your technique to professional standards.\n\n## Common Issues & Fixes\n\n| Problem | Cause | Solution |\n|---------|-------|----------|\n| Uneven spacing | Inconsistent awl angles | Use guide template |\n| Loose stitches | Insufficient tension | Pull with body weight |\n| Thread breakage | Too thin for task | Size up thread |\n| Skipped holes | Rushing | Slow down, check each |",
                },
              },
              {
                id: "block-2-2-3-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Speed Building Exercises\n\n1. **Rhythm practice** - Welt strips only, no upper\n2. **Timed runs** - Track stitches per minute\n3. **Consistency checks** - Photograph every 5th pair\n4. **Blind stitching** - Develop muscle memory\n\n### Professional Benchmarks\n- Beginner: 4-5 SPI (stitches per inch)\n- Intermediate: 6-7 SPI\n- Expert: 8-10 SPI\n- Master: 10+ SPI",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-2-3",
        position: 3,
        title: "Machine Stitching",
        steps: [
          {
            id: "step-2-3-1",
            position: 1,
            title: "Choosing a Sewing Machine",
            estimatedMinutes: 20,
            blocks: [
              {
                id: "block-2-3-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Leather Sewing Machines\n\nWhile hand stitching is traditional, machines have their place in modern shoemaking.\n\n## Machine Types\n\n### Flatbed Post Machines\n- Most common for shoes\n- Post allows access to closed shapes\n- Variable presser foot pressure\n- Walking foot essential",
                },
              },
              {
                id: "block-2-3-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "### Cylinder Arm Machines\n- For tubular work\n- Excellent for boot legs\n- Allows tight curves\n\n### Patchers\n- Heavy-duty repairs\n- Thick materials\n- Slow but powerful\n\n## Key Features\n- Walking foot mechanism\n- Adjustable stitch length\n- Thread tension controls\n- Needle bar height\n- Foot lift clearance",
                },
              },
            ],
          },
          {
            id: "step-2-3-2",
            position: 2,
            title: "Machine Stitching Techniques",
            estimatedMinutes: 25,
            blocks: [
              {
                id: "block-2-3-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Mastering the Machine\n\nMachine stitching requires different skills than hand work. Here's how to achieve professional results.\n\n## Setup for Leather\n\n1. **Install leather needle** - Cutting point, size 18-22\n2. **Thread top and bobbin** - Match thread weights\n3. **Adjust tension** - Test on scraps\n4. **Set stitch length** - 3-4mm for most work\n5. **Check foot pressure** - Should grip without crushing",
                },
              },
              {
                id: "block-2-3-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Stitching Technique\n\n- **Guide, don't push** - Let the machine pull the work\n- **Consistent speed** - Steady foot pressure\n- **Pivot at corners** - Needle down, lift foot, turn\n- **Backtack starts/ends** - 3-4 stitches\n- **Overlap for security** - When joining seams\n\n### Troubleshooting\n- Thread bunching: Check bobbin tension\n- Skipped stitches: New needle, adjust timing\n- Uneven stitches: Clean feed dogs",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "course-3",
    slug: "last-making-fitting",
    title: "Last Making and Fitting",
    description: "Comprehensive guide to creating and fitting shoe lasts.",
    productId: "mock-9",
    status: "PUBLISHED",
    modules: [
      {
        id: "module-3-1",
        position: 1,
        title: "Understanding Lasts",
        steps: [
          {
            id: "step-3-1-1",
            position: 1,
            title: "The Foundation of Fit",
            estimatedMinutes: 15,
            blocks: [
              {
                id: "block-3-1-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# The Shoe Last: Heart of the Craft\n\nThe last determines everything about how a shoe fits, looks, and wears. Master the last, master the shoe.\n\n## Why Lasts Matter\n\n- **Fit** - Every millimeter affects comfort\n- **Style** - Toe shape defines character\n- **Function** - Walk, run, stand, dance\n- **Longevity** - Proper fit extends shoe life",
                },
              },
              {
                id: "block-3-1-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Last Anatomy\n\n- **Toe shape** - Round, square, pointed, almond\n- **Ball** - Widest point (metatarsal area)\n- **Waist** - The arch area\n- **Instep** - Top of foot curve\n- **Heel seat** - Where heel rests\n- **Backpart** - Heel curve\n- **Toe spring** - Upturn at toe\n- **Heel pitch** - Height difference heel to toe",
                },
              },
            ],
          },
          {
            id: "step-3-1-2",
            position: 2,
            title: "Taking Foot Measurements",
            estimatedMinutes: 25,
            blocks: [
              {
                id: "block-3-1-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Measuring for Custom Lasts\n\nAccurate measurements are essential for custom work. Here's the professional method.\n\n## Required Measurements\n\n1. **Foot length** - Heel to longest toe\n2. **Ball girth** - Around widest part\n3. **Waist girth** - Around arch\n4. **Instep girth** - Over highest point\n5. **Heel girth** - Around heel and instep\n6. **Ball width** - Across at widest\n7. **Heel width** - Across at heel",
                },
              },
              {
                id: "block-3-1-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Measurement Technique\n\n1. **Weight bearing** - Always measure standing\n2. **Both feet** - Often different sizes\n3. **Time of day** - Feet swell; measure afternoon\n4. **Socks** - Include what they'll wear\n5. **Record everything** - Use standard forms\n\n### Creating Foot Tracings\n- Stand on paper\n- Trace with pencil held vertical\n- Mark key points (toe tips, ball, heel center)\n- Note any asymmetries or issues",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-3-2",
        position: 2,
        title: "Modifying Standard Lasts",
        steps: [
          {
            id: "step-3-2-1",
            position: 1,
            title: "Selecting a Base Last",
            estimatedMinutes: 15,
            blocks: [
              {
                id: "block-3-2-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Choosing Your Starting Point\n\nFew makers carve from scratch. Most modify existing lasts.\n\n## Finding Lasts\n\n- **Vintage lasts** - Often excellent quality, need reconditioning\n- **Commercial lasts** - From shoemaking suppliers\n- **3D printed** - Growing option for custom\n- **Trade lasts** - From closing factories\n\n## What to Look For\n- Similar foot shape to target\n- Close to needed size\n- Style appropriate (dress, casual, boot)\n- Good condition (no cracks or warping)",
                },
              },
            ],
          },
          {
            id: "step-3-2-2",
            position: 2,
            title: "Adding Material",
            estimatedMinutes: 30,
            blocks: [
              {
                id: "block-3-2-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Building Up the Last\n\nWhen you need MORE volume somewhere, we add material.\n\n## Methods\n\n### Leather Addition\n1. Skive thin leather to feather edge\n2. Glue to last surface\n3. Fair edges smooth\n4. Repeat for thicker builds\n\n### Epoxy Building\n1. Mix two-part epoxy\n2. Apply where needed\n3. Shape while setting\n4. Sand when cured",
                },
              },
              {
                id: "block-3-2-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "### Wooden Blocks\n1. Glue blocks to last\n2. Carve and rasp to shape\n3. Sand smooth\n4. Seal surface\n\n## Common Build-ups\n- **High instep** - Add across top\n- **Wide ball** - Build sides at metatarsal\n- **Bunion accommodation** - Local bump at joint\n- **Higher toe box** - Add to top of toe",
                },
              },
            ],
          },
          {
            id: "step-3-2-3",
            position: 3,
            title: "Removing Material",
            estimatedMinutes: 25,
            blocks: [
              {
                id: "block-3-2-3-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Carving the Last\n\nWhen you need LESS volume, we remove material.\n\n## Tools for Removal\n\n- **Rasp** - Aggressive removal\n- **Surform** - Controlled shaping\n- **Sandpaper** - Fine adjustments\n- **Spokeshave** - Large curves\n- **Files** - Detail work",
                },
              },
              {
                id: "block-3-2-3-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Technique\n\n1. **Mark areas** - Where reduction needed\n2. **Go slowly** - You can't add wood back\n3. **Work evenly** - Remove from all sides equally\n4. **Check constantly** - Measure as you work\n5. **Smooth finish** - End with fine sandpaper\n\n### Common Reductions\n- **Narrow heel** - Carve sides of backpart\n- **Lower instep** - Remove from top\n- **Slimmer toe** - Shape from sides\n- **Reduced ball** - Narrow at widest point",
                },
              },
              {
                id: "block-3-2-3-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "warning",
                  title: "Go Slow",
                  content: "Remove less than you think. It's easier to take more than to add material back.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-3-3",
        position: 3,
        title: "Fitting and Adjustments",
        steps: [
          {
            id: "step-3-3-1",
            position: 1,
            title: "Test Fitting Methods",
            estimatedMinutes: 20,
            blocks: [
              {
                id: "block-3-3-1-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Testing Last Fit\n\nBefore committing to expensive leather, test your last.\n\n## Testing Methods\n\n### Fabric Upper\n1. Make pattern from modified last\n2. Sew quick upper in canvas\n3. Last over the foot\n4. Identify pressure points and gaps\n5. Adjust last and repeat",
                },
              },
              {
                id: "block-3-3-1-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "### Check Points\n\n- **Toe room** - Thumb width from longest toe\n- **Ball alignment** - Widest point matches widest part of foot\n- **Arch support** - Last fills without pressure\n- **Heel grip** - Snug but not tight\n- **Instep fit** - Room for lacing adjustment\n\n### Walk Test\n- Take several steps\n- Check for heel slip\n- Feel for pinch points\n- Note any rubbing areas",
                },
              },
            ],
          },
          {
            id: "step-3-3-2",
            position: 2,
            title: "Common Fit Problems & Solutions",
            estimatedMinutes: 25,
            blocks: [
              {
                id: "block-3-3-2-1",
                position: 1,
                type: "TEXT",
                payload: {
                  content: "# Troubleshooting Fit Issues\n\nEven experienced makers encounter fit problems. Here's how to diagnose and fix them.\n\n## Problem: Heel Slip\n**Cause:** Heel too wide or low\n**Solution:** Build up heel seat, narrow back curve\n\n## Problem: Toe Pinch\n**Cause:** Toe box too narrow or low\n**Solution:** Widen or raise toe area of last",
                },
              },
              {
                id: "block-3-3-2-2",
                position: 2,
                type: "TEXT",
                payload: {
                  content: "## Problem: Ball Tightness\n**Cause:** Last too narrow at metatarsal\n**Solution:** Widen ball area both sides\n\n## Problem: Arch Gap\n**Cause:** Last waist doesn't match foot\n**Solution:** Build up waist area of last\n\n## Problem: Instep Pressure\n**Cause:** Last too high over instep\n**Solution:** Reduce last at instep, or adjust pattern\n\n### Documentation\nKeep notes on every modification. This builds your fitting knowledge over time.",
                },
              },
              {
                id: "block-3-3-2-3",
                position: 3,
                type: "CALLOUT",
                payload: {
                  type: "success",
                  title: "You're Ready!",
                  content: "With fitted lasts, you can now create truly bespoke shoes. Each pair will fit perfectly because YOU made them that way.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
]
