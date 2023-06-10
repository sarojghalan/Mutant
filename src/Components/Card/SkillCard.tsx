import '../../Scss/Main.scss';

interface SkillCardProps {
  image: string;
  title: string;
}

function SkillCard({ image, title }: SkillCardProps) {
  return (
    <div className="card__skill">
      <img src={image} alt="" />
      <p>{title}</p>
    </div>
  );
}
export default SkillCard;
