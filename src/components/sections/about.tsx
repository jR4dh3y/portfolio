import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-headline text-4xlis font-extrabold tracking-tight sm:text-5xl">About Me</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              I'm a Computer Science Engineering student who loves messing around with tech, open source, and building cool stuff. I'm always curious about how things work and end up learning best by experimenting and trying new projects.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              I'm efficient at leading groups and getting work done, with experience gained through bootcamps, hackathons, and team projects. These opportunities have helped me improve my communication and leadership skills, manage responsibilities under pressure, and deliver results effectively.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              When I'm not coding, you'll usually find me listening to or creating music. I love breaking it down and sometimes make my own. I also enjoy exploring new tools, research, and open source projects, because for me, tech is all about sharing, learning, and building things that others can use too.
            </p>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative h-96 w-80">
              <Image
                src="/assets/about.jpg"
                alt=""
                fill
                className="rounded-lg object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
