import ReactMarkdown from "react-markdown";

const Recipe = (props) => {
  return (
    <section>
      <ReactMarkdown>{props.showRecipe}</ReactMarkdown>
    </section>
  );
};

export default Recipe;
