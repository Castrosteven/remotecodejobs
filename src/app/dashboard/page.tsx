const cardData = [
  { title: "Applicants", content: "4 new applicants!" },
  { title: "Active Job Listings", content: "2" },
  { title: "Draft Job Listings", content: "1" },
  { title: "Create A new job", content: "Content for Card 4" },
];
interface CardProps {
  title: string;
  content: string;
}

const CustomCard: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="card p-4 shadow-md rounded-lg">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-content">{content}</p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="container mx-auto p-4">
      Dashboard Page
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {cardData.map((card, index) => (
          <CustomCard key={index} title={card.title} content={card.content} />
        ))}
      </div>
    </div>
  );
};

export default Page;
