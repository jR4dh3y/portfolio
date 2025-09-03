import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">About Me</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              I am a dedicated and results-oriented software developer with a passion for creating intuitive and dynamic user experiences. With a solid foundation in web technologies, I thrive on solving complex problems and continuously learning new skills.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              My journey into tech began with a curiosity for how things work, which quickly evolved into a career building robust and scalable applications. I have experience working in agile environments and collaborating with cross-functional teams to deliver high-quality products.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Outside of coding, I enjoy exploring new technologies, contributing to open-source projects, and staying active in the tech community. I'm always excited to take on new challenges and make a meaningful impact through technology.
            </p>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative h-96 w-80">
              <Image
                src="https://picsum.photos/600/800"
                alt="A photo of Radhey"
                fill
                className="rounded-lg object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                data-ai-hint="person working"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
