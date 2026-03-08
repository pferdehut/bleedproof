import { getImpressions } from "@/lib/notion/impressions"
import { LogoSvg } from "@/components/logo-svg"
import Image from "next/image"

export const revalidate = 60

export default async function ImpressionsPage() {
  let impressions = []
  
  try {
    impressions = await getImpressions()
  } catch (error) {
    console.error('Error fetching impressions:', error)
  }

  // Static fallback images
  const staticImages = [
    {
      id: 1,
      src: "/woodworking-workshop-students-learning.jpg",
      alt: "Students learning woodworking techniques",
      category: "Workshop",
      size: "large", // Hero image
    },
    {
      id: 2,
      src: "/finished-wooden-furniture-piece.jpg",
      alt: "Beautiful finished wooden furniture",
      category: "Projects",
      size: "medium",
    },
    {
      id: 3,
      src: "/woodworking-tools-and-equipment.jpg",
      alt: "Professional woodworking tools",
      category: "Studio",
      size: "small",
    },
    {
      id: 4,
      src: "/instructor-teaching-joinery-techniques.jpg",
      alt: "Instructor demonstrating joinery",
      category: "Workshop",
      size: "medium",
    },
    {
      id: 5,
      src: "/handcrafted-wooden-chair.jpg",
      alt: "Handcrafted wooden chair",
      category: "Projects",
      size: "large",
    },
    {
      id: 6,
      src: "/workshop-studio-space-with-natural-light.jpg",
      alt: "Our workshop studio space",
      category: "Studio",
      size: "small",
    },
    {
      id: 7,
      src: "/group-of-students-working-on-projects.jpg",
      alt: "Students collaborating on projects",
      category: "Workshop",
      size: "medium",
    },
    {
      id: 8,
      src: "/detailed-wood-carving-close-up.jpg",
      alt: "Detailed wood carving work",
      category: "Projects",
      size: "small",
    },
    {
      id: 9,
      src: "/organized-woodworking-workshop.jpg",
      alt: "Organized workshop environment",
      category: "Studio",
      size: "medium",
    },
  ]

  // Use Notion data if available, otherwise use static images
  const galleryImages = impressions.length > 0 
    ? impressions.map((imp, i) => ({
        id: i + 1,
        src: imp.imageUrl,
        alt: imp.title,
        category: 'Workshop',
      }))
    : staticImages

  // Cycle through colors for each image block
  const boxColors = ['box-orange', 'box-mint', 'box-sky', 'box-coral', 'box-purple']
  
  // Variable grid sizes that cycle
  const gridSizes = [
    'col-span-12 md:col-span-4',   // medium
    'col-span-12 md:col-span-4',   // medium
    'col-span-12 md:col-span-4',  // medium
  ]

  return (
    <div className="min-h-screen bg-white p-0">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-6 md:col-span-3 box box-coral min-h-[250px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
          <LogoSvg />
        </div>

        {/* Hero block - purple */}
        <div className="col-span-6 md:col-span-4 px-2 py-6 md:p-6 box box-coral min-h-[250px] md:min-h-[350px] flex flex-col justify-between">
          <div className="text-xs mb-3">impressionen</div>
          <h1 className="text-4xl md:text-7xl font-display">
            Ein-
            <br />
            blicke
          </h1>
        </div>

        <div className="col-span-6 md:col-span-5 absolute flex justify-end md:justify-center left-1/2 md:left-1/4 -top-[20px] md:top-[0px] box min-h-[250px] md:min-h-[300px] p-0 bg-transparent z-40">
          <Image src="/illus/beleuchten.png" alt="smiley t-shirt" className="w-full md:w-2/3 object-center pt-16 md:-mb-16 object-contain opacity-80" />
        </div>

        {/* Description block - yellow */}
        <div className="col-span-12 md:col-span-5 px-2 py-6 md:p-6 md:pl-18 md:-ml-12 box box-purple min-h-[250px] md:min-h-[350px] flex flex-wrap md:justify-center content-center justify-center bg-linear-to-t md:bg-linear-to-l from-purple from-90% to-coral to-100%">
          <p className="text-xl md:text-2xl md:w-2/3 leading-tight">
            Eine Reise durch unsere Arbeiten und bisherigen Workshops.
          </p>
        </div>

        {/* Gallery - dynamic images with cycling colors and sizes */}
        {galleryImages.map((image, index) => {
          const colorClass = boxColors[index % boxColors.length]
          const sizeClass = gridSizes[index % gridSizes.length]
          
          return (
            <div key={image.id} className={`${sizeClass} box ${colorClass} min-h-[300px] md:min-h-[400px] p-0 relative`}>
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                loading={index < 4 ? "eager" : "lazy"}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
