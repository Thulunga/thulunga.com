import { Container, Navbar, Footer, Button, Card, Badge } from "@thulunga/ui";

// Temporary mock data — will be replaced with API calls
const MOCK_OPPORTUNITIES = [
  {
    id: "1",
    title: "UPSC Civil Services 2026 Notification",
    type: "government_exam",
    category: "civil_services",
    organization: "Union Public Service Commission",
    deadline: "2026-04-30",
    isRemote: false,
    isNortheastSpecific: false,
    description: "Annual civil services examination for IAS, IPS, IFS and other Group A and B services.",
  },
  {
    id: "2",
    title: "Post Matric Scholarship for ST Students",
    type: "scholarship",
    category: "other",
    organization: "Ministry of Tribal Affairs",
    deadline: "2026-06-15",
    isRemote: false,
    isNortheastSpecific: true,
    description: "Scholarship for Scheduled Tribe students pursuing post-matriculation studies.",
  },
  {
    id: "3",
    title: "Junior Developer — Remote (Northeast India preferred)",
    type: "job",
    category: "technology",
    organization: "TechBridge Northeast",
    deadline: "2026-05-01",
    isRemote: true,
    isNortheastSpecific: true,
    description: "Entry-level developer role. Preference for candidates from Northeast India.",
  },
];

const TYPE_BADGES: Record<string, { label: string; variant: "government" | "scholarship" | "job" | "remote" | "default" }> = {
  government_exam: { label: "Govt Exam", variant: "government" },
  scholarship: { label: "Scholarship", variant: "scholarship" },
  job: { label: "Job", variant: "job" },
  internship: { label: "Internship", variant: "default" },
  freelance: { label: "Freelance", variant: "remote" },
  fellowship: { label: "Fellowship", variant: "scholarship" },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentApp="Careers"
        items={[
          { label: "Opportunities", href: "#opportunities" },
          { label: "Career Paths", href: "/paths" },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-thulunga-50 to-white py-16">
        <Container className="text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold">
            Your next <span className="text-thulunga-500">opportunity</span> is here
          </h1>
          <p className="mt-4 text-earth-500 max-w-xl mx-auto">
            Government exams, scholarships, jobs, and career guidance —
            curated for students and young professionals from Bodoland and Northeast India.
          </p>
        </Container>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold">Latest Opportunities</h2>
          </div>
          <div className="grid gap-6">
            {MOCK_OPPORTUNITIES.map((opp) => {
              const badge = TYPE_BADGES[opp.type] || { label: opp.type, variant: "default" as const };
              return (
                <Card key={opp.id} className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                      {opp.isRemote && <Badge variant="remote">Remote</Badge>}
                      {opp.isNortheastSpecific && (
                        <Badge variant="default">NE India</Badge>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-semibold">{opp.title}</h3>
                    <p className="text-sm text-earth-500 mt-1">{opp.organization}</p>
                    <p className="text-sm text-earth-400 mt-2">{opp.description}</p>
                  </div>
                  {opp.deadline && (
                    <div className="text-right text-sm text-earth-400 whitespace-nowrap">
                      <span className="block text-xs uppercase tracking-wide text-earth-300">Deadline</span>
                      {new Date(opp.deadline).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
