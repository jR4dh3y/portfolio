import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl">About Me</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              I'm a developer comfortable across the full stack, with experience in frontend, backend, and machine learning. I enjoy building end-to-end applications and end up spending a lot of my time on ricing my setup.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              My work includes full-stack web apps using Svelte and Node.js, mobile applications with React Native, and ML projects like a speech enhancement pipeline using PyTorch. I also have a passion for Linux and have created reproducible dotfile installers.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              I'm always learning and exploring new technologies. I believe in creating well-documented, maintainable code and shipping complete examples with demos and clear instructions.
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
