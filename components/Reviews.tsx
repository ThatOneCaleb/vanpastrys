import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

// Verbatim quotes from verified public reviews:
// - Tripadvisor: ShowUserReviews r434049949 (softballsandlace, Nov 2016),
//   r603662406 (bsum73, Aug 2018), r954210686 (Michele L, Jun 2024)
// - Yelp quote surfaced via search snippet; page itself blocks fetching
const reviews = [
  {
    id: 1,
    name: "Our MidTown Gem!",
    role: "Michele L · Jun 2024",
    company: "Tripadvisor",
    content:
      "This is a MidTown gem. The donuts are great and the coffee is the best 'good ol' cup of Joe' around. It's a beloved shop that's kept its vintage GR look. I consider Van's a 'Must Visit' Grand Rapids spot!",
    rating: 5,
    avatar: "",
  },
  {
    id: 2,
    name: "English Muffin Bread Loaves",
    role: "bsum73 · Aug 2018",
    company: "Tripadvisor",
    content:
      "I heard for months before we got there about this bread. It does not disappoint. If you like eggs Benedict — or the hundreds of offshoots of it — get this bread.",
    rating: 5,
    avatar: "",
  },
  {
    id: 3,
    name: "Best Doughnuts in Grand Rapids",
    role: "softballsandlace · Nov 2016",
    company: "Tripadvisor",
    content:
      "Nowhere else can you get such a great doughnut for such a small price. They offer long johns, cookies, cakes, and bread — I recommend the English Muffin bread.",
    rating: 5,
    avatar: "",
  },
  {
    id: 4,
    name: "Legend!",
    role: "Beri B · Apr 2022",
    company: "Tripadvisor",
    content:
      "I'm Dutch. This place is older than me and I wouldn't change a thing. My favorites are the Dutch Crisps. The Fritters are divine. Everything is homemade, nothing comes off an assembly line. Staff is always cheerful and friendly.",
    rating: 5,
    avatar: "",
  },
];

export default function Reviews() {
  return (
    <AnimatedTestimonials
      badgeText="#1 of 27 Bakeries in Grand Rapids — Tripadvisor"
      title="What Grand Rapids Says"
      subtitle="A hundred years of regulars can't be wrong. These are real words from real customers — the people who line up on Fulton Street every morning."
      testimonials={reviews}
      autoRotateInterval={5500}
      className="bg-parchment"
    />
  );
}
