import ReactMarkdown from "react-markdown";

const Recipe = (props) => {
  return (
    <section>
      <h1>Chef Okoro Recommends</h1>
      <ReactMarkdown>{props.showRecipe}</ReactMarkdown>
    </section>
  );
};

export default Recipe;
