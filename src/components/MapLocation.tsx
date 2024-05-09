export default function MapLocation({ location }: { location: string }) {
   return (
      <section className="w-full py-12 md:py-24">
         <div className="container px-10 flex flex-col gap-0 md:gap-8 items-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
               Map Location
            </h2>
            <div className="w-full">
               <div className="aspect-w-16 aspect-h-9 rounded-3xl">
                  {/* Taken from group 3's repo :D */}
                  <iframe
                     className="w-full h-[400px] px-4 md:px-20 lg:px-32 rounded-3xl"
                     loading="lazy"
                     src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCT7_cNQ9nTtOqQW9_z6YcnV52OIJMeUK4&q=${location}`}
                  />
               </div>
            </div>
         </div>
      </section>
   );
}
