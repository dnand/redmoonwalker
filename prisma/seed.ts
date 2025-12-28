import { PrismaClient, ProductType, ProductStatus, SkillLevel, CourseStatus, StepBlockType } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create products
  const patterns = [
    {
      type: ProductType.PATTERN,
      title: "Classic Oxford Shoe Pattern",
      slug: "classic-oxford-shoe-pattern",
      description: "A timeless oxford shoe pattern perfect for beginners. Includes detailed instructions and sizing guide.",
      priceCents: 2999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      metadata: {
        style: "Oxford",
        tools: ["Leather", "Thread", "Needles", "Last"],
      },
      variants: [
        { title: "Beginner", skillLevel: SkillLevel.BEGINNER },
        { title: "Intermediate", skillLevel: SkillLevel.INTERMEDIATE },
      ],
    },
    {
      type: ProductType.PATTERN,
      title: "Derby Shoe Pattern",
      slug: "derby-shoe-pattern",
      description: "Versatile derby shoe pattern with multiple closure options.",
      priceCents: 3499,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      metadata: {
        style: "Derby",
        tools: ["Leather", "Thread", "Needles", "Last"],
      },
      variants: [
        { title: "Intermediate", skillLevel: SkillLevel.INTERMEDIATE },
        { title: "Advanced", skillLevel: SkillLevel.ADVANCED },
      ],
    },
    {
      type: ProductType.PATTERN,
      title: "Loafers Pattern Collection",
      slug: "loafers-pattern-collection",
      description: "Complete collection of loafer patterns including penny loafers and tassel loafers.",
      priceCents: 3999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      metadata: {
        style: "Loafers",
        tools: ["Leather", "Thread", "Needles", "Last"],
      },
      variants: [
        { title: "Beginner", skillLevel: SkillLevel.BEGINNER },
        { title: "Advanced", skillLevel: SkillLevel.ADVANCED },
      ],
    },
    {
      type: ProductType.PATTERN,
      title: "Boot Pattern Set",
      slug: "boot-pattern-set",
      description: "Professional boot patterns including ankle boots and work boots.",
      priceCents: 4499,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      metadata: {
        style: "Boots",
        tools: ["Leather", "Thread", "Needles", "Last"],
      },
      variants: [
        { title: "Intermediate", skillLevel: SkillLevel.INTERMEDIATE },
      ],
    },
    {
      type: ProductType.PATTERN,
      title: "Sneaker Pattern",
      slug: "sneaker-pattern",
      description: "Modern sneaker pattern with athletic sole construction.",
      priceCents: 3799,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      metadata: {
        style: "Sneakers",
        tools: ["Leather", "Thread", "Needles", "Last"],
      },
      variants: [
        { title: "Advanced", skillLevel: SkillLevel.ADVANCED },
      ],
    },
    {
      type: ProductType.PATTERN,
      title: "Moccasin Pattern",
      slug: "moccasin-pattern",
      description: "Traditional moccasin pattern with hand-sewn construction.",
      priceCents: 2799,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      metadata: {
        style: "Moccasin",
        tools: ["Leather", "Thread", "Needles"],
      },
      variants: [
        { title: "Beginner", skillLevel: SkillLevel.BEGINNER },
      ],
    },
  ]

  const materials = [
    {
      type: ProductType.MATERIAL,
      title: "Premium Italian Calf Leather",
      slug: "premium-italian-calf-leather",
      description: "High-quality Italian calf leather in various colors. Perfect for dress shoes.",
      priceCents: 8999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800",
      metadata: {
        thickness: "2-3mm",
        temper: "Medium",
        color: "Black, Brown, Tan",
      },
    },
    {
      type: ProductType.MATERIAL,
      title: "English Bridle Leather",
      slug: "english-bridle-leather",
      description: "Traditional English bridle leather, known for its durability and patina.",
      priceCents: 10999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800",
      metadata: {
        thickness: "3-4mm",
        temper: "Firm",
        color: "Brown, Black",
      },
    },
    {
      type: ProductType.MATERIAL,
      title: "Suede Leather Pack",
      slug: "suede-leather-pack",
      description: "Soft suede leather in multiple colors for casual shoes.",
      priceCents: 6999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800",
      metadata: {
        thickness: "1.5-2mm",
        temper: "Soft",
        color: "Various",
      },
    },
    {
      type: ProductType.MATERIAL,
      title: "Veg-Tan Leather",
      slug: "veg-tan-leather",
      description: "Vegetable-tanned leather that develops beautiful patina over time.",
      priceCents: 7999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800",
      metadata: {
        thickness: "2.5-3mm",
        temper: "Medium-Firm",
        color: "Natural",
      },
    },
    {
      type: ProductType.MATERIAL,
      title: "Exotic Leather Collection",
      slug: "exotic-leather-collection",
      description: "Premium exotic leathers including alligator and ostrich.",
      priceCents: 19999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800",
      metadata: {
        thickness: "Varies",
        temper: "Varies",
        color: "Various",
      },
    },
    {
      type: ProductType.MATERIAL,
      title: "Leather Lining Pack",
      slug: "leather-lining-pack",
      description: "Soft leather lining material for shoe interiors.",
      priceCents: 4999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800",
      metadata: {
        thickness: "1mm",
        temper: "Soft",
        color: "Various",
      },
    },
  ]

  const guides = [
    {
      type: ProductType.GUIDE,
      title: "Complete Beginner's Guide to Shoemaking",
      slug: "complete-beginners-guide-shoemaking",
      description: "Learn the fundamentals of shoemaking from tools to finishing techniques.",
      priceCents: 4999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
      metadata: {
        topic: "Fundamentals",
        duration: "8 hours",
        prerequisites: "None",
      },
    },
    {
      type: ProductType.GUIDE,
      title: "Advanced Stitching Techniques",
      slug: "advanced-stitching-techniques",
      description: "Master advanced hand-stitching and machine techniques for professional results.",
      priceCents: 5999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
      metadata: {
        topic: "Techniques",
        duration: "6 hours",
        prerequisites: "Basic shoemaking knowledge",
      },
    },
    {
      type: ProductType.GUIDE,
      title: "Last Making and Fitting",
      slug: "last-making-fitting",
      description: "Comprehensive guide to creating and fitting shoe lasts.",
      priceCents: 6999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
      metadata: {
        topic: "Last Making",
        duration: "10 hours",
        prerequisites: "Intermediate level",
      },
    },
    {
      type: ProductType.GUIDE,
      title: "Sole Construction Methods",
      slug: "sole-construction-methods",
      description: "Learn various sole construction methods from Goodyear welt to Blake stitch.",
      priceCents: 6499,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
      metadata: {
        topic: "Construction",
        duration: "7 hours",
        prerequisites: "Basic knowledge",
      },
    },
    {
      type: ProductType.GUIDE,
      title: "Leather Selection and Care",
      slug: "leather-selection-care",
      description: "Everything you need to know about selecting and caring for leather.",
      priceCents: 3999,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
      metadata: {
        topic: "Materials",
        duration: "4 hours",
        prerequisites: "None",
      },
    },
    {
      type: ProductType.GUIDE,
      title: "Finishing and Polishing Masterclass",
      slug: "finishing-polishing-masterclass",
      description: "Professional finishing techniques for a perfect shine.",
      priceCents: 4499,
      status: ProductStatus.PUBLISHED,
      coverImageUrl: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
      metadata: {
        topic: "Finishing",
        duration: "5 hours",
        prerequisites: "Basic knowledge",
      },
    },
  ]

  // Create products
  const createdPatterns = []
  for (const pattern of patterns) {
    const { variants, ...productData } = pattern
    const product = await prisma.product.create({
      data: {
        ...productData,
        variants: {
          create: variants,
        },
      },
    })
    createdPatterns.push(product)
  }

  const createdMaterials = []
  for (const material of materials) {
    const product = await prisma.product.create({
      data: material,
    })
    createdMaterials.push(product)
  }

  const createdGuides = []
  for (const guide of guides) {
    const product = await prisma.product.create({
      data: guide,
    })
    createdGuides.push(product)
  }

  // Create courses for guides
  const courseData = [
    {
      productId: createdGuides[0].id,
      title: "Complete Beginner's Guide to Shoemaking",
      slug: "complete-beginners-guide-shoemaking",
      description: "Learn the fundamentals of shoemaking from tools to finishing techniques.",
      status: CourseStatus.PUBLISHED,
      modules: [
        {
          title: "Introduction to Shoemaking",
          position: 1,
          steps: [
            {
              title: "Welcome to Shoemaking",
              position: 1,
              estimatedMinutes: 10,
              blocks: [
                {
                  type: StepBlockType.TEXT,
                  position: 1,
                  payload: {
                    text: "Welcome to your shoemaking journey! In this course, you'll learn everything you need to know to create beautiful, handcrafted shoes.",
                  },
                },
                {
                  type: StepBlockType.VIDEO_EMBED,
                  position: 2,
                  payload: {
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    videoProvider: "youtube",
                  },
                },
              ],
            },
            {
              title: "Essential Tools",
              position: 2,
              estimatedMinutes: 15,
              blocks: [
                {
                  type: StepBlockType.TEXT,
                  position: 1,
                  payload: {
                    text: "Before you begin, you'll need these essential tools:\n\n- Last\n- Hammer\n- Awl\n- Needles\n- Thread\n- Leather",
                  },
                },
                {
                  type: StepBlockType.CHECKLIST,
                  position: 2,
                  payload: {
                    items: [
                      "Purchase a shoe last",
                      "Get quality leather",
                      "Buy stitching needles",
                      "Acquire an awl",
                    ],
                  },
                },
                {
                  type: StepBlockType.TIP,
                  position: 3,
                  payload: {
                    title: "Pro Tip",
                    text: "Start with basic tools and upgrade as you progress.",
                  },
                },
              ],
            },
          ],
        },
        {
          title: "Basic Techniques",
          position: 2,
          steps: [
            {
              title: "Cutting Leather",
              position: 1,
              estimatedMinutes: 20,
              blocks: [
                {
                  type: StepBlockType.TEXT,
                  position: 1,
                  payload: {
                    text: "Learn how to properly cut leather for your shoe patterns.",
                  },
                },
                {
                  type: StepBlockType.IMAGE,
                  position: 2,
                  payload: {
                    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800",
                    alt: "Cutting leather",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  for (const course of courseData) {
    const { modules, ...courseInfo } = course
    await prisma.course.create({
      data: {
        ...courseInfo,
        modules: {
          create: modules.map((module) => {
            const { steps, ...moduleData } = module
            return {
              ...moduleData,
              steps: {
                create: steps.map((step) => {
                  const { blocks, ...stepData } = step
                  return {
                    ...stepData,
                    blocks: {
                      create: blocks,
                    },
                  }
                }),
              },
            }
          }),
        },
      },
    })
  }

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

