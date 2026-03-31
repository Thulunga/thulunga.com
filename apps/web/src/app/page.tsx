import { Button, Container, Logo, Navbar, Footer } from "@thulunga/ui";

export default function HomePage() {
  const careersUrl = process.env.NEXT_PUBLIC_CAREERS_URL || "#";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <a href={careersUrl}>
          <Button variant="outline" size="sm">Explore Careers</Button>
        </a>
      </Navbar>

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <Container className="py-24 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-thulunga-500 mb-4">
            From Bodoland, for everyone
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            Find your <span className="text-thulunga-500">direction</span>.
            <br />
            Build your <span className="text-forest-500">future</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-earth-500">
            Thulunga means <em>inspiration</em>. We are building a place where people —
            especially from Bodoland and similar backgrounds — come when they need guidance,
            motivation, or a way to move forward in life.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={careersUrl}>
              <Button size="lg">Explore Opportunities</Button>
            </a>
            <a href="/about">
              <Button variant="outline" size="lg">Our Mission</Button>
            </a>
          </div>
        </Container>
      </section>

      {/* What we are building */}
      <section className="bg-earth-50 py-20">
        <Container>
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            What we&apos;re building
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl bg-white p-8 border border-earth-200">
              <div className="w-10 h-10 rounded-lg bg-thulunga-100 flex items-center justify-center mb-4">
                <span className="text-thulunga-600 font-bold text-lg">C</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Careers</h3>
              <p className="text-sm text-earth-500">
                Curated opportunities, career paths, and practical guidance tailored for
                people from Northeast India.
              </p>
              <a
                href={careersUrl}
                className="mt-4 inline-block text-sm font-medium text-thulunga-600 hover:text-thulunga-700"
              >
                Explore now &rarr;
              </a>
            </div>
            <div className="rounded-xl bg-white p-8 border border-earth-200 opacity-60">
              <div className="w-10 h-10 rounded-lg bg-forest-100 flex items-center justify-center mb-4">
                <span className="text-forest-600 font-bold text-lg">N</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Connect</h3>
              <p className="text-sm text-earth-500">
                A network of mentors, role models, and real stories from the Bodo community.
              </p>
              <span className="mt-4 inline-block text-sm text-earth-300">Coming soon</span>
            </div>
            <div className="rounded-xl bg-white p-8 border border-earth-200 opacity-60">
              <div className="w-10 h-10 rounded-lg bg-earth-100 flex items-center justify-center mb-4">
                <span className="text-earth-600 font-bold text-lg">L</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Learn</h3>
              <p className="text-sm text-earth-500">
                Practical skills and guides — from interview prep to freelancing — built for
                real-world outcomes.
              </p>
              <span className="mt-4 inline-block text-sm text-earth-300">Coming soon</span>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
